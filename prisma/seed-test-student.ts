import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const email = "etudiant@test.com";
    // Note: On ne peut pas facilement créer d'utilisateur Auth Supabase direct via Prisma
    // Mais on peut créer l'entrée dans la table User pour que le dashboard le voit.
    // Pour la connexion réelle, il faudra passer par le formulaire d'inscription du site
    // ou que je te donne les étapes si tu as accès à l'interface Supabase.

    const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            name: "Étudiant Test",
            password: "etudiant1234!", // Note: Supabase Auth gère ses propres mots de passe
            role: "STUDENT",
            emailVerified: new Date(),
        },
    });

    console.log(`Entrée créée dans la base de données pour : ${user.email}`);
    console.log("IMPORTANT : Pour pouvoir vous CONNECTER, vous devez soit :");
    console.log("1. Créer le compte via la page /auth/register du site");
    console.log("2. Ou me donner votre SUPABASE_SERVICE_ROLE_KEY pour que je l'insère proprement via l'API Auth");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
