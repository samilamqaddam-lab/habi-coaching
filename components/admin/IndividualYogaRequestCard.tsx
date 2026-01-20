'use client';

import { useState } from 'react';

interface IndividualYogaRequest {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  whatsapp: string | null;
  location_preference: 'studio' | 'home';
  interest: 'yoga-only' | 'yoga-coaching';
  message: string | null;
  status: 'pending' | 'confirmed' | 'cancelled';
  contacted: boolean;
  notes: string | null;
  payment_requested_at: string | null;
  created_at: string;
  updated_at: string;
}

interface IndividualYogaRequestCardProps {
  request: IndividualYogaRequest;
  onStatusChange: (id: string, status: string) => void;
  onContactedChange: (id: string, contacted: boolean) => void;
  onNotesChange: (id: string, notes: string) => void;
  onDelete: (id: string) => void;
}

export default function IndividualYogaRequestCard({
  request,
  onStatusChange,
  onContactedChange,
  onNotesChange,
  onDelete,
}: IndividualYogaRequestCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [notes, setNotes] = useState(request.notes || '');
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const locationLabels = {
    studio: 'En présentiel (Casablanca)',
    home: 'À domicile',
  };

  const interestLabels = {
    'yoga-only': 'Yoga uniquement',
    'yoga-coaching': 'Yoga + Coaching',
  };

  const statusConfig = {
    pending: {
      label: 'En attente',
      color: 'yellow',
      bgColor: 'bg-yellow-400/10',
      textColor: 'text-yellow-400',
      borderColor: 'border-yellow-400/30',
    },
    confirmed: {
      label: 'Confirmé',
      color: 'green',
      bgColor: 'bg-green-400/10',
      textColor: 'text-green-400',
      borderColor: 'border-green-400/30',
    },
    cancelled: {
      label: 'Annulé',
      color: 'red',
      bgColor: 'bg-red-400/10',
      textColor: 'text-red-400',
      borderColor: 'border-red-400/30',
    },
  };

  const status = statusConfig[request.status];

  const handleSaveNotes = async () => {
    setIsSavingNotes(true);
    await onNotesChange(request.id, notes);
    setIsSavingNotes(false);
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition-colors">
      {/* Header - Always visible */}
      <div
        className="p-5 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-slate-100 truncate">
                {request.first_name} {request.last_name}
              </h3>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.textColor} border ${status.borderColor}`}>
                {status.label}
              </span>
              {request.contacted && (
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-400/10 text-blue-400 border border-blue-400/30">
                  Contacté
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {request.email}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatDate(request.created_at)}
              </span>
            </div>
          </div>

          {/* Interest Badge */}
          <div className="text-right flex-shrink-0">
            <div className="inline-block px-3 py-1.5 bg-orange-400/10 text-orange-400 rounded-lg text-sm font-medium border border-orange-400/20">
              {interestLabels[request.interest]}
            </div>
            <div className="text-sm text-slate-500 mt-1">
              {locationLabels[request.location_preference]}
            </div>
          </div>

          {/* Expand Icon */}
          <button className="text-slate-400 hover:text-slate-300 transition-colors p-1">
            <svg
              className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-slate-700 p-5 space-y-5">
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Contact</h4>
              <div className="space-y-2">
                <a
                  href={`mailto:${request.email}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {request.email}
                </a>
                <a
                  href={`tel:${request.phone}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {request.phone}
                </a>
                {request.whatsapp && (
                  <a
                    href={`https://wa.me/${request.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp
                  </a>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Préférences</h4>
              <div className="space-y-1">
                <p className="text-slate-300 font-medium">{interestLabels[request.interest]}</p>
                <p className="text-sm text-slate-400">
                  Lieu: <span className="text-slate-300">{locationLabels[request.location_preference]}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Message */}
          {request.message && (
            <div>
              <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Message</h4>
              <p className="text-slate-300 bg-slate-900/50 rounded-lg p-3 text-sm leading-relaxed whitespace-pre-wrap">
                {request.message}
              </p>
            </div>
          )}

          {/* Notes */}
          <div>
            <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Notes internes</h4>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ajouter des notes..."
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-slate-300 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400"
              rows={3}
            />
            {notes !== (request.notes || '') && (
              <button
                onClick={handleSaveNotes}
                disabled={isSavingNotes}
                className="mt-2 px-4 py-1.5 bg-orange-400/20 text-orange-400 rounded-lg text-sm font-medium hover:bg-orange-400/30 transition-colors disabled:opacity-50"
              >
                {isSavingNotes ? 'Enregistrement...' : 'Enregistrer les notes'}
              </button>
            )}
          </div>

          {/* Payment Request Info */}
          {request.payment_requested_at && (
            <div className="bg-green-400/10 border border-green-400/20 rounded-lg p-3">
              <p className="text-green-400 text-sm">
                Demande de paiement envoyée le {formatDate(request.payment_requested_at)}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-700">
            {/* Contacted Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={request.contacted}
                  onChange={(e) => onContactedChange(request.id, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-5 h-5 bg-slate-900 border border-slate-600 rounded peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-colors flex items-center justify-center">
                  {request.contacted && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Contacté</span>
            </label>

            {/* Status Change */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Statut:</span>
              <select
                value={request.status}
                onChange={(e) => onStatusChange(request.id, e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400/50"
              >
                <option value="pending">En attente</option>
                <option value="confirmed">Confirmé</option>
                <option value="cancelled">Annulé</option>
              </select>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => onDelete(request.id)}
              className="flex items-center gap-2 px-4 py-1.5 bg-red-400/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-400/30 transition-colors ml-auto"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Supprimer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
