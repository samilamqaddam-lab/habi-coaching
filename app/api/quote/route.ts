import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

// Initialize Resend lazily to avoid build errors
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured')
  }
  return new Resend(apiKey)
}

// Validation schema
const quoteSchema = z.object({
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  organization: z.string().min(1, 'Le nom de l\'organisation est requis'),
  companySize: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']),
  serviceType: z.enum(['coaching-equipe', 'atelier-bienetre', 'formation-leadership', 'programme-complet', 'autre']),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
})

const companySizeLabels: Record<string, string> = {
  '1-10': '1-10 employés',
  '11-50': '11-50 employés',
  '51-200': '51-200 employés',
  '201-500': '201-500 employés',
  '500+': 'Plus de 500 employés',
}

const serviceTypeLabels: Record<string, string> = {
  'coaching-equipe': 'Coaching d\'équipe',
  'atelier-bienetre': 'Atelier bien-être',
  'formation-leadership': 'Formation leadership',
  'programme-complet': 'Programme complet sur mesure',
  'autre': 'Autre',
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = quoteSchema.parse(body)

    // Get Resend client
    const resend = getResendClient()

    // Send email to Hajar
    const { error: sendError } = await resend.emails.send({
      from: 'Transcendence Work <hajar@transcendencework.com>',
      to: ['hajar@transcendencework.com'],
      replyTo: validatedData.email,
      subject: `🏢 Demande de devis - ${validatedData.organization} - ${serviceTypeLabels[validatedData.serviceType]}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a2e; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2a4a6b 0%, #1e3a5f 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .content { background: #fff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
            .field { margin-bottom: 16px; }
            .label { font-weight: 600; color: #4a4a4a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
            .value { margin-top: 4px; color: #1a1a2e; }
            .message-box { background: #f8f7f4; padding: 20px; border-radius: 8px; margin-top: 20px; }
            .badge { display: inline-block; background: #2a4a6b; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
            .badge-size { background: #5a8a6b; margin-left: 8px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .priority { background: #fff3cd; border: 1px solid #ffc107; padding: 12px; border-radius: 8px; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏢 Demande de Devis Entreprise</h1>
            </div>
            <div class="content">
              <div class="priority">
                <strong>⚡ Demande B2B</strong> - À traiter en priorité
              </div>

              <div style="text-align: center; margin-bottom: 20px;">
                <span class="badge">${serviceTypeLabels[validatedData.serviceType]}</span>
                <span class="badge badge-size">${companySizeLabels[validatedData.companySize]}</span>
              </div>

              <div class="field">
                <div class="label">Organisation</div>
                <div class="value"><strong>${validatedData.organization}</strong></div>
              </div>

              <div class="field">
                <div class="label">Contact</div>
                <div class="value">${validatedData.firstName} ${validatedData.lastName}</div>
              </div>

              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${validatedData.email}">${validatedData.email}</a></div>
              </div>

              ${validatedData.phone ? `
              <div class="field">
                <div class="label">Téléphone</div>
                <div class="value">${validatedData.phone}</div>
              </div>
              ` : ''}

              <div class="message-box">
                <div class="label">Description du besoin</div>
                <div class="value" style="white-space: pre-wrap;">${validatedData.message}</div>
              </div>
            </div>
            <div class="footer">
              Demande de devis depuis transcendencework.com/organisations
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (sendError) {
      console.error('Error sending email:', sendError)
      return NextResponse.json(
        { success: false, error: 'Erreur lors de l\'envoi de l\'email' },
        { status: 500 }
      )
    }

    // Send confirmation email to the organization
    await resend.emails.send({
      from: 'Hajar Habi <hajar@transcendencework.com>',
      to: [validatedData.email],
      subject: 'Votre demande de devis - Transcendence Work',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a2e; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2a4a6b 0%, #1e3a5f 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 300; }
            .content { background: #fff; padding: 40px 30px; border: 1px solid #e0e0e0; border-top: none; }
            .content h2 { color: #1a1a2e; margin-top: 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; background: #f8f7f4; border-radius: 0 0 8px 8px; }
            .recap { background: #f0f4f8; padding: 16px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Transcendence Work</h1>
            </div>
            <div class="content">
              <h2>Merci pour votre demande de devis !</h2>
              <p>Bonjour ${validatedData.firstName},</p>
              <p>J'ai bien reçu votre demande de devis pour <strong>${validatedData.organization}</strong>.</p>

              <div class="recap">
                <strong>Récapitulatif :</strong><br>
                Service : ${serviceTypeLabels[validatedData.serviceType]}<br>
                Taille de l'organisation : ${companySizeLabels[validatedData.companySize]}
              </div>

              <p>Je reviendrai vers vous sous 48 heures avec une proposition personnalisée adaptée à vos besoins.</p>

              <p>En attendant, vous pouvez découvrir mes <a href="https://transcendencework.com/organisations">solutions entreprise</a> ou me contacter directement si vous avez des questions.</p>

              <p style="margin-top: 30px;">
                Namaskaram,<br>
                <em>In Love, Light & Laughter</em><br><br>
                🙏<br><br>
                <strong>Hajar Habi</strong><br>
                Professeure de Hatha Yoga Classique<br>
                Certifiée par Sadhguru Gurukulam<br>
                <a href="https://www.transcendencework.com/yoga">www.transcendencework.com/yoga</a>
              </p>
            </div>
            <div class="footer">
              <p>Transcendence Work - Coaching Professionnel et Yoga Classique</p>
              <p><a href="https://transcendencework.com">transcendencework.com</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    return NextResponse.json({ success: true, message: 'Demande de devis envoyée avec succès' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      )
    }

    console.error('Quote form error:', error)
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}
