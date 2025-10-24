import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const yogaClasses = [
  {
    title: 'Hatha Yoga Traditionnel',
    description:
      'Pratique classique du yoga avec un focus sur les asanas (postures), pranayama (respiration) et méditation. Pour tous niveaux.',
    schedule: 'Mardis & Jeudis 18h30',
    duration: '90 min',
    price: '20€/cours ou 70€/mois',
  },
  {
    title: 'Yoga Restauratif',
    description:
      'Pratique douce et profondément relaxante avec des postures tenues longuement. Idéal pour la récupération et la gestion du stress.',
    schedule: 'Samedis 10h00',
    duration: '75 min',
    price: '25€/cours',
  },
  {
    title: 'Méditation & Pranayama',
    description:
      'Sessions dédiées aux techniques de respiration yogique et à la méditation guidée. Tous niveaux, débutants bienvenus.',
    schedule: 'Dimanches 9h00',
    duration: '60 min',
    price: '15€/cours ou 50€/mois',
  },
];

const programmes = [
  {
    id: 1,
    title: 'Retraite Yoga & Méditation dans l\'Atlas',
    location: 'Vallée de l\'Ourika, Maroc',
    duration: '5 jours / 4 nuits',
    dates: '15-19 Mai 2025',
    price: '890€',
    spotsLeft: 8,
    description:
      'Immersion totale dans la pratique yogique traditionnelle au cœur des montagnes de l\'Atlas. Yoga, méditation, randonnées contemplatives et cuisine locale.',
    highlights: [
      'Pratiques de yoga quotidiennes',
      'Méditation guidée',
      'Randonnées dans l\'Atlas',
      'Hébergement en éco-lodge',
      'Cuisine marocaine bio',
    ],
    type: 'retraite',
  },
  {
    id: 2,
    title: 'Atelier Leadership Conscient',
    location: 'Casablanca, Maroc',
    duration: '2 jours',
    dates: '10-11 Juin 2025',
    price: '450€',
    spotsLeft: 12,
    description:
      'Un atelier intensif pour développer votre leadership authentique, alliant pratiques contemplatives et outils de facilitation organisationnelle.',
    highlights: [
      'Connaissance de soi',
      'Intelligence émotionnelle',
      'Communication consciente',
      'Pratiques de présence',
      'Outils de facilitation',
    ],
    type: 'atelier',
  },
  {
    id: 3,
    title: 'Atelier Équilibre & Limites Saines',
    location: 'Casablanca, Maroc',
    duration: '2 jours',
    dates: '15-16 Juillet 2025',
    price: '350€',
    spotsLeft: 14,
    description:
      'Un atelier pratique pour créer un équilibre durable entre vie professionnelle et personnelle. Apprenez à poser des limites saines sans culpabilité et à prévenir le burnout.',
    highlights: [
      'Clarification de vos valeurs',
      'Techniques de boundaries',
      'Yoga & méditation anti-stress',
      'Prévention du burnout',
      'Pratiques quotidiennes concrètes',
    ],
    type: 'atelier',
  },
  {
    id: 5,
    title: 'Retraite Silence & Contemplation',
    location: 'Essaouira, Maroc',
    duration: '7 jours / 6 nuits',
    dates: '20-26 Septembre 2025',
    price: '1.200€',
    spotsLeft: 10,
    description:
      'Une retraite en silence au bord de l\'océan Atlantique. Méditation profonde, pratiques yogiques, et temps de contemplation face à la mer.',
    highlights: [
      'Noble silence',
      'Méditation intensive',
      'Yoga restauratif',
      'Vue sur l\'océan',
      'Accompagnement personnalisé',
    ],
    type: 'retraite',
  },
  {
    id: 6,
    title: 'Formation Yoga & Philosophie',
    location: 'Marrakech, Maroc',
    duration: '10 jours',
    dates: '1-10 Novembre 2025',
    price: '1.890€',
    spotsLeft: 15,
    description:
      'Formation approfondie aux fondamentaux du yoga traditionnel : asanas, pranayama, méditation et philosophie yogique.',
    highlights: [
      'Enseignements traditionnels',
      'Pratique quotidienne intensive',
      'Philosophie du yoga',
      'Manuel de formation',
      'Certificat de participation',
    ],
    type: 'formation',
  },
];

