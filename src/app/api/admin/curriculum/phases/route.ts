/**
 * API ROUTE - PHASES COLLECTION
 * 
 * Endpoint pour créer une nouvelle phase.
 * 
 * @route POST /api/admin/curriculum/phases
 */

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createPhase } from "@/lib/services/curriculum.service";
import { createPhaseSchema } from "@/lib/validators/curriculum";

/**
 * Crée une nouvelle phase
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
    const validatedData = createPhaseSchema.parse(rawData);

    // 3. Appeler le service
    const newPhase = await createPhase(validatedData);

    // 4. Réponse structurée
    return NextResponse.json({
      success: true,
      data: newPhase,
      message: "Phase créée avec succès"
    }, { status: 201 });

  } catch (error) {
    console.error("[API] Error creating phase:", error);

    // Gestion des erreurs de validation Zod
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: "Données invalides", details: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Erreur lors de la création de la phase" },
      { status: 500 }
    );
  }
}

