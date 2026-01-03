# 🚀 Déploiement sur Vercel avec Supabase

## ✅ PRÉ-REQUIS (déjà fait)
- [x] Base Supabase configurée
- [x] Schéma migré
- [x] Données de test insérées
- [x] Application testée en local

---

## 📋 ÉTAPE 1 : Préparer le code

### 1.1 Commiter les changements

```bash
git add .
git commit -m "🚀 Migration vers Supabase terminée

- Ajout de directUrl dans schema.prisma
- Configuration pooling Supabase
- Migration et seed réussis"
git push origin main
```

---

## 🌐 ÉTAPE 2 : Déployer sur Vercel

### 2.1 Aller sur Vercel

1. Allez sur https://vercel.com
2. Connectez-vous avec votre compte GitHub
3. Cliquez sur **"Add New..."** > **"Project"**
4. Sélectionnez votre repo `echo`
5. Cliquez sur **"Import"**

### 2.2 Configurer les variables d'environnement

**AVANT de cliquer sur "Deploy"**, ajoutez ces variables :

#### Variables à ajouter :

```bash
DATABASE_URL
postgresql://postgres.koqtnpjzbibinfxwbvky:[YOUR-PASSWORD]@aws-1-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true

DIRECT_URL
postgresql://postgres.koqtnpjzbibinfxwbvky:[YOUR-PASSWORD]@aws-1-eu-central-1.pooler.supabase.com:5432/postgres

NEXTAUTH_SECRET
[Générez avec: openssl rand -base64 32]

NEXTAUTH_URL
https://votre-domaine.vercel.app
```

⚠️ **Important** : Remplacez `[YOUR-PASSWORD]` par votre vrai mot de passe Supabase

### 2.3 Build Settings (normalement détectés automatiquement)

- **Framework Preset** : Next.js
- **Build Command** : `npm run build`
- **Output Directory** : `.next`
- **Install Command** : `npm install`

### 2.4 Déployer

Cliquez sur **"Deploy"** et attendez 2-3 minutes.

---

## 🔧 ÉTAPE 3 : Après le premier déploiement

### 3.1 Mettre à jour NEXTAUTH_URL

1. Notez votre URL Vercel (ex: `https://echo-xxxxx.vercel.app`)
2. Retournez dans **Settings** > **Environment Variables**
3. Modifiez `NEXTAUTH_URL` avec votre vraie URL
4. Redéployez (Vercel le fait automatiquement)

### 3.2 Configurer le domaine personnalisé (optionnel)

1. Allez dans **Settings** > **Domains**
2. Ajoutez votre domaine personnalisé
3. Suivez les instructions pour configurer le DNS

---

## ✅ ÉTAPE 4 : Vérification post-déploiement

Testez sur votre URL de production :

- [ ] Page d'accueil charge correctement
- [ ] Inscription fonctionne
- [ ] Connexion fonctionne
- [ ] Les piliers s'affichent
- [ ] Les vidéos se lancent
- [ ] Le passage à l'unité suivante fonctionne

---

## 🐛 EN CAS DE PROBLÈME

### Erreur "Database connection failed"
➡️ Vérifiez que le mot de passe dans `DATABASE_URL` est correct

### Erreur "NEXTAUTH_URL is not defined"
➡️ Ajoutez la variable dans Vercel Settings > Environment Variables

### Erreur de build
➡️ Vérifiez les logs de build dans Vercel
➡️ Assurez-vous que `npm run build` fonctionne en local

### Données manquantes
➡️ Le seed a été exécuté sur votre base Supabase, les données sont déjà là

---

## 📊 Surveiller votre application

### Dans Vercel :
- **Analytics** : Voir le trafic
- **Logs** : Déboguer les erreurs
- **Speed Insights** : Optimiser les performances

### Dans Supabase :
- **Database** > **Table Editor** : Voir vos données
- **SQL Editor** : Requêtes personnalisées
- **Logs** : Surveiller les connexions

---

## 🎯 CHECKLIST FINALE

- [ ] Code commité et pushé sur GitHub
- [ ] Projet importé sur Vercel
- [ ] Variables d'environnement configurées
- [ ] Déploiement réussi
- [ ] NEXTAUTH_URL mise à jour
- [ ] Tests en production passés
- [ ] Domaine personnalisé configuré (optionnel)

---

## 🎉 Félicitations !

Votre application Echo LMS est maintenant en production avec :
- ✅ Backend sur Supabase (scalable)
- ✅ Frontend sur Vercel (edge network mondial)
- ✅ Déploiements automatiques (à chaque push GitHub)
- ✅ SSL/HTTPS automatique

**Prochaines étapes** :
1. Configurez les emails (Resend, SendGrid)
2. Ajoutez Google Analytics
3. Configurez les backups automatiques Supabase
4. Ajoutez un monitoring (Sentry, LogRocket)

