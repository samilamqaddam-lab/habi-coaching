import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ registrationId: string }> }
) {
  const { registrationId } = await params;

  // Check if Supabase is configured
  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return NextResponse.json(
      { error: 'Service non disponible' },
      { status: 503 }
    );
  }

  try {
    // First, delete the date choices (foreign key constraint)
    const { error: choicesError } = await supabaseAdmin
      .from('registration_date_choices')
      .delete()
      .eq('registration_id', registrationId);

    if (choicesError) {
      console.error('Error deleting date choices:', choicesError);
      // Continue anyway - might not have date choices
    }

    // Then delete the registration
    const { error: deleteError } = await supabaseAdmin
      .from('registrations')
      .delete()
      .eq('id', registrationId);

    if (deleteError) {
      console.error('Delete registration error:', deleteError);
      return NextResponse.json(
        { error: 'Erreur lors de la suppression' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Inscription supprimée définitivement',
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
