'use client';

import AdminLayout from '@/components/admin/AdminLayout';

export default function YogaSantePage() {
  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl">
        <h1 className="text-2xl font-bold text-slate-100 mb-2">
          Santé & Bien-être
        </h1>
        <p className="text-slate-400 mb-8">
          Gestion des programmes de yoga pour la santé et le bien-être
        </p>

        {/* Placeholder content */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-12 text-center">
          <svg
            className="w-16 h-16 text-slate-600 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-slate-300 mb-2">
            Section en cours de développement
          </h2>
          <p className="text-slate-500 max-w-md mx-auto">
            Cette section permettra de gérer les programmes de yoga thérapeutique
            et les sessions de bien-être. Les fonctionnalités seront bientôt disponibles.
          </p>
        </div>
      </div>
      </div>
    </AdminLayout>
  );
}
