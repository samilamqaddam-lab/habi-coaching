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
        <div className="flex">

          {/* Left Sidebar - Page 1 */}
          <div className="w-[280px] bg-gradient-to-b from-morocco-blue via-morocco-blue to-deep-blue text-white flex-shrink-0 relative overflow-hidden flex flex-col pb-16">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-golden-orange/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-40 left-0 w-24 h-24 bg-mystic-mauve/10 rounded-full -translate-x-1/2" />

            {/* Photo */}
            <div className="p-5 pb-3 relative z-10">
              <div className="relative w-full aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="/images/Reel/hajar-cv.png"
                  alt="Hajar Habi"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Contact Section */}
            <div className="px-5 py-3 relative z-10">
              <h3 className="font-heading text-xl tracking-wider border-b border-golden-orange/50 pb-2 mb-3 text-golden-orange">
                Contact
              </h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <span className="text-white/90 pt-0.5 text-xs">hajar@transcendencework.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <span className="text-white/90 pt-0.5">+212 663 096 857</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <span className="text-white/90 pt-0.5">Casablanca, Maroc</span>
                </div>
              </div>
            </div>

            {/* Langues Section */}
            <div className="px-5 py-3 relative z-10">
              <h3 className="font-heading text-xl tracking-wider border-b border-golden-orange/50 pb-2 mb-3 text-golden-orange">
                Langues
              </h3>
              <div className="space-y-2 text-sm">
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
            <div className="px-5 py-3 relative z-10">
              <h3 className="font-heading text-xl tracking-wider border-b border-golden-orange/50 pb-2 mb-3 text-golden-orange">
                Compétences
              </h3>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {['Leadership & transformation', 'Coaching professionnel', 'QVT & performance humaine', 'Gestion du changement', 'Législation du travail', 'Animation d\'ateliers & séminaires', 'Conception de programmes', 'Corporate Yoga'].map((skill, i) => (
                  <span key={i} className="bg-white/10 px-2 py-1 rounded-full text-white/90 border border-white/10">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Expertise RH Section */}
            <div className="px-5 py-3 relative z-10">
              <h3 className="font-heading text-xl tracking-wider border-b border-golden-orange/50 pb-2 mb-3 text-golden-orange">
                Expertise RH
              </h3>
              <div className="space-y-2 text-sm text-white/90">
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-golden-orange mt-1.5 flex-shrink-0" />
                  <span>Stratégie et structuration RH</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-mystic-mauve-light mt-1.5 flex-shrink-0" />
                  <span>Création et transformation de fonctions RH</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-golden-orange mt-1.5 flex-shrink-0" />
                  <span>Gouvernance RH & cadre social</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-mystic-mauve-light mt-1.5 flex-shrink-0" />
                  <span>Déploiement de politiques RH</span>
                </div>
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-grow" />

            {/* Logo at bottom */}
            <div className="px-5 py-5 relative z-10">
              <Image
                src="/images/logos/logo-white-cv.png"
                alt="Transcendence Work"
                width={180}
                height={42}
                className="opacity-90"
              />
            </div>

          </div>

          {/* Right Content - Page 1 */}
          <div className="flex-1 p-7 pb-12 bg-warm-white">
            {/* Header */}
            <div className="mb-5">
              <h1 className="font-heading text-5xl text-morocco-blue leading-none tracking-tight">
                Hajar
              </h1>
              <h1 className="font-heading text-5xl text-morocco-blue font-bold tracking-wider leading-tight">
                HABI
              </h1>
              <div className="flex items-center gap-2 mt-3">
                <div className="h-1 w-20 bg-golden-orange rounded-full" />
                <div className="h-1 w-10 bg-mystic-mauve rounded-full" />
                <div className="h-1 w-5 bg-morocco-blue rounded-full" />
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-morocco-blue font-semibold tracking-[0.12em] text-base mb-4 uppercase">
              Conseil • Coaching • Leadership Conscient
            </p>

            {/* Intro */}
            <p className="text-text-secondary leading-relaxed mb-6 text-sm border-l-2 border-golden-orange/30 pl-4 italic">
              Forte de près de 20 ans d&apos;expérience en gestion RH, en environnements
              multiculturels et en gestion de crise, j&apos;accompagne aujourd&apos;hui dirigeants
              et équipes sur leurs enjeux humains, entre performance durable, clarté et équilibre.
            </p>

            {/* Formations & Certifications */}
            <div className="mb-6">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-golden-orange to-golden-orange-dark flex items-center justify-center shadow">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                  </svg>
                </div>
                <h2 className="font-heading text-xl text-morocco-blue">
                  Formations & Certifications
                </h2>
              </div>

              <div className="space-y-4 ml-1">
                <div className="flex justify-between items-start border-l-2 border-golden-orange/30 pl-3 py-0.5">
                  <div className="flex-1 pr-3">
                    <h3 className="font-semibold text-text-primary text-[15px]">
                      Certification &quot;Classical Hatha Yoga Teacher&quot;
                      <span className="text-golden-orange ml-1 text-xs">(1750 hrs)</span>
                    </h3>
                    <p className="text-text-secondary text-xs">Sadhguru Gurukulam - Inde</p>
                  </div>
                  <span className="text-morocco-blue text-xs font-medium bg-morocco-blue/10 px-2 py-0.5 rounded-full">2025</span>
                </div>

                <div className="flex justify-between items-start border-l-2 border-mystic-mauve/30 pl-3 py-0.5">
                  <div className="flex-1 pr-3">
                    <h3 className="font-semibold text-text-primary text-[15px]">
                      Certification &quot;Coach & Team&quot;
                    </h3>
                    <p className="text-text-secondary text-xs">Transformance Pro - UM6P-Africa Business School</p>
                  </div>
                  <span className="text-mystic-mauve text-xs font-medium bg-mystic-mauve/10 px-2 py-0.5 rounded-full">2023-24</span>
                </div>

                <div className="flex justify-between items-start border-l-2 border-morocco-blue/30 pl-3 py-0.5">
                  <div className="flex-1 pr-3">
                    <h3 className="font-semibold text-text-primary text-[15px]">
                      Master en Management des Ressources Humaines
                    </h3>
                    <p className="text-text-secondary text-xs">IAE Corte</p>
                  </div>
                  <span className="text-morocco-blue text-xs font-medium bg-morocco-blue/10 px-2 py-0.5 rounded-full">2009-10</span>
                </div>

                <div className="flex justify-between items-start border-l-2 border-desert-ocre/30 pl-3 py-0.5">
                  <div className="flex-1 pr-3">
                    <h3 className="font-semibold text-text-primary text-[15px]">
                      Bac+4 en marketing et offshoring
                    </h3>
                    <p className="text-text-secondary text-xs">ENCG Settat</p>
                  </div>
                  <span className="text-desert-ocre text-xs font-medium bg-desert-ocre/10 px-2 py-0.5 rounded-full">2003-07</span>
                </div>
              </div>
            </div>

            {/* Expériences Professionnelles */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-morocco-blue to-deep-blue flex items-center justify-center shadow">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                  </svg>
                </div>
                <h2 className="font-heading text-xl text-morocco-blue">
                  Expériences Professionnelles
                </h2>
              </div>

              {/* Transcendence Work - Fondatrice */}
              <div className="mb-5 ml-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-text-primary text-[15px]">Fondatrice</h3>
                    <p className="text-golden-orange text-xs font-medium">Transcendence Work - Casablanca</p>
                  </div>
                  <span className="text-golden-orange text-xs font-medium bg-golden-orange/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                    Fev 2026
                  </span>
                </div>
                <ul className="text-text-secondary text-[13px] space-y-1 ml-0.5">
                  <li className="flex items-start gap-1.5">
                    <span className="text-golden-orange mt-1 text-[8px]">●</span>
                    <span>Accompagnement d&apos;organisations sur leurs enjeux humains : performance durable, QVT et transformation culturelle</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-golden-orange mt-1 text-[8px]">●</span>
                    <span>Coaching de dirigeants et managers en contexte exigeant</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-golden-orange mt-1 text-[8px]">●</span>
                    <span>Développement de solutions intégrées alliant leadership, présence et équilibre</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-golden-orange mt-1 text-[8px]">●</span>
                    <span>Conception et animation de programmes de yoga en entreprise et d&apos;ateliers de régulation du stress</span>
                  </li>
                </ul>
              </div>

              {/* GIZ - Cheffe du Service */}
              <div className="mb-5 ml-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-text-primary text-[15px]">Cheffe du Service Relations Humaines</h3>
                    <p className="text-morocco-blue text-xs font-medium">Agence allemande de coopération internationale (GIZ) - Rabat</p>
                  </div>
                  <span className="text-morocco-blue text-xs font-medium bg-morocco-blue/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                    2022 - 2025
                  </span>
                </div>
                <ul className="text-text-secondary text-[13px] space-y-1 ml-0.5">
                  <li className="flex items-start gap-1.5">
                    <span className="text-morocco-blue mt-1 text-[8px]">●</span>
                    <span>Conseil stratégique auprès de la direction sur la politique RH et son déploiement à l&apos;échelle nationale</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-morocco-blue mt-1 text-[8px]">●</span>
                    <span>Pilotage de la planification stratégique du développement des talents</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-morocco-blue mt-1 text-[8px]">●</span>
                    <span>Conduite de missions de réorganisation interne en contexte multiculturel</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-morocco-blue mt-1 text-[8px]">●</span>
                    <span>Structuration et formalisation des processus RH</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-morocco-blue mt-1 text-[8px]">●</span>
                    <span>Gestion des relations sociales et interface juridique</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-morocco-blue mt-1 text-[8px]">●</span>
                    <span>Coordination d&apos;audits internationaux et missions de contrôle interne</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-morocco-blue mt-1 text-[8px]">●</span>
                    <span>Participation à une mission internationale de réorganisation RH</span>
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
        <div className="flex">

          {/* Left Sidebar - Page 2 (Different content) */}
          <div className="w-[280px] bg-gradient-to-b from-morocco-blue via-morocco-blue to-deep-blue text-white flex-shrink-0 relative overflow-hidden flex flex-col pb-16">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-golden-orange/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-40 left-0 w-24 h-24 bg-mystic-mauve/10 rounded-full -translate-x-1/2" />

            {/* Photo */}
            <div className="p-5 pb-3 relative z-10">
              <div className="relative w-full aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="/images/Reel/hajar-cv.png"
                  alt="Hajar Habi"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Contact Section */}
            <div className="px-5 py-3 relative z-10">
              <h3 className="font-heading text-xl tracking-wider border-b border-golden-orange/50 pb-2 mb-3 text-golden-orange">
                Contact
              </h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <span className="text-white/90 pt-0.5 text-xs">hajar@transcendencework.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <span className="text-white/90 pt-0.5">+212 663 096 857</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <span className="text-white/90 pt-0.5">Casablanca, Maroc</span>
                </div>
              </div>
            </div>

            {/* Langues Section */}
            <div className="px-5 py-3 relative z-10">
              <h3 className="font-heading text-xl tracking-wider border-b border-golden-orange/50 pb-2 mb-3 text-golden-orange">
                Langues
              </h3>
              <div className="space-y-2 text-sm">
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

            {/* Domaines d'intervention */}
            <div className="px-5 py-3 relative z-10">
              <h3 className="font-heading text-lg tracking-wider border-b border-golden-orange/50 pb-2 mb-3 text-golden-orange">
                Domaines d&apos;intervention
              </h3>
              <div className="space-y-2 text-sm text-white/90">
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-golden-orange mt-1.5 flex-shrink-0" />
                  <span>La culture d&apos;entreprise</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-mystic-mauve-light mt-1.5 flex-shrink-0" />
                  <span>Le bien-être au travail</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-golden-orange mt-1.5 flex-shrink-0" />
                  <span>La prévention du burn-out</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-mystic-mauve-light mt-1.5 flex-shrink-0" />
                  <span>L&apos;engagement des employés</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-golden-orange mt-1.5 flex-shrink-0" />
                  <span>L&apos;organisation du travail</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-mystic-mauve-light mt-1.5 flex-shrink-0" />
                  <span>Les dynamiques d&apos;équipe</span>
                </div>
              </div>
            </div>

            {/* Centres d'intérêt */}
            <div className="px-5 py-3 relative z-10">
              <h3 className="font-heading text-xl tracking-wider border-b border-golden-orange/50 pb-2 mb-3 text-golden-orange">
                Centres d&apos;intérêt
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-white/90">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-golden-orange flex-shrink-0" />
                  <span>Lecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-mystic-mauve-light flex-shrink-0" />
                  <span>Voyage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-golden-orange flex-shrink-0" />
                  <span>Yoga</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-mystic-mauve-light flex-shrink-0" />
                  <span>Culture</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-golden-orange flex-shrink-0" />
                  <span>Écriture</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-mystic-mauve-light flex-shrink-0" />
                  <span>Méditation</span>
                </div>
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-grow" />

            {/* Logo at bottom */}
            <div className="px-5 py-5 relative z-10">
              <Image
                src="/images/logos/logo-white-cv.png"
                alt="Transcendence Work"
                width={180}
                height={42}
                className="opacity-90"
              />
            </div>

          </div>

          {/* Right Content - Page 2 */}
          <div className="flex-1 p-7 pb-12 bg-warm-white">
            {/* Continue Expériences */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-morocco-blue to-deep-blue flex items-center justify-center shadow">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                  </svg>
                </div>
                <h2 className="font-heading text-xl text-morocco-blue">
                  Expériences Professionnelles
                </h2>
              </div>

              {/* GIZ - Responsable développement RH */}
              <div className="mb-5 ml-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-text-primary text-[15px]">Responsable du développement RH</h3>
                    <p className="text-golden-orange text-xs font-medium">Agence allemande de coopération internationale (GIZ) - Rabat</p>
                  </div>
                  <span className="text-morocco-blue text-xs font-medium bg-morocco-blue/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                    2020 - 2022
                  </span>
                </div>
                <ul className="text-text-secondary text-[13px] space-y-1 ml-0.5">
                  <li className="flex items-start gap-1.5">
                    <span className="text-golden-orange mt-1 text-[8px]">●</span>
                    <span>Déploiement d&apos;une stratégie RH pluriannuelle et feuille de route de transformation</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-golden-orange mt-1 text-[8px]">●</span>
                    <span>Conception d&apos;un plan de développement des compétences à l&apos;échelle régionale</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-golden-orange mt-1 text-[8px]">●</span>
                    <span>Accompagnement de 17 pays d&apos;Afrique francophone sur des mesures RH structurantes</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-golden-orange mt-1 text-[8px]">●</span>
                    <span>Pilotage de projets de digitalisation des processus RH</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-golden-orange mt-1 text-[8px]">●</span>
                    <span>Animation d&apos;ateliers de gestion du changement</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-golden-orange mt-1 text-[8px]">●</span>
                    <span>Gestion de situations sensibles de résiliation de contrats en contexte de crise diplomatique</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-golden-orange mt-1 text-[8px]">●</span>
                    <span>Déploiement de programmes de mentorat et de développement des talents</span>
                  </li>
                </ul>
              </div>

              {/* CDG Capital */}
              <div className="mb-5 ml-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-text-primary text-[15px]">Responsable de développement RH</h3>
                    <p className="text-mystic-mauve text-xs font-medium">CDG Capital - Rabat</p>
                  </div>
                  <span className="text-mystic-mauve text-xs font-medium bg-mystic-mauve/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                    2014 - 2018
                  </span>
                </div>
                <ul className="text-text-secondary text-[13px] space-y-1 ml-0.5">
                  <li className="flex items-start gap-1.5">
                    <span className="text-mystic-mauve mt-1 text-[8px]">●</span>
                    <span>Contribution à la stratégie RH 2018–2022</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-mystic-mauve mt-1 text-[8px]">●</span>
                    <span>Représentation de la DRH au comité exécutif</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-mystic-mauve mt-1 text-[8px]">●</span>
                    <span>Diagnostic organisationnel et plans de succession</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-mystic-mauve mt-1 text-[8px]">●</span>
                    <span>Refonte des politiques de rémunération et classification</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-mystic-mauve mt-1 text-[8px]">●</span>
                    <span>Pilotage du plan de recrutement et ingénierie de formation</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-mystic-mauve mt-1 text-[8px]">●</span>
                    <span>Mise en place de systèmes d&apos;évaluation de la performance</span>
                  </li>
                </ul>
              </div>

              {/* DIORH */}
              <div className="mb-5 ml-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-text-primary text-[15px]">Consultante Formations</h3>
                    <p className="text-desert-ocre text-xs font-medium">DIORH - Casablanca</p>
                  </div>
                  <span className="text-desert-ocre text-xs font-medium bg-desert-ocre/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                    2008 - 2014
                  </span>
                </div>
                <ul className="text-text-secondary text-[13px] space-y-1 ml-0.5">
                  <li className="flex items-start gap-1.5">
                    <span className="text-desert-ocre mt-1 text-[8px]">●</span>
                    <span>Conception de programmes de formation sur mesure pour grands groupes et multinationales</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-desert-ocre mt-1 text-[8px]">●</span>
                    <span>Développement de parcours de coaching pour cadres dirigeants</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-desert-ocre mt-1 text-[8px]">●</span>
                    <span>Participation à des missions de team building et transformation managériale</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-desert-ocre mt-1 text-[8px]">●</span>
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
