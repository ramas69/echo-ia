import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ManagePhaseClient from "../ManagePhaseClient";

export default async function AdminManagePhasePage({ params }: { params: Promise<{ phaseId: string }> }) {
  const { phaseId } = await params;

  if (phaseId === 'new') {
    return (
      <ManagePhaseClient 
        phase={{ 
          id: 'new', 
          title: 'Nouvelle Phase', 
          slug: '',
          description: '',
          outcome: '',
          orderIndex: 1,
          checkpointInstruction: '',
          units: [] 
        }} 
      />
    );
  }

  const phase = await prisma.phase.findUnique({
    where: { id: phaseId },
    include: {
      units: {
        orderBy: { orderIndex: 'asc' },
        include: {
          resources: true
        }
      }
    }
  });

  if (!phase) notFound();

  return <ManagePhaseClient phase={phase as any} />;
}
