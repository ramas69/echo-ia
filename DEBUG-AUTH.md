# 🔐 DEBUG - Problème d'authentification

## Problème identifié

D'après les logs, l'utilisateur `rama@neuf.fr` n'a pas été trouvé dans la base de données lors de la tentative de connexion.

```
Tentative de connexion pour: rama@neuf.fr
Utilisateur trouvé: false
Utilisateur non trouvé ou pas de mot de passe
```

## Améliorations apportées

### 1. API d'inscription (`/src/app/api/register/route.ts`)
- ✅ Ajout de logs détaillés avec emojis pour suivre le processus
- ✅ Nettoyage des données (trim + lowercase pour email)
- ✅ Vérification du hachage du mot de passe
- ✅ Logs de confirmation avec détails du hash

### 2. Authentification (`/src/auth.ts`)
- ✅ Ajout de logs détaillés pour la connexion
- ✅ Nettoyage des données (trim + lowercase pour email)
- ✅ Logs de comparaison des mots de passe
- ✅ Messages d'erreur plus explicites

### 3. Script de vérification (`/prisma/check-user.ts`)
- ✅ Nouveau script pour vérifier si un utilisateur existe
- ✅ Affiche tous les détails de l'utilisateur
- ✅ Liste tous les utilisateurs si non trouvé

## Comment déboguer

### Étape 1 : Vérifier si l'utilisateur existe

```bash
npx tsx prisma/check-user.ts rama@neuf.fr
```

Ou pour voir tous les utilisateurs :

```bash
npx tsx prisma/check-user.ts test@test.com
```

### Étape 2 : Réessayer l'inscription

1. Allez sur `/auth/register`
2. Inscrivez-vous avec un nouvel email (ou le même si pas encore créé)
3. Regardez les logs du serveur (terminal où `npm run dev` tourne)
4. Vous devriez voir :

```
🔵 INSCRIPTION - Tentative: { email: 'test@test.com', passwordLength: 8, name: 'Test' }
🔐 INSCRIPTION - Hachage du mot de passe...
✅ INSCRIPTION - Mot de passe haché, longueur hash: 60
✅ INSCRIPTION - Utilisateur créé avec succès: { id: '...', email: '...', hasPassword: true, passwordHashLength: 60 }
```

### Étape 3 : Réessayer la connexion

1. Allez sur `/auth/login`
2. Connectez-vous avec les mêmes identifiants
3. Regardez les logs du serveur
4. Vous devriez voir :

```
🔵 CONNEXION - Tentative: { email: 'test@test.com', passwordLength: 8 }
🔍 CONNEXION - Utilisateur trouvé: true
🔐 CONNEXION - Vérification du mot de passe...
✅ CONNEXION - Mot de passe valide
✅ CONNEXION - Authentification réussie pour: test@test.com
```

## Causes possibles du problème

### 1. L'inscription n'a pas fonctionné
- L'utilisateur n'a jamais été créé dans la base de données
- Vérifier avec le script `check-user.ts`

### 2. Email différent
- L'email utilisé à l'inscription était différent (espaces, majuscules)
- Maintenant corrigé avec `.trim().toLowerCase()`

### 3. Mot de passe avec espaces
- Le mot de passe contenait des espaces au début/fin
- Maintenant corrigé avec `.trim()`

### 4. Problème de base de données
- La connexion à PostgreSQL a échoué
- Vérifier que le serveur tourne : `npm run dev`

## Solution rapide : Créer l'utilisateur manuellement

Si le problème persiste, créez l'utilisateur directement :

```bash
# Créer un script temporaire
cat > prisma/create-test-user.ts << 'EOF'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = "rama@neuf.fr";
  const password = "votre_mot_de_passe_ici"; // REMPLACER
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: { 
      password: hashedPassword,
    },
    create: {
      email,
      name: "Rama",
      password: hashedPassword,
      role: "STUDENT"
    }
  });

  console.log("✅ Utilisateur créé/mis à jour:", user.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
EOF

# Exécuter
npx tsx prisma/create-test-user.ts
```

## Pas de confirmation par email

**Non**, il n'y a pas de système de confirmation par email dans cette application. L'inscription crée directement l'utilisateur et vous pouvez vous connecter immédiatement après.

## Vérification finale

Après avoir suivi ces étapes, vous devriez pouvoir :
1. ✅ S'inscrire avec un email/mot de passe
2. ✅ Voir les logs détaillés dans le terminal
3. ✅ Se connecter immédiatement après
4. ✅ Être redirigé vers `/academie` (ou `/admin` si admin)

