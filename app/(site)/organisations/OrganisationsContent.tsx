'use client';

import { useState } from 'react';
import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import { useTranslation } from '@/hooks/useTranslation';

// Accordion component for benefits
function BenefitsAccordion({
  benefits,
  accentColor = 'golden-orange'
}: {
  benefits: string[];
  accentColor?: 'golden-orange' | 'morocco-blue';
}) {
  const [isOpen, setIsOpen] = useState(false);

  const colorClasses = {
    'golden-orange': {
      text: 'text-golden-orange',
      hover: 'hover:bg-golden-orange/5',
    },
    'morocco-blue': {
      text: 'text-morocco-blue',
      hover: 'hover:bg-morocco-blue/5',
    },
  };

  return (
    <div className="mt-4 border-t border-soft-gray/30">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full pt-3 pb-2 flex items-center justify-between text-sm font-medium text-deep-blue ${colorClasses[accentColor].hover} rounded transition-colors`}
      >
        <span>Bénéfices pour l'entreprise</span>
        <svg
          className={`w-4 h-4 ${colorClasses[accentColor].text} transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
        <ul className="space-y-2 pb-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2 text-text-secondary text-xs">
              <svg className={`w-3 h-3 ${colorClasses[accentColor].text} mt-0.5 flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function OrganisationsContent() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    size: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    console.log('Submitting form data:', formData);

    try {
      const response = await fetch('/api/organisations/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log('Response:', { status: response.status, data });

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          organization: '',
          size: '',
          service: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Une erreur est survenue');
        console.error('Form submission error:', data);
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Erreur réseau. Veuillez réessayer.');
      console.error('Network error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Hero
        subtitle={t('organisations.hero.subtitle')}
        title={t('organisations.hero.title')}
        description={t('organisations.hero.description')}
        primaryCTA={{
          text: t('organisations.hero.primaryCTA'),
          href: '#devis',
        }}
        secondaryCTA={{
          text: t('organisations.hero.secondaryCTA'),
          href: '#programmes',
        }}
        theme="corporate"
        compact
        splitLayout
        splitImage="/images/heroes/organisations-coaching-hero.jpg"
      />

      {/* Services pour Organisations */}
      <Section
        id="programmes"
        subtitle={t('organisations.services.subtitle')}
        title={t('organisations.services.title')}
        description={t('organisations.services.description')}
        background="beige"
        centered
        accentColor="corporate"
        afterHero
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <Card hover padding="lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-morocco-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-morocco-blue"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-deep-blue mb-4">
                {t('organisations.services.transformation.title')}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                {t('organisations.services.transformation.description')}
              </p>
              <ul className="text-sm text-text-secondary space-y-2 text-left">
                <li>• {t('organisations.services.transformation.features.0')}</li>
                <li>• {t('organisations.services.transformation.features.1')}</li>
                <li>• {t('organisations.services.transformation.features.2')}</li>
              </ul>
            </div>
          </Card>

          <Card hover padding="lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-golden-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-golden-orange"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-deep-blue mb-4">
                {t('organisations.services.leadership.title')}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                {t('organisations.services.leadership.description')}
              </p>
              <ul className="text-sm text-text-secondary space-y-2 text-left">
                <li>• {t('organisations.services.leadership.features.0')}</li>
                <li>• {t('organisations.services.leadership.features.1')}</li>
                <li>• {t('organisations.services.leadership.features.2')}</li>
              </ul>
            </div>
          </Card>

          <Card hover padding="lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-morocco-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-morocco-blue"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-deep-blue mb-4">
                {t('organisations.services.retreats.title')}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                {t('organisations.services.retreats.description')}
              </p>
              <ul className="text-sm text-text-secondary space-y-2 text-left">
                <li>• {t('organisations.services.retreats.features.0')}</li>
                <li>• {t('organisations.services.retreats.features.1')}</li>
                <li>• {t('organisations.services.retreats.features.2')}</li>
              </ul>
            </div>
          </Card>
        </div>
      </Section>

      {/* Corporate Yoga Section */}
      <Section
        id="corporate-yoga"
        subtitle="Bien-être au travail"
        title="Corporate Yoga"
        description="Des programmes de yoga adaptés au monde professionnel pour améliorer le bien-être, la performance et la cohésion de vos équipes."
        centered
        accentColor="yoga"
      >
        {/* Événements Ponctuels */}
        <div className="mb-16">
          <h3 className="font-heading text-xl font-bold text-deep-blue mb-2 text-center">
            Événements Ponctuels
          </h3>
          <p className="text-text-secondary text-center mb-8 max-w-2xl mx-auto">
            Journées ou demi-journées pour des temps forts : séminaires, retraites, team building
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Corporate Relaxation Day */}
            <Card hover padding="lg" className="border border-golden-orange/20 shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-golden-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading text-lg font-bold text-deep-blue">
                    Corporate Relaxation Day
                  </h4>
                  <p className="text-sm text-golden-orange font-medium">
                    Reconnexion, détente & cohésion
                  </p>
                </div>
              </div>
              <p className="text-text-secondary text-sm mb-4">
                Une pause régénérante pour relâcher les tensions et renforcer la cohésion collective.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-text-secondary">
                  <svg className="w-4 h-4 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>1 journée</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <svg className="w-4 h-4 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Hatha Yoga • Nada Yoga • Méditation</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-soft-gray/30">
                <p className="text-xs text-text-secondary">
                  <strong>Idéal pour :</strong> Séminaires, retraites, clôture de projets
                </p>
              </div>

              <BenefitsAccordion
                accentColor="golden-orange"
                benefits={[
                  "Réduction immédiate du stress",
                  "Amélioration du climat relationnel",
                  "Énergie collective apaisée et recentrée",
                  "Expérience marquante et fédératrice"
                ]}
              />
            </Card>

            {/* Corporate Achievement */}
            <Card hover padding="lg" className="border border-morocco-blue/20 shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-morocco-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-morocco-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading text-lg font-bold text-deep-blue">
                    Corporate Achievement
                  </h4>
                  <p className="text-sm text-morocco-blue font-medium">
                    Clarté mentale, focus & énergie
                  </p>
                </div>
              </div>
              <p className="text-text-secondary text-sm mb-4">
                Soutenir la performance collective par une meilleure gestion de l'énergie et du mental.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-text-secondary">
                  <svg className="w-4 h-4 text-morocco-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>1 journée ou 2 demi-journées</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <svg className="w-4 h-4 text-morocco-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Hatha Yoga • Pranayama • Méditation</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-soft-gray/30">
                <p className="text-xs text-text-secondary">
                  <strong>Idéal pour :</strong> Managers, leadership teams, périodes de transformation
                </p>
              </div>

              <BenefitsAccordion
                accentColor="morocco-blue"
                benefits={[
                  "Meilleure clarté mentale et capacité de décision",
                  "Renforcement de la stabilité émotionnelle",
                  "Performance plus alignée et durable",
                  "Prévention de l'épuisement professionnel"
                ]}
              />
            </Card>
          </div>
        </div>

        {/* Programmes Récurrents */}
        <div className="mb-12">
          <h3 className="font-heading text-xl font-bold text-deep-blue mb-2 text-center">
            Programmes Récurrents
          </h3>
          <p className="text-text-secondary text-center mb-8 max-w-2xl mx-auto">
            Accompagnement durable pour tous les collaborateurs
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Stress Management Program */}
            <Card hover padding="lg" className="border border-mystic-mauve/20 shadow-lg">
              <div className="text-center mb-4">
                <div className="w-14 h-14 bg-mystic-mauve/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-mystic-mauve" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-heading text-lg font-bold text-deep-blue">
                  Stress Management
                </h4>
                <p className="text-sm text-mystic-mauve font-medium mb-3">
                  Prévenir le stress, renforcer la résilience
                </p>
              </div>

              <div className="space-y-4 text-sm">
                {/* Pour qui */}
                <div>
                  <p className="font-medium text-deep-blue mb-1">Pour qui</p>
                  <p className="text-text-secondary text-xs">
                    Tous les collaborateurs • Démarche QVT • Contextes de transformation
                  </p>
                </div>

                {/* Format */}
                <div className="flex items-center gap-2 text-text-secondary">
                  <svg className="w-4 h-4 text-mystic-mauve" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">24 ou 36 sessions • 1h/session</span>
                </div>

                {/* Contenu */}
                <div>
                  <p className="font-medium text-deep-blue mb-1">Contenu</p>
                  <p className="text-text-secondary text-xs">
                    Hatha Yoga • Pranayama • Nada Yoga • Méditations guidées
                  </p>
                </div>

                {/* Bénéfices */}
                <div className="pt-3 border-t border-soft-gray/30">
                  <p className="font-medium text-deep-blue mb-2">Bénéfices</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-text-secondary text-xs">
                      <svg className="w-3 h-3 text-mystic-mauve mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Diminution du stress chronique</span>
                    </li>
                    <li className="flex items-start gap-2 text-text-secondary text-xs">
                      <svg className="w-3 h-3 text-mystic-mauve mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Meilleure régulation émotionnelle</span>
                    </li>
                    <li className="flex items-start gap-2 text-text-secondary text-xs">
                      <svg className="w-3 h-3 text-mystic-mauve mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Engagement et bien-être durable</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Health & Vitality Program */}
            <Card hover padding="lg" className="border border-golden-orange/20 shadow-lg">
              <div className="text-center mb-4">
                <div className="w-14 h-14 bg-golden-orange/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h4 className="font-heading text-lg font-bold text-deep-blue">
                  Health & Vitality
                </h4>
                <p className="text-sm text-golden-orange font-medium mb-3">
                  Énergie, posture & équilibre
                </p>
              </div>

              <div className="space-y-4 text-sm">
                {/* Pour qui */}
                <div>
                  <p className="font-medium text-deep-blue mb-1">Pour qui</p>
                  <p className="text-text-secondary text-xs">
                    Travail de bureau • Prévention santé • Tous niveaux
                  </p>
                </div>

                {/* Format */}
                <div className="flex items-center gap-2 text-text-secondary">
                  <svg className="w-4 h-4 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">24 ou 36 sessions • 1h/session</span>
                </div>

                {/* Contenu */}
                <div>
                  <p className="font-medium text-deep-blue mb-1">Contenu</p>
                  <p className="text-text-secondary text-xs">
                    Hatha Yoga • Méditations guidées • Nada Yoga • Pranayama
                  </p>
                </div>

                {/* Bénéfices */}
                <div className="pt-3 border-t border-soft-gray/30">
                  <p className="font-medium text-deep-blue mb-2">Bénéfices</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-text-secondary text-xs">
                      <svg className="w-3 h-3 text-golden-orange mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Réduction des tensions physiques</span>
                    </li>
                    <li className="flex items-start gap-2 text-text-secondary text-xs">
                      <svg className="w-3 h-3 text-golden-orange mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Amélioration de l'énergie et vitalité</span>
                    </li>
                    <li className="flex items-start gap-2 text-text-secondary text-xs">
                      <svg className="w-3 h-3 text-golden-orange mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Prévention troubles sédentarité</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Online Well-being Program */}
            <Card hover padding="lg" className="border border-morocco-blue/20 shadow-lg">
              <div className="text-center mb-4">
                <div className="w-14 h-14 bg-morocco-blue/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-morocco-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-heading text-lg font-bold text-deep-blue">
                  Online Well-being
                </h4>
                <p className="text-sm text-morocco-blue font-medium mb-3">
                  Santé globale & immunité
                </p>
              </div>

              <div className="space-y-4 text-sm">
                {/* Pour qui */}
                <div>
                  <p className="font-medium text-deep-blue mb-1">Pour qui</p>
                  <p className="text-text-secondary text-xs">
                    Équipes hybrides • Multi-sites • Format flexible à distance
                  </p>
                </div>

                {/* Format */}
                <div className="flex items-center gap-2 text-text-secondary">
                  <svg className="w-4 h-4 text-morocco-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">16 sessions • 45min/session</span>
                </div>

                {/* Contenu */}
                <div>
                  <p className="font-medium text-deep-blue mb-1">Contenu</p>
                  <p className="text-text-secondary text-xs">
                    Yoga bien-être • Système immunitaire • Clarté mentale • Hygiène de vie yogique
                  </p>
                </div>

                {/* Bénéfices */}
                <div className="pt-3 border-t border-soft-gray/30">
                  <p className="font-medium text-deep-blue mb-2">Bénéfices</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-text-secondary text-xs">
                      <svg className="w-3 h-3 text-morocco-blue mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Renforcement vitalité et prévention</span>
                    </li>
                    <li className="flex items-start gap-2 text-text-secondary text-xs">
                      <svg className="w-3 h-3 text-morocco-blue mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Réduction de la fatigue chronique</span>
                    </li>
                    <li className="flex items-start gap-2 text-text-secondary text-xs">
                      <svg className="w-3 h-3 text-morocco-blue mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Habitudes de vie saines</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Ce qui fait la différence */}
        <div className="bg-gradient-to-r from-golden-orange/5 to-morocco-blue/5 rounded-2xl p-8 max-w-3xl mx-auto">
          <h4 className="font-heading text-lg font-bold text-deep-blue mb-4 text-center">
            Ce qui fait la différence
          </h4>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-golden-orange flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-text-secondary">
                Programmes conçus par une <strong className="text-deep-blue">ex-DRH, coach certifiée et professeure de Hatha Yoga Classique</strong>
              </span>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-golden-orange flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-text-secondary">
                Approche <strong className="text-deep-blue">accessible et adaptée</strong> au monde professionnel
              </span>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-golden-orange flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-text-secondary">
                Interventions possibles en <strong className="text-deep-blue">français et anglais</strong>
              </span>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-golden-orange flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-text-secondary">
                Formats <strong className="text-deep-blue">personnalisables</strong> selon vos enjeux
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* Formulaire de Devis */}
      <Section
        id="devis"
        subtitle={t('organisations.quote.subtitle')}
        title={t('organisations.quote.title')}
        description={t('organisations.quote.description')}
        centered
        accentColor="corporate"
      >
        <div className="max-w-3xl mx-auto">
          <Card padding="lg">
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">
                  ✓ Votre demande a été envoyée avec succès ! Nous vous répondrons dans les plus brefs délais.
                </p>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-medium">
                  ✗ {errorMessage}
                </p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <FormInput
                  label={t('organisations.form.firstName')}
                  name="firstName"
                  type="text"
                  placeholder={t('organisations.form.firstNamePlaceholder')}
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <FormInput
                  label={t('organisations.form.lastName')}
                  name="lastName"
                  type="text"
                  placeholder={t('organisations.form.lastNamePlaceholder')}
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <FormInput
                label={t('organisations.form.email')}
                name="email"
                type="email"
                placeholder={t('organisations.form.emailPlaceholder')}
                value={formData.email}
                onChange={handleChange}
                required
              />

              <FormInput
                label={t('organisations.form.phone')}
                name="phone"
                type="tel"
                placeholder="+212 6 00 00 00 00"
                value={formData.phone}
                onChange={handleChange}
              />

              <FormInput
                label={t('organisations.form.organization')}
                name="organization"
                type="text"
                placeholder={t('organisations.form.organizationPlaceholder')}
                value={formData.organization}
                onChange={handleChange}
                required
              />

              <FormInput
                label={t('organisations.form.size')}
                name="size"
                type="select"
                value={formData.size}
                onChange={handleChange}
                required
                options={[
                  { value: '1-10', label: t('organisations.form.sizeOptions.0') },
                  { value: '11-50', label: t('organisations.form.sizeOptions.1') },
                  { value: '51-200', label: t('organisations.form.sizeOptions.2') },
                  { value: '201-500', label: t('organisations.form.sizeOptions.3') },
                  { value: '500+', label: t('organisations.form.sizeOptions.4') },
                ]}
              />

              <FormInput
                label={t('organisations.form.service')}
                name="service"
                type="select"
                value={formData.service}
                onChange={handleChange}
                required
                options={[
                  {
                    value: 'transformation',
                    label: t('organisations.form.serviceOptions.0'),
                  },
                  { value: 'leadership', label: t('organisations.form.serviceOptions.1') },
                  { value: 'retraite', label: t('organisations.form.serviceOptions.2') },
                  { value: 'facilitation', label: t('organisations.form.serviceOptions.3') },
                  { value: 'yoga-corporate', label: t('organisations.form.serviceOptions.4') },
                  { value: 'autre', label: t('organisations.form.serviceOptions.5') },
                ]}
              />

              <FormInput
                label={t('organisations.form.message')}
                name="message"
                type="textarea"
                placeholder={t('organisations.form.messagePlaceholder')}
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
              />

              <Button
                variant="primary"
                size="lg"
                fullWidth
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Envoi en cours...' : t('organisations.form.submit')}
              </Button>

              <p className="text-sm text-text-secondary text-center">
                {t('organisations.form.responseTime')}
              </p>
            </form>
          </Card>
        </div>
      </Section>

      {/* CTA */}
      <Section background="sky-blue-light" padding="md" centered>
        <div className="max-w-3xl mx-auto">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-deep-blue mb-4">
            {t('organisations.cta.title')}
          </h3>
          <p className="text-text-secondary mb-6">
            {t('organisations.cta.description')}
          </p>
          <Button variant="primary" size="lg" href="/contact">
            {t('organisations.cta.button')}
          </Button>
        </div>
      </Section>
    </>
  );
}
