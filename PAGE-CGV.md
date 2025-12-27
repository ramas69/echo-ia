# 📜 PAGE CGV (CONDITIONS GÉNÉRALES DE VENTE)

## ✅ PAGE DÉDIÉE CRÉÉE

Une page professionnelle dédiée aux Conditions Générales de Vente, accessible depuis le footer.

---

## 📐 STRUCTURE DE LA PAGE

### **Route :**
```
/cgv
```

### **Contenu :**

#### **Hero Section**
```
[Badge] Cadre Légal

CONDITIONS GÉNÉRALES
de Vente

Description + Dernière mise à jour
```

#### **Points Clés (3 Cards)**
```
┌─────────────┬─────────────┬─────────────┐
│ [✓]         │ [⚠]         │ [⚖]         │
│ Programmes  │ Pas de      │ Droit       │
│ & Services  │ rétractation│ français    │
└─────────────┴─────────────┴─────────────┘
```

#### **10 Articles Détaillés**
```
[1] Article 1 — Objet
[2] Article 2 — Nature des prestations
[3] Article 3 — Accès aux services
[4] Article 4 — Prix et modalités de paiement
[5] Article 5 — Absence de droit de rétractation
[6] Article 6 — Cadre et limites des prestations
[7] Article 7 — Responsabilité
[8] Article 8 — Propriété intellectuelle
[9] Article 9 — Exclusion
[10] Article 10 — Droit applicable et juridiction
```

#### **Résumé Important (Encadré Emerald)**
```
⚠ Points essentiels à retenir
• Engagement ferme sans remboursement
• Cadre strictement défini
• Aucun résultat garanti
• Exclusion possible en cas d'abus
```

#### **CTA Final**
```
[Nous contacter] [Voir mentions légales]
```

---

## 🎨 DESIGN

### **Hero Section**
- Badge "Cadre Légal"
- Titre en 2 lignes (uppercase + italic)
- Description contextuelle
- Info "Dernière mise à jour"

### **Points Clés**
```jsx
Grid de 3 cards:
- Icône dans cercle
- Titre uppercase
- Description courte
- Hover effect (border gold)
```

### **Articles**
```jsx
Pour chaque article:
- Numéro dans cercle emerald
- "Article X" en uppercase petit
- Titre en bold grand
- Contenu indenté à gauche
- Alertes colorées (amber, rouge)
```

### **Résumé Important**
```jsx
Encadré gradient emerald:
- Icône AlertCircle
- Titre "Points essentiels"
- 4 points clés avec bullet gold
- Texte en blanc
```

---

## 📱 RESPONSIVE

### **Mobile (< 768px) :**
- Points clés en 1 colonne (stack)
- Articles en cards verticales
- Padding réduit (p-6)
- Texte adapté
- Footer liens en wrap

### **Tablette (≥ 768px) :**
- Points clés en 3 colonnes
- Articles avec plus d'espace (p-8)

### **Desktop (≥ 1024px) :**
- Layout complet (max-w-4xl)
- Espaces généreux
- Footer liens en ligne

---

## 🎨 ÉLÉMENTS VISUELS

### **1. Numéros d'Articles**
```jsx
<div className="
  w-10 h-10 
  rounded-full 
  bg-[var(--emerald-deep)] 
  text-white 
  flex items-center justify-center 
  text-sm font-bold
">
  {index + 1}
</div>
```

### **2. Alertes**

**Amber (Engagement) :**
```jsx
<div className="
  p-4 bg-amber-50 
  border-l-4 border-amber-500
">
  Tout paiement échelonné = engagement ferme
</div>
```

**Rouge (Pas de remboursement) :**
```jsx
<div className="
  p-4 bg-red-50 
  border-l-4 border-red-500
">
  👉 Aucun remboursement après l'accès
</div>
```

### **3. Cards Points Clés**
```jsx
Hover effect:
- border-subtle → border-gold/40
- Transition fluide
```

---

## 🔗 FOOTER MIS À JOUR

### **Avant :**
```
Privacy | Legal | Contact
```

### **Après :**
```
Privacy | Légal | CGV | Contact
```

**Liens :**
- Privacy → `/mentions-legales#rgpd`
- Légal → `/mentions-legales`
- **CGV** → `/cgv` ✨ (nouveau)
- Contact → `mailto:contact@lechoia.com`

**Améliorations :**
- ✅ `flex-wrap` pour mobile
- ✅ `whitespace-nowrap` sur chaque lien
- ✅ Gaps adaptatifs (4 → 8 → 16)
- ✅ Tracking adaptatif

---

## 📝 CONTENU DES ARTICLES

### **Article 1 — Objet**
- Formation en ligne
- Accompagnement et installation d'infrastructures

### **Article 2 — Nature des prestations**
- Formation et accompagnement technique
- ❌ Ni conseil juridique
- ❌ Ni conseil financier
- ❌ Ni promesse de résultat

### **Article 3 — Accès aux services**
- Immédiat : Fondations & Accélération
- Après candidature : VIP Architecte
- Responsabilité du matériel et connexion

### **Article 4 — Prix et modalités**
- Prix TTC (TVA non applicable)
- Paiement 1x ou plusieurs fois
- ⚠️ Engagement ferme si échelonné
- Échéances dues même si arrêt

### **Article 5 — Absence de rétractation**
- Article L221-28 du Code de la consommation
- Contenu numérique accessible immédiatement
- Renonciation expresse au droit de rétractation
- 🚫 Aucun remboursement après accès

### **Article 6 — Cadre et limites**
- Pas de support hors périmètre
- Pas d'obligation de disponibilité continue
- Pas d'accompagnement personnalisé non prévu
- Demandes hors cadre non traitées

