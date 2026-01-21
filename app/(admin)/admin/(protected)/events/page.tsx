'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import AdminNav from '@/components/admin/AdminNav';

interface EventData {
  id: string;
  title: string;
  titleEn: string | null;
  subtitle: string | null;
  subtitleEn: string | null;
  badge: string | null;
  badgeEn: string | null;
  dateTime: string;
  durationMinutes: number;
  location: string;
  address: string;
  price: number | null;
  maxCapacity: number;
  isActive: boolean;
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

interface GlobalStats {
  totalRegistrations: number;
  pendingConfirmations: number;
  activeEvents: number;
  upcomingEvents: number;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [globalStats, setGlobalStats] = useState<GlobalStats>({
    totalRegistrations: 0,
    pendingConfirmations: 0,
    activeEvents: 0,
    upcomingEvents: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showArchived, setShowArchived] = useState(false);
  const [deletingEventId, setDeletingEventId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [togglingEventId, setTogglingEventId] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/events${showArchived ? '?archived=true' : ''}`);
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      setEvents(data.events || []);
      setGlobalStats(data.globalStats || {
        totalRegistrations: 0,
        pendingConfirmations: 0,
        activeEvents: 0,
        upcomingEvents: 0,
      });
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  }, [showArchived]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleToggleActive = async (eventId: string, currentActive: boolean) => {
    setTogglingEventId(eventId);
    try {
      const response = await fetch(`/api/admin/events/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentActive }),
      });

      if (!response.ok) throw new Error('Failed to update event');

      // Refresh events
      await fetchEvents();
    } catch (error) {
      console.error('Error toggling event status:', error);
      alert('Erreur lors de la mise à jour du statut');
    } finally {
      setTogglingEventId(null);
    }
  };

  const handleDelete = async (eventId: string, hard: boolean = false) => {
    setDeletingEventId(eventId);
    try {
      const response = await fetch(`/api/admin/events/${eventId}${hard ? '?hard=true' : ''}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete event');

      setShowDeleteConfirm(null);
      await fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Erreur lors de la suppression');
    } finally {
      setDeletingEventId(null);
    }
  };

  // Separate active and archived events
  const activeEvents = events.filter(e => e.isActive);
  const archivedEvents = events.filter(e => !e.isActive);
  const displayedEvents = showArchived ? events : activeEvents;

  if (isLoading) {
    return (
      <div className="flex h-screen overflow-hidden">
        <div className="w-64 flex-shrink-0">
          <AdminNav />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <svg className="w-12 h-12 text-orange-400 animate-spin mx-auto mb-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-slate-400">Chargement des événements...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <AdminNav />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-100 mb-2">
                Événements Ponctuels
              </h1>
              <p className="text-slate-400">
                Gérez les ateliers, introductions et sessions découverte
              </p>
            </div>
            <Link
              href="/admin/events/new"
              className="flex items-center gap-2 px-5 py-3 bg-orange-400 hover:bg-orange-500 text-slate-900 font-semibold rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nouvel Événement
            </Link>
          </div>

          {/* Global Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium">Inscriptions totales</span>
                <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-slate-100">{globalStats.totalRegistrations}</p>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium">Événements à venir</span>
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-slate-100">{globalStats.upcomingEvents}</p>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium">À confirmer</span>
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-slate-100">{globalStats.pendingConfirmations}</p>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium">Événements actifs</span>
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-slate-100">{globalStats.activeEvents}</p>
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-4">
            {/* Header with filter */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-100">
                {showArchived ? 'Tous les événements' : 'Événements actifs'}
              </h2>
              <button
                onClick={() => setShowArchived(!showArchived)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${showArchived
                    ? 'bg-orange-400/10 text-orange-400 border border-orange-400/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
                  }
                `}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                {showArchived ? 'Masquer archivés' : 'Voir archivés'}
                {archivedEvents.length > 0 && (
                  <span className="bg-slate-700 px-2 py-0.5 rounded-full text-xs">
                    {archivedEvents.length}
                  </span>
                )}
              </button>
            </div>

            {displayedEvents.length === 0 ? (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-12 text-center">
                <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-medium text-slate-300 mb-2">Aucun événement</h3>
                <p className="text-slate-500 mb-6">
                  {showArchived
                    ? 'Aucun événement trouvé'
                    : 'Créez votre premier événement pour commencer'
                  }
                </p>
                {!showArchived && (
                  <Link
                    href="/admin/events/new"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-orange-400 hover:bg-orange-500 text-slate-900 font-semibold rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Créer un événement
                  </Link>
                )}
              </div>
            ) : (
              displayedEvents.map((event) => (
                <div
                  key={event.id}
                  className={`bg-slate-800 rounded-xl border border-slate-700 p-6 hover:border-slate-600 transition-colors ${
                    event.isPast || !event.isActive ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-100">
                          {event.title} {event.subtitle || ''}
                        </h3>
                        {event.badge && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-400/20 text-orange-400">
                            {event.badge}
                          </span>
                        )}
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            event.isPast
                              ? 'bg-slate-700 text-slate-400'
                              : event.isActive
                              ? 'bg-green-400/10 text-green-400'
                              : 'bg-slate-700 text-slate-400'
                          }`}
                        >
                          {event.isPast ? 'Passé' : event.isActive ? 'Actif' : 'Archivé'}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400">
                        <span className="mr-3">📅 {formatDate(event.dateTime)}</span>
                        <span className="mr-3">📍 {event.location}</span>
                        {event.price && <span>💰 {event.price} MAD</span>}
                      </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center gap-2">
                      {/* Toggle Active */}
                      <button
                        onClick={() => handleToggleActive(event.id, event.isActive)}
                        disabled={togglingEventId === event.id}
                        className={`
                          p-2 rounded-lg transition-colors
                          ${event.isActive
                            ? 'text-green-400 hover:bg-green-400/10'
                            : 'text-slate-400 hover:bg-slate-700'
                          }
                          ${togglingEventId === event.id ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                        title={event.isActive ? 'Archiver' : 'Activer'}
                      >
                        {togglingEventId === event.id ? (
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : event.isActive ? (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </button>

                      {/* Edit */}
                      <Link
                        href={`/admin/events/${event.id}/edit`}
                        className="p-2 rounded-lg text-slate-400 hover:text-orange-400 hover:bg-slate-700 transition-colors"
                        title="Modifier"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>

                      {/* Delete */}
                      <button
                        onClick={() => setShowDeleteConfirm(event.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-colors"
                        title="Supprimer"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Inscrits</p>
                      <p className="text-2xl font-bold text-slate-100">{event.stats.registrations}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Max</p>
                      <p className="text-2xl font-bold text-slate-100">{event.maxCapacity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Restantes</p>
                      <p className="text-2xl font-bold text-slate-100">{event.stats.remaining}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Taux</p>
                      <p className="text-2xl font-bold text-slate-100">{event.stats.fillRate}%</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/events/${event.id}`}
                      className="flex-1 bg-orange-400 hover:bg-orange-500 text-slate-900 font-medium py-2 px-4 rounded-lg transition-colors text-center"
                    >
                      Voir Inscriptions
                    </Link>
                    <Link
                      href={`/admin/events/${event.id}/edit`}
                      className="bg-slate-700 hover:bg-slate-600 text-slate-100 font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Modifier
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl border border-slate-700 max-w-md w-full p-6 shadow-2xl">
            {/* Warning Icon */}
            <div className="w-16 h-16 bg-red-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-slate-100 text-center mb-2">
              Supprimer cet événement ?
            </h3>

            {/* Event name */}
            <p className="text-orange-400 font-semibold text-center mb-4">
              {events.find(e => e.id === showDeleteConfirm)?.title}
            </p>

            {/* Warning */}
            <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-red-400 font-medium text-sm">Action irréversible</p>
                  <p className="text-red-300/80 text-sm mt-1">
                    Cette action supprimera définitivement l&apos;événement et toutes les inscriptions associées.
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                disabled={deletingEventId !== null}
                className="flex-1 px-4 py-3 rounded-lg text-sm font-medium bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm, true)}
                disabled={deletingEventId !== null}
                className="flex-1 px-4 py-3 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deletingEventId === showDeleteConfirm ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Suppression...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Supprimer
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
