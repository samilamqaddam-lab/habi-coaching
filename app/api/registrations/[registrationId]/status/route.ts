import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema
const statusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled']),
});

// Format date in Morocco timezone
function formatDateMorocco(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Africa/Casablanca',
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ registrationId: string }> }
) {
  const { registrationId } = await params;

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
    const validation = statusSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validation.error.issues },
        { status: 400 }
      );
    }

    const { status: newStatus } = validation.data;

    // Get current registration with edition info BEFORE updating
    const { data: currentRegistration, error: fetchError } = await supabaseAdmin
      .from('registrations')
      .select(`
        id,
        first_name,
        last_name,
        email,
        phone,
        status,
        edition_id,
        programme_editions (
          id,
          title,
          programme_key
        )
      `)
      .eq('id', registrationId)
      .single();

    if (fetchError || !currentRegistration) {
      console.error('Fetch registration error:', fetchError);
      return NextResponse.json(
        { error: 'Inscription non trouvée' },
        { status: 404 }
      );
    }

    const previousStatus = currentRegistration.status;

    // Skip if status is the same
    if (previousStatus === newStatus) {
      return NextResponse.json({
        success: true,
        registration: currentRegistration,
        message: 'Statut inchangé',
      });
    }

    // Update registration status
    const { data: registration, error } = await supabaseAdmin
      .from('registrations')
      .update({ status: newStatus })
      .eq('id', registrationId)
      .select()
      .single();

    if (error || !registration) {
      console.error('Status update error:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour du statut' },
        { status: 500 }
      );
    }

    // Get selected dates for this registration
    const { data: dateChoices } = await supabaseAdmin
      .from('registration_date_choices')
      .select(`
        date_option_id,
        session_date_options (
          date_time,
          location,
          edition_sessions (
            session_number,
            title
          )
        )
      `)
      .eq('registration_id', registrationId);

    const formattedSessions = (dateChoices || [])
      .map((choice: any) => ({
        sessionNumber: choice.session_date_options?.edition_sessions?.session_number || 0,
        sessionTitle: choice.session_date_options?.edition_sessions?.title || '',
        dateTime: choice.session_date_options?.date_time || '',
        location: choice.session_date_options?.location || 'Studio, Casablanca',
      }))
      .sort((a, b) => a.sessionNumber - b.sessionNumber);

    // Send email notification if status changed to confirmed or cancelled
    if (process.env.RESEND_API_KEY && (newStatus === 'confirmed' || newStatus === 'cancelled')) {
      const edition = currentRegistration.programme_editions as any;
      const programTitle = edition?.title || 'Programme Yoga';

      if (newStatus === 'confirmed') {
        // Confirmation email (only "Session X" without names)
        const sessionsHtml = formattedSessions.length > 0
          ? formattedSessions.map(session => `
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">
                  <strong>Session ${session.sessionNumber}</strong>
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">
                  ${formatDateMorocco(session.dateTime)}
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">
                  ${session.location}
                </td>
              </tr>
            `).join('')
          : '';

        const confirmationHtml = `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #22c55e; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">✅ Inscription Confirmée!</h1>
            </div>

            <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
              <p style="font-size: 16px; line-height: 1.6; color: #333;">
                Bonjour <strong>${currentRegistration.first_name}</strong>,
              </p>

              <p style="font-size: 16px; line-height: 1.6; color: #333;">
                Excellente nouvelle! Votre inscription au programme <strong>${programTitle}</strong> est maintenant <strong style="color: #22c55e;">confirmée</strong>.
              </p>

              ${formattedSessions.length > 0 ? `
              <div style="background: white; padding: 24px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <h2 style="color: #E8A54B; margin-top: 0; font-size: 18px;">📅 Vos sessions</h2>
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
              ` : ''}

              <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 20px 0;">
                <p style="margin: 0; color: #333; line-height: 1.6;">
                  <strong>Prochaines étapes:</strong><br>
                  • Prévoyez des vêtements confortables<br>
                  • Arrivez 10-15 minutes avant le début de la session<br>
                  • Apportez une bouteille d'eau
                </p>
              </div>

              <p style="font-size: 16px; line-height: 1.6; color: #333;">
                J'ai hâte de vous accueillir et de partager cette pratique avec vous!
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
                Ce message a été envoyé depuis transcendencework.com
              </p>
            </div>
          </div>
        `;

        await resend.emails.send({
          from: 'Hajar Habi <hajar@transcendencework.com>',
          to: [currentRegistration.email],
          subject: `✅ Votre inscription à ${programTitle} est confirmée!`,
          html: confirmationHtml,
        });

        console.log('Confirmation email sent to:', currentRegistration.email);

      } else if (newStatus === 'cancelled') {
        // Cancellation email
        const cancellationHtml = `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #64748b; background: linear-gradient(135deg, #64748b 0%, #475569 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Inscription Annulée</h1>
            </div>

            <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
              <p style="font-size: 16px; line-height: 1.6; color: #333;">
                Bonjour <strong>${currentRegistration.first_name}</strong>,
              </p>

              <p style="font-size: 16px; line-height: 1.6; color: #333;">
                Nous vous informons que votre inscription au programme <strong>${programTitle}</strong> a été annulée.
              </p>

              <div style="background: white; padding: 24px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <p style="margin: 0; color: #333; line-height: 1.6;">
                  Si cette annulation n'est pas de votre fait ou si vous souhaitez vous réinscrire, n'hésitez pas à me contacter directement.
                </p>
              </div>

              <div style="background: #fff8f0; padding: 20px; border-radius: 8px; border-left: 4px solid #E8A54B; margin: 20px 0;">
                <p style="margin: 0; color: #333; line-height: 1.6;">
                  <strong>Vous souhaitez participer à une prochaine session?</strong><br>
                  Visitez <a href="https://transcendencework.com/yoga" style="color: #E8A54B;">transcendencework.com/yoga</a> pour découvrir les prochaines dates disponibles.
                </p>
              </div>

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
                Ce message a été envoyé depuis transcendencework.com
              </p>
            </div>
          </div>
        `;

        await resend.emails.send({
          from: 'Hajar Habi <hajar@transcendencework.com>',
          to: [currentRegistration.email],
          subject: `Inscription à ${programTitle} - Annulation`,
          html: cancellationHtml,
        });

        console.log('Cancellation email sent to:', currentRegistration.email);
      }
    }

    return NextResponse.json({
      success: true,
      registration,
      message: 'Statut mis à jour avec succès',
      emailSent: newStatus === 'confirmed' || newStatus === 'cancelled',
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
