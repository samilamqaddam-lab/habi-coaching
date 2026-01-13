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
  whatsapp: z.string().optional(),
  message: z.string().optional(),
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

    // Send confirmation emails
    if (resend) {
      // Format date choices for email
      const datesList = chosenDates?.map(d => {
        // edition_sessions comes as an object from the join, not an array
        const session = d.edition_sessions as unknown as { session_number: number; title: string } | null;
        const date = new Date(d.date_time);
        const formattedDate = date.toLocaleDateString('fr-FR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
        const formattedTime = date.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        });
        return `• ${session?.title || `Session ${session?.session_number}`}: ${formattedDate} à ${formattedTime} - ${d.location}`;
      }).join('\n') || '';

      // Email to admin
      try {
        await resend.emails.send({
          from: 'Transcendence Work <noreply@transcendencework.com>',
          to: ['contact@transcendencework.com'],
          replyTo: email,
          subject: `Nouvelle inscription - ${editionDetails?.title || 'Programme Yoga'}`,
          html: `
            <h2>Nouvelle inscription au programme</h2>
            <p><strong>Programme:</strong> ${editionDetails?.title || 'Programme Yoga'}</p>

            <h3>Informations du participant</h3>
            <ul>
              <li><strong>Nom:</strong> ${firstName} ${lastName}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Téléphone:</strong> ${phone}</li>
              ${whatsapp ? `<li><strong>WhatsApp:</strong> ${whatsapp}</li>` : ''}
            </ul>

            <h3>Dates choisies</h3>
            <pre>${datesList}</pre>

            ${message ? `<h3>Message</h3><p>${message}</p>` : ''}

            <hr>
            <p><em>Inscription reçue le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</em></p>
          `,
        });
      } catch (emailError) {
        console.error('Admin email error:', emailError);
      }

      // Confirmation email to participant
      try {
        await resend.emails.send({
          from: 'Hajar Habi - Transcendence Work <noreply@transcendencework.com>',
          to: [email],
          subject: `Confirmation d'inscription - ${editionDetails?.title || 'Programme Yoga'}`,
          html: `
            <h2>Merci pour votre inscription, ${firstName} !</h2>

            <p>Votre demande d'inscription au programme <strong>${editionDetails?.title || 'Yoga'}</strong> a bien été reçue.</p>

            <h3>Vos dates sélectionnées</h3>
            <pre>${datesList}</pre>

            <div style="background-color: #FFF7ED; border-left: 4px solid #FB923C; padding: 12px; margin: 20px 0;">
              <p style="margin: 0; font-weight: bold;">⚠️ Important</p>
              <p style="margin: 5px 0 0 0;">La participation aux 3 sessions est obligatoire.</p>
            </div>

            <p><strong>Lieu:</strong> <a href="https://www.google.com/maps/place/36+Boulevard+d'Anfa,+Casablanca" target="_blank" style="color: #E0904D; text-decoration: underline;">Shidomind</a><br>
            36 B boulevard d'Anfa, 5ème étage, Appartement 54, Casablanca</p>

            <p>Je vous contacterai dans les <strong>24-48 heures</strong> pour confirmer votre inscription et vous donner toutes les informations pratiques.</p>

            <hr>

            <p>À très bientôt,</p>
            <p><strong>Hajar Habi</strong><br>
            Professeure de Hatha Yoga Classique<br>
            Certifiée Sadhguru Gurukulam</p>

            <p style="color: #666; font-size: 12px;">
              Cet email est envoyé automatiquement suite à votre inscription sur transcendencework.com
            </p>
          `,
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
