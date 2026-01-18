import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function POST(
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
    // Get registration with edition info
    const { data: registration, error: fetchError } = await supabaseAdmin
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

    if (fetchError || !registration) {
      console.error('Fetch registration error:', fetchError);
      return NextResponse.json(
        { error: 'Inscription non trouvée' },
        { status: 404 }
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
        location: choice.session_date_options?.location || 'Studio Shido Mind, Casablanca',
      }))
      .sort((a, b) => a.sessionNumber - b.sessionNumber);

    const edition = registration.programme_editions as any;
    const programTitle = edition?.title || 'Programme Yoga';

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Service email non configuré' },
        { status: 503 }
      );
    }

    // Build sessions HTML if available
    const sessionsHtml = formattedSessions.length > 0
      ? `
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
              ${formattedSessions.map(session => `
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
              `).join('')}
            </tbody>
          </table>
        </div>
      `
      : '';

    // Payment request email
    const paymentRequestHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #E8A54B 0%, #d4943c 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🪷 Finalisez votre inscription</h1>
        </div>

        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Bonjour <strong>${registration.first_name}</strong>,
          </p>

          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Merci pour votre inscription au programme <strong>${programTitle}</strong>.
          </p>

          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Pour finaliser votre inscription et garantir votre place, merci de procéder au paiement par virement bancaire :
          </p>

          ${sessionsHtml}

          <div style="background: white; padding: 24px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <h2 style="color: #E8A54B; margin-top: 0; font-size: 18px;">💳 Virement bancaire</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 150px;"><strong>Titulaire :</strong></td>
                <td style="padding: 8px 0; color: #333;">HAJAR HABI</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Banque :</strong></td>
                <td style="padding: 8px 0; color: #333;">CIH Bank</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>RIB :</strong></td>
                <td style="padding: 8px 0; color: #333; font-family: monospace; font-size: 14px;">230 810 3473290211005600 89</td>
              </tr>
            </table>
          </div>

          <div style="background: #f0f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #333; line-height: 1.6;">
              <strong>💬 Besoin d'aide ou autre moyen de paiement ?</strong><br>
              N'hésitez pas à me contacter directement en répondant à cet email ou via WhatsApp au <a href="https://wa.me/212663096857" style="color: #25D366; font-weight: 500;">+212 6 63 09 68 57</a>
            </p>
          </div>

          <div style="background: #fff8f0; padding: 20px; border-radius: 8px; border-left: 4px solid #E8A54B; margin: 20px 0;">
            <p style="margin: 0; color: #333; line-height: 1.6;">
              <strong>⚠️ Important :</strong><br>
              Votre place ne sera définitivement réservée qu'à réception du paiement. En cas de non-paiement avant la date du programme, votre inscription pourra être annulée.
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
      to: [registration.email],
      subject: `Finalisation de votre inscription – ${programTitle} 🪷`,
      html: paymentRequestHtml,
    });

    console.log('Payment request email sent to:', registration.email);

    // Update the payment_request_sent flag in the database
    await supabaseAdmin
      .from('registrations')
      .update({ payment_request_sent: true })
      .eq('id', registrationId);

    return NextResponse.json({
      success: true,
      message: 'Email de demande de paiement envoyé avec succès',
      payment_request_sent: true,
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
