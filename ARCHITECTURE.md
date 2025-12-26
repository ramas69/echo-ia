# 🏗️ ARCHITECTURE SAAS-READY - L'ÉCHO IA ACADÉMIE

> **Version :** 1.0 - Décembre 2025  
> **Statut :** Master Template pour futur SaaS multi-clients

## 📋 Vue d'ensemble

Cette codebase est conçue comme un **template maître** pour un futur produit SaaS multi-clients. L'architecture respecte une **séparation stricte des responsabilités** (Frontend vs Backend Logic) pour faciliter une future migration et scaling.

## 🎯 Principes fondamentaux

### 1. Séparation des responsabilités

```
┌─────────────────────────────────────────────────────────┐
│  UI LAYER (React Components)                            │
│  - Zero logique métier                                  │
│  - Zero accès direct à Prisma                           │
│  - Appelle uniquement les API routes ou services        │
└─────────────────────────────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────┐
│  API LAYER (Next.js API Routes)                         │
│  - Thin layer (authentification + validation)           │
│  - Délègue toute logique aux services                   │
└─────────────────────────────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────┐
│  SERVICE LAYER (Business Logic)                         │
│  - Toute la logique métier                              │
│  - Interactions avec Prisma                             │
│  - Transactions complexes                               │
└─────────────────────────────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────┐
│  DATA LAYER (Prisma + PostgreSQL)                       │
└─────────────────────────────────────────────────────────┘
```

### 2. Validation double (Client + Serveur)

Tous les formulaires utilisent **le même schéma Zod** côté client (React Hook Form) et côté serveur (API Routes) pour garantir la cohérence et la sécurité.

### 3. Types TypeScript partagés

Les types sont définis **une seule fois** et partagés entre le frontend, le backend, et le service layer.

## 📁 Structure des dossiers

```
src/
├── lib/
│   ├── validators/              # 🔒 Schémas Zod centralisés
│   │   └── curriculum.ts        # Validation Phase/Unit/Resource
│   │
│   ├── services/                # ⚙️ Couche de service (logique métier)
│   │   └── curriculum.service.ts
│   │
│   ├── types/                   # 📝 Types TypeScript partagés
│   │   └── curriculum.ts
│   │
│   ├── prisma.ts                # Singleton Prisma Client
│   └── utils.ts                 # Utilitaires divers
│
├── app/
│   ├── api/                     # 🌐 API Routes (thin layer)
│   │   └── admin/
│   │       └── curriculum/
│   │           ├── phases/
│   │           │   ├── [id]/route.ts      # PATCH, DELETE
│   │           │   ├── route.ts           # POST (create)
│   │           │   └── reorder/route.ts   # POST (reorder)
│   │           └── units/
│   │               ├── [id]/route.ts
│   │               ├── route.ts
│   │               └── reorder/route.ts
│   │
│   └── admin/                   # 🎨 UI Components (zero DB logic)
│       └── curriculum/
│           ├── page.tsx         # Server Component (fetch only)
│           └── CurriculumManager.tsx  # Client Component (UI only)
│
└── components/                  # 🧩 Composants réutilisables
    ├── SharedUI.tsx
    └── Editor/
        └── TipTapEditor.tsx
```

## 🔄 Flux de données (Exemple : Mise à jour d'une unité)

