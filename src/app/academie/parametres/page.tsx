import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import ParametresClient from "./ParametresClient";
import {
  generateProgressChartData,
  generateTimeInsights,
  generateAIRecommendations,
  checkUnlockedMilestones,
} from "@/lib/analytics";

export default async function ParametresPage() {
  try {
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
        },
        include: {
          unit: {
            select: {
              title: true,
              durationSec: true,
            }
          }
        }
      },
      notes: {
        orderBy: { createdAt: 'desc' },
        include: {
          unit: {
            select: {
              title: true,
            }
          }
        }
      },
      milestones: {
        include: {
          milestone: true,
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

  // Calculer le temps total investi
  const totalSeconds = user.progress.reduce((sum, p) => sum + p.unit.durationSec, 0);
  const totalMinutes = Math.round(totalSeconds / 60);

  // Générer les données analytics
  const progressChartData = generateProgressChartData(user.progress);
  const timeInsights = generateTimeInsights(user.progress);
  const aiRecommendations = generateAIRecommendations(
    progressPercent,
    totalMinutes,
    completedUnits,
    timeInsights
  );

  // Récupérer tous les milestones
  const allMilestones = await prisma.milestone.findMany({
    orderBy: { orderIndex: 'asc' }
  });

  const milestonesWithStatus = checkUnlockedMilestones(
    allMilestones,
    user.milestones,
    progressPercent,
    completedUnits,
    totalMinutes
  );

  // Formater les notes
  const formattedNotes = user.notes.map(note => ({
    id: note.id,
    content: note.content,
    unitTitle: note.unit.title,
    createdAt: note.createdAt,
  }));

  return (
    <ParametresClient 
      user={{
        name: user.name || "Utilisateur",
        email: user.email!,
        role: user.role,
        avatarSeed: user.avatarSeed || user.id,
      }}
      stats={{
        totalUnits,
        completedUnits,
        progressPercent,
        totalMinutes,
      }}
      analytics={{
        progressChartData,
        timeInsights,
        aiRecommendations,
        milestones: milestonesWithStatus,
        notes: formattedNotes,
      }}
    />
  );
  } catch (error) {
    // En cas d'erreur (DB, auth, etc.), rediriger vers login
    redirect("/auth/login");
  }
}

