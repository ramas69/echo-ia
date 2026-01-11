import { PrismaClient, PhaseStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const email = "thomas.durant@example.com";

    // 1. Trouver Thomas
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        console.error("Thomas non trouvé !");
        return;
    }

    // 2. Récupérer les phases et unités disponibles
    const phases = await prisma.phase.findMany({
        include: { units: { orderBy: { orderIndex: 'asc' } } },
        orderBy: { orderIndex: 'asc' }
    });

    if (phases.length === 0) {
        console.warn("Aucune phase trouvée dans la base. Créez du contenu d'abord.");
        return;
    }

    console.log(`--- Simulation de progression pour ${user.name} ---`);

    // 3. Débloquer la première Phase
    const firstPhase = phases[0];
    await prisma.userPhaseStatus.upsert({
        where: {
            userId_phaseId: { userId: user.id, phaseId: firstPhase.id }
        },
        update: { status: 'UNLOCKED' },
        create: {
            userId: user.id,
            phaseId: firstPhase.id,
            status: 'UNLOCKED'
        }
    });
    console.log(`Phase débloquée : ${firstPhase.title}`);

    // 4. Marquer les 2 premières unités comme complétées
    if (firstPhase.units.length > 0) {
        const unitsToComplete = firstPhase.units.slice(0, 2);
        for (const unit of unitsToComplete) {
            await prisma.userProgress.upsert({
                where: {
                    userId_unitId: { userId: user.id, unitId: unit.id }
                },
                update: { completedAt: new Date() },
                create: {
                    userId: user.id,
                    unitId: unit.id,
                    completedAt: new Date()
                }
            });
            console.log(`Unité complétée : ${unit.title}`);
        }
    }

    console.log('--- Fin de la simulation ---');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
