/**
 * TYPES TYPESCRIPT - CURRICULUM
 * 
 * Types TypeScript partagés pour le système de curriculum.
 * Ces types correspondent aux modèles Prisma avec des extensions pour l'UI.
 * 
 * @module types/curriculum
 */

import { Phase as PrismaPhase, Unit as PrismaUnit, Resource as PrismaResource } from '@prisma/client';

// ============================================================================
// EXTENDED TYPES WITH RELATIONS
// ============================================================================

/**
 * Ressource avec toutes ses relations
 */
export type ResourceWithRelations = PrismaResource;

/**
 * Unité avec ses ressources
 */
export type UnitWithResources = PrismaUnit & {
  resources: ResourceWithRelations[];
};

/**
 * Phase avec ses unités et ressources
 */
export type PhaseWithUnits = PrismaPhase & {
  units: UnitWithResources[];
};

/**
 * Phase complète avec toutes les métadonnées pour l'UI
 */
export type PhaseComplete = PhaseWithUnits & {
  _count?: {
    units: number;
  };
  _meta?: {
    totalDuration: number;
    publishedUnits: number;
  };
};

// ============================================================================
// UI-SPECIFIC TYPES
// ============================================================================

/**
 * Type pour la vue arborescence du curriculum (lecture seule optimisée)
 */
export type CurriculumTreeNode = {
  id: string;
  title: string;
  slug: string;
  orderIndex: number;
  isPublished: boolean;
  type: 'phase' | 'unit';
  children?: CurriculumTreeNode[];
  meta?: {
    videoProvider?: string;
    durationSec?: number;
    resourceCount?: number;
  };
};

/**
 * Statistiques d'une phase pour le dashboard admin
 */
export type PhaseStats = {
  phaseId: string;
  phaseTitle: string;
  totalUnits: number;
  publishedUnits: number;
  totalDuration: number;
  completionRate: number; // Pourcentage d'étudiants ayant complété
  averageTimeSpent: number; // Temps moyen passé (en secondes)
};

/**
 * Résumé du curriculum pour le dashboard
 */
export type CurriculumSummary = {
  totalPhases: number;
  totalUnits: number;
  publishedPhases: number;
  publishedUnits: number;
  totalDuration: number;
  lastUpdated: Date;
};

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

/**
 * Réponse standard pour les opérations de création
 */
export type CreateResponse<T> = {
  success: true;
  data: T;
  message: string;
};

/**
 * Réponse standard pour les erreurs
 */
export type ErrorResponse = {
  success: false;
  error: string;
  details?: Record<string, unknown>;
};

/**
 * Réponse d'une opération CRUD
 */
export type CRUDResponse<T> = CreateResponse<T> | ErrorResponse;

// ============================================================================
// FORM TYPES (pour React Hook Form)
// ============================================================================

/**
 * Données du formulaire de phase
 */
export type PhaseFormData = {
  title: string;
  slug: string;
  description: string;
  outcome: string;
  thumbnailUrl?: string | null;
  checkpointInstruction?: string | null;
  isPublished?: boolean;
};

/**
 * Données du formulaire d'unité
 */
export type UnitFormData = {
  title: string;
  slug: string;
  videoProvider: string;
  videoId: string;
  durationSec: number;
  content?: string | null;
  isPublished?: boolean;
  resources: ResourceFormData[];
};

/**
 * Données du formulaire de ressource
 */
export type ResourceFormData = {
  id?: string;
  title: string;
  type: string;
  url?: string | null;
  textContent?: string | null;
};

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Options de tri pour les queries
 */
export type SortOptions = {
  field: 'orderIndex' | 'title' | 'createdAt' | 'updatedAt';
  direction: 'asc' | 'desc';
};

/**
 * Options de filtrage pour le curriculum
 */
export type FilterOptions = {
  isPublished?: boolean;
  phaseId?: string;
  searchQuery?: string;
};

