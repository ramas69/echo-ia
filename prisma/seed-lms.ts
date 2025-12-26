import { PrismaClient, PhaseStatus, ResourceType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Démarrage du Seed LMS...");

  // 1. PHASE 1
  const phase1 = await prisma.phase.upsert({
    where: { slug: 'second-cerveau' },
    update: {},
    create: {
      title: "PHASE 1 // LE SECOND CERVEAU",
      slug: "second-cerveau",
      description: "Organiser votre expertise pour ne plus jamais vous répéter.",
      outcome: "Votre sagesse est organisée, protégée et disponible 24/7 pour ceux que vous aidez.",
      orderIndex: 1,
      checkpointInstruction: "Partagez une capture d'écran de votre Vault Notion sur le Discord dans #victoires.",
    }
  });

  // UNIT 1.1
  const unit1_1 = await prisma.unit.upsert({
    where: { slug: 'structure-vault' },
    update: {},
    create: {
      title: "1.1 La structure du Vault",
      slug: "structure-vault",
      orderIndex: 1,
      phaseId: phase1.id,
      videoProvider: "YOUTUBE",
      videoId: "dQw4w9WgXcQ",
      durationSec: 765, // 12:45
      content: "Dans cette unité, nous allons voir comment structurer votre espace de travail pour une efficacité maximale.",
    }
  });

  await prisma.resource.createMany({
    data: [
      { unitId: unit1_1.id, title: "Template Vault Premium", type: ResourceType.NOTION_TEMPLATE, url: "https://notion.so/template-id" }
    ],
    skipDuplicates: true
  });

  // UNIT 1.2
  const unit1_2 = await prisma.unit.upsert({
    where: { slug: 'vectoriser-expertise' },
    update: {},
    create: {
      title: "1.2 Vectoriser votre expertise",
      slug: "vectoriser-expertise",
      orderIndex: 2,
      phaseId: phase1.id,
      videoProvider: "YOUTUBE",
      videoId: "dQw4w9WgXcQ",
      durationSec: 1110, // 18:30
      content: "Apprenez à transformer votre savoir en données exploitables par l'IA.",
    }
  });

  await prisma.resource.createMany({
    data: [
      { unitId: unit1_2.id, title: "Guide d'ingestion PDF", type: ResourceType.PDF_GUIDE, url: "https://echo.ia/guide.pdf" },
      { unitId: unit1_2.id, title: "Prompt de structuration", type: ResourceType.PROMPT_TEXT, textContent: "Tu es un ingénieur de la connaissance..." }
    ],
    skipDuplicates: true
  });

  // 2. PHASE 2
  const phase2 = await prisma.phase.upsert({
    where: { slug: 'usine-contenu' },
    update: {},
    create: {
      title: "PHASE 2 // L'USINE À CONTENU",
      slug: "usine-contenu",
      description: "Amplifiez votre message authentique sans y laisser votre énergie vitale.",
      outcome: "Amplifiez votre message authentique sans y laisser votre énergie vitale.",
      orderIndex: 2,
      checkpointInstruction: "Postez votre premier contenu généré par votre clone dans #contenus.",
    }
  });

  // UNIT 2.1
  await prisma.unit.upsert({
    where: { slug: 'clonage-voix' },
    update: {},
    create: {
      title: "2.1 Clonage de voix",
      slug: "clonage-voix",
      orderIndex: 1,
      phaseId: phase2.id,
      videoProvider: "YOUTUBE",
      videoId: "dQw4w9WgXcQ",
      durationSec: 600,
      content: "Configuration de votre clone vocal sur ElevenLabs.",
    }
  });

  console.log("Seed LMS terminé avec succès !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

