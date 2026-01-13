import { createClient } from '@supabase/supabase-js';

// Types for our database
export interface ProgrammeEdition {
  id: string;
  programme_key: string;
  title: string;
  title_en?: string;
  start_date: string;
  max_capacity: number;
  is_active: boolean;
  created_at: string;
}

export interface EditionSession {
  id: string;
  edition_id: string;
  session_number: number;
  title: string;
  title_en?: string;
  created_at: string;
}

export interface SessionDateOption {
  id: string;
  session_id: string;
  date_time: string;
  location: string;
  max_capacity: number;
  created_at: string;
}

// Extended type with availability info (from date_availability view)
export interface SessionDateOptionWithAvailability extends SessionDateOption {
  current_count: number;
  remaining_spots: number;
  is_full: boolean;
}

// Extended type with date options included (from API joins)
export interface EditionSessionWithDates extends EditionSession {
  session_date_options: SessionDateOption[];
}

// Extended type with date options and availability (from API /programmes/[editionId] endpoint)
// Note: API transforms session_date_options to date_options with availability
export interface EditionSessionWithAvailability extends Omit<EditionSession, 'created_at'> {
  edition_id: string;
  date_options: SessionDateOptionWithAvailability[];
}

export interface Registration {
  id: string;
  edition_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  consent: boolean;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

export interface RegistrationDateChoice {
  id: string;
  registration_id: string;
  date_option_id: string;
  created_at: string;
}

export interface DateAvailability {
  date_option_id: string;
  session_id: string;
  date_time: string;
  max_capacity: number;
  current_count: number;
  remaining_spots: number;
  is_full: boolean;
}

// Extended types for API responses
export interface SessionWithDates extends EditionSession {
  date_options: (SessionDateOption & { availability: DateAvailability })[];
}

export interface EditionWithSessions extends ProgrammeEdition {
  sessions: SessionWithDates[];
}

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate environment variables
if (!supabaseUrl) {
  console.warn('Missing NEXT_PUBLIC_SUPABASE_URL - Supabase features will be disabled');
}

// Browser client (uses anon key, respects RLS)
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Server client (uses service role key, bypasses RLS)
export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => {
  console.log('[Supabase Config Check]', {
    hasUrl: !!supabaseUrl,
    hasAnonKey: !!supabaseAnonKey,
    hasServiceKey: !!supabaseServiceKey,
    urlValue: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'missing',
  });
  return !!supabaseUrl && !!supabaseAnonKey;
};

// Helper to get active edition for a programme
export async function getActiveEdition(programmeKey: string): Promise<EditionWithSessions | null> {
  if (!supabase) return null;

  // Get active edition
  const { data: edition, error: editionError } = await supabase
    .from('programme_editions')
    .select('*')
    .eq('programme_key', programmeKey)
    .eq('is_active', true)
    .single();

  if (editionError || !edition) return null;

  // Get sessions with date options
  const { data: sessions, error: sessionsError } = await supabase
    .from('edition_sessions')
    .select(`
      *,
      session_date_options (*)
    `)
    .eq('edition_id', edition.id)
    .order('session_number');

  if (sessionsError) return null;

  // Get availability for all date options
  const { data: availability, error: availError } = await supabase
    .from('date_availability')
    .select('*');

  if (availError) return null;

  // Map availability to date options
  const sessionsWithAvailability = sessions?.map(session => ({
    ...session,
    date_options: session.session_date_options?.map((option: SessionDateOption) => ({
      ...option,
      availability: availability?.find(a => a.date_option_id === option.id) || {
        date_option_id: option.id,
        session_id: session.id,
        date_time: option.date_time,
        max_capacity: option.max_capacity,
        current_count: 0,
        remaining_spots: option.max_capacity,
        is_full: false,
      },
    })) || [],
  })) || [];

  return {
    ...edition,
    sessions: sessionsWithAvailability,
  };
}

// Helper to register for an edition
export async function registerForEdition(
  editionId: string,
  registration: Omit<Registration, 'id' | 'edition_id' | 'status' | 'created_at'>,
  dateChoices: string[] // Array of date_option_ids
): Promise<{ success: boolean; registrationId?: string; error?: string }> {
  if (!supabaseAdmin) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    // Start a transaction-like operation
    // 1. Check availability for all chosen dates
    const { data: availability } = await supabaseAdmin
      .from('date_availability')
      .select('*')
      .in('date_option_id', dateChoices);

    const fullDates = availability?.filter(a => a.is_full) || [];
    if (fullDates.length > 0) {
      return {
        success: false,
        error: 'Certaines dates sont complètes. Veuillez rafraîchir et choisir d\'autres dates.'
      };
    }

    // 2. Create registration
    const { data: newReg, error: regError } = await supabaseAdmin
      .from('registrations')
      .insert({
        edition_id: editionId,
        ...registration,
        status: 'pending',
      })
      .select()
      .single();

    if (regError || !newReg) {
      return { success: false, error: 'Erreur lors de l\'inscription' };
    }

    // 3. Create date choices
    const dateChoiceInserts = dateChoices.map(dateOptionId => ({
      registration_id: newReg.id,
      date_option_id: dateOptionId,
    }));

    const { error: choicesError } = await supabaseAdmin
      .from('registration_date_choices')
      .insert(dateChoiceInserts);

    if (choicesError) {
      // Rollback registration if choices fail
      await supabaseAdmin
        .from('registrations')
        .delete()
        .eq('id', newReg.id);
      return { success: false, error: 'Erreur lors de l\'enregistrement des dates' };
    }

    return { success: true, registrationId: newReg.id };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Erreur inattendue' };
  }
}
