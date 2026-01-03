'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowUpRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

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
        "px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-500 flex items-center gap-3 relative group overflow-hidden cursor-pointer",
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

export const TopBar = () => (
  <div className="fixed top-0 w-full z-[110] bg-[var(--emerald-deep)] text-[var(--gold-sand)] py-2 md:py-3 px-3 md:px-6 flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-center shadow-lg">
    <div className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] flex items-center gap-2 md:gap-4 text-center md:text-left">
      <motion.span 
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-2 h-2 bg-[var(--gold-vivid)] rounded-full shadow-[0_0_10px_var(--gold-vivid)] shrink-0" 
      />
      <span className="line-clamp-1">SESSION DE JANVIER : PLUS QU'UNE PLACE DISPONIBLE.</span>
    </div>
    <a 
      href="https://tally.so/r/vIP-echo-ia"
      target="_blank"
      rel="noopener noreferrer"
      className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] border border-[var(--gold-vivid)]/30 px-3 md:px-4 py-1 md:py-1.5 rounded-full hover:bg-[var(--gold-vivid)] hover:text-white transition-all shadow-sm whitespace-nowrap"
    >
      Réserver mon slot
    </a>
  </div>
);

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile lors du scroll
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const menuItems = [
    { href: "/", label: "Accueil" },
    { href: "/le-programme", label: "Le Programme" },
    { href: "/offres", label: "Offres" },
  ];

  return (
    <>
      <nav className={cn(
        "fixed w-full z-[100] transition-all duration-700 px-3 md:px-6",
        isScrolled ? "top-[56px] md:top-[48px] py-2 md:py-4" : "top-[56px] md:top-[48px] py-4 md:py-8"
      )}>
        <div className={cn(
          "max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-4 flex justify-between items-center transition-all duration-700 rounded-xl md:rounded-2xl",
          isScrolled ? "glass-card shadow-2xl border-[var(--gold-vivid)]/20" : "bg-transparent"
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 group cursor-pointer">
            <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-[var(--emerald-deep)] rounded-full flex items-center justify-center p-1.5 md:p-2 group-hover:border-[var(--gold-vivid)] transition-colors">
              <div className="w-full h-full bg-[var(--emerald-deep)] rounded-full animate-pulse group-hover:bg-[var(--gold-vivid)]" />
            </div>
            <span className="font-black tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-[12px] uppercase text-[var(--emerald-deep)] group-hover:text-[var(--gold-vivid)] transition-colors">
              L'ÉCHO IA
            </span>
          </Link>
          
          {/* Menu Desktop */}
          <div className="hidden md:flex gap-8 lg:gap-12 text-[9px] font-bold uppercase tracking-[0.4em] text-[var(--text-secondary)]">
            {menuItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className="hover:text-[var(--gold-vivid)] transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--gold-vivid)] transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA Desktop */}
          <Link 
            href="/candidature-vip"
            className="hidden md:block text-[9px] lg:text-[10px] font-black uppercase tracking-[0.3em] text-[var(--emerald-deep)] border-b-2 border-[var(--gold-vivid)] pb-1 hover:text-[var(--gold-vivid)] transition-all whitespace-nowrap"
          >
            Candidature VIP
          </Link>

          {/* Hamburger Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[var(--emerald-deep)] hover:text-[var(--gold-vivid)] transition-colors cursor-pointer"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Menu Mobile Fullscreen */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[90] bg-white md:hidden"
            style={{ top: '56px' }}
          >
            <div className="flex flex-col h-full px-6 pt-24 pb-12">
              {/* Menu Items */}
              <div className="flex-1 flex flex-col gap-8">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-4xl font-light uppercase tracking-tight text-[var(--emerald-deep)] hover:text-[var(--gold-vivid)] transition-colors block"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                {/* CTA Mobile */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8"
                >
                  <Link
                    href="/candidature-vip"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-block px-8 py-4 rounded-full bg-[var(--emerald-deep)] text-white text-sm font-bold uppercase tracking-wider hover:bg-[var(--gold-vivid)] transition-all"
                  >
                    Candidature VIP
                  </Link>
                </motion.div>
              </div>

              {/* Footer Mobile Menu */}
              <div className="border-t border-[var(--border-subtle)] pt-6 text-center">
                <p className="text-xs text-[var(--text-secondary)]/60 uppercase tracking-wider">
                  L'ÉCHO IA · 2026
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const Footer = () => (
  <footer className="py-20 md:py-32 px-4 md:px-6 border-t border-[var(--border-subtle)] bg-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-16 relative z-10">
      <div className="flex flex-col items-center md:items-start gap-4 md:gap-6">
        <div className="flex items-center gap-2 group cursor-default">
          <div className="w-5 h-5 md:w-6 md:h-6 bg-[var(--emerald-deep)] rounded-full group-hover:bg-[var(--gold-vivid)] transition-colors" />
          <span className="font-black tracking-[0.4em] md:tracking-[0.5em] text-[10px] md:text-[12px] text-[var(--emerald-deep)] uppercase group-hover:text-[var(--gold-vivid)] transition-colors">
            L'ÉCHO IA
          </span>
        </div>
        <p className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-[var(--text-secondary)]/40 text-center md:text-left leading-loose">
          Le futur de l'accompagnement est plus humain, car mieux automatisé.<br />
          Créé en France · © 2026
        </p>
      </div>
      
      <div className="flex flex-wrap gap-4 md:gap-8 lg:gap-16 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] lg:tracking-[0.5em] text-[var(--text-secondary)]/40 justify-center md:justify-end">
        <Link href="/mentions-legales#rgpd" className="hover:text-[var(--gold-vivid)] transition-colors whitespace-nowrap">
          Privacy
        </Link>
        <Link href="/mentions-legales" className="hover:text-[var(--gold-vivid)] transition-colors whitespace-nowrap">
          Légal
        </Link>
        <Link href="/cgv" className="hover:text-[var(--gold-vivid)] transition-colors whitespace-nowrap">
          CGV
        </Link>
        <a href="mailto:contact@lechoia.com" className="hover:text-[var(--gold-vivid)] transition-colors whitespace-nowrap">
          Contact
        </a>
      </div>
    </div>
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[var(--gold-vivid)]/20 to-transparent" />
  </footer>
);

