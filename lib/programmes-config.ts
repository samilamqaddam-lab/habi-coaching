/**
 * Configuration des programmes Transcendence Work
 * Définit quels programmes peuvent avoir des éditions planifiées
 */

export interface ProgrammeConfig {
  name: string;
  icon: string;
  supportsEditions: boolean;
  defaultCapacity: number;
  theme: 'yoga' | 'coaching' | 'corporate' | 'default';
  description?: string;
}

export const PROGRAMMES_CONFIG: Record<string, ProgrammeConfig> = {
  'upa-yoga': {
    name: 'Upa Yoga',
    icon: '🧘',
    supportsEditions: true,
    defaultCapacity: 10,
    theme: 'yoga',
    description: 'Pratiques simples et puissantes pour le bien-être quotidien'
  },
  'surya-kriya': {
    name: 'Surya Kriya',
    icon: '🌞',
    supportsEditions: true,
    defaultCapacity: 10,
    theme: 'yoga',
    description: 'Pratique solaire puissante pour l\'énergie et la vitalité'
  },
  'angamardana': {
    name: 'Angamardana',
    icon: '💪',
    supportsEditions: true,
    defaultCapacity: 10,
    theme: 'yoga',
    description: 'Système de fitness yogique pour la force et la souplesse'
  },
  'yogasanas': {
    name: 'Yogasanas',
    icon: '🪷',
    supportsEditions: true,
    defaultCapacity: 10,
    theme: 'yoga',
    description: 'Postures classiques pour l\'alignement corps-esprit'
  },
  'surya-shakti': {
    name: 'Surya Shakti',
    icon: '⚡',
    supportsEditions: true,
    defaultCapacity: 10,
    theme: 'yoga',
    description: 'Pratique dynamique pour la force, l\'endurance et l\'énergie'
  },
  'bhuta-shuddhi': {
    name: 'Bhuta Shuddhi',
    icon: '✨',
    supportsEditions: false, // Pas de cours collectif sur le site actuellement
    defaultCapacity: 10,
    theme: 'yoga',
    description: 'Purification des cinq éléments'
  },
  'coaching-individuel': {
    name: 'Coaching Individuel',
    icon: '💬',
    supportsEditions: false, // Séances individuelles, pas d'éditions groupées
    defaultCapacity: 1,
    theme: 'coaching',
    description: 'Accompagnement personnalisé'
  },
  'retraite': {
    name: 'Retraite',
    icon: '🏔️',
    supportsEditions: false, // Pas de cours collectif sur le site actuellement
    defaultCapacity: 15,
    theme: 'default',
    description: 'Immersion transformative'
  }
};

/**
 * Retourne les programmes qui supportent les éditions
 */
export function getProgrammesWithEditions(): Record<string, ProgrammeConfig> {
  return Object.fromEntries(
    Object.entries(PROGRAMMES_CONFIG).filter(([, config]) => config.supportsEditions)
  );
}

/**
 * Retourne la config d'un programme par sa clé
 */
export function getProgrammeConfig(key: string): ProgrammeConfig | undefined {
  return PROGRAMMES_CONFIG[key];
}

/**
 * Liste des clés de programmes pour les dropdowns
 */
export function getProgrammeKeys(): string[] {
  return Object.keys(PROGRAMMES_CONFIG);
}

/**
 * Liste des clés de programmes avec éditions pour les dropdowns admin
 */
export function getEditionProgrammeKeys(): string[] {
  return Object.keys(getProgrammesWithEditions());
}
