# ✅ VÉRIFICATION DES ROUTES API

## 📍 ROUTES PHASES

| Route | Fichier | Statut |
|-------|---------|--------|
| `POST /api/admin/curriculum/phases` | `src/app/api/admin/curriculum/phases/route.ts` | ✅ Existe |
| `PATCH /api/admin/curriculum/phases/[id]` | `src/app/api/admin/curriculum/phases/[id]/route.ts` | ✅ Existe |
| `DELETE /api/admin/curriculum/phases/[id]` | `src/app/api/admin/curriculum/phases/[id]/route.ts` | ✅ Existe |
| `POST /api/admin/curriculum/phases/reorder` | `src/app/api/admin/curriculum/phases/reorder/route.ts` | ✅ Existe |

### Utilisées par :
- ✅ `src/app/admin/phases/ManagePhaseClient.tsx` - CORRIGÉ
- ✅ `src/app/admin/phases/PhaseActions.tsx` - CORRIGÉ
- ✅ `src/app/admin/curriculum/CurriculumManager.tsx` - CORRECT

---

## 📍 ROUTES UNITS

| Route | Fichier | Statut |
|-------|---------|--------|
| `POST /api/admin/curriculum/units` | `src/app/api/admin/curriculum/units/route.ts` | ✅ Existe |
| `PATCH /api/admin/curriculum/units/[id]` | `src/app/api/admin/curriculum/units/[id]/route.ts` | ✅ Existe |
| `DELETE /api/admin/curriculum/units/[id]` | `src/app/api/admin/curriculum/units/[id]/route.ts` | ✅ Existe |
| `POST /api/admin/curriculum/units/reorder` | `src/app/api/admin/curriculum/units/reorder/route.ts` | ✅ Existe |

### Utilisées par :
- ✅ `src/app/admin/curriculum/units/[unitId]/edit/UnitEditor.tsx` - CORRECT
- ✅ `src/app/admin/curriculum/CurriculumManager.tsx` - CORRECT

---

## ⚠️ ANCIENNES ROUTES (SUPPRIMÉES)

| Route | Statut |
|-------|--------|
| `/api/admin/phases/*` | ❌ SUPPRIMÉ (remplacé par `/api/admin/curriculum/phases/*`) |
| `/api/admin/units/*` | ❌ N'A JAMAIS EXISTÉ |

---

## 🔍 DIAGNOSTIC

Toutes les routes utilisent déjà la bonne structure `/api/admin/curriculum/*`.

Si vous avez une erreur 404, cela peut venir de :

1. **Cache Next.js** → Solution : `rm -rf .next && npm run dev`
2. **Serveur non redémarré** → Solution : Arrêter et relancer `npm run dev`
3. **Route mal formée** → Vérifier l'URL exacte dans la console réseau
4. **Paramètre manquant** → Vérifier que l'ID est bien passé

---

## 🧪 TESTER LES ROUTES MANUELLEMENT

### Test Phase Update (curl)
```bash
curl -X PATCH http://localhost:3000/api/admin/curriculum/phases/{PHASE_ID} \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Phase Updated"}'
```

### Test Unit Update (curl)
```bash
curl -X PATCH http://localhost:3000/api/admin/curriculum/units/{UNIT_ID} \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Unit Updated"}'
```

---

## 📝 URLS COMPLÈTES ATTENDUES

Quand vous sauvegardez une unité, l'URL de la requête devrait être :

```
PATCH http://localhost:3000/api/admin/curriculum/units/{ID_DE_L_UNITE}
```

Si vous voyez une 404, vérifiez dans la console réseau (F12) l'URL exacte qui est appelée.

