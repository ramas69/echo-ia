'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Crown,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  Target,
  Zap,
  AlertCircle,
  Users,
  Clock,
  Lock
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

      {/* Hero Section - ULTRA PREMIUM */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
        {/* Background élégant */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--emerald-deep)]/5 via-transparent to-[var(--gold-vivid)]/5" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-[var(--gold-vivid)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[var(--emerald-deep)]/10 rounded-full blur-3xl" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge exclusif animé */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-12"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-[var(--gold-vivid)] blur-xl opacity-50 animate-pulse" />
                <Crown className="w-12 h-12 text-[var(--gold-vivid)] relative z-10" />
              </div>
              <Badge className="border-[var(--gold-vivid)]/40 bg-[var(--gold-vivid)]/10 text-[var(--gold-vivid)] font-black text-xs py-2 px-6">
                ⚡ ACCÈS ULTRA-EXCLUSIF
              </Badge>
            </motion.div>
            
            {/* Titre majestueux */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-6xl md:text-9xl font-light uppercase tracking-tighter mb-10 leading-[0.85]"
            >
              VIP <br />
              <span className="font-serif italic bg-gradient-to-r from-[var(--gold-vivid)] to-amber-600 bg-clip-text text-transparent drop-shadow-2xl">
                ARCHITECTE
              </span>
            </motion.h1>
            
            {/* Message principal fort */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="max-w-3xl mx-auto mb-12"
            >
              <p className="text-2xl md:text-3xl font-light text-[var(--emerald-deep)] mb-6 leading-relaxed">
                Un accompagnement <strong className="font-bold">rare</strong>, volontairement <strong className="font-bold">limité</strong>.
              </p>
              <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
                Délé guez l'intégralité de la mise en place technique. <br className="hidden md:block" />
                Concentrez-vous sur votre <span className="text-[var(--emerald-deep)] font-medium">cœur de métier</span>.
              </p>
            </motion.div>

            {/* Stats impactantes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-3 gap-6 max-w-2xl mx-auto"
            >
              {[
                { icon: Users, value: "2", label: "Places / Mois" },
                { icon: Clock, value: "48h", label: "Réponse garantie" },
                { icon: Lock, value: "100%", label: "Clé en main" }
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-[var(--gold-vivid)]/20 hover:border-[var(--gold-vivid)]/40 transition-all hover:scale-105">
                  <stat.icon className="w-8 h-8 text-[var(--gold-vivid)] mx-auto mb-3" />
                  <div className="text-3xl font-bold text-[var(--emerald-deep)] mb-1">{stat.value}</div>
                  <div className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-black">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Ce qui rend ce programme unique - REDESIGN */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--emerald-deep)]/5 to-white" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <Badge className="mb-6 border-[var(--gold-vivid)]/30">CE QUI FAIT LA DIFFÉRENCE</Badge>
            <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter mb-6">
              Un programme <br className="md:hidden" />
              <span className="font-serif italic bg-gradient-to-r from-[var(--gold-vivid)] to-amber-600 bg-clip-text text-transparent">
                véritablement unique
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Installation Complète",
                highlight: "100% Clé en Main",
                desc: "Nous mettons en place l'intégralité de votre infrastructure technique.",
                detail: "Vous ne touchez à rien. Nous faisons tout."
              },
              {
                icon: Target,
                title: "Outil Signature",
                highlight: "Créé Sur-Mesure",
                desc: "Un micro-outil numérique unique qui prolonge votre accompagnement.",
                detail: "Non copiable. Aligné à votre méthode."
              },
              {
                icon: Zap,
                title: "Audit Technique 1:1",
                highlight: "60 Minutes Dédiées",
                desc: "Une heure d'audit personnalisé pour aligner le système à votre méthode.",
                detail: "Stratégie. Architecture. Validation."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative group"
              >
                {/* Carte principale */}
                <div className="relative p-10 rounded-3xl bg-white border-2 border-[var(--border-subtle)] hover:border-[var(--gold-vivid)]/40 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  {/* Badge highlight */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[var(--gold-vivid)] to-amber-600 text-white text-xs font-black uppercase tracking-wider shadow-lg">
                    {item.highlight}
                  </div>

                  {/* Icône avec glow */}
                  <div className="relative w-20 h-20 mx-auto mb-8 mt-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold-vivid)]/20 to-[var(--emerald-deep)]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                    <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[var(--emerald-deep)]/10 to-[var(--gold-vivid)]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="w-10 h-10 text-[var(--emerald-deep)] group-hover:text-[var(--gold-vivid)] transition-colors" />
                    </div>
                  </div>

                  {/* Contenu */}
                  <h3 className="text-xl font-bold uppercase tracking-tight mb-4 text-center text-[var(--emerald-deep)] group-hover:text-[var(--gold-vivid)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-4 text-center">
                    {item.desc}
                  </p>
                  <p className="text-sm text-[var(--emerald-deep)] font-medium text-center italic">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pour qui - REDESIGN IMPACT */}
      <section className="py-32 px-6 bg-gradient-to-br from-[var(--emerald-deep)] to-[var(--emerald-deep)]/90 relative overflow-hidden">
        {/* Motifs décoratifs */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 border-2 border-white rounded-full" />
          <div className="absolute bottom-20 left-10 w-96 h-96 border-2 border-white rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-6 bg-white/20 border-white/30 text-white">PROFIL IDÉAL</Badge>
            <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter mb-6 text-white">
              Ce programme est fait <br className="md:hidden" />
              <span className="font-serif italic text-[var(--gold-sand)]">pour vous</span> si :
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Vous êtes déjà en activité",
                desc: "Avec des clients réguliers et une expertise reconnue",
                icon: "✓"
              },
              {
                title: "Vous voulez du clé en main",
                desc: "Sans y passer du temps ni de l'énergie technique",
                icon: "✓"
              },
              {
                title: "Vous refusez les gadgets",
                desc: "Et cherchez une solution solide et durable",
                icon: "✓"
              },
              {
                title: "Votre priorité : la libération",
                desc: "De temps, de charge mentale et d'énergie",
                icon: "✓"
              },
              {
                title: "Vous êtes prêt à investir",
                desc: "Dans un accompagnement sur-mesure de qualité",
                icon: "✓"
              },
              {
                title: "Vous visez le long terme",
                desc: "Un système qui dure, pas une solution temporaire",
                icon: "✓"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group"
              >
                <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/15 hover:border-white/40 transition-all duration-300 hover:scale-105">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--gold-vivid)] flex items-center justify-center text-white font-black text-xl shrink-0 shadow-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-white/80 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Message de fin */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 p-8 rounded-3xl bg-white/10 backdrop-blur-sm border-2 border-[var(--gold-vivid)]/30 text-center"
          >
            <p className="text-xl md:text-2xl text-white font-light leading-relaxed">
              Si vous vous reconnaissez dans <span className="font-bold text-[var(--gold-sand)]">au moins 4 de ces points</span>, <br className="hidden md:block" />
              ce programme est <span className="font-bold text-[var(--gold-sand)]">fait pour vous</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cadre important - REDESIGN ALERTE */}
      <section className="py-32 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <Badge className="bg-red-50 border-red-200 text-red-600 font-black text-xs py-2 px-6">
                ⚠️ À LIRE ABSOLUMENT
              </Badge>
            </div>
            <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter">
              Le <span className="font-serif italic text-red-600">Cadre</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mt-4">
              Ces limites garantissent la qualité et votre satisfaction
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                number: "01",
                title: "Limité à 2 clients/mois",
                desc: "Pour garantir la qualité et l'attention portée à chaque projet. Pas de production à la chaîne.",
                alert: "Places très limitées",
                color: "red"
              },
              {
                number: "02",
                title: "Sur candidature uniquement",
                desc: "Un échange préalable est nécessaire pour s'assurer de l'adéquation du programme avec vos besoins.",
                alert: "Pas d'achat direct",
                color: "amber"
              },
              {
                number: "03",
                title: "Périmètre strictement cadré",
                desc: "Tout ce qui n'est pas explicitement inclus ne fait pas partie de l'accompagnement. Clarté totale.",
                alert: "Pas d'extras non prévus",
                color: "emerald"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative"
              >
                {/* Numéro en gros */}
                <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-br from-[var(--gold-vivid)] to-amber-600 flex items-center justify-center text-white font-black text-2xl shadow-xl z-10">
                  {item.number}
                </div>

                {/* Carte */}
                <div className={cn(
                  "relative p-8 pt-12 rounded-2xl border-2 bg-white hover:shadow-2xl transition-all duration-300",
                  item.color === "red" && "border-red-200 hover:border-red-400",
                  item.color === "amber" && "border-amber-200 hover:border-amber-400",
                  item.color === "emerald" && "border-emerald-200 hover:border-emerald-400"
                )}>
                  {/* Badge alerte */}
                  <div className={cn(
                    "inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4",
                    item.color === "red" && "bg-red-100 text-red-700",
                    item.color === "amber" && "bg-amber-100 text-amber-700",
                    item.color === "emerald" && "bg-emerald-100 text-emerald-700"
                  )}>
                    {item.alert}
                  </div>

                  <h3 className="text-xl font-bold text-[var(--emerald-deep)] mb-4 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Message de clarification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16 p-10 rounded-3xl bg-gradient-to-br from-[var(--emerald-deep)]/5 to-[var(--gold-vivid)]/5 border-2 border-[var(--emerald-deep)]/20"
          >
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-[var(--emerald-deep)] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--emerald-deep)] mb-3">
                  Ce cadre est une protection, pas une contrainte
                </h3>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                  Il garantit que vous recevrez exactement ce qui est promis, sans mauvaise surprise. <br />
                  C'est notre engagement envers vous.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Final - ULTRA IMPACTANT */}
      <section className="py-32 px-6 relative overflow-hidden">
        {/* Background spectaculaire */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--emerald-deep)] via-[var(--emerald-deep)]/95 to-black" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--gold-vivid)]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--gold-vivid)]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Motif grid */}
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Icône couronne majestueuse */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
              className="relative w-32 h-32 mx-auto mb-12"
            >
              <div className="absolute inset-0 bg-[var(--gold-vivid)] rounded-full blur-2xl opacity-50 animate-pulse" />
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[var(--gold-vivid)] to-amber-600 flex items-center justify-center shadow-2xl">
                <Crown className="w-16 h-16 text-white" />
              </div>
            </motion.div>

            {/* Titre puissant */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-5xl md:text-7xl font-light uppercase tracking-tighter text-white mb-8 leading-tight"
            >
              Prêt pour une <br />
              <span className="font-serif italic text-[var(--gold-sand)] drop-shadow-2xl">
                libération totale
              </span> ?
            </motion.h2>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            >
              Déposez votre candidature pour le programme VIP Architecte. <br className="hidden md:block" />
              Nous étudierons <span className="font-bold text-white">ensemble</span> si ce chemin est le bon pour vous.
            </motion.p>

            {/* Bouton CTA spectaculaire */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mb-12"
            >
              <Link 
                href="https://tally.so/r/vIP-echo-ia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 px-12 py-6 rounded-full bg-gradient-to-r from-[var(--gold-vivid)] to-amber-600 text-white font-black text-xl uppercase tracking-wide hover:scale-110 hover:shadow-2xl hover:shadow-[var(--gold-vivid)]/50 transition-all duration-300 group shadow-xl"
              >
                <Sparkles className="w-6 h-6" />
                Accéder au formulaire
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>

            {/* Infos pricing */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap items-center justify-center gap-8 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[var(--gold-sand)]" />
                  <span>Réponse sous 48h</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[var(--gold-sand)]" />
                  <span>Paiement en 3x possible</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[var(--gold-sand)]" />
                  <span>Confidentialité garantie</span>
                </div>
              </div>
              
              <div className="pt-6 border-t border-white/20">
                <p className="text-white/60 text-sm mb-2">Investissement</p>
                <p className="text-4xl md:text-5xl font-bold text-white">
                  À partir de <span className="text-[var(--gold-sand)]">3 490 €</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

