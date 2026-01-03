/**
 * API ROUTE - REORDER PHASES
 * 
 * Endpoint pour réorganiser les phases (drag & drop).
 * 
 * @route POST /api/admin/curriculum/phases/reorder
 */

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { reorderPhases } from "@/lib/services/curriculum.service";
import { reorderPhasesSchema } from "@/lib/validators/curriculum";

/**
 * Réorganise les phases
 */
export async function POST(req: Request) {
  try {
    // 1. Vérifier l'authentification
    const session = await auth();

    // @ts-ignore
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "Non autorisé" },
        { status: 401 }
      );
    }

    // 2. Parser et valider les données
    const rawData = await req.json();
    const validatedData = reorderPhasesSchema.parse(rawData);

    // 3. Appeler le service
    await reorderPhases(validatedData.phaseIds);

    // 4. Réponse structurée
    return NextResponse.json({
      success: true,
      message: "Ordre des phases mis à jour"
    });

  } catch (error) {
    console.error("[API] Error reordering phases:", error);

    // Gestion des erreurs de validation Zod
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: "Données invalides", details: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Erreur lors de la réorganisation des phases" },
      { status: 500 }
    );
  }
}
