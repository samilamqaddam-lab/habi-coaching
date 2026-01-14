import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProgrammePageContent from './ProgrammePageContent';

// Valid programme slugs
const VALID_PROGRAMMES = ['upa-yoga', 'surya-kriya', 'surya-shakti', 'angamardana', 'yogasanas'];

// Mapping slug → translation key
const SLUG_TO_TRANSLATION_KEY: Record<string, string> = {
  'upa-yoga': 'upaYoga',
  'surya-kriya': 'suryaKriya',
  'surya-shakti': 'suryaShakti',
  'angamardana': 'angamardana',
  'yogasanas': 'yogasanas',
};

// Programme data for metadata (server-side)
const PROGRAMME_META: Record<string, { title: string; description: string; image: string }> = {
  'upa-yoga': {
    title: 'Upa Yoga',
    description: 'Yoga de base pour le corps, l\'énergie et la vitalité. Un ensemble simple mais puissant de 10 pratiques qui activent les articulations, les muscles et le système énergétique.',
    image: '/images/programmes/upa-yoga.jpg',
  },
  'surya-kriya': {
    title: 'Surya Kriya',
    description: 'Pratique yogique complète pour la vitalité et la clarté intérieure. Une pratique en 21 étapes, issue d\'une tradition ancienne, conçue pour soutenir la santé et le bien-être.',
    image: '/images/programmes/surya-kriya.jpg',
  },
  'surya-shakti': {
    title: 'Surya Shakti',
    description: 'Pratique dynamique pour la force, l\'endurance et l\'énergie. Un processus en 18 étapes qui renforce les ligaments et la structure musculaire.',
    image: '/images/programmes/surya-shakti.jpg',
  },
  'angamardana': {
    title: 'Angamardana',
    description: 'Pratique dynamique pour la force, la mobilité et la condition physique. 31 processus dynamiques pour revitaliser le corps sans aucun équipement.',
    image: '/images/programmes/angamardana.jpg',
  },
  'yogasanas': {
    title: 'Yogasanas',
    description: 'Postures de yoga pour l\'alignement intérieur et l\'harmonie. Des postures puissantes pour élever la conscience et entrer en résonance avec l\'existence.',
    image: '/images/programmes/yogasanas.jpg',
  },
};

// Generate static params for all valid programmes
export async function generateStaticParams() {
  return VALID_PROGRAMMES.map((key) => ({ programmeKey: key }));
}

// Generate metadata for SEO and social sharing
export async function generateMetadata({
  params,
}: {
  params: Promise<{ programmeKey: string }>;
}): Promise<Metadata> {
  const { programmeKey } = await params;

  if (!VALID_PROGRAMMES.includes(programmeKey)) {
    return { title: 'Programme non trouvé' };
  }

  const meta = PROGRAMME_META[programmeKey];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hajarhabi.com';

  return {
    title: `${meta.title} | Hajar Habi - Yoga Casablanca`,
    description: meta.description,
    openGraph: {
      title: `${meta.title} - Cours de Yoga à Casablanca`,
      description: meta.description,
      images: [
        {
          url: `${baseUrl}${meta.image}`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
      type: 'website',
      locale: 'fr_FR',
      siteName: 'Hajar Habi - Coaching & Yoga',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${meta.title} - Cours de Yoga à Casablanca`,
      description: meta.description,
      images: [`${baseUrl}${meta.image}`],
    },
  };
}

export default async function ProgrammePage({
  params,
}: {
  params: Promise<{ programmeKey: string }>;
}) {
  const { programmeKey } = await params;

  // Validate programme key
  if (!VALID_PROGRAMMES.includes(programmeKey)) {
    notFound();
  }

  const translationKey = SLUG_TO_TRANSLATION_KEY[programmeKey];

  return (
    <ProgrammePageContent
      programmeKey={programmeKey}
      translationKey={translationKey}
    />
  );
}
