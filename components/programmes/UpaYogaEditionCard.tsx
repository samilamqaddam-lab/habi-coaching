'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { useTranslation } from '@/hooks/useTranslation';

interface DateOption {
  id: string;
  date_time: string;
  location: string;
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

interface Edition {
  id: string;
  programme_key: string;
  title: string;
  title_en?: string;
  start_date: string;
}

interface UpaYogaEditionCardProps {
  onRegisterClick: () => void;
}

export default function UpaYogaEditionCard({ onRegisterClick }: UpaYogaEditionCardProps) {
  const { t, locale } = useTranslation();
  const [edition, setEdition] = useState<Edition | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch edition data
  useEffect(() => {
    async function fetchEdition() {
      try {
        const response = await fetch('/api/programmes/upa-yoga');
        if (!response.ok) {
          if (response.status === 404 || response.status === 503) {
            // No active edition or service unavailable - don't show the card
            setIsLoading(false);
            return;
          }
          throw new Error('Failed to fetch edition');
        }

        const data = await response.json();
        setEdition(data.edition);
        setSessions(data.sessions);
      } catch (err) {
        console.error('Error fetching edition:', err);
        setError(locale === 'fr' ? 'Erreur de chargement' : 'Loading error');
      } finally {
        setIsLoading(false);
      }
    }

    fetchEdition();
  }, [locale]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Don't render if no active edition
  if (!isLoading && !edition) {
    return null;
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-golden-orange/10 to-golden-orange/5 rounded-2xl p-6 animate-pulse">
        <div className="h-6 bg-golden-orange/20 rounded w-1/2 mb-4" />
        <div className="h-4 bg-golden-orange/20 rounded w-3/4 mb-6" />
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-golden-orange/10 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-700">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-golden-orange/10 via-golden-orange/5 to-dune-beige/20 rounded-2xl overflow-hidden border border-golden-orange/20 shadow-lg">
      {/* Header with badge */}
      <div className="bg-golden-orange text-white px-6 py-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">
            {locale === 'fr' ? 'Prochaine édition' : 'Next edition'}
          </span>
          <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {locale === 'fr' ? 'Places limitées' : 'Limited spots'}
          </span>
        </div>
        <h3 className="font-heading text-xl font-bold">
          {locale === 'fr' ? edition?.title : edition?.title_en || edition?.title}
        </h3>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Sessions summary */}
        <div className="space-y-4 mb-6">
          <p className="text-sm text-text-secondary">
            {locale === 'fr'
              ? '3 sessions, choisissez vos dates :'
              : '3 sessions, choose your dates:'
            }
          </p>

          {sessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-lg p-4 border border-gray-100"
            >
              <div className="font-medium text-deep-blue mb-2">
                {locale === 'fr' ? session.title : session.title_en || session.title}
              </div>
              <div className="flex flex-wrap gap-2">
                {session.date_options.map((option) => (
                  <div
                    key={option.id}
                    className={`
                      text-xs px-3 py-1.5 rounded-full flex items-center gap-1
                      ${option.is_full
                        ? 'bg-red-100 text-red-700'
                        : option.remaining_spots <= 3
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-green-100 text-green-700'
                      }
                    `}
                  >
                    <span className="font-medium">{formatDate(option.date_time)}</span>
                    <span className="opacity-75">{formatTime(option.date_time)}</span>
                    <span className="ml-1">
                      {option.is_full
                        ? (locale === 'fr' ? 'Complet' : 'Full')
                        : `${option.remaining_spots} ${locale === 'fr' ? 'pl.' : 'sp.'}`
                      }
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="flex items-start gap-3 bg-dune-beige/30 rounded-lg p-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-golden-orange/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-golden-orange" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-deep-blue">
              {locale === 'fr' ? 'Par Sadhguru' : 'By Sadhguru'}
            </p>
            <p className="text-xs text-text-secondary">
              {locale === 'fr'
                ? 'Programme certifié Sadhguru Gurukulam'
                : 'Sadhguru Gurukulam certified program'
              }
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          variant="primary"
          fullWidth
          onClick={onRegisterClick}
          className="bg-golden-orange hover:bg-golden-orange/90"
        >
          {locale === 'fr' ? "S'inscrire à cette édition" : 'Register for this edition'}
        </Button>

        {/* Note */}
        <p className="text-xs text-text-secondary text-center mt-4">
          {locale === 'fr'
            ? 'Max. 10 participants par session pour un accompagnement personnalisé'
            : 'Max. 10 participants per session for personalized guidance'
          }
        </p>
      </div>
    </div>
  );
}
