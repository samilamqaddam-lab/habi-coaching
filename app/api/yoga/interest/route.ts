import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema for spontaneous group class interest
const interestSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(8, 'Numéro de téléphone invalide'),
  whatsapp: z.string().optional(),
  yogaType: z.string().min(1, 'Le type de yoga est requis'),
  message: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Le consentement est requis',
  }),
});

// Map yoga type keys to French names
const yogaTypeNames: Record<string, string> = {
  'upa-yoga': 'Upa Yoga',
  'surya-kriya': 'Surya Kriya',
  'surya-shakti': 'Surya Shakti',
  'angamardana': 'Angamardana',
  'yogasanas': 'Yogasanas',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = interestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validation.error.issues },
        { status: 400 }
      );
    }

    const data = validation.data;
    const yogaTypeName = yogaTypeNames[data.yogaType] || data.yogaType;

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return NextResponse.json(
        { error: 'Service email non configuré' },
        { status: 503 }
      );
    }

    // Send notification email to Hajar
    const notificationHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #E8A54B 0%, #d4943c 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🧘 Nouvelle Demande de Cours Collectif</h1>
        </div>

        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
          <div style="background: white; padding: 24px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <h2 style="color: #E8A54B; margin-top: 0; font-size: 18px; border-bottom: 2px solid #E8A54B; padding-bottom: 10px;">
              Programme demandé
            </h2>
            <p style="font-size: 20px; font-weight: bold; color: #1a365d; margin: 15px 0;">
              ${yogaTypeName}
            </p>
          </div>

          <div style="background: white; padding: 24px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <h2 style="color: #E8A54B; margin-top: 0; font-size: 18px; border-bottom: 2px solid #E8A54B; padding-bottom: 10px;">
              Informations du participant
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 120px;">Nom:</td>
                <td style="padding: 8px 0; font-weight: 500;">${data.firstName} ${data.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Email:</td>
                <td style="padding: 8px 0;">
                  <a href="mailto:${data.email}" style="color: #E8A54B; text-decoration: none;">${data.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Téléphone:</td>
                <td style="padding: 8px 0;">
                  <a href="tel:${data.phone}" style="color: #E8A54B; text-decoration: none;">${data.phone}</a>
                </td>
              </tr>
              ${data.whatsapp ? `
              <tr>
                <td style="padding: 8px 0; color: #666;">WhatsApp:</td>
                <td style="padding: 8px 0;">
                  <a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}" style="color: #25D366; text-decoration: none;">${data.whatsapp}</a>
                </td>
              </tr>
              ` : ''}
            </table>
          </div>

          ${data.message ? `
          <div style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <h2 style="color: #E8A54B; margin-top: 0; font-size: 18px; border-bottom: 2px solid #E8A54B; padding-bottom: 10px;">
              Message
            </h2>
            <p style="line-height: 1.6; color: #333; white-space: pre-wrap;">${data.message}</p>
          </div>
          ` : ''}

          <div style="text-align: center; margin-top: 25px; padding: 15px; background: #fff8f0; border-radius: 8px; border: 1px solid #E8A54B33;">
            <p style="color: #666; margin: 0; font-size: 14px;">
              📌 Cette personne souhaite être informée des prochaines sessions de <strong>${yogaTypeName}</strong>
            </p>
          </div>
        </div>
      </div>
    `;

    // Send confirmation email to participant
    const confirmationHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #E8A54B 0%, #d4943c 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🙏 Merci pour votre intérêt</h1>
        </div>

        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Bonjour <strong>${data.firstName}</strong>,
          </p>

          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Merci pour votre intérêt pour le programme <strong>${yogaTypeName}</strong>.
          </p>

          <div style="background: white; padding: 24px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <h2 style="color: #E8A54B; margin-top: 0; font-size: 18px;">📋 Récapitulatif de votre demande</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 120px;">Programme:</td>
                <td style="padding: 8px 0; font-weight: 500;">${yogaTypeName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Nom:</td>
                <td style="padding: 8px 0;">${data.firstName} ${data.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Email:</td>
                <td style="padding: 8px 0;">${data.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Téléphone:</td>
                <td style="padding: 8px 0;">${data.phone}</td>
              </tr>
            </table>
          </div>

          <div style="background: #fff8f0; padding: 20px; border-radius: 8px; border-left: 4px solid #E8A54B; margin: 20px 0;">
            <p style="margin: 0; color: #333; line-height: 1.6;">
              <strong>Prochaines étapes:</strong><br>
              Je vous contacterai personnellement dès qu'une nouvelle session de ${yogaTypeName} sera programmée. Vous serez parmi les premiers informés!
            </p>
          </div>

          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            En attendant, n'hésitez pas à me contacter si vous avez des questions.
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
            Ce message a été envoyé suite à votre demande sur transcendencework.com
          </p>
        </div>
      </div>
    `;

    // Send both emails
    const [notificationResult, confirmationResult] = await Promise.all([
      resend.emails.send({
        from: 'Transcendence Work <hajar@transcendencework.com>',
        to: ['hajar@transcendencework.com'],
        subject: `🧘 Intérêt pour ${yogaTypeName} - ${data.firstName} ${data.lastName}`,
        html: notificationHtml,
      }),
      resend.emails.send({
        from: 'Hajar Habi <hajar@transcendencework.com>',
        to: [data.email],
        subject: `Confirmation de votre intérêt pour ${yogaTypeName}`,
        html: confirmationHtml,
      }),
    ]);

    console.log('Interest emails sent:', {
      notification: notificationResult,
      confirmation: confirmationResult
    });

    return NextResponse.json({
      success: true,
      message: 'Demande enregistrée avec succès',
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
