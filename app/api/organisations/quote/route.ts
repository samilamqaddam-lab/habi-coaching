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
  size: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']),
  service: z.enum(['transformation', 'leadership', 'retraite', 'facilitation', 'yoga-corporate', 'autre']),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
})

const sizeLabels: Record<string, string> = {
  '1-10': '1-10 employés',
  '11-50': '11-50 employés',
  '51-200': '51-200 employés',
  '201-500': '201-500 employés',
  '500+': 'Plus de 500 employés',
}

const serviceLabels: Record<string, string> = {
  transformation: 'Transformation organisationnelle',
  leadership: 'Leadership conscient',
  retraite: 'Retraite corporate',
  facilitation: 'Facilitation ponctuelle',
  'yoga-corporate': 'Yoga corporate',
  autre: 'Autre / À définir ensemble',
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log('Received quote request:', body)

    // Validate input
    const validatedData = quoteSchema.parse(body)

    console.log('Validated data:', validatedData)

    // Get Resend client
    const resend = getResendClient()

    // Send email to Hajar
    const { error: sendError } = await resend.emails.send({
      from: 'Transcendence Work <hajar@transcendencework.com>',
      to: ['hajar@transcendencework.com'],
      replyTo: validatedData.email,
      subject: `Nouvelle demande rendez-vous - ${validatedData.organization} - ${serviceLabels[validatedData.service]}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #1a1a2e;
              background: #f5f5f5;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            }
            .header {
              background: linear-gradient(135deg, #2d5a7b 0%, #1a365d 100%);
              padding: 40px 30px;
              text-align: center;
              position: relative;
            }
            .header::after {
              content: '';
              position: absolute;
              bottom: -10px;
              left: 0;
              right: 0;
              height: 10px;
              background: linear-gradient(to bottom, rgba(0,0,0,0.1), transparent);
            }
            .header h1 {
              color: white;
              font-size: 28px;
              font-weight: 600;
              margin: 0;
              letter-spacing: -0.5px;
            }
            .header p {
              color: rgba(255,255,255,0.9);
              font-size: 14px;
              margin-top: 8px;
            }
            .content {
              padding: 40px 30px;
            }
            .badge-container {
              text-align: center;
              margin-bottom: 30px;
            }
            .badge {
              display: inline-block;
              background: linear-gradient(135deg, #2d5a7b 0%, #1a365d 100%);
              color: white;
              padding: 8px 20px;
              border-radius: 25px;
              font-size: 13px;
              font-weight: 600;
              letter-spacing: 0.3px;
              box-shadow: 0 2px 8px rgba(45, 90, 123, 0.3);
            }
            .info-grid {
              background: #f8f9fa;
              border-radius: 10px;
              padding: 25px;
              margin-bottom: 25px;
            }
            .field {
              margin-bottom: 18px;
              padding-bottom: 18px;
              border-bottom: 1px solid #e8e8e8;
            }
            .field:last-child {
              margin-bottom: 0;
              padding-bottom: 0;
              border-bottom: none;
            }
            .label {
              font-weight: 600;
              color: #2d5a7b;
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 6px;
              display: block;
            }
            .value {
              color: #1a1a2e;
              font-size: 15px;
              font-weight: 500;
            }
            .value a {
              color: #2d5a7b;
              text-decoration: none;
              border-bottom: 1px solid transparent;
              transition: border-color 0.2s;
            }
            .value a:hover {
              border-bottom-color: #2d5a7b;
            }
            .message-box {
              background: linear-gradient(135deg, #f8f7f4 0%, #faf9f6 100%);
              padding: 25px;
              border-radius: 10px;
              border-left: 4px solid #2d5a7b;
              box-shadow: 0 2px 6px rgba(0,0,0,0.04);
            }
            .message-box .label {
              color: #1a365d;
              margin-bottom: 12px;
            }
            .message-box .value {
              white-space: pre-wrap;
              line-height: 1.7;
              color: #333;
            }
            .footer {
              text-align: center;
              padding: 25px 30px;
              background: #f8f9fa;
              color: #666;
              font-size: 12px;
              line-height: 1.5;
            }
            .footer-logo {
              color: #2d5a7b;
              font-weight: 600;
              font-size: 13px;
              margin-bottom: 5px;
            }
            @media only screen and (max-width: 600px) {
              body { padding: 10px; }
              .header { padding: 30px 20px; }
              .content { padding: 25px 20px; }
              .info-grid { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Nouvelle Demande de Rendez-vous</h1>
              <p>Demande d'accompagnement organisationnel</p>
            </div>

            <div class="content">
              <div class="badge-container">
                <span class="badge">${serviceLabels[validatedData.service]}</span>
              </div>

              <div class="info-grid">
                <div class="field">
                  <div class="label">👤 Contact</div>
                  <div class="value">${validatedData.firstName} ${validatedData.lastName}</div>
                </div>

                <div class="field">
                  <div class="label">✉️ Email</div>
                  <div class="value"><a href="mailto:${validatedData.email}">${validatedData.email}</a></div>
                </div>

                ${validatedData.phone ? `
                <div class="field">
                  <div class="label">📞 Téléphone</div>
                  <div class="value"><a href="tel:${validatedData.phone.replace(/\s/g, '')}">${validatedData.phone}</a></div>
                </div>
                ` : ''}

                <div class="field">
                  <div class="label">🏢 Organisation</div>
                  <div class="value">${validatedData.organization}</div>
                </div>

                <div class="field">
                  <div class="label">👥 Taille</div>
                  <div class="value">${sizeLabels[validatedData.size]}</div>
                </div>

                <div class="field">
                  <div class="label">🎯 Type d'accompagnement</div>
                  <div class="value">${serviceLabels[validatedData.service]}</div>
                </div>
              </div>

              <div class="message-box">
                <div class="label">💬 Description du projet</div>
                <div class="value">${validatedData.message}</div>
              </div>
            </div>

            <div class="footer">
              <div class="footer-logo">Transcendence Work</div>
              <div>Demande envoyée depuis transcendencework.com/organisations</div>
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

    // Send confirmation email to the user
    await resend.emails.send({
      from: 'Hajar Habi <hajar@transcendencework.com>',
      to: [validatedData.email],
      subject: 'Votre demande a bien été reçue - Transcendence Work',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.7;
              color: #1a1a2e;
              background: #f5f5f5;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            }
            .header {
              background: linear-gradient(135deg, #2d5a7b 0%, #1a365d 100%);
              padding: 50px 30px;
              text-align: center;
              position: relative;
            }
            .header::after {
              content: '';
              position: absolute;
              bottom: -10px;
              left: 0;
              right: 0;
              height: 10px;
              background: linear-gradient(to bottom, rgba(0,0,0,0.1), transparent);
            }
            .header h1 {
              color: white;
              font-size: 32px;
              font-weight: 300;
              margin: 0;
              letter-spacing: -0.5px;
            }
            .content {
              padding: 45px 35px;
            }
            .content h2 {
              color: #1a365d;
              font-size: 24px;
              font-weight: 600;
              margin: 0 0 20px 0;
              line-height: 1.3;
            }
            .content p {
              margin-bottom: 18px;
              color: #333;
              font-size: 15px;
            }
            .content strong {
              color: #2d5a7b;
              font-weight: 600;
            }
            .content a {
              color: #2d5a7b;
              text-decoration: none;
              border-bottom: 1px solid rgba(45, 90, 123, 0.3);
              transition: border-color 0.2s;
            }
            .content a:hover {
              border-bottom-color: #2d5a7b;
            }
            .highlight-box {
              background: linear-gradient(135deg, #f8f7f4 0%, #faf9f6 100%);
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #2d5a7b;
              margin: 25px 0;
            }
            .signature {
              margin-top: 35px;
              padding-top: 25px;
              border-top: 1px solid #e8e8e8;
              color: #555;
              font-size: 14px;
            }
            .signature strong {
              color: #1a365d;
              font-size: 16px;
              display: block;
              margin-bottom: 5px;
            }
            .footer {
              text-align: center;
              padding: 25px 30px;
              background: #f8f9fa;
              color: #666;
              font-size: 12px;
              line-height: 1.6;
            }
            .footer-logo {
              color: #2d5a7b;
              font-weight: 600;
              font-size: 13px;
              margin-bottom: 8px;
            }
            .footer a {
              color: #2d5a7b;
              text-decoration: none;
            }
            @media only screen and (max-width: 600px) {
              body { padding: 10px; }
              .header { padding: 40px 25px; }
              .content { padding: 30px 25px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Transcendence Work</h1>
            </div>

            <div class="content">
              <h2>Merci pour votre demande, ${validatedData.firstName} !</h2>

              <p>J'ai bien reçu votre demande concernant <strong>${serviceLabels[validatedData.service].toLowerCase()}</strong> pour <strong>${validatedData.organization}</strong>.</p>

              <div class="highlight-box">
                <p style="margin: 0;">
                  ✓ Je reviendrai vers vous dans les <strong>24 à 48 heures</strong> pour discuter de votre projet et vous proposer un accompagnement sur-mesure.
                </p>
              </div>

              <p>En attendant, n'hésitez pas à explorer mes <a href="https://transcendencework.com/organisations">services pour les organisations</a> ou à consulter mon <a href="https://transcendencework.com/expertise">parcours professionnel</a>.</p>

              <div class="signature">
                <p style="margin-bottom: 8px;">À très bientôt,</p>
                <strong>Hajar Habi</strong>
                <p style="margin-top: 5px; margin-bottom: 0;">
                  Coach Professionnelle & Consultante<br>
                  Certifiée Coach & Team - Transformance Pro (EMCC)<br>
                  ≃20 ans Expérience Corporate & Conseil
                </p>
                <p style="margin-top: 10px; margin-bottom: 0;">
                  <a href="https://www.transcendencework.com/organisations">www.transcendencework.com/organisations</a>
                </p>
              </div>
            </div>

            <div class="footer">
              <div class="footer-logo">Transcendence Work</div>
              <div>Transformation Organisationnelle • Leadership Conscient • Retraites Corporate</div>
              <div style="margin-top: 8px;"><a href="https://transcendencework.com">transcendencework.com</a></div>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    return NextResponse.json({ success: true, message: 'Demande envoyée avec succès' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.issues)
      const errorMessages = error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join(', ')
      return NextResponse.json(
        { success: false, error: `Erreur de validation: ${errorMessages}`, errors: error.issues },
        { status: 400 }
      )
    }

    console.error('Quote form error:', error)
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue lors de l\'envoi' },
      { status: 500 }
    )
  }
}
