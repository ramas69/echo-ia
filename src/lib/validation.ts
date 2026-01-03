import { z } from 'zod';

// Liste des domaines d'emails jetables les plus courants
const disposableEmailDomains = [
  // Services d'emails temporaires populaires
  'tempmail.com',
  'guerrillamail.com',
  '10minutemail.com',
  'throwaway.email',
  'temp-mail.org',
  'mailinator.com',
  'maildrop.cc',
  'trashmail.com',
  'getnada.com',
  'fakeinbox.com',
  'yopmail.com',
  'sharklasers.com',
  'grr.la',
  'guerrillamail.biz',
  'guerrillamail.de',
  'spam4.me',
  'mintemail.com',
  'dispostable.com',
  'mailnesia.com',
  'mytemp.email',
  'tempinbox.com',
  'emailondeck.com',
  'tempr.email',
  'mohmal.com',
  'inboxkitten.com',
  'getairmail.com',
];

/**
 * Vérifie si un email utilise un domaine jetable
 */
export const isDisposableEmail = (email: string): boolean => {
  const domain = email.toLowerCase().split('@')[1];
  return disposableEmailDomains.includes(domain);
};

/**
 * Validation stricte du mot de passe
 * - Minimum 8 caractères
 * - Au moins une majuscule
 * - Au moins une minuscule  
 * - Au moins un chiffre
 * - Au moins un caractère spécial
 */
export const passwordSchema = z
  .string()
  .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
  .max(128, 'Le mot de passe ne peut pas dépasser 128 caractères')
  .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
  .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
  .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
  .regex(
    /[^A-Za-z0-9]/,
    'Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*...)'
  );

/**
 * Validation stricte de l'email
 * - Format email valide
 * - Longueur raisonnable
 * - Pas d'email jetable
 */
export const emailSchema = z
  .string()
  .email('Adresse email invalide')
  .min(5, 'L\'email est trop court')
  .max(255, 'L\'email est trop long')
  .toLowerCase()
  .refine((email) => !isDisposableEmail(email), {
    message: 'Les adresses email jetables ne sont pas autorisées',
  });

/**
 * Validation du nom
 * - Minimum 2 caractères
 * - Maximum 100 caractères
 * - Seulement lettres, espaces, apostrophes et tirets
 */
export const nameSchema = z
  .string()
  .min(2, 'Le nom doit contenir au moins 2 caractères')
  .max(100, 'Le nom ne peut pas dépasser 100 caractères')
  .regex(
    /^[a-zA-ZÀ-ÿ\s'-]+$/,
    'Le nom ne peut contenir que des lettres, espaces, apostrophes et tirets'
  )
  .trim();

/**
 * Schéma complet pour l'inscription
 */
export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
});

/**
 * Schéma pour la connexion
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Le mot de passe est requis'),
});

/**
 * Schéma pour la réinitialisation du mot de passe
 */
export const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

/**
 * Schéma pour forgot password
 */
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

