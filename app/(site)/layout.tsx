import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { draftMode } from "next/headers";
import "../globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Transcendence Work - Coaching Holistique & Yoga Traditionnel",
  description: "Hajar Habi - Experte en coaching organisationnel et pratiques yogiques traditionnelles. Transformation des organisations et accompagnement individuel.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PreviewBanner from "@/components/layout/PreviewBanner";
import { LanguageProvider } from "@/contexts/LanguageContext";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="fr">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        <LanguageProvider>
          <Header />
          <main className={`pt-20 ${isDraftMode ? 'pb-16' : ''}`}>{children}</main>
          <Footer />
          {isDraftMode && <PreviewBanner />}
        </LanguageProvider>
      </body>
    </html>
  );
}
