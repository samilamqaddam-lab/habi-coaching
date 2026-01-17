'use client'

import { useConsentManager } from '@/hooks/useConsentManager'
import { useTranslation } from '@/hooks/useTranslation'
import Link from 'next/link'

export default function CookieConsentBanner() {
  const { consent, mounted, acceptAll, rejectAll } = useConsentManager()
  const { t } = useTranslation()

  // Don't render on server or if consent already given
  if (!mounted || consent !== 'pending') return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-6 bg-deep-blue/95 backdrop-blur-sm text-warm-white shadow-2xl animate-slide-up">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm sm:text-base text-center sm:text-left flex-1">
          {t('cookies.message')}{' '}
          <Link
            href="/confidentialite"
            className="underline hover:text-golden-orange transition-colors"
          >
            {t('cookies.learnMore')}
          </Link>
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={rejectAll}
            className="px-6 py-2.5 text-sm font-medium rounded-full border border-warm-white/30 hover:bg-warm-white/10 transition-colors"
          >
            {t('cookies.reject')}
          </button>
          <button
            onClick={acceptAll}
            className="px-6 py-2.5 text-sm font-medium rounded-full bg-golden-orange hover:bg-golden-orange-dark transition-colors"
          >
            {t('cookies.accept')}
          </button>
        </div>
      </div>
    </div>
  )
}
