import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Create a Course
  const course = await prisma.course.upsert({
    where: { id: 'course-echo-ia' },
    update: {},
    create: {
      id: 'course-echo-ia',
      title: "L'ÉCHO IA : L'Infrastructure de Croissance",
      description: "L'infrastructure d'IA propriétaire pour les coachs.",
      published: true,
    }
  });

  // 2. Create Module 1
  const module1 = await prisma.module.upsert({
    where: { id: 'mod-01' },
    update: {},
    create: {
      id: 'mod-01',
      title: "PHASE 1 // LE SECOND CERVEAU",
      slug: "second-cerveau",
      description: "Organiser votre expertise pour ne plus jamais vous répéter.",
      outcome: "À la fin de ce module, votre base de connaissances Notion est active et prête à recevoir votre savoir.",
      order: 1,
      courseId: course.id,
      finalActionTitle: "Validation de la Phase 1",
      finalActionDesc: "Partagez une capture d'écran de votre Vault configuré sur le Discord dans le canal #victoires.",
    }
  });

  // 3. Create Lesson 1.1
  const lesson1 = await prisma.lesson.upsert({
    where: { id: 'unit-1-1' },
    update: {},
    create: {
      id: 'unit-1-1',
      title: "1.1 La structure du Vault",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Exemple YouTube
      duration: "12:45",
      order: 1,
      moduleId: module1.id,
    }
  });

  await prisma.resource.createMany({
    data: [
      { id: 'res-1', type: 'notion', label: 'Template Vault', url: 'https://notion.so/template', lessonId: lesson1.id }
    ],
    skipDuplicates: true
  });

  // 4. Create Lesson 1.2
  const lesson2 = await prisma.lesson.upsert({
    where: { id: 'unit-1-2' },
    update: {},
    create: {
      id: 'unit-1-2',
      title: "1.2 Vectoriser votre expertise",
      videoUrl: "https://www.loom.com/share/example-id", // Exemple Loom
      duration: "18:30",
      order: 2,
      moduleId: module1.id,
    }
  });

  await prisma.resource.createMany({
    data: [
      { id: 'res-2', type: 'pdf', label: "Checklist d'ingestion", url: 'https://echo.ia/checklist.pdf', lessonId: lesson2.id },
      { id: 'res-3', type: 'prompt', label: 'Prompt de structuration', content: "Tu es un expert en ingénierie de la connaissance. Voici mon expertise : [INSÉRER ICI]. Organise-la selon la méthode L'ÉCHO IA.", lessonId: lesson2.id }
    ],
    skipDuplicates: true
  });

  console.log("Base de données initialisée avec le Module 1.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

