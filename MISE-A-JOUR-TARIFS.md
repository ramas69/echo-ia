# 💰 MISE À JOUR DES PLANS TARIFAIRES

## ✅ NOUVEAUX TARIFS IMPLÉMENTÉS

Les plans tarifaires ont été mis à jour avec de nouvelles informations incitatives et des options de paiement en 3x.

---

## 🎯 CHANGEMENTS PRINCIPAUX

### **1. Options de Paiement en 3x Ajoutées**

**Avant :**
```
997 €
1 490 €
À partir de 3 490 €
```

**Après :**
```
997 € ou 3 × 349 €
1 490 € ou 3 × 530 €
À partir de 3 490 € - Prix défini après audit, aucune surprise
```

**Impact :** Rend les offres plus accessibles et rassure sur la transparence des prix VIP.

---

### **2. Baselines Incitatives Ajoutées**

**Chaque offre a maintenant une phrase d'accroche forte :**

#### **Fondations :**
```
"Le socle indispensable sur lequel reposent 
toutes les autres offres, y compris le VIP."
```
**Message :** Valeur fondamentale, même pour les VIP.

#### **Accélération :**
```
"Le meilleur équilibre entre autonomie 
et accompagnement."
```
**Message :** Position de compromis idéale.

#### **VIP Architecte :**
```
"Pensé pour celles et ceux qui veulent 
déléguer sans perdre le contrôle."
```
**Message :** Délégation contrôlée, pas abandon.

---

### **3. Descriptions Mises à Jour**

#### **Fondations :**
- **Avant :** "Je construis moi-même"
- **Après :** "Construire votre infrastructure en autonomie"

#### **Accélération :**
- **Avant :** "Guidé sans être seul"
- **Après :** "Avancer sans se perdre"

#### **VIP Architecte :**
- **Avant :** "Fait avec moi, pour moi"
- **Après :** "Libération maximale – Clé en main"

---

### **4. Contenu "Inclus" Uniformisé**

#### **Fondations :**
```
✓ Accès aux 5 modules vidéo
✓ Templates et blueprints prêts à l'emploi
✓ Communauté d'entraide
```

#### **Accélération :**
```
✓ Tout FONDATIONS
✓ 1 live collectif par mois (Q&A)
✓ Cadre clair, temps mutualisé
```

#### **VIP Architecte :**
```
✓ Tout ACCÉLÉRATION
✓ Installation complète de votre infrastructure cœur
✓ Création de votre outil signature
✓ Audit technique 1:1 (1h)
```

---

### **5. Notes "À savoir" Clarifiées**

#### **Fondations :**
```
👉 100 % asynchrone
👉 Aucun support individuel
```

#### **Accélération :**
```
👉 Idéal pour les profils non techniques
👉 Sans surcharge mentale
```

#### **VIP Architecte :**
```
👉 Limité à 2 clients par mois
👉 Sur candidature uniquement
```

---

## 🎨 AFFICHAGE VISUEL

### **Structure des Cards (Page Accueil & Offres) :**

```
┌────────────────────────────────┐
│ [Badge] 🥉 OFFRE 01            │
│                                │
│ FONDATIONS                     │
│ Construire votre infrastructure│
│                                │
│ 997 €                          │
│ ou 3 × 349 €                   │
│                                │
│ INCLUS:                        │
│ ✓ 5 modules vidéo              │
│ ✓ Templates                    │
│ ✓ Communauté                   │
│                                │
│ À SAVOIR:                      │
│ 👉 100% asynchrone             │
│ 👉 Aucun support individuel    │
│                                │
│ ┌──────────────────────────┐   │
│ │ Le socle indispensable   │   │
│ │ sur lequel reposent...   │   │
│ └──────────────────────────┘   │
│                                │
│ [COMMENCER]                    │
└────────────────────────────────┘
```

**Éléments clés :**
- Prix principal en grand (text-4xl)
- Option 3x en petit en dessous
- Baseline dans un encadré coloré
- CTA en bas

---

## 📱 PAGES MISES À JOUR

### **1. Page d'Accueil** (`/`)
✅ Section Pricing complète
- 3 cards côte à côte (desktop)
- Stack vertical (mobile)
- Prix avec options 3x
- Baselines en encadrés colorés

### **2. Page Offres** (`/offres`)
✅ Grille des offres
- Structure identique à l'accueil
- Baselines intégrées
- Prix 3x affichés
- Cards responsives

---

## 🎯 ÉLÉMENTS INCITATIFS

### **1. Accessibilité Financière**
```
Prix en 3x visibles immédiatement
→ Réduit la friction psychologique
→ Facilite la décision d'achat
```

### **2. Valeur Perçue**
```
"Le socle indispensable..."
→ Justifie l'investissement minimal
→ Positionne Fondations comme base nécessaire
```

```
"Le meilleur équilibre..."
→ Valide le choix Accélération
→ Rassure sur le rapport qualité/prix
```

```
"Pensé pour... déléguer sans perdre le contrôle"
→ Répond à l'objection principale des VIP
→ Sécurise la décision haut de gamme
```

### **3. Transparence Prix VIP**
```
"Prix défini après audit, aucune surprise"
→ Rassure sur le processus
→ Évite la méfiance sur les tarifs variables
```

