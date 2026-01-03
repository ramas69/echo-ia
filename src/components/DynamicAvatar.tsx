'use client';

import React from 'react';

interface DynamicAvatarProps {
  name: string;
  progressPercent: number;
  seed?: string;
  size?: number;
}

/**
 * Avatar dynamique qui évolue visuellement avec la progression
 * - 0-24%: Bleu (Débutant)
 * - 25-49%: Violet (Intermédiaire)
 * - 50-74%: Emerald (Avancé)
 * - 75-99%: Gold (Expert)
 * - 100%: Gold + Crown (Maître)
 */
export default function DynamicAvatar({ name, progressPercent, seed, size = 80 }: DynamicAvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Déterminer le palier de progression
  const getProgressTier = () => {
    if (progressPercent >= 100) return 'master';
    if (progressPercent >= 75) return 'expert';
    if (progressPercent >= 50) return 'advanced';
    if (progressPercent >= 25) return 'intermediate';
    return 'beginner';
  };

  // Gradients basés sur la progression
  const getGradient = () => {
    const tier = getProgressTier();
    switch (tier) {
      case 'master':
        return 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)'; // Gold + Orange
      case 'expert':
        return 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'; // Gold
      case 'advanced':
        return 'linear-gradient(135deg, #10B981 0%, #059669 100%)'; // Emerald
      case 'intermediate':
        return 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'; // Purple
      default:
        return 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)'; // Blue
    }
  };

  // Effet de lueur basé sur le tier
  const getGlow = () => {
    const tier = getProgressTier();
    switch (tier) {
      case 'master':
        return '0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 165, 0, 0.3)';
      case 'expert':
        return '0 0 25px rgba(245, 158, 11, 0.5)';
      case 'advanced':
        return '0 0 20px rgba(16, 185, 129, 0.4)';
      case 'intermediate':
        return '0 0 15px rgba(139, 92, 246, 0.3)';
      default:
        return '0 0 10px rgba(59, 130, 246, 0.2)';
    }
  };

  const tier = getProgressTier();
  const isMaster = tier === 'master';

  return (
    <div className="relative inline-block">
      {/* Avatar principal */}
      <div
        className="rounded-full flex items-center justify-center font-black text-white relative overflow-hidden group transition-all duration-500"
        style={{
          width: size,
          height: size,
          background: getGradient(),
          boxShadow: getGlow(),
          fontSize: size * 0.4,
        }}
      >
        {/* Effet de brillance animé */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
            animation: 'shine 3s infinite',
          }}
        />
        
        {/* Initiales */}
        <span className="relative z-10">{initials}</span>

        {/* Couronne pour les Masters (100%) */}
        {isMaster && (
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-2xl animate-bounce">
            👑
          </div>
        )}
      </div>

      {/* Indicateur de progression en anneau */}
      <svg
        className="absolute inset-0 -rotate-90"
        width={size + 8}
        height={size + 8}
        style={{ left: -4, top: -4 }}
      >
        <circle
          cx={(size + 8) / 2}
          cy={(size + 8) / 2}
          r={(size + 4) / 2}
          stroke="rgba(0,0,0,0.1)"
          strokeWidth="3"
          fill="none"
        />
        <circle
          cx={(size + 8) / 2}
          cy={(size + 8) / 2}
          r={(size + 4) / 2}
          stroke="url(#progressGradient)"
          strokeWidth="3"
          fill="none"
          strokeDasharray={`${(progressPercent / 100) * (2 * Math.PI * ((size + 4) / 2))} ${
            2 * Math.PI * ((size + 4) / 2)
          }`}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={tier === 'master' ? '#FFD700' : '#10B981'} />
            <stop offset="100%" stopColor={tier === 'master' ? '#FF8C00' : '#059669'} />
          </linearGradient>
        </defs>
      </svg>

      {/* Badge de tier (petit texte sous l'avatar) */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <div
          className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{
            background: getGradient(),
            color: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          {tier === 'master' && '👑 Maître'}
          {tier === 'expert' && '💎 Expert'}
          {tier === 'advanced' && '⚡ Avancé'}
          {tier === 'intermediate' && '🔥 Intermédiaire'}
          {tier === 'beginner' && '🎯 Débutant'}
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }
      `}</style>
    </div>
  );
}

