'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';
import { useEditionData } from '@/hooks/useEditionData';
import { getDisplayPrice, formatDuration, formatEditionTabLabel } from '@/lib/price-utils';
import PrivateYogaRequestForm from '@/components/forms/PrivateYogaRequestForm';
import Container from '@/components/ui/Container';

interface ProgrammePageContentProps {
  programmeKey: string;
  translationKey: string;
}

// Inner component that uses useSearchParams
function ProgrammePageContentInner({
  programmeKey,
  translationKey,
}: ProgrammePageContentProps) {
  const { t, locale } = useTranslation();
  const searchParams = useSearchParams();
  const editionIdFromUrl = searchParams.get('edition');

  const {
    editions,
    selectedEdition,
    selectEdition,
    edition,
    sessions,
    totalMinutes,
    calculatedPrice,
    isLoading
  } = useEditionData(programmeKey, editionIdFromUrl);

  const [showAllBenefits, setShowAllBenefits] = useState(false);

  const hasActiveEdition = edition && sessions && sessions.length > 0;
  const hasMultipleEditions = editions.length > 1;

  // Get programme data from translations
  const title = t(`programmes.classes.${translationKey}.title`);
  const subtitle = t(`programmes.classes.${translationKey}.subtitle`);
  const description = t(`programmes.classes.${translationKey}.description`);
  const duration = t(`programmes.classes.${translationKey}.duration`);
  const price = t(`programmes.classes.${translationKey}.price`);
  const image = t(`programmes.classes.${translationKey}.image`);

  // Collect benefits (up to 10)
  const benefits: string[] = [];
  for (let i = 0; i < 10; i++) {
    const benefit = t(`programmes.classes.${translationKey}.benefits.${i}`);
    if (benefit && !benefit.includes('programmes.classes')) {
      benefits.push(benefit);
    }
  }

  // Calculate date range if edition exists
  const getDateRange = () => {
    if (!sessions || sessions.length === 0) return null;

    const allDates: Date[] = [];
    sessions.forEach((session) => {
      session.date_options?.forEach((option) => {
        if (option.date_time) {
          allDates.push(new Date(option.date_time));
        }
      });
    });

    if (allDates.length === 0) return null;

    const minDate = new Date(Math.min(...allDates.map((d) => d.getTime())));
    const maxDate = new Date(Math.max(...allDates.map((d) => d.getTime())));

    const formatDate = (date: Date) =>
      date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
        day: 'numeric',
        month: 'long',
        timeZone: 'Africa/Casablanca',
      });

    if (minDate.getTime() === maxDate.getTime()) {
      return formatDate(minDate);
    }

    return `${formatDate(minDate)} - ${formatDate(maxDate)}`;
  };

  // Get minimum remaining spots
  const getMinRemainingSpots = () => {
    if (!sessions || sessions.length === 0) return null;

    let minSpots = Infinity;
    sessions.forEach((session) => {
      session.date_options?.forEach((option) => {
        if (option.remaining_spots !== undefined && option.remaining_spots < minSpots) {
          minSpots = option.remaining_spots;
        }
      });
    });

    return minSpots === Infinity ? null : minSpots;
  };

  const dateRange = getDateRange();
  const minAvailable = getMinRemainingSpots();

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section - Compact */}
      <section className="relative bg-gradient-to-br from-golden-orange/10 via-white to-deep-blue/5 pt-24 pb-12">
        <Container>
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-text-secondary">
              <li>
                <Link href="/" className="hover:text-golden-orange transition-colors">
                  {locale === 'fr' ? 'Accueil' : 'Home'}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/yoga" className="hover:text-golden-orange transition-colors">
                  {locale === 'fr' ? 'Yoga' : 'Yoga'}
                </Link>
              </li>
              <li>/</li>
              <li className="text-deep-blue font-medium">{title}</li>
            </ol>
          </nav>

          {/* Title + Badge */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-deep-blue">
              {title}
            </h1>

            {/* Active Edition Badge */}
            {hasActiveEdition && (
              <span className="inline-flex items-center gap-2 bg-deep-blue text-white px-4 py-2 rounded-full text-sm font-medium w-fit">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                {locale === 'fr' ? 'Inscriptions ouvertes' : 'Registration open'}
              </span>
            )}
          </div>

          {/* Subtitle */}
          <p className="text-xl text-golden-orange font-medium italic mb-2">
            {subtitle}
          </p>

        </Container>
      </section>

      {/* Edition Tabs - Only show when multiple editions */}
      {hasMultipleEditions && (
        <section className="bg-gradient-to-r from-deep-blue/5 via-golden-orange/10 to-deep-blue/5 border-b border-golden-orange/20 sticky top-16 z-10 shadow-sm">
          <Container>
            <div className="py-4">
              {/* Section label */}
              <p className="text-xs font-medium text-deep-blue/70 uppercase tracking-wide mb-3">
                {locale === 'fr' ? 'Choisissez votre édition' : 'Choose your edition'}
              </p>

              {/* Tabs */}
              <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
                {editions.map((editionData) => {
                  const isSelected = selectedEdition?.edition.id === editionData.edition.id;
                  const tabLabel = formatEditionTabLabel(editionData.sessions, locale);
                  const editionTotalMinutes = editionData.edition?.total_minutes || 0;
                  const editionSessions = editionData.sessions || [];

                  // Calculate min remaining spots
                  const minSpots = editionSessions.length > 0
                    ? Math.min(...editionSessions.flatMap(s =>
                        s.date_options?.map(o => o.remaining_spots) || [Infinity]
                      ))
                    : null;

                  return (
                    <button
                      key={editionData.edition.id}
                      onClick={() => selectEdition(editionData.edition.id)}
                      className={`
                        flex-shrink-0 flex flex-col items-start px-5 py-3 rounded-xl transition-all border-2
                        ${isSelected
                          ? 'bg-golden-orange text-white border-golden-orange shadow-lg scale-[1.02]'
                          : 'bg-white text-deep-blue border-slate-200 hover:border-golden-orange/50 hover:shadow-md'
                        }
                      `}
                    >
                      {/* Date + Price row */}
                      <div className="flex items-center gap-3 w-full">
                        <span className="flex items-center gap-1.5 font-semibold">
                          <svg className={`w-4 h-4 ${isSelected ? 'text-white/80' : 'text-golden-orange'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {tabLabel}
                        </span>
                        {editionData.edition.calculated_price && (
                          <span className={`font-bold ${isSelected ? 'text-white' : 'text-golden-orange'}`}>
                            {editionData.edition.calculated_price} DH
                          </span>
                        )}
                      </div>

                      {/* Duration + Sessions */}
                      {editionTotalMinutes > 0 && (
                        <span className={`text-xs mt-1 ${isSelected ? 'text-white/80' : 'text-text-secondary'}`}>
                          {formatDuration(editionTotalMinutes)}
                          {editionSessions.length > 0 && ` • ${editionSessions.length} session${editionSessions.length > 1 ? 's' : ''}`}
                        </span>
                      )}

                      {/* Places remaining badge */}
                      {minSpots !== null && minSpots > 0 && minSpots <= 10 && (
                        <span className={`text-xs mt-1 font-medium ${isSelected ? 'text-white' : 'text-golden-orange'}`}>
                          {minSpots} {locale === 'fr' ? 'places' : 'spots'}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Main Content - Two Columns */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Programme Info */}
            <div className="space-y-8 min-w-0">
              {/* Image */}
              {image && !image.includes('programmes.classes') && (
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Description */}
              <div className="overflow-hidden">
                <h2 className="font-heading text-2xl font-semibold text-deep-blue mb-4">
                  {locale === 'fr' ? 'À propos de ce programme' : 'About this programme'}
                </h2>
                <p className="text-text-secondary leading-relaxed text-lg break-words">
                  {description}
                </p>
              </div>

              {/* Benefits */}
              {benefits.length > 0 && (
                <div className="overflow-hidden">
                  <h2 className="font-heading text-2xl font-semibold text-deep-blue mb-4">
                    {locale === 'fr' ? 'Ce que cette pratique peut vous apporter' : 'What this practice can bring you'}
                  </h2>
                  <ul className="space-y-3">
                    {(showAllBenefits ? benefits : benefits.slice(0, 4)).map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-golden-orange/20 flex items-center justify-center mt-0.5">
                          <svg className="w-4 h-4 text-golden-orange" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-text-secondary break-words">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  {benefits.length > 4 && (
                    <button
                      onClick={() => setShowAllBenefits(!showAllBenefits)}
                      className="mt-4 text-golden-orange hover:text-golden-orange/80 font-medium text-sm flex items-center gap-1"
                    >
                      {showAllBenefits
                        ? (locale === 'fr' ? 'Voir moins' : 'See less')
                        : (locale === 'fr' ? `Voir tous les ${benefits.length} bienfaits` : `See all ${benefits.length} benefits`)}
                      <svg
                        className={`w-4 h-4 transition-transform ${showAllBenefits ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
              )}

              {/* Programme Details */}
              <div className="bg-gradient-to-br from-golden-orange/10 to-golden-orange/5 rounded-2xl p-6 border border-golden-orange/20">
                <dl className="space-y-4">
                  {/* Dates */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-golden-orange/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <dt className="text-sm text-text-secondary">{locale === 'fr' ? 'Dates' : 'Dates'}</dt>
                      <dd className="font-medium text-deep-blue">
                        {hasActiveEdition && dateRange ? (
                          <>
                            {dateRange}
                            {minAvailable !== null && minAvailable > 0 && minAvailable <= 10 && (
                              <span className="ml-2 text-golden-orange text-sm">
                                ({minAvailable} {locale === 'fr' ? 'places' : 'spots'})
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-text-secondary italic">
                            {t(`programmes.classes.${translationKey}.schedule`)}
                          </span>
                        )}
                      </dd>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-golden-orange/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <dt className="text-sm text-text-secondary">
                        {locale === 'fr' ? 'Durée totale' : 'Total duration'}
                      </dt>
                      <dd className="font-medium text-deep-blue">
                        {hasActiveEdition && totalMinutes > 0
                          ? formatDuration(totalMinutes)
                          : duration}
                      </dd>
                    </div>
                  </div>

                  {/* Sessions count - only when active edition */}
                  {hasActiveEdition && sessions && sessions.length > 0 && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-golden-orange/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <div>
                        <dt className="text-sm text-text-secondary">
                          {locale === 'fr' ? 'Sessions' : 'Sessions'}
                        </dt>
                        <dd className="font-medium text-deep-blue">
                          {sessions.length} {locale === 'fr'
                            ? (sessions.length > 1 ? 'sessions' : 'session')
                            : (sessions.length > 1 ? 'sessions' : 'session')}
                        </dd>
                      </div>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-golden-orange/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <dt className="text-sm text-text-secondary">{locale === 'fr' ? 'Tarif' : 'Price'}</dt>
                      <dd className="font-bold text-golden-orange text-lg">
                        {getDisplayPrice(calculatedPrice, price)}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-golden-orange/20">
                  <Image
                    src="/images/Reel/Hajar.jpg"
                    alt="Hajar Habi"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-heading font-semibold text-deep-blue">Hajar Habi</p>
                  <p className="text-sm text-text-secondary">
                    {locale === 'fr'
                      ? 'Professeure de Hatha Yoga Classique'
                      : 'Classical Hatha Yoga Teacher'}
                  </p>
                  <p className="text-xs text-golden-orange font-medium">
                    {locale === 'fr'
                      ? 'Certifiée Sadhguru Gurukulam • 1750 heures de formation'
                      : 'Sadhguru Gurukulam Certified • 1750 hours of training'}
                  </p>
                </div>
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src="/images/certifications/isha-hatha-yoga-certified.png"
                    alt="Isha Hatha Yoga Certified"
                    fill
                    className="object-contain drop-shadow-sm"
                  />
                </div>
              </div>

              {/* Back to programmes link */}
              <Link
                href="/yoga"
                className="inline-flex items-center gap-2 text-text-secondary hover:text-golden-orange transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {locale === 'fr' ? 'Voir tous les programmes' : 'See all programmes'}
              </Link>
            </div>

            {/* Right Column - Registration Form */}
            <div className="lg:sticky lg:top-24 lg:self-start min-w-0">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-golden-orange to-golden-orange/80 px-6 py-5">
                  <h2 className="font-heading text-xl font-bold text-white">
                    {hasActiveEdition
                      ? (locale === 'fr' ? 'Inscription au programme' : 'Programme registration')
                      : (locale === 'fr' ? 'Manifester mon intérêt' : 'Express my interest')}
                  </h2>
                  {hasActiveEdition && edition?.title && (
                    <p className="text-white/90 text-sm mt-1">{edition.title}</p>
                  )}
                </div>

                {/* Form Body */}
                <div className="p-6">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="w-8 h-8 border-2 border-golden-orange border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    <PrivateYogaRequestForm
                      defaultYogaType={programmeKey}
                      isGroupClass={true}
                      edition={hasActiveEdition ? edition : undefined}
                      sessions={hasActiveEdition ? sessions : undefined}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

// Wrapper component with Suspense for useSearchParams
export default function ProgrammePageContent(props: ProgrammePageContentProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-golden-orange border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ProgrammePageContentInner {...props} />
    </Suspense>
  );
}
