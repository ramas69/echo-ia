import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import ParametresClient from "./ParametresClient";

export default async function ParametresPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { 
      progress: {
        where: {
          unit: { isPublished: true }
        }
      }
    },
  });

  if (!user) {
    redirect("/auth/login");
  }

  // Calculer les statistiques
  const totalUnits = await prisma.unit.count({
    where: { isPublished: true }
  });

  const completedUnits = user.progress.length;
  const progressPercent = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;

  // Calculer le temps total investi (basé sur la durée des unités complétées)
  const completedUnitIds = user.progress.map(p => p.unitId);
  const completedUnitsData = await prisma.unit.findMany({
    where: { 
      id: { in: completedUnitIds },
      isPublished: true
    },
    select: { durationSec: true }
  });

  const totalSeconds = completedUnitsData.reduce((sum, unit) => sum + unit.durationSec, 0);
  const totalMinutes = Math.round(totalSeconds / 60);

  return (
    <ParametresClient 
      user={{
        name: user.name || "Utilisateur",
        email: user.email!,
        role: user.role,
      }}
      stats={{
        totalUnits,
        completedUnits,
        progressPercent,
        totalMinutes,
      }}
    />
  );
}

