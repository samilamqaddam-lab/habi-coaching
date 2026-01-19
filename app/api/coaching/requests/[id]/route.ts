import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Validation schema for update
const updateSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled']).optional(),
  contacted: z.boolean().optional(),
  notes: z.string().nullable().optional(),
});

export async function GET(
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

  try {
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

    return NextResponse.json({ request: coachingRequest });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function PATCH(
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

  try {
    const body = await request.json();
    const validation = updateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validation.error.issues },
        { status: 400 }
      );
    }

    // Get current request to check for status change
    const { data: currentRequest } = await supabaseAdmin
      .from('coaching_requests')
      .select('*, coaching_packages(*)')
      .eq('id', id)
      .single();

    const updateData: Record<string, unknown> = {};
    if (validation.data.status !== undefined) {
      updateData.status = validation.data.status;
    }
    if (validation.data.contacted !== undefined) {
      updateData.contacted = validation.data.contacted;
    }
    if (validation.data.notes !== undefined) {
      updateData.notes = validation.data.notes;
    }

    const { data: updated, error } = await supabaseAdmin
      .from('coaching_requests')
      .update(updateData)
      .eq('id', id)
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
      .single();

    if (error || !updated) {
      console.error('Update error:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour' },
        { status: 500 }
      );
    }

    // Send confirmation email when status changes to 'confirmed'
    if (
      resend &&
      validation.data.status === 'confirmed' &&
      currentRequest?.status !== 'confirmed'
    ) {
      const packageData = updated.coaching_packages as {
        name: string;
        session_count: number;
        session_duration: number;
        price: string;
      };

      const formatLabel = {
        online: 'En ligne',
        in_person: 'En présentiel',
        both: 'En ligne ou en présentiel',
      }[updated.preferred_format as string] || 'Non spécifié';

      const confirmationHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #9B6B9E; background: linear-gradient(135deg, #9B6B9E 0%, #7d5580 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">✅ Inscription Confirmée</h1>
          </div>

          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Bonjour <strong>${updated.first_name}</strong>,
            </p>

            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Excellente nouvelle ! Votre inscription au programme de coaching a été <strong>confirmée</strong>.
            </p>

            <div style="background: white; padding: 24px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <h2 style="color: #9B6B9E; margin-top: 0; font-size: 18px;">📦 Votre programme</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #666; width: 120px;">Package:</td>
                  <td style="padding: 10px 0; font-weight: 600; color: #1a365d;">${packageData?.name || 'Package coaching'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;">Séances:</td>
                  <td style="padding: 10px 0;">${packageData?.session_count || '-'} séance(s) de ${packageData?.session_duration || '-'} min</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;">Format:</td>
                  <td style="padding: 10px 0;">${formatLabel}</td>
                </tr>
              </table>
            </div>

            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 20px 0;">
              <p style="margin: 0; color: #166534; line-height: 1.6;">
                <strong>🎯 Prochaine étape</strong><br>
                Je vous contacterai très prochainement pour planifier ensemble vos séances de coaching.
              </p>
            </div>

            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 30px;">
              À très bientôt,<br><br>
              <strong>Hajar Habi</strong><br>
              <span style="color: #666; font-size: 14px;">Coach Professionnelle Certifiée</span><br>
              <span style="color: #666; font-size: 14px;">Coach & Team – Transformance Pro</span><br>
              <a href="https://www.transcendencework.com/coaching" style="color: #9B6B9E; font-size: 14px;">www.transcendencework.com/coaching</a>
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
          to: [updated.email],
          subject: `✅ Inscription confirmée - ${packageData?.name || 'Coaching'}`,
          html: confirmationHtml,
        });
      } catch (emailError) {
        console.error('Confirmation email error:', emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({ request: updated });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

  try {
    const { error } = await supabaseAdmin
      .from('coaching_requests')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete error:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la suppression' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
