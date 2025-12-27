'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  Target,
  Zap
} from 'lucide-react';
import { Badge } from '@/components/SharedUI';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function CandidatureVIPPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFB] mesh-gradient selection:bg-[var(--gold-sand)] selection:text-[var(--emerald-deep)] pb-20">
      
      {/* TopBar */}
      <div className="fixed top-0 w-full z-[110] bg-[var(--emerald-deep)] text-[var(--gold-sand)] py-3 px-6 flex justify-between items-center shadow-lg">
        <div className="text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-4">
          <motion.span 
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-[var(--gold-vivid)] rounded-full shadow-[0_0_10px_var(--gold-vivid)]" 
          />
          SESSION DE JANVIER : PLUS QU'UNE PLACE DISPONIBLE.
        </div>
        <a 
          href="https://tally.so/r/vIP-echo-ia"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[9px] font-black uppercase tracking-[0.3em] border border-[var(--gold-vivid)]/30 px-4 py-1.5 rounded-full hover:bg-[var(--gold-vivid)] hover:text-white transition-all shadow-sm"
        >
          Réserver mon slot
        </a>
      </div>

      {/* Navbar */}
      <nav className={cn(
        "fixed w-full z-[100] transition-all duration-700 px-6",
        isScrolled ? "top-[48px] py-4" : "top-[48px] py-8"
      )}>
        <div className={cn(
          "max-w-7xl mx-auto px-8 py-4 flex justify-between items-center transition-all duration-700 rounded-2xl",
          isScrolled ? "glass-card shadow-2xl border-[var(--gold-vivid)]/20" : "bg-transparent"
        )}>
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 border-2 border-[var(--emerald-deep)] rounded-full flex items-center justify-center p-2 group-hover:border-[var(--gold-vivid)] transition-colors">
              <div className="w-full h-full bg-[var(--emerald-deep)] rounded-full animate-pulse group-hover:bg-[var(--gold-vivid)]" />
            </div>
            <span className="font-black tracking-[0.4em] text-[12px] uppercase text-[var(--emerald-deep)] group-hover:text-[var(--gold-vivid)] transition-colors">L'ÉCHO IA</span>
          </Link>
          
          <div className="hidden md:flex gap-12 text-[9px] font-bold uppercase tracking-[0.4em] text-[var(--text-secondary)]">
            <Link href="/" className="hover:text-[var(--gold-vivid)] transition-colors relative group">
              Accueil
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--gold-vivid)] transition-all group-hover:w-full" />
            </Link>
            <Link href="/le-programme" className="hover:text-[var(--gold-vivid)] transition-colors relative group">
              Le Programme
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--gold-vivid)] transition-all group-hover:w-full" />
            </Link>
            <Link href="/offres" className="hover:text-[var(--gold-vivid)] transition-colors relative group">
              Offres
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--gold-vivid)] transition-all group-hover:w-full" />
            </Link>
          </div>

          <Link 
            href="/candidature-vip"
            className="hidden md:block text-[10px] font-black uppercase tracking-[0.3em] text-[var(--gold-vivid)] border-b-2 border-[var(--gold-vivid)] pb-1 transition-all"
          >
            Candidature VIP
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <Crown className="w-8 h-8 text-[var(--gold-vivid)]" />
              <Badge className="border-[var(--gold-vivid)]/30">ACCÈS EXCLUSIF</Badge>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-light uppercase tracking-tighter mb-8 leading-[0.85]">
              VIP <br />
              <span className="font-serif italic text-[var(--gold-vivid)] drop-shadow-sm">ARCHITECTE</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-light leading-relaxed max-w-3xl mx-auto mb-8">
              Un accompagnement rare, volontairement limité.
            </p>
            
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              Le programme VIP Architecte est destiné aux experts qui souhaitent déléguer l'intégralité de la mise en place technique pour se concentrer sur leur cœur de métier.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ce qui rend ce programme unique */}
      <section className="py-20 px-6 bg-white/50 border-y border-[var(--border-subtle)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light uppercase tracking-tighter mb-6">
              Ce qui rend ce programme <span className="font-serif italic text-[var(--gold-vivid)]">unique</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Installation Complète",
                desc: "Nous mettons en place l'intégralité de votre infrastructure technique. Vous ne touchez à rien."
              },
              {
                icon: Target,
                title: "Outil Signature",
                desc: "Création d'un micro-outil numérique unique qui prolonge votre accompagnement."
              },
              {
                icon: Zap,
                title: "Audit 1:1",
                desc: "Une heure d'audit technique personnalisé pour aligner le système à votre méthode."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 rounded-3xl glass-card border border-[var(--border-subtle)] hover:border-[var(--gold-vivid)]/30 hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[var(--emerald-deep)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--gold-vivid)]/10 transition-colors">
                  <item.icon className="w-7 h-7 text-[var(--emerald-deep)] group-hover:text-[var(--gold-vivid)] transition-colors" />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-tight mb-3 text-[var(--emerald-deep)]">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pour qui ? */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-light uppercase tracking-tighter mb-6">
              Ce programme est fait <span className="font-serif italic text-[var(--gold-vivid)]">pour vous</span> si :
            </h2>
          </div>

          <div className="space-y-6">
            {[
              "Vous êtes déjà en activité avec des clients réguliers",
              "Vous voulez un système clé en main sans y passer du temps",
              "Vous refusez les solutions gadgets et voulez du solide",
              "Votre priorité est la libération de temps et de charge mentale",
              "Vous êtes prêt à investir pour un accompagnement sur-mesure"
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-2xl glass-card border border-[var(--border-subtle)] hover:border-[var(--emerald-deep)]/30 transition-all"
              >
                <CheckCircle2 className="w-6 h-6 text-[var(--emerald-deep)] shrink-0 mt-0.5" />
                <p className="text-base text-[var(--text-secondary)]">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cadre important */}
      <section className="py-20 px-6 bg-white border-y border-[var(--border-subtle)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 border-red-500/30 text-red-600">Important</Badge>
            <h2 className="text-3xl md:text-5xl font-light uppercase tracking-tighter">
              Le <span className="font-serif italic text-[var(--gold-vivid)]">Cadre</span>
            </h2>
          </div>

          <div className="p-10 rounded-3xl border-2 border-[var(--border-subtle)] bg-white">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Sparkles className="w-6 h-6 text-[var(--gold-vivid)] shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-[var(--emerald-deep)] mb-2">Limité à 2 clients par mois</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Pour garantir la qualité et l'attention portée à chaque projet.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Sparkles className="w-6 h-6 text-[var(--gold-vivid)] shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-[var(--emerald-deep)] mb-2">Sur candidature uniquement</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Un échange préalable est nécessaire pour s'assurer de l'adéquation du programme.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Sparkles className="w-6 h-6 text-[var(--gold-vivid)] shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-[var(--emerald-deep)] mb-2">Périmètre strictement cadré</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Tout ce qui n'est pas explicitement inclus ne fait pas partie de l'accompagnement.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="p-12 rounded-3xl border-2 border-[var(--gold-vivid)]/30 bg-gradient-to-br from-amber-50 to-white">
            <div className="w-20 h-20 rounded-full bg-[var(--gold-vivid)] flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(212,175,55,0.3)]">
              <Crown className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
              Prêt à candidater ?
            </h2>
            <p className="text-xl text-[var(--text-secondary)] mb-10">
              Remplissez le formulaire de candidature. <br />
              Nous reviendrons vers vous sous 48h.
            </p>
            
            <a 
              href="https://tally.so/r/vIP-echo-ia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-12 py-5 rounded-full bg-[var(--emerald-deep)] text-white font-bold text-sm uppercase tracking-wider hover:bg-[var(--emerald-deep)]/90 transition-all shadow-xl hover:shadow-2xl"
              >
                Accéder au formulaire
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </a>

            <p className="text-xs text-[var(--text-secondary)] mt-8 italic">
              Tarif à partir de 3 490 € • Paiement en 3 fois possible
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

