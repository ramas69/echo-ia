import { UserProgress, Milestone, UserMilestone, UserNote } from '@prisma/client';

export interface ProgressDataPoint {
  date: string;
  count: number;
  label: string;
}

export interface TimeInsight {
  bestDay: string;
  bestHour: string;
  avgPerDay: number;
  peakProductivity: string;
}

export interface AIRecommendation {
  id: string;
  type: 'motivation' | 'planning' | 'achievement' | 'insight';
  title: string;
  message: string;
  icon: string;
}

/**
 * Génère les données pour le graphique de progression (derniers 7 jours)
 */
export function generateProgressChartData(
  progressRecords: (UserProgress & { completedAt: Date | null })[]
): ProgressDataPoint[] {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    date.setHours(0, 0, 0, 0);
    return date;
  });

  return last7Days.map((date, index) => {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);

    const count = progressRecords.filter((p) => {
      if (!p.completedAt) return false;
      const completedDate = new Date(p.completedAt);
      return completedDate >= date && completedDate < nextDay;
    }).length;

    const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const label = index === 6 ? "Aujourd'hui" : dayNames[date.getDay()];

    return {
      date: date.toISOString(),
      count,
      label,
    };
  });
}

/**
 * Analyse temporelle intelligente
 */
export function generateTimeInsights(
  progressRecords: (UserProgress & { completedAt: Date | null })[]
): TimeInsight {
  const completed = progressRecords.filter((p) => p.completedAt !== null);

  if (completed.length === 0) {
    return {
      bestDay: 'Pas encore de données',
      bestHour: 'Pas encore de données',
      avgPerDay: 0,
      peakProductivity: 'Pas encore de données',
    };
  }

  // Compter par jour de la semaine
  const dayCount: Record<number, number> = {};
  const hourCount: Record<number, number> = {};

  completed.forEach((p) => {
    const date = new Date(p.completedAt!);
    const day = date.getDay();
    const hour = date.getHours();

    dayCount[day] = (dayCount[day] || 0) + 1;
    hourCount[hour] = (hourCount[hour] || 0) + 1;
  });

  // Trouver le meilleur jour
  const bestDayNum = Number(
    Object.entries(dayCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 0
  );
  const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const bestDay = dayNames[bestDayNum];

  // Trouver la meilleure heure
  const bestHourNum = Number(
    Object.entries(hourCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 0
  );
  const bestHour = `${bestHourNum}h - ${bestHourNum + 1}h`;

  // Calculer la moyenne par jour
  const oldestDate = new Date(
    Math.min(...completed.map((p) => new Date(p.completedAt!).getTime()))
  );
  const daysSinceStart = Math.max(
    1,
    Math.ceil((Date.now() - oldestDate.getTime()) / (1000 * 60 * 60 * 24))
  );
  const avgPerDay = completed.length / daysSinceStart;

  // Pic de productivité
  const peakProductivity =
    completed.length >= 5 ? `${bestDay} ${bestHour}` : 'En cours d\'analyse...';

  return {
    bestDay,
    bestHour,
    avgPerDay,
    peakProductivity,
  };
}

/**
 * Génère des recommandations IA personnalisées
 */
export function generateAIRecommendations(
  progressPercent: number,
  totalMinutes: number,
  completedUnits: number,
  insights: TimeInsight
): AIRecommendation[] {
  const recommendations: AIRecommendation[] = [];

  // Recommandation basée sur la progression
  if (progressPercent < 25) {
    recommendations.push({
      id: 'progress-boost',
      type: 'motivation',
      title: 'Accélérez votre progression !',
      message: `Vous êtes à ${progressPercent}%. Essayez de compléter 2-3 activations par semaine pour atteindre 50% d'ici un mois.`,
      icon: '🚀',
    });
  } else if (progressPercent >= 75) {
    recommendations.push({
      id: 'almost-master',
      type: 'achievement',
      title: 'Presque Maître !',
      message: `Plus que ${100 - progressPercent}% ! Vous êtes sur le point de devenir un Maître du Protocole. Continuez !`,
      icon: '👑',
    });
  }

  // Recommandation basée sur le temps optimal
  if (insights.avgPerDay > 0) {
    recommendations.push({
      id: 'optimal-timing',
      type: 'planning',
      title: 'Optimisez votre planning',
      message: `Vos meilleures performances sont les ${insights.bestDay} vers ${insights.bestHour}. Bloquez ce créneau dans votre agenda !`,
      icon: '📅',
    });
  }

  // Recommandation basée sur la constance
  if (completedUnits > 0 && insights.avgPerDay < 0.5) {
    recommendations.push({
      id: 'consistency',
      type: 'insight',
      title: 'La régularité fait la différence',
      message: `Essayez de vous connecter au moins 15 minutes par jour. Les petits efforts réguliers surpassent les grosses sessions espacées.`,
      icon: '🎯',
    });
  }

  // Recommandation basée sur le temps investi
  if (totalMinutes >= 300) {
    // 5h+
    recommendations.push({
      id: 'dedication',
      type: 'achievement',
      title: 'Votre dévouement paye !',
      message: `Vous avez investi ${Math.floor(totalMinutes / 60)}h au total. Chaque heure vous rapproche de la maîtrise.`,
      icon: '💪',
    });
  }

  return recommendations;
}

/**
 * Vérifie et retourne les milestones débloqués
 */
export function checkUnlockedMilestones(
  allMilestones: Milestone[],
  userMilestones: UserMilestone[],
  progressPercent: number,
  completedUnits: number,
  totalMinutes: number
): (Milestone & { isUnlocked: boolean; unlockedAt?: Date })[] {
  const unlockedIds = new Set(userMilestones.map((um) => um.milestoneId));

  return allMilestones.map((milestone) => {
    const userMilestone = userMilestones.find((um) => um.milestoneId === milestone.id);
    const isUnlocked = unlockedIds.has(milestone.id);

    return {
      ...milestone,
      isUnlocked,
      unlockedAt: userMilestone?.unlockedAt,
    };
  });
}

