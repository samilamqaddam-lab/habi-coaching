import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Validation schema
const registrationSchema = z.object({
  firstName: z.string().min(2, 'Prénom requis'),
  lastName: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(8, 'Téléphone requis'),
  whatsapp: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
  consent: z.boolean().refine(val => val === true, 'Consentement requis'),
  dateChoices: z.array(z.string().uuid()).min(1, 'Au moins une date requise'),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ editionId: string }> }
) {
  const { editionId } = await params;

  // Check if Supabase is configured
  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return NextResponse.json(
      { error: 'Service non disponible' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();

    // Validate input
    const validation = registrationSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validation.error.issues },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, phone, whatsapp, message, consent, dateChoices } = validation.data;

    // Resolve edition ID
    let resolvedEditionId = editionId;
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(editionId);

    if (!isUUID) {
      // Look up by programme_key
      const { data: edition } = await supabaseAdmin
        .from('programme_editions')
        .select('id, title')
        .eq('programme_key', editionId)
        .eq('is_active', true)
        .single();

      if (!edition) {
        return NextResponse.json(
          { error: 'Édition non trouvée' },
          { status: 404 }
        );
      }
      resolvedEditionId = edition.id;
    }

    // Check availability for all chosen dates
    const { data: availability } = await supabaseAdmin
      .from('date_availability')
      .select('*')
      .in('date_option_id', dateChoices);

    const fullDates = availability?.filter(a => a.is_full) || [];
    if (fullDates.length > 0) {
      return NextResponse.json({
        error: 'Certaines dates sélectionnées sont complètes',
        fullDates: fullDates.map(d => d.date_option_id),
      }, { status: 409 });
    }

    // Create registration
    const { data: registration, error: regError } = await supabaseAdmin
      .from('registrations')
      .insert({
        edition_id: resolvedEditionId,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        whatsapp: whatsapp || null,
        message: message || null,
        consent,
        status: 'pending',
      })
      .select()
      .single();

    if (regError || !registration) {
      console.error('Registration error:', regError);
      return NextResponse.json(
        { error: 'Erreur lors de l\'inscription' },
        { status: 500 }
      );
    }

    // Create date choices
    const dateChoiceInserts = dateChoices.map(dateOptionId => ({
      registration_id: registration.id,
      date_option_id: dateOptionId,
    }));

    const { error: choicesError } = await supabaseAdmin
      .from('registration_date_choices')
      .insert(dateChoiceInserts);

    if (choicesError) {
      // Rollback registration
      await supabaseAdmin
        .from('registrations')
        .delete()
        .eq('id', registration.id);

      console.error('Date choices error:', choicesError);
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement des dates' },
        { status: 500 }
      );
    }

    // Get edition and session details for email
    const { data: editionDetails } = await supabaseAdmin
      .from('programme_editions')
      .select('title')
      .eq('id', resolvedEditionId)
      .single();

    // Get chosen date details
    const { data: chosenDates } = await supabaseAdmin
      .from('session_date_options')
      .select(`
        date_time,
        location,
        edition_sessions (
          session_number,
          title
        )
      `)
      .in('id', dateChoices)
      .order('date_time');

    // Send emails
    if (resend) {
      const programTitle = editionDetails?.title || 'Programme Yoga';

      // Format date choices for email - with Morocco timezone
      const formattedSessions = chosenDates?.map(d => {
        const session = d.edition_sessions as unknown as { session_number: number; title: string } | null;
        const date = new Date(d.date_time);
        return {
          sessionNumber: session?.session_number || 0,
          sessionTitle: session?.title || `Session ${session?.session_number}`,
          dateTime: date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Africa/Casablanca',
          }),
          location: d.location || 'Studio, Casablanca',
        };
      }).sort((a, b) => a.sessionNumber - b.sessionNumber) || [];

      // Build sessions HTML table (only "Session X" without names)
      const sessionsHtml = formattedSessions.map(session => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee;">
            <strong>Session ${session.sessionNumber}</strong>
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #eee;">
            ${session.dateTime}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">
            ${session.location}
          </td>
        </tr>
      `).join('');

      // Email to admin (notification)
      const adminHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #E8A54B 0%, #d4943c 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🧘 Nouvelle Inscription</h1>
          </div>

          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
            <div style="background: white; padding: 24px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <h2 style="color: #E8A54B; margin-top: 0; font-size: 18px; border-bottom: 2px solid #E8A54B; padding-bottom: 10px;">
                Programme
              </h2>
              <p style="font-size: 20px; font-weight: bold; color: #1a365d; margin: 15px 0;">
                ${programTitle}
              </p>
            </div>

            <div style="background: white; padding: 24px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <h2 style="color: #E8A54B; margin-top: 0; font-size: 18px; border-bottom: 2px solid #E8A54B; padding-bottom: 10px;">
                Informations du participant
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; width: 120px;">Nom:</td>
                  <td style="padding: 8px 0; font-weight: 500;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Email:</td>
                  <td style="padding: 8px 0;">
                    <a href="mailto:${email}" style="color: #E8A54B; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Téléphone:</td>
                  <td style="padding: 8px 0;">
                    <a href="tel:${phone}" style="color: #E8A54B; text-decoration: none;">${phone}</a>
                  </td>
                </tr>
                ${whatsapp ? `
                <tr>
                  <td style="padding: 8px 0; color: #666;">WhatsApp:</td>
                  <td style="padding: 8px 0;">
                    <a href="https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}" style="color: #25D366; text-decoration: none;">${whatsapp}</a>
                  </td>
                </tr>
                ` : ''}
              </table>
            </div>

            <div style="background: white; padding: 24px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <h2 style="color: #E8A54B; margin-top: 0; font-size: 18px; border-bottom: 2px solid #E8A54B; padding-bottom: 10px;">
                📅 Dates sélectionnées
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background: #f8f9fa;">
                    <th style="padding: 12px; text-align: left; font-size: 14px; color: #666;">Session</th>
                    <th style="padding: 12px; text-align: left; font-size: 14px; color: #666;">Date & Heure</th>
                    <th style="padding: 12px; text-align: left; font-size: 14px; color: #666;">Lieu</th>
                  </tr>
                </thead>
                <tbody>
                  ${sessionsHtml}
                </tbody>
              </table>
            </div>

            ${message ? `
            <div style="background: white; padding: 24px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <h2 style="color: #E8A54B; margin-top: 0; font-size: 18px; border-bottom: 2px solid #E8A54B; padding-bottom: 10px;">
                Message
              </h2>
              <p style="line-height: 1.6; color: #333; white-space: pre-wrap;">${message}</p>
            </div>
            ` : ''}

            <div style="text-align: center; margin-top: 25px; padding: 15px; background: #fef3c7; border-radius: 8px; border: 1px solid #f59e0b33;">
              <p style="color: #92400e; margin: 0; font-size: 14px;">
                ⏳ <strong>Statut: En attente de confirmation</strong><br>
                <span style="font-size: 12px;">Rendez-vous sur le dashboard admin pour confirmer cette inscription</span>
              </p>
            </div>
          </div>
        </div>
      `;

      try {
        await resend.emails.send({
          from: 'Transcendence Work <hajar@transcendencework.com>',
          to: ['hajar@transcendencework.com'],
          replyTo: email,
          subject: `🧘 Nouvelle inscription - ${programTitle} - ${firstName} ${lastName}`,
          html: adminHtml,
        });
      } catch (emailError) {
        console.error('Admin email error:', emailError);
      }

      // Email to participant (inscription reçue - pas encore confirmée)
      const participantHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #E8A54B 0%, #d4943c 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🙏 Inscription Reçue</h1>
          </div>

          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Bonjour <strong>${firstName}</strong>,
            </p>

            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Merci pour votre inscription au programme <strong>${programTitle}</strong>. Votre demande a bien été reçue!
            </p>

            <div style="background: white; padding: 24px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <h2 style="color: #E8A54B; margin-top: 0; font-size: 18px;">📅 Vos dates sélectionnées</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background: #f8f9fa;">
                    <th style="padding: 12px; text-align: left; font-size: 14px; color: #666;">Session</th>
                    <th style="padding: 12px; text-align: left; font-size: 14px; color: #666;">Date & Heure</th>
                    <th style="padding: 12px; text-align: left; font-size: 14px; color: #666;">Lieu</th>
                  </tr>
                </thead>
                <tbody>
                  ${sessionsHtml}
                </tbody>
              </table>
            </div>

            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
              <p style="margin: 0; color: #92400e; line-height: 1.6;">
                <strong>⏳ Prochaine étape</strong><br>
                Je vais examiner votre inscription et vous enverrai un <strong>email de confirmation</strong> dans les 24-48 heures avec toutes les informations pratiques.
              </p>
            </div>

            <div style="background: #fef2f2; padding: 20px; border-radius: 8px; border-left: 4px solid #ef4444; margin: 20px 0;">
              <p style="margin: 0; color: #991b1b; line-height: 1.6;">
                <strong>⚠️ Important</strong><br>
                La participation aux 3 sessions est obligatoire pour bénéficier pleinement du programme.
              </p>
            </div>

            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Si vous avez des questions en attendant, n'hésitez pas à me contacter.
            </p>

            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 30px;">
              Namaskaram,<br>
              <em>In Love, Light & Laughter</em><br><br>
              🙏<br><br>
              <strong>Hajar Habi</strong><br>
              <span style="color: #666; font-size: 14px;">Professeure de Hatha Yoga Classique</span><br>
              <span style="color: #666; font-size: 14px;">Certifiée par Sadhguru Gurukulam</span><br>
              <a href="https://www.transcendencework.com/yoga" style="color: #EC8C44; font-size: 14px;">www.transcendencework.com/yoga</a>
            </p>

            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

            <p style="font-size: 12px; color: #999; text-align: center;">
              Ce message a été envoyé suite à votre inscription sur transcendencework.com
            </p>
          </div>
        </div>
      `;

      try {
        await resend.emails.send({
          from: 'Hajar Habi <hajar@transcendencework.com>',
          to: [email],
          subject: `🙏 Inscription reçue - ${programTitle}`,
          html: participantHtml,
        });
      } catch (emailError) {
        console.error('Confirmation email error:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      registrationId: registration.id,
      message: 'Inscription enregistrée avec succès',
    }, { status: 201 });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
