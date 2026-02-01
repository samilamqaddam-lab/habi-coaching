import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Admin - Transcendence Work',
  description: 'Espace administration',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" dir="ltr" className="dark">
      <body className={`${inter.className} min-h-screen bg-slate-900 text-slate-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
