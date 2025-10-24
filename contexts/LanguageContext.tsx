'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import fr from '../locales/fr.json';
import en from '../locales/en.json';

export type Locale = 'fr' | 'en';

type Translations = typeof fr;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType>({
  locale: 'fr',
  setLocale: () => {},
  t: (key: string) => key,
});

const translations: Record<Locale, Translations> = {
  fr,
  en,
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>('fr');
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage after mount
  useEffect(() => {
    setMounted(true);
    const savedLocale = localStorage.getItem('locale') as Locale | null;
    if (savedLocale && (savedLocale === 'fr' || savedLocale === 'en')) {
      setLocaleState(savedLocale);
    }
  }, []);

  // Save to localStorage when locale changes
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (mounted) {
      localStorage.setItem('locale', newLocale);
    }
  };

  // Translation function with nested key support (e.g., "home.hero.title")
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to French if key not found
        value = translations.fr;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            // If still not found, return the key itself for debugging
            console.warn(`Translation key not found: ${key}`);
            return key;
          }
        }
        break;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
