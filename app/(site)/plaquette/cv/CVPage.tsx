'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// SVG Icons as components
const EnvelopeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const ArrowDownTrayIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export default function CVPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/pdf/cv');
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || 'Failed to generate PDF');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'CV-Hajar-Habi.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Erreur lors de la génération du PDF: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-dune-beige">
      {/* Floating action buttons */}
      <div className="fixed top-6 right-6 z-50 flex gap-3 no-print">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-morocco-blue rounded-lg shadow-lg hover:bg-white transition-all"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Retour au site</span>
        </Link>
        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className="flex items-center gap-2 px-4 py-2 bg-morocco-blue text-white rounded-lg shadow-lg hover:bg-deep-blue transition-all disabled:opacity-50"
        >
          <ArrowDownTrayIcon className="w-5 h-5" />
          <span className="hidden sm:inline">
            {isGenerating ? 'Génération...' : 'Télécharger PDF'}
          </span>
        </button>
      </div>

      {/* CV Container */}
      <div className="max-w-[1000px] mx-auto bg-warm-white shadow-2xl">

        {/* ============================================ */}
        {/* PAGE 1 */}
        {/* ============================================ */}
        <div className="flex min-h-[1400px]">

          {/* Left Sidebar */}
          <div className="w-[320px] bg-morocco-blue text-white flex-shrink-0">
            {/* Photo */}
            <div className="p-6 pb-4">
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg">
                <Image
                  src="/images/Reel/Hajar.jpg"
                  alt="Hajar Habi"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Contact Section */}
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold tracking-wider border-b border-white/30 pb-2 mb-4">
                CONTACT
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <EnvelopeIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>hajar@transcendencework.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <PhoneIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>+212 663 096 857</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Casablanca, Maroc</span>
                </div>
              </div>
            </div>

            {/* Langues Section */}
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold tracking-wider border-b border-white/30 pb-2 mb-4">
                LANGUES
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Arabe</span>
                  <span className="text-white/80">Natif</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Français</span>
                  <span className="text-white/80">Bilingue</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Anglais</span>
                  <span className="text-white/80">Bilingue</span>
                </div>
              </div>
            </div>

            {/* Compétences Section */}
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold tracking-wider border-b border-white/30 pb-2 mb-4">
                COMPÉTENCES
              </h3>
              <div className="space-y-2 text-sm text-center">
                <p>Leadership & transformation</p>
                <p>Coaching professionnel</p>
                <p>QVT & performance humaine</p>
                <p>Gestion du changement</p>
                <p>Législation du travail</p>
                <p>Animation d&apos;ateliers & séminaires</p>
                <p>Conception de programmes</p>
                <p>Corporate Yoga</p>
              </div>
            </div>

            {/* Expertise RH Section */}
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold tracking-wider border-b border-white/30 pb-2 mb-4">
                EXPERTISE RH
              </h3>
              <div className="space-y-2 text-sm text-center">
                <p>Stratégie et structuration RH</p>
                <p>Création et transformation de fonctions RH</p>
                <p>Gouvernance RH & cadre social</p>
                <p>Déploiement de politiques RH</p>
              </div>
            </div>
          </div>

          {/* Right Content - Page 1 */}
          <div className="flex-1 p-8 bg-dune-beige">
            {/* Header */}
            <div className="mb-6">
              <h1 className="font-heading text-6xl text-morocco-blue leading-tight">
                Hajar
              </h1>
              <h1 className="font-heading text-6xl text-morocco-blue font-bold tracking-wide">
                HABI
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-morocco-blue font-semibold tracking-widest text-sm mb-6">
              CONSEIL • COACHING • LEADERSHIP CONSCIENT
            </p>

            {/* Intro */}
            <p className="text-text-secondary leading-relaxed mb-10 text-[15px]">
              Forte de près de 20 ans d&apos;expérience en gestion RH, en environnements
              multiculturels et en gestion de crise, j&apos;accompagne aujourd&apos;hui dirigeants
              et équipes sur leurs enjeux humains, entre performance durable, clarté et équilibre.
            </p>

            {/* Formations & Certifications */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-morocco-blue tracking-wider border-b-2 border-morocco-blue pb-2 mb-6">
                FORMATIONS & CERTIFICATIONS
              </h2>

              <div className="space-y-5">
                {/* Yoga */}
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <h3 className="font-bold text-text-primary">
                      Certification &quot;Classical Hatha Yoga Teacher&quot; (1750 hrs)
                    </h3>
                    <p className="text-text-secondary text-sm italic">
                      Sadhguru Gurukulam - Inde
                    </p>
                  </div>
                  <span className="text-text-secondary text-sm whitespace-nowrap">2025</span>
                </div>

                {/* Coach & Team */}
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <h3 className="font-bold text-text-primary">
                      Certification &quot;Coach & Team&quot;
                    </h3>
                    <p className="text-text-secondary text-sm italic">
                      Transformance Pro - UM6P-Africa Business School
                    </p>
                  </div>
                  <span className="text-text-secondary text-sm whitespace-nowrap">2023 - 2024</span>
                </div>

                {/* Master */}
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <h3 className="font-bold text-text-primary">
                      Master en Management des Ressources Humaines
                    </h3>
                    <p className="text-text-secondary text-sm italic">
                      IAE Corte
                    </p>
                  </div>
                  <span className="text-text-secondary text-sm whitespace-nowrap">2009 - 2010</span>
                </div>

                {/* Bac+4 */}
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <h3 className="font-bold text-text-primary">
                      Bac+4 en marketing et offshoring
                    </h3>
                    <p className="text-text-secondary text-sm italic">
                      ENCG Settat
                    </p>
                  </div>
                  <span className="text-text-secondary text-sm whitespace-nowrap">2003 - 2007</span>
                </div>
              </div>
            </div>

            {/* Expériences Professionnelles - Start */}
            <div>
              <h2 className="text-lg font-bold text-morocco-blue tracking-wider border-b-2 border-morocco-blue pb-2 mb-6">
                EXPÉRIENCES PROFESSIONNELLES
              </h2>

              {/* GIZ - Cheffe */}
              <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-text-primary text-[15px]">
                      Cheffe du Service Relations Humaines
                    </h3>
                    <p className="text-text-secondary text-sm italic">
                      Agence allemande de coopération internationale (GIZ) - Rabat
                    </p>
                  </div>
                  <span className="text-text-secondary text-sm whitespace-nowrap text-right">
                    Juin 2022<br />Juin 2025
                  </span>
                </div>
                <ul className="list-disc list-outside ml-5 text-text-secondary text-sm space-y-1.5">
                  <li>Conseil stratégique auprès de la direction sur la politique RH et son déploiement à l&apos;échelle nationale</li>
                  <li>Pilotage de la planification stratégique du développement des talents</li>
                  <li>Conduite de missions de réorganisation interne en contexte multiculturel</li>
                  <li>Structuration et formalisation des processus RH</li>
                  <li>Gestion des relations sociales et interface juridique</li>
                  <li>Coordination d&apos;audits internationaux et missions de contrôle interne</li>
                  <li>Participation à une mission internationale de réorganisation RH</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* PAGE BREAK SPACE */}
        {/* ============================================ */}
        <div className="h-16 bg-soft-gray/50 flex items-center justify-center no-print">
          <div className="flex items-center gap-4 text-text-secondary/50 text-sm">
            <div className="h-px w-20 bg-text-secondary/30"></div>
            <span>Coupure de page</span>
            <div className="h-px w-20 bg-text-secondary/30"></div>
          </div>
        </div>

        {/* ============================================ */}
        {/* PAGE 2 */}
        {/* ============================================ */}
        <div className="flex min-h-[1400px]">

          {/* Left Sidebar - Page 2 (continuation) */}
          <div className="w-[320px] bg-morocco-blue text-white flex-shrink-0">
            {/* Photo repeat for page 2 */}
            <div className="p-6 pb-4">
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg">
                <Image
                  src="/images/Reel/Hajar.jpg"
                  alt="Hajar Habi"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Contact Section repeat */}
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold tracking-wider border-b border-white/30 pb-2 mb-4">
                CONTACT
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <EnvelopeIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>hajar@transcendencework.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <PhoneIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>+212 663 096 857</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Casablanca, Maroc</span>
                </div>
              </div>
            </div>

            {/* Langues Section repeat */}
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold tracking-wider border-b border-white/30 pb-2 mb-4">
                LANGUES
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Arabe</span>
                  <span className="text-white/80">Natif</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Français</span>
                  <span className="text-white/80">Bilingue</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Anglais</span>
                  <span className="text-white/80">Bilingue</span>
                </div>
              </div>
            </div>

            {/* Compétences Section repeat */}
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold tracking-wider border-b border-white/30 pb-2 mb-4">
                COMPÉTENCES
              </h3>
              <div className="space-y-2 text-sm text-center">
                <p>Leadership & transformation</p>
                <p>Coaching professionnel</p>
                <p>QVT & performance humaine</p>
                <p>Gestion du changement</p>
                <p>Législation du travail</p>
                <p>Animation d&apos;ateliers & séminaires</p>
                <p>Conception de programmes</p>
                <p>Corporate Yoga</p>
              </div>
            </div>

            {/* Expertise RH Section repeat */}
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold tracking-wider border-b border-white/30 pb-2 mb-4">
                EXPERTISE RH
              </h3>
              <div className="space-y-2 text-sm text-center">
                <p>Stratégie et structuration RH</p>
                <p>Création et transformation de fonctions RH</p>
                <p>Gouvernance RH & cadre social</p>
                <p>Déploiement de politiques RH</p>
              </div>
            </div>
          </div>

          {/* Right Content - Page 2 */}
          <div className="flex-1 p-8 bg-dune-beige">
            {/* Continue Expériences */}
            <div>
              <h2 className="text-lg font-bold text-morocco-blue tracking-wider border-b-2 border-morocco-blue pb-2 mb-6">
                EXPÉRIENCES PROFESSIONNELLES
              </h2>

              {/* GIZ - Responsable développement RH */}
              <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-text-primary text-[15px]">
                      Responsable du développement RH
                    </h3>
                    <p className="text-text-secondary text-sm italic">
                      Agence allemande de coopération internationale (GIZ) - Rabat
                    </p>
                  </div>
                  <span className="text-text-secondary text-sm whitespace-nowrap text-right">
                    Mars 2020<br />Fev 2022
                  </span>
                </div>
                <ul className="list-disc list-outside ml-5 text-text-secondary text-sm space-y-1.5">
                  <li>Déploiement d&apos;une stratégie RH pluriannuelle et feuille de route de transformation</li>
                  <li>Conception d&apos;un plan de développement des compétences à l&apos;échelle régionale</li>
                  <li>Accompagnement de 17 pays d&apos;Afrique francophone sur des mesures RH structurantes</li>
                  <li>Pilotage de projets de digitalisation de processus RH</li>
                  <li>Animation d&apos;ateliers de gestion du changement</li>
                  <li>Gestion de situations sensibles de résiliation de contrats en contexte de crise diplomatique</li>
                  <li>Déploiement de programmes de mentorat et de développement des talents</li>
                </ul>
              </div>

              {/* CDG Capital */}
              <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-text-primary text-[15px]">
                      Responsable de développement RH
                    </h3>
                    <p className="text-text-secondary text-sm italic">
                      CDG Capital - Rabat
                    </p>
                  </div>
                  <span className="text-text-secondary text-sm whitespace-nowrap text-right">
                    Avril 2014<br />Sept 2018
                  </span>
                </div>
                <ul className="list-disc list-outside ml-5 text-text-secondary text-sm space-y-1.5">
                  <li>Contribution à la stratégie RH 2018–2022</li>
                  <li>Représentation de la DRH au comité exécutif</li>
                  <li>Diagnostic organisationnel et plans de succession</li>
                  <li>Refonte des politiques de rémunération et classification</li>
                  <li>Pilotage du plan de recrutement et ingénierie de formation</li>
                  <li>Mise en place de systèmes d&apos;évaluation de la performance</li>
                </ul>
              </div>

              {/* DIORH */}
              <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-text-primary text-[15px]">
                      Consultante Formations
                    </h3>
                    <p className="text-text-secondary text-sm italic">
                      DIORH - Casablanca
                    </p>
                  </div>
                  <span className="text-text-secondary text-sm whitespace-nowrap text-right">
                    Juin 2008<br />Avril 2014
                  </span>
                </div>
                <ul className="list-disc list-outside ml-5 text-text-secondary text-sm space-y-1.5">
                  <li>Conception de programmes de formation sur mesure pour grands groupes et multinationales</li>
                  <li>Développement de parcours de coaching pour cadres dirigeants</li>
                  <li>Participation à des missions de team building et transformation managériale</li>
                  <li>Gestion de cycles certifiants en partenariat avec institutions internationales</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
