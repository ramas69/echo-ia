/**
 * API ROUTE - PHASE MANAGEMENT
 * 
 * Endpoint pour gérer une phase spécifique (mise à jour, suppression).
 * 
 * @route PATCH /api/admin/curriculum/phases/:id
 * @route DELETE /api/admin/curriculum/phases/:id
 */

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { updatePhase, deletePhase } from "@/lib/services/curriculum.service";
import { phaseSchema, togglePublishSchema } from "@/lib/validators/curriculum";

/**
 * Met à jour une phase
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
      const phase = await updatePhase(id, { isPublished: validatedData.isPublished });
      
      return NextResponse.json({
        success: true,
        data: phase,
        message: "Statut de publication mis à jour"
      });
    }

    // Cas général : mise à jour complète
    const validatedData = phaseSchema.partial().parse(rawData);

    // 3. Appeler le service
    const updatedPhase = await updatePhase(id, validatedData);

    // 4. Réponse structurée
    return NextResponse.json({
      success: true,
      data: updatedPhase,
      message: "Phase mise à jour avec succès"
    });

  } catch (error) {
    console.error("[API] Error updating phase:", error);

    // Gestion des erreurs de validation Zod
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: "Données invalides", details: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Erreur lors de la mise à jour de la phase" },
      { status: 500 }
    );
  }
}

/**
 * Supprime une phase
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
    await deletePhase(id);

    // 3. Réponse structurée
    return NextResponse.json({
      success: true,
      message: "Phase supprimée avec succès"
    });

  } catch (error) {
    console.error("[API] Error deleting phase:", error);

    return NextResponse.json(
      { success: false, error: "Erreur lors de la suppression de la phase" },
      { status: 500 }
    );
  }
}

