'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import ArticleForm from '@/components/admin/ArticleForm';
import Link from 'next/link';

export default function NewArticlePage() {
  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <Link
            href="/admin/articles"
            className="text-sm text-blue-400 hover:text-blue-300 hover:underline mb-4 inline-block"
          >
            ← Retour aux articles
          </Link>
          <h1 className="text-3xl font-bold text-slate-100">Nouvel Article</h1>
          <p className="text-slate-400 mt-1">Créer un nouvel article ou actualité</p>
        </div>

        {/* Form */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
          <ArticleForm mode="create" />
        </div>
      </div>
    </AdminLayout>
  );
}
