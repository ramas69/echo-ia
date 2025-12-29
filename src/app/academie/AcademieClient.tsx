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
  Lock,
  ExternalLink
} from 'lucide-react';
import { Badge, SophisticatedButton } from '@/components/SharedUI';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import LogoutButton from '@/components/LogoutButton';

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
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--bg-secondary)]">
            <div className="w-8 h-8 rounded-full bg-[var(--emerald-deep)] text-white flex items-center justify-center text-[10px] font-black">
              {userName.charAt(0)}
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[var(--emerald-deep)]">{userName}</span>
            </div>
            <LogoutButton />
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
                  {/* Hero Section - Compact Next Step */}
                  <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[var(--emerald-deep)] to-[#0a4a3a] p-8 text-white shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold-vivid)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-8 mb-6">
                        <div className="flex-1">
                          <Badge className="mb-3 bg-white/10 text-white border-white/20 text-[9px]">Protocole d'Implémentation</Badge>
                          <h1 className="text-3xl md:text-4xl font-light uppercase tracking-tighter mb-2">
                            {initialProgress === 0 ? 'Démarrez' : 'Reprenons'}, <span className="font-serif italic text-[var(--gold-vivid)]">{userName}</span>
                          </h1>
                          <p className="text-white/70 text-sm font-light max-w-xl">
                            {initialProgress === 0 
                              ? "Activez votre premier pilier maintenant."
                              : "Continuez le déploiement de votre infrastructure."
                            }
                          </p>
                        </div>
                        
                        {/* Stats compacts inline */}
                        <div className="flex gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-black text-[var(--gold-vivid)]">{initialProgress}%</div>
                            <div className="text-[8px] uppercase tracking-widest opacity-60">Déployé</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-black">{phases.reduce((acc, p) => acc + p.units.filter(u => u.isCompleted).length, 0)}/{phases.reduce((acc, p) => acc + p.units.length, 0)}</div>
                            <div className="text-[8px] uppercase tracking-widest opacity-60">Activations</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Next Step CTA - Compact */}
                      {(() => {
                        const firstUnlocked = phases.find(p => p.status === 'UNLOCKED');
                        const nextUnit = firstUnlocked?.units.find(u => !u.isCompleted);
                        const phaseIndex = phases.findIndex(p => p.id === firstUnlocked?.id);
                        
                        return (
                          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                            {nextUnit && firstUnlocked ? (
                              <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4 flex-1">
                                  <div className="w-10 h-10 rounded-xl bg-[var(--gold-vivid)] flex items-center justify-center flex-shrink-0">
                                    <Play className="w-5 h-5 text-black fill-black" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-[9px] uppercase tracking-widest opacity-70 mb-0.5">
                                      Pilier {phaseIndex + 1} • {nextUnit.duration}
                                    </div>
                                    <div className="text-sm font-bold truncate">
                                      {nextUnit.title}
                                    </div>
                                  </div>
                                </div>
                                <Link href={`/academie/cours/${firstUnlocked.slug}/${nextUnit.slug}`}>
                                  <button className="py-3 px-6 bg-white text-[var(--emerald-deep)] rounded-xl font-black uppercase tracking-wider text-[10px] hover:bg-[var(--gold-vivid)] hover:text-black transition-all flex items-center gap-2 group whitespace-nowrap">
                                    {initialProgress === 0 ? 'Démarrer' : 'Continuer'}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                  </button>
                                </Link>
                              </div>
                            ) : initialProgress === 100 ? (
                              <div className="flex items-center gap-4 py-2">
                                <CheckCircle2 className="w-8 h-8 text-[var(--gold-vivid)]" />
                                <div>
                                  <div className="text-sm font-bold">Infrastructure Opérationnelle !</div>
                                  <div className="text-xs opacity-70">Tous vos systèmes sont activés et fonctionnels.</div>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-4 py-2">
                                <Target className="w-8 h-8 text-[var(--gold-vivid)]" />
                                <div>
                                  <div className="text-sm font-bold">Tous les piliers débloqués !</div>
                                  <div className="text-xs opacity-70">Continuez l'activation de vos systèmes.</div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Progress Bar Global */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h2 className="text-sm font-black uppercase tracking-widest text-[var(--emerald-deep)]">Protocole de Déploiement</h2>
                      <span className="text-xs font-bold text-[var(--gold-vivid)]">{initialProgress}% Activé</span>
                    </div>
                    <div className="h-4 bg-[var(--bg-secondary)] rounded-full overflow-hidden shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${initialProgress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-[var(--emerald-deep)] via-[var(--emerald-deep)] to-[var(--gold-vivid)] rounded-full shadow-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold uppercase tracking-tight text-[var(--emerald-deep)]">Architecture Globale</h2>
                    
                    <div className="grid gap-6">
                      {phases.map((phase, idx) => {
                        const completedUnits = phase.units.filter(u => u.isCompleted).length;
                        const phaseProgress = phase.units.length > 0 ? Math.round((completedUnits / phase.units.length) * 100) : 0;
                        
                        return (
                        <motion.button
                          key={phase.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={phase.status !== 'LOCKED' ? { scale: 1.02, x: 5 } : {}}
                          onClick={() => phase.status !== 'LOCKED' && setSelectedPhase(phase)}
                          disabled={phase.status === 'LOCKED'}
                          className={cn(
                            "w-full text-left p-8 rounded-[2.5rem] border transition-all group relative overflow-hidden",
                            phase.status === 'LOCKED' 
                              ? "opacity-60 border-dashed border-gray-300 cursor-not-allowed bg-gradient-to-br from-gray-50 to-gray-100" 
                              : "border-[var(--border-subtle)] hover:border-[var(--gold-vivid)] hover:shadow-2xl bg-white"
                          )}
                        >
                          {/* Gradient Background for Unlocked */}
                          {phase.status !== 'LOCKED' && (
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--emerald-deep)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                          
                          {/* Lock Watermark for Locked Phases */}
                          {phase.status === 'LOCKED' && (
                            <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-5">
                              <Lock className="w-32 h-32" />
                            </div>
                          )}
                          
                          <div className="relative z-10 flex items-start justify-between gap-6">
                            <div className="flex items-start gap-6 flex-1">
                              {/* Phase Number Badge */}
                              <div className={cn(
                                "w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black transition-all flex-shrink-0",
                                phase.status === 'LOCKED' 
                                  ? "bg-gray-200 text-gray-400"
                                  : "bg-gradient-to-br from-[var(--emerald-deep)] to-[var(--emerald-deep)]/70 text-white group-hover:scale-110"
                              )}>
                              {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                            </div>
                              
                              <div className="flex-1 space-y-3">
                                {/* Title & Status */}
                                <div className="space-y-2">
                                  <div className="flex items-center gap-3 flex-wrap">
                                    <h3 className="text-2xl font-bold uppercase tracking-tight">{phase.title}</h3>
                                    {phase.status === 'COMPLETED' && (
                                      <Badge className="bg-[var(--gold-vivid)] text-black border-none shadow-lg">
                                        <CheckCircle2 className="w-3 h-3 mr-1" /> Pilier Activé
                                      </Badge>
                                    )}
                                    {phase.status === 'UNLOCKED' && (
                                      <Badge className="bg-[var(--emerald-deep)] text-white border-none shadow-lg">
                                        <Zap className="w-3 h-3 mr-1" /> Déploiement Actif
                                      </Badge>
                                    )}
                                    {phase.status === 'LOCKED' && (
                                      <Badge className="bg-gray-200 text-gray-600 border-gray-300">
                                        <Lock className="w-3 h-3 mr-1" /> Verrouillé
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                                    {phase.description}
                                  </p>
                                </div>
                                
                                {/* Stats */}
                                <div className="flex items-center gap-6 text-xs">
                                  <div className="flex items-center gap-2">
                                    <Video className="w-4 h-4 text-[var(--emerald-deep)]/60" />
                                    <span className="font-bold">{phase.units.length} {phase.units.length > 1 ? 'activations' : 'activation'}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Target className="w-4 h-4 text-[var(--gold-vivid)]/60" />
                                    <span className="font-bold">{completedUnits}/{phase.units.length} activées</span>
                                  </div>
                                </div>
                                
                                {/* Progress Bar */}
                                {phase.status !== 'LOCKED' && (
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                      <span className="text-[var(--text-secondary)] font-bold">Déploiement</span>
                                      <span className="font-black text-[var(--gold-vivid)]">{phaseProgress}% Activé</span>
                                    </div>
                                    <div className="h-3 bg-[var(--bg-secondary)] rounded-full overflow-hidden shadow-inner">
                                      <div 
                                        className="h-full bg-gradient-to-r from-[var(--emerald-deep)] to-[var(--gold-vivid)] transition-all duration-500 shadow-md"
                                        style={{ width: `${phaseProgress}%` }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Arrow Button */}
                            {phase.status !== 'LOCKED' && (
                              <div className="w-14 h-14 rounded-2xl border-2 border-[var(--border-subtle)] flex items-center justify-center group-hover:bg-[var(--emerald-deep)] group-hover:border-[var(--emerald-deep)] group-hover:text-white transition-all flex-shrink-0">
                                <ChevronRight className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                        </motion.button>
                      )})}
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
                    Retour aux Piliers
                  </button>

                  <div className="space-y-8">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Badge className="bg-[var(--gold-vivid)] text-black border-none shadow-lg">
                          {selectedPhase.status === 'COMPLETED' ? 'PILIER ACTIVÉ' : 'DÉPLOIEMENT ACTIF'}
                        </Badge>
                        <div className="h-px flex-grow bg-[var(--gold-vivid)]/20" />
                      </div>
                      <h2 className="text-5xl md:text-7xl font-light uppercase tracking-tighter leading-tight">
                        {selectedPhase.title}
                      </h2>
                      <p className="text-xl text-[var(--text-secondary)] font-light leading-relaxed">
                        {selectedPhase.description}
                      </p>
                      <div className="p-6 bg-[var(--gold-vivid)]/5 rounded-2xl border border-[var(--gold-vivid)]/20">
                        <div className="text-xs uppercase tracking-widest text-[var(--gold-vivid)] font-black mb-2">🎯 Résultat Garanti</div>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{selectedPhase.outcome}</p>
                      </div>
                    </div>

                    <div className="grid gap-4 pt-8">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--emerald-deep)]/40 mb-2">Activations du Pilier</h3>
                      {selectedPhase.units.map((unit, uidx) => {
                        const phaseIndex = phases.findIndex(p => p.id === selectedPhase.id);
                        return (
                        <Link 
                          key={unit.id} 
                          href={`/academie/cours/${selectedPhase.slug}/${unit.slug}`}
                          className="p-6 rounded-3xl bg-white border border-[var(--border-subtle)] hover:border-[var(--gold-vivid)]/30 hover:shadow-xl transition-all group flex items-center justify-between"
                        >
                          <div className="flex items-center gap-6">
                            <div className="w-10 h-10 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center text-[10px] font-black group-hover:bg-[var(--gold-vivid)]/10 transition-colors tabular-nums">
                              {phaseIndex + 1}.{uidx + 1}
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
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar / Arsenal */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Stats Card */}
            <div className="p-8 bg-gradient-to-br from-[var(--gold-vivid)]/10 to-transparent rounded-[2rem] border border-[var(--gold-vivid)]/20">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-5 h-5 text-[var(--gold-vivid)]" />
                <h3 className="text-sm font-black uppercase tracking-widest">Votre Momentum</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-black text-[var(--emerald-deep)] mb-1">{initialProgress}%</div>
                  <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">Progression globale</div>
                </div>
                <div className="pt-4 border-t border-[var(--border-subtle)]">
                  <div className="text-xl font-black text-[var(--emerald-deep)] mb-1">
                    {phases.reduce((acc, p) => acc + p.units.filter(u => u.isCompleted).length, 0)} / {phases.reduce((acc, p) => acc + p.units.length, 0)}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider font-bold">Systèmes Activés</div>
                </div>
              </div>
            </div>

            {/* Arsenal */}
            <div className="p-8 bg-white rounded-[2rem] border border-[var(--border-subtle)] shadow-md space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[var(--border-subtle)]">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--gold-vivid)] to-[var(--gold-vivid)]/70 flex items-center justify-center shadow-lg">
                  <Zap className="w-5 h-5 text-black" />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-tight">L'Arsenal</h3>
              </div>
              
              <div className="space-y-3">
                {[
                  { label: "Vault Notion Premium", type: "Template", icon: FileText, color: "emerald" },
                  { label: "Studio de Clonage IA", type: "Accès Premium", icon: Video, color: "gold" },
                  { label: "Library Master Prompts", type: "Collection", icon: Brain, color: "emerald" }
                ].map((item, i) => (
                  <button key={i} className="w-full flex items-center gap-4 p-5 rounded-2xl bg-[var(--bg-secondary)] hover:bg-white border border-transparent hover:border-[var(--gold-vivid)]/30 transition-all group hover:shadow-xl">
                    <div className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center transition-all shadow-sm group-hover:shadow-md group-hover:scale-110",
                      item.color === "gold" 
                        ? "bg-[var(--gold-vivid)]/10 group-hover:bg-[var(--gold-vivid)]/20" 
                        : "bg-[var(--emerald-deep)]/10 group-hover:bg-[var(--emerald-deep)]/20"
                    )}>
                      <item.icon className={cn(
                        "w-6 h-6 transition-colors",
                        item.color === "gold" ? "text-[var(--gold-vivid)]" : "text-[var(--emerald-deep)]"
                      )} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-1">{item.type}</div>
                      <div className="text-sm font-bold leading-tight">{item.label}</div>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-[var(--bg-secondary)] group-hover:bg-[var(--gold-vivid)]/10 flex items-center justify-center transition-all">
                      <ChevronRight className="w-4 h-4 group-hover:text-[var(--gold-vivid)] transition-colors" />
                  </div>
                  </button>
                ))}
              </div>

              <SophisticatedButton variant="outline" className="w-full justify-center text-[10px] py-4 mt-4">
                <ExternalLink className="w-3.5 h-3.5 mr-2" />
                Discord Privé
              </SophisticatedButton>
            </div>

            {/* Support Card */}
            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[var(--emerald-deep)] to-[#0a4a3a] text-white space-y-6 relative overflow-hidden shadow-2xl">
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
