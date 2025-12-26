/**
 * PAGE ADMIN - GESTION DU CURRICULUM
 * 
 * Vue principale pour la gestion du curriculum (ÉTAPE 1 : Arborescence).
 * Architecture "SaaS-Ready" : Ce composant Server ne fait QUE fetcher les données
 * via le service et les passe au composant Client. Aucune logique DB ici.
 * 
 * @route /admin/curriculum
 */

import React from 'react';
import { Badge } from '@/components/SharedUI';
import CurriculumManager from './CurriculumManager';
import { getAllPhases } from '@/lib/services/curriculum.service';

export default async function AdminCurriculumPage() {
  // Utilisation du service (pas de Prisma directement)
  // Optimisation : Ne pas charger les ressources (juste metadata)
  const phases = await getAllPhases({
    includeUnits: true,
    includeResources: false, // ⚡ Optimisation : Ne pas charger les ressources ici
    publishedOnly: false,
    orderBy: 'orderIndex'
  });

  return (
    <div className="p-10 space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <Badge className="mb-4">Gestion du Contenu</Badge>
          <h1 className="text-4xl font-light uppercase tracking-tighter">Architecture du <span className="font-serif italic text-[var(--emerald-deep)]">Curriculum.</span></h1>
        </div>
      </header>

      <CurriculumManager initialPhases={phases as any} />
    </div>
  );
}

