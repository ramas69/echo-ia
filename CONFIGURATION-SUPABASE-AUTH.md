# ⚙️ Configuration de Supabase Auth - Dashboard

## 🎯 Configuration obligatoire avant de tester

Vous devez configurer Supabase Auth dans votre dashboard pour que l'inscription et la confirmation par email fonctionnent.

---

## 📋 ÉTAPE 1 : Activer l'authentification par Email

### 1.1 Accéder aux paramètres

1. Ouvrez votre **dashboard Supabase** : https://supabase.com/dashboard
2. Sélectionnez votre projet **"echo"**
3. Dans le menu de gauche, cliquez sur **"Authentication"** (🔒)
4. Cliquez sur **"Providers"** dans le sous-menu

### 1.2 Configurer Email Provider

1. Trouvez **"Email"** dans la liste des providers
2. Assurez-vous qu'il est **activé** (toggle en vert)
3. **IMPORTANT** : Cochez **"Confirm email"** ✅
4. Cliquez sur **"Save"**

---

## 📧 ÉTAPE 2 : Configurer les URLs de redirection

### 2.1 Définir l'URL du site

1. Restez dans **"Authentication"**
2. Cliquez sur **"URL Configuration"** dans le sous-menu
3. Configurez :

**Site URL** (URL de base de votre application) :
- Pour le développement local : `http://localhost:3001`
- Pour la production : `https://votre-domaine.vercel.app`

**Redirect URLs** (URLs autorisées pour les redirections) :

Ajoutez ces URLs (une par ligne) :

```
http://localhost:3001/**
http://localhost:3000/**
https://votre-domaine.vercel.app/**
```

4. Cliquez sur **"Save"**

---

## 📝 ÉTAPE 3 : Personnaliser les templates d'emails (Optionnel)

### 3.1 Accéder aux templates

1. Dans **"Authentication"**, cliquez sur **"Email Templates"**
2. Sélectionnez **"Confirm signup"**

### 3.2 Template recommandé

Remplacez le template par défaut par celui-ci :

```html
<h2 style="font-family: Arial, sans-serif; color: #1a4d2e;">Bienvenue sur Echo Académie ! 🎉</h2>

<p style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
  Bonjour,
</p>

<p style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
  Merci de vous être inscrit à <strong>Echo Académie</strong> ! Pour activer votre compte et commencer votre formation, cliquez sur le bouton ci-dessous :
</p>

<div style="text-align: center; margin: 30px 0;">
  <a href="{{ .ConfirmationURL }}" style="background-color: #1a4d2e; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-family: Arial, sans-serif; font-weight: bold; font-size: 14px;">
    Confirmer mon email
  </a>
</div>

<p style="font-family: Arial, sans-serif; color: #666; font-size: 13px; line-height: 1.6;">
  Ou copiez ce lien dans votre navigateur :
</p>
<p style="font-family: Arial, sans-serif; color: #1a4d2e; font-size: 12px; word-break: break-all;">
  {{ .ConfirmationURL }}
</p>

<p style="font-family: Arial, sans-serif; color: #999; font-size: 12px; margin-top: 30px;">
  ⏱️ Ce lien expire dans <strong>24 heures</strong>.
</p>

<hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

<p style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
  À bientôt dans l'Académie,<br/>
  <strong>L'équipe Echo</strong>
</p>

<p style="font-family: Arial, sans-serif; color: #999; font-size: 11px; margin-top: 20px;">
  Si vous n'avez pas demandé cette inscription, vous pouvez ignorer cet email en toute sécurité.
</p>
```

3. Cliquez sur **"Save"**

---

## 🔑 ÉTAPE 4 : Configurer SMTP (Recommandé pour la production)

Par défaut, Supabase utilise son propre SMTP limité à **4 emails/heure** (plan gratuit).

### Option A : Utiliser Resend (Gratuit jusqu'à 3000 emails/mois)

1. Créez un compte sur https://resend.com
2. Obtenez votre **API Key**
3. Dans Supabase :
   - **Authentication** > **Settings** > **SMTP Settings**
   - **Enable Custom SMTP** : ✅
   - **Host** : `smtp.resend.com`
   - **Port** : `465`
   - **Username** : `resend`
   - **Password** : Votre API Key Resend
   - **Sender email** : `noreply@votredomaine.com`
   - **Sender name** : `Echo Académie`
4. Cliquez sur **"Save"**
5. Testez avec **"Send test email"**

### Option B : Autres services SMTP

- **SendGrid** : https://sendgrid.com
- **Mailgun** : https://www.mailgun.com
- **AWS SES** : https://aws.amazon.com/ses/

---

## ✅ ÉTAPE 5 : Vérification

### Checklist de configuration

- [ ] Email provider activé
- [ ] "Confirm email" coché
- [ ] Site URL configurée (`http://localhost:3001` pour le dev)
- [ ] Redirect URLs configurées
- [ ] Template d'email personnalisé (optionnel)
- [ ] SMTP configuré (optionnel mais recommandé)

---

## 🧪 Test rapide

1. Lancez votre application : `npm run dev`
2. Allez sur http://localhost:3001/auth/register
3. Inscrivez-vous avec un **vrai email**
4. Vérifiez votre boîte mail (et les spams !)
5. Cliquez sur le lien de confirmation
6. Vous devriez être redirigé vers `/academie`

---

## 🐛 Dépannage

### Email non reçu ?

1. **Vérifiez les spams**
2. **Vérifiez les logs** : 
   - **Authentication** > **Logs**
   - Cherchez les erreurs d'envoi d'email
3. **Vérifiez le SMTP** :
   - Si vous utilisez le SMTP Supabase par défaut, vous êtes peut-être limité
   - Configurez un SMTP externe (Resend, SendGrid)
4. **Attendez quelques minutes** (parfois il y a un délai)

### Lien de confirmation invalide ?

1. Le lien **expire après 24 heures**
2. Vérifiez que l'URL de redirection est dans les **Redirect URLs** autorisées
3. Vérifiez les **logs** pour voir l'erreur exacte :
   - **Authentication** > **Logs**

### Erreur "Email not confirmed" lors de la connexion ?

1. L'utilisateur n'a pas encore cliqué sur le lien de confirmation
2. Vérifiez dans **Authentication** > **Users** si la colonne **"email_confirmed_at"** a une date

### L'utilisateur est créé dans auth.users mais pas dans public.User ?

1. Vérifiez que le **trigger** est bien créé :
   ```sql
   SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
   ```
2. Vérifiez les **logs** de PostgreSQL pour les erreurs

---

## 📊 Surveiller les inscriptions

### Dans Supabase Dashboard

1. **Authentication** > **Users**
   - Voir tous les utilisateurs inscrits
   - Colonne **"email_confirmed_at"** : date de confirmation
   
2. **Database** > **Table Editor** > **User**
   - Voir les utilisateurs synchronisés dans votre table

3. **Authentication** > **Logs**
   - Voir tous les événements d'authentification
   - Utile pour déboguer

---

## 🎉 Configuration terminée !

Votre système d'authentification avec confirmation par email est maintenant opérationnel ! 📧✨

**Prochaines étapes** :
1. Testez l'inscription et la confirmation
2. Personnalisez les emails (templates)
3. Configurez un SMTP professionnel pour la production
4. Déployez sur Vercel

