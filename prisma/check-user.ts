import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];
  
  if (!email) {
    console.log("❌ Usage: npx tsx prisma/check-user.ts <email>");
    process.exit(1);
  }

  console.log("🔍 Recherche de l'utilisateur:", email);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  const user = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  });

  if (!user) {
    console.log("❌ Utilisateur non trouvé dans la base de données");
    console.log("\n📋 Liste de tous les utilisateurs:");
    const allUsers = await prisma.user.findMany({
      select: { email: true, name: true, role: true, createdAt: true }
    });
    console.table(allUsers);
  } else {
    console.log("✅ Utilisateur trouvé!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📧 Email:", user.email);
    console.log("👤 Nom:", user.name);
    console.log("🔑 Rôle:", user.role);
    console.log("🔐 A un mot de passe:", !!user.password);
    console.log("📏 Longueur du hash:", user.password?.length || 0);
    console.log("📅 Créé le:", user.createdAt);
    console.log("🔄 Mis à jour le:", user.updatedAt);
  }
}

main()
  .catch((e) => {
    console.error("❌ Erreur:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

