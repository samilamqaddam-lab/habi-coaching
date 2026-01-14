'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(true);

  // Keep section open if we're on a related page
  useEffect(() => {
    if (pathname.startsWith('/admin/dashboard') || pathname.startsWith('/admin/editions')) {
      setEventsOpen(true);
    }
  }, [pathname]);

  const eventsSection = {
    name: 'Événements et Programmes',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    children: [
      {
        name: 'Événements planifiés',
        href: '/admin/editions',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        ),
      },
      {
        name: 'Gestion des participations',
        href: '/admin/dashboard',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
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
      <nav className="flex-1 p-4 space-y-1">
        {/* Events & Programmes Section */}
        <div>
          <button
            onClick={() => setEventsOpen(!eventsOpen)}
            className={`
              w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors
              ${
                pathname.startsWith('/admin/dashboard') || pathname.startsWith('/admin/editions')
                  ? 'bg-slate-700/50 text-slate-100'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-slate-100'
              }
            `}
          >
            <div className="flex items-center gap-3">
              {eventsSection.icon}
              <span className="font-medium text-sm">{eventsSection.name}</span>
            </div>
            <svg
              className={`w-4 h-4 transition-transform ${eventsOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Children */}
          {eventsOpen && (
            <div className="mt-1 ml-4 space-y-1">
              {eventsSection.children.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors
                      ${
                        isActive
                          ? 'bg-orange-400/10 text-orange-400'
                          : 'text-slate-400 hover:bg-slate-700 hover:text-slate-100'
                      }
                    `}
                  >
                    {item.icon}
                    <span className="font-medium text-sm">{item.name}</span>
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
