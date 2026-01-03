# 🚀 Migration vers Supabase - Guide Complet

## ✅ ÉTAPE 1 : Créer le projet Supabase

1. Allez sur https://supabase.com
2. Créez un compte / Connectez-vous
3. Cliquez sur "New Project"
4. Remplissez :
   - **Name** : `echo-lms`
   - **Database Password** : [Choisissez un mot de passe fort - NOTEZ-LE !]
   - **Region** : Europe (Frankfurt) ou US (selon votre localisation)
   - **Pricing Plan** : Free

⏱️ Attendez 2-3 minutes que le projet soit créé

---

## 📋 ÉTAPE 2 : Récupérer l'URL de connexion

1. Dans le dashboard Supabase, allez dans **Settings** (⚙️ en bas à gauche)
2. Cliquez sur **Database** dans le menu
3. Scrollez jusqu'à **Connection string**
4. Sélectionnez l'onglet **"URI"** (pas Pooler)
5. Copiez l'URL qui ressemble à :
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
6. **IMPORTANT** : Remplacez `[YOUR-PASSWORD]` par votre mot de passe

---

## 🔧 ÉTAPE 3 : Mettre à jour votre .env

Ouvrez votre fichier `.env` et remplacez :

```bash
# AVANT (local)
DATABASE_URL="postgresql://rama@localhost:5432/echo_db"

# APRÈS (Supabase)
DATABASE_URL="postgresql://postgres.xxxxx:VOTRE_MOT_DE_PASSE@db.xxxxx.supabase.co:5432/postgres"
```

**⚠️ N'oubliez pas de remplacer le mot de passe dans l'URL !**

---

## 🗄️ ÉTAPE 4 : Migrer le schéma vers Supabase

Une fois le .env mis à jour, exécutez :

```bash
# 1. Réinitialiser Prisma Client
npx prisma generate

# 2. Pousser le schéma vers Supabase
npx prisma db push

# 3. Vérifier que tout est OK
npx prisma studio
```

---

## 📊 ÉTAPE 5 : Migrer les données (optionnel)

Si vous voulez récupérer vos données locales :

### Option A : Réinitialiser avec le seed
```bash
npm run seed
```

### Option B : Exporter/Importer manuellement
1. Exportez depuis la base locale :
   ```bash
   pg_dump -U rama echo_db > backup.sql
   ```

2. Importez vers Supabase via leur interface :
   - Allez dans **Database** > **SQL Editor**
   - Collez le contenu de `backup.sql`
   - Exécutez

---

## 🧪 ÉTAPE 6 : Tester la connexion

```bash
# Démarrer le serveur
npm run dev
```

Testez :
- ✅ Connexion
- ✅ Inscription
- ✅ Accès à l'académie
- ✅ Accès admin

---

## 🔐 ÉTAPE 7 : Sécurité

### Pour le développement local :
Créez un fichier `.env.local` :
```bash
DATABASE_URL="postgresql://rama@localhost:5432/echo_db"
```

### Pour la production (Vercel) :
1. Allez dans les settings de votre projet Vercel
2. Ajoutez la variable `DATABASE_URL` avec l'URL Supabase
3. Redéployez

---

## ✨ Avantages de Supabase

- ✅ **Backup automatique** quotidien
- ✅ **Accessible de partout**
- ✅ **Dashboard d'administration** inclus
- ✅ **SSL/TLS** par défaut
- ✅ **Évolutif** : passe de gratuit à payant facilement
- ✅ **Support** : communauté active

---

## 🚨 En cas de problème

### Erreur de connexion ?
- Vérifiez que le mot de passe est correct dans l'URL
- Vérifiez que le projet Supabase est bien démarré (vert)

### Erreur "Too many connections" ?
- Utilisez l'URL **Pooler** au lieu de l'URL directe :
  ```
  DATABASE_URL="postgresql://postgres.xxxxx:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
  ```

### Besoin d'aide ?
- Consultez la doc Supabase : https://supabase.com/docs
- Consultez la doc Prisma : https://www.prisma.io/docs

---

## 📝 Checklist finale

- [ ] Projet Supabase créé
- [ ] URL de connexion récupérée
- [ ] Mot de passe remplacé dans l'URL
- [ ] Fichier .env mis à jour
- [ ] `npx prisma db push` exécuté avec succès
- [ ] Serveur local testé et fonctionnel
- [ ] Données migrées (si nécessaire)
- [ ] Variable ajoutée sur Vercel (si déployé)

---

🎉 **Félicitations ! Votre application est maintenant connectée à Supabase !**

