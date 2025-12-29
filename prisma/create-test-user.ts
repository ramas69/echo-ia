import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];
  const name = process.argv[4] || "Test User";

  if (!email || !password) {
    console.log("❌ Usage: npx tsx prisma/create-test-user.ts <email> <password> [name]");
    console.log("📝 Exemple: npx tsx prisma/create-test-user.ts test@test.com password123 'John Doe'");
    process.exit(1);
  }

  console.log("🔵 Création/Mise à jour de l'utilisateur...");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📧 Email:", email);
  console.log("👤 Nom:", name);
  console.log("🔐 Mot de passe:", "*".repeat(password.length));
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  const cleanEmail = email.trim().toLowerCase();
  const hashedPassword = await bcrypt.hash(password.trim(), 10);

  console.log("🔐 Hachage du mot de passe... OK (longueur:", hashedPassword.length, ")");

  const user = await prisma.user.upsert({
    where: { email: cleanEmail },
    update: { 
      password: hashedPassword,
      name: name,
    },
    create: {
      email: cleanEmail,
      name: name,
      password: hashedPassword,
      role: "STUDENT"
    }
  });

  console.log("✅ Utilisateur créé/mis à jour avec succès!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📋 Détails:");
  console.log("  - ID:", user.id);
  console.log("  - Email:", user.email);
  console.log("  - Nom:", user.name);
  console.log("  - Rôle:", user.role);
  console.log("  - Créé le:", user.createdAt);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("✅ Vous pouvez maintenant vous connecter avec:");
  console.log("   Email:", user.email);
  console.log("   Mot de passe: (celui que vous avez fourni)");
}

main()
  .catch((e) => {
    console.error("❌ Erreur:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

