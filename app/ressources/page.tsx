import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const articles = [
  {
    title: '5 Pratiques Quotidiennes pour Cultiver la Présence',
    category: 'Pratiques',
    readTime: '5 min',
    excerpt:
      'Découvrez comment intégrer la présence dans votre quotidien avec ces pratiques simples mais puissantes.',
  },
  {
    title: 'Le Leadership Conscient en Entreprise',
    category: 'Leadership',
    readTime: '8 min',
    excerpt:
      'Comment transformer votre style de leadership pour créer des organisations plus humaines et performantes.',
  },
  {
    title: 'Yoga & Gestion du Stress : Ce que Dit la Science',
    category: 'Bien-être',
    readTime: '6 min',
    excerpt:
      'Les bienfaits du yoga sur le stress et l\'anxiété, expliqués par la recherche scientifique.',
  },
];

const guides = [
  {
    title: 'Guide : Méditation pour Débutants',
    description:
      'Un guide complet de 20 pages pour commencer la méditation en douceur, avec des exercices pratiques.',
    type: 'PDF',
    pages: '20 pages',
  },
  {
    title: 'E-book : 7 Jours de Pratiques Contemplatives',
    description:
      'Un programme de 7 jours avec des pratiques guidées pour vous reconnecter à vous-même.',
    type: 'PDF',
    pages: '35 pages',
  },
  {
    title: 'Check-list : Préparer Sa Retraite Yoga',
    description:
      'Tout ce dont vous avez besoin pour préparer sereinement votre première retraite de yoga.',
    type: 'PDF',
    pages: '5 pages',
  },
];

export default function RessourcesPage() {
  return (
    <>
      <Hero
        subtitle="Ressources"
        title="Inspirations & Outils Gratuits"
        description="Articles, guides pratiques et ressources pour approfondir votre chemin de transformation personnelle et professionnelle."
        primaryCTA={{
          text: 'Explorer les ressources',
          href: '#articles',
        }}
        centered
      />

      {/* Articles */}
      <Section
        id="articles"
        subtitle="Blog"
        title="Articles & Réflexions"
        description="Inspirations, pratiques et réflexions sur le yoga, le coaching et la transformation."
        background="beige"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Card key={index} hover padding="lg" className="flex flex-col">
              <div className="aspect-[16/9] bg-gradient-to-br from-terracotta/10 to-sage/10 rounded-xl mb-6 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-morocco-blue/30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-terracotta uppercase">
                    {article.category}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {article.readTime}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-deep-blue mb-3">
                  {article.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  {article.excerpt}
                </p>
              </div>
              <Button variant="text" href="#">
                Lire l'article →
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="md" href="#">
            Voir tous les articles
          </Button>
        </div>
      </Section>

      {/* Guides Gratuits */}
      <Section
        id="guides"
        subtitle="Téléchargements Gratuits"
        title="Guides & E-books"
        description="Des ressources pratiques à télécharger pour approfondir votre pratique."
        centered
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {guides.map((guide, index) => (
            <Card key={index} padding="lg" className="flex flex-col">
              <div className="flex-grow">
                <div className="w-16 h-16 bg-terracotta/10 rounded-xl flex items-center justify-center mb-6">
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
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-bold text-deep-blue mb-3">
                  {guide.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  {guide.description}
                </p>
                <div className="flex items-center text-xs text-text-secondary mb-6">
                  <span className="px-2 py-1 bg-soft-gray rounded mr-2">
                    {guide.type}
                  </span>
                  <span>{guide.pages}</span>
                </div>
              </div>
              <Button variant="outline" fullWidth href="/contact">
                Télécharger gratuitement
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      {/* Témoignages */}
      <Section
        id="temoignages"
        subtitle="Témoignages"
        title="Ce Que Disent Mes Clients"
        background="sage"
        centered
        padding="lg"
      >
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card padding="lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-terracotta/20 rounded-full flex items-center justify-center mr-4">
                <span className="font-heading font-bold text-terracotta">M</span>
              </div>
              <div>
                <h4 className="font-semibold text-deep-blue">Marie L.</h4>
                <p className="text-sm text-text-secondary">DRH, Groupe Tech</p>
              </div>
            </div>
            <p className="text-text-secondary italic leading-relaxed">
              "L'accompagnement de Hajar a transformé notre équipe de direction.
              Son approche unique qui mêle facilitation professionnelle et
              pratiques contemplatives a créé un espace de confiance et de
              collaboration que je n'avais jamais vu auparavant."
            </p>
          </Card>

          <Card padding="lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-sage/30 rounded-full flex items-center justify-center mr-4">
                <span className="font-heading font-bold text-sage">A</span>
              </div>
              <div>
                <h4 className="font-semibold text-deep-blue">Ahmed K.</h4>
                <p className="text-sm text-text-secondary">Entrepreneur</p>
              </div>
            </div>
            <p className="text-text-secondary italic leading-relaxed">
              "La retraite dans l'Atlas a été un tournant dans ma vie. Hajar
              crée un espace de présence et d'authenticité rare. J'ai pu me
              reconnecter à mes valeurs profondes et clarifier ma vision
              professionnelle."
            </p>
          </Card>

          <Card padding="lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-morocco-blue/10 rounded-full flex items-center justify-center mr-4">
                <span className="font-heading font-bold text-morocco-blue">S</span>
              </div>
              <div>
                <h4 className="font-semibold text-deep-blue">Sophie D.</h4>
                <p className="text-sm text-text-secondary">Coach Indépendante</p>
              </div>
            </div>
            <p className="text-text-secondary italic leading-relaxed">
              "Les cours de yoga de Hajar vont bien au-delà du physique. Elle
              transmet le yoga dans sa dimension la plus profonde, avec une
              authenticité et une bienveillance qui touchent le cœur. Chaque
              cours est une invitation à se retrouver."
            </p>
          </Card>

          <Card padding="lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-terracotta/20 rounded-full flex items-center justify-center mr-4">
                <span className="font-heading font-bold text-terracotta">Y</span>
              </div>
              <div>
                <h4 className="font-semibold text-deep-blue">Youssef M.</h4>
                <p className="text-sm text-text-secondary">Directeur Général</p>
              </div>
            </div>
            <p className="text-text-secondary italic leading-relaxed">
              "Le coaching de Hajar m'a permis de transformer mon style de
              leadership. Elle a su m'accompagner avec justesse entre exigence
              professionnelle et développement personnel. Un vrai game-changer
              pour ma carrière."
            </p>
          </Card>
        </div>
      </Section>

      {/* Newsletter */}
      <Section centered padding="lg">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-deep-blue mb-4">
            Restez Inspiré·e
          </h2>
          <p className="text-text-secondary mb-8">
            Inscrivez-vous à ma newsletter mensuelle pour recevoir des
            inspirations, des pratiques guidées et les actualités des prochains
            programmes.
          </p>
          <Card padding="lg">
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-grow px-4 py-3 rounded-lg border-2 border-soft-gray focus:border-terracotta focus:outline-none transition-colors"
              />
              <Button variant="primary" size="md">
                S'inscrire
              </Button>
            </form>
            <p className="text-xs text-text-secondary mt-4 text-center">
              Pas de spam. Désabonnement possible à tout moment.
            </p>
          </Card>
        </div>
      </Section>
    </>
  );
}
