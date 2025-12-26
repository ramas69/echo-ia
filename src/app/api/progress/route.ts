import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { unitId } = await req.json();

    if (!unitId) {
      return NextResponse.json({ message: "Missing unitId" }, { status: 400 });
    }

    // Mark unit as completed
    const progress = await prisma.userProgress.upsert({
      where: {
        userId_unitId: {
          userId: session.user.id,
          unitId: unitId,
        },
      },
      update: {
        completedAt: new Date(),
      },
      create: {
        userId: session.user.id,
        unitId: unitId,
        completedAt: new Date(),
      },
    });

    // Check if all units in the phase are completed to unlock the next phase
    const unit = await prisma.unit.findUnique({
      where: { id: unitId },
      include: { phase: true }
    });

    if (unit) {
      const allUnitsInPhase = await prisma.unit.findMany({
        where: { phaseId: unit.phaseId }
      });

      const completedUnitsInPhase = await prisma.userProgress.count({
        where: {
          userId: session.user.id,
          unitId: { in: allUnitsInPhase.map(u => u.id) },
          completedAt: { not: null }
        }
      });

      if (completedUnitsInPhase === allUnitsInPhase.length) {
        // Mark phase as completed
        await prisma.userPhaseStatus.upsert({
          where: {
            userId_phaseId: {
              userId: session.user.id,
              phaseId: unit.phaseId
            }
          },
          update: { status: 'COMPLETED' },
          create: {
            userId: session.user.id,
            phaseId: unit.phaseId,
            status: 'COMPLETED'
          }
        });

        // Unlock next phase
        const nextPhase = await prisma.phase.findFirst({
          where: { orderIndex: unit.phase.orderIndex + 1 }
        });

        if (nextPhase) {
          await prisma.userPhaseStatus.upsert({
            where: {
              userId_phaseId: {
                userId: session.user.id,
                phaseId: nextPhase.id
              }
            },
            update: { status: 'UNLOCKED' },
            create: {
              userId: session.user.id,
              phaseId: nextPhase.id,
              status: 'UNLOCKED'
            }
          });
        }
      }
    }

    return NextResponse.json(progress);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error updating progress" }, { status: 500 });
  }
}

