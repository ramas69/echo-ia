'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowRight,
  Sparkles, 
  Brain, 
  Video, 
  Zap, 
  Target, 
  Cpu, 
  ShieldCheck,
  Heart,
  Lock,
  Users,
  Calendar,
  TrendingUp,
  AlertCircle,
  PlayCircle
} from 'lucide-react';
import { Badge, SophisticatedButton, TopBar, Navbar, Footer } from '@/components/SharedUI';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const modules = [
  {
    phase: "PHASE 1",
    title: "LE SECOND CERVEAU",
    icon: Brain,
    desc: "Votre expertise est précieuse. Nous la transformons en une bibliothèque vivante, claire et sécurisée, consultable sans vous solliciter.",
    outcome: "Votre sagesse est organisée, protégée et disponible 24/7.",
    units: [
      "Structurer votre méthode unique pour la rendre transmissible",
      "Rendre vos connaissances consultables et intelligibles",
      "Centraliser votre savoir dans un espace simple et sécurisé",
      "Mettre à jour votre expertise sans tout reconstruire"
    ],
    impact: "Fin de la répétition. Début de la transmission intelligente."
  },
  {
    phase: "PHASE 2",
    title: "L'USINE À CONTENU",
    icon: Video,
    desc: "Vous restez vous-même, mais vous êtes présent de façon régulière. Votre message circule sans vous disperser.",
    outcome: "Amplifiez votre message sans y laisser votre énergie vitale.",
    units: [
      "Captation fidèle de votre voix et de votre posture",
      "Création d'une présence cohérente et durable",
      "Une plume alignée avec votre ton et vos valeurs",
      "Diffusion fluide de vos messages"
    ],
    impact: "1 heure par semaine suffit."
  },
  {
    phase: "PHASE 3",
    title: "LE FLUX ZÉRO-FRICTION",
    icon: Zap,
    desc: "L'administratif ne devrait jamais polluer votre esprit. Nous construisons une fondation invisible qui gère l'essentiel sans friction.",
    outcome: "La charge mentale administrative disparaît. Vous respirez.",
    units: [
      "Centralisation claire de vos données clients",
      "Automatisation des tâches répétitives",
      "Paiements et facturation fluides",
      "Un accueil client rassurant dès la première seconde"
    ],
    impact: "Moins de gestion. Plus d'espace mental."
  },
  {
    phase: "PHASE 4",
    title: "L'AIMANT À PROSPECTS",
    icon: Target,
    desc: "Vous n'avez plus besoin de convaincre. Votre message rencontre naturellement ceux qui en ont besoin.",
    outcome: "Attirez les bonnes personnes à vous, sans forcer ni manipuler.",
    units: [
      "Clarification de vos clients de cœur",
      "Une approche respectueuse et alignée",
      "Des messages qui résonnent au lieu de vendre",
      "Un système qui apprend et s'affine dans le temps"
    ],
    impact: "Fin de la prospection agressive. Place à l'attraction juste."
  },
  {
    phase: "PHASE 5",
    title: "VOTRE OUTIL SIGNATURE",
    icon: Cpu,
    desc: "Nous allons plus loin que l'automatisation. Vous créez un outil simple, utile et non copiable, directement lié à votre méthode.",
    outcome: "Offrez une expérience unique qui prolonge votre accompagnement.",
    units: [
      "L'expérience idéale pour vos clients",
      "Un micro-outil numérique sur-mesure",
      "La sécurisation de votre méthode propriétaire",
      "Une évolution continue selon vos retours"
    ],
    impact: "Vos clients pratiquent entre les séances. Votre valeur devient tangible."
  }
];

