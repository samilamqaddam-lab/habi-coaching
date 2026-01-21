import Link from 'next/link';
import AdminNav from '@/components/admin/AdminNav';
import EventForm from '@/components/admin/EventForm';

export default function NewEventPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <AdminNav />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8 max-w-4xl">
          {/* Header with back button */}
          <div className="mb-8">
            <Link
              href="/admin/events"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors mb-4"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour aux événements
            </Link>
            <h1 className="text-3xl font-bold text-slate-100 mb-2">
              Nouvel Événement
            </h1>
            <p className="text-slate-400">
              Créez un atelier, une introduction ou une session découverte
            </p>
          </div>

          {/* Form */}
          <EventForm />
        </div>
      </div>
    </div>
  );
}
