# 🔒 Améliorations de Sécurité - Echo Académie

## 📊 État Actuel de la Sécurité

### ✅ Points Forts
- Authentification gérée par Supabase (leader du marché)
- Hashage bcrypt des mots de passe
- Protection SQL Injection (Prisma ORM)
- Protection XSS (React)
- HTTPS par défaut (Supabase + Vercel)
- Tokens JWT sécurisés
- Middleware de protection des routes

### ⚠️ Points à Améliorer

---

## 🔴 PRIORITÉ CRITIQUE

### 1. Rate Limiting (Limite de Tentatives)

**Risque** : Attaque par force brute sur les formulaires d'authentification

**Vulnérabilités actuelles** :
- Connexion : Pas de limite de tentatives
- Inscription : Pas de limite
- Reset password : Pas de limite
- API routes : Pas de rate limiting

**Solution A : Côté Supabase (Automatique)** ✅

Supabase inclut déjà un rate limiting de base :
- Max 30 requêtes par heure par IP pour l'auth
- Blocage automatique des IPs suspectes

**Vérification** :
1. Dashboard Supabase > Settings > Auth
2. Vérifiez que "Rate Limiting" est activé

**Solution B : Implémenter côté Next.js (Recommandé en plus)**

```bash
npm install @upstash/ratelimit @upstash/redis
```

**Exemple d'implémentation** :

```typescript
// src/lib/rate-limit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Créer un rate limiter
export const loginRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "15 m"), // 5 tentatives par 15 minutes
  analytics: true,
});

export const registerRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 h"), // 3 inscriptions par heure
  analytics: true,
});
```

