'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Types for html2pdf library
interface Html2PdfOptions {
  margin?: number | number[];
  filename?: string;
  image?: { type?: string; quality?: number };
  html2canvas?: {
    scale?: number;
    useCORS?: boolean;
    logging?: boolean;
    allowTaint?: boolean;
  };
  jsPDF?: {
    unit?: string;
    format?: string | number[];
    orientation?: 'portrait' | 'landscape';
  };
  pagebreak?: { mode?: string | string[] };
}

interface Html2PdfInstance {
  set(options: Html2PdfOptions): Html2PdfInstance;
  from(element: HTMLElement | string): Html2PdfInstance;
  save(): Promise<void>;
}

interface WindowWithHtml2Pdf extends Window {
  html2pdf: () => Html2PdfInstance;
}

// Convert oklab/oklch color to RGB using canvas
const convertColorToRgb = (color: string): string => {
  if (!color || color === 'transparent' || color === 'inherit' || color === 'initial') {
    return color;
  }

  // Check if it's an oklab or oklch color
  if (!color.includes('oklab') && !color.includes('oklch') && !color.includes('color-mix')) {
    return color;
  }

  try {
    // Use canvas to convert color
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (!ctx) return color;

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const imageData = ctx.getImageData(0, 0, 1, 1).data;

    if (imageData[3] === 0) {
      return 'transparent';
    }

    if (imageData[3] < 255) {
      return `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, ${(imageData[3] / 255).toFixed(3)})`;
    }

    return `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;
  } catch {
    return color;
  }
};

// Pre-process element to convert all oklab colors to RGB
const convertColorsToRgb = (element: HTMLElement): Map<HTMLElement, Record<string, string>> => {
  const originalStyles = new Map<HTMLElement, Record<string, string>>();
  const colorProperties = [
    'color',
    'backgroundColor',
    'borderColor',
    'borderTopColor',
    'borderRightColor',
    'borderBottomColor',
    'borderLeftColor',
    'outlineColor',
    'textDecorationColor',
    'boxShadow',
  ];

  const processElement = (el: HTMLElement) => {
    const computed = window.getComputedStyle(el);
    const savedStyles: Record<string, string> = {};
    let hasChanges = false;

    colorProperties.forEach(prop => {
      const value = computed.getPropertyValue(prop.replace(/([A-Z])/g, '-$1').toLowerCase());
      if (value && (value.includes('oklab') || value.includes('oklch') || value.includes('color-mix'))) {
        const converted = convertColorToRgb(value);
        if (converted !== value) {
          savedStyles[prop] = el.style.getPropertyValue(prop.replace(/([A-Z])/g, '-$1').toLowerCase());
          el.style.setProperty(prop.replace(/([A-Z])/g, '-$1').toLowerCase(), converted, 'important');
          hasChanges = true;
        }
      }
    });

    // Handle background-image gradients
    const bgImage = computed.backgroundImage;
    if (bgImage && bgImage !== 'none' && (bgImage.includes('oklab') || bgImage.includes('oklch'))) {
      savedStyles['backgroundImage'] = el.style.backgroundImage;
      // For gradients, we need to convert each color stop
      // This is complex, so we'll just try to set a solid background instead
      const bgColor = computed.backgroundColor;
      if (bgColor) {
        el.style.setProperty('background-image', 'none', 'important');
        hasChanges = true;
      }
    }

    if (hasChanges) {
      originalStyles.set(el, savedStyles);
    }

    // Process children
    Array.from(el.children).forEach(child => {
      if (child instanceof HTMLElement) {
        processElement(child);
      }
    });
  };

  processElement(element);
  return originalStyles;
};

// Restore original styles after PDF generation
const restoreOriginalStyles = (originalStyles: Map<HTMLElement, Record<string, string>>) => {
  originalStyles.forEach((styles, el) => {
    Object.entries(styles).forEach(([prop, value]) => {
      const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
      if (value) {
        el.style.setProperty(cssProp, value);
      } else {
        el.style.removeProperty(cssProp);
      }
    });
  });
};

export default function CorporateBrochure() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Load html2pdf library via script tag (more reliable for UMD modules)
  const loadHtml2Pdf = (): Promise<() => Html2PdfInstance> => {
    return new Promise((resolve, reject) => {
      const win = window as unknown as WindowWithHtml2Pdf;

      // Check if already loaded
      if (typeof win.html2pdf === 'function') {
        resolve(win.html2pdf);
        return;
      }

      // Load the script
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.2/html2pdf.bundle.min.js';
      script.async = true;
      script.onload = () => {
        const winLoaded = window as unknown as WindowWithHtml2Pdf;
        if (typeof winLoaded.html2pdf === 'function') {
          resolve(winLoaded.html2pdf);
        } else {
          reject(new Error('html2pdf not loaded'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load html2pdf'));
      document.head.appendChild(script);
    });
  };

  const generatePDF = async () => {
    if (!contentRef.current) return;

    setIsGenerating(true);

    let originalStyles: Map<HTMLElement, Record<string, string>> | null = null;
    const noPrintElements: NodeListOf<Element> | null = null;

    try {
      console.log('Starting PDF generation...');

      // Load html2pdf via script tag (reliable approach for UMD)
      const html2pdf = await loadHtml2Pdf();
      console.log('html2pdf loaded successfully');

      const element = contentRef.current;

      // Hide no-print elements temporarily via CSS
      const noPrintEls = element.querySelectorAll('.no-print');
      noPrintEls.forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });

      // Convert all oklab/oklch colors to RGB for html2canvas compatibility
      console.log('Converting colors to RGB...');
      originalStyles = convertColorsToRgb(element);
      console.log(`Converted colors for ${originalStyles.size} elements`);

      const opt = {
        margin: [10, 15, 10, 15],
        filename: 'Transcendence-Work-Offre-Entreprise.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          allowTaint: true,
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait' as const,
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      };

      console.log('Generating PDF...');
      await html2pdf().set(opt).from(element).save();
      console.log('PDF generated successfully');

      // Restore original styles
      if (originalStyles) {
        restoreOriginalStyles(originalStyles);
      }

      // Restore no-print elements
      noPrintEls.forEach(el => {
        (el as HTMLElement).style.display = '';
      });
    } catch (error) {
      console.error('Error generating PDF:', error);

      // Restore original styles on error
      if (originalStyles) {
        restoreOriginalStyles(originalStyles);
      }

      // Restore no-print elements on error
      if (contentRef.current) {
        const noPrintEls = contentRef.current.querySelectorAll('.no-print');
        noPrintEls.forEach(el => {
          (el as HTMLElement).style.display = '';
        });
      }

      // Show more detailed error message
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Erreur lors de la génération du PDF: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div ref={contentRef} className="min-h-screen bg-white print-container">
      {/* Print-friendly styles */}
      <style jsx global>{`
        @media print {
          /* Preserve colors */
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          /* Hide non-printable elements */
          .no-print { display: none !important; }

          /* Remove all page breaks - single continuous page */
          .print-section { print-section-before: auto !important; }
          * {
            print-section-inside: avoid;
            print-section-before: auto !important;
            print-section-after: auto !important;
          }

          /* Page setup - no browser header/footer, with margins */
          @page {
            size: A4;
            margin: 15mm 20mm;
          }

          /* Remove default browser margins on body */
          html, body {
            margin: 0 !important;
            padding: 0 !important;
          }

          /* Scale content to fit better */
          .print-container {
            width: 100% !important;
            max-width: 100% !important;
          }

          /* Ensure links are styled and clickable */
          a {
            text-decoration: underline;
            color: inherit;
          }

          /* Reduce some spacing for print */
          section {
            padding-top: 1.5rem !important;
            padding-bottom: 1.5rem !important;
          }

          header {
            padding-top: 1.5rem !important;
            padding-bottom: 1.5rem !important;
          }
        }
      `}</style>

      {/* Floating Action Bar - Not printed */}
      <div className="no-print fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className="bg-morocco-blue text-white px-6 py-3 rounded-full shadow-lg hover:bg-morocco-blue/90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Génération...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Télécharger PDF
            </>
          )}
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
          <div className="flex items-end gap-3 mb-8">
            <Image
              src="/images/logos/logo-white-full.png"
              alt="Transcendence Work"
              width={240}
              height={70}
              className="h-auto"
            />
            <p className="text-white/60 text-xs font-medium pb-1">par Hajar Habi</p>
          </div>

          <div className="space-y-4">
            <p className="text-golden-orange font-medium tracking-wide uppercase text-sm">
              Accompagnement des Organisations
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Offre Entreprise
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
              Transformation organisationnelle, leadership conscient et bien-être au travail.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-lg md:text-xl font-bold text-golden-orange">≃20 ans</p>
              <p className="text-xs text-white/70">Expérience corporate</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-lg md:text-xl font-bold text-golden-orange">Coach</p>
              <p className="text-xs text-white/70">Certifiée Transformance Pro</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-lg md:text-xl font-bold text-golden-orange">1750<span className="text-sm">hrs</span></p>
              <p className="text-xs text-white/70">Prof yoga certifiée</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-lg md:text-xl font-bold text-golden-orange">FR/EN</p>
              <p className="text-xs text-white/70">Interventions bilingues</p>
            </div>
          </div>
        </div>
      </header>

      {/* Sommaire */}
      <section className="py-12 px-8 bg-dune-beige/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-xl font-bold text-deep-blue mb-6 text-center">Notre Offre</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="#transformation" className="bg-morocco-blue rounded-xl p-4 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <p className="font-semibold text-white text-sm">Transformation & Cohésion</p>
              <p className="text-xs text-white/70 mt-1">Accompagnement du changement</p>
            </a>
            <a href="#leadership" className="bg-golden-orange rounded-xl p-4 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <p className="font-semibold text-white text-sm">Leadership Conscient</p>
              <p className="text-xs text-white/70 mt-1">Coaching dirigeants & managers</p>
            </a>
            <a href="#yoga" className="bg-gradient-to-r from-golden-orange to-morocco-blue rounded-xl p-4 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <p className="font-semibold text-white text-sm">Corporate Yoga</p>
              <p className="text-xs text-white/70 mt-1">Bien-être au travail</p>
            </a>
          </div>
        </div>
      </section>

      {/* Section 1: Transformation & Cohésion */}
      <section id="transformation" className="py-16 px-8 print-section">
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
      <section id="leadership" className="py-16 px-8 bg-dune-beige/30 print-section">
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

      {/* Section: Corporate Yoga */}
      <section id="yoga" className="py-16 px-8 print-section">
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
          <div className="print-section">
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
      <section className="py-16 px-8 print-section">
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
                src="/images/Reel/hajar-professional.jpg"
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
