import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Validation schema
const registrationSchema = z.object({
  packageSlug: z.string().min(1, 'Package requis'),
  firstName: z.string().min(2, 'Prénom requis'),
  lastName: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(8, 'Téléphone requis'),
  whatsapp: z.string().nullable().optional(),
  preferredFormat: z.enum(['online', 'in_person', 'both'] as const, {
    message: 'Format préféré requis',
  }),
  message: z.string().nullable().optional(),
  consent: z.boolean().refine(val => val === true, 'Consentement requis'),
});

export async function POST(request: NextRequest) {
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

    const { packageSlug, firstName, lastName, email, phone, whatsapp, preferredFormat, message, consent } = validation.data;

    // Get package details
    const { data: packageData, error: packageError } = await supabaseAdmin
      .from('coaching_packages')
      .select('*')
      .eq('slug', packageSlug)
      .eq('is_active', true)
      .single();

    if (packageError || !packageData) {
      return NextResponse.json(
        { error: 'Package non trouvé' },
        { status: 404 }
      );
    }

    // Create coaching request
    const { data: coachingRequest, error: requestError } = await supabaseAdmin
      .from('coaching_requests')
      .insert({
        package_id: packageData.id,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        whatsapp: whatsapp || null,
        preferred_format: preferredFormat,
        message: message || null,
        consent,
        status: 'pending',
      })
      .select()
      .single();

    if (requestError || !coachingRequest) {
      console.error('Registration error:', requestError);
      return NextResponse.json(
        { error: 'Erreur lors de l\'inscription' },
        { status: 500 }
      );
    }

    // Send emails
    if (resend) {
      const formatLabel = {
        online: 'En ligne',
        in_person: 'En présentiel',
        both: 'En ligne ou en présentiel',
      }[preferredFormat];

      const adminUrl = `https://transcendencework.com/admin/coaching`;

      // Admin email
      const adminHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #9B6B9E; background: linear-gradient(135deg, #9B6B9E 0%, #7d5580 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">💼 Nouvelle Demande Coaching</h1>
            <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px;">${packageData.name}</p>
          </div>

          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
            <!-- Action Button -->
            <div style="text-align: center; margin-bottom: 25px;">
              <a href="${adminUrl}" style="display: inline-block; background: linear-gradient(135deg, #9B6B9E 0%, #7d5580 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: bold; font-size: 16px;">
                📋 Gérer les demandes coaching
              </a>
            </div>

            <!-- Request ID Badge -->
            <div style="text-align: center; margin-bottom: 20px;">
              <span style="display: inline-block; background: #e2e8f0; color: #475569; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-family: monospace;">
                ID: ${coachingRequest.id.slice(0, 8)}...
              </span>
            </div>

            <!-- Package Info -->
            <div style="background: white; padding: 24px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <h2 style="color: #1a365d; margin-top: 0; font-size: 16px; border-bottom: 2px solid #9B6B9E; padding-bottom: 10px;">
                📦 Package choisi
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #666; width: 120px;">Package:</td>
                  <td style="padding: 10px 0; font-weight: 600; color: #1a365d;">${packageData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;">Séances:</td>
                  <td style="padding: 10px 0;">${packageData.session_count} x ${packageData.session_duration} min</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;">Prix:</td>
                  <td style="padding: 10px 0; font-weight: 600; color: #9B6B9E;">${packageData.price} DH</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;">Format préféré:</td>
                  <td style="padding: 10px 0;">${formatLabel}</td>
                </tr>
              </table>
            </div>

            <!-- Participant Info -->
            <div style="background: white; padding: 24px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <h2 style="color: #1a365d; margin-top: 0; font-size: 16px; border-bottom: 2px solid #9B6B9E; padding-bottom: 10px;">
                👤 Participant
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #666; width: 100px;">Nom:</td>
                  <td style="padding: 10px 0; font-weight: 600; font-size: 16px; color: #1a365d;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;">Email:</td>
                  <td style="padding: 10px 0;">
                    <a href="mailto:${email}" style="color: #9B6B9E; text-decoration: none; font-weight: 500;">${email}</a>
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

            ${message ? `
            <div style="background: white; padding: 24px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <h2 style="color: #1a365d; margin-top: 0; font-size: 16px; border-bottom: 2px solid #9B6B9E; padding-bottom: 10px;">
                💬 Message
              </h2>
              <p style="line-height: 1.6; color: #333; white-space: pre-wrap; background: #f8fafc; padding: 15px; border-radius: 6px; border-left: 3px solid #9B6B9E;">${message}</p>
            </div>
            ` : ''}

            <!-- Status -->
            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 8px; border: 1px solid #f59e0b; text-align: center;">
              <p style="color: #92400e; margin: 0; font-size: 15px; font-weight: 600;">
                ⏳ En attente de prise de contact
              </p>
            </div>

            <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                Email automatique • <a href="${adminUrl}" style="color: #64748b;">Accéder au dashboard</a>
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
          subject: `💼 Nouvelle demande coaching - ${packageData.name} - ${firstName} ${lastName}`,
          html: adminHtml,
        });
      } catch (emailError) {
        console.error('Admin email error:', emailError);
      }

      // Participant email
      const participantHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #9B6B9E; background: linear-gradient(135deg, #9B6B9E 0%, #7d5580 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🙏 Demande Reçue</h1>
          </div>

          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Bonjour <strong>${firstName}</strong>,
            </p>

            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Merci pour votre intérêt pour le coaching professionnel. Votre demande a bien été reçue!
            </p>

            <div style="background: white; padding: 24px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <h2 style="color: #9B6B9E; margin-top: 0; font-size: 18px;">📦 Votre choix</h2>
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
                  <td style="padding: 10px 0; color: #666;">Prix:</td>
                  <td style="padding: 10px 0; font-weight: 600; color: #9B6B9E;">${packageData.price} DH</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;">Format:</td>
                  <td style="padding: 10px 0;">${formatLabel}</td>
                </tr>
              </table>
            </div>

            <div style="background: #f3e8f4; padding: 20px; border-radius: 8px; border-left: 4px solid #9B6B9E; margin: 20px 0;">
              <p style="margin: 0; color: #5a3d5c; line-height: 1.6;">
                <strong>⏳ Prochaine étape</strong><br>
                Je reviendrai vers vous dans les <strong>24-48 heures</strong> pour discuter de votre projet et planifier notre première séance.
              </p>
            </div>

            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Si vous avez des questions en attendant, n'hésitez pas à me contacter.
            </p>

            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 30px;">
              À très bientôt,<br><br>
              <strong>Hajar Habi</strong><br>
              <span style="color: #666; font-size: 14px;">Coach Professionnelle Certifiée</span><br>
              <span style="color: #666; font-size: 14px;">Coach & Team – Transformance Pro</span><br>
              <a href="https://www.transcendencework.com/coaching" style="color: #9B6B9E; font-size: 14px;">www.transcendencework.com/coaching</a>
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
          subject: `🙏 Demande coaching reçue - ${packageData.name}`,
          html: participantHtml,
        });
      } catch (emailError) {
        console.error('Confirmation email error:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      requestId: coachingRequest.id,
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
