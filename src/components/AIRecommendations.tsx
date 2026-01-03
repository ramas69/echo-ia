'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Target, Zap, Calendar } from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'motivation' | 'planning' | 'achievement' | 'insight';
  title: string;
  message: string;
  icon: string;
}

interface AIRecommendationsProps {
  recommendations: Recommendation[];
}

export default function AIRecommendations({ recommendations }: AIRecommendationsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'motivation':
        return Sparkles;
      case 'planning':
        return Calendar;
      case 'achievement':
        return Target;
      case 'insight':
        return TrendingUp;
      default:
        return Zap;
    }
  };

  const getGradient = (type: string) => {
    switch (type) {
      case 'motivation':
        return 'from-purple-500 to-pink-500';
      case 'planning':
        return 'from-blue-500 to-cyan-500';
      case 'achievement':
        return 'from-emerald-500 to-teal-500';
      case 'insight':
        return 'from-amber-500 to-orange-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="glass-card p-8 rounded-[2rem] border border-[var(--border-subtle)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-light uppercase tracking-tighter text-[var(--emerald-deep)]">
          Recommandations IA
        </h3>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => {
          const Icon = getIcon(rec.type);
          const gradient = getGradient(rec.type);

          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative p-5 rounded-2xl bg-gradient-to-br from-[var(--bg-secondary)] to-white border border-[var(--border-subtle)] hover:shadow-lg transition-shadow group"
            >
              {/* Icône avec gradient */}
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <div className="flex-1">
                  {/* Emoji + Titre */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{rec.icon}</span>
                    <h4 className="text-sm font-bold text-[var(--emerald-deep)]">{rec.title}</h4>
                  </div>

                  {/* Message */}
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{rec.message}</p>
                </div>
              </div>

              {/* Effet de brillance au hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{
                  background:
                    'linear-gradient(135deg, transparent 30%, rgba(139, 92, 246, 0.05) 50%, transparent 70%)',
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

