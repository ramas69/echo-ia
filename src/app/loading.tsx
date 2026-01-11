'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[var(--bg-primary)]">
      <div className="flex flex-col items-center">
        {/* Animated Brand Logo */}
        <div className="relative w-24 h-24 mb-8">
          {/* Outer Rotating Ring */}
          <motion.div
            className="absolute inset-0 border-2 border-[var(--gold-vivid)]/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Pulsing Emerald Circle */}
          <div className="absolute inset-4 border-2 border-[var(--emerald-deep)] rounded-full flex items-center justify-center p-3 shadow-[0_0_30px_rgba(6,78,59,0.1)]">
            <motion.div
              className="w-full h-full bg-[var(--emerald-deep)] rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
                boxShadow: [
                  "0 0 0px var(--emerald-deep)",
                  "0 0 20px var(--emerald-deep)",
                  "0 0 0px var(--emerald-deep)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Floating Sparkles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[var(--gold-vivid)] rounded-full"
              animate={{
                y: [-20, -40],
                x: [0, (i - 1) * 15],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeOut"
              }}
              style={{
                top: '20%',
                left: '50%'
              }}
            />
          ))}
        </div>

        {/* Text Loader */}
        <div className="flex flex-col items-center gap-2">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--emerald-deep)]"
          >
            L'ÉCHO IA
          </motion.span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 bg-[var(--gold-vivid)] rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Top Progress Bar for subtle feedback */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--gold-vivid)] origin-left z-[210] shadow-[0_0_10px_var(--gold-vivid)]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0.9 }}
        transition={{ duration: 15, ease: "easeOut" }}
      />
    </div>
  );
}
