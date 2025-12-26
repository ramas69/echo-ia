/**
 * API ROUTE - REORDER UNITS
 * 
 * Endpoint pour réorganiser les unités (drag & drop).
 * 
 * @route POST /api/admin/curriculum/units/reorder
 */

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { reorderUnits } from "@/lib/services/curriculum.service";
import { reorderUnitsSchema } from "@/lib/validators/curriculum";

/**
 * Réorganise les unités
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
    const validatedData = reorderUnitsSchema.parse(rawData);

    // 3. Appeler le service
    await reorderUnits(validatedData.unitIds);

    // 4. Réponse structurée
    return NextResponse.json({
      success: true,
      message: "Ordre des unités mis à jour"
    });

  } catch (error) {
    console.error("[API] Error reordering units:", error);

    // Gestion des erreurs de validation Zod
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: "Données invalides", details: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Erreur lors de la réorganisation des unités" },
      { status: 500 }
    );
  }
}
