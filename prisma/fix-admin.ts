import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = "ramasoum@icloud.com";
  const password = "admin1234"; // VOTRE NOUVEAU MOT DE PASSE
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { 
      password: hashedPassword,
      role: "ADMIN" 
    },
    create: {
      email,
      name: "Admin",
      password: hashedPassword,
      role: "ADMIN"
    }
  });
  console.log("-----------------------------------------");
  console.log("SUCCÈS : Compte ADMIN configuré.");
  console.log("Email : ramasoum@icloud.com");
  console.log("Mot de passe : admin1234");
  console.log("-----------------------------------------");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