### **4. Clarté des Limites**
```
"Limité à 2 clients par mois"
→ Crée l'urgence
→ Positionne le VIP comme exclusif
```

---

## 📊 IMPACT PSYCHOLOGIQUE

### **Avant :**
```
Client: "997€ c'est cher"
```

### **Après :**
```
Client: "349€/mois, c'est accessible"
```

**Réduction perçue :** -65% (perception psychologique)

---

### **Avant (VIP) :**
```
Client: "À partir de 3490€... ça peut être combien?"
```

### **Après (VIP) :**
```
Client: "Prix défini après audit, aucune surprise"
→ Transparence rassurante
```

---

## 🔧 TECHNIQUE

### **Fichiers modifiés :**

#### **1. Page d'Accueil**
```
src/app/page.tsx
```

**Changements :**
- Ajout div `priceMonthly` après `price`
- Ajout encadré `baseline` avant CTA
- Mise à jour des textes `includes` et `notes`

#### **2. Page Offres**
```
src/app/offres/page.tsx
```

**Changements :**
- Mise à jour de l'objet `offers[]`
- Ajout champ `priceMonthly`
- Ajout champ `baseline`
- Rendu des nouveaux champs dans les cards

---

## 🎨 STYLES DES BASELINES

### **Fondations (Emerald) :**
```jsx
className="
  p-4 rounded-xl 
  bg-[var(--emerald-deep)]/5 
  border border-[var(--emerald-deep)]/10
"
text-[var(--emerald-deep)]
```

### **Accélération (Gold) :**
```jsx
className="
  p-4 rounded-xl 
  bg-[var(--gold-vivid)]/10 
  border border-[var(--gold-vivid)]/20
"
text-[var(--gold-vivid)]
```

### **VIP Architecte (Dark) :**
```jsx
className="
  p-4 rounded-xl 
  bg-white/10 
  backdrop-blur-sm 
  border border-white/20
"
text-white
```

---

## 📝 TEXTES COMPLETS

### **OFFRE 01 — FONDATIONS**

**Prix :** 997 € ou 3 × 349 €

**Inclus :**
- Accès aux 5 modules vidéo
- Templates et blueprints prêts à l'emploi
- Communauté d'entraide

**À savoir :**
- 100 % asynchrone
- Aucun support individuel

**Baseline :**
> Le socle indispensable sur lequel reposent toutes les autres offres, y compris le VIP.

**CTA :** Commencer

---

### **OFFRE 02 — ACCÉLÉRATION**

**Prix :** 1 490 € ou 3 × 530 €

**Inclus :**
- Tout FONDATIONS
- 1 live collectif par mois (Q&A)
- Cadre clair, temps mutualisé

**À savoir :**
- Idéal pour les profils non techniques
- Sans surcharge mentale

**Baseline :**
> Le meilleur équilibre entre autonomie et accompagnement.

**CTA :** Rejoindre

---

### **OFFRE 03 — VIP ARCHITECTE**

**Prix :** À partir de 3 490 €  
**Précision :** Prix défini après audit, aucune surprise

**Inclus :**
- Tout ACCÉLÉRATION
- Installation complète de votre infrastructure cœur
- Création de votre outil signature
- Audit technique 1:1 (1h)

**À savoir :**
- Limité à 2 clients par mois
- Sur candidature uniquement

**Baseline :**
> Pensé pour celles et ceux qui veulent déléguer sans perdre le contrôle.

**CTA :** Postuler

---

## 📊 COMPARAISON

| Élément | Avant | Après |
|---------|-------|-------|
| **Prix Fondations** | 997 € | 997 € ou 3 × 349 € |
| **Prix Accélération** | 1 490 € | 1 490 € ou 3 × 530 € |
| **Prix VIP** | À partir de 3 490 € | À partir de 3 490 € + précision transparence |
| **Baselines** | ❌ Aucune | ✅ 3 phrases incitatives |
| **Bouton Fondations** | Commencer | Commencer |
| **Bouton Accélération** | Rejoindre | Rejoindre |
| **Bouton VIP** | Candidater | Postuler |

---

## ✅ CHECKLIST

- [x] Prix 3x ajoutés (Fondations, Accélération)
- [x] Transparence prix VIP clarifiée
- [x] Baselines incitatives créées
- [x] Descriptions mises à jour
- [x] Contenus "Inclus" uniformisés
- [x] Notes "À savoir" clarifiées
- [x] Encadrés colorés pour baselines
- [x] Page d'accueil mise à jour
- [x] Page Offres mise à jour
- [x] Responsive vérifié
- [x] Pas d'erreurs de lint

---

## 🎯 OBJECTIF ATTEINT

**Les nouveaux tarifs sont :**
- ✅ Plus accessibles (3x)
- ✅ Plus transparents (VIP)
- ✅ Plus incitatifs (baselines)
- ✅ Plus clairs (descriptions)

**Impact attendu :**
- 📈 Augmentation taux de conversion
- 📈 Réduction objections prix
- 📈 Meilleure qualification leads VIP
- 📈 Confiance renforcée

---

**TARIFS MIS À JOUR ET OPTIMISÉS POUR LA CONVERSION ! 💰✨**

