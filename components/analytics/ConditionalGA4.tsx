'use client'

import { useConsentManager } from '@/hooks/useConsentManager'
import { GoogleAnalytics } from '@next/third-parties/google'

interface ConditionalGA4Props {
  gaId: string
}

export default function ConditionalGA4({ gaId }: ConditionalGA4Props) {
  const { hasAnalyticsConsent, mounted } = useConsentManager()

  // Only load GA4 if user has consented
  if (!mounted || !hasAnalyticsConsent) return null

  return <GoogleAnalytics gaId={gaId} />
}