### **Article 7 — Responsabilité**
- Pas responsable de l'utilisation des contenus
- Pas responsable des résultats (ou non)
- Pas responsable des décisions du client
- Client seul responsable de son activité

### **Article 8 — Propriété intellectuelle**
- Contenus propriété exclusive de L'Écho IA
- 🚫 Reproduction interdite
- 🚫 Diffusion interdite
- 🚫 Revente interdite

### **Article 9 — Exclusion**
- Exclusion sans remboursement possible
- En cas de non-respect du cadre
- En cas de comportement abusif
- En cas de contournement des règles

### **Article 10 — Droit applicable**
- Droit français
- Tentative de résolution amiable
- Tribunaux du ressort de l'éditeur

---

## 🎯 FONCTIONNALITÉS

### **Navigation :**
```
[← Retour à l'accueil]  → Va sur /
[Voir mentions légales] → Va sur /mentions-legales
[Nous contacter]        → mailto:contact@lechoia.com
```

### **Animations :**
```jsx
// Cards points clés
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: i * 0.1 }}

// Articles
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ delay: index * 0.05 }}
```

### **Hover Effects :**
- Cards points clés → border gold
- Articles → shadow augmente
- Liens → couleur gold

---

## 🔧 TECHNIQUE

### **Fichiers créés :**
```
src/app/cgv/page.tsx  ✅ Nouvelle page
```

### **Fichiers modifiés :**
```
src/components/SharedUI.tsx  ✅ Footer avec 4 liens
src/middleware.ts            ✅ Route /cgv publique
```

### **Route publique ajoutée :**
```typescript
"/cgv"  → Accessible sans authentification
```

---

## ✅ CONFORMITÉ

### **Code de la consommation :**
- ✅ Prix TTC
- ✅ Modalités de paiement
- ✅ Droit de rétractation (exception art. L221-28)
- ✅ Cadre des prestations

### **Protection du vendeur :**
- ✅ Absence de garantie de résultat
- ✅ Cadre strictement défini
- ✅ Limites de responsabilité
- ✅ Droit d'exclusion

### **Protection de la propriété intellectuelle :**
- ✅ Contenus protégés
- ✅ Interdiction de reproduction/revente

---

## 📊 STATISTIQUES

| Élément | Valeur |
|---------|--------|
| **Articles** | 10 |
| **Points clés** | 3 cards |
| **Alertes** | 2 (amber, rouge) |
| **Points essentiels** | 4 |
| **Liens footer** | 4 (Privacy, Légal, CGV, Contact) |
| **CTA** | 2 (Contact, Mentions légales) |

---

## 🎨 CLASSES PRINCIPALES

### **Articles :**
```jsx
className="
  p-6 md:p-8 
  rounded-3xl 
  bg-white 
  border border-[var(--border-subtle)] 
  shadow-sm 
  hover:shadow-md 
  transition-shadow
"
```

### **Résumé Important :**
```jsx
className="
  p-8 md:p-12 
  rounded-3xl 
  bg-gradient-to-br 
  from-[var(--emerald-deep)] 
  to-[var(--emerald-deep)]/90 
  text-white
"
```

### **Bullets Points Essentiels :**
```jsx
<span className="text-[var(--gold-sand)] font-bold">•</span>
```

---

## 🧪 TESTER

### **Accéder à la page :**
```
http://localhost:3000/cgv
```

### **Vérifier footer :**
- Cliquer "CGV" → Va sur `/cgv` ✅
- Cliquer "Légal" → Va sur `/mentions-legales` ✅
- Cliquer "Privacy" → Va sur `/mentions-legales#rgpd` ✅
- Cliquer "Contact" → Ouvre email ✅

### **Tester responsive :**
- Mobile 320px ✅
- Tablette 768px ✅
- Desktop 1024px+ ✅

---

## 📝 COMMIT

```
git add .
git commit -m "📜 Ajout page CGV dédiée + Footer mis à jour

NOUVELLE PAGE (/cgv):
- 10 articles détaillés des CGV
- Hero avec badge et dernière mise à jour
- 3 cards points clés (Programmes, Rétractation, Droit)
- Alertes visuelles (amber, rouge)
- Résumé des points essentiels (encadré emerald)
- 2 CTA (Contact, Mentions légales)

DESIGN:
- Numéros d'articles dans cercles emerald
- Cards avec hover effects
- Alertes colorées pour points importants
- Résumé dans encadré gradient emerald
- Responsive (mobile → desktop)

FOOTER MIS À JOUR:
- 4 liens : Privacy, Légal, CGV, Contact
- Flex-wrap pour mobile
- Whitespace-nowrap sur chaque lien
- Gaps adaptatifs

CONTENU CONFORME:
✅ 10 articles CGV détaillés
✅ Absence de rétractation clarifiée
✅ Cadre et limites explicites
✅ Responsabilités définies
✅ Propriété intellectuelle protégée

MIDDLEWARE:
- Route /cgv ajoutée aux routes publiques

ANIMATIONS:
- Fade-in cards points clés
- Scroll reveal articles
- Hover effects

Documentation complète dans PAGE-CGV.md"
```

---

## ✅ CHECKLIST FINALE

- [x] Page `/cgv` créée
- [x] 10 articles détaillés
- [x] 3 cards points clés
- [x] Alertes visuelles
- [x] Résumé des points essentiels
- [x] 2 CTA (Contact, Légal)
- [x] Footer mis à jour (4 liens)
- [x] Middleware configuré
- [x] Responsive
- [x] Animations
- [x] Hover effects
- [x] Documentation

---

**PAGE CGV COMPLÈTE ET PROFESSIONNELLE ! 📜✅**

