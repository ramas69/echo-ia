/**
 * API ROUTE - UNITS COLLECTION
 * 
 * Endpoint pour créer une nouvelle unité.
 * 
 * @route POST /api/admin/curriculum/units
 */

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createUnit } from "@/lib/services/curriculum.service";
import { createUnitSchema } from "@/lib/validators/curriculum";

/**
 * Crée une nouvelle unité
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
    const validatedData = createUnitSchema.parse(rawData);

    // 3. Appeler le service
    const newUnit = await createUnit(validatedData);

    // 4. Réponse structurée
    return NextResponse.json({
      success: true,
      data: newUnit,
      message: "Unité créée avec succès"
    }, { status: 201 });

  } catch (error) {
    console.error("[API] Error creating unit:", error);

    // Gestion des erreurs de validation Zod
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: "Données invalides", details: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Erreur lors de la création de l'unité" },
      { status: 500 }
    );
  }
}
