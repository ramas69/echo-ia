'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Menu, 
  X, 
  Sparkles, 
  Brain, 
  Video, 
  Zap, 
  Target, 
  Cpu, 
  ArrowLeft,
  FileText,
  Lock
} from 'lucide-react';
import { Badge, SophisticatedButton } from '@/components/SharedUI';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Unit {
  id: string;
  title: string;
  slug: string;
  duration: string;
  isCompleted: boolean;
}

interface Phase {
  id: string;
  title: string;
  slug: string;
  description: string;
  outcome: string;
  status: 'LOCKED' | 'UNLOCKED' | 'COMPLETED';
  units: Unit[];
}

export default function AcademieClient({ 
  userName, 
  initialProgress,
  phases,
  userRole
}: { 
  userName: string, 
  initialProgress: number,
  phases: Phase[],
  userRole: string
}) {
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);

  return (
    <div className="min-h-screen bg-[#FDFCFB] mesh-gradient selection:bg-[var(--gold-sand)] selection:text-[var(--emerald-deep)]">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-card border-b border-[var(--border-subtle)] px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group border-r border-[var(--border-subtle)] pr-6">
              <ArrowLeft className="w-4 h-4 text-[var(--emerald-deep)] group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--emerald-deep)]">Landing</span>
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--gold-vivid)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--emerald-deep)]">L'ÉCHO IA // ACADÉMIE</span>
            </div>
            {userRole === "ADMIN" && (
              <Link href="/admin" className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--gold-vivid)] hover:opacity-70 transition-opacity pl-6 border-l border-[var(--border-subtle)]">
                Dashboard Admin
              </Link>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-[var(--emerald-deep)] text-white flex items-center justify-center text-[10px] font-black">
              {userName.charAt(0)}
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Feed */}
          <div className="lg:col-span-8 space-y-12">
            <AnimatePresence mode="wait">
              {!selectedPhase ? (
                <motion.div 
                  key="phases-list"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-12"
                >
                  <header>
                    <Badge className="mb-4">Espace Membre</Badge>
                    <h1 className="text-4xl md:text-6xl font-light uppercase tracking-tighter mb-4">
                      BONRETOUR, <br /><span className="font-serif italic text-[var(--emerald-deep)]">{userName}.</span>
                    </h1>
                    <p className="text-[var(--text-secondary)] font-light max-w-xl">
                      Votre infrastructure est en cours de construction. Suivez chaque phase séquentiellement.
                    </p>
                  </header>

                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--emerald-deep)]/40">Le Protocole de Résonance</h2>
                      <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--gold-vivid)]">{initialProgress}% Complété</div>
                    </div>
                    
                    <div className="grid gap-4">
                      {phases.map((phase, idx) => (
                        <motion.button
                          key={phase.id}
                          whileHover={phase.status !== 'LOCKED' ? { x: 10 } : {}}
                          onClick={() => phase.status !== 'LOCKED' && setSelectedPhase(phase)}
                          disabled={phase.status === 'LOCKED'}
                          className={cn(
                            "w-full text-left p-8 glass-card rounded-[2rem] border transition-all group flex items-center justify-between",
                            phase.status === 'LOCKED' 
                              ? "opacity-50 grayscale border-[var(--border-subtle)] cursor-not-allowed" 
                              : "border-[var(--border-subtle)] hover:border-[var(--gold-vivid)]/30"
                          )}
                        >
                          <div className="flex items-center gap-8">
                            <div className="text-2xl font-black text-[var(--emerald-deep)]/10 group-hover:text-[var(--gold-vivid)]/20 transition-colors tabular-nums">
                              {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                            </div>
                            <div>
                              <div className="flex items-center gap-3">
                                <h3 className="text-xl font-bold uppercase tracking-tight mb-1">{phase.title}</h3>
                                {phase.status === 'COMPLETED' && <CheckCircle2 className="w-4 h-4 text-[var(--gold-vivid)]" />}
                                {phase.status === 'LOCKED' && <Lock className="w-3.5 h-3.5 text-[var(--text-secondary)]/40" />}
                              </div>
                              <p className="text-xs text-[var(--text-secondary)] font-light">
                                {phase.units.length} Unités // {phase.outcome.substring(0, 60)}...
                              </p>
                            </div>
                          </div>
                          {phase.status !== 'LOCKED' && (
                            <div className="w-12 h-12 rounded-full border border-[var(--border-subtle)] flex items-center justify-center group-hover:bg-[var(--emerald-deep)] group-hover:text-white transition-all">
                              <ChevronRight className="w-5 h-5" />
                            </div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="phase-details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <button 
                    onClick={() => setSelectedPhase(null)}
                    className="flex items-center gap-2 group text-[10px] font-black uppercase tracking-[0.3em] text-[var(--emerald-deep)]/60 hover:text-[var(--emerald-deep)] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Retour au protocole
                  </button>

                  <div className="space-y-8">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Badge className="border-[var(--gold-vivid)]/30">{selectedPhase.status === 'COMPLETED' ? 'PHASE TERMINÉE' : 'PHASE OPÉRATIONNELLE'}</Badge>
                        <div className="h-px flex-grow bg-[var(--gold-vivid)]/20" />
                      </div>
                      <h2 className="text-5xl md:text-7xl font-light uppercase tracking-tighter leading-tight">
                        {selectedPhase.title}
                      </h2>
                      <p className="text-xl text-[var(--text-secondary)] font-light leading-relaxed">
                        {selectedPhase.description}
                      </p>
                    </div>

                    <div className="grid gap-4 pt-8">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--emerald-deep)]/40 mb-2">Unités d'Apprentissage</h3>
                      {selectedPhase.units.map((unit, uidx) => (
                        <Link 
                          key={unit.id} 
                          href={`/academie/cours/${selectedPhase.slug}/${unit.slug}`}
                          className="p-6 rounded-3xl bg-white border border-[var(--border-subtle)] hover:border-[var(--gold-vivid)]/30 hover:shadow-xl transition-all group flex items-center justify-between"
                        >
                          <div className="flex items-center gap-6">
                            <div className="w-10 h-10 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center text-[10px] font-black group-hover:bg-[var(--gold-vivid)]/10 transition-colors tabular-nums">
                              {idx + 1}.{uidx + 1}
                            </div>
                            <span className="font-bold uppercase tracking-tight text-sm">{unit.title}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-[9px] font-black opacity-30">{unit.duration}</span>
                            {unit.isCompleted ? (
                              <CheckCircle2 className="w-5 h-5 text-[var(--emerald-deep)]" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-[var(--border-subtle)]" />
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar / Arsenal */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-10 glass-card rounded-[2.5rem] border border-[var(--border-subtle)] space-y-8">
              <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-3">
                <Zap className="w-5 h-5 text-[var(--gold-vivid)]" /> L'Arsenal
              </h3>
              
              <div className="space-y-4">
                {[
                  { label: "Vault Notion Premium", type: "Template", icon: FileText },
                  { label: "Studio de Clonage IA", type: "Accès", icon: Video },
                  { label: "Library Master Prompts", type: "Fichier", icon: Brain }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--bg-secondary)]/50 hover:bg-white border border-transparent hover:border-[var(--gold-vivid)]/20 transition-all cursor-pointer group">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center group-hover:bg-[var(--gold-vivid)]/10 transition-colors">
                      <item.icon className="w-4 h-4 text-[var(--emerald-deep)] group-hover:text-[var(--gold-vivid)]" />
                    </div>
                    <div>
                      <div className="text-[8px] font-black uppercase tracking-widest opacity-40">{item.type}</div>
                      <div className="text-xs font-bold">{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <SophisticatedButton variant="outline" className="w-full justify-center text-[9px] py-4">
                Accéder au Discord Privé
              </SophisticatedButton>
            </div>

            <div className="p-10 rounded-[2.5rem] bg-[var(--emerald-deep)] text-white space-y-6 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShieldCheck className="w-24 h-24" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight relative z-10">Besoin d'aide ?</h3>
              <p className="text-xs text-white/60 leading-relaxed relative z-10">
                Votre architecte IA est disponible 24/7 via le portail de support pour toute question technique.
              </p>
              <SophisticatedButton variant="secondary" className="w-full justify-center relative z-10 text-[9px] py-4">
                Ouvrir un ticket
              </SophisticatedButton>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
