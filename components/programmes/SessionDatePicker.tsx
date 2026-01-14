'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface DateOption {
  id: string;
  session_id: string;
  date_time: string;
  location: string;
  max_capacity: number;
  current_count: number;
  remaining_spots: number;
  is_full: boolean;
}

interface Session {
  id: string;
  session_number: number;
  title: string;
  title_en?: string;
  date_options: DateOption[];
}

interface SessionDatePickerProps {
  editionId: string;
  sessions: Session[];
  selectedDates: Record<string, string>; // { sessionId: dateOptionId }
  onDateChange: (sessionId: string, dateOptionId: string) => void;
  onRefreshAvailability?: () => void;
  isLoading?: boolean;
  error?: string;
}

export default function SessionDatePicker({
  sessions,
  selectedDates,
  onDateChange,
  onRefreshAvailability,
  isLoading = false,
  error,
}: SessionDatePickerProps) {
  const { t, locale } = useTranslation();
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Auto-refresh availability every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (onRefreshAvailability) {
        onRefreshAvailability();
        setLastRefresh(new Date());
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [onRefreshAvailability]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      timeZone: 'Africa/Casablanca', // Fuseau horaire marocain
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Africa/Casablanca', // Fuseau horaire marocain
    });
  };

  const formatTimeRange = (dateString: string, durationMinutes: number = 60) => {
    const startDate = new Date(dateString);
    const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);

    const formatOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Africa/Casablanca',
    };

    const startTime = startDate.toLocaleTimeString(locale === 'fr' ? 'fr-FR' : 'en-US', formatOptions);
    const endTime = endDate.toLocaleTimeString(locale === 'fr' ? 'fr-FR' : 'en-US', formatOptions);

    return `${startTime} - ${endTime}`;
  };

  const getAvailabilityColor = (remainingSpots: number, maxCapacity: number) => {
    const percentage = remainingSpots / maxCapacity;
    if (percentage === 0) return 'text-red-600 bg-red-50';
    if (percentage <= 0.3) return 'text-orange-600 bg-orange-50';
    if (percentage <= 0.6) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getAvailabilityText = (remainingSpots: number, isFull: boolean) => {
    if (isFull) return locale === 'fr' ? 'COMPLET' : 'FULL';
    if (remainingSpots === 1) return locale === 'fr' ? '1 place' : '1 spot';
    return locale === 'fr' ? `${remainingSpots} places` : `${remainingSpots} spots`;
  };

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        <p className="font-medium">{error}</p>
        {onRefreshAvailability && (
          <button
            onClick={onRefreshAvailability}
            className="mt-2 text-sm underline hover:no-underline"
          >
            {locale === 'fr' ? 'Réessayer' : 'Try again'}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold text-deep-blue">
          {locale === 'fr' ? 'Choisissez vos dates' : 'Choose your dates'}
        </h3>
        {onRefreshAvailability && (
          <button
            onClick={() => {
              onRefreshAvailability();
              setLastRefresh(new Date());
            }}
            disabled={isLoading}
            className="text-xs text-text-secondary hover:text-golden-orange transition-colors flex items-center gap-1"
          >
            <svg
              className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>
              {locale === 'fr' ? 'Actualiser' : 'Refresh'}
            </span>
          </button>
        )}
      </div>

      {/* Sessions */}
      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="rounded-xl border border-gray-200 overflow-hidden"
          >
            {/* Session header */}
            <div className="bg-gradient-to-r from-golden-orange/10 to-golden-orange/5 px-4 py-3 border-b border-gray-100">
              <h4 className="font-medium text-deep-blue">
                Session {session.session_number}
              </h4>
            </div>

            {/* Date options */}
            <div className="p-4 space-y-3">
              {session.date_options.map((option) => {
                const isSelected = selectedDates[session.id] === option.id;
                const availabilityColor = getAvailabilityColor(
                  option.remaining_spots,
                  option.max_capacity
                );

                return (
                  <label
                    key={option.id}
                    className={`
                      block p-3 rounded-lg border-2 cursor-pointer transition-all
                      ${isSelected
                        ? 'border-golden-orange bg-golden-orange/5'
                        : option.is_full
                        ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                        : 'border-gray-200 hover:border-golden-orange/50 hover:bg-golden-orange/5'
                      }
                    `}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!option.is_full) {
                        onDateChange(session.id, option.id);
                      }
                    }}
                  >
                    <input
                      type="radio"
                      name={`session-${session.id}`}
                      value={option.id}
                      checked={isSelected}
                      disabled={option.is_full}
                      onChange={() => {}}
                      onFocus={(e) => e.preventDefault()}
                      className="sr-only"
                      tabIndex={-1}
                    />

                    {/* Top row: Radio + Date + Checkmark */}
                    <div className="flex items-start gap-3">
                      {/* Radio indicator */}
                      <div
                        className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                          ${isSelected
                            ? 'border-golden-orange bg-golden-orange'
                            : 'border-gray-300'
                          }
                        `}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>

                      {/* Date info */}
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <div className="flex items-center justify-between gap-2">
                          <div className="font-medium text-deep-blue capitalize truncate min-w-0">
                            {formatDate(option.date_time)}
                          </div>
                          {/* Selected checkmark - desktop */}
                          {isSelected && (
                            <svg
                              className="w-5 h-5 text-golden-orange flex-shrink-0 hidden sm:block"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="text-sm text-text-secondary">
                          {formatTimeRange(option.date_time)}
                        </div>
                        {/* Location with Google Maps link */}
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(option.location)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-golden-orange hover:text-golden-orange/80 flex items-center gap-1 mt-1 overflow-hidden"
                        >
                          <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span className="truncate min-w-0">{option.location}</span>
                        </a>

                        {/* Availability badge - mobile: below location */}
                        <div className="mt-2 sm:hidden">
                          <span
                            className={`
                              inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                              ${availabilityColor}
                            `}
                          >
                            {option.is_full ? (
                              <>
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {getAvailabilityText(option.remaining_spots, option.is_full)}
                              </>
                            ) : (
                              getAvailabilityText(option.remaining_spots, option.is_full)
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Availability badge - desktop: right side */}
                      <div
                        className={`
                          hidden sm:block px-3 py-1 rounded-full text-xs font-medium flex-shrink-0
                          ${availabilityColor}
                        `}
                      >
                        {option.is_full ? (
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {getAvailabilityText(option.remaining_spots, option.is_full)}
                          </span>
                        ) : (
                          getAvailabilityText(option.remaining_spots, option.is_full)
                        )}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-lg">
          <div className="w-6 h-6 border-2 border-golden-orange border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Last refresh indicator */}
      <p className="text-xs text-text-secondary text-center">
        {locale === 'fr'
          ? `Disponibilités actualisées à ${lastRefresh.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`
          : `Availability updated at ${lastRefresh.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
        }
      </p>
    </div>
  );
}
