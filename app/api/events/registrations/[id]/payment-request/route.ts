import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Check if Supabase is configured
  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return NextResponse.json(
      { error: 'Service non disponible' },
      { status: 503 }
    );
  }

  try {
    // Get registration with event info
    const { data: registration, error: fetchError } = await supabaseAdmin
      .from('event_registrations')
      .select(`
        id,
        first_name,
        last_name,
        email,
        phone,
        status,
        event_id,
        yoga_events (
          id,
          title,
          subtitle,
          badge,
          date_time,
          location,
          address,
          price
        )
      `)
      .eq('id', id)
      .single();

    if (fetchError || !registration) {
      console.error('Fetch registration error:', fetchError);
      return NextResponse.json(
        { error: 'Inscription non trouvée' },
        { status: 404 }
      );
    }

    const event = registration.yoga_events as unknown as {
      title: string;
      subtitle: string;
      badge: string;
      date_time: string;
      location: string;
      address: string;
      price: number;
    };

    const eventTitle = `${event.title} ${event.subtitle || ''}`.trim();
    const eventDate = formatDateMorocco(event.date_time);
    const price = event.price ? `${Number(event.price).toLocaleString('fr-FR')} MAD` : null;

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Service email non configuré' },
        { status: 503 }
      );
    }

    // Payment request email
    const paymentRequestHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #E8A54B; background: linear-gradient(135deg, #E8A54B 0%, #d4943c 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🪷 Finalisez votre inscription</h1>
        </div>

        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Bonjour <strong>${registration.first_name}</strong>,
          </p>

          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Merci pour votre inscription à l'événement <strong>${eventTitle}</strong>.
          </p>

          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Pour finaliser votre inscription et garantir votre place, merci de procéder au paiement par virement bancaire :
          </p>

          <div style="background: white; padding: 24px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <h2 style="color: #E8A54B; margin-top: 0; font-size: 18px;">📅 Détails de l'événement</h2>
            ${event.badge ? `<p style="margin: 0 0 15px 0;"><span style="background: #E8A54B; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px;">${event.badge}</span></p>` : ''}
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 80px;">📆 Date:</td>
                <td style="padding: 8px 0; font-weight: 500;">${eventDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">📍 Lieu:</td>
                <td style="padding: 8px 0;">${event.location}, ${event.address}</td>
              </tr>
            </table>
            ${price ? `
            <div style="margin-top: 16px; padding-top: 16px; border-top: 2px solid #f1f5f9;">
              <p style="margin: 0; font-size: 16px; color: #333;">
                <strong>Montant à régler :</strong> <span style="color: #E8A54B; font-size: 20px; font-weight: 700;">${price}</span>
              </p>
            </div>
            ` : ''}
          </div>

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
              Votre place ne sera définitivement réservée qu'à réception du paiement. En cas de non-paiement avant la date de l'événement, votre inscription pourra être annulée.
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
      subject: `Finalisation de votre inscription – ${eventTitle} 🪷`,
      html: paymentRequestHtml,
    });

    console.log('Payment request email sent to:', registration.email);

    // Update the payment_requested_at timestamp in the database
    await supabaseAdmin
      .from('event_registrations')
      .update({ payment_requested_at: new Date().toISOString() })
      .eq('id', id);

    return NextResponse.json({
      success: true,
      message: 'Email de demande de paiement envoyé avec succès',
      payment_requested_at: new Date().toISOString(),
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
