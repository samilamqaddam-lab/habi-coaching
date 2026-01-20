'use client';

import { useState, useEffect } from 'react';
import IndividualYogaRequestCard from './IndividualYogaRequestCard';

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

type StatusFilter = 'all' | 'pending' | 'confirmed' | 'cancelled';

export default function IndividualYogaRequestsList() {
  const [requests, setRequests] = useState<IndividualYogaRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const fetchRequests = async () => {
    try {
      const response = await fetch(`/api/individual-yoga/requests?status=${statusFilter}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors du chargement');
      }

      setRequests(data.requests || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [statusFilter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/individual-yoga/requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour');
      }

      fetchRequests();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleNotesChange = async (id: string, notes: string) => {
    try {
      const response = await fetch(`/api/individual-yoga/requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour des notes');
      }
    } catch (err) {
      console.error('Error updating notes:', err);
    }
  };

  const handleContactedChange = async (id: string, contacted: boolean) => {
    try {
      const response = await fetch(`/api/individual-yoga/requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contacted }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour');
      }

      fetchRequests();
    } catch (err) {
      console.error('Error updating contacted:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/individual-yoga/requests/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      fetchRequests();
    } catch (err) {
      console.error('Error deleting request:', err);
    }
  };

  const statusFilters: { value: StatusFilter; label: string; color: string }[] = [
    { value: 'all', label: 'Toutes', color: 'slate' },
    { value: 'pending', label: 'En attente', color: 'yellow' },
    { value: 'confirmed', label: 'Confirmés', color: 'green' },
    { value: 'cancelled', label: 'Annulés', color: 'red' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
        <p className="text-red-400">{error}</p>
        <button
          onClick={() => fetchRequests()}
          className="mt-4 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {statusFilters.map(filter => (
          <button
            key={filter.value}
            onClick={() => setStatusFilter(filter.value)}
            className={`
              px-4 py-2 rounded-lg font-medium text-sm transition-colors
              ${statusFilter === filter.value
                ? `bg-${filter.color}-400/20 text-${filter.color}-400 border border-${filter.color}-400/30`
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
              }
            `}
            style={{
              backgroundColor: statusFilter === filter.value
                ? filter.value === 'all' ? 'rgba(148, 163, 184, 0.2)' :
                  filter.value === 'pending' ? 'rgba(250, 204, 21, 0.2)' :
                  filter.value === 'confirmed' ? 'rgba(74, 222, 128, 0.2)' :
                  'rgba(248, 113, 113, 0.2)'
                : undefined,
              color: statusFilter === filter.value
                ? filter.value === 'all' ? 'rgb(148, 163, 184)' :
                  filter.value === 'pending' ? 'rgb(250, 204, 21)' :
                  filter.value === 'confirmed' ? 'rgb(74, 222, 128)' :
                  'rgb(248, 113, 113)'
                : undefined,
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Requests */}
      {requests.length === 0 ? (
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-12 text-center">
          <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h3 className="text-lg font-medium text-slate-300 mb-2">Aucune demande</h3>
          <p className="text-slate-500">
            {statusFilter === 'all'
              ? 'Les demandes de cours individuels yoga apparaîtront ici'
              : `Aucune demande avec le statut "${statusFilters.find(f => f.value === statusFilter)?.label}"`
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map(request => (
            <IndividualYogaRequestCard
              key={request.id}
              request={request}
              onStatusChange={handleStatusChange}
              onContactedChange={handleContactedChange}
              onNotesChange={handleNotesChange}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
