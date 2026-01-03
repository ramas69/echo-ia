# 🔑 Configuration du Reset Password - Supabase

## ✅ Fonctionnalités ajoutées

Votre application dispose maintenant d'un système complet de récupération de mot de passe :

- ✅ Page "Mot de passe oublié" (`/auth/forgot-password`)
- ✅ Page "Réinitialiser mot de passe" (`/auth/reset-password`)
- ✅ Lien "Oublié ?" sur la page de connexion
- ✅ Emails automatiques de réinitialisation
- ✅ Validation et messages d'erreur
- ✅ Interface élégante et cohérente

---

## 📧 Configuration du template d'email (Dans Supabase Dashboard)

### Étape 1 : Accéder aux templates

1. Allez sur https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Dans le menu de gauche : **Authentication** > **Email Templates**
4. Cliquez sur **"Reset Password"** ou **"Magic Link"**

### Étape 2 : Personnaliser le template

Remplacez le template par défaut par celui-ci :

```html
<h2 style="font-family: Arial, sans-serif; color: #1a4d2e;">Réinitialisation de votre mot de passe 🔑</h2>

<p style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
  Bonjour,
</p>

<p style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
  Vous avez demandé à réinitialiser votre mot de passe sur <strong>Echo Académie</strong>.
</p>

<p style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
  Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :
</p>

<div style="text-align: center; margin: 30px 0;">
  <a href="{{ .ConfirmationURL }}" style="background-color: #1a4d2e; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-family: Arial, sans-serif; font-weight: bold; font-size: 14px;">
    Réinitialiser mon mot de passe
  </a>
</div>

<p style="font-family: Arial, sans-serif; color: #666; font-size: 13px; line-height: 1.6;">
  Ou copiez ce lien dans votre navigateur :
</p>
<p style="font-family: Arial, sans-serif; color: #1a4d2e; font-size: 12px; word-break: break-all;">
  {{ .ConfirmationURL }}
</p>

<div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 12px; margin: 20px 0;">
  <p style="font-family: Arial, sans-serif; color: #856404; font-size: 13px; margin: 0; line-height: 1.6;">
    ⏱️ <strong>Important</strong> : Ce lien expire dans <strong>1 heure</strong>.
  </p>
</div>

<hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

<p style="font-family: Arial, sans-serif; color: #999; font-size: 12px; line-height: 1.6;">
  ❓ Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email en toute sécurité. Votre mot de passe actuel reste inchangé.
</p>

<p style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; margin-top: 20px;">
  L'équipe <strong>Echo Académie</strong>
</p>
```

### Étape 3 : Sauvegarder

Cliquez sur **"Save"** en bas de la page.

---

## 🧪 Test du système

### 1. Lancer l'application

```bash
npm run dev
```

### 2. Tester "Mot de passe oublié"

1. Allez sur http://localhost:3001/auth/login
2. Cliquez sur **"Oublié ?"** à côté du champ mot de passe
3. Entrez votre email
4. Cliquez sur **"Envoyer le lien"**
5. Vous devriez voir l'écran de confirmation

### 3. Vérifier l'email

1. Ouvrez votre boîte mail (vérifiez les spams !)
2. Vous devriez recevoir un email de réinitialisation
3. Cliquez sur le bouton **"Réinitialiser mon mot de passe"**

### 4. Réinitialiser le mot de passe

1. Vous serez redirigé vers `/auth/reset-password`
2. Entrez votre nouveau mot de passe (min. 6 caractères)
3. Confirmez le mot de passe
4. Cliquez sur **"Réinitialiser le mot de passe"**
5. Vous verrez un écran de succès
6. Redirection automatique vers la connexion après 3 secondes

### 5. Se connecter avec le nouveau mot de passe

1. Sur la page de connexion
2. Utilisez votre email et **nouveau mot de passe**
3. Vous devriez être connecté et redirigé vers `/academie`

---

## 🎨 Pages créées

### `/auth/forgot-password`

**Fonctionnalités** :
- Formulaire avec champ email
- Validation email obligatoire
- Écran de confirmation après envoi
- Lien retour vers la connexion
- Design cohérent avec le reste de l'app

### `/auth/reset-password`

**Fonctionnalités** :
- Vérification automatique du token
- Deux champs : nouveau mot de passe + confirmation
- Validation : minimum 6 caractères
- Vérification que les mots de passe correspondent
- Écran de succès avec redirection auto
- Gestion des liens expirés/invalides

---

## 🔐 Sécurité

### Expiration des liens

Les liens de réinitialisation expirent après **1 heure** par défaut.

Pour modifier ce délai dans Supabase :
1. **Authentication** > **Settings**
2. Cherchez **"Expiration times"** ou **"Password recovery"**
3. Modifiez la valeur (en secondes)

### Nombre de tentatives

Supabase limite automatiquement les tentatives de réinitialisation pour éviter les abus.

---

## 🚨 Dépannage

### Email non reçu ?

1. **Vérifiez les spams**
2. **Vérifiez les logs** : Authentication > Logs
3. **Vérifiez le SMTP** : Si vous utilisez le SMTP Supabase gratuit, il y a une limite de 4 emails/heure
4. **Configurez un SMTP externe** : Resend, SendGrid, etc. (voir `SUPABASE-AUTH-EMAILS.md`)

### Lien invalide ou expiré ?

1. Le lien expire après **1 heure**
2. Un lien ne peut être utilisé qu'**une seule fois**
3. Demandez un nouveau lien via `/auth/forgot-password`

### Erreur "Les mots de passe ne correspondent pas" ?

Vérifiez que :
- Les deux champs sont identiques
- Aucun espace avant/après
- Respecte la casse (majuscules/minuscules)

### Mot de passe refusé ?

Le mot de passe doit :
- Contenir **au moins 6 caractères**
- (Vous pouvez ajouter d'autres règles dans le code si nécessaire)

---

## 🎁 Améliorations possibles

### Renforcer la validation du mot de passe

Dans `/auth/reset-password/page.tsx`, ajoutez des règles :

```typescript
// Exemple : au moins 8 caractères, 1 majuscule, 1 chiffre
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

if (!passwordRegex.test(password)) {
  setError('Le mot de passe doit contenir au moins 8 caractères, 1 majuscule et 1 chiffre.');
  return;
}
```

### Afficher la force du mot de passe

Ajoutez une barre de progression pour indiquer la solidité du mot de passe.

### Historique des mots de passe

Empêcher la réutilisation des anciens mots de passe (nécessite une table supplémentaire).

### Rate limiting côté client

Limiter le nombre de demandes de réinitialisation par email/jour.

---

## ✅ Checklist de configuration

- [ ] Template d'email "Reset Password" personnalisé dans Supabase
- [ ] URL de redirection configurée : `http://localhost:3001/auth/reset-password`
- [ ] Test "Mot de passe oublié" réussi
- [ ] Email de réinitialisation reçu
- [ ] Nouveau mot de passe créé avec succès
- [ ] Connexion avec nouveau mot de passe réussie
- [ ] SMTP configuré (recommandé pour production)

---

## 🎉 Félicitations !

Votre système de récupération de mot de passe est maintenant opérationnel ! 🔑✨

Les utilisateurs peuvent maintenant :
- ✅ Réinitialiser leur mot de passe en cas d'oubli
- ✅ Recevoir des emails sécurisés
- ✅ Bénéficier d'une interface intuitive et professionnelle

**Prochaines étapes** :
1. Configurez le template d'email dans Supabase
2. Testez le système complet
3. Configurez un SMTP professionnel pour la production
4. Déployez sur Vercel

