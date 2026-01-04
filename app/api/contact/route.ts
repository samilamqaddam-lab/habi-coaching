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
const contactSchema = z.object({
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  organization: z.string().optional(),
  function: z.string().optional(),
  city: z.string().optional(),
  interest: z.enum(['coaching', 'yoga', 'retraite', 'organisation', 'autre']),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
  consent: z.boolean().refine((val) => val === true, 'Vous devez accepter les conditions'),
})

const interestLabels: Record<string, string> = {
  coaching: 'Coaching',
  yoga: 'Yoga',
  retraite: 'Retraite',
  organisation: 'Organisation / Entreprise',
  autre: 'Autre',
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = contactSchema.parse(body)

    // Get Resend client
    const resend = getResendClient()

    // Send email to Hajar
    const { error: sendError } = await resend.emails.send({
      from: 'Transcendence Work <noreply@transcendencework.com>',
      to: ['contact@transcendencework.com'],
      replyTo: validatedData.email,
      subject: `Nouveau message de ${validatedData.firstName} ${validatedData.lastName} - ${interestLabels[validatedData.interest]}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a2e; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #c9a86c 0%, #b89658 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .content { background: #fff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
            .field { margin-bottom: 16px; }
            .label { font-weight: 600; color: #4a4a4a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
            .value { margin-top: 4px; color: #1a1a2e; }
            .message-box { background: #f8f7f4; padding: 20px; border-radius: 8px; margin-top: 20px; }
            .badge { display: inline-block; background: #d4a574; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Nouveau message de contact</h1>
            </div>
            <div class="content">
              <div style="text-align: center; margin-bottom: 20px;">
                <span class="badge">${interestLabels[validatedData.interest]}</span>
              </div>

              <div class="field">
                <div class="label">Nom complet</div>
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

              ${validatedData.organization ? `
              <div class="field">
                <div class="label">Organisation</div>
                <div class="value">${validatedData.organization}</div>
              </div>
              ` : ''}

              ${validatedData.function ? `
              <div class="field">
                <div class="label">Fonction</div>
                <div class="value">${validatedData.function}</div>
              </div>
              ` : ''}

              ${validatedData.city ? `
              <div class="field">
                <div class="label">Ville</div>
                <div class="value">${validatedData.city}</div>
              </div>
              ` : ''}

              <div class="message-box">
                <div class="label">Message</div>
                <div class="value" style="white-space: pre-wrap;">${validatedData.message}</div>
              </div>
            </div>
            <div class="footer">
              Envoyé depuis le formulaire de contact de transcendencework.com
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

    // Send confirmation email to the user (resend already initialized above)
    await resend.emails.send({
      from: 'Hajar Habi - Transcendence Work <noreply@transcendencework.com>',
      to: [validatedData.email],
      subject: 'Votre message a bien été reçu - Transcendence Work',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a2e; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #c9a86c 0%, #b89658 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 300; }
            .content { background: #fff; padding: 40px 30px; border: 1px solid #e0e0e0; border-top: none; }
            .content h2 { color: #1a1a2e; margin-top: 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; background: #f8f7f4; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Transcendence Work</h1>
            </div>
            <div class="content">
              <h2>Merci pour votre message, ${validatedData.firstName} !</h2>
              <p>J'ai bien reçu votre demande concernant <strong>${interestLabels[validatedData.interest].toLowerCase()}</strong>.</p>
              <p>Je vous répondrai dans les plus brefs délais, généralement sous 24 à 48 heures.</p>
              <p>En attendant, n'hésitez pas à explorer mes <a href="https://transcendencework.com/programmes">programmes</a> ou à consulter mes <a href="https://transcendencework.com/ressources">ressources</a>.</p>
              <p style="margin-top: 30px;">
                À très bientôt,<br>
                <strong>Hajar Habi</strong><br>
                <em>Coach Holistique & Professeure de Yoga</em>
              </p>
            </div>
            <div class="footer">
              <p>Transcendence Work - Coaching Holistique & Yoga Traditionnel</p>
              <p><a href="https://transcendencework.com">transcendencework.com</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    return NextResponse.json({ success: true, message: 'Message envoyé avec succès' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      )
    }

    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}
