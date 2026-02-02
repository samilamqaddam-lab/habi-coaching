'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function CorporateBrochure() {
  return (
    <div className="min-h-screen bg-white">
      {/* Print-friendly styles */}
      <style jsx global>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; }
        }
      `}</style>

      {/* Floating Action Bar - Not printed */}
      <div className="no-print fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <button
          onClick={() => window.print()}
          className="bg-morocco-blue text-white px-6 py-3 rounded-full shadow-lg hover:bg-morocco-blue/90 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Imprimer / PDF
        </button>
        <Link
          href="/organisations#devis"
          className="bg-golden-orange text-white px-6 py-3 rounded-full shadow-lg hover:bg-golden-orange/90 transition-colors flex items-center gap-2 text-center justify-center"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Nous contacter
        </Link>
      </div>

      {/* Header / Cover */}
      <header className="bg-gradient-to-br from-morocco-blue via-morocco-blue/90 to-deep-blue text-white py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Image
              src="/images/logos/logo-white.png"
              alt="Transcendence Work"
              width={220}
              height={60}
              className="h-auto"
            />
            <p className="text-white/60 text-sm mt-2">Par Hajar Habi</p>
          </div>

          <div className="space-y-4">
            <p className="text-golden-orange font-medium tracking-wide uppercase text-sm">
              Accompagnement des Organisations
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Offre Entreprise
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
              Transformation organisationnelle, leadership conscient, retraites corporate et bien-être au travail.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-2xl md:text-3xl font-bold text-golden-orange">≃20 ans</p>
              <p className="text-xs md:text-sm text-white/80">Expérience corporate</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-2xl md:text-3xl font-bold text-golden-orange">Coach</p>
              <p className="text-xs md:text-sm text-white/80">Certifiée Transformance Pro</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-2xl md:text-3xl font-bold text-golden-orange">1750h</p>
              <p className="text-xs md:text-sm text-white/80">Yoga Sadhguru Gurukulam</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-2xl md:text-3xl font-bold text-golden-orange">FR/EN</p>
              <p className="text-xs md:text-sm text-white/80">Interventions bilingues</p>
            </div>
          </div>
        </div>
      </header>

      {/* Sommaire */}
      <section className="py-12 px-8 bg-dune-beige/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-xl font-bold text-deep-blue mb-6 text-center">Notre Offre</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="#transformation" className="bg-morocco-blue rounded-xl p-4 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <p className="font-semibold text-white text-sm">Transformation & Cohésion</p>
              <p className="text-xs text-white/70 mt-1">Accompagnement du changement</p>
            </a>
            <a href="#leadership" className="bg-golden-orange rounded-xl p-4 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <p className="font-semibold text-white text-sm">Leadership Conscient</p>
              <p className="text-xs text-white/70 mt-1">Coaching dirigeants & managers</p>
            </a>
            <a href="#retraites" className="bg-mystic-mauve rounded-xl p-4 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <p className="font-semibold text-white text-sm">Retraites Corporate</p>
              <p className="text-xs text-white/70 mt-1">Séminaires & team building</p>
            </a>
            <a href="#yoga" className="bg-gradient-to-r from-golden-orange to-morocco-blue rounded-xl p-4 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <p className="font-semibold text-white text-sm">Corporate Yoga</p>
              <p className="text-xs text-white/70 mt-1">Bien-être au travail</p>
            </a>
          </div>
        </div>
      </section>

      {/* Section 1: Transformation & Cohésion */}
      <section id="transformation" className="py-16 px-8 page-break">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-morocco-blue/10 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-morocco-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="font-heading text-2xl font-bold text-deep-blue">
              Transformation & Cohésion d'Équipe
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-text-secondary mb-6">
                Accompagnement des équipes et des organisations dans leurs contextes de transformation, avec une approche qui allie rigueur professionnelle et dimension humaine.
              </p>

              <div className="space-y-4">
                <h3 className="font-semibold text-deep-blue">Modalités d'intervention</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-morocco-blue mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Diagnostic organisationnel et écoute des enjeux
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-morocco-blue mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Ateliers de cohésion et facilitation
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-morocco-blue mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Accompagnement du changement
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-morocco-blue mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Coaching d'équipe sur la durée
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-morocco-blue/5 rounded-2xl p-6">
              <h3 className="font-semibold text-deep-blue mb-4">Bénéfices pour l'organisation</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm">
                  <div className="w-6 h-6 bg-morocco-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-morocco-blue font-bold text-xs">1</span>
                  </div>
                  <span className="text-text-secondary">Alignement des équipes autour d'une vision partagée</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <div className="w-6 h-6 bg-morocco-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-morocco-blue font-bold text-xs">2</span>
                  </div>
                  <span className="text-text-secondary">Amélioration de la communication interpersonnelle</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <div className="w-6 h-6 bg-morocco-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-morocco-blue font-bold text-xs">3</span>
                  </div>
                  <span className="text-text-secondary">Résolution des tensions et conflits latents</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <div className="w-6 h-6 bg-morocco-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-morocco-blue font-bold text-xs">4</span>
                  </div>
                  <span className="text-text-secondary">Engagement renforcé des collaborateurs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Leadership Conscient */}
      <section id="leadership" className="py-16 px-8 bg-dune-beige/30 page-break">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-golden-orange/10 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="font-heading text-2xl font-bold text-deep-blue">
              Leadership Conscient
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-text-secondary mb-6">
                Coaching individuel et collectif pour dirigeants et managers, alliant développement des compétences managériales et travail sur la posture intérieure.
              </p>

              <div className="space-y-4">
                <h3 className="font-semibold text-deep-blue">Axes de travail</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-golden-orange mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Développement du leadership authentique
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-golden-orange mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Gestion du stress et de la pression
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-golden-orange mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Prise de décision et clarté stratégique
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-golden-orange mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Équilibre vie professionnelle / personnelle
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-golden-orange/5 rounded-2xl p-6">
              <h3 className="font-semibold text-deep-blue mb-4">Formats disponibles</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="font-medium text-deep-blue text-sm">Coaching individuel</p>
                  <p className="text-xs text-text-secondary mt-1">Parcours personnalisé sur 6 à 12 mois</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="font-medium text-deep-blue text-sm">Coaching de dirigeants</p>
                  <p className="text-xs text-text-secondary mt-1">Accompagnement des comités de direction</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="font-medium text-deep-blue text-sm">Coaching de managers</p>
                  <p className="text-xs text-text-secondary mt-1">Développement des compétences managériales</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Retraites Corporate */}
      <section id="retraites" className="py-16 px-8 page-break">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-mystic-mauve/10 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-mystic-mauve" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="font-heading text-2xl font-bold text-deep-blue">
              Retraites Corporate
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-text-secondary mb-6">
                Expériences immersives pour renforcer la cohésion d'équipe, stimuler la créativité et offrir un espace de ressourcement collectif.
              </p>

              <div className="space-y-4">
                <h3 className="font-semibold text-deep-blue">Ce que nous proposons</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-mystic-mauve mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Conception sur-mesure de l'expérience
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-mystic-mauve mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Animation d'ateliers team building
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-mystic-mauve mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Sessions de yoga et méditation
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-mystic-mauve mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Facilitation de réflexions stratégiques
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-mystic-mauve/5 rounded-2xl p-6">
              <h3 className="font-semibold text-deep-blue mb-4">Durées possibles</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
                  <span className="font-medium text-deep-blue text-sm">Demi-journée</span>
                  <span className="text-xs text-text-secondary">Team building ponctuel</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
                  <span className="font-medium text-deep-blue text-sm">Journée complète</span>
                  <span className="text-xs text-text-secondary">Séminaire d'équipe</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
                  <span className="font-medium text-deep-blue text-sm">2-3 jours</span>
                  <span className="text-xs text-text-secondary">Retraite immersive</span>
                </div>
              </div>
              <p className="text-xs text-text-secondary mt-4">
                Lieux : Casablanca, Atlas, ou lieu de votre choix
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Corporate Yoga */}
      <section id="yoga" className="py-16 px-8 bg-golden-orange/5 page-break">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-golden-orange/10 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="font-heading text-2xl font-bold text-deep-blue">
              Corporate Yoga
            </h2>
          </div>

          <p className="text-text-secondary mb-6">
            Des programmes de yoga adaptés au monde professionnel pour améliorer le bien-être, la performance et la cohésion de vos équipes.
          </p>

          {/* Pourquoi le yoga en entreprise */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-golden-orange/20 mb-10">
            <h3 className="font-semibold text-deep-blue mb-4">Pourquoi le yoga en entreprise ?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-deep-blue mb-2">Les enjeux du monde professionnel</p>
                <ul className="space-y-1 text-xs text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    Stress chronique et risques psychosociaux en hausse
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    Troubles musculosquelettiques liés à la sédentarité
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    Difficultés de concentration et surcharge mentale
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    Besoin de cohésion dans les équipes hybrides
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-deep-blue mb-2">Les bénéfices du yoga</p>
                <ul className="space-y-1 text-xs text-text-secondary">
                  <li className="flex items-start gap-2">
                    <svg className="w-3 h-3 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Réduction du stress et meilleure régulation émotionnelle
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-3 h-3 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Amélioration de la posture et prévention des TMS
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-3 h-3 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Clarté mentale et meilleure capacité de concentration
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-3 h-3 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Cohésion d'équipe et climat relationnel apaisé
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Événements Ponctuels */}
          <div className="mb-10">
            <h3 className="font-semibold text-deep-blue mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-golden-orange/20 rounded-full flex items-center justify-center text-xs text-golden-orange font-bold">A</span>
              Événements Ponctuels
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              Journées ou demi-journées pour des temps forts : séminaires, retraites, team building
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Corporate Relaxation Day */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-golden-orange/20">
                <h4 className="font-semibold text-deep-blue">Corporate Relaxation Day</h4>
                <p className="text-golden-orange text-xs font-medium mb-3">Reconnexion, détente & cohésion</p>
                <p className="text-text-secondary text-sm mb-3">
                  Une pause régénérante pour relâcher les tensions et renforcer la cohésion collective.
                </p>
                <div className="space-y-2 text-xs mb-3">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <svg className="w-4 h-4 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Durée :</strong> 1 journée</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <svg className="w-4 h-4 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span><strong>Contenu :</strong> Hatha Yoga • Nada Yoga • Méditation</span>
                  </div>
                </div>
                <div className="bg-golden-orange/5 rounded-lg p-3">
                  <p className="text-xs font-medium text-deep-blue mb-1">Bénéfices</p>
                  <ul className="text-xs text-text-secondary space-y-0.5">
                    <li>• Réduction immédiate du stress</li>
                    <li>• Amélioration du climat relationnel</li>
                    <li>• Énergie collective apaisée et recentrée</li>
                  </ul>
                </div>
                <p className="text-xs text-text-secondary mt-3">
                  <strong>Idéal pour :</strong> Séminaires, retraites, clôture de projets
                </p>
              </div>

              {/* Corporate Achievement */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-morocco-blue/20">
                <h4 className="font-semibold text-deep-blue">Corporate Achievement</h4>
                <p className="text-morocco-blue text-xs font-medium mb-3">Clarté mentale, focus & énergie</p>
                <p className="text-text-secondary text-sm mb-3">
                  Soutenir la performance collective par une meilleure gestion de l'énergie et du mental.
                </p>
                <div className="space-y-2 text-xs mb-3">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <svg className="w-4 h-4 text-morocco-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Durée :</strong> 1 journée ou 2 demi-journées</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <svg className="w-4 h-4 text-morocco-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span><strong>Contenu :</strong> Hatha Yoga • Pranayama • Méditation</span>
                  </div>
                </div>
                <div className="bg-morocco-blue/5 rounded-lg p-3">
                  <p className="text-xs font-medium text-deep-blue mb-1">Bénéfices</p>
                  <ul className="text-xs text-text-secondary space-y-0.5">
                    <li>• Meilleure clarté mentale et capacité de décision</li>
                    <li>• Renforcement de la stabilité émotionnelle</li>
                    <li>• Prévention de l'épuisement professionnel</li>
                  </ul>
                </div>
                <p className="text-xs text-text-secondary mt-3">
                  <strong>Idéal pour :</strong> Managers, leadership teams, périodes de transformation
                </p>
              </div>
            </div>
          </div>

          {/* Programmes Récurrents */}
          <div className="page-break">
            <h3 className="font-semibold text-deep-blue mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-mystic-mauve/20 rounded-full flex items-center justify-center text-xs text-mystic-mauve font-bold">B</span>
              Programmes Récurrents
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              Accompagnement durable pour tous les collaborateurs
            </p>

            <div className="space-y-4">
              {/* Stress Management */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-mystic-mauve/20">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="w-12 h-12 bg-mystic-mauve/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-mystic-mauve" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-deep-blue">Stress Management</h4>
                        <p className="text-mystic-mauve text-xs font-medium">Prévenir le stress, renforcer la résilience</p>
                      </div>
                      <span className="mt-1 md:mt-0 bg-mystic-mauve/10 px-3 py-1 rounded-full text-xs font-medium text-mystic-mauve">
                        24 ou 36 sessions • 1h/session
                      </span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-3 text-xs">
                      <div>
                        <p className="font-medium text-deep-blue">Pour qui</p>
                        <p className="text-text-secondary">Tous collaborateurs • Démarche QVT • Contextes de transformation</p>
                      </div>
                      <div>
                        <p className="font-medium text-deep-blue">Contenu</p>
                        <p className="text-text-secondary">Hatha Yoga • Pranayama • Nada Yoga • Méditations guidées</p>
                      </div>
                      <div>
                        <p className="font-medium text-deep-blue">Bénéfices</p>
                        <p className="text-text-secondary">Diminution stress • Régulation émotionnelle • Engagement durable</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Health & Vitality */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-golden-orange/20">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="w-12 h-12 bg-golden-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-deep-blue">Health & Vitality</h4>
                        <p className="text-golden-orange text-xs font-medium">Énergie, posture & équilibre</p>
                      </div>
                      <span className="mt-1 md:mt-0 bg-golden-orange/10 px-3 py-1 rounded-full text-xs font-medium text-golden-orange">
                        24 ou 36 sessions • 1h/session
                      </span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-3 text-xs">
                      <div>
                        <p className="font-medium text-deep-blue">Pour qui</p>
                        <p className="text-text-secondary">Travail de bureau • Prévention santé • Tous niveaux</p>
                      </div>
                      <div>
                        <p className="font-medium text-deep-blue">Contenu</p>
                        <p className="text-text-secondary">Hatha Yoga • Méditations guidées • Nada Yoga • Pranayama</p>
                      </div>
                      <div>
                        <p className="font-medium text-deep-blue">Bénéfices</p>
                        <p className="text-text-secondary">Réduction tensions • Amélioration énergie • Prévention TMS</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Online Well-being */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-morocco-blue/20">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="w-12 h-12 bg-morocco-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-morocco-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-deep-blue">Online Well-being</h4>
                        <p className="text-morocco-blue text-xs font-medium">Santé globale & immunité</p>
                      </div>
                      <span className="mt-1 md:mt-0 bg-morocco-blue/10 px-3 py-1 rounded-full text-xs font-medium text-morocco-blue">
                        16 sessions • 45min/session • En ligne
                      </span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-3 text-xs">
                      <div>
                        <p className="font-medium text-deep-blue">Pour qui</p>
                        <p className="text-text-secondary">Équipes hybrides • Multi-sites • Format flexible à distance</p>
                      </div>
                      <div>
                        <p className="font-medium text-deep-blue">Contenu</p>
                        <p className="text-text-secondary">Yoga bien-être • Système immunitaire • Clarté mentale • Hygiène yogique</p>
                      </div>
                      <div>
                        <p className="font-medium text-deep-blue">Bénéfices</p>
                        <p className="text-text-secondary">Vitalité renforcée • Réduction fatigue • Habitudes saines</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ce qui fait la différence */}
      <section className="py-16 px-8 page-break">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 bg-golden-orange/10 text-golden-orange text-sm font-medium rounded-full mb-3">
              Notre approche
            </span>
            <h2 className="font-heading text-3xl font-bold text-deep-blue">
              Ce qui fait la différence
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-golden-orange/5 to-golden-orange/10 rounded-2xl p-6 border border-golden-orange/20">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <svg className="w-6 h-6 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-semibold text-deep-blue mb-2">Expertise unique</h3>
              <p className="text-text-secondary text-sm">
                Ex-DRH avec ≃20 ans d'expérience corporate, coach certifiée Transformance Pro, et professeure de Hatha Yoga Classique certifiée Sadhguru Gurukulam (1750h).
              </p>
            </div>

            <div className="bg-gradient-to-br from-morocco-blue/5 to-morocco-blue/10 rounded-2xl p-6 border border-morocco-blue/20">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <svg className="w-6 h-6 text-morocco-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-deep-blue mb-2">Accessible à tous</h3>
              <p className="text-text-secondary text-sm">
                Approche adaptée au monde professionnel, aucune expérience préalable requise. Tous niveaux bienvenus.
              </p>
            </div>

            <div className="bg-gradient-to-br from-mystic-mauve/5 to-mystic-mauve/10 rounded-2xl p-6 border border-mystic-mauve/20">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <svg className="w-6 h-6 text-mystic-mauve" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h3 className="font-semibold text-deep-blue mb-2">Bilingue</h3>
              <p className="text-text-secondary text-sm">
                Interventions en français et en anglais. Idéal pour les équipes internationales.
              </p>
            </div>

            <div className="bg-gradient-to-br from-golden-orange/5 to-golden-orange/10 rounded-2xl p-6 border border-golden-orange/20">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <svg className="w-6 h-6 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="font-semibold text-deep-blue mb-2">Sur-mesure</h3>
              <p className="text-text-secondary text-sm">
                Formats personnalisables selon vos enjeux, contraintes et objectifs. Présentiel, en ligne ou hybride.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section className="py-16 px-8 bg-gradient-to-br from-dune-beige/50 to-golden-orange/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-xl flex-shrink-0">
              <Image
                src="/images/Reel/Hajar.jpg"
                alt="Hajar Habi"
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-deep-blue mb-2">
                Hajar Habi
              </h2>
              <p className="text-golden-orange font-medium mb-4">
                Coach & Professeure de Yoga Certifiée
              </p>
              <div className="space-y-2 text-text-secondary text-sm">
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  ≃20 ans d'expérience en entreprise et conseil
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Coach certifiée Transformance Pro (Coach & Team)
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Hatha Yoga Classique – Sadhguru Gurukulam (1750h)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & CTA */}
      <section className="py-16 px-8 bg-gradient-to-br from-morocco-blue to-deep-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Prêt à transformer votre organisation ?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour discuter de vos besoins et recevoir une proposition personnalisée.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/organisations#devis"
              className="inline-flex items-center justify-center gap-2 bg-golden-orange text-white px-8 py-4 rounded-full font-medium hover:bg-golden-orange/90 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Nous contacter
            </Link>
            <Link
              href="/organisations"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-medium hover:bg-white/20 transition-colors"
            >
              Voir la page Organisations
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 text-sm">
            <div className="bg-white/10 rounded-xl p-4">
              <svg className="w-6 h-6 text-golden-orange mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="text-white/80">hajar@transcendencework.com</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <svg className="w-6 h-6 text-golden-orange mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <p className="text-white/80">+212 663 096 857</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <svg className="w-6 h-6 text-golden-orange mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <p className="text-white/80">transcendencework.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-8 bg-deep-blue text-white/60 text-center text-xs">
        <p>© {new Date().getFullYear()} Transcendence Work - Hajar Habi. Tous droits réservés.</p>
        <p className="mt-1">Cette plaquette est un document confidentiel destiné aux organisations.</p>
      </footer>
    </div>
  );
}
