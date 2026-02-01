'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [yogaOpen, setYogaOpen] = useState(true);
  const [coachingOpen, setCoachingOpen] = useState(true);
  const [contentOpen, setContentOpen] = useState(true);

  // Keep section open if we're on a related page
  useEffect(() => {
    if (
      pathname.startsWith('/admin/yoga-individuel') ||
      pathname.startsWith('/admin/editions') ||
      pathname.startsWith('/admin/dashboard') ||
      pathname.startsWith('/admin/events')
    ) {
      setYogaOpen(true);
    }
    if (pathname.startsWith('/admin/coaching')) {
      setCoachingOpen(true);
    }
    if (pathname.startsWith('/admin/articles') || pathname.startsWith('/admin/resources')) {
      setContentOpen(true);
    }
  }, [pathname]);

  const yogaSection = {
    name: 'Yoga',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    children: [
      {
        name: 'Yoga individuel',
        href: '/admin/yoga-individuel',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ),
      },
      {
        name: 'Cours collectifs',
        href: '/admin/editions',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        ),
      },
      {
        name: 'Événements & Ateliers',
        href: '/admin/events',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        ),
      },
      {
        name: 'Santé & bien-être',
        href: '/admin/yoga-sante',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        ),
      },
    ],
  };

  const coachingSection = {
    name: 'Coaching',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    children: [
      {
        name: 'Coaching individuel',
        href: '/admin/coaching',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ),
      },
    ],
  };

  const contentSection = {
    name: 'Contenu',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    children: [
      {
        name: 'Articles',
        href: '/admin/articles',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
      },
      {
        name: 'Ressources',
        href: '/admin/resources',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        ),
      },
    ],
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      setLoggingOut(false);
    }
  };

  const isYogaActive =
    pathname.startsWith('/admin/yoga-individuel') ||
    pathname.startsWith('/admin/editions') ||
    pathname.startsWith('/admin/dashboard') ||
    pathname.startsWith('/admin/events') ||
    pathname.startsWith('/admin/yoga-sante');

  const isCoachingActive = pathname.startsWith('/admin/coaching');

  const isContentActive =
    pathname.startsWith('/admin/articles') ||
    pathname.startsWith('/admin/resources');

  return (
    <div className="flex flex-col h-full bg-slate-800 border-r border-slate-700">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <Link href="/admin/dashboard" className="block">
          <h1 className="text-xl font-bold text-slate-100">
            Transcendence Work
          </h1>
          <p className="text-xs text-slate-400 mt-1">Administration</p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {/* Yoga Section */}
        <div>
          <button
            onClick={() => setYogaOpen(!yogaOpen)}
            className={`
              w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors
              ${
                isYogaActive
                  ? 'bg-orange-400/10 text-orange-400'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-slate-100'
              }
            `}
          >
            <div className="flex items-center gap-3">
              {yogaSection.icon}
              <span className="font-medium">{yogaSection.name}</span>
            </div>
            <svg
              className={`w-4 h-4 transition-transform ${yogaOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Yoga Children */}
          {yogaOpen && (
            <div className="mt-1 ml-4 space-y-1">
              {yogaSection.children.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors
                      ${
                        isActive
                          ? 'bg-orange-400/20 text-orange-400'
                          : 'text-slate-400 hover:bg-slate-700 hover:text-slate-100'
                      }
                    `}
                  >
                    {item.icon}
                    <span className="text-sm">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Coaching Section */}
        <div>
          <button
            onClick={() => setCoachingOpen(!coachingOpen)}
            className={`
              w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors
              ${
                isCoachingActive
                  ? 'bg-purple-400/10 text-purple-400'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-slate-100'
              }
            `}
          >
            <div className="flex items-center gap-3">
              {coachingSection.icon}
              <span className="font-medium">{coachingSection.name}</span>
            </div>
            <svg
              className={`w-4 h-4 transition-transform ${coachingOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Coaching Children */}
          {coachingOpen && (
            <div className="mt-1 ml-4 space-y-1">
              {coachingSection.children.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors
                      ${
                        isActive
                          ? 'bg-purple-400/20 text-purple-400'
                          : 'text-slate-400 hover:bg-slate-700 hover:text-slate-100'
                      }
                    `}
                  >
                    {item.icon}
                    <span className="text-sm">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div>
          <button
            onClick={() => setContentOpen(!contentOpen)}
            className={`
              w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors
              ${
                isContentActive
                  ? 'bg-blue-400/10 text-blue-400'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-slate-100'
              }
            `}
          >
            <div className="flex items-center gap-3">
              {contentSection.icon}
              <span className="font-medium">{contentSection.name}</span>
            </div>
            <svg
              className={`w-4 h-4 transition-transform ${contentOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Content Children */}
          {contentOpen && (
            <div className="mt-1 ml-4 space-y-1">
              {contentSection.children.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors
                      ${
                        isActive
                          ? 'bg-blue-400/20 text-blue-400'
                          : 'text-slate-400 hover:bg-slate-700 hover:text-slate-100'
                      }
                    `}
                  >
                    {item.icon}
                    <span className="text-sm">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-slate-100 transition-colors disabled:opacity-50"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="font-medium">{loggingOut ? 'Déconnexion...' : 'Déconnexion'}</span>
        </button>
      </div>
    </div>
  );
}
