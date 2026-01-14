import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brand Kit | Transcendence Work',
  description: 'Identité visuelle et guide de style de Transcendence Work',
  robots: {
    index: false,
    follow: false,
  },
};

export default function BrandKitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
