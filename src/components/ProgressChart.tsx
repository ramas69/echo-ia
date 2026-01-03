'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DataPoint {
  date: string;
  count: number;
  label: string;
}

interface ProgressChartProps {
  data: DataPoint[];
  title: string;
}

export default function ProgressChart({ data, title }: ProgressChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="glass-card p-8 rounded-[2rem] border border-[var(--border-subtle)] text-center">
        <p className="text-sm text-[var(--text-secondary)]">Pas encore de données à afficher</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.count), 1);
  const chartHeight = 200;

  return (
    <div className="glass-card p-8 rounded-[2rem] border border-[var(--border-subtle)]">
      <h3 className="text-lg font-light uppercase tracking-tighter mb-6 text-[var(--emerald-deep)]">
        {title}
      </h3>

      {/* Graph SVG */}
      <div className="relative" style={{ height: chartHeight + 40 }}>
        <svg
          width="100%"
          height={chartHeight + 40}
          className="overflow-visible"
        >
          {/* Ligne de base */}
          <line
            x1="0"
            y1={chartHeight}
            x2="100%"
            y2={chartHeight}
            stroke="var(--border-subtle)"
            strokeWidth="1"
          />

          {/* Barres */}
          {data.map((point, index) => {
            const barWidth = `${80 / data.length}%`;
            const barHeight = (point.count / maxValue) * chartHeight;
            const x = `${(index / data.length) * 100}%`;

            return (
              <g key={point.date}>
                {/* Barre animée */}
                <motion.rect
                  initial={{ height: 0, y: chartHeight }}
                  animate={{ height: barHeight, y: chartHeight - barHeight }}
                  transition={{ delay: index * 0.05, duration: 0.5, ease: 'easeOut' }}
                  x={x}
                  width={barWidth}
                  rx="4"
                  className="fill-[var(--emerald-deep)] opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                />

                {/* Overlay gradient */}
                <motion.rect
                  initial={{ height: 0, y: chartHeight }}
                  animate={{ height: barHeight, y: chartHeight - barHeight }}
                  transition={{ delay: index * 0.05, duration: 0.5, ease: 'easeOut' }}
                  x={x}
                  width={barWidth}
                  rx="4"
                  fill="url(#barGradient)"
                  opacity="0.3"
                />

                {/* Valeur au-dessus */}
                {point.count > 0 && (
                  <text
                    x={`calc(${x} + ${barWidth} / 2)`}
                    y={chartHeight - barHeight - 5}
                    textAnchor="middle"
                    className="text-[10px] font-bold fill-[var(--emerald-deep)]"
                  >
                    {point.count}
                  </text>
                )}

                {/* Label en bas */}
                <text
                  x={`calc(${x} + ${barWidth} / 2)`}
                  y={chartHeight + 20}
                  textAnchor="middle"
                  className="text-[9px] fill-[var(--text-secondary)]"
                >
                  {point.label}
                </text>
              </g>
            );
          })}

          <defs>
            <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Légende */}
      <div className="mt-6 flex items-center justify-between text-[10px] text-[var(--text-secondary)]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-[var(--emerald-deep)]" />
          <span>Activations complétées</span>
        </div>
        <div>
          Total: <span className="font-bold text-[var(--emerald-deep)]">{data.reduce((sum, d) => sum + d.count, 0)}</span>
        </div>
      </div>
    </div>
  );
}

