import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Card from '@/components/ui/Card';

export default function ExpertisePage() {
  return (
    <>
      <Hero
        subtitle="Parcours & Expertise"
        title="Une Alliance Rare au Service de Votre Transformation"
        description="Découvrez le parcours qui me permet d'accompagner les organisations et les individus avec une approche unique, alliant excellence professionnelle et profondeur spirituelle."
        primaryCTA={{
          text: 'Me contacter',
          href: '/contact',
        }}
        centered
      />

      {/* Histoire */}
      <Section
        subtitle="Mon Histoire"
        title="L'Alliance de Deux Mondes"
        background="beige"
        centered
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Mon parcours incarne une alliance rare : celle du monde
            organisationnel pragmatique et du monde contemplatif profond.
          </p>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Pendant 20 ans, j'ai accompagné des organisations internationales dans
            leur transformation stratégique et le développement de leurs équipes.
            En parallèle, j'ai approfondi ma pratique et ma compréhension du yoga
            traditionnel et des philosophies contemplatives.
          </p>
          <p className="text-lg text-text-secondary leading-relaxed">
            Cette double expertise n'est pas un positionnement marketing. C'est qui
            je suis. Et c'est ce qui me permet d'accompagner les transformations
            avec une vision à la fois pragmatique et profonde, ancrée dans l'action
            et la présence.
          </p>
        </div>
      </Section>

      {/* Certifications & Formations */}
      <Section
        subtitle="Certifications & Formations"
        title="Des Formations d'Excellence Internationale"
      >
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Coach & Team */}
          <Card padding="lg">
            <div className="flex items-start mb-6">
              <div className="w-16 h-16 bg-terracotta/10 rounded-xl flex items-center justify-center flex-shrink-0 mr-6">
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
              <div>
                <h3 className="font-heading text-2xl font-bold text-deep-blue mb-2">
                  Coach Professionnelle Certifiée
                </h3>
                <p className="text-terracotta font-semibold mb-4">
                  Coach & Team - Accréditation EMCC
                </p>
              </div>
            </div>

            <div className="space-y-4 text-text-secondary">
              <div>
                <h4 className="font-semibold text-deep-blue mb-2">Formation</h4>
                <ul className="space-y-2 text-sm">
                  <li>• 2 ans de formation intensive (180 heures)</li>
                  <li>
                    • Méthodologie Coach & Team (école pionnière depuis 1988)
                  </li>
                  <li>• Accréditation EMCC (European Mentoring & Coaching Council)</li>
                  <li>• Standard européen du coaching professionnel</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-deep-blue mb-2">Expertise</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Coaching individuel et de carrière</li>
                  <li>• Coaching d'équipe et facilitation</li>
                  <li>• Accompagnement des dirigeants</li>
                  <li>• Transformation organisationnelle</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Isha Foundation */}
          <Card padding="lg">
            <div className="flex items-start mb-6">
              <div className="w-16 h-16 bg-sage/20 rounded-xl flex items-center justify-center flex-shrink-0 mr-6">
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
              <div>
                <h3 className="font-heading text-2xl font-bold text-deep-blue mb-2">
                  Professeure de Yoga Certifiée
                </h3>
                <p className="text-sage font-semibold mb-4">
                  Isha Foundation - Classical Hatha Yoga
                </p>
              </div>
            </div>

            <div className="space-y-4 text-text-secondary">
              <div>
                <h4 className="font-semibold text-deep-blue mb-2">Formation</h4>
                <ul className="space-y-2 text-sm">
                  <li>• 21 semaines résidentielles en Inde (1750 heures)</li>
                  <li>• Isha Yoga Center, Coimbatore, Tamil Nadu</li>
                  <li>• Programme conçu par Sadhguru</li>
                  <li>• Classical Hatha Yoga (tradition authentique)</li>
                  <li>
                    • Membre d'une communauté mondiale (1800 enseignants, 84 pays)
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-deep-blue mb-2">
                  Enseignements
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>• Asanas, Pranayama, Kriyas, Bandhas</li>
                  <li>• Méditation & philosophie yogique</li>
                  <li>• Mantra Yoga & Nada Yoga</li>
                  <li>• 48+ modules d'enseignement maîtrisés</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Expérience Professionnelle */}
      <Section
        subtitle="Expérience"
        title="20 Ans au Service des Organisations"
        background="beige"
        centered
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-text-secondary leading-relaxed mb-12">
            Deux décennies d'expérience auprès d'organisations internationales dans
            les domaines de la transformation, de la stratégie et des ressources
            humaines.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-deep-blue mb-2">
                Transformation Organisationnelle
              </h4>
              <p className="text-sm text-text-secondary">
                Accompagnement de projets de transformation culturelle et
                structurelle dans des contextes complexes
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-deep-blue mb-2">
                Stratégie d'Entreprise
              </h4>
              <p className="text-sm text-text-secondary">
                Participation à l'élaboration et au déploiement de stratégies
                organisationnelles alignées avec les enjeux business
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-morocco-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-deep-blue mb-2">
                Ressources Humaines
              </h4>
              <p className="text-sm text-text-secondary">
                Développement des talents, leadership, gestion du changement et
                cohésion d'équipe
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Philosophie */}
      <Section
        subtitle="Ma Philosophie"
        title="Pourquoi Cette Alliance Unique"
        centered
      >
        <div className="max-w-3xl mx-auto space-y-6 text-lg text-text-secondary leading-relaxed">
          <p>
            Le monde du travail et le monde intérieur ne sont pas séparés.
            Transformer l'un sans l'autre crée déséquilibre. Les transformer
            ensemble crée magie.
          </p>
          <p>
            Mon approche repose sur la conviction que{' '}
            <strong className="text-deep-blue">
              l'excellence professionnelle et le bien-être ne sont pas opposés
            </strong>
            . Ils se nourrissent mutuellement quand on sait créer les conditions
            justes.
          </p>
          <p>
            Les pratiques contemplatives ne rendent pas moins performant. Elles
            rendent{' '}
            <strong className="text-deep-blue">
              plus présent, plus lucide, plus créatif, plus résilient
            </strong>
            . Et donc, paradoxalement, plus efficace.
          </p>
          <p>
            C'est cette alliance que j'ai incarnée dans ma propre vie. Et c'est
            cette alliance que j'accompagne chez mes clients - qu'ils soient des
            organisations ou des individus.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <Section background="sage" padding="lg" centered>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep-blue mb-6">
            Travaillons Ensemble
          </h2>
          <p className="text-lg text-text-secondary mb-8">
            Que vous soyez une organisation ou un individu, explorons comment mon
            expertise peut servir votre transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full bg-terracotta text-warm-white hover:bg-terracotta-dark shadow-md hover:shadow-lg transition-all duration-300"
            >
              Réserver une session découverte
            </a>
            <a
              href="/organisations"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-warm-white transition-all duration-300"
            >
              Services pour organisations
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
