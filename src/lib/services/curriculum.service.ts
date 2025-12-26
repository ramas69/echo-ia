/**
 * CURRICULUM SERVICE - COUCHE DE SERVICE
 * 
 * Couche de service pour toutes les opérations liées au curriculum.
 * Cette couche encapsule toute la logique métier et les interactions avec Prisma.
 * 
 * PRINCIPES :
 * - Aucun composant UI ne doit importer Prisma directement
 * - Toutes les opérations DB passent par ce service
 * - Validation des données avant toute opération
 * - Gestion des erreurs centralisée
 * - Transactions atomiques pour les opérations complexes
 * 
 * @module services/curriculum
 */

import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import type { 
  PhaseWithUnits, 
  UnitWithResources,
  CurriculumSummary,
  PhaseStats,
  CurriculumTreeNode
} from '@/lib/types/curriculum';

// ============================================================================
// PHASE OPERATIONS
// ============================================================================

/**
 * Récupère toutes les phases avec leurs unités et ressources
 * @param options - Options de filtrage et tri
 * @returns Liste des phases avec relations
 */
export async function getAllPhases(options?: {
  includeUnits?: boolean;
  includeResources?: boolean;
  publishedOnly?: boolean;
  orderBy?: 'orderIndex' | 'title' | 'createdAt';
}): Promise<PhaseWithUnits[]> {
  const {
    includeUnits = true,
    includeResources = true,
    publishedOnly = false,
    orderBy = 'orderIndex'
  } = options || {};

  const phases = await prisma.phase.findMany({
    where: publishedOnly ? { isPublished: true } : undefined,
    include: {
      units: includeUnits ? {
        include: {
          resources: includeResources,
          _count: includeResources ? { select: { resources: true } } : undefined
        },
        where: publishedOnly ? { isPublished: true } : undefined,
        orderBy: { orderIndex: 'asc' }
      } : false,
      _count: includeUnits ? { select: { units: true } } : undefined
    },
    orderBy: { [orderBy]: 'asc' }
  });

  return phases as PhaseWithUnits[];
}

/**
 * Récupère une phase par son ID
 * @param phaseId - ID de la phase
 * @returns Phase avec relations ou null
 */
export async function getPhaseById(phaseId: string): Promise<PhaseWithUnits | null> {
  const phase = await prisma.phase.findUnique({
    where: { id: phaseId },
    include: {
      units: {
        include: {
          resources: true,
          _count: { select: { resources: true } }
        },
        orderBy: { orderIndex: 'asc' }
      },
      _count: { select: { units: true } }
    }
  });

  return phase as PhaseWithUnits | null;
}

/**
 * Récupère une phase par son slug
 * @param slug - Slug de la phase
 * @returns Phase avec relations ou null
 */
export async function getPhaseBySlug(slug: string): Promise<PhaseWithUnits | null> {
  const phase = await prisma.phase.findUnique({
    where: { slug },
    include: {
      units: {
        include: {
          resources: true
        },
        orderBy: { orderIndex: 'asc' }
      }
    }
  });

  return phase as PhaseWithUnits | null;
}

/**
 * Crée une nouvelle phase
 * @param data - Données de la phase
 * @returns Phase créée
 */
export async function createPhase(data: {
  title: string;
  slug: string;
  description: string;
  outcome: string;
  thumbnailUrl?: string | null;
  checkpointInstruction?: string | null;
}): Promise<PhaseWithUnits> {
  // Calculer le prochain orderIndex
  const lastPhase = await prisma.phase.findFirst({
    orderBy: { orderIndex: 'desc' },
    select: { orderIndex: true }
  });

  const newOrderIndex = (lastPhase?.orderIndex ?? 0) + 1;

  const phase = await prisma.phase.create({
    data: {
      ...data,
      orderIndex: newOrderIndex,
      isPublished: false
    },
    include: {
      units: {
        include: {
          resources: true
        }
      }
    }
  });

  return phase as PhaseWithUnits;
}

/**
 * Met à jour une phase existante
 * @param phaseId - ID de la phase
 * @param data - Données à mettre à jour
 * @returns Phase mise à jour
 */
export async function updatePhase(
  phaseId: string,
  data: Partial<{
    title: string;
    slug: string;
    description: string;
    outcome: string;
    thumbnailUrl: string | null;
    checkpointInstruction: string | null;
    isPublished: boolean;
  }>
): Promise<PhaseWithUnits> {
  const phase = await prisma.phase.update({
    where: { id: phaseId },
    data,
    include: {
      units: {
        include: {
          resources: true
        },
        orderBy: { orderIndex: 'asc' }
      }
    }
  });

  return phase as PhaseWithUnits;
}

/**
 * Supprime une phase (cascade: supprime aussi les unités et ressources)
 * @param phaseId - ID de la phase
 * @returns Phase supprimée
 */
export async function deletePhase(phaseId: string) {
  return await prisma.phase.delete({
    where: { id: phaseId }
  });
}

