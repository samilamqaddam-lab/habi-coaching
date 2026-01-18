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

    // Admin editions URL
    const adminUrl = 'https://transcendencework.com/admin/editions';

    // Send notification email to Hajar
    const notificationHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #7c3aed; background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">💜 Manifestation d'Intérêt</h1>
          <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 14px;">${yogaTypeName}</p>
        </div>

        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
          <!-- Info Banner -->
          <div style="background-color: #faf5ff; background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); padding: 16px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #c4b5fd; text-align: center;">
            <p style="margin: 0; color: #6d28d9; font-size: 14px;">
              📌 Cette personne souhaite être informée des prochaines sessions
            </p>
          </div>

          <div style="background: white; padding: 24px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <h2 style="color: #1a365d; margin-top: 0; font-size: 16px; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">
              👤 Contact
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #666; width: 100px; vertical-align: top;">Nom:</td>
                <td style="padding: 10px 0; font-weight: 600; font-size: 16px; color: #1a365d;">${data.firstName} ${data.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666; vertical-align: top;">Email:</td>
                <td style="padding: 10px 0;">
                  <a href="mailto:${data.email}" style="color: #7c3aed; text-decoration: none; font-weight: 500;">${data.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666; vertical-align: top;">Téléphone:</td>
                <td style="padding: 10px 0;">
                  <a href="tel:${data.phone}" style="color: #1a365d; text-decoration: none;">${data.phone}</a>
                  ${data.whatsapp ? `
                  <br>
                  <a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}" style="display: inline-flex; align-items: center; gap: 4px; color: #25D366; text-decoration: none; font-size: 13px; margin-top: 4px;">
                    <span style="background: #25D366; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px;">WhatsApp</span>
                    ${data.whatsapp}
                  </a>
                  ` : ''}
                </td>
              </tr>
            </table>
          </div>

          ${data.message ? `
          <div style="background: white; padding: 24px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <h2 style="color: #1a365d; margin-top: 0; font-size: 16px; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">
              💬 Message
            </h2>
            <p style="line-height: 1.6; color: #333; white-space: pre-wrap; background: #f8fafc; padding: 15px; border-radius: 6px; border-left: 3px solid #7c3aed;">${data.message}</p>
          </div>
          ` : ''}

          <!-- Action Section -->
          <div style="background-color: #fef3c7; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 8px; border: 1px solid #f59e0b; text-align: center;">
            <p style="color: #92400e; margin: 0 0 15px 0; font-size: 14px;">
              <strong>💡 Action suggérée:</strong> Créer une nouvelle édition ou contacter cette personne
            </p>
            <a href="${adminUrl}" style="display: inline-block; background-color: #1a365d; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 500; font-size: 14px;">
              Gérer les éditions →
            </a>
          </div>

          <!-- Footer -->
          <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
              Email automatique • <a href="${adminUrl}" style="color: #64748b;">Accéder au dashboard</a>
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
