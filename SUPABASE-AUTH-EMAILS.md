# 📧 Configuration des Emails de Confirmation avec Supabase Auth

## 🎯 Objectif
Activer l'envoi d'emails de confirmation lors de l'inscription des utilisateurs.

---

## 📋 ÉTAPE 1 : Activer l'authentification par email dans Supabase

### 1.1 Aller dans Authentication Settings

1. Ouvrez votre **dashboard Supabase**
2. Dans le menu de gauche, cliquez sur **Authentication** (🔒)
3. Cliquez sur **Settings** (ou **Configuration**)
4. Allez dans l'onglet **Auth Providers**

### 1.2 Configurer Email Provider

1. Trouvez **"Email"** dans la liste des providers
2. Assurez-vous qu'il est **activé** (toggle ON)
3. Cochez **"Confirm email"** ✅
4. **Save** (Sauvegarder)

---

## 📧 ÉTAPE 2 : Configurer le service d'envoi d'emails

Supabase offre **3 options** :

### **Option A : Utiliser le SMTP de Supabase (Gratuit, limité)**

Par défaut, Supabase envoie des emails depuis leur serveur.

**Limites** :
- ⚠️ Pas de personnalisation
- ⚠️ Limité à 4 emails/heure (plan gratuit)
- ⚠️ Peut aller dans les spams

**Avantage** : 
- ✅ Aucune configuration requise !

---

### **Option B : Configurer votre propre SMTP (Recommandé)**

Utilisez un service professionnel comme **Resend**, **SendGrid**, **AWS SES**, ou **Mailgun**.

#### Exemple avec Resend (Gratuit jusqu'à 3000 emails/mois)

1. Allez sur https://resend.com et créez un compte
2. Créez une **API Key**
3. Dans Supabase :
   - **Authentication** > **Settings** > **SMTP Settings**
   - **Host** : `smtp.resend.com`
   - **Port** : `465` (ou `587`)
   - **Username** : `resend`
   - **Password** : Votre API Key Resend
   - **Sender email** : `noreply@votredomaine.com`
   - **Sender name** : `Echo Académie`

4. **Save** et **Send test email** pour vérifier

---

### **Option C : Utiliser un service externe avec Webhooks**

Configuration avancée avec des services comme Mailchimp, Customer.io, etc.

---

## 📝 ÉTAPE 3 : Personnaliser les templates d'emails

### 3.1 Accéder aux templates

1. **Authentication** > **Email Templates**
2. Vous verrez plusieurs types d'emails :
   - **Confirm signup** (inscription)
   - **Magic Link** (connexion sans mot de passe)
   - **Change Email Address**
   - **Reset Password**

### 3.2 Personnaliser "Confirm signup"

Exemple de template :

```html
<h2>Bienvenue sur Echo Académie ! 🎉</h2>

<p>Bonjour {{ .Name }},</p>

<p>Merci de vous être inscrit ! Pour activer votre compte, cliquez sur le bouton ci-dessous :</p>

<a href="{{ .ConfirmationURL }}" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
  Confirmer mon email
</a>

<p>Ou copiez ce lien dans votre navigateur :</p>
<p>{{ .ConfirmationURL }}</p>

<p>Ce lien expire dans 24 heures.</p>

<p>À bientôt,<br>L'équipe Echo</p>
```

**Variables disponibles** :
- `{{ .Email }}` : email de l'utilisateur
- `{{ .Token }}` : token de confirmation
- `{{ .TokenHash }}` : hash du token
- `{{ .ConfirmationURL }}` : lien complet de confirmation
- `{{ .SiteURL }}` : URL de votre site

### 3.3 Configurer l'URL de redirection

Dans **Authentication** > **URL Configuration** :

- **Site URL** : `https://votredomaine.com` (ou `http://localhost:3001` pour le dev)
- **Redirect URLs** : Ajoutez vos URLs autorisées :
  ```
  http://localhost:3001/**
  https://votredomaine.com/**
  https://votredomaine.vercel.app/**
  ```

---

## 🔧 ÉTAPE 4 : Intégrer dans votre application

### 4.1 Variables d'environnement

Ajoutez dans votre `.env` :

```bash
NEXT_PUBLIC_SUPABASE_URL="https://koqtnpjzbibinfxwbvky.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 4.2 Page d'inscription avec Supabase Auth

Créez une nouvelle page ou modifiez l'existante :

```typescript
import { supabase } from '@/lib/supabase';

async function handleSignUp(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name, // Métadonnées personnalisées
        role: 'STUDENT',
      },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    console.error('Erreur d\'inscription:', error.message);
    return;
  }

  console.log('Email de confirmation envoyé à:', email);
  // Afficher un message : "Vérifiez votre boîte mail !"
}
```

### 4.3 Créer la page de callback

Créez `src/app/auth/callback/route.ts` :

```typescript
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as any,
    });

    if (!error) {
      // Email confirmé ! Rediriger vers le dashboard
      return NextResponse.redirect(new URL('/academie', request.url));
    }
  }

  // En cas d'erreur, rediriger vers login
  return NextResponse.redirect(new URL('/auth/login', request.url));
}
```

---

## 🧪 ÉTAPE 5 : Tester

1. Lancez votre application : `npm run dev`
2. Inscrivez-vous avec un vrai email
3. Vérifiez votre boîte mail (et les spams !)
4. Cliquez sur le lien de confirmation
5. Vous devriez être redirigé vers `/academie`

---

## 🔍 Vérifier dans Supabase Dashboard

1. **Authentication** > **Users**
2. Trouvez l'utilisateur créé
3. La colonne **"email_confirmed_at"** doit avoir une date après confirmation

---

## 🚨 Dépannage

### Email non reçu ?

1. Vérifiez les **spams**
2. Vérifiez les **logs** : **Authentication** > **Logs**
3. Vérifiez la configuration SMTP
4. Essayez avec un autre email (Gmail, ProtonMail)

### Lien de confirmation invalide ?

1. Le lien expire après **24 heures**
2. Vérifiez que l'URL de redirection est dans les **Redirect URLs** autorisées
3. Vérifiez les **logs** pour voir l'erreur exacte

### Email confirmé mais pas de données dans votre table User ?

Vous devez **synchroniser** `auth.users` de Supabase avec votre table `User` Prisma.

Créez un **trigger PostgreSQL** ou un **webhook** :

```sql
-- Trigger pour synchroniser auth.users avec public.User
CREATE OR REPLACE FUNCTION sync_user_to_public()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public."User" (id, email, name, role, "emailVerified", "createdAt", "updatedAt")
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'name',
    COALESCE(NEW.raw_user_meta_data->>'role', 'STUDENT'),
    NEW.email_confirmed_at,
    NEW.created_at,
    NEW.updated_at
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    "emailVerified" = EXCLUDED."emailVerified",
    "updatedAt" = EXCLUDED."updatedAt";
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION sync_user_to_public();
```

---

## ✅ Checklist finale

- [ ] Email provider activé dans Supabase
- [ ] "Confirm email" coché
- [ ] SMTP configuré (ou utilisation du SMTP Supabase par défaut)
- [ ] Templates d'emails personnalisés
- [ ] Site URL et Redirect URLs configurés
- [ ] Variables d'environnement ajoutées
- [ ] Page de callback créée
- [ ] Test d'inscription réussi
- [ ] Email de confirmation reçu et cliqué
- [ ] Synchronisation auth.users ↔ public.User configurée

---

## 🎉 Félicitations !

Vos utilisateurs reçoivent maintenant des emails de confirmation professionnels ! 📧✨

