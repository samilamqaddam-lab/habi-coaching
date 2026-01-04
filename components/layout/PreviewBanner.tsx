'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function PreviewBanner() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-terracotta text-warm-white py-3 px-4 text-center shadow-lg">
      <div className="container-custom flex items-center justify-center gap-4 flex-wrap">
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <strong>Mode Prévisualisation</strong> - Vous voyez le contenu non publié
        </span>
        <Link
          href={`/api/disable-draft?slug=${encodeURIComponent(pathname)}`}
          className="bg-warm-white text-terracotta px-4 py-1 rounded-full text-sm font-medium hover:bg-opacity-90 transition-colors"
        >
          Quitter la prévisualisation
        </Link>
      </div>
    </div>
  )
}
