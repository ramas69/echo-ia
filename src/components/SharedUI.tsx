'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.05, borderColor: "var(--gold-vivid)" }}
    className={cn("inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--emerald-deep)]/5 border border-[var(--emerald-deep)]/10 text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--emerald-deep)] transition-colors duration-500", className)}
  >
    <Sparkles className="w-3 h-3 text-[var(--gold-vivid)]" />
    {children}
  </motion.div>
);

export const SophisticatedButton = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const variants: any = {
    primary: "bg-[var(--emerald-deep)] text-white hover:bg-[var(--emerald-light)] shadow-[0_20px_40px_rgba(6,78,59,0.15)]",
    secondary: "bg-[var(--gold-sand)] text-[var(--emerald-deep)] hover:bg-[var(--gold-vivid)] hover:text-white hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]",
    outline: "border border-[var(--emerald-deep)]/20 text-[var(--emerald-deep)] hover:border-[var(--gold-vivid)] hover:text-[var(--gold-vivid)] hover:bg-[var(--gold-vivid)]/5"
  };
  
  return (
    <motion.button 
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-500 flex items-center gap-3 relative group overflow-hidden",
        variants[variant],
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
      <span className="relative z-10 flex items-center gap-3">
        {children}
        <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
      </span>
    </motion.button>
  );
};

