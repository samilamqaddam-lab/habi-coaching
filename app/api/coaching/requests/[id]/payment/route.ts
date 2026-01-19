import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return NextResponse.json(
      { error: 'Service non disponible' },
      { status: 503 }
    );
  }

  if (!resend) {
    return NextResponse.json(
      { error: 'Service email non configuré' },
      { status: 503 }
    );
  }

  try {
    // Get the coaching request with package details
    const { data: coachingRequest, error } = await supabaseAdmin
      .from('coaching_requests')
      .select(`
        *,
        coaching_packages (
          id,
          name,
          name_en,
          slug,
          session_count,
          session_duration,
          price,
          price_per_session
        )
      `)
      .eq('id', id)
      .single();

    if (error || !coachingRequest) {
      return NextResponse.json(
        { error: 'Demande non trouvée' },
        { status: 404 }
      );
    }

    const packageData = coachingRequest.coaching_packages;
    if (!packageData) {
      return NextResponse.json(
        { error: 'Package non trouvé' },
        { status: 404 }
      );
    }

    // Send payment request email
    const paymentHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #9B6B9E; background: linear-gradient(135deg, #9B6B9E 0%, #7d5580 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">💳 Confirmation de votre coaching</h1>
        </div>

        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Bonjour <strong>${coachingRequest.first_name}</strong>,
          </p>

          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Suite à notre échange, je suis ravie de vous accompagner dans votre parcours de coaching. Voici les informations pour finaliser votre inscription.
          </p>

          <div style="background: white; padding: 24px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <h2 style="color: #9B6B9E; margin-top: 0; font-size: 18px;">📦 Récapitulatif</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #666; width: 120px;">Package:</td>
                <td style="padding: 10px 0; font-weight: 600; color: #1a365d;">${packageData.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666;">Séances:</td>
                <td style="padding: 10px 0;">${packageData.session_count} séance(s) de ${packageData.session_duration} min</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666;">Montant:</td>
                <td style="padding: 10px 0; font-weight: 700; font-size: 20px; color: #9B6B9E;">${packageData.price} DH</td>
              </tr>
            </table>
          </div>

          <div style="background: #f3e8f4; padding: 24px; border-radius: 8px; margin: 20px 0; border: 2px solid #9B6B9E;">
            <h2 style="color: #5a3d5c; margin-top: 0; font-size: 18px;">🏦 Coordonnées bancaires</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 100px;">Titulaire:</td>
                <td style="padding: 8px 0; font-weight: 600; color: #1a365d;">HAJAR HABI</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Banque:</td>
                <td style="padding: 8px 0;">CIH Bank</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">RIB:</td>
                <td style="padding: 8px 0; font-family: monospace; font-size: 14px; background: #fff; padding: 8px; border-radius: 4px;">230 810 3473290211005600 89</td>
              </tr>
            </table>
          </div>

          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <p style="margin: 0; color: #92400e; line-height: 1.6;">
              <strong>📝 Important</strong><br>
              Merci de m'envoyer une confirmation de virement (capture d'écran ou reçu) par email ou WhatsApp afin que je puisse valider votre inscription et planifier nos séances.
            </p>
          </div>

          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Une fois le paiement reçu, nous pourrons convenir ensemble des dates de nos séances.
          </p>

          <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 30px;">
            À très bientôt,<br><br>
            <strong>Hajar Habi</strong><br>
            <span style="color: #666; font-size: 14px;">Coach Professionnelle Certifiée</span><br>
            <span style="color: #666; font-size: 14px;">Coach & Team – Transformance Pro</span><br><br>
            📧 <a href="mailto:hajar@transcendencework.com" style="color: #9B6B9E;">hajar@transcendencework.com</a><br>
            📱 <a href="https://wa.me/212663096857" style="color: #25D366;">+212 663 096 857</a> (WhatsApp)
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

          <p style="font-size: 12px; color: #999; text-align: center;">
            Ce message a été envoyé suite à votre demande de coaching sur transcendencework.com
          </p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: 'Hajar Habi <hajar@transcendencework.com>',
      to: [coachingRequest.email],
      subject: `💳 Confirmation coaching - ${packageData.name}`,
      html: paymentHtml,
    });

    // Update the payment_requested_at timestamp
    await supabaseAdmin
      .from('coaching_requests')
      .update({ payment_requested_at: new Date().toISOString() })
      .eq('id', id);

    return NextResponse.json({
      success: true,
      message: 'Email de demande de paiement envoyé',
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
