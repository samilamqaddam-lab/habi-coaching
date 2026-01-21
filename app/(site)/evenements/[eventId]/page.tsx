import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import EventPageContent from './EventPageContent';

interface PageProps {
  params: Promise<{ eventId: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { eventId } = await params;

  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return { title: 'Événement' };
  }

  const { data: event } = await supabaseAdmin
    .from('yoga_events')
    .select('title, subtitle, description')
    .eq('id', eventId)
    .eq('is_active', true)
    .single();

  if (!event) {
    return { title: 'Événement non trouvé' };
  }

  return {
    title: `${event.title} | Transcendence Work`,
    description: event.description || event.subtitle || `Découvrez ${event.title}`,
    openGraph: {
      title: event.title,
      description: event.description || event.subtitle || `Découvrez ${event.title}`,
    },
  };
}

export default async function EventPage({ params }: PageProps) {
  const { eventId } = await params;

  if (!isSupabaseConfigured() || !supabaseAdmin) {
    notFound();
  }

  // Fetch event data
  const { data: event, error } = await supabaseAdmin
    .from('yoga_events')
    .select('*')
    .eq('id', eventId)
    .eq('is_active', true)
    .single();

  if (error || !event) {
    notFound();
  }

  // Check if event is in the past
  const isPast = new Date(event.date_time) < new Date();
  if (isPast) {
    notFound();
  }

  // Get availability
  const { data: availability } = await supabaseAdmin
    .from('event_availability')
    .select('*')
    .eq('event_id', eventId)
    .single();

  const eventData = {
    id: event.id,
    title: event.title,
    title_en: event.title_en,
    subtitle: event.subtitle,
    subtitle_en: event.subtitle_en,
    badge: event.badge,
    badge_en: event.badge_en,
    description: event.description,
    description_en: event.description_en,
    date_time: event.date_time,
    duration_minutes: event.duration_minutes,
    location: event.location,
    address: event.address,
    price: event.price,
    max_capacity: event.max_capacity,
    remaining_spots: availability?.remaining_spots ?? event.max_capacity,
    is_full: availability?.is_full ?? false,
    image_url: event.image_url,
  };

  return <EventPageContent event={eventData} />;
}
