import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import AcademieClient from "./AcademieClient";
import { PhaseStatus } from "@prisma/client";

export default async function AcademiePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { 
      progress: true,
      phaseStatuses: true
    },
  });

  if (!user) {
    redirect("/auth/login");
  }

  // Fetch all phases with units
  const phases = await prisma.phase.findMany({
    where: { isPublished: true },
    orderBy: { orderIndex: 'asc' },
    include: {
      units: {
        where: { isPublished: true },
        orderBy: { orderIndex: 'asc' },
        include: {
          progress: {
            where: { userId: user.id }
          }
        }
      },
      userStatuses: {
        where: { userId: user.id }
      }
    }
  });

  // Calculate global progress based on published units only
  const totalUnits = await prisma.unit.count({
    where: { isPublished: true }
  });
  const completedUnits = await prisma.userProgress.count({
    where: { 
      userId: user.id,
      unit: { isPublished: true }
    }
  });
  const progressPercent = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;

  // Format phases for client
  const formattedPhases = phases.map(phase => {
    const userStatus = phase.userStatuses[0]?.status || (phase.orderIndex === 1 ? "UNLOCKED" : "LOCKED");
    
    return {
      id: phase.id,
      title: phase.title,
      slug: phase.slug,
      description: phase.description,
      outcome: phase.outcome,
      status: userStatus,
      units: phase.units.map(unit => ({
        id: unit.id,
        title: unit.title,
        slug: unit.slug,
        duration: `${Math.floor(unit.durationSec / 60)}:${(unit.durationSec % 60).toString().padStart(2, '0')}`,
        isCompleted: unit.progress.length > 0
      }))
    };
  });

  return (
    <AcademieClient 
      userName={user.name || "Membre"} 
      initialProgress={progressPercent}
      phases={formattedPhases as any}
      userRole={user.role}
    />
  );
}
