import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        subtitle="Hajar Habi"
        title="Transformation Authentique & Durable"
        description="Coaching organisationnel ancré dans les pratiques yogiques traditionnelles. Une approche unique qui allie excellence professionnelle et profondeur spirituelle pour accompagner les organisations et les individus à redéfinir le succès selon leurs propres termes."
        primaryCTA={{
          text: 'Découvrir mes services',
          href: '#services',
        }}
        secondaryCTA={{
          text: 'Réserver une session',
          href: '/contact',
        }}
      />

      {/* Services Section */}
      <Section
        id="services"
        subtitle="Mes Services"
        title="Deux Chemins, Une Même Vision"
        description="Que vous soyez une organisation cherchant à se transformer ou un individu en quête d'évolution, mon approche s'adapte à votre réalité tout en restant ancrée dans l'authenticité."
        background="beige"
        centered
      >
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Pour les Organisations */}
          <Card hover padding="lg" className="group">
            <div className="mb-6">
              <div className="w-16 h-16 bg-terracotta/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-terracotta/20 transition-colors">
                <svg
                  className="w-8 h-8 text-terracotta"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-deep-blue mb-4">
                Pour les Organisations
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                Accompagnement des organisations dans leur transformation. Culture
                d'entreprise, leadership conscient, et performance durable à travers
                des pratiques éprouvées.
              </p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-terracotta mt-1 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-text-secondary">
                  Facilitation & transformation organisationnelle
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-terracotta mt-1 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-text-secondary">
                  Leadership & développement des équipes
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-terracotta mt-1 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-text-secondary">
                  Programmes sur-mesure & retraites corporates
                </span>
              </li>
            </ul>
            <Button variant="outline" href="/organisations" fullWidth>
              En savoir plus
            </Button>
          </Card>

          {/* Pour les Individus */}
          <Card hover padding="lg" className="group">
            <div className="mb-6">
              <div className="w-16 h-16 bg-sage/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-sage/30 transition-colors">
                <svg
                  className="w-8 h-8 text-sage"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-deep-blue mb-4">
                Pour les Individus
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                Coaching personnel et pratiques yogiques traditionnelles pour une
                transformation profonde. Un espace pour explorer, grandir,
                aligner vos valeurs avec votre vie professionnelle, et
                vous ancrer dans votre authenticité.
              </p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-sage mt-1 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-text-secondary">
                  Coaching individuel personnalisé
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-sage mt-1 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-text-secondary">
                  Pratiques yogiques authentiques
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-sage mt-1 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-text-secondary">
                  Retraites transformationnelles au Maroc
                </span>
              </li>
            </ul>
            <Button variant="outline" href="/coaching" fullWidth>
              Explorer le coaching
            </Button>
          </Card>
        </div>
      </Section>

      {/* Approche Section */}
      <Section
        subtitle="Mon Approche"
        title="L'Alliance de Deux Mondes"
        description="Mon parcours unique me permet d'accompagner les transformations avec une vision à la fois pragmatique et profonde, ancrée dans l'action et la présence."
        centered
      >
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-terracotta"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-deep-blue mb-3">
              Excellence Professionnelle
            </h3>
            <p className="text-text-secondary leading-relaxed">
              Formation en coaching organisationnel et facilitation, expérience
              auprès d'entreprises internationales.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-sage"
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
            <h3 className="font-heading text-xl font-bold text-deep-blue mb-3">
              Sagesse Ancestrale
            </h3>
            <p className="text-text-secondary leading-relaxed">
              Pratique approfondie du yoga traditionnel, méditation et philosophies
              orientales intégrées à l'accompagnement.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-morocco-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-morocco-blue"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-deep-blue mb-3">
              Authenticité Marocaine
            </h3>
            <p className="text-text-secondary leading-relaxed">
              Enracinée dans la richesse culturelle du Maroc, une hospitalité
              chaleureuse et un lien profond avec la terre.
            </p>
          </div>
        </div>
      </Section>

      {/* Formations & Expertise Section */}
      <Section
        subtitle="Formations & Expertise"
        title="Une Double Excellence Rare"
        description="Des certifications d'excellence internationale et 20 ans d'expérience terrain pour un accompagnement de la plus haute qualité."
        background="beige"
        centered
      >
        <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
          <Card padding="lg" className="text-center">
            <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-terracotta"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-deep-blue mb-3">
              Coach Certifiée
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              <strong className="text-deep-blue">Coach & Team</strong>
              <br />
              2 ans de formation (180h)
              <br />
              Accréditation EMCC
            </p>
            <p className="text-xs text-text-secondary">
              Standard international du coaching professionnel
            </p>
          </Card>

          <Card padding="lg" className="text-center">
            <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-sage"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-deep-blue mb-3">
              Professeure de Yoga
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              <strong className="text-deep-blue">Isha Foundation</strong>
              <br />
              Classical Hatha Yoga
              <br />
              1750h (21 semaines, Inde)
            </p>
            <p className="text-xs text-text-secondary">
              Tradition authentique avec Sadhguru
            </p>
          </Card>

          <Card padding="lg" className="text-center">
            <div className="w-16 h-16 bg-morocco-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
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
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-deep-blue mb-3">
              20 Ans d'Expérience
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Transformation organisationnelle
              <br />
              Stratégie d'entreprise
              <br />
              Ressources Humaines
            </p>
            <p className="text-xs text-text-secondary">
              Expérience auprès d'entreprises internationales
            </p>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="md" href="/expertise">
            Découvrir mon parcours complet
          </Button>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="sage" padding="lg" centered>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep-blue mb-6">
            Prêt·e à Commencer Votre Transformation ?
          </h2>
          <p className="text-lg text-text-secondary mb-8 leading-relaxed">
            Que ce soit pour accompagner votre organisation ou pour votre parcours
            personnel, réservons un moment d'échange pour explorer comment nous
            pouvons travailler ensemble.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/contact">
              Réserver une session découverte
            </Button>
            <Button variant="outline" size="lg" href="/programmes">
              Voir les programmes
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