export default function FormationPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] selection:bg-[var(--gold-sand)] selection:text-[var(--emerald-deep)]">
      <TopBar />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-48 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--emerald-deep)]/5 to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Badge className="mb-8 border-[var(--gold-vivid)]/30">VOTRE SYSTÈME AU SERVICE DE L'HUMAIN</Badge>
          <h1 className="text-5xl md:text-8xl font-light uppercase tracking-tighter mb-8 leading-[0.85]">
            LA CARTE DE <br />
            <span className="font-serif italic text-[var(--gold-vivid)] drop-shadow-sm">VOTRE LIBERTÉ</span>
          </h1>
          <p className="text-xl md:text-2xl text-[var(--emerald-deep)] font-medium leading-relaxed max-w-3xl mx-auto mb-12">
            Le chemin exact pour ne plus choisir <br />entre votre impact et votre épuisement
          </p>
        </div>
      </section>

      {/* 2 MODES D'AVANCEMENT - COMPARATIF */}
      <section className="py-20 px-6 bg-gradient-to-br from-[var(--emerald-deep)]/5 to-white border-y-2 border-[var(--gold-vivid)]/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-6 border-[var(--gold-vivid)]/30 bg-[var(--gold-vivid)]/10 text-[var(--gold-vivid)] text-sm">
              ⚡ INFORMATION CLÉS
            </Badge>
            <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter mb-4">
              Deux façons <span className="font-serif italic text-[var(--gold-vivid)]">d'avancer</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Le programme reste <strong className="text-[var(--emerald-deep)]">strictement le même</strong>. <br />
              Seul le <strong className="text-[var(--emerald-deep)]">mode d'avancement</strong> change.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* MODE AUTONOMIE */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-3xl bg-white border-2 border-[var(--border-subtle)] relative"
            >
              <div className="absolute -top-4 left-8">
                <Badge className="bg-[var(--emerald-deep)] text-white border-[var(--emerald-deep)]">
                  MODE PAR DÉFAUT
                </Badge>
              </div>

              <div className="flex items-center gap-4 mb-6 mt-4">
                <PlayCircle className="w-12 h-12 text-[var(--emerald-deep)]" />
                <h3 className="text-3xl font-light uppercase tracking-tight">
                  Autonomie
                </h3>
              </div>

              <p className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed">
                Vous avancez <strong className="text-[var(--emerald-deep)]">à votre rythme</strong>, en vous appuyant sur les vidéos, templates et blueprints.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--emerald-deep)]/5">
                  <CheckCircle2 className="w-5 h-5 text-[var(--emerald-deep)] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm text-[var(--text-primary)] mb-1">100% asynchrone</p>
                    <p className="text-xs text-[var(--text-secondary)]">Vous démarrez quand vous voulez</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--emerald-deep)]/5">
                  <CheckCircle2 className="w-5 h-5 text-[var(--emerald-deep)] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm text-[var(--text-primary)] mb-1">Tout le contenu inclus</p>
                    <p className="text-xs text-[var(--text-secondary)]">5 phases + templates + communauté</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--emerald-deep)]/5">
                  <AlertCircle className="w-5 h-5 text-[var(--text-secondary)] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm text-[var(--text-primary)] mb-1">Aucun support individuel</p>
                    <p className="text-xs text-[var(--text-secondary)]">Pour les profils autonomes</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--border-subtle)]">
                <p className="text-sm text-[var(--emerald-deep)] font-bold text-center">
                  👉 C'est le socle sur lequel repose toute la méthode
                </p>
              </div>
            </motion.div>

            {/* MODE ACCÉLÉRATION */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-3xl bg-gradient-to-br from-[var(--gold-vivid)]/10 via-white to-[var(--gold-vivid)]/5 border-2 border-[var(--gold-vivid)]/40 relative shadow-xl"
            >
              <div className="absolute -top-4 left-8">
                <Badge className="bg-[var(--gold-vivid)] text-white border-[var(--gold-vivid)] flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  MODE COLLECTIF
                </Badge>
              </div>

              <div className="flex items-center gap-4 mb-6 mt-4">
                <Users className="w-12 h-12 text-[var(--gold-vivid)]" />
                <h3 className="text-3xl font-light uppercase tracking-tight">
                  Accélération
                </h3>
              </div>

              <p className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed">
                Vous avancez <strong className="text-[var(--gold-vivid)]">avec un cadre</strong> et des réponses à vos questions.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[var(--gold-vivid)]/20">
                  <Calendar className="w-5 h-5 text-[var(--gold-vivid)] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm text-[var(--text-primary)] mb-1">1 session collective / mois</p>
                    <p className="text-xs text-[var(--text-secondary)]">Q&A en groupe, rythme régulier</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[var(--gold-vivid)]/20">
                  <Users className="w-5 h-5 text-[var(--gold-vivid)] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm text-[var(--text-primary)] mb-1">Réponses mutualisées</p>
                    <p className="text-xs text-[var(--text-secondary)]">Situations réelles du groupe</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[var(--gold-vivid)]/20">
                  <ShieldCheck className="w-5 h-5 text-[var(--gold-vivid)] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm text-[var(--text-primary)] mb-1">Sans surcharge ni dépendance</p>
                    <p className="text-xs text-[var(--text-secondary)]">Autonomie préservée</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--gold-vivid)]/30">
                <p className="text-sm text-[var(--gold-vivid)] font-bold text-center">
                  ✨ Le meilleur équilibre autonomie / accompagnement
                </p>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-base text-[var(--text-secondary)] italic">
              Les 5 phases, les contenus et les livrables <strong className="text-[var(--emerald-deep)]">restent identiques</strong>. <br />
              La valeur ajoutée se situe dans la <strong className="text-[var(--emerald-deep)]">manière d'avancer</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* LES 5 PHASES - CONDENSÉ */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter mb-4">
              Les <span className="font-serif italic text-[var(--emerald-deep)]">5 phases</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Le parcours complet pour bâtir votre infrastructure
            </p>
          </div>

          <div className="space-y-6">
            {modules.map((mod, i) => {
              const ModIcon = mod.icon;
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-3xl p-8 border border-[var(--border-subtle)] hover:border-[var(--gold-vivid)]/30 transition-all group"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Left: Icon + Phase */}
                    <div className="md:w-[200px] shrink-0">
                      <div className="flex flex-col items-center md:items-start gap-4">
                        <div className="w-20 h-20 rounded-2xl bg-[var(--emerald-deep)]/10 flex items-center justify-center group-hover:bg-[var(--emerald-deep)]/20 transition-colors">
                          <ModIcon className="w-10 h-10 text-[var(--emerald-deep)]" />
                        </div>
                        <div>
                          <div className="text-[8px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)]/40 mb-2">{mod.phase}</div>
                          <h3 className="text-2xl font-light uppercase tracking-tight leading-tight">{mod.title}</h3>
                        </div>
                      </div>
                    </div>

                    {/* Right: Content */}
                    <div className="flex-1 space-y-6">
                      {/* Outcome - HIGHLIGHTED */}
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-[var(--gold-vivid)]/10 to-[var(--gold-vivid)]/5 border-2 border-[var(--gold-vivid)]/30">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="w-4 h-4 text-[var(--gold-vivid)]" />
                          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--gold-vivid)]">RÉSULTAT GARANTI</span>
                        </div>
                        <p className="text-lg font-serif italic text-[var(--emerald-deep)] leading-relaxed">
                          "{mod.outcome}"
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        {mod.desc}
                      </p>

                      {/* Ce que vous mettez en place */}
                      <details className="group/details">
                        <summary className="cursor-pointer text-sm font-black uppercase tracking-wider text-[var(--emerald-deep)] flex items-center gap-2 hover:text-[var(--gold-vivid)] transition-colors">
                          <ArrowRight className="w-4 h-4 group-open/details:rotate-90 transition-transform" />
                          Ce que vous mettez en place
                        </summary>
                        <div className="mt-4 space-y-2 pl-6">
                          {mod.units.map((unit, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                              <div className="w-1 h-1 rounded-full bg-[var(--emerald-deep)] mt-2 shrink-0" />
                              <span>{unit}</span>
                            </div>
                          ))}
                        </div>
                      </details>

                      {/* Impact */}
                      <div className="pt-4 border-t border-[var(--border-subtle)]">
                        <p className="text-sm font-bold text-[var(--emerald-deep)]">
                          👉 {mod.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LE CADRE - ULTRA IMPORTANT */}
      <section className="py-20 px-6 bg-gradient-to-br from-red-50 to-orange-50 border-y-4 border-red-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <AlertCircle className="w-8 h-8 text-red-600" />
              <Badge className="bg-red-600 text-white border-red-600 text-base py-3 px-6">
                ⚠️ LE CADRE (TRÈS IMPORTANT)
              </Badge>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4 text-red-900">
              UNE PROTECTION, <br />PAS UNE LIMITE
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-10 md:p-12 border-4 border-red-200 shadow-2xl">
            <div className="space-y-8">
              {/* Ce programme est structuré pour */}
              <div className="p-6 rounded-2xl bg-green-50 border-2 border-green-200">
                <p className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6" />
                  Ce programme est volontairement structuré pour :
                </p>
                <ul className="space-y-3 pl-8">
                  <li className="text-green-800 font-medium flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 shrink-0" />
                    préserver votre énergie
                  </li>
                  <li className="text-green-800 font-medium flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 shrink-0" />
                    préserver la qualité
                  </li>
                  <li className="text-green-800 font-medium flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 shrink-0" />
                    éviter toute dépendance
                  </li>
                </ul>
              </div>

              {/* Tout ce qui n'est pas inclus */}
              <div className="p-6 rounded-2xl bg-red-50 border-2 border-red-300">
                <p className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6" />
                  Tout ce qui n'est pas explicitement inclus :
                </p>
                <ul className="space-y-3 pl-8">
                  <li className="text-red-800 font-medium flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 shrink-0" />
                    n'est <strong>PAS</strong> pris en charge
                  </li>
                  <li className="text-red-800 font-medium flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 shrink-0" />
                    ne fait <strong>PAS</strong> l'objet de support individuel
                  </li>
                </ul>
              </div>

              <p className="text-center text-xl font-bold text-[var(--emerald-deep)] pt-6 italic">
                Ce cadre est une protection, pas une contrainte.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto glass-card rounded-[3.5rem] p-12 md:p-20 text-center border-2 border-[var(--gold-vivid)]/20 relative overflow-hidden shadow-xl group">
          <div className="absolute inset-0 bg-[var(--emerald-deep)]/5 -z-10 group-hover:bg-[var(--emerald-deep)]/10 transition-colors duration-1000" />
          <div className="relative z-10 space-y-16">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-[var(--emerald-deep)] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-700">
                <Heart className="w-10 h-10 text-[var(--gold-sand)]" />
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-light uppercase tracking-tighter leading-none">
                PRÊT À AVANCER <br /><span className="font-serif italic text-[var(--gold-vivid)]">À VOTRE RYTHME ?</span>
              </h2>
              <div className="space-y-4 text-lg md:text-xl text-[var(--text-secondary)] font-light max-w-2xl mx-auto">
                <p>Votre système est prêt à être construit.</p>
                <p>Votre expertise mérite un cadre à sa hauteur.</p>
                <p className="text-2xl font-medium text-[var(--emerald-deep)]">
                  👉 Choisissez votre mode d'avancement
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link href="/offres">
                <SophisticatedButton className="py-8 px-16 text-xs tracking-[0.3em]">
                  CHOISIR MON CHEMIN
                </SophisticatedButton>
              </Link>
            </div>
          </div>
          
          {/* Decorative Sparkles */}
          <div className="absolute top-20 right-20 opacity-10 group-hover:rotate-90 transition-transform duration-[10s]"><Sparkles className="w-40 h-40 text-[var(--gold-vivid)]" /></div>
          <div className="absolute bottom-20 left-20 opacity-10 group-hover:-rotate-90 transition-transform duration-[10s]"><Sparkles className="w-40 h-40 text-[var(--gold-vivid)]" /></div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