### 1. **Utilisateur remplit le formulaire** (UI Layer)
```tsx
// src/app/admin/curriculum/units/[unitId]/edit/UnitEditor.tsx
const onSubmit = async (data: UnitFormValues) => {
  const res = await fetch(`/api/admin/curriculum/units/${unitId}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
  // ...
};
```

### 2. **API Route valide et délègue** (API Layer)
```ts
// src/app/api/admin/curriculum/units/[id]/route.ts
export async function PATCH(req: Request) {
  const session = await auth(); // Authentification
  const validatedData = unitSchema.parse(await req.json()); // Validation Zod
  
  const unit = await updateUnitWithResources(id, data, resources); // Service call
  return NextResponse.json({ success: true, data: unit });
}
```

### 3. **Service exécute la logique métier** (Service Layer)
```ts
// src/lib/services/curriculum.service.ts
export async function updateUnitWithResources(unitId, data, resources) {
  return await prisma.$transaction(async (tx) => {
    await tx.resource.deleteMany({ where: { unitId } });
    return await tx.unit.update({
      where: { id: unitId },
      data: { ...data, resources: { create: resources } }
    });
  });
}
```

## 🛠️ Guide d'utilisation

### Créer un nouveau formulaire

1. **Définir le schéma de validation** dans `src/lib/validators/`
```ts
export const myFormSchema = z.object({
  title: z.string().min(3),
  // ...
});
```

2. **Créer le composant UI** (utilise React Hook Form)
```tsx
const form = useForm({
  resolver: zodResolver(myFormSchema)
});
```

3. **Créer l'API Route** (utilise le même schéma)
```ts
const validatedData = myFormSchema.parse(await req.json());
const result = await myService.createSomething(validatedData);
```

4. **Créer la fonction de service** (encapsule Prisma)
```ts
export async function createSomething(data) {
  return await prisma.thing.create({ data });
}
```

### Ajouter un nouveau modèle

1. Mettre à jour `prisma/schema.prisma`
2. Créer les validators dans `src/lib/validators/`
3. Créer les types dans `src/lib/types/`
4. Créer le service dans `src/lib/services/`
5. Créer les API routes dans `src/app/api/`
6. Créer les composants UI dans `src/app/` ou `src/components/`

## 🔐 Sécurité

- **Authentification :** Toutes les API routes admin vérifient `session.user?.role === "ADMIN"`
- **Validation double :** Zod côté client (UX) + côté serveur (sécurité)
- **Transactions Prisma :** Opérations atomiques pour éviter les états incohérents
- **Types stricts :** TypeScript + Prisma garantissent la type-safety

## 🚀 Préparation SaaS multi-clients (Futur)

Cette architecture facilite les évolutions suivantes :

1. **Ajout d'un tenant_id :** Simple ajout dans Prisma, filtrage dans les services
2. **Row-Level Security (RLS) :** Déjà isolé dans les services
3. **API publique :** Exposer les services existants via REST/GraphQL
4. **Microservices :** Services déjà découplés, extraction facile

## 📚 Technologies utilisées

- **Framework :** Next.js 14+ (App Router)
- **Langage :** TypeScript
- **Base de données :** PostgreSQL + Prisma ORM
- **Authentification :** NextAuth.js v5
- **Validation :** Zod
- **UI :** React 19 + Tailwind CSS
- **Formulaires :** React Hook Form
- **Éditeur :** TipTap (WYSIWYG)
- **Drag & Drop :** @dnd-kit

## 🎓 Bonnes pratiques

### ✅ À FAIRE

- Toujours valider avec Zod (client + serveur)
- Utiliser les services pour toute interaction DB
- Typer strictement avec TypeScript
- Documenter les fonctions publiques (JSDoc)
- Gérer les erreurs de manière centralisée

### ❌ À ÉVITER

- ❌ Importer Prisma dans les composants UI
- ❌ Logique métier dans les API routes
- ❌ Validation inline (utiliser les schémas centralisés)
- ❌ Types any (sauf cas exceptionnels avec @ts-ignore documenté)
- ❌ Mutations directes sans transaction

## 🧪 Tests (À implémenter)

Structure recommandée pour les tests futurs :

```
__tests__/
├── services/
│   └── curriculum.service.test.ts
├── validators/
│   └── curriculum.test.ts
└── api/
    └── curriculum.api.test.ts
```

## 📞 Support & Contribution

Pour toute question sur l'architecture :
1. Consulter ce document
2. Examiner les exemples existants dans `src/lib/services/curriculum.service.ts`
3. Respecter les conventions établies

---

**🎯 Objectif final :** Code maintenable, scalable, et prêt pour une transformation en SaaS multi-clients sans refonte majeure.

