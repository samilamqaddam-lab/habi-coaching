'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import EventForm, { EventFormData } from '@/components/admin/EventForm';

interface EventData extends EventFormData {
  id: string;
  createdAt: string;
  isPast: boolean;
  stats: {
    registrations: number;
    pending: number;
    confirmed: number;
    remaining: number;
    fillRate: number;
  };
}

export default function EditEventPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId as string;

  const [event, setEvent] = useState<EventData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await fetch(`/api/admin/events/${eventId}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError('Événement non trouvé');
          } else {
            setError('Erreur lors du chargement');
          }
          return;
        }

        const data = await response.json();
        setEvent(data.event);
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Erreur de connexion');
      } finally {
        setIsLoading(false);
      }
    }

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <svg className="w-12 h-12 text-orange-400 animate-spin mx-auto mb-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-slate-400">Chargement de l&apos;événement...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !event) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-100 mb-2">
              {error || 'Événement non trouvé'}
            </h2>
            <p className="text-slate-400 mb-6">
              L&apos;événement demandé n&apos;existe pas ou une erreur s&apos;est produite.
            </p>
            <button
              onClick={() => router.push('/admin/events')}
              className="px-6 py-3 rounded-lg text-sm font-medium bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
            >
              Retour aux événements
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 md:p-8 max-w-4xl">
          {/* Header with back button */}
          <div className="mb-8">
            <Link
              href="/admin/events"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors mb-4"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour aux événements
            </Link>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-bold text-slate-100">
                Modifier l&apos;événement
              </h1>
              {event.isPast && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-400">
                  Passé
                </span>
              )}
            </div>
            <p className="text-slate-400">
              {event.title}
            </p>
          </div>

          {/* Stats summary if there are registrations */}
          {event.stats.registrations > 0 && (
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 mb-8">
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Inscriptions:</span>
                  <span className="text-slate-100 font-semibold">{event.stats.registrations}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Confirmées:</span>
                  <span className="text-green-400 font-semibold">{event.stats.confirmed}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">En attente:</span>
                  <span className="text-yellow-400 font-semibold">{event.stats.pending}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Restantes:</span>
                  <span className="text-slate-100 font-semibold">{event.stats.remaining}</span>
                </div>
                <Link
                  href={`/admin/events/${eventId}`}
                  className="ml-auto text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
                >
                  Voir inscriptions
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          )}

          {/* Form */}
          <EventForm event={event} />
        </div>
    </AdminLayout>
  );
}
