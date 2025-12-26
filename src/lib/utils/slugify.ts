/**
 * UTILITAIRE - GÉNÉRATION DE SLUGS
 * 
 * Fonction pour générer des slugs URL-safe à partir de titres.
 * 
 * @module utils/slugify
 */

/**
 * Convertit un texte en slug URL-safe
 * @param text - Texte à convertir
 * @returns Slug en minuscules avec tirets
 * 
 * @example
 * slugify("Le Second Cerveau") // "le-second-cerveau"
 * slugify("Activation #1 : AI") // "activation-1-ai"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    // Remplacer les accents
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Remplacer les espaces et underscores par des tirets
    .replace(/\s+/g, '-')
    .replace(/_/g, '-')
    // Supprimer tous les caractères non-alphanumériques sauf les tirets
    .replace(/[^\w\-]+/g, '')
    // Remplacer plusieurs tirets consécutifs par un seul
    .replace(/\-\-+/g, '-')
    // Supprimer les tirets en début et fin
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Génère un slug unique en ajoutant un timestamp si nécessaire
 * @param text - Texte à convertir
 * @param addTimestamp - Ajouter un timestamp pour garantir l'unicité
 * @returns Slug unique
 */
export function slugifyUnique(text: string, addTimestamp: boolean = false): string {
  const baseSlug = slugify(text);
  
  if (addTimestamp) {
    const timestamp = Date.now().toString(36); // Base 36 pour réduire la taille
    return `${baseSlug}-${timestamp}`;
  }
  
  return baseSlug;
}

