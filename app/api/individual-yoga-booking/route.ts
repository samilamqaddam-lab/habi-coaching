import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Validation schema
const bookingSchema = z.object({
  firstName: z.string().min(2, 'Prénom requis'),
  lastName: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(8, 'Téléphone requis'),
  whatsapp: z.string().optional(),
  locationPreference: z.enum(['studio', 'home']),
  interest: z.enum(['yoga-only', 'yoga-coaching']),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = bookingSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validation.error.issues },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, phone, whatsapp, locationPreference, interest, message } = validation.data;

    // Labels for display
    const locationLabels: Record<string, string> = {
      studio: 'Au Studio Shido Mind (Casablanca)',
      home: 'À domicile',
    };

    const interestLabels: Record<string, string> = {
      'yoga-only': 'Yoga uniquement',
      'yoga-coaching': 'Yoga + Coaching',
    };

    // Send emails
    if (resend) {
      // Admin notification email
      const adminHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #E8A54B; background: linear-gradient(135deg, #E8A54B 0%, #d4943c 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">🧘 Nouvelle Demande Cours Individuel</h1>
          </div>

          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
            <!-- Participant Info -->
            <div style="background: white; padding: 24px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <h2 style="color: #1a365d; margin-top: 0; font-size: 16px; border-bottom: 2px solid #E8A54B; padding-bottom: 10px;">
                👤 Participant
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #666; width: 120px;">Nom:</td>
                  <td style="padding: 10px 0; font-weight: 600; font-size: 16px; color: #1a365d;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;">Email:</td>
                  <td style="padding: 10px 0;">
                    <a href="mailto:${email}" style="color: #E8A54B; text-decoration: none; font-weight: 500;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;">Téléphone:</td>
                  <td style="padding: 10px 0;">
                    <a href="tel:${phone}" style="color: #1a365d; text-decoration: none;">${phone}</a>
                    ${whatsapp ? `
                    <br>
                    <a href="https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}" style="display: inline-flex; align-items: center; gap: 4px; color: #25D366; text-decoration: none; font-size: 13px; margin-top: 4px;">
                      <span style="background: #25D366; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px;">WhatsApp</span>
                      ${whatsapp}
                    </a>
                    ` : ''}
                  </td>
                </tr>
              </table>
            </div>

            <!-- Preferences -->
            <div style="background: white; padding: 24px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <h2 style="color: #1a365d; margin-top: 0; font-size: 16px; border-bottom: 2px solid #E8A54B; padding-bottom: 10px;">
                📋 Préférences
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #666; width: 120px;">Lieu:</td>
                  <td style="padding: 10px 0; font-weight: 600; color: #1a365d;">${locationLabels[locationPreference]}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;">Intérêt:</td>
                  <td style="padding: 10px 0; font-weight: 600; color: #1a365d;">${interestLabels[interest]}</td>
                </tr>
              </table>
            </div>

            ${message ? `
            <div style="background: white; padding: 24px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <h2 style="color: #1a365d; margin-top: 0; font-size: 16px; border-bottom: 2px solid #E8A54B; padding-bottom: 10px;">
                💬 Message
              </h2>
              <p style="line-height: 1.6; color: #333; white-space: pre-wrap; background: #f8fafc; padding: 15px; border-radius: 6px; border-left: 3px solid #E8A54B;">${message}</p>
            </div>
            ` : ''}

            <!-- Status -->
            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 8px; border: 1px solid #f59e0b; text-align: center;">
              <p style="color: #92400e; margin: 0; font-size: 15px; font-weight: 600;">
                ⏳ En attente de réponse
              </p>
            </div>

            <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                Email automatique • transcendencework.com
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
          subject: `🧘 Nouvelle demande cours individuel - ${firstName} ${lastName}`,
          html: adminHtml,
        });
      } catch (emailError) {
        console.error('Admin email error:', emailError);
      }

      // Participant confirmation email
      const participantHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #E8A54B; background: linear-gradient(135deg, #E8A54B 0%, #d4943c 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🙏 Demande Reçue</h1>
          </div>

          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Bonjour <strong>${firstName}</strong>,
            </p>

            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Merci pour votre intérêt pour les cours individuels de Hatha Yoga Classique. Votre demande a bien été reçue !
            </p>

            <div style="background: white; padding: 24px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <h2 style="color: #E8A54B; margin-top: 0; font-size: 18px;">📋 Récapitulatif</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #666; width: 120px;">Lieu préféré:</td>
                  <td style="padding: 10px 0; font-weight: 600; color: #1a365d;">${locationLabels[locationPreference]}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;">Intérêt:</td>
                  <td style="padding: 10px 0; font-weight: 600; color: #1a365d;">${interestLabels[interest]}</td>
                </tr>
              </table>
            </div>

            <div style="background: #fff8f0; padding: 20px; border-radius: 8px; border-left: 4px solid #E8A54B; margin: 20px 0;">
              <p style="margin: 0; color: #333; line-height: 1.6;">
                <strong>⏳ Prochaine étape</strong><br>
                Je reviendrai vers vous dans les <strong>24-48 heures</strong> pour discuter de vos besoins et planifier votre première séance.
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
              <a href="https://www.transcendencework.com/yoga" style="color: #E8A54B; font-size: 14px;">www.transcendencework.com/yoga</a>
            </p>

            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

            <p style="font-size: 12px; color: #999; text-align: center;">
              Ce message a été envoyé suite à votre demande sur transcendencework.com
            </p>
          </div>
        </div>
      `;

      try {
        await resend.emails.send({
          from: 'Hajar Habi <hajar@transcendencework.com>',
          to: [email],
          subject: `🙏 Demande cours individuel reçue`,
          html: participantHtml,
        });
      } catch (emailError) {
        console.error('Confirmation email error:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Demande enregistrée avec succès',
    }, { status: 201 });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
