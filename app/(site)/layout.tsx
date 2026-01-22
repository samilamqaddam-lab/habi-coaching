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

const siteUrl = "https://www.transcendencework.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Transcendence Work - Coaching Professionnel et Yoga Classique à Casablanca",
    template: "%s | Transcendence Work",
  },
  description: "Hajar Habi - Coaching professionnel et Hatha Yoga classique à Casablanca, Maroc. Accompagnement des individus et transformation des organisations.",
  keywords: [
    "coaching casablanca",
    "yoga casablanca",
    "hatha yoga maroc",
    "coach professionnel maroc",
    "développement personnel casablanca",
    "transformation organisationnelle",
    "sadhguru gurukulam",
    "coaching individuel",
    "yoga traditionnel",
  ],
  authors: [{ name: "Hajar Habi", url: siteUrl }],
  creator: "Hajar Habi",
  publisher: "Transcendence Work",
  alternates: {
    canonical: siteUrl,
    languages: {
      "fr-MA": siteUrl,
      "en": siteUrl,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: siteUrl,
    siteName: "Transcendence Work",
    title: "Transcendence Work - Coaching Professionnel et Yoga Classique à Casablanca",
    description: "Hajar Habi - Coaching professionnel et Hatha Yoga classique à Casablanca, Maroc. Accompagnement des individus et transformation des organisations.",
    images: [
      {
        url: "/images/Reel/hajar-professional.jpg",
        width: 1200,
        height: 630,
        alt: "Hajar Habi - Coach et Professeure de Yoga à Casablanca",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Transcendence Work - Coaching et Yoga à Casablanca",
    description: "Hajar Habi - Coaching professionnel et Hatha Yoga classique à Casablanca, Maroc.",
    images: ["/images/Reel/hajar-professional.jpg"],
  },
  other: {
    "geo.region": "MA-CAS",
    "geo.placename": "Casablanca",
    "geo.position": "33.5731;-7.5898",
    "ICBM": "33.5731, -7.5898",
  },
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
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CookieConsentBanner from "@/components/ui/CookieConsentBanner";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Analytics } from "@vercel/analytics/react";
import ConditionalGA4 from "@/components/analytics/ConditionalGA4";
import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema, personSchema, websiteSchema } from "@/lib/structured-data";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="fr">
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={personSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        <LanguageProvider>
          <Header />
          <main className={`pt-20 ${isDraftMode ? 'pb-16' : ''}`}>{children}</main>
          <Footer />
          {isDraftMode && <PreviewBanner />}
          <WhatsAppButton />
          <CookieConsentBanner />
          <Analytics />
        </LanguageProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <ConditionalGA4 gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
