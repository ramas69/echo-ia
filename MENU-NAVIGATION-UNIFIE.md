# ✅ MENU DE NAVIGATION UNIFIÉ

## 🎯 OBJECTIF

Appliquer le **même menu** (TopBar + Navbar) sur toutes les pages publiques :
- ✅ Page d'accueil (`/`)
- ✅ Page Le Programme (`/le-programme`)
- ✅ Page Offres (`/offres`)

---

## 📐 STRUCTURE DU MENU

### 1. **TopBar (Barre d'urgence)**

```
┌─────────────────────────────────────────────────────────┐
│ ● SESSION DE JANVIER : PLUS QU'UNE PLACE DISPONIBLE.   │
│                              [Réserver mon slot]        │
└─────────────────────────────────────────────────────────┘
```

**Caractéristiques :**
- Position : `fixed top-0 z-[110]`
- Fond : `bg-[var(--emerald-deep)]`
- Couleur texte : `text-[var(--gold-sand)]`
- Indicateur pulsant (●) avec animation Framer Motion
- Bouton CTA vers formulaire Tally (VIP)

---

### 2. **Navbar (Navigation principale)**

```
┌─────────────────────────────────────────────────────────┐
│  [●] L'ÉCHO IA     Accueil | Le Programme | Offres     │
│                                        Candidature VIP  │
└─────────────────────────────────────────────────────────┘
```

**Caractéristiques :**
- Position : `fixed top-[48px] z-[100]`
- Effet au scroll : 
  - **Non scrollé** : Transparent, plus de padding
  - **Scrollé** : Fond glass avec border dorée
- Logo cliquable vers `/`
- 3 liens de navigation : Accueil, Le Programme, Offres
- Bouton "Candidature VIP" (hidden sur mobile)

---

## 🎨 DESIGN ET ANIMATIONS

### TopBar
```typescript
// Indicateur pulsant
<motion.span 
  animate={{ 
    scale: [1, 1.5, 1], 
    opacity: [1, 0.5, 1] 
  }}
  transition={{ 
    duration: 2, 
    repeat: Infinity 
  }}
  className="w-2 h-2 bg-[var(--gold-vivid)] rounded-full"
/>
```

### Navbar au Scroll
```typescript
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => setIsScrolled(window.scrollY > 50);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Appliqué sur la navbar
className={cn(
  "fixed w-full z-[100] transition-all duration-700 px-6",
  isScrolled ? "top-[48px] py-4" : "top-[48px] py-8"
)}
```

### Logo Animé
- Circle border qui change de couleur au hover
- Dot intérieur avec `animate-pulse`
- Texte "L'ÉCHO IA" en uppercase ultra-espacé

### Liens de Navigation
- Underline animé au hover (0 → 100% width)
- Transition de couleur vers le doré
- Active state avec couleur dorée

---

## 📝 FICHIERS MODIFIÉS

### 1. `/src/app/offres/page.tsx`
**Changements :**
- ✅ Ajouté `useState` pour `isScrolled`
- ✅ Ajouté `useEffect` pour écoute du scroll
- ✅ Remplacé navbar simple par TopBar + Navbar complète
- ✅ Ajouté logo "L'ÉCHO IA" animé
- ✅ Ajouté liens : Accueil | Le Programme | Offres
- ✅ Ajouté bouton "Candidature VIP"

**Avant :**
```tsx
<nav className="fixed top-0 w-full z-50 bg-white/80">
  <Link href="/">Retour</Link>
  <Link href="/le-programme">Programme</Link>
  <Link href="/auth/login">Connexion</Link>
</nav>
```

**Après :**
```tsx
{/* TopBar */}
<div className="fixed top-0 w-full z-[110] bg-[var(--emerald-deep)]">
  ...
</div>

{/* Navbar */}
<nav className={cn(
  "fixed w-full z-[100]",
  isScrolled ? "top-[48px] py-4" : "top-[48px] py-8"
)}>
  ...
</nav>
```

