import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';

export default function ContactPage() {
  return (
    <>
      <Hero
        subtitle="Contact"
        title="Entrons en Connexion"
        description="Que vous soyez une organisation, un professionnel ou un particulier, je suis là pour répondre à vos questions et explorer comment nous pouvons collaborer."
        primaryCTA={{
          text: 'Me contacter',
          href: '#contact-form',
        }}
        centered
      />

      {/* Contact Methods */}
      <Section background="beige" padding="lg">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-deep-blue mb-3">Email</h3>
            <a
              href="mailto:contact@habi-coaching.com"
              className="text-text-secondary hover:text-terracotta transition-colors"
            >
              contact@habi-coaching.com
            </a>
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-deep-blue mb-3">Téléphone</h3>
            <a
              href="tel:+212600000000"
              className="text-text-secondary hover:text-terracotta transition-colors"
            >
              +212 6 00 00 00 00
            </a>
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-deep-blue mb-3">Localisation</h3>
            <p className="text-text-secondary">
              Casablanca, Maroc
              <br />
              (Sessions en ligne disponibles)
            </p>
          </Card>
        </div>

        {/* Contact Form */}
        <div id="contact-form" className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-terracotta text-sm font-medium uppercase tracking-wider mb-3">
              Formulaire de Contact
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep-blue mb-4">
              Envoyez-Moi un Message
            </h2>
            <p className="text-text-secondary">
              Remplissez ce formulaire et je vous répondrai sous 48h.
            </p>
          </div>

          <Card padding="lg">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  label="Prénom"
                  name="firstName"
                  type="text"
                  placeholder="Votre prénom"
                  required
                />
                <FormInput
                  label="Nom"
                  name="lastName"
                  type="text"
                  placeholder="Votre nom"
                  required
                />
              </div>

              <FormInput
                label="Email"
                name="email"
                type="email"
                placeholder="votre.email@exemple.com"
                required
              />

              <FormInput
                label="Téléphone"
                name="phone"
                type="tel"
                placeholder="+212 6 00 00 00 00"
              />

              <FormInput
                label="Je m'intéresse à"
                name="interest"
                type="select"
                required
                options={[
                  { value: 'coaching', label: 'Coaching individuel' },
                  { value: 'yoga', label: 'Cours de yoga' },
                  { value: 'retraite', label: 'Retraite / Programme' },
                  { value: 'organisation', label: 'Accompagnement organisation' },
                  { value: 'autre', label: 'Autre' },
                ]}
              />

              <FormInput
                label="Votre message"
                name="message"
                type="textarea"
                placeholder="Parlez-moi de votre projet, vos besoins, vos questions..."
                required
                rows={6}
              />

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  required
                  className="mt-1 mr-3 w-4 h-4 text-terracotta border-soft-gray rounded focus:ring-terracotta"
                />
                <label htmlFor="consent" className="text-sm text-text-secondary">
                  J'accepte que mes données personnelles soient utilisées pour me
                  recontacter concernant ma demande. Elles ne seront jamais
                  partagées avec des tiers.
                </label>
              </div>

              <Button variant="primary" size="lg" fullWidth>
                Envoyer mon message
              </Button>

              <p className="text-sm text-text-secondary text-center">
                Vous recevrez une réponse sous 48h maximum.
              </p>
            </form>
          </Card>
        </div>
      </Section>

      {/* FAQ rapide */}
      <Section
        subtitle="Questions Fréquentes"
        title="Vous Vous Demandez..."
        centered
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <Card padding="md">
            <h4 className="font-semibold text-deep-blue mb-2">
              Proposez-vous des sessions en ligne ?
            </h4>
            <p className="text-sm text-text-secondary">
              Oui ! La plupart de mes services sont disponibles en ligne via Zoom
              ou en personne à Casablanca. Les retraites se déroulent au Maroc.
            </p>
          </Card>

          <Card padding="md">
            <h4 className="font-semibold text-deep-blue mb-2">
              Combien de temps dure un accompagnement ?
            </h4>
            <p className="text-sm text-text-secondary">
              Cela dépend de vos besoins. Un coaching peut être ponctuel (1-2
              sessions) ou s'étaler sur 3-6 mois. Nous en discutons ensemble lors
              de la session découverte.
            </p>
          </Card>

          <Card padding="md">
            <h4 className="font-semibold text-deep-blue mb-2">
              Dois-je avoir de l'expérience en yoga pour participer aux cours ?
            </h4>
            <p className="text-sm text-text-secondary">
              Pas du tout ! Mes cours sont ouverts à tous les niveaux. Je propose
              même un cours d'essai gratuit pour les débutants.
            </p>
          </Card>

          <Card padding="md">
            <h4 className="font-semibold text-deep-blue mb-2">
              Comment se passe la première session découverte ?
            </h4>
            <p className="text-sm text-text-secondary">
              C'est un moment d'échange gratuit de 30 minutes (en ligne ou en
              personne) pour faire connaissance, comprendre vos besoins et voir si
              nous sommes alignés pour travailler ensemble.
            </p>
          </Card>
        </div>
      </Section>

      {/* Social Media */}
      <Section background="sage" padding="md" centered>
        <h3 className="font-heading text-2xl font-bold text-deep-blue mb-4">
          Suivez-Moi sur les Réseaux
        </h3>
        <p className="text-text-secondary mb-6">
          Inspirations quotidiennes, coulisses des retraites et pratiques
          guidées.
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="#"
            className="w-12 h-12 bg-warm-white rounded-full flex items-center justify-center text-morocco-blue hover:bg-terracotta hover:text-warm-white transition-all"
            aria-label="Instagram"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            href="#"
            className="w-12 h-12 bg-warm-white rounded-full flex items-center justify-center text-morocco-blue hover:bg-terracotta hover:text-warm-white transition-all"
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </Section>
    </>
  );
}
