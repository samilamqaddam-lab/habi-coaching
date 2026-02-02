import { Metadata } from 'next';
import CorporateBrochure from './CorporateBrochure';

export const metadata: Metadata = {
  title: 'Offre Entreprise | Hajar Habi - Transcendence Work',
  description: 'Accompagnement des organisations : transformation, leadership, coaching, retraites corporate et programmes de yoga en entreprise.',
  robots: 'noindex, nofollow', // Hidden from search engines
};

export default function CorporateBrochurePage() {
  return <CorporateBrochure />;
}
