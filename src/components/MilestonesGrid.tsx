'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  description: string;
  icon: string;
  threshold: number;
  type: string;
  isUnlocked: boolean;
  unlockedAt?: Date;
}

interface MilestonesGridProps {
  milestones: Milestone[];
}

export default function MilestonesGrid({ milestones }: MilestonesGridProps) {
  const unlocked = milestones.filter((m) => m.isUnlocked);
  const locked = milestones.filter((m) => !m.isUnlocked);

  return (
    <div className="glass-card p-8 rounded-[2rem] border border-[var(--border-subtle)]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-light uppercase tracking-tighter text-[var(--emerald-deep)]">
          Objectifs & Badges
        </h3>
        <div className="text-sm text-[var(--text-secondary)]">
          <span className="font-bold text-[var(--emerald-deep)]">{unlocked.length}</span>
          <span className="text-[var(--text-secondary)]">/{milestones.length}</span>
        </div>
      </div>

      {/* Barre de progression globale */}
      <div className="mb-8">
        <div className="w-full bg-[var(--bg-secondary)] rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(unlocked.length / milestones.length) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-[var(--emerald-deep)] to-[var(--gold-vivid)]"
          />
        </div>
      </div>

      {/* Grille des milestones */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`
              relative p-4 rounded-2xl border-2 transition-all group cursor-pointer
              ${
                milestone.isUnlocked
                  ? 'bg-gradient-to-br from-[var(--emerald-deep)]/10 to-transparent border-[var(--emerald-deep)]/30 hover:border-[var(--emerald-deep)] hover:shadow-lg'
                  : 'bg-gray-50 border-gray-200 hover:border-gray-300'
              }
            `}
          >
            {/* Icône */}
            <div className="relative mb-3">
              <div
                className={`
                w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl transition-all
                ${
                  milestone.isUnlocked
                    ? 'bg-gradient-to-br from-[var(--emerald-deep)] to-[var(--emerald-vivid)] group-hover:scale-110'
                    : 'bg-gray-200 grayscale opacity-50'
                }
              `}
              >
                {milestone.isUnlocked ? (
                  milestone.icon
                ) : (
                  <Lock className="w-6 h-6 text-gray-400" />
                )}
              </div>

              {/* Badge "Débloqué" */}
              {milestone.isUnlocked && (
                <div className="absolute -top-1 -right-1">
                  <CheckCircle className="w-5 h-5 text-[var(--emerald-deep)] fill-white" />
                </div>
              )}
            </div>

            {/* Titre */}
            <h4
              className={`
              text-xs font-bold text-center mb-1 line-clamp-2
              ${milestone.isUnlocked ? 'text-[var(--emerald-deep)]' : 'text-gray-400'}
            `}
            >
              {milestone.title}
            </h4>

            {/* Description */}
            <p
              className={`
              text-[10px] text-center line-clamp-2
              ${milestone.isUnlocked ? 'text-[var(--text-secondary)]' : 'text-gray-400'}
            `}
            >
              {milestone.description}
            </p>

            {/* Date de déverrouillage */}
            {milestone.isUnlocked && milestone.unlockedAt && (
              <p className="text-[9px] text-center text-[var(--text-secondary)] mt-2 italic">
                {new Date(milestone.unlockedAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                })}
              </p>
            )}

            {/* Overlay de brillance au hover */}
            {milestone.isUnlocked && (
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{
                  background:
                    'linear-gradient(135deg, transparent 30%, rgba(16, 185, 129, 0.1) 50%, transparent 70%)',
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Message si aucun débloqué */}
      {unlocked.length === 0 && (
        <div className="mt-8 text-center p-6 rounded-2xl bg-gradient-to-br from-[var(--emerald-deep)]/5 to-transparent">
          <p className="text-sm text-[var(--text-secondary)] italic">
            Complétez votre première activation pour débloquer votre premier badge ! 🎯
          </p>
        </div>
      )}
    </div>
  );
}

