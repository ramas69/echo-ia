/**
 * VALIDATION SCHEMAS - CURRICULUM
 * 
 * Schémas de validation Zod centralisés pour toutes les opérations CRUD du curriculum.
 * Ces schémas sont utilisés CÔTÉ CLIENT (React Hook Form) et CÔTÉ SERVEUR (API Routes)
 * pour garantir une validation cohérente et sécurisée.
 * 
 * @module validators/curriculum
 */

import { z } from 'zod';

// ============================================================================
// RESOURCE SCHEMAS
// ============================================================================

/**
 * Types de ressources disponibles dans l'arsenal pédagogique
 */
export const ResourceTypeEnum = z.enum([
  "NOTION_TEMPLATE",
  "MAKE_BLUEPRINT", 
  "PDF_GUIDE",
  "PROMPT_TEXT",
  "EXTERNAL_LINK",
  "FILE_DOWNLOAD"
]);

/**
 * Schéma de validation pour une ressource pédagogique
 */
export const resourceSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Le titre de la ressource est requis"),
  type: ResourceTypeEnum,
  url: z.string().url("URL invalide").nullable().optional().or(z.literal('')),
  textContent: z.string().nullable().optional(),
}).refine((data) => {
  // Validation conditionnelle : certains types nécessitent une URL, d'autres du texte
  if (['EXTERNAL_LINK', 'PDF_GUIDE', 'FILE_DOWNLOAD'].includes(data.type)) {
    return !!data.url && data.url !== '';
  }
  if (data.type === 'PROMPT_TEXT') {
    return !!data.textContent;
  }
  return true;
}, {
  message: "URL ou contenu texte requis selon le type de ressource",
  path: ["url"]
});

/**
 * Schéma pour créer une nouvelle ressource (sans ID)
 */
export const createResourceSchema = resourceSchema.omit({ id: true });

// ============================================================================
// UNIT SCHEMAS
// ============================================================================

/**
 * Providers vidéo supportés
 */
export const VideoProviderEnum = z.enum([
  "YOUTUBE",
  "MUX",
  "VIMEO"
]);

/**
 * Schéma de validation pour une unité pédagogique (leçon)
 */
export const unitSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  slug: z.string().min(3, "Le slug doit contenir au moins 3 caractères").regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Le slug doit être en minuscules avec des tirets uniquement"
  ),
  videoProvider: VideoProviderEnum.default("YOUTUBE"),
  videoId: z.string().min(1, "L'ID de la vidéo est requis"),
  durationSec: z.number().int().min(0, "La durée doit être positive").or(
    z.string().transform((val) => parseInt(val, 10))
  ),
  content: z.string().nullable().optional(),
  isPublished: z.boolean().default(false),
  resources: z.array(resourceSchema).default([]),
});

/**
 * Schéma pour créer une nouvelle unité (champs minimaux)
 */
export const createUnitSchema = z.object({
  phaseId: z.string().cuid("ID de phase invalide"),
  title: z.string().min(1, "Le titre est requis"),
  slug: z.string().min(1, "Le slug est requis"),
});

/**
 * Schéma pour mettre à jour une unité (tous les champs optionnels sauf ID)
 */
export const updateUnitSchema = unitSchema.partial().extend({
  id: z.string().cuid("ID d'unité invalide"),
});

/**
 * Schéma pour réorganiser les unités (drag & drop)
 */
export const reorderUnitsSchema = z.object({
  unitIds: z.array(z.string().cuid()).min(1, "Au moins une unité requise"),
});

/**
 * Schéma pour basculer le statut de publication
 */
export const togglePublishSchema = z.object({
  isPublished: z.boolean(),
});

// ============================================================================
// PHASE SCHEMAS
// ============================================================================

/**
 * Schéma de validation pour une phase (module/pilier)
 */
export const phaseSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  slug: z.string().min(3, "Le slug doit contenir au moins 3 caractères").regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Le slug doit être en minuscules avec des tirets uniquement"
  ),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  outcome: z.string().min(10, "Le résultat garanti doit contenir au moins 10 caractères"),
  thumbnailUrl: z.string().url("URL de thumbnail invalide").nullable().optional(),
  checkpointInstruction: z.string().nullable().optional(),
  isPublished: z.boolean().default(false),
});

/**
 * Schéma pour créer une nouvelle phase
 */
export const createPhaseSchema = phaseSchema.omit({ isPublished: true });

/**
 * Schéma pour mettre à jour une phase
 */
export const updatePhaseSchema = phaseSchema.partial().extend({
  id: z.string().cuid("ID de phase invalide"),
});

/**
 * Schéma pour réorganiser les phases (drag & drop)
 */
export const reorderPhasesSchema = z.object({
  phaseIds: z.array(z.string().cuid()).min(1, "Au moins une phase requise"),
});

// ============================================================================
// EXPORTS DE TYPES INFÉRÉS
// ============================================================================

export type ResourceType = z.infer<typeof ResourceTypeEnum>;
export type Resource = z.infer<typeof resourceSchema>;
export type CreateResource = z.infer<typeof createResourceSchema>;

export type VideoProvider = z.infer<typeof VideoProviderEnum>;
export type Unit = z.infer<typeof unitSchema>;
export type CreateUnit = z.infer<typeof createUnitSchema>;
export type UpdateUnit = z.infer<typeof updateUnitSchema>;

export type Phase = z.infer<typeof phaseSchema>;
export type CreatePhase = z.infer<typeof createPhaseSchema>;
export type UpdatePhase = z.infer<typeof updatePhaseSchema>;

