import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';

export default function OrganisationsPage() {
  return (
    <>
      <Hero
        subtitle="Pour les Organisations"
        title="Transformer Durablement Votre Organisation"
        description="Un accompagnement qui allie excellence opérationnelle et dimension humaine profonde. Une approche éprouvée qui réconcilie performance et bien-être."
        primaryCTA={{
          text: 'Demander un devis',
          href: '#devis',
        }}
        secondaryCTA={{
          text: 'Nos programmes',
          href: '#programmes',
        }}
      />

      {/* Services pour Organisations */}
      <Section
        id="programmes"
        subtitle="Nos Services"
        title="Accompagnement Organisationnel"
        description="Des interventions adaptées à vos besoins, de la facilitation ponctuelle au programme de transformation complet."
        background="beige"
        centered
      >
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <Card hover padding="lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-terracotta/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
              <h3 className="font-heading text-xl font-bold text-deep-blue mb-4">
                Transformation Organisationnelle
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                Accompagnement global de votre organisation vers une culture de
                présence, collaboration et performance durable.
              </p>
              <ul className="text-sm text-text-secondary space-y-2 text-left">
                <li>• Diagnostic et co-création</li>
                <li>• Facilitation stratégique</li>
                <li>• Conduite du changement</li>
              </ul>
            </div>
          </Card>

          <Card hover padding="lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-sage/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-deep-blue mb-4">
                Leadership Conscient
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                Développement du leadership à tous les niveaux, ancré dans la
                conscience de soi, l'intelligence collective et des limites saines
                pour une performance durable.
              </p>
              <ul className="text-sm text-text-secondary space-y-2 text-left">
                <li>• Coaching de dirigeants</li>
                <li>• Séminaires leadership</li>
                <li>• Développement d'équipes</li>
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
                Retraites Corporates
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                Retraites sur-mesure au Maroc pour ressourcer vos équipes et
                renforcer la cohésion dans un cadre inspirant.
              </p>
              <ul className="text-sm text-text-secondary space-y-2 text-left">
                <li>• Séminaires stratégiques</li>
                <li>• Team building authentique</li>
                <li>• Reconnexion & ressourcement</li>
              </ul>
            </div>
          </Card>
        </div>
      </Section>

      {/* Formulaire de Devis */}
      <Section
        id="devis"
        subtitle="Demander un Devis"
        title="Discutons de Votre Projet"
        description="Remplissez ce formulaire pour que nous puissions comprendre vos besoins et vous proposer un accompagnement sur-mesure."
        centered
      >
        <div className="max-w-2xl mx-auto">
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
                label="Email professionnel"
                name="email"
                type="email"
                placeholder="votre.email@entreprise.com"
                required
              />

              <FormInput
                label="Téléphone"
                name="phone"
                type="tel"
                placeholder="+212 6 00 00 00 00"
              />

              <FormInput
                label="Nom de l'organisation"
                name="organization"
                type="text"
                placeholder="Nom de votre entreprise"
                required
              />

              <FormInput
                label="Taille de l'organisation"
                name="size"
                type="select"
                required
                options={[
                  { value: '1-10', label: '1-10 employés' },
                  { value: '11-50', label: '11-50 employés' },
                  { value: '51-200', label: '51-200 employés' },
                  { value: '201-500', label: '201-500 employés' },
                  { value: '500+', label: 'Plus de 500 employés' },
                ]}
              />

              <FormInput
                label="Type d'accompagnement souhaité"
                name="service"
                type="select"
                required
                options={[
                  {
                    value: 'transformation',
                    label: 'Transformation organisationnelle',
                  },
                  { value: 'leadership', label: 'Leadership conscient' },
                  { value: 'retraite', label: 'Retraite corporate' },
                  { value: 'facilitation', label: 'Facilitation ponctuelle' },
                  { value: 'autre', label: 'Autre / À définir ensemble' },
                ]}
              />

              <FormInput
                label="Décrivez votre projet"
                name="message"
                type="textarea"
                placeholder="Parlez-nous de vos besoins, vos enjeux et vos attentes..."
                required
                rows={6}
              />

              <Button variant="primary" size="lg" fullWidth>
                Envoyer ma demande
              </Button>

              <p className="text-sm text-text-secondary text-center">
                Nous vous répondrons sous 48h pour planifier un premier échange.
              </p>
            </form>
          </Card>
        </div>
      </Section>

      {/* CTA */}
      <Section background="sage" padding="md" centered>
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-deep-blue mb-4">
          Vous préférez en discuter directement ?
        </h3>
        <p className="text-text-secondary mb-6">
          Réservez un appel découverte de 30 minutes pour explorer comment nous
          pouvons collaborer.
        </p>
        <Button variant="primary" size="lg" href="/contact">
          Réserver un appel
        </Button>
      </Section>
    </>
  );
}
