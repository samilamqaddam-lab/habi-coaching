'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ResourceForm from '@/components/admin/ResourceForm';
import Link from 'next/link';
import type { Resource } from '@/lib/types';

export default function EditResourcePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [resource, setResource] = useState<Resource | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResource() {
      try {
        const response = await fetch(`/api/admin/resources/${id}`);

        if (!response.ok) {
          throw new Error('Ressource non trouvée');
        }

        const data = await response.json();
        setResource(data.resource);
      } catch (err) {
        console.error('Error fetching resource:', err);
        setError(err instanceof Error ? err.message : 'Erreur de chargement');
      } finally {
        setIsLoading(false);
      }
    }

    fetchResource();
  }, [id]);

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
          <h1 className="text-3xl font-bold text-slate-100">Modifier la Ressource</h1>
          {resource && <p className="text-slate-400 mt-1">{resource.title}</p>}
        </div>

        {/* Content */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-slate-400 mt-4">Chargement de la ressource...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400">{error}</p>
              <Link
                href="/admin/resources"
                className="text-blue-400 hover:underline mt-4 inline-block"
              >
                Retour aux ressources
              </Link>
            </div>
          ) : resource ? (
            <ResourceForm resource={resource} mode="edit" />
          ) : null}
        </div>
      </div>
    </AdminLayout>
  );
}
