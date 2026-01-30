'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface EventRegistrationCardProps {
  registration: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    payment_requested_at: string | null;
    notes: string | null;
    created_at: string;
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
    timeZone: 'Africa/Casablanca',
  }).format(date);
}

function formatShortDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Africa/Casablanca',
  }).format(date);
}

export default function EventRegistrationCard({ registration }: EventRegistrationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSendingPaymentRequest, setIsSendingPaymentRequest] = useState(false);
  const [paymentRequestedAt, setPaymentRequestedAt] = useState(registration.payment_requested_at);
  const [currentStatus, setCurrentStatus] = useState(registration.status);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancellationReason, setCancellationReason] = useState('');
  const router = useRouter();

  const handleStatusChange = async (newStatus: 'pending' | 'confirmed' | 'cancelled', reason?: string) => {
    if (isUpdating || newStatus === currentStatus) return;

    // If trying to cancel, show the modal first
    if (newStatus === 'cancelled' && !reason) {
      setShowCancelModal(true);
      return;
    }

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/events/registrations/${registration.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          cancellation_reason: reason
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setCurrentStatus(newStatus);
      setShowCancelModal(false);
      setCancellationReason('');
      router.refresh();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Erreur lors de la mise à jour du statut');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelConfirm = () => {
    if (!cancellationReason.trim()) {
      alert('Veuillez saisir une raison d\'annulation');
      return;
    }
    handleStatusChange('cancelled', cancellationReason);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/events/registrations/${registration.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete registration');
      }

      router.refresh();
    } catch (error) {
      console.error('Error deleting registration:', error);
      alert('Erreur lors de la suppression');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handlePaymentRequest = async () => {
    if (isSendingPaymentRequest) return;

    setIsSendingPaymentRequest(true);
    try {
      const response = await fetch(`/api/events/registrations/${registration.id}/payment-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to send payment request');
      }

      const data = await response.json();
      setPaymentRequestedAt(data.payment_requested_at || new Date().toISOString());
    } catch (error) {
      console.error('Error sending payment request:', error);
      alert('Erreur lors de l\'envoi de la demande de paiement');
    } finally {
      setIsSendingPaymentRequest(false);
    }
  };

  const statusConfig = {
    confirmed: { bg: 'bg-green-400/10', text: 'text-green-400', label: 'Confirmée' },
    pending: { bg: 'bg-yellow-400/10', text: 'text-yellow-400', label: 'En attente' },
    cancelled: { bg: 'bg-red-400/10', text: 'text-red-400', label: 'Annulée' },
  };

  const config = statusConfig[currentStatus];

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
              <div className="flex items-center gap-2 text-slate-400">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Inscrit le {formatShortDate(registration.created_at)}
              </div>
            </div>
          </div>

          {/* Notes */}
          {registration.notes && (
            <div>
              <h4 className="text-sm font-medium text-slate-300 mb-2">Notes</h4>
              <p className="text-sm text-slate-400 bg-slate-900/50 p-3 rounded-lg italic">
                {registration.notes}
              </p>
            </div>
          )}

          {/* Status Management Actions */}
          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-3">Gérer le statut</h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleStatusChange('confirmed')}
                disabled={isUpdating || currentStatus === 'confirmed'}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${currentStatus === 'confirmed'
                    ? 'bg-green-400/20 text-green-400 border-2 border-green-400/50'
                    : 'bg-slate-700 text-slate-300 hover:bg-green-400/10 hover:text-green-400 hover:border-green-400/30 border-2 border-transparent'
                  }
                  ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Confirmer
              </button>

              <button
                onClick={() => handleStatusChange('pending')}
                disabled={isUpdating || currentStatus === 'pending'}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${currentStatus === 'pending'
                    ? 'bg-yellow-400/20 text-yellow-400 border-2 border-yellow-400/50'
                    : 'bg-slate-700 text-slate-300 hover:bg-yellow-400/10 hover:text-yellow-400 hover:border-yellow-400/30 border-2 border-transparent'
                  }
                  ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                En attente
              </button>

              <button
                onClick={() => handleStatusChange('cancelled')}
                disabled={isUpdating || currentStatus === 'cancelled'}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${currentStatus === 'cancelled'
                    ? 'bg-red-400/20 text-red-400 border-2 border-red-400/50'
                    : 'bg-slate-700 text-slate-300 hover:bg-red-400/10 hover:text-red-400 hover:border-red-400/30 border-2 border-transparent'
                  }
                  ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Annuler
              </button>

              {/* Payment Request Button */}
              <button
                onClick={handlePaymentRequest}
                disabled={isSendingPaymentRequest}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${paymentRequestedAt
                    ? 'bg-emerald-400/20 text-emerald-400 border-2 border-emerald-400/50 hover:bg-emerald-400/30'
                    : 'bg-slate-700 text-slate-300 hover:bg-orange-400/10 hover:text-orange-400 hover:border-orange-400/30 border-2 border-transparent'
                  }
                  ${isSendingPaymentRequest ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
                title={paymentRequestedAt ? 'Renvoyer la demande de paiement' : 'Envoyer une demande de paiement'}
              >
                {isSendingPaymentRequest ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Envoi...
                  </>
                ) : paymentRequestedAt ? (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Renvoyer demande
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Demande de paiement
                  </>
                )}
              </button>
            </div>

            {/* Payment Request Info Banner */}
            {paymentRequestedAt && (
              <div className="bg-green-400/10 border border-green-400/20 rounded-lg p-3 mt-3">
                <p className="text-green-400 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Demande de paiement envoyée le {formatDate(paymentRequestedAt)}
                </p>
              </div>
            )}

            {isUpdating && (
              <p className="text-xs text-slate-400 mt-2 flex items-center gap-2">
                <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mise à jour en cours...
              </p>
            )}
          </div>

          {/* Delete Section */}
          <div className="pt-4 border-t border-slate-700">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-slate-900 text-red-400 hover:bg-red-400/10 hover:border-red-400/30 border-2 border-transparent transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Supprimer définitivement
            </button>
          </div>
        </div>
      )}

      {/* Cancellation Reason Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl border border-slate-700 max-w-md w-full p-6 shadow-2xl">
            {/* Icon */}
            <div className="w-16 h-16 bg-red-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-slate-100 text-center mb-2">
              Annuler l&apos;inscription
            </h3>

            {/* Participant Info */}
            <p className="text-slate-400 text-center mb-2">
              Inscription de :
            </p>
            <p className="text-orange-400 font-semibold text-center mb-6">
              {registration.first_name} {registration.last_name}
            </p>

            {/* Reason Input */}
            <div className="mb-6">
              <label htmlFor="cancellation-reason" className="block text-sm font-medium text-slate-300 mb-2">
                Raison de l&apos;annulation <span className="text-red-400">*</span>
              </label>
              <textarea
                id="cancellation-reason"
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                placeholder="Exemple: Paiement non reçu dans les délais, Demande d'annulation du participant..."
                rows={4}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 resize-none"
              />
              <p className="text-xs text-slate-500 mt-2">
                Cette raison sera incluse dans l&apos;email envoyé au participant
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setCancellationReason('');
                }}
                disabled={isUpdating}
                className="flex-1 px-4 py-3 rounded-lg text-sm font-medium bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors disabled:opacity-50"
              >
                Retour
              </button>
              <button
                onClick={handleCancelConfirm}
                disabled={isUpdating || !cancellationReason.trim()}
                className="flex-1 px-4 py-3 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isUpdating ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Annulation...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Confirmer l&apos;annulation
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

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
              Supprimer cette inscription ?
            </h3>

            {/* Warning Message */}
            <p className="text-slate-400 text-center mb-2">
              Vous êtes sur le point de supprimer l&apos;inscription de :
            </p>
            <p className="text-orange-400 font-semibold text-center mb-4">
              {registration.first_name} {registration.last_name}
            </p>

            {/* Alert Box */}
            <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-red-400 font-medium text-sm">Action irréversible</p>
                  <p className="text-red-300/80 text-sm mt-1">
                    Cette action supprimera définitivement l&apos;inscription et toutes les données associées. Cette opération ne peut pas être annulée.
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-3 rounded-lg text-sm font-medium bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-3 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
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
