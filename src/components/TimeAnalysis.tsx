'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Calendar, Zap } from 'lucide-react';

interface TimeInsight {
  bestDay: string;
  bestHour: string;
  avgPerDay: number;
  peakProductivity: string;
}

interface TimeAnalysisProps {
  insights: TimeInsight;
}

export default function TimeAnalysis({ insights }: TimeAnalysisProps) {
  const cards = [
    {
      icon: Calendar,
      label: 'Meilleur jour',
      value: insights.bestDay,
      color: 'from-blue-500 to-blue-600',
      emoji: '📅',
    },
    {
      icon: Clock,
      label: 'Heure optimale',
      value: insights.bestHour,
      color: 'from-purple-500 to-purple-600',
      emoji: '⏰',
    },
    {
      icon: TrendingUp,
      label: 'Moyenne / jour',
      value: `${insights.avgPerDay.toFixed(1)} act.`,
      color: 'from-emerald-500 to-emerald-600',
      emoji: '📊',
    },
    {
      icon: Zap,
      label: 'Pic de productivité',
      value: insights.peakProductivity,
      color: 'from-amber-500 to-amber-600',
      emoji: '⚡',
    },
  ];

  return (
    <div className="glass-card p-8 rounded-[2rem] border border-[var(--border-subtle)]">
      <h3 className="text-lg font-light uppercase tracking-tighter mb-6 text-[var(--emerald-deep)]">
        Analyse Temporelle
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative p-4 rounded-2xl bg-gradient-to-br border border-white/20 overflow-hidden group cursor-pointer hover:scale-105 transition-transform"
            style={{ background: `linear-gradient(135deg, var(--emerald-deep) 0%, var(--emerald-vivid) 100%)` }}
          >
            {/* Icône emoji en arrière-plan */}
            <div className="absolute top-2 right-2 text-3xl opacity-20 group-hover:opacity-30 transition-opacity">
              {card.emoji}
            </div>

            {/* Contenu */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <card.icon className="w-4 h-4 text-white/80" />
                <p className="text-[9px] font-black uppercase tracking-wider text-white/80">
                  {card.label}
                </p>
              </div>
              <p className="text-lg font-bold text-white">{card.value}</p>
            </div>

            {/* Shine effect on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Recommandation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200"
      >
        <p className="text-xs text-amber-800 leading-relaxed">
          💡 <strong>Conseil:</strong> Planifiez vos sessions d'apprentissage les{' '}
          <strong>{insights.bestDay}</strong> vers <strong>{insights.bestHour}</strong> pour maximiser
          votre productivité !
        </p>
      </motion.div>
    </div>
  );
}

