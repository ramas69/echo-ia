import { PrismaClient, MilestoneType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🎯 Seeding milestones...');

  const milestones: Array<{
    title: string;
    description: string;
    icon: string;
    threshold: number;
    type: MilestoneType;
    orderIndex: number;
  }> = [
    {
      title: 'Premier Pas',
      description: 'Complétez votre première activation',
      icon: '🎯',
      threshold: 1,
      type: MilestoneType.PROGRESSION,
      orderIndex: 1,
    },
    {
      title: 'En Route',
      description: 'Atteignez 25% de progression',
      icon: '🚀',
      threshold: 25,
      type: MilestoneType.PROGRESSION,
      orderIndex: 2,
    },
    {
      title: 'À Mi-Chemin',
      description: 'Atteignez 50% de progression',
      icon: '⚡',
      threshold: 50,
      type: MilestoneType.PROGRESSION,
      orderIndex: 3,
    },
    {
      title: 'Expert en Devenir',
      description: 'Atteignez 75% de progression',
      icon: '💎',
      threshold: 75,
      type: MilestoneType.PROGRESSION,
      orderIndex: 4,
    },
    {
      title: 'Maître du Protocole',
      description: 'Complétez 100% du programme',
      icon: '👑',
      threshold: 100,
      type: MilestoneType.PROGRESSION,
      orderIndex: 5,
    },
    {
      title: 'Premier Pilier',
      description: 'Complétez entièrement votre premier pilier',
      icon: '🏛️',
      threshold: 1,
      type: MilestoneType.COMPLETION,
      orderIndex: 6,
    },
    {
      title: 'Marathon',
      description: 'Complétez 5 activations en une seule journée',
      icon: '🏃',
      threshold: 5,
      type: MilestoneType.SPEED,
      orderIndex: 7,
    },
    {
      title: 'Sprint',
      description: 'Complétez 3 activations en une heure',
      icon: '⚡',
      threshold: 3,
      type: MilestoneType.SPEED,
      orderIndex: 8,
    },
    {
      title: 'Série de 7',
      description: 'Maintenez une série de 7 jours consécutifs',
      icon: '🔥',
      threshold: 7,
      type: MilestoneType.STREAK,
      orderIndex: 9,
    },
    {
      title: 'Mois Parfait',
      description: 'Maintenez une série de 30 jours',
      icon: '🌟',
      threshold: 30,
      type: MilestoneType.STREAK,
      orderIndex: 10,
    },
    {
      title: 'Dévoué',
      description: 'Investissez 10+ heures au total',
      icon: '⏰',
      threshold: 600, // minutes
      type: MilestoneType.DEDICATION,
      orderIndex: 11,
    },
    {
      title: 'Passionné',
      description: 'Investissez 50+ heures au total',
      icon: '💪',
      threshold: 3000, // minutes
      type: MilestoneType.DEDICATION,
      orderIndex: 12,
    },
  ];

  for (const milestone of milestones) {
    await prisma.milestone.upsert({
      where: { id: milestone.title.toLowerCase().replace(/\s+/g, '-') },
      update: milestone,
      create: {
        id: milestone.title.toLowerCase().replace(/\s+/g, '-'),
        ...milestone,
      },
    });
  }

  console.log('✅ Milestones seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

