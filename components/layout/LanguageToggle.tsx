'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Locale } from '@/contexts/LanguageContext';

export default function LanguageToggle() {
  const { locale, setLocale } = useTranslation();

  return (
    <div className="flex items-center gap-1 bg-soft-gray rounded-full p-1">
      <button
        onClick={() => setLocale('fr')}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
          locale === 'fr'
            ? 'bg-terracotta text-warm-white shadow-sm'
            : 'text-text-secondary hover:text-text-primary'
        }`}
        aria-label="Switch to French"
      >
        FR
      </button>
      <button
        onClick={() => setLocale('en')}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
          locale === 'en'
            ? 'bg-terracotta text-warm-white shadow-sm'
            : 'text-text-secondary hover:text-text-primary'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
