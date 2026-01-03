import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import UnitViewerClient from "../../UnitViewer";

export default async function UnitPage({ 
  params 
}: { 
  params: Promise<{ phaseSlug: string, unitSlug: string }> 
}) {
  const session = await auth();
  const { phaseSlug, unitSlug } = await params;

  if (!session?.user) {
    redirect("/auth/login");
  }

  // Fetch current unit (must be published)
  const currentUnit = await prisma.unit.findFirst({
    where: { 
      slug: unitSlug,
      isPublished: true,
      phase: { isPublished: true }
    },
    include: {
      phase: true,
      resources: true,
      progress: {
        where: { userId: session.user.id }
      }
    }
  });

  if (!currentUnit || currentUnit.phase.slug !== phaseSlug) {
    notFound();
  }

  // Fetch navigation context: previous and next units in the same phase
  const previousUnit = await prisma.unit.findFirst({
    where: {
      phaseId: currentUnit.phaseId,
      orderIndex: { lt: currentUnit.orderIndex },
      isPublished: true
    },
    orderBy: { orderIndex: 'desc' },
    select: { id: true, title: true, slug: true }
  });

  const nextUnit = await prisma.unit.findFirst({
    where: {
      phaseId: currentUnit.phaseId,
      orderIndex: { gt: currentUnit.orderIndex },
      isPublished: true
    },
    orderBy: { orderIndex: 'asc' },
    select: { id: true, title: true, slug: true }
  });

  // Fetch all published phases for context
  const allPhases = await prisma.phase.findMany({
    where: { isPublished: true },
    orderBy: { orderIndex: 'asc' },
    include: {
      units: {
        where: { isPublished: true },
        orderBy: { orderIndex: 'asc' },
        include: {
          progress: {
            where: { userId: session.user.id }
          }
        }
      }
    }
  });

  // Format data for client
  const formattedCurrentUnit = {
    id: currentUnit.id,
    title: currentUnit.title,
    content: currentUnit.content,
    videoProvider: currentUnit.videoProvider,
    videoId: currentUnit.videoId,
    isCompleted: currentUnit.progress.length > 0,
    resources: currentUnit.resources.map(r => ({
      id: r.id,
      title: r.title,
      type: r.type,
      url: r.url,
      textContent: r.textContent
    }))
  };

  const formattedPhases = allPhases.map(phase => ({
    id: phase.id,
    title: phase.title,
    slug: phase.slug,
    outcome: phase.outcome,
    units: phase.units.map(u => ({
      id: u.id,
      title: u.title,
      slug: u.slug,
      isCompleted: u.progress.length > 0
    }))
  }));

  // Trouver la phase courante dans formattedPhases pour avoir les units
  const formattedCurrentPhase = formattedPhases.find(p => p.id === currentUnit.phase.id)!;

  // Format navigation context
  const navigationContext = {
    previous: previousUnit ? {
      title: previousUnit.title,
      slug: previousUnit.slug,
      url: `/academie/cours/${phaseSlug}/${previousUnit.slug}`
    } : null,
    next: nextUnit ? {
      title: nextUnit.title,
      slug: nextUnit.slug,
      url: `/academie/cours/${phaseSlug}/${nextUnit.slug}`
    } : null
  };

  return (
    <UnitViewerClient 
      currentUnit={formattedCurrentUnit as any}
      currentPhase={formattedCurrentPhase as any}
      allPhases={formattedPhases as any}
      navigation={navigationContext}
    />
  );
}
