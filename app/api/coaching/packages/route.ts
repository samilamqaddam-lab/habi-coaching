import { NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

export async function GET() {
  // Check if Supabase is configured
  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return NextResponse.json(
      { error: 'Service non disponible' },
      { status: 503 }
    );
  }

  try {
    const { data: packages, error } = await supabaseAdmin
      .from('coaching_packages')
      .select('*')
      .eq('is_active', true)
      .order('display_order');

    if (error) {
      console.error('Error fetching packages:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des packages' },
        { status: 500 }
      );
    }

    return NextResponse.json({ packages });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
