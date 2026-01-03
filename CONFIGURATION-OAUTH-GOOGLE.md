# 🔐 Configuration OAuth Google + Magic Link - Supabase

## 🎯 Ce que vous allez avoir

- ✅ **Connexion avec Google** (OAuth) - Un clic, aucun mot de passe
- ✅ **Magic Link** - Connexion par email, sans mot de passe
- ✅ Interface moderne avec les deux options
- ✅ Synchronisation automatique avec votre table User

---

## 📋 PARTIE 1 : Configuration OAuth Google

### Étape 1 : Créer un projet Google Cloud

1. Allez sur https://console.cloud.google.com/
2. Cliquez sur **"Sélectionner un projet"** en haut
3. Cliquez sur **"Nouveau projet"**
4. Nom du projet : `Echo Académie`
5. Cliquez sur **"Créer"**

### Étape 2 : Activer l'API OAuth

1. Dans le menu de gauche : **"APIs & Services"** > **"Credentials"**
2. Cliquez sur **"Configure Consent Screen"**
3. Sélectionnez **"External"** (pour autoriser tous les utilisateurs)
4. Cliquez sur **"Create"**

### Étape 3 : Remplir l'écran de consentement

**Application information** :
- **App name** : `Echo Académie`
- **User support email** : Votre email
- **Developer contact** : Votre email

Cliquez sur **"Save and Continue"** (laissez le reste par défaut)

### Étape 4 : Créer les identifiants OAuth

1. Retournez dans **"Credentials"**
2. Cliquez sur **"Create Credentials"** > **"OAuth client ID"**
3. **Application type** : `Web application`
4. **Name** : `Echo Académie Web`

**Authorized JavaScript origins** :
```
http://localhost:3000
https://votre-domaine.vercel.app
```

**Authorized redirect URIs** :
```
https://koqtnpjzbibinfxwbvky.supabase.co/auth/v1/callback
```

5. Cliquez sur **"Create"**
6. **NOTEZ** votre `Client ID` et `Client Secret` (vous en aurez besoin)

### Étape 5 : Configurer dans Supabase

1. Allez sur https://supabase.com/dashboard
2. Sélectionnez votre projet
3. **Authentication** > **Providers**
4. Activez **"Google"** (toggle ON)
5. Collez :
   - **Client ID** (de Google Cloud)
   - **Client Secret** (de Google Cloud)
6. Cliquez sur **"Save"**

---

## ✨ PARTIE 2 : Configuration Magic Link

### Étape 1 : Activer Magic Link dans Supabase

1. Allez sur https://supabase.com/dashboard
2. **Authentication** > **Providers**
3. Trouvez **"Email"** et assurez-vous qu'il est **activé**
4. Cochez **"Enable Magic Link"** ✅
5. Cliquez sur **"Save"**

### Étape 2 : Personnaliser le template d'email (Optionnel)

1. **Authentication** > **Email Templates**
2. Sélectionnez **"Magic Link"**
3. Personnalisez le template :

```html
<h2 style="font-family: Arial, sans-serif; color: #1a4d2e;">Connexion rapide à Echo Académie ✨</h2>

<p style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
  Bonjour,
</p>

<p style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
  Cliquez sur le bouton ci-dessous pour vous connecter instantanément à <strong>Echo Académie</strong> :
</p>

<div style="text-align: center; margin: 30px 0;">
  <a href="{{ .ConfirmationURL }}" style="background-color: #1a4d2e; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-family: Arial, sans-serif; font-weight: bold; font-size: 14px;">
    Se connecter
  </a>
</div>

<p style="font-family: Arial, sans-serif; color: #666; font-size: 13px; line-height: 1.6;">
  Ou copiez ce lien dans votre navigateur :
</p>
<p style="font-family: Arial, sans-serif; color: #1a4d2e; font-size: 12px; word-break: break-all;">
  {{ .ConfirmationURL }}
</p>

<div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 12px; margin: 20px 0;">
  <p style="font-family: Arial, sans-serif; color: #856404; font-size: 13px; margin: 0;">
    ⏱️ Ce lien expire dans <strong>1 heure</strong>.
  </p>
</div>

<hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

<p style="font-family: Arial, sans-serif; color: #999; font-size: 12px;">
  Si vous n'avez pas demandé cette connexion, ignorez cet email.
</p>

<p style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
  L'équipe <strong>Echo Académie</strong>
</p>
```

4. Cliquez sur **"Save"**

---

## 🧪 TEST

### Tester OAuth Google

1. Lancez votre app : `npm run dev`
2. Allez sur http://localhost:3000/auth/login
3. Cliquez sur **"Continuer avec Google"**
4. Sélectionnez votre compte Google
5. Vous devriez être redirigé vers `/academie` ✅

### Tester Magic Link

1. Allez sur http://localhost:3000/auth/login
2. Cliquez sur **"Connexion par email"** ou le lien Magic Link
3. Entrez votre email
4. Vérifiez votre boîte mail
5. Cliquez sur le lien
6. Vous devriez être connecté et redirigé vers `/academie` ✅

---

## 🎨 Interface utilisateur

Votre page de login aura maintenant **3 options** :

```
┌─────────────────────────────────┐
│   RETOUR DANS L'ÉCHO            │
│                                  │
│  [🔵 Continuer avec Google]     │
│                                  │
│  ─────── OU ───────             │
│                                  │
│  [Email]                         │
│  [Mot de passe]                  │
│  [Entrer dans l'Académie]       │
│                                  │
│  ─────── OU ───────             │
│                                  │
│  [✨ Connexion par email]        │
│  (Magic Link - Sans mot de passe)│
└─────────────────────────────────┘
```

---

## 🔐 Sécurité

### OAuth Google
- ✅ Aucun mot de passe à gérer
- ✅ Authentification par Google (très sécurisé)
- ✅ Synchronisation automatique des infos (nom, email, photo)

### Magic Link
- ✅ Pas de mot de passe à retenir
- ✅ Lien à usage unique
- ✅ Expire après 1 heure
- ✅ Sécurisé via email

---

## 🚨 Dépannage

### OAuth Google - "redirect_uri_mismatch"

Vérifiez que l'URL de callback dans Google Cloud est exactement :
```
https://koqtnpjzbibinfxwbvky.supabase.co/auth/v1/callback
```

### Magic Link - Email non reçu

1. Vérifiez les spams
2. Vérifiez que Magic Link est activé dans Supabase
3. Vérifiez votre configuration SMTP
4. Regardez les logs : **Authentication** > **Logs**

### L'utilisateur n'est pas créé dans la table User

Le trigger PostgreSQL s'occupera de créer automatiquement l'utilisateur dans votre table `User` lors de la première connexion OAuth ou Magic Link.

---

## ✅ Checklist de configuration

### OAuth Google
- [ ] Projet Google Cloud créé
- [ ] OAuth consent screen configuré
- [ ] Client ID et Secret créés
- [ ] Redirect URI ajoutée
- [ ] Provider activé dans Supabase
- [ ] Test réussi

### Magic Link
- [ ] Email provider activé dans Supabase
- [ ] Magic Link activé
- [ ] Template d'email personnalisé (optionnel)
- [ ] Test réussi

---

## 🎉 Félicitations !

Vos utilisateurs peuvent maintenant se connecter de **3 façons différentes** :
1. ✅ Email + Mot de passe (classique)
2. ✅ Google OAuth (moderne et rapide)
3. ✅ Magic Link (pas de mot de passe)

**Déployez sur Vercel et profitez !** 🚀

