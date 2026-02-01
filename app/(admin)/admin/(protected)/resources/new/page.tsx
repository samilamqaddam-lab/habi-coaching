'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import ResourceForm from '@/components/admin/ResourceForm';
import Link from 'next/link';

export default function NewResourcePage() {
  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <Link
            href="/admin/resources"
            className="text-sm text-blue-400 hover:text-blue-300 hover:underline mb-4 inline-block"
          >
            ← Retour aux ressources
          </Link>
          <h1 className="text-3xl font-bold text-slate-100">Nouvelle Ressource</h1>
          <p className="text-slate-400 mt-1">Ajouter une vidéo, PDF ou autre ressource éducative</p>
        </div>

        {/* Form */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
          <ResourceForm mode="create" />
        </div>
      </div>
    </AdminLayout>
  );
}