**Services Redis gratuits** :
- Upstash (gratuit jusqu'à 10K requêtes/jour)
- Vercel KV (intégré avec Vercel)

---

### 2. Protection contre les Bots (CAPTCHA)

**Risque** : Création massive de comptes, spam

**Solution** : Ajouter un CAPTCHA

**Options** :
- **hCaptcha** (gratuit, respecte la vie privée)
- **Cloudflare Turnstile** (gratuit, invisible)
- **reCAPTCHA v3** (Google, score de confiance)

**Implémentation simple avec Cloudflare Turnstile** :

```bash
npm install @marsidev/react-turnstile
```

```tsx
// Sur les pages register et forgot-password
import { Turnstile } from '@marsidev/react-turnstile';

<Turnstile
  siteKey="votre-site-key"
  onSuccess={(token) => setCaptchaToken(token)}
/>
```

---

### 3. Validation des Emails (Email Verification Service)

**Risque** : Emails jetables, faux emails

**Solution** : Utiliser un service de validation

**Services** :
- **Abstract API** (gratuit 100 validations/mois)
- **EmailListVerify**
- **ZeroBounce**

**Blocage des emails jetables** :

```typescript
// Liste des domaines jetables
const disposableEmailDomains = [
  'tempmail.com', 'guerrillamail.com', '10minutemail.com',
  // ... ajouter d'autres
];

const isDisposableEmail = (email: string) => {
  const domain = email.split('@')[1];
  return disposableEmailDomains.includes(domain);
};
```

---

## 🟠 PRIORITÉ HAUTE

### 4. Protection CSRF Plus Stricte

**État actuel** : Next.js a une protection de base

**Amélioration** :

```typescript
// middleware.ts - Ajouter vérification origin
export async function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  
  // Bloquer les requêtes cross-origin suspectes
  if (origin && !origin.includes(host!)) {
    return new NextResponse('Forbidden', { status: 403 });
  }
  
  // ... reste du code
}
```

---

### 5. Audit des Logs et Monitoring

**Risque** : Attaques non détectées

**Solution** : Implémenter du logging

**Outils recommandés** :
- **Sentry** (gratuit 5K événements/mois) - Erreurs
- **LogRocket** (gratuit 1K sessions/mois) - Comportement utilisateur
- **Supabase Logs** - Déjà inclus !

**À logger** :
- Tentatives de connexion échouées
- Créations de compte
- Changements de mot de passe
- Accès admin
- Erreurs 500

---

### 6. Sécurité des Headers HTTP

**Configuration recommandée** :

```javascript
// next.config.mjs
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Protège contre clickjacking
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
          },
        ],
      },
    ];
  },
};
```

---

### 7. Validation Stricte des Entrées

**Amélioration du code actuel** :

```typescript
// Exemple pour l'inscription
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string()
    .email('Email invalide')
    .min(5, 'Email trop court')
    .max(255, 'Email trop long')
    .refine((email) => !isDisposableEmail(email), 
      'Les emails jetables ne sont pas autorisés'),
  
  password: z.string()
    .min(8, 'Minimum 8 caractères')
    .max(128, 'Maximum 128 caractères')
    .regex(/[A-Z]/, 'Doit contenir une majuscule')
    .regex(/[a-z]/, 'Doit contenir une minuscule')
    .regex(/[0-9]/, 'Doit contenir un chiffre')
    .regex(/[^A-Za-z0-9]/, 'Doit contenir un caractère spécial'),
  
  name: z.string()
    .min(2, 'Nom trop court')
    .max(100, 'Nom trop long')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Caractères invalides dans le nom'),
});
```

---

## 🟡 PRIORITÉ MOYENNE

### 8. Session Management

**Amélioration** :

```typescript
// Déconnexion automatique après inactivité
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

// Renouvellement automatique du token
supabase.auth.onAuthStateChange((event) => {
  if (event === 'TOKEN_REFRESHED') {
    console.log('Token renouvelé');
  }
});
```

---

### 9. Audit Trail (Historique des Actions)

**Créer une table d'audit** :

```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES "User"(id),
  action VARCHAR(100) NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Exemples d'actions à logger
-- 'LOGIN_SUCCESS', 'LOGIN_FAILED', 'PASSWORD_RESET_REQUESTED',
-- 'PASSWORD_CHANGED', 'EMAIL_CHANGED', 'ACCOUNT_DELETED'
```

---

### 10. Protection des Routes API

**Ajouter une vérification du rôle** :

```typescript
// Middleware pour les routes admin
export async function requireAdmin(req: NextRequest) {
  const session = await auth();
  
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 403 }
    );
  }
  
  return null; // OK
}
```

---

## 🟢 BONNES PRATIQUES SUPPLÉMENTAIRES

### 11. Sécurité des Cookies

```typescript
// Configuration des cookies Supabase
const supabase = createClient(url, key, {
  auth: {
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce', // Plus sécurisé que 'implicit'
    storage: {
      // Utiliser des cookies sécurisés
      getItem: (key) => getCookie(key),
      setItem: (key, value) => setCookie(key, value, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 jours
      }),
      removeItem: (key) => deleteCookie(key),
    },
  },
});
```

---

### 12. Protection des Données Sensibles

```typescript
// Masquer les données sensibles dans les logs
const sanitizeUser = (user: User) => {
  const { password, ...safeUser } = user;
  return safeUser;
};

// Ne jamais logger les mots de passe, tokens, etc.
console.log('User created:', sanitizeUser(user));
```

---

### 13. Dépendances et Mises à Jour

```bash
# Vérifier les vulnérabilités
npm audit

# Mettre à jour les dépendances
npm update

# Utiliser Dependabot (GitHub)
# Crée des PR automatiques pour les mises à jour de sécurité
```

---

### 14. Backups Automatiques

**Dans Supabase** :
- Backups quotidiens automatiques (plan gratuit : 7 jours)
- Point-in-time recovery (plans payants)

**Configuration recommandée** :
1. Dashboard Supabase > Settings > Backups
2. Activer les backups automatiques
3. Télécharger un backup manuel régulièrement

---

### 15. Environnements Séparés

```
Production  → Base Supabase production
Staging     → Base Supabase de test
Development → Base locale ou Supabase dev
```

**Ne jamais tester en production !**

---

## 📋 CHECKLIST DE SÉCURITÉ

### Immédiat (Avant déploiement)
- [ ] Vérifier que `.env` est dans `.gitignore`
- [ ] Activer rate limiting Supabase
- [ ] Configurer les headers de sécurité HTTP
- [ ] Tester toutes les routes avec des données malveillantes
- [ ] Vérifier les permissions des rôles (ADMIN vs STUDENT)
- [ ] Scanner les vulnérabilités : `npm audit`

### Court terme (1-2 semaines)
- [ ] Implémenter rate limiting côté app
- [ ] Ajouter CAPTCHA sur inscription
- [ ] Bloquer les emails jetables
- [ ] Configurer Sentry pour monitoring
- [ ] Créer une table d'audit_logs
- [ ] Implémenter session timeout

### Moyen terme (1-2 mois)
- [ ] Audit de sécurité professionnel
- [ ] Pénétration testing
- [ ] Politique de mots de passe plus stricte
- [ ] 2FA pour les admins
- [ ] Backups automatiques testés

---

## 🔗 RESSOURCES UTILES

- **OWASP Top 10** : https://owasp.org/www-project-top-ten/
- **Supabase Security** : https://supabase.com/docs/guides/auth/auth-security
- **Next.js Security** : https://nextjs.org/docs/app/building-your-application/configuring/security-headers

---

## 💰 COÛT DES AMÉLIORATIONS

| Service | Gratuit | Payant |
|---------|---------|--------|
| Rate Limiting (Upstash) | ✅ 10K req/jour | $0.20/100K req |
| CAPTCHA (Cloudflare) | ✅ Illimité | Gratuit |
| Monitoring (Sentry) | ✅ 5K events/mois | $26/mois |
| Supabase | ✅ 500MB + 2GB bandwidth | $25/mois (Pro) |

**Total pour démarrer : 0€** 🎉

---

## 🎯 MA RECOMMANDATION

**Pour lancer en production rapidement** :

**Priorité 1** (2-3 heures) :
1. Configurer les headers de sécurité HTTP ✅
2. Vérifier rate limiting Supabase ✅
3. Ajouter Sentry pour monitoring ✅
4. Valider strictement les entrées ✅

**Ensuite (1-2 semaines)** :
5. Implémenter rate limiting custom
6. Ajouter CAPTCHA
7. Créer audit_logs

**Votre app est déjà à ~70% de sécurité** grâce à Supabase et Next.js ! 🛡️

