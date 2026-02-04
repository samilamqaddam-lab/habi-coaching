import { Metadata } from 'next';
import CVPage from './CVPage';

export const metadata: Metadata = {
  title: 'CV - Hajar Habi | Transcendence Work',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <CVPage />;
}
