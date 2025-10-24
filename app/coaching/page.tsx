import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const coachingTypes = [
  {
    title: 'Coaching Individuel',
    description:
      'Un accompagnement personnalisé pour explorer vos défis, clarifier votre vision et naviguer votre parcours professionnel selon vos propres termes.',
    duration: '60-90 min',
    format: 'En personne ou en ligne',
    price: 'À partir de 150€/session',
    icon: 'user',
  },
  {
    title: 'Coaching de Carrière',
    description:
      'Orientation professionnelle, transitions de carrière (ascendantes, latérales ou réflexives), et développement de leadership pour les cadres et entrepreneurs.',
    duration: 'Programme 3-6 mois',
    format: 'Sessions bi-mensuelles',
    price: 'Programme personnalisé',
    icon: 'briefcase',
  },
  {
    title: 'Coaching de Vie',
    description:
      'Transformation personnelle profonde, intégration harmonieuse travail-vie, prévention du burnout et alignement avec vos valeurs.',
    duration: 'Programme flexible',
    format: 'En personne ou en ligne',
    price: 'À partir de 600€/mois',
    icon: 'heart',
  },
];

export default function CoachingPage() {
  return (
    <>
      <Hero
        subtitle="Coaching Individuel"
        title="Définissez le Succès Selon Vos Termes"
        description="Un accompagnement certifié Coach & Team (accréditation EMCC) qui allie rigueur du coaching professionnel et profondeur des pratiques contemplatives. Pour une transformation qui respecte votre rythme et vos limites."
        primaryCTA={{
          text: 'Réserver une session découverte',
          href: '/contact',
        }}
        secondaryCTA={{
          text: 'En savoir plus',
          href: '#approche',
        }}
      />

      {/* Types de coaching */}
      <Section
        id="services"
        subtitle="Mes Services"
        title="Un Accompagnement Adapté à Vos Besoins"
        background="beige"
        centered
      >
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {coachingTypes.map((type, index) => (
            <Card key={index} hover padding="lg" className="flex flex-col">
              <div className="flex-grow">
                <div className="w-16 h-16 bg-terracotta/10 rounded-2xl flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-terracotta"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {type.icon === 'user' && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    )}
                    {type.icon === 'briefcase' && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    )}
                    {type.icon === 'heart' && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    )}
                  </svg>
                </div>
                <h3 className="font-heading text-2xl font-bold text-deep-blue mb-4">
                  {type.title}
                </h3>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {type.description}
                </p>
                <div className="space-y-2 mb-6 text-sm text-text-secondary">
                  <p>
                    <strong className="text-deep-blue">Durée:</strong>{' '}
                    {type.duration}
                  </p>
                  <p>
                    <strong className="text-deep-blue">Format:</strong>{' '}
                    {type.format}
                  </p>
                  <p className="font-semibold text-terracotta">{type.price}</p>
                </div>
              </div>
              <Button variant="outline" href="/contact" fullWidth>
                En savoir plus
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      {/* Approche */}
      <Section
        id="approche"
        subtitle="Mon Approche"
        title="Coaching Intégratif & Contemplatif"
        description="Mon approche unique combine l'efficacité du coaching professionnel avec la profondeur des pratiques contemplatives."
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-terracotta/10 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-terracotta font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-deep-blue mb-2">
                    Clarification & Exploration
                  </h4>
                  <p className="text-text-secondary text-sm">
                    Nous explorons ensemble vos aspirations, vos défis et vos
                    schémas pour créer une vision claire de votre chemin.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-sage/20 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-sage font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-deep-blue mb-2">
                    Transformation Intérieure
                  </h4>
                  <p className="text-text-secondary text-sm">
                    À travers des pratiques contemplatives et des outils de
                    coaching, nous activons votre potentiel de transformation.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-morocco-blue/10 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-morocco-blue font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-deep-blue mb-2">
                    Action & Ancrage
                  </h4>
                  <p className="text-text-secondary text-sm">
                    Nous traduisons vos insights en actions concrètes et créons
                    des pratiques pour ancrer durablement les changements.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card padding="lg" className="bg-gradient-to-br from-dune-beige to-sage-light/20">
            <h4 className="font-heading text-xl font-bold text-deep-blue mb-4">
              Ce que mes clients disent
            </h4>
            <blockquote className="italic text-text-secondary mb-4 leading-relaxed">
              "Hajar a cette capacité rare de créer un espace à la fois
              professionnel et profondément humain. Son approche m'a permis non
              seulement de clarifier ma vision professionnelle, mais aussi de me
              reconnecter à ce qui compte vraiment pour moi."
            </blockquote>
            <p className="text-sm font-semibold text-deep-blue">
              — Sophie, Directrice Marketing
            </p>
          </Card>
        </div>
      </Section>

      {/* CTA */}
      <Section background="sage" padding="lg" centered>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep-blue mb-6">
          Commençons Votre Voyage
        </h2>
        <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
          La première session est une session découverte gratuite de 30 minutes
          pour explorer vos besoins et voir si nous sommes alignés pour travailler
          ensemble.
        </p>
        <Button variant="primary" size="lg" href="/contact">
          Réserver ma session découverte gratuite
        </Button>
      </Section>
    </>
  );
}
