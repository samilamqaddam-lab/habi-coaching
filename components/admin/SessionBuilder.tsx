'use client';

import { useState, useEffect } from 'react';
import DateOptionPicker from './DateOptionPicker';
import type { EditionType } from '@/lib/supabase';

export interface DateOptionData {
  id?: string;
  date: string;        // Format: YYYY-MM-DD
  startTime: string;   // Format: HH:mm
  endTime: string;     // Format: HH:mm
  location: string;
  maxCapacity?: number;
  // Legacy: pour compatibilité avec données existantes
  dateTime?: string;
}

export interface SessionData {
  id?: string;
  sessionNumber: number;
  title: string;
  titleEn?: string;
  durationMinutes?: number; // Auto-calculé à partir de startTime/endTime
  dateOptions: DateOptionData[];
}

// Helper to format minutes as "Xh Ymin"
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h${mins}min`;
}

// Helper to calculate price from minutes (150 DH per hour)
export function calculatePriceFromMinutes(minutes: number): number {
  return Math.round((minutes / 60) * 150);
}

// Helper to calculate duration in minutes from start and end times
export function calculateDurationFromTimes(startTime: string, endTime: string): number {
  if (!startTime || !endTime) return 0;
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;
  // Handle case where end time is before start time (crosses midnight)
  if (endMinutes < startMinutes) {
    // Add 24 hours to end time (e.g., 22:30 to 00:30 = 2 hours)
    return (endMinutes + 24 * 60) - startMinutes;
  }
  return endMinutes - startMinutes;
}

interface SessionBuilderProps {
  sessions: SessionData[];
  onChange: (sessions: SessionData[]) => void;
  defaultCapacity: number;
  editionType?: EditionType;
}

export default function SessionBuilder({ sessions, onChange, defaultCapacity, editionType = 'collective' }: SessionBuilderProps) {
  const [expandedSession, setExpandedSession] = useState<number | null>(
    sessions.length > 0 ? 0 : null
  );

  const addSession = () => {
    const newSession: SessionData = {
      sessionNumber: sessions.length + 1,
      title: `Session ${sessions.length + 1}`,
      dateOptions: [
        {
          date: '',
          startTime: '',
          endTime: '',
          location: 'Studio, Casablanca',
          maxCapacity: defaultCapacity,
        },
      ],
    };
    onChange([...sessions, newSession]);
    setExpandedSession(sessions.length);
  };

  const removeSession = (index: number) => {
    if (sessions.length <= 1) {
      alert('Vous devez avoir au moins une session');
      return;
    }
    const updated = sessions.filter((_, i) => i !== index);
    // Renumber sessions
    const renumbered = updated.map((session, i) => ({
      ...session,
      sessionNumber: i + 1,
    }));
    onChange(renumbered);
    setExpandedSession(null);
  };

  const updateSession = (index: number, updates: Partial<SessionData>) => {
    const updated = sessions.map((session, i) =>
      i === index ? { ...session, ...updates } : session
    );
    onChange(updated);
  };

  const updateDateOptions = (sessionIndex: number, dateOptions: DateOptionData[]) => {
    // Calculate duration from first date option's start/end times
    const firstOption = dateOptions[0];
    const durationMinutes = firstOption
      ? calculateDurationFromTimes(firstOption.startTime, firstOption.endTime)
      : 0;

    updateSession(sessionIndex, {
      dateOptions,
      durationMinutes: durationMinutes > 0 ? durationMinutes : undefined
    });
  };

  return (
    <div className="space-y-4">
      {sessions.map((session, index) => (
        <div
          key={session.id || `session-${index}`}
          className="bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden"
        >
          {/* Session Header */}
          <div
            className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-slate-800/50 transition-colors"
            onClick={() => setExpandedSession(expandedSession === index ? null : index)}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-400/20 text-orange-400 rounded-full flex items-center justify-center text-sm font-bold">
                {session.sessionNumber}
              </div>
              <div>
                <p className="text-slate-100 font-medium">{session.title || `Session ${session.sessionNumber}`}</p>
                <p className="text-xs text-slate-500">{session.dateOptions.length} date(s) disponible(s)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeSession(index);
                }}
                className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                title="Supprimer la session"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <svg
                className={`w-5 h-5 text-slate-400 transition-transform ${expandedSession === index ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Session Content */}
          {expandedSession === index && (
            <div className="px-4 pb-4 pt-2 border-t border-slate-700/50 space-y-4">
              {/* Session Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Titre de la session *
                  </label>
                  <input
                    type="text"
                    value={session.title}
                    onChange={(e) => updateSession(index, { title: e.target.value })}
                    placeholder="Ex: Introduction aux postures"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Durée (calculée automatiquement)
                  </label>
                  <div className="flex items-center gap-2 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2">
                    {session.durationMinutes && session.durationMinutes > 0 ? (
                      <>
                        <span className="text-slate-100 font-medium">
                          {formatDuration(session.durationMinutes)}
                        </span>
                        {editionType === 'collective' && (
                          <span className="text-green-400 text-sm">
                            = {calculatePriceFromMinutes(session.durationMinutes)} DH
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-slate-500 italic">
                        Définissez les horaires ci-dessous
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Date Options */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-slate-300">
                    Options de dates *
                  </label>
                  <span className="text-xs text-slate-500">
                    Les participants choisiront 1 date parmi celles proposées
                  </span>
                </div>
                <DateOptionPicker
                  dateOptions={session.dateOptions}
                  onChange={(dateOptions) => updateDateOptions(index, dateOptions)}
                  defaultCapacity={defaultCapacity}
                />
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add Session Button */}
      <button
        type="button"
        onClick={addSession}
        className="w-full py-3 border-2 border-dashed border-slate-600 rounded-xl text-slate-400 hover:border-orange-400 hover:text-orange-400 transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Ajouter une session
      </button>
    </div>
  );
}