---

### 2. `/src/app/le-programme/page.tsx`
**Changements :**
- ✅ Ajouté `useState` et `useEffect` dans les imports
- ✅ Ajouté état `isScrolled`
- ✅ Remplacé navbar simple par TopBar + Navbar complète
- ✅ Même structure que la page d'accueil

**Avant :**
```tsx
<nav className="fixed top-0 w-full z-50 glass-card">
  <Link href="/">Retour à l'accueil</Link>
  <Link href="/auth/login">Connexion Membre</Link>
</nav>
```

**Après :**
```tsx
{/* TopBar + Navbar identiques à l'accueil */}
```

---

## 🎯 AVANTAGES

### 1. **Cohérence Visuelle**
- ✅ Même menu partout
- ✅ Même comportement
- ✅ Même animations
- ✅ Identité forte

### 2. **Meilleure Navigation**
- ✅ Utilisateur sait toujours où il est
- ✅ Accès direct à toutes les pages
- ✅ CTA urgent visible (TopBar)
- ✅ Candidature VIP accessible

### 3. **Professionnalisme**
- ✅ Design unifié
- ✅ Animations fluides
- ✅ Transitions smooth
- ✅ Expérience premium

### 4. **Facilité de Maintenance**
- ✅ Même code sur 3 pages
- ✅ Facile à modifier
- ✅ Un changement = partout
- ✅ Structure claire

---

## 📱 RESPONSIVE

### Mobile
- TopBar : Message réduit + Bouton compact
- Navbar : Logo + Bouton mobile menu (à implémenter si besoin)
- Menu desktop caché : `hidden md:flex`

### Desktop
- TopBar : Message complet + CTA visible
- Navbar : Logo + 3 liens + Candidature VIP
- Tout visible : `md:block`, `md:flex`

---

## 🎨 Z-INDEX HIERARCHY

```
TopBar:     z-[110]  (toujours au-dessus)
Navbar:     z-[100]  (juste en dessous)
Content:    z-auto   (contenu normal)
```

---

## ⚙️ TECHNIQUE

### State Management
```typescript
const [isScrolled, setIsScrolled] = useState(false);
```

### Event Listener
```typescript
useEffect(() => {
  const handleScroll = () => setIsScrolled(window.scrollY > 50);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### Conditional Classes
```typescript
className={cn(
  "base-classes",
  isScrolled ? "scrolled-classes" : "not-scrolled-classes"
)}
```

---

## 🔗 LIENS

### Navigation Interne (Next.js Link)
```tsx
<Link href="/">Accueil</Link>
<Link href="/le-programme">Le Programme</Link>
<Link href="/offres">Offres</Link>
```

### Liens Externes (Tally)
```tsx
<a 
  href="https://tally.so/r/vIP-echo-ia"
  target="_blank"
  rel="noopener noreferrer"
>
  Candidature VIP
</a>
```

---

## 🧪 TESTS

### À vérifier
- ✅ TopBar visible sur les 3 pages
- ✅ Navbar transparent puis glass au scroll
- ✅ Logo cliquable vers `/`
- ✅ Liens fonctionnels
- ✅ Animations fluides
- ✅ Responsive mobile
- ✅ Boutons CTA fonctionnels

### Navigation
1. Aller sur `/` → Menu affiché
2. Cliquer "Le Programme" → Menu identique
3. Cliquer "Offres" → Menu identique
4. Scroller → Navbar devient glass
5. Hover logo → Couleur change
6. Hover liens → Underline animé

---

## 📊 RÉSULTAT

**3 pages avec le même menu professionnel ! ✨**

```
/                 ✅ TopBar + Navbar
/le-programme     ✅ TopBar + Navbar
/offres           ✅ TopBar + Navbar
```

**Cohérence visuelle totale et expérience utilisateur unifiée ! 🎯**

