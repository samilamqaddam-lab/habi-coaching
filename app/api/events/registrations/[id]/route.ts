import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

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

// GET - Get registration details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return NextResponse.json({ error: 'Service non disponible' }, { status: 503 });
  }

  try {
    const { data: registration, error } = await supabaseAdmin
      .from('event_registrations')
      .select(`
        *,
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

    if (error || !registration) {
      return NextResponse.json({ error: 'Inscription non trouvée' }, { status: 404 });
    }

    return NextResponse.json({ registration });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// PATCH - Update registration status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return NextResponse.json({ error: 'Service non disponible' }, { status: 503 });
  }

  try {
    const body = await request.json();
    const { status, notes, cancellation_reason } = body;

    // Get current registration with event details
    const { data: registration, error: fetchError } = await supabaseAdmin
      .from('event_registrations')
      .select(`
        *,
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
      return NextResponse.json({ error: 'Inscription non trouvée' }, { status: 404 });
    }

    const previousStatus = registration.status;

    // Update registration
    const updateData: Record<string, unknown> = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const { data: updated, error: updateError } = await supabaseAdmin
      .from('event_registrations')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Update error:', updateError);
      return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 });
    }

    // Send confirmation email if status changed to confirmed
    if (status === 'confirmed' && previousStatus !== 'confirmed' && resend) {
      const event = registration.yoga_events as unknown as {
        title: string;
        subtitle: string;
        badge: string;
        date_time: string;
        location: string;
        address: string;
        price: number;
      };
      const eventDate = formatDateMorocco(event.date_time);
      const price = event.price ? `${Number(event.price).toLocaleString('fr-FR')} MAD` : null;

      const confirmationHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #10B981; background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">✅ Inscription Confirmée</h1>
          </div>

          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Bonjour <strong>${registration.first_name}</strong>,
            </p>

            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Votre inscription à l'événement <strong>${event.title} ${event.subtitle || ''}</strong> est confirmée!
            </p>

            <div style="background: white; padding: 24px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <h2 style="color: #10B981; margin-top: 0; font-size: 18px;">📅 Rappel des détails</h2>
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
              </table>
            </div>

            <div style="background: #d1fae5; padding: 20px; border-radius: 8px; border-left: 4px solid #10B981; margin: 20px 0;">
              <p style="margin: 0; color: #065f46; line-height: 1.6;">
                <strong>✨ Votre place est réservée!</strong><br>
                Pensez à arriver 10 minutes avant le début de la session.
              </p>
            </div>

            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 30px;">
              Namaskaram,<br>
              <em>In Love, Light & Laughter</em><br><br>
              🙏<br><br>
              <strong>Hajar Habi</strong><br>
              <span style="color: #666; font-size: 14px;">Professeure de Hatha Yoga Classique</span><br>
              <a href="https://www.transcendencework.com/yoga" style="color: #EC8C44; font-size: 14px;">www.transcendencework.com/yoga</a>
            </p>
          </div>
        </div>
      `;

      try {
        await resend.emails.send({
          from: 'Hajar Habi <hajar@transcendencework.com>',
          to: [registration.email],
          subject: `✅ Inscription confirmée - ${event.title}`,
          html: confirmationHtml,
        });
      } catch (emailError) {
        console.error('Confirmation email error:', emailError);
      }
    }

    // Send cancellation email if status changed to cancelled
    if (status === 'cancelled' && previousStatus !== 'cancelled' && resend) {
      const event = registration.yoga_events as unknown as {
        title: string;
        subtitle: string;
        badge: string;
        date_time: string;
        location: string;
        address: string;
        price: number;
      };
      const eventDate = formatDateMorocco(event.date_time);

      const cancellationHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #64748b; background: linear-gradient(135deg, #64748b 0%, #475569 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Inscription Annulée</h1>
          </div>

          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Bonjour <strong>${registration.first_name}</strong>,
            </p>

            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Nous vous informons que votre inscription à l'événement <strong>${event.title}${event.subtitle ? ' ' + event.subtitle : ''}</strong> a été annulée.
            </p>

            ${cancellation_reason ? `
              <div style="background: white; padding: 24px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <h3 style="color: #64748b; margin-top: 0; font-size: 16px; margin-bottom: 12px;">Raison de l'annulation</h3>
                <p style="margin: 0; color: #333; line-height: 1.6;">
                  ${cancellation_reason}
                </p>
              </div>
            ` : ''}

            <div style="background: white; padding: 24px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <p style="margin: 0; color: #333; line-height: 1.6;">
                Si cette annulation n'est pas de votre fait ou si vous avez des questions, n'hésitez pas à nous contacter directement.
              </p>
            </div>

            <div style="background: #fff8f0; padding: 20px; border-radius: 8px; border-left: 4px solid #E8A54B; margin: 20px 0;">
              <p style="margin: 0; color: #333; line-height: 1.6;">
                <strong>Vous souhaitez participer à un prochain événement?</strong><br>
                Visitez <a href="https://transcendencework.com/yoga" style="color: #E8A54B; text-decoration: none;">transcendencework.com/yoga</a> pour découvrir les prochaines dates disponibles.
              </p>
            </div>

            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
              <p style="margin: 0 0 12px 0; color: #333; font-weight: 600;">
                📞 Besoin de nous contacter ?
              </p>
              <p style="margin: 0; color: #333; line-height: 1.6;">
                <strong>Email:</strong> <a href="mailto:hajar@transcendencework.com" style="color: #3b82f6; text-decoration: none;">hajar@transcendencework.com</a><br>
                <strong>Téléphone/WhatsApp:</strong> <a href="tel:+212663096857" style="color: #3b82f6; text-decoration: none;">+212 663 096 857</a>
              </p>
            </div>

            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 30px;">
              Namaskaram,<br>
              <em>In Love, Light & Laughter</em><br><br>
              🙏<br><br>
              <strong>Hajar Habi</strong><br>
              <span style="color: #666; font-size: 14px;">Professeure de Hatha Yoga Classique</span><br>
              <span style="color: #666; font-size: 14px;">Certifiée par Sadhguru Gurukulam</span><br>
              <a href="https://www.transcendencework.com/yoga" style="color: #EC8C44; font-size: 14px; text-decoration: none;">www.transcendencework.com/yoga</a>
            </p>

            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

            <p style="font-size: 12px; color: #999; text-align: center;">
              Ce message a été envoyé depuis transcendencework.com
            </p>
          </div>
        </div>
      `;

      try {
        await resend.emails.send({
          from: 'Hajar Habi <hajar@transcendencework.com>',
          to: [registration.email],
          subject: `Inscription annulée - ${event.title}`,
          html: cancellationHtml,
        });
        console.log('Cancellation email sent to:', registration.email);
      } catch (emailError) {
        console.error('Cancellation email error:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      registration: updated,
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE - Delete registration
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return NextResponse.json({ error: 'Service non disponible' }, { status: 503 });
  }

  try {
    const { error } = await supabaseAdmin
      .from('event_registrations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete error:', error);
      return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
