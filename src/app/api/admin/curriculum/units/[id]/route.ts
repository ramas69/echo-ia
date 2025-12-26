/**
 * API ROUTE - UNIT MANAGEMENT
 * 
 * Endpoint pour gérer une unité spécifique (mise à jour, suppression).
 * Cette route est une "thin layer" qui délègue toute la logique au service.
 * 
 * @route PATCH /api/admin/curriculum/units/:id
 * @route DELETE /api/admin/curriculum/units/:id
 */

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { 
  updateUnitWithResources, 
  deleteUnit, 
  toggleUnitPublish 
} from "@/lib/services/curriculum.service";
import { unitSchema, togglePublishSchema } from "@/lib/validators/curriculum";

/**
 * Met à jour une unité
 */
export async function PATCH(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Vérifier l'authentification
    const session = await auth();
    const { id } = await params;

    // @ts-ignore
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "Non autorisé" }, 
        { status: 401 }
      );
    }

    // 2. Parser et valider les données
    const rawData = await req.json();

    // Cas spécial : toggle publish uniquement
    if (Object.keys(rawData).length === 1 && 'isPublished' in rawData) {
      const validatedData = togglePublishSchema.parse(rawData);
      const unit = await toggleUnitPublish(id, validatedData.isPublished);
      
      return NextResponse.json({ 
        success: true, 
        data: unit,
        message: "Statut de publication mis à jour" 
      });
    }

    // Cas général : mise à jour complète
    const validatedData = unitSchema.partial().parse(rawData);
    const { resources, ...unitData } = validatedData;

    // 3. Appeler le service (logique métier encapsulée)
    const updatedUnit = await updateUnitWithResources(
      id,
      unitData,
      resources
    );

    // 4. Réponse structurée
    return NextResponse.json({ 
      success: true,
      data: updatedUnit,
      message: "Unité mise à jour avec succès"
    });

  } catch (error) {
    console.error("[API] Error updating unit:", error);
    
    // Gestion des erreurs de validation Zod
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: "Données invalides", details: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Erreur lors de la mise à jour de l'unité" },
      { status: 500 }
    );
  }
}

/**
 * Supprime une unité
 */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Vérifier l'authentification
    const session = await auth();
    const { id } = await params;

    // @ts-ignore
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "Non autorisé" },
        { status: 401 }
      );
    }

    // 2. Appeler le service
    await deleteUnit(id);

    // 3. Réponse structurée
    return NextResponse.json({
      success: true,
      message: "Unité supprimée avec succès"
    });

  } catch (error) {
    console.error("[API] Error deleting unit:", error);
    
    return NextResponse.json(
      { success: false, error: "Erreur lors de la suppression de l'unité" },
      { status: 500 }
    );
  }
}
