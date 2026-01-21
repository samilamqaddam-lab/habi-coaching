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
});

// Format date for emails
function formatDateMorocco(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await params;

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

    const { firstName, lastName, email, phone } = validation.data;

    // Get event details
    const { data: event, error: eventError } = await supabaseAdmin
      .from('yoga_events')
      .select('*')
      .eq('id', eventId)
      .eq('is_active', true)
      .single();

    if (eventError || !event) {
      return NextResponse.json(
        { error: 'Événement non trouvé' },
        { status: 404 }
      );
    }

    // Check availability
    const { data: availability } = await supabaseAdmin
      .from('event_availability')
      .select('*')
      .eq('event_id', eventId)
      .single();

    if (availability?.is_full) {
      return NextResponse.json(
        { error: 'Cet événement est complet' },
        { status: 409 }
      );
    }

    // Create registration
    const { data: registration, error: regError } = await supabaseAdmin
      .from('event_registrations')
      .insert({
        event_id: eventId,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
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

    // Send emails
    if (resend) {
      const eventTitle = event.title;
      const eventSubtitle = event.subtitle || '';
      const eventDate = formatDateMorocco(event.date_time);
      const price = event.price ? `${Number(event.price).toLocaleString('fr-FR')} MAD` : null;
      const adminUrl = `https://transcendencework.com/admin/events/${eventId}`;

      // Email to admin
      const adminHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #E8A54B; background: linear-gradient(135deg, #E8A54B 0%, #d4943c 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">🎫 Nouvelle Inscription Événement</h1>
            <p style="color: #fff8f0; margin: 10px 0 0 0; font-size: 14px;">${eventTitle} ${eventSubtitle}</p>
          </div>

          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
            <div style="text-align: center; margin-bottom: 25px;">
              <a href="${adminUrl}" style="display: inline-block; background-color: #1a365d; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: bold; font-size: 16px;">
                📋 Gérer cette inscription
              </a>
            </div>

            <div style="background: white; padding: 24px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <h2 style="color: #1a365d; margin-top: 0; font-size: 16px; border-bottom: 2px solid #E8A54B; padding-bottom: 10px;">
                👤 Participant
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #666; width: 100px;">Nom:</td>
                  <td style="padding: 10px 0; font-weight: 600; color: #1a365d;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;">Email:</td>
                  <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #E8A54B;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;">Téléphone:</td>
                  <td style="padding: 10px 0;"><a href="tel:${phone}" style="color: #1a365d;">${phone}</a></td>
                </tr>
              </table>
            </div>

            <div style="background: white; padding: 24px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <h2 style="color: #1a365d; margin-top: 0; font-size: 16px; border-bottom: 2px solid #E8A54B; padding-bottom: 10px;">
                📅 Détails de l'événement
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #666;">Événement:</td>
                  <td style="padding: 10px 0; font-weight: 600;">${eventTitle} ${eventSubtitle}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;">Date:</td>
                  <td style="padding: 10px 0;">${eventDate}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;">Lieu:</td>
                  <td style="padding: 10px 0;">${event.location}, ${event.address}</td>
                </tr>
                ${price ? `
                <tr>
                  <td style="padding: 10px 0; color: #666;">Tarif:</td>
                  <td style="padding: 10px 0; font-weight: 600; color: #E8A54B;">${price}</td>
                </tr>
                ` : ''}
              </table>
            </div>

            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; border: 1px solid #f59e0b; text-align: center;">
              <p style="color: #92400e; margin: 0 0 15px 0; font-weight: 600;">⏳ En attente de confirmation</p>
              <a href="${adminUrl}" style="display: inline-block; background-color: #1a365d; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 500;">
                Confirmer sur le dashboard →
              </a>
            </div>
          </div>
        </div>
      `;

      try {
        await resend.emails.send({
          from: 'Transcendence Work <hajar@transcendencework.com>',
          to: ['hajar@transcendencework.com'],
          replyTo: email,
          subject: `🎫 Nouvelle inscription - ${eventTitle} - ${firstName} ${lastName}`,
          html: adminHtml,
        });
      } catch (emailError) {
        console.error('Admin email error:', emailError);
      }

      // Email to participant
      const participantHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #E8A54B; background: linear-gradient(135deg, #E8A54B 0%, #d4943c 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">🙏 Inscription Reçue</h1>
          </div>

          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Bonjour <strong>${firstName}</strong>,
            </p>

            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Merci pour votre inscription à l'événement <strong>${eventTitle} ${eventSubtitle}</strong>. Votre demande a bien été reçue!
            </p>

            <div style="background: white; padding: 24px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <h2 style="color: #E8A54B; margin-top: 0; font-size: 18px;">📅 Détails de l'événement</h2>
              ${event.badge ? `<p style="margin: 0 0 15px 0;"><span style="background: #E8A54B; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px;">${event.badge}</span></p>` : ''}
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #666; width: 80px;">📆 Date:</td>
                  <td style="padding: 10px 0; font-weight: 500;">${eventDate}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;">📍 Lieu:</td>
                  <td style="padding: 10px 0;">${event.location}<br><span style="color: #666; font-size: 14px;">${event.address}</span></td>
                </tr>
                ${price ? `
                <tr>
                  <td style="padding: 10px 0; color: #666;">💰 Tarif:</td>
                  <td style="padding: 10px 0; font-weight: 600; color: #E8A54B; font-size: 18px;">${price}</td>
                </tr>
                ` : ''}
              </table>
            </div>

            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
              <p style="margin: 0; color: #92400e; line-height: 1.6;">
                <strong>⏳ Prochaine étape</strong><br>
                Je vais examiner votre inscription et vous enverrai un <strong>email de confirmation</strong> dans les 24-48 heures avec les informations de paiement.
              </p>
            </div>

            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Si vous avez des questions, n'hésitez pas à me contacter via WhatsApp au <a href="https://wa.me/212663096857" style="color: #25D366;">+212 6 63 09 68 57</a>
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
          subject: `🙏 Inscription reçue - ${eventTitle}`,
          html: participantHtml,
        });
      } catch (emailError) {
        console.error('Participant email error:', emailError);
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