/**
 * Réorganise les phases (drag & drop)
 * @param phaseIds - Liste ordonnée des IDs de phases
 */
export async function reorderPhases(phaseIds: string[]): Promise<void> {
  // Solution en 2 étapes pour éviter la violation de contrainte unique
  await prisma.$transaction(async (tx) => {
    // Étape 1 : Mettre des orderIndex temporaires (négatifs) - en parallèle
    await Promise.all(
      phaseIds.map((id, i) =>
        tx.phase.update({
          where: { id },
          data: { orderIndex: -(i + 1) }
        })
      )
    );
    
    // Étape 2 : Mettre les orderIndex finaux - en parallèle
    await Promise.all(
      phaseIds.map((id, i) =>
        tx.phase.update({
          where: { id },
          data: { orderIndex: i + 1 }
        })
      )
    );
  });
}

// ============================================================================
// UNIT OPERATIONS
// ============================================================================

/**
 * Récupère toutes les unités d'une phase
 * @param phaseId - ID de la phase
 * @returns Liste des unités avec ressources
 */
export async function getUnitsByPhaseId(phaseId: string): Promise<UnitWithResources[]> {
  const units = await prisma.unit.findMany({
    where: { phaseId },
    include: {
      resources: true,
      _count: { select: { resources: true } }
    },
    orderBy: { orderIndex: 'asc' }
  });

  return units as UnitWithResources[];
}

/**
 * Récupère une unité par son ID
 * @param unitId - ID de l'unité
 * @returns Unité avec ressources ou null
 */
export async function getUnitById(unitId: string): Promise<UnitWithResources | null> {
  const unit = await prisma.unit.findUnique({
    where: { id: unitId },
    include: {
      resources: true,
      phase: true,
      _count: { select: { resources: true } }
    }
  });

  return unit as UnitWithResources | null;
}

/**
 * Récupère une unité par son slug
 * @param slug - Slug de l'unité
 * @returns Unité avec ressources ou null
 */
export async function getUnitBySlug(slug: string): Promise<UnitWithResources | null> {
  const unit = await prisma.unit.findUnique({
    where: { slug },
    include: {
      resources: true,
      phase: true
    }
  });

  return unit as UnitWithResources | null;
}

/**
 * Crée une nouvelle unité
 * @param data - Données de l'unité
 * @returns Unité créée
 */
export async function createUnit(data: {
  phaseId: string;
  title: string;
  slug: string;
  videoProvider?: string;
  videoId?: string;
  durationSec?: number;
  content?: string | null;
}): Promise<UnitWithResources> {
  // Calculer le prochain orderIndex pour cette phase
  const lastUnit = await prisma.unit.findFirst({
    where: { phaseId: data.phaseId },
    orderBy: { orderIndex: 'desc' },
    select: { orderIndex: true }
  });

  const newOrderIndex = (lastUnit?.orderIndex ?? 0) + 1;

  const unit = await prisma.unit.create({
    data: {
      ...data,
      videoProvider: data.videoProvider || 'YOUTUBE',
      videoId: data.videoId || '',
      durationSec: data.durationSec || 0,
      orderIndex: newOrderIndex,
      isPublished: false
    },
    include: {
      resources: true
    }
  });

  return unit as UnitWithResources;
}

/**
 * Met à jour une unité avec ses ressources (transaction atomique)
 * @param unitId - ID de l'unité
 * @param data - Données de l'unité
 * @param resources - Liste des ressources (remplace toutes les existantes)
 * @returns Unité mise à jour
 */
export async function updateUnitWithResources(
  unitId: string,
  data: Partial<{
    title: string;
    slug: string;
    videoProvider: string;
    videoId: string;
    durationSec: number;
    content: string | null;
    isPublished: boolean;
  }>,
  resources?: Array<{
    title: string;
    type: string;
    url?: string | null;
    textContent?: string | null;
  }>
): Promise<UnitWithResources> {
  const unit = await prisma.$transaction(async (tx) => {
    // 1. Si des ressources sont fournies, supprimer les anciennes
    if (resources !== undefined) {
      await tx.resource.deleteMany({
        where: { unitId }
      });
    }

    // 2. Mettre à jour l'unité et créer les nouvelles ressources
    return await tx.unit.update({
      where: { id: unitId },
      data: {
        ...data,
        resources: resources ? {
          create: resources.map(r => ({
            title: r.title,
            type: r.type as any,
            url: r.url,
            textContent: r.textContent
          }))
        } : undefined
      },
      include: {
        resources: true,
        phase: true
      }
    });
  });

  return unit as UnitWithResources;
}

/**
 * Supprime une unité
 * @param unitId - ID de l'unité
 */
export async function deleteUnit(unitId: string) {
  return await prisma.unit.delete({
    where: { id: unitId }
  });
}

/**
 * Réorganise les unités d'une phase (drag & drop)
 * @param unitIds - Liste ordonnée des IDs d'unités
 */
