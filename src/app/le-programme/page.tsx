'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Sparkles, 
  Brain, 
  Video, 
  Zap, 
  Target, 
  Cpu, 
  ShieldCheck,
  Heart,
  Users,
  Calendar,
  TrendingUp,
  AlertCircle,
  PlayCircle,
  ChevronRight
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

const tabs = [
  { id: 'modes', label: 'Les Modes', icon: Users },
  { id: 'phases', label: 'Les 5 Phases', icon: Target },
  { id: 'cadre', label: 'Le Cadre', icon: AlertCircle }
];

export default function FormationPage() {
  const [activeTab, setActiveTab] = useState('modes');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        const currentIndex = tabs.findIndex(t => t.id === activeTab);
        if (currentIndex < tabs.length - 1) {
          setActiveTab(tabs[currentIndex + 1].id);
        }
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = tabs.findIndex(t => t.id === activeTab);
        if (currentIndex > 0) {
          setActiveTab(tabs[currentIndex - 1].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab]);

  const goToNext = () => {
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const goToPrev = () => {
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  if (!mounted) return null;

  const currentIndex = tabs.findIndex(t => t.id === activeTab);
  const progress = ((currentIndex + 1) / tabs.length) * 100;

  return (
    <div className="min-h-screen bg-[#FDFCFB] selection:bg-[var(--gold-sand)] selection:text-[var(--emerald-deep)]">
      <TopBar />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-48 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--emerald-deep)]/5 to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-8xl font-light uppercase tracking-tighter mb-6 leading-[0.85]">
            LA CARTE DE <br />
            <span className="font-serif italic text-[var(--gold-vivid)] drop-shadow-sm">VOTRE LIBERTÉ</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] font-light leading-relaxed max-w-3xl mx-auto">
            Le chemin exact pour ne plus choisir entre votre impact et votre épuisement
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-[48px] z-50 bg-white/95 backdrop-blur-md border-b border-[var(--border-subtle)] shadow-sm">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            {/* Tabs */}
            <div className="flex gap-2 flex-1">
              {tabs.map((tab, i) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-3 px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all relative",
                      isActive 
                        ? "bg-[var(--emerald-deep)] text-white shadow-lg" 
                        : "text-[var(--text-secondary)] hover:bg-[var(--emerald-deep)]/5"
                    )}
                  >
                    <TabIcon className="w-4 h-4" />
                    <span className="hidden md:inline">{tab.label}</span>
                    {i < tabs.length - 1 && (
                      <ChevronRight className="w-4 h-4 opacity-30 ml-2 hidden lg:inline" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Progress */}
            <div className="hidden md:flex items-center gap-3 ml-6">
              <span className="text-xs font-black uppercase tracking-wider text-[var(--text-secondary)]">
                {currentIndex + 1}/{tabs.length}
              </span>
              <div className="w-24 h-2 rounded-full bg-[var(--border-subtle)]">
                <motion.div
                  className="h-full rounded-full bg-[var(--gold-vivid)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <section className="py-20 px-6 min-h-[600px]">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {/* TAB 1: LES MODES */}
            {activeTab === 'modes' && (
              <motion.div
                key="modes"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-12">
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
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
              </motion.div>
            )}

            {/* TAB 2: LES 5 PHASES (TIMELINE) */}
            {activeTab === 'phases' && (
              <motion.div
                key="phases"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter mb-4">
                    Les <span className="font-serif italic text-[var(--emerald-deep)]">5 phases</span>
                  </h2>
                  <p className="text-lg text-[var(--text-secondary)]">
                    Le parcours complet pour bâtir votre infrastructure
                  </p>
                </div>

                {/* Timeline */}
                <div className="relative max-w-4xl mx-auto">
                  {/* Vertical Line */}
                  <div className="absolute left-[30px] md:left-[50px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--emerald-deep)] via-[var(--gold-vivid)] to-[var(--emerald-deep)]" />

                  <div className="space-y-12">
                    {modules.map((mod, i) => {
                      const ModIcon = mod.icon;
                      
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="relative pl-20 md:pl-32"
                        >
                          {/* Timeline Dot */}
                          <div className="absolute left-[18px] md:left-[38px] top-8 w-6 h-6 rounded-full bg-[var(--emerald-deep)] border-4 border-white shadow-lg flex items-center justify-center z-10">
                            <div className="w-2 h-2 rounded-full bg-[var(--gold-vivid)] animate-pulse" />
                          </div>

                          <div className="glass-card rounded-3xl p-8 border border-[var(--border-subtle)] hover:border-[var(--gold-vivid)]/30 transition-all">
                            {/* Header */}
                            <div className="flex items-center gap-4 mb-6">
                              <div className="w-16 h-16 rounded-2xl bg-[var(--emerald-deep)]/10 flex items-center justify-center">
                                <ModIcon className="w-8 h-8 text-[var(--emerald-deep)]" />
                              </div>
                              <div>
                                <div className="text-[8px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)]/40 mb-1">{mod.phase}</div>
                                <h3 className="text-2xl md:text-3xl font-light uppercase tracking-tight">{mod.title}</h3>
                              </div>
                            </div>

                            {/* Résultat Garanti */}
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-[var(--gold-vivid)]/10 to-[var(--gold-vivid)]/5 border-2 border-[var(--gold-vivid)]/30 mb-6">
                              <div className="flex items-center gap-2 mb-3">
                                <Sparkles className="w-4 h-4 text-[var(--gold-vivid)]" />
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--gold-vivid)]">RÉSULTAT GARANTI</span>
                              </div>
                              <p className="text-lg font-serif italic text-[var(--emerald-deep)] leading-relaxed">
                                "{mod.outcome}"
                              </p>
                            </div>

                            {/* Description */}
                            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                              {mod.desc}
                            </p>

                            {/* Units (Expandable) */}
                            <details className="group/details">
                              <summary className="cursor-pointer text-sm font-black uppercase tracking-wider text-[var(--emerald-deep)] flex items-center gap-2 hover:text-[var(--gold-vivid)] transition-colors mb-4">
                                <ArrowRight className="w-4 h-4 group-open/details:rotate-90 transition-transform" />
                                Ce que vous mettez en place
                              </summary>
                              <div className="space-y-2 pl-6 mb-4">
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
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: LE CADRE */}
            {activeTab === 'cadre' && (
              <motion.div
                key="cadre"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--emerald-deep)] to-[var(--emerald-deep)]/70 flex items-center justify-center shadow-xl">
                        <ShieldCheck className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <Badge className="mb-6 border-[var(--emerald-deep)]/30 bg-[var(--emerald-deep)]/10 text-[var(--emerald-deep)]">
                      LE CADRE DU PROGRAMME
                    </Badge>
                    <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter mb-6 leading-tight">
                      Une <span className="font-serif italic text-[var(--gold-vivid)]">protection</span>, <br />
                      pas une limite
                    </h2>
                    <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                      Ce cadre existe pour <strong className="text-[var(--emerald-deep)]">préserver votre expérience</strong> et garantir la qualité pour tous.
                    </p>
                  </div>

                  <div className="space-y-8">
                    {/* Ce programme est structuré pour */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="glass-card rounded-3xl p-10 border-2 border-[var(--emerald-deep)]/20"
                    >
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-[var(--emerald-deep)]/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-6 h-6 text-[var(--emerald-deep)]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                            Ce programme est volontairement structuré pour :
                          </h3>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-2xl bg-[var(--emerald-deep)]/5 border border-[var(--emerald-deep)]/10">
                          <Heart className="w-8 h-8 text-[var(--emerald-deep)] mb-4" />
                          <h4 className="font-bold text-sm text-[var(--text-primary)] mb-2">Préserver votre énergie</h4>
                          <p className="text-xs text-[var(--text-secondary)]">Vous ne vous épuisez pas</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-[var(--emerald-deep)]/5 border border-[var(--emerald-deep)]/10">
                          <Sparkles className="w-8 h-8 text-[var(--emerald-deep)] mb-4" />
                          <h4 className="font-bold text-sm text-[var(--text-primary)] mb-2">Préserver la qualité</h4>
                          <p className="text-xs text-[var(--text-secondary)]">Excellence maintenue</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-[var(--emerald-deep)]/5 border border-[var(--emerald-deep)]/10">
                          <Target className="w-8 h-8 text-[var(--emerald-deep)] mb-4" />
                          <h4 className="font-bold text-sm text-[var(--text-primary)] mb-2">Éviter toute dépendance</h4>
                          <p className="text-xs text-[var(--text-secondary)]">Autonomie garantie</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Clarté des limites */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="glass-card rounded-3xl p-10 border-2 border-[var(--gold-vivid)]/20 bg-gradient-to-br from-white to-[var(--gold-vivid)]/5"
                    >
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-[var(--gold-vivid)]/10 flex items-center justify-center shrink-0">
                          <AlertCircle className="w-6 h-6 text-[var(--gold-vivid)]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                            Pour être transparent avec vous :
                          </h3>
                          <p className="text-sm text-[var(--text-secondary)]">
                            Tout ce qui n'est pas <strong>explicitement inclus</strong> dans votre offre :
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4 pl-16">
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[var(--border-subtle)]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-secondary)] mt-2 shrink-0" />
                          <p className="text-sm text-[var(--text-secondary)]">
                            n'est <strong className="text-[var(--text-primary)]">pas pris en charge</strong>
                          </p>
                        </div>
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[var(--border-subtle)]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-secondary)] mt-2 shrink-0" />
                          <p className="text-sm text-[var(--text-secondary)]">
                            ne fait <strong className="text-[var(--text-primary)]">pas l'objet de support individuel</strong>
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Message final */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-center p-8 rounded-3xl bg-gradient-to-br from-[var(--emerald-deep)]/5 to-transparent"
                    >
                      <p className="text-2xl font-light text-[var(--text-primary)] mb-4">
                        Ce cadre est une <span className="font-serif italic text-[var(--emerald-deep)]">protection</span>,
                      </p>
                      <p className="text-xl text-[var(--text-secondary)]">
                        pas une contrainte.
                      </p>
                      <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--emerald-deep)]/10 border border-[var(--emerald-deep)]/20">
                        <ShieldCheck className="w-5 h-5 text-[var(--emerald-deep)]" />
                        <span className="text-sm font-bold text-[var(--emerald-deep)]">Conçu pour votre réussite</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Navigation Buttons */}
      <section className="py-12 px-6 border-t border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all",
              currentIndex === 0
                ? "opacity-30 cursor-not-allowed"
                : "bg-[var(--emerald-deep)]/10 text-[var(--emerald-deep)] hover:bg-[var(--emerald-deep)]/20"
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            Précédent
          </button>

          {currentIndex < tabs.length - 1 ? (
            <button
              onClick={goToNext}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider bg-[var(--emerald-deep)] text-white hover:bg-[var(--emerald-deep)]/90 transition-all"
            >
              Suivant
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <Link href="/offres">
              <SophisticatedButton className="py-4 px-8 text-xs tracking-[0.3em]">
                CHOISIR MON CHEMIN
              </SophisticatedButton>
            </Link>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
