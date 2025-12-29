import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];

  if (!email) {
    console.log("❌ Usage: npx tsx prisma/delete-user.ts <email>");
    console.log("📝 Exemple: npx tsx prisma/delete-user.ts rama@neuf.fr");
    process.exit(1);
  }

  const cleanEmail = email.trim().toLowerCase();

  console.log("🔍 Recherche de l'utilisateur:", cleanEmail);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  const user = await prisma.user.findUnique({
    where: { email: cleanEmail },
    include: {
      progress: true,
      phaseStatuses: true,
    }
  });

  if (!user) {
    console.log("❌ Utilisateur non trouvé:", cleanEmail);
    console.log("\n📋 Liste de tous les utilisateurs:");
    const allUsers = await prisma.user.findMany({
      select: { email: true, name: true, role: true }
    });
    console.table(allUsers);
    process.exit(1);
  }

  console.log("✅ Utilisateur trouvé!");
  console.log("📧 Email:", user.email);
  console.log("👤 Nom:", user.name);
  console.log("🔑 Rôle:", user.role);
  console.log("📊 Progression:", user.progress.length, "unités complétées");
  console.log("📚 Phases:", user.phaseStatuses.length, "statuts de phase");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  
  console.log("🗑️  Suppression de l'utilisateur...");
  
  // Suppression (cascade automatique des relations grâce au schema)
  await prisma.user.delete({
    where: { email: cleanEmail },
  });

  console.log("✅ Utilisateur supprimé avec succès!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("✅ Vous pouvez maintenant créer un nouveau compte avec cet email.");
}

main()
  .catch((e) => {
    console.error("❌ Erreur:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

