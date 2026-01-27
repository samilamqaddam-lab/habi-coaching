'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import SessionBuilder, { SessionData } from '@/components/admin/SessionBuilder';
import { PROGRAMMES_CONFIG, getEditionProgrammeKeys } from '@/lib/programmes-config';

// Note: Ce formulaire est exclusivement pour les cours collectifs.
// Les cours individuels et événements auront des formulaires dédiés.

interface EditionFormData {
  programmeKey: string;
  editionType: 'collective'; // Toujours 'collective' pour ce formulaire
  title: string;
  titleEn?: string;
  description?: string;
  price?: number;
  maxCapacity: number;
  isActive: boolean;
  sessionsMandatory: boolean;
  sessions: SessionData[];
}

const defaultFormData: EditionFormData = {
  programmeKey: '',
  editionType: 'collective', // Fixé à 'collective'
  title: '',
  maxCapacity: 10,
  isActive: true,
  sessionsMandatory: true,
  sessions: [
    {
      sessionNumber: 1,
      title: 'Session 1',
      dateOptions: [
        {
          date: '',
          startTime: '',
          endTime: '',
          location: 'Studio, Casablanca',
          maxCapacity: 10,
        },
      ],
    },
  ],
};

export default function EditionFormPage() {
  const params = useParams();
  const router = useRouter();
  const editionId = params.id as string;
  const isNew = editionId === 'new';

  const [formData, setFormData] = useState<EditionFormData>(defaultFormData);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing edition data if editing
  useEffect(() => {
    if (isNew) return;

    const fetchEdition = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/admin/editions/${editionId}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError('Édition non trouvée');
            return;
          }
          throw new Error('Erreur lors du chargement');
        }

        const data = await response.json();
        const edition = data.edition;

        // Transform API response to form data
        // Note: editionType est toujours 'collective' pour ce formulaire
        setFormData({
          programmeKey: edition.programmeKey,
          editionType: 'collective',
          title: edition.title,
          titleEn: edition.titleEn,
          maxCapacity: edition.maxCapacity,
          isActive: edition.isActive,
          sessionsMandatory: edition.sessionsMandatory ?? true,
          sessions: edition.sessions.map((session: {
            id: string;
            session_number: number;
            title: string;
            title_en?: string;
            duration_minutes?: number;
            dateOptions: Array<{
              id: string;
              date?: string;
              startTime?: string;
              endTime?: string;
              dateTime?: string;
              location: string;
              maxCapacity: number;
            }>;
          }) => ({
            id: session.id,
            sessionNumber: session.session_number,
            title: session.title,
            titleEn: session.title_en,
            durationMinutes: session.duration_minutes,
            dateOptions: session.dateOptions.map((opt) => ({
              id: opt.id,
              date: opt.date || '',
              startTime: opt.startTime || '',
              endTime: opt.endTime || '',
              location: opt.location,
              maxCapacity: opt.maxCapacity,
            })),
          })),
        });
      } catch (err) {
        console.error(err);
        setError('Erreur lors du chargement de l\'édition');
      } finally {
        setLoading(false);
      }
    };

    fetchEdition();
  }, [editionId, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.programmeKey) {
      setError('Veuillez sélectionner un programme');
      return;
    }
    if (!formData.title.trim()) {
      setError('Le titre est requis');
      return;
    }
    if (formData.sessions.length === 0) {
      setError('Ajoutez au moins une session');
      return;
    }

    // Validate sessions
    for (const session of formData.sessions) {
      if (!session.title.trim()) {
        setError(`Le titre de la session ${session.sessionNumber} est requis`);
        return;
      }
      if (session.dateOptions.length === 0) {
        setError(`La session ${session.sessionNumber} doit avoir au moins une date`);
        return;
      }
      for (const dateOption of session.dateOptions) {
        if (!dateOption.date || !dateOption.startTime || !dateOption.endTime) {
          setError(`Toutes les dates et horaires de la session ${session.sessionNumber} doivent être remplies`);
          return;
        }
      }
    }

    setSaving(true);
    setError(null);

    try {
      const url = isNew
        ? '/api/admin/editions'
        : `/api/admin/editions/${editionId}`;
      const method = isNew ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erreur lors de la sauvegarde');
      }

      router.push('/admin/editions');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const updateFormData = (updates: Partial<EditionFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  // When maxCapacity changes, propagate to all date options
  const handleCapacityChange = (newCapacity: number) => {
    setFormData((prev) => ({
      ...prev,
      maxCapacity: newCapacity,
      sessions: prev.sessions.map(session => ({
        ...session,
        dateOptions: session.dateOptions.map(option => ({
          ...option,
          maxCapacity: newCapacity,
        })),
      })),
    }));
  };

  // When programme changes, update default capacity and propagate to all date options
  const handleProgrammeChange = (programmeKey: string) => {
    const config = PROGRAMMES_CONFIG[programmeKey];
    const newCapacity = config?.defaultCapacity || 10;
    setFormData((prev) => ({
      ...prev,
      programmeKey,
      maxCapacity: newCapacity,
      sessions: prev.sessions.map(session => ({
        ...session,
        dateOptions: session.dateOptions.map(option => ({
          ...option,
          maxCapacity: newCapacity,
        })),
      })),
    }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error && !isNew && !formData.programmeKey) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <Link
              href="/admin/editions"
              className="text-orange-400 hover:underline"
            >
              Retour à la liste
            </Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 md:p-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/admin/editions"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-100 transition-colors mb-4"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour aux éditions
            </Link>
            <h1 className="text-3xl font-bold text-slate-100">
              {isNew ? 'Nouvelle Édition' : 'Modifier l\'Édition'}
            </h1>
            <p className="text-slate-400 mt-1">
              Cours collectif • Prix calculé automatiquement (150 DH/heure)
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-400/10 border border-red-400/20 rounded-xl p-4 mb-6">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info Section */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <h2 className="text-lg font-semibold text-slate-100 mb-4">Informations générales</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Programme */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Programme *
                  </label>
                  <select
                    value={formData.programmeKey}
                    onChange={(e) => handleProgrammeChange(e.target.value)}
                    disabled={!isNew}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Sélectionner un programme</option>
                    {getEditionProgrammeKeys().map((key) => {
                      const config = PROGRAMMES_CONFIG[key];
                      return (
                        <option key={key} value={key}>
                          {config.icon} {config.name}
                        </option>
                      );
                    })}
                  </select>
                  {!isNew && (
                    <p className="text-xs text-slate-500 mt-1">
                      Le programme ne peut pas être modifié après création
                    </p>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Titre de l&apos;édition *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => updateFormData({ title: e.target.value })}
                    placeholder="Ex: Édition Janvier 2026"
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-400"
                  />
                </div>

                {/* Default Capacity */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Capacité par défaut *
                  </label>
                  <input
                    type="number"
                    value={formData.maxCapacity}
                    onChange={(e) => handleCapacityChange(parseInt(e.target.value) || 10)}
                    min={1}
                    max={100}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-orange-400"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Appliqué à toutes les dates de session
                  </p>
                </div>

                {/* Active Toggle */}
                <div className="flex items-center gap-3 pt-8">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => updateFormData({ isActive: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-400"></div>
                  </label>
                  <span className="text-sm text-slate-300">
                    Édition active (visible sur le site)
                  </span>
                </div>

                {/* Sessions Mandatory Toggle */}
                <div className="flex items-center gap-3 pt-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.sessionsMandatory}
                      onChange={(e) => updateFormData({ sessionsMandatory: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-400"></div>
                  </label>
                  <span className="text-sm text-slate-300">
                    Suivre toutes les sessions est obligatoire
                  </span>
                </div>
              </div>
            </div>

            {/* Sessions Section */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-100">Sessions</h2>
                  <p className="text-sm text-slate-400">
                    Configurez les sessions et leurs options de dates
                  </p>
                </div>
                <span className="text-sm text-slate-500">
                  {formData.sessions.length} session(s)
                </span>
              </div>

              <SessionBuilder
                sessions={formData.sessions}
                onChange={(sessions) => updateFormData({ sessions })}
                defaultCapacity={formData.maxCapacity}
                editionType="collective"
              />

              {/* Prix Total - Toujours affiché car ce formulaire est pour cours collectifs */}
              <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Prix total calculé:</span>
                  <span className="text-xl font-bold text-green-400">
                    {Math.round(formData.sessions.reduce((total, session) =>
                      total + (session.durationMinutes || 0), 0
                    ) / 60 * 150)} DH
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {(() => {
                    const totalMinutes = formData.sessions.reduce((total, session) =>
                      total + (session.durationMinutes || 0), 0
                    );
                    const hours = Math.floor(totalMinutes / 60);
                    const mins = totalMinutes % 60;
                    const formatted = mins > 0 ? `${hours}h${mins}min` : `${hours}h`;
                    return `Basé sur ${formatted} au total × 150 DH/heure`;
                  })()}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <Link
                href="/admin/editions"
                className="px-6 py-3 text-slate-300 hover:text-slate-100 transition-colors"
              >
                Annuler
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-3 bg-orange-400 hover:bg-orange-500 text-slate-900 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {saving && (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
                {saving ? 'Enregistrement...' : (isNew ? 'Créer l\'édition' : 'Enregistrer')}
              </button>
            </div>
          </form>
        </div>
    </AdminLayout>
  );
}
