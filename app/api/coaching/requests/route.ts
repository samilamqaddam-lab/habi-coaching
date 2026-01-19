import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  // Check if Supabase is configured
  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return NextResponse.json(
      { error: 'Service non disponible' },
      { status: 503 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let query = supabaseAdmin
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
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data: requests, error } = await query;

    if (error) {
      console.error('Error fetching requests:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des demandes' },
        { status: 500 }
      );
    }

    // Get stats
    const { data: allRequests } = await supabaseAdmin
      .from('coaching_requests')
      .select('status');

    const stats = {
      total: allRequests?.length || 0,
      pending: allRequests?.filter(r => r.status === 'pending').length || 0,
      contacted: allRequests?.filter(r => r.status === 'contacted').length || 0,
      confirmed: allRequests?.filter(r => r.status === 'confirmed').length || 0,
      cancelled: allRequests?.filter(r => r.status === 'cancelled').length || 0,
    };

    return NextResponse.json({ requests, stats });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
