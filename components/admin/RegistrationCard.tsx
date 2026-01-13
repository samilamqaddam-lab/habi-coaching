'use client';

import { useState } from 'react';

interface DateChoice {
  session_number: number;
  date_time: string;
}

interface RegistrationCardProps {
  registration: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    whatsapp: string | null;
    message: string | null;
    status: 'pending' | 'confirmed' | 'cancelled';
    created_at: string;
    date_choices: DateChoice[];
  };
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Africa/Casablanca', // Fuseau horaire marocain
  }).format(date);
}

function formatShortDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Africa/Casablanca', // Fuseau horaire marocain
  }).format(date);
}

export default function RegistrationCard({ registration }: RegistrationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusConfig = {
    confirmed: { bg: 'bg-green-400/10', text: 'text-green-400', label: 'Confirmée' },
    pending: { bg: 'bg-yellow-400/10', text: 'text-yellow-400', label: 'En attente' },
    cancelled: { bg: 'bg-red-400/10', text: 'text-red-400', label: 'Annulée' },
  };

  const config = statusConfig[registration.status];

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors overflow-hidden">
      {/* Compact View */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Avatar Circle */}
          <div className="w-10 h-10 rounded-full bg-orange-400/20 flex items-center justify-center flex-shrink-0">
            <span className="text-orange-400 font-semibold text-sm">
              {registration.first_name[0]}{registration.last_name[0]}
            </span>
          </div>

          {/* Name and Email */}
          <div className="flex-1 min-w-0">
            <h3 className="text-slate-100 font-medium truncate">
              {registration.first_name} {registration.last_name}
            </h3>
            <p className="text-slate-400 text-sm truncate">{registration.email}</p>
          </div>

          {/* Status Badge */}
          <span className={`${config.bg} ${config.text} px-3 py-1 rounded-full text-xs font-medium flex-shrink-0`}>
            {config.label}
          </span>

          {/* Date */}
          <span className="text-slate-500 text-xs flex-shrink-0 hidden sm:block">
            {formatShortDate(registration.created_at)}
          </span>
        </div>

        {/* Expand Icon */}
        <svg
          className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-slate-700">
          {/* Contact Info */}
          <div className="pt-4 space-y-2">
            <h4 className="text-sm font-medium text-slate-300 mb-3">Coordonnées</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="truncate">{registration.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {registration.phone}
              </div>
              {registration.whatsapp && registration.whatsapp !== registration.phone && (
                <div className="flex items-center gap-2 text-slate-400">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp: {registration.whatsapp}
                </div>
              )}
              <div className="flex items-center gap-2 text-slate-400">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Inscrit le {formatShortDate(registration.created_at)}
              </div>
            </div>
          </div>

          {/* Selected Dates */}
          {registration.date_choices.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-slate-300 mb-3">Sessions choisies</h4>
              <div className="space-y-2">
                {registration.date_choices.map((choice, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm bg-slate-900/50 p-3 rounded-lg">
                    <span className="bg-orange-400/20 text-orange-400 px-3 py-1 rounded-md font-medium text-xs">
                      Session {choice.session_number}
                    </span>
                    <span className="text-slate-300">
                      {formatDate(choice.date_time)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Message */}
          {registration.message && (
            <div>
              <h4 className="text-sm font-medium text-slate-300 mb-2">Message</h4>
              <p className="text-sm text-slate-400 bg-slate-900/50 p-3 rounded-lg italic">
                {registration.message}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
