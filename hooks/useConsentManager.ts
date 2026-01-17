'use client'

import { useState, useEffect, useCallback } from 'react'

const CONSENT_KEY = 'transcendence_consent'

interface ConsentPreferences {
  analytics: boolean
  timestamp: number
}

export function useConsentManager() {
  const [consent, setConsent] = useState<'pending' | 'accepted' | 'rejected'>('pending')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem(CONSENT_KEY)
      if (stored) {
        const { analytics } = JSON.parse(stored)
        setConsent(analytics ? 'accepted' : 'rejected')
      }
    } catch {
      // Ignore parsing errors
    }
  }, [])

  const acceptAll = useCallback(() => {
    const prefs: ConsentPreferences = { analytics: true, timestamp: Date.now() }
    localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs))
    setConsent('accepted')
  }, [])

  const rejectAll = useCallback(() => {
    const prefs: ConsentPreferences = { analytics: false, timestamp: Date.now() }
    localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs))
    setConsent('rejected')
  }, [])

  const resetConsent = useCallback(() => {
    localStorage.removeItem(CONSENT_KEY)
    setConsent('pending')
  }, [])

  return {
    consent,
    mounted,
    acceptAll,
    rejectAll,
    resetConsent,
    hasAnalyticsConsent: consent === 'accepted',
  }
}
