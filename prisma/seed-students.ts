import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const students = [
        {
            name: "Thomas Durant",
            email: "thomas.durant@example.com",
            role: "STUDENT",
            avatarSeed: "thomas-123",
        },
        {
            name: "Julie Martin",
            email: "julie.martin@example.com",
            role: "STUDENT",
            avatarSeed: "julie-456",
        },
        {
            name: "Marc Lefebvre",
            email: "marc.lefebvre@example.com",
            role: "STUDENT",
            avatarSeed: "marc-789",
        },
        {
            name: "Sophie Bernard",
            email: "sophie.bernard@example.com",
            role: "STUDENT",
            avatarSeed: "sophie-abc",
        }
    ];

    console.log('--- Création des étudiants ---');

    for (const student of students) {
        const user = await prisma.user.upsert({
            where: { email: student.email },
            update: {},
            create: {
                ...student,
                emailVerified: new Date(),
            },
        });
        console.log(`Étudiant créé : ${user.name} (${user.email})`);
    }

    console.log('--- Fin de la création ---');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