export default function ProgrammesPage() {
  return (
    <>
      <Hero
        subtitle="Pratiques Yogiques & Programmes"
        title="Transformez Votre Vie par le Yoga"
        description="Le Classical Hatha Yoga enseigné par une professeure certifiée Isha Foundation, avec une compréhension approfondie des enjeux du monde contemporain. Cours, retraites et programmes pour une pratique qui s'intègre à votre vie."
        primaryCTA={{
          text: 'Réserver un cours',
          href: '#cours',
        }}
        secondaryCTA={{
          text: 'Voir les retraites',
          href: '#retraites',
        }}
      />

      {/* Cours réguliers */}
      <Section
        id="cours"
        subtitle="Cours Réguliers"
        title="Rejoignez-Nous sur le Tapis"
        description="Des cours hebdomadaires en petits groupes pour une pratique approfondie et un accompagnement personnalisé."
        background="beige"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {yogaClasses.map((yogaClass, index) => (
            <Card key={index} hover padding="lg" className="flex flex-col">
              <div className="flex-grow">
                <h3 className="font-heading text-xl font-bold text-deep-blue mb-4">
                  {yogaClass.title}
                </h3>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {yogaClass.description}
                </p>
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex items-center text-text-secondary">
                    <svg
                      className="w-4 h-4 mr-2 text-sage"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {yogaClass.schedule}
                  </div>
                  <div className="flex items-center text-text-secondary">
                    <svg
                      className="w-4 h-4 mr-2 text-sage"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {yogaClass.duration}
                  </div>
                  <p className="font-semibold text-terracotta mt-4">
                    {yogaClass.price}
                  </p>
                </div>
              </div>
              <Button variant="outline" href="/contact" fullWidth>
                Réserver
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card padding="lg" className="max-w-2xl mx-auto bg-sage-light/10">
            <h4 className="font-semibold text-deep-blue mb-3">
              Cours d'essai gratuit
            </h4>
            <p className="text-text-secondary mb-4">
              Nouveau·elle au yoga ? Venez essayer votre premier cours
              gratuitement, sans engagement.
            </p>
            <Button variant="primary" size="md" href="/contact">
              Réserver mon cours d'essai
            </Button>
          </Card>
        </div>
      </Section>

      {/* Retraites & Programmes */}
      <Section
        id="retraites"
        subtitle="Retraites & Programmes"
        title="Expériences Transformationnelles"
        description="Des retraites, ateliers et formations qui allient pratiques yogiques traditionnelles et développement personnel dans des lieux inspirants au Maroc."
      >
        <div className="grid gap-8">
          {programmes.map((programme) => (
            <Card key={programme.id} padding="lg" className="group">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Image placeholder */}
                <div className="md:col-span-1">
                  <div className="aspect-[4/3] bg-gradient-to-br from-terracotta/20 to-sage/20 rounded-xl flex items-center justify-center group-hover:from-terracotta/30 group-hover:to-sage/30 transition-all">
                    <svg
                      className="w-16 h-16 text-morocco-blue/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Contenu */}
                <div className="md:col-span-2">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-terracotta/10 text-terracotta text-xs font-medium rounded-full mb-3 uppercase">
                        {programme.type}
                      </span>
                      <h3 className="font-heading text-2xl font-bold text-deep-blue mb-2">
                        {programme.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-text-secondary mb-4">
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-sage"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {programme.location}
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-sage"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {programme.duration}
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-sage"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {programme.dates}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-heading text-3xl font-bold text-terracotta mb-1">
                        {programme.price}
                      </p>
                      <p className="text-xs text-text-secondary">par personne</p>
                      {programme.spotsLeft <= 5 && (
                        <p className="text-xs text-terracotta font-medium mt-2">
                          Plus que {programme.spotsLeft} places
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-text-secondary leading-relaxed mb-6">
                    {programme.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-deep-blue mb-3 text-sm">
                      Au programme :
                    </h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {programme.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <svg
                            className="w-4 h-4 text-sage mr-2 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-text-secondary">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="primary" size="md" href="/contact">
                      Réserver ma place
                    </Button>
                    <Button variant="outline" size="md" href="/contact">
                      Plus d'informations
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Philosophie */}
      <Section
        subtitle="Ma Philosophie"
        title="Le Yoga Comme Chemin de Transformation"
        background="beige"
        centered
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            Pour moi, le yoga est bien plus qu'une pratique physique. C'est un
            chemin de transformation profonde qui touche tous les aspects de
            notre être - corps, mental, cœur et esprit.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card padding="md">
              <h4 className="font-semibold text-deep-blue mb-3">
                Tradition Authentique
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                Formée dans la lignée traditionnelle du Hatha Yoga, j'enseigne
                les pratiques dans leur forme authentique, respectueuse de la
                sagesse ancestrale.
              </p>
            </Card>

            <Card padding="md">
              <h4 className="font-semibold text-deep-blue mb-3">
                Approche Inclusive
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                Le yoga est pour tous les corps et tous les âges. J'adapte la
                pratique à chaque personne avec bienveillance et respect.
              </p>
            </Card>

            <Card padding="md">
              <h4 className="font-semibold text-deep-blue mb-3">
                Au-delà du Physique
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                Nous explorons les dimensions subtiles du yoga : pranayama,
                méditation, philosophie yogique et pratiques contemplatives.
              </p>
            </Card>

            <Card padding="md">
              <h4 className="font-semibold text-deep-blue mb-3">
                Petits Groupes
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                Maximum 12 personnes par cours pour garantir un accompagnement
                personnalisé et créer une vraie communauté de pratique.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* Programme sur-mesure */}
      <Section
        subtitle="Programme Personnalisé"
        title="Créons Ensemble Votre Expérience"
        description="Vous souhaitez un programme sur-mesure pour votre groupe, votre équipe ou une occasion spéciale ? Nous concevons des expériences uniques adaptées à vos besoins."
        centered
        padding="lg"
      >
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-deep-blue mb-2">Groupes privés</h4>
              <p className="text-sm text-text-secondary">
                À partir de 6 personnes
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-deep-blue mb-2">Lieux uniques</h4>
              <p className="text-sm text-text-secondary">
                Riads, désert, montagnes, océan
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-deep-blue mb-2">100% personnalisé</h4>
              <p className="text-sm text-text-secondary">
                Contenu adapté à vos besoins
              </p>
            </div>
          </div>

          <Button variant="primary" size="lg" href="/contact">
            Demander un programme sur-mesure
          </Button>
        </div>
      </Section>

      {/* CTA */}
      <Section background="sage" padding="lg" centered>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep-blue mb-6">
          Prêt·e à Commencer ?
        </h2>
        <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
          Réservez votre cours d'essai gratuit ou contactez-nous pour toute
          question sur nos cours et programmes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg" href="/contact">
            Cours d'essai gratuit
          </Button>
          <Button variant="outline" size="lg" href="/contact">
            Demander des informations
          </Button>
        </div>
      </Section>
    </>
  );
}
