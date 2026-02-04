'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
    <div className="min-h-screen bg-soft-gray py-8 px-4">
      {/* Floating action buttons */}
      <div className="fixed top-6 right-6 z-50 flex gap-3 no-print">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-morocco-blue rounded-lg shadow-lg hover:bg-white transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <span className="hidden sm:inline">Retour au site</span>
        </Link>
        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className="flex items-center gap-2 px-4 py-2 bg-golden-orange text-white rounded-lg shadow-lg hover:bg-golden-orange-dark transition-all disabled:opacity-50"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          <span className="hidden sm:inline">
            {isGenerating ? 'Génération...' : 'Télécharger PDF'}
          </span>
        </button>
      </div>

      {/* ============================================ */}
      {/* PAGE 1 */}
      {/* ============================================ */}
      <div className="max-w-[850px] mx-auto bg-warm-white shadow-2xl border border-desert-light/50">
        <div className="flex min-h-[1200px]">

          {/* Left Sidebar - Page 1 (Full) */}
          <div className="w-[280px] bg-gradient-to-b from-morocco-blue via-morocco-blue to-deep-blue text-white flex-shrink-0 relative overflow-hidden flex flex-col">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-golden-orange/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-40 left-0 w-24 h-24 bg-mystic-mauve/10 rounded-full -translate-x-1/2" />

            {/* Photo with creative frame */}
            <div className="p-5 pb-3 relative z-10">
              <div className="relative">
                {/* Decorative accent behind photo */}
                <div className="absolute -top-2 -right-2 w-full h-full bg-gradient-to-br from-golden-orange/30 to-mystic-mauve/20 rounded-3xl transform rotate-3" />
                <div className="relative w-full aspect-square overflow-hidden rounded-3xl shadow-2xl">
                  <Image
                    src="/images/Reel/hajar-cv.png"
                    alt="Hajar Habi"
                    fill
                    className="object-cover object-top"
                  />
                  {/* Subtle gradient overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-morocco-blue/40 to-transparent" />
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="px-5 py-4 relative z-10">
              <h3 className="font-heading text-xl tracking-wider border-b border-golden-orange/50 pb-2 mb-4 text-golden-orange">
                Contact
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <span className="text-white/90 pt-1 text-xs">hajar@transcendencework.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <span className="text-white/90 pt-1">+212 663 096 857</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <span className="text-white/90 pt-1">Casablanca, Maroc</span>
                </div>
              </div>
            </div>

            {/* Langues Section */}
            <div className="px-5 py-4 relative z-10">
              <h3 className="font-heading text-xl tracking-wider border-b border-golden-orange/50 pb-2 mb-4 text-golden-orange">
                Langues
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Arabe</span>
                  <span className="text-golden-orange text-xs bg-golden-orange/20 px-2 py-0.5 rounded-full">Natif</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Français</span>
                  <span className="text-mystic-mauve-light text-xs bg-mystic-mauve/20 px-2 py-0.5 rounded-full">Bilingue</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Anglais</span>
                  <span className="text-mystic-mauve-light text-xs bg-mystic-mauve/20 px-2 py-0.5 rounded-full">Bilingue</span>
                </div>
              </div>
            </div>

            {/* Compétences Section */}
            <div className="px-5 py-4 relative z-10">
              <h3 className="font-heading text-xl tracking-wider border-b border-golden-orange/50 pb-2 mb-4 text-golden-orange">
                Compétences
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {['Leadership & transformation', 'Coaching professionnel', 'QVT & performance', 'Gestion du changement', 'Législation du travail', 'Animation d\'ateliers', 'Conception programmes', 'Corporate Yoga'].map((skill, i) => (
                  <span key={i} className="bg-white/10 px-2.5 py-1 rounded-full text-white/90 border border-white/10">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Expertise RH Section */}
            <div className="px-5 py-4 relative z-10">
              <h3 className="font-heading text-xl tracking-wider border-b border-golden-orange/50 pb-2 mb-4 text-golden-orange">
                Expertise RH
              </h3>
              <div className="space-y-2.5 text-sm text-white/90">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-golden-orange mt-2 flex-shrink-0" />
                  <span>Stratégie et structuration RH</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-mystic-mauve-light mt-2 flex-shrink-0" />
                  <span>Création et transformation de fonctions RH</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-golden-orange mt-2 flex-shrink-0" />
                  <span>Gouvernance RH & cadre social</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-mystic-mauve-light mt-2 flex-shrink-0" />
                  <span>Déploiement de politiques RH</span>
                </div>
              </div>
            </div>

            {/* Spacer to push logo to bottom */}
            <div className="flex-grow" />

            {/* Logo at bottom */}
            <div className="px-5 py-4 relative z-10 border-t border-white/10">
              <Image
                src="/images/logos/logo-white.png"
                alt="Transcendence Work"
                width={180}
                height={50}
                className="mx-auto opacity-80"
              />
            </div>
          </div>

          {/* Right Content - Page 1 */}
          <div className="flex-1 p-8 bg-warm-white">
            {/* Header with decorative line */}
            <div className="mb-6 relative">
              <div className="absolute -left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-golden-orange via-mystic-mauve to-morocco-blue rounded-full" />
              <h1 className="font-heading text-5xl text-morocco-blue leading-none tracking-tight">
                Hajar
              </h1>
              <h1 className="font-heading text-5xl text-morocco-blue font-bold tracking-wider leading-tight">
                HABI
              </h1>
              {/* Decorative underline */}
              <div className="flex items-center gap-2 mt-3">
                <div className="h-1 w-16 bg-golden-orange rounded-full" />
                <div className="h-1 w-8 bg-mystic-mauve rounded-full" />
                <div className="h-1 w-4 bg-morocco-blue rounded-full" />
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-morocco-blue font-semibold tracking-[0.2em] text-sm mb-4 uppercase">
              Conseil • Coaching • Leadership Conscient
            </p>

            {/* Intro */}
            <p className="text-text-secondary leading-relaxed mb-8 text-[15px] border-l-2 border-golden-orange/30 pl-4 italic">
              Forte de près de 20 ans d&apos;expérience en gestion RH, en environnements
              multiculturels et en gestion de crise, j&apos;accompagne aujourd&apos;hui dirigeants
              et équipes sur leurs enjeux humains, entre performance durable, clarté et équilibre.
            </p>

            {/* Formations & Certifications */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-golden-orange to-golden-orange-dark flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                  </svg>
                </div>
                <h2 className="font-heading text-2xl text-morocco-blue">
                  Formations & Certifications
                </h2>
              </div>

              <div className="space-y-4 ml-2">
                {/* Yoga */}
                <div className="flex justify-between items-start border-l-2 border-golden-orange/30 pl-4 py-1">
                  <div className="flex-1 pr-4">
                    <h3 className="font-semibold text-text-primary">
                      Certification &quot;Classical Hatha Yoga Teacher&quot;
                      <span className="text-golden-orange ml-2 text-sm">(1750 hrs)</span>
                    </h3>
                    <p className="text-text-secondary text-sm">
                      Sadhguru Gurukulam - Inde
                    </p>
                  </div>
                  <span className="text-morocco-blue text-sm font-medium bg-morocco-blue/10 px-3 py-1 rounded-full">2025</span>
                </div>

                {/* Coach & Team */}
                <div className="flex justify-between items-start border-l-2 border-mystic-mauve/30 pl-4 py-1">
                  <div className="flex-1 pr-4">
                    <h3 className="font-semibold text-text-primary">
                      Certification &quot;Coach & Team&quot;
                    </h3>
                    <p className="text-text-secondary text-sm">
                      Transformance Pro - UM6P-Africa Business School
                    </p>
                  </div>
                  <span className="text-mystic-mauve text-sm font-medium bg-mystic-mauve/10 px-3 py-1 rounded-full">2023-24</span>
                </div>

                {/* Master */}
                <div className="flex justify-between items-start border-l-2 border-morocco-blue/30 pl-4 py-1">
                  <div className="flex-1 pr-4">
                    <h3 className="font-semibold text-text-primary">
                      Master en Management des Ressources Humaines
                    </h3>
                    <p className="text-text-secondary text-sm">
                      IAE Corte
                    </p>
                  </div>
                  <span className="text-morocco-blue text-sm font-medium bg-morocco-blue/10 px-3 py-1 rounded-full">2009-10</span>
                </div>

                {/* Bac+4 */}
                <div className="flex justify-between items-start border-l-2 border-desert-ocre/30 pl-4 py-1">
                  <div className="flex-1 pr-4">
                    <h3 className="font-semibold text-text-primary">
                      Bac+4 en marketing et offshoring
                    </h3>
                    <p className="text-text-secondary text-sm">
                      ENCG Settat
                    </p>
                  </div>
                  <span className="text-desert-ocre text-sm font-medium bg-desert-ocre/10 px-3 py-1 rounded-full">2003-07</span>
                </div>
              </div>
            </div>

            {/* Expériences Professionnelles - Start */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-morocco-blue to-deep-blue flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                  </svg>
                </div>
                <h2 className="font-heading text-2xl text-morocco-blue">
                  Expériences Professionnelles
                </h2>
              </div>

              {/* GIZ - Cheffe */}
              <div className="mb-5 ml-2">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-text-primary text-[15px]">
                      Cheffe du Service Relations Humaines
                    </h3>
                    <p className="text-golden-orange text-sm font-medium">
                      Agence allemande de coopération internationale (GIZ) - Rabat
                    </p>
                  </div>
                  <span className="text-morocco-blue text-sm font-medium bg-morocco-blue/10 px-3 py-1 rounded-full whitespace-nowrap">
                    2022 - 2025
                  </span>
                </div>
                <ul className="text-text-secondary text-sm space-y-1 ml-1">
                  <li className="flex items-start gap-2">
                    <span className="text-golden-orange mt-1.5 text-xs">●</span>
                    <span>Conseil stratégique auprès de la direction sur la politique RH</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-golden-orange mt-1.5 text-xs">●</span>
                    <span>Pilotage de la planification stratégique du développement des talents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-golden-orange mt-1.5 text-xs">●</span>
                    <span>Conduite de missions de réorganisation interne en contexte multiculturel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-golden-orange mt-1.5 text-xs">●</span>
                    <span>Coordination d&apos;audits internationaux et missions de contrôle interne</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* PAGE BREAK SPACE */}
      {/* ============================================ */}
      <div className="max-w-[850px] mx-auto my-6 flex items-center justify-center no-print">
        <div className="flex items-center gap-4 text-text-secondary/50 text-sm bg-white/50 px-6 py-2 rounded-full">
          <div className="h-px w-16 bg-golden-orange/30"></div>
          <span>Coupure de page</span>
          <div className="h-px w-16 bg-golden-orange/30"></div>
        </div>
      </div>

      {/* ============================================ */}
      {/* PAGE 2 */}
      {/* ============================================ */}
      <div className="max-w-[850px] mx-auto bg-warm-white shadow-2xl border border-desert-light/50">
        <div className="flex min-h-[1200px]">

          {/* Left Sidebar - Page 2 (Simplified) */}
          <div className="w-[280px] bg-gradient-to-b from-morocco-blue via-morocco-blue to-deep-blue text-white flex-shrink-0 relative overflow-hidden flex flex-col">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-golden-orange/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-40 left-0 w-24 h-24 bg-mystic-mauve/10 rounded-full -translate-x-1/2" />

            {/* Photo with creative frame */}
            <div className="p-5 pb-3 relative z-10">
              <div className="relative">
                <div className="absolute -top-2 -right-2 w-full h-full bg-gradient-to-br from-golden-orange/30 to-mystic-mauve/20 rounded-3xl transform rotate-3" />
                <div className="relative w-full aspect-square overflow-hidden rounded-3xl shadow-2xl">
                  <Image
                    src="/images/Reel/hajar-cv.png"
                    alt="Hajar Habi"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-morocco-blue/40 to-transparent" />
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="px-5 py-4 relative z-10">
              <h3 className="font-heading text-xl tracking-wider border-b border-golden-orange/50 pb-2 mb-4 text-golden-orange">
                Contact
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <span className="text-white/90 pt-1 text-xs">hajar@transcendencework.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <span className="text-white/90 pt-1">+212 663 096 857</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <span className="text-white/90 pt-1">Casablanca, Maroc</span>
                </div>
              </div>
            </div>

            {/* Website/LinkedIn Section for Page 2 */}
            <div className="px-5 py-4 relative z-10">
              <h3 className="font-heading text-xl tracking-wider border-b border-golden-orange/50 pb-2 mb-4 text-golden-orange">
                En ligne
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                  </div>
                  <span className="text-white/90 pt-1 text-xs">transcendencework.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <span className="text-white/90 pt-1 text-xs">linkedin.com/in/hajar-habi</span>
                </div>
              </div>
            </div>

            {/* Quote or Tagline */}
            <div className="px-5 py-6 relative z-10 mt-4">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <p className="text-white/70 text-sm italic text-center leading-relaxed">
                  &quot;Accompagner la transformation humaine au service de la performance durable&quot;
                </p>
              </div>
            </div>

            {/* Spacer to push logo to bottom */}
            <div className="flex-grow" />

            {/* Logo at bottom */}
            <div className="px-5 py-4 relative z-10 border-t border-white/10">
              <Image
                src="/images/logos/logo-white.png"
                alt="Transcendence Work"
                width={180}
                height={50}
                className="mx-auto opacity-80"
              />
            </div>
          </div>

          {/* Right Content - Page 2 */}
          <div className="flex-1 p-8 bg-warm-white">
            {/* Continue Expériences */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-morocco-blue to-deep-blue flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                  </svg>
                </div>
                <h2 className="font-heading text-2xl text-morocco-blue">
                  Expériences Professionnelles
                </h2>
              </div>

              {/* GIZ - Responsable développement RH */}
              <div className="mb-5 ml-2">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-text-primary text-[15px]">
                      Responsable du développement RH
                    </h3>
                    <p className="text-golden-orange text-sm font-medium">
                      Agence allemande de coopération internationale (GIZ) - Rabat
                    </p>
                  </div>
                  <span className="text-morocco-blue text-sm font-medium bg-morocco-blue/10 px-3 py-1 rounded-full whitespace-nowrap">
                    2020 - 2022
                  </span>
                </div>
                <ul className="text-text-secondary text-sm space-y-1 ml-1">
                  <li className="flex items-start gap-2">
                    <span className="text-golden-orange mt-1.5 text-xs">●</span>
                    <span>Déploiement d&apos;une stratégie RH pluriannuelle et feuille de route de transformation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-golden-orange mt-1.5 text-xs">●</span>
                    <span>Accompagnement de 17 pays d&apos;Afrique francophone sur des mesures RH structurantes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-golden-orange mt-1.5 text-xs">●</span>
                    <span>Pilotage de projets de digitalisation des processus RH</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-golden-orange mt-1.5 text-xs">●</span>
                    <span>Déploiement de programmes de mentorat et développement des talents</span>
                  </li>
                </ul>
              </div>

              {/* CDG Capital */}
              <div className="mb-5 ml-2">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-text-primary text-[15px]">
                      Responsable de développement RH
                    </h3>
                    <p className="text-mystic-mauve text-sm font-medium">
                      CDG Capital - Rabat
                    </p>
                  </div>
                  <span className="text-mystic-mauve text-sm font-medium bg-mystic-mauve/10 px-3 py-1 rounded-full whitespace-nowrap">
                    2014 - 2018
                  </span>
                </div>
                <ul className="text-text-secondary text-sm space-y-1 ml-1">
                  <li className="flex items-start gap-2">
                    <span className="text-mystic-mauve mt-1.5 text-xs">●</span>
                    <span>Contribution à la stratégie RH 2018–2022</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-mystic-mauve mt-1.5 text-xs">●</span>
                    <span>Représentation de la DRH au comité exécutif</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-mystic-mauve mt-1.5 text-xs">●</span>
                    <span>Diagnostic organisationnel et plans de succession</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-mystic-mauve mt-1.5 text-xs">●</span>
                    <span>Refonte des politiques de rémunération et classification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-mystic-mauve mt-1.5 text-xs">●</span>
                    <span>Mise en place de systèmes d&apos;évaluation de la performance</span>
                  </li>
                </ul>
              </div>

              {/* DIORH */}
              <div className="mb-5 ml-2">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-text-primary text-[15px]">
                      Consultante Formations
                    </h3>
                    <p className="text-desert-ocre text-sm font-medium">
                      DIORH - Casablanca
                    </p>
                  </div>
                  <span className="text-desert-ocre text-sm font-medium bg-desert-ocre/10 px-3 py-1 rounded-full whitespace-nowrap">
                    2008 - 2014
                  </span>
                </div>
                <ul className="text-text-secondary text-sm space-y-1 ml-1">
                  <li className="flex items-start gap-2">
                    <span className="text-desert-ocre mt-1.5 text-xs">●</span>
                    <span>Conception de programmes de formation sur mesure pour grands groupes et multinationales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-desert-ocre mt-1.5 text-xs">●</span>
                    <span>Développement de parcours de coaching pour cadres dirigeants</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-desert-ocre mt-1.5 text-xs">●</span>
                    <span>Participation à des missions de team building et transformation managériale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-desert-ocre mt-1.5 text-xs">●</span>
                    <span>Gestion de cycles certifiants en partenariat avec institutions internationales</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