export async function reorderUnits(unitIds: string[]): Promise<void> {
  // Solution en 2 étapes pour éviter la violation de contrainte unique
  await prisma.$transaction(async (tx) => {
    // Étape 1 : Mettre des orderIndex temporaires (négatifs) - en parallèle
    await Promise.all(
      unitIds.map((id, i) =>
        tx.unit.update({
          where: { id },
          data: { orderIndex: -(i + 1) }
        })
      )
    );
    
    // Étape 2 : Mettre les orderIndex finaux - en parallèle
    await Promise.all(
      unitIds.map((id, i) =>
        tx.unit.update({
          where: { id },
          data: { orderIndex: i + 1 }
        })
      )
    );
  });
}

/**
 * Bascule le statut de publication d'une unité
 * @param unitId - ID de l'unité
 * @param isPublished - Nouveau statut
 */
export async function toggleUnitPublish(unitId: string, isPublished: boolean) {
  return await prisma.unit.update({
    where: { id: unitId },
    data: { isPublished }
  });
}

// ============================================================================
// RESOURCE OPERATIONS
// ============================================================================

/**
 * Crée une ressource pour une unité
 * @param unitId - ID de l'unité
 * @param data - Données de la ressource
 */
export async function createResource(
  unitId: string,
  data: {
    title: string;
    type: string;
    url?: string | null;
    textContent?: string | null;
  }
) {
  return await prisma.resource.create({
    data: {
      ...data,
      unitId,
      type: data.type as any
    }
  });
}

/**
 * Supprime une ressource
 * @param resourceId - ID de la ressource
 */
export async function deleteResource(resourceId: string) {
  return await prisma.resource.delete({
    where: { id: resourceId }
  });
}

// ============================================================================
// ANALYTICS & STATS
// ============================================================================

/**
 * Récupère un résumé complet du curriculum
 * @returns Statistiques globales
 */
export async function getCurriculumSummary(): Promise<CurriculumSummary> {
  const [phases, units, totalDuration] = await Promise.all([
    prisma.phase.findMany({
      select: { isPublished: true }
    }),
    prisma.unit.findMany({
      select: { isPublished: true, durationSec: true }
    }),
    prisma.unit.aggregate({
      _sum: { durationSec: true }
    })
  ]);

  const lastUpdatedPhase = await prisma.phase.findFirst({
    orderBy: { updatedAt: 'desc' },
    select: { updatedAt: true }
  });

  return {
    totalPhases: phases.length,
    publishedPhases: phases.filter(p => p.isPublished).length,
    totalUnits: units.length,
    publishedUnits: units.filter(u => u.isPublished).length,
    totalDuration: totalDuration._sum.durationSec || 0,
    lastUpdated: lastUpdatedPhase?.updatedAt || new Date()
  };
}

/**
 * Génère l'arborescence complète du curriculum (pour la vue hiérarchique)
 * @param publishedOnly - Ne récupérer que le contenu publié
 * @returns Arborescence hiérarchique
 */
export async function getCurriculumTree(publishedOnly = false): Promise<CurriculumTreeNode[]> {
  const phases = await getAllPhases({
    includeUnits: true,
    includeResources: true,
    publishedOnly
  });

  return phases.map(phase => ({
    id: phase.id,
    title: phase.title,
    slug: phase.slug,
    orderIndex: phase.orderIndex,
    isPublished: phase.isPublished,
    type: 'phase' as const,
    children: phase.units.map(unit => ({
      id: unit.id,
      title: unit.title,
      slug: unit.slug,
      orderIndex: unit.orderIndex,
      isPublished: unit.isPublished,
      type: 'unit' as const,
      meta: {
        videoProvider: unit.videoProvider,
        durationSec: unit.durationSec,
        resourceCount: unit.resources.length
      }
    }))
  }));
}

/**
 * Calcule les statistiques d'une phase
 * @param phaseId - ID de la phase
 * @returns Statistiques détaillées
 */
export async function getPhaseStats(phaseId: string): Promise<PhaseStats | null> {
  const phase = await getPhaseById(phaseId);
  if (!phase) return null;

  const totalUnits = phase.units.length;
  const publishedUnits = phase.units.filter(u => u.isPublished).length;
  const totalDuration = phase.units.reduce((acc, u) => acc + u.durationSec, 0);

  // Calcul du taux de complétion (utilisateurs ayant complété toutes les unités)
  const completedUsers = await prisma.userPhaseStatus.count({
    where: {
      phaseId,
      status: 'COMPLETED'
    }
  });

  const totalUsers = await prisma.user.count({
    where: { role: 'STUDENT' }
  });

  const completionRate = totalUsers > 0 ? (completedUsers / totalUsers) * 100 : 0;

  return {
    phaseId: phase.id,
    phaseTitle: phase.title,
    totalUnits,
    publishedUnits,
    totalDuration,
    completionRate,
    averageTimeSpent: 0 // À implémenter avec un système de tracking
  };
}

