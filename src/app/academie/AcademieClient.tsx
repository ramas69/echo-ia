'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Download, 
  ChevronRight, 
  BookOpen,
  ArrowLeft,
  Settings,
  HelpCircle,
  Users,
  Sparkles
} from 'lucide-react';
import { Badge, SophisticatedButton } from '@/components/SharedUI';
import Link from 'next/link';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
}

interface Phase {
  id: string;
  number: string;
  title: string;
  objective: string;
  lessons: Lesson[];
  resource: {
    name: string;
    link: string;
    type: 'template' | 'file' | 'prompt';
  };
}

const phases: Phase[] = [
  {
    id: 'phase-1',
    number: 'PHASE 1',
    title: 'LE SECOND CERVEAU',
    objective: 'Ne plus jamais vous répéter.',
    lessons: [
      { id: '1.1', title: 'La structure parfaite pour organiser votre expertise.', duration: '12:45', completed: false },
      { id: '1.2', title: 'Transformer vos notes en base de connaissances consultable.', duration: '18:20', completed: false },
    ],
    resource: { name: 'Template Notion "Second Cerveau"', link: '#', type: 'template' }
  },
  {
    id: 'phase-2',
    number: 'PHASE 2',
    title: "L'USINE À CONTENU",
    objective: 'Être omniprésent en 1h par semaine.',
    lessons: [
      { id: '2.1', title: 'Créer votre double vocal et vidéo (les settings exacts).', duration: '22:10', completed: false },
      { id: '2.2', title: "Le workflow : De l'idée au post LinkedIn en 5 minutes.", duration: '14:30', completed: false },
    ],
    resource: { name: 'Bibliothèque de Prompts "Style & Tonalité"', link: '#', type: 'prompt' }
  },
  {
    id: 'phase-3',
    number: 'PHASE 3',
    title: 'LE FLUX ZÉRO-FRICTION',
    objective: "Tuer l'administratif.",
    lessons: [
      { id: '3.1', title: "L'architecture du système (Comprendre Make.com sans coder).", duration: '25:00', completed: false },
      { id: '3.2', title: "Automatiser l'onboarding client (Contrat + Paiement + Accès).", duration: '30:15', completed: false },
    ],
    resource: { name: 'Blueprints Make à importer (.json)', link: '#', type: 'file' }
  },
  {
    id: 'phase-4',
    number: 'PHASE 4',
    title: "L'AIMANT À CLIENTS",
    objective: 'Un agenda rempli en automatique.',
    lessons: [
      { id: '4.1', title: 'Cibler vos clients idéaux avec une précision laser (Apollo).', duration: '19:40', completed: false },
      { id: '4.2', title: 'Rédiger des séquences qui ne finissent pas en spam.', duration: '16:55', completed: false },
    ],
    resource: { name: "Scripts d'emails à haute conversion", link: '#', type: 'prompt' }
  }
];

export default function AcademieClient({ userName, initialProgress }: { userName: string, initialProgress: number }) {
  const [progress, setProgress] = useState(initialProgress);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1F1E] selection:bg-[var(--gold-sand)] selection:text-[var(--emerald-deep)]">
      <nav className="fixed top-0 w-full z-50 glass-card border-b border-[var(--border-subtle)] px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <ArrowLeft className="w-4 h-4 text-[var(--emerald-deep)] group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--emerald-deep)]">Retour Landing</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[var(--emerald-deep)] rounded-full flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">{userName.charAt(0).toUpperCase()}</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">{userName} // L'ÉCHO IA</span>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <section className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <Badge className="mb-6">Espace Membre</Badge>
              <h1 className="text-5xl md:text-7xl font-light uppercase tracking-tighter mb-4 text-balance">
                BIENVENUE, <br /><span className="font-serif italic text-[var(--emerald-deep)]">{userName.toUpperCase()}.</span>
              </h1>
              <p className="text-[var(--text-secondary)] text-lg max-w-2xl font-light leading-relaxed">
                Votre feuille de route vers la liberté opérationnelle. <br />
                <span className="font-bold text-[var(--text-primary)]">Suivez le protocole dans l'ordre. N'improvisez pas.</span>
              </p>
            </div>
            <div className="w-full md:w-80 space-y-3">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                <span>Votre progression</span>
                <span className="text-[var(--emerald-deep)]">{progress}% Complété</span>
              </div>
              <div className="h-2 w-full bg-[var(--emerald-deep)]/5 rounded-full overflow-hidden border border-[var(--border-subtle)]">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-[var(--emerald-deep)] shadow-[0_0_10px_var(--emerald-deep)]"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-32">
          <div className="p-12 rounded-[2.5rem] bg-white border border-[var(--emerald-deep)] shadow-[0_20px_50px_rgba(6,78,59,0.05)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sparkles className="w-20 h-20 text-[var(--emerald-deep)]" />
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge className="mb-6 border-[var(--gold-vivid)]/30">INITIALISATION</Badge>
                <h2 className="text-4xl font-light uppercase tracking-tighter mb-6">
                  PHASE 0 // <span className="font-serif italic text-[var(--emerald-deep)]">La Promesse & La Rigueur.</span>
                </h2>
                <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                  Comment suivre ce programme pour garantir votre succès. <br />
                  Installez les outils nécessaires avant de commencer.
                </p>
                <div className="flex flex-wrap gap-4">
                  <SophisticatedButton variant="primary" className="py-4">
                    Rejoindre le Discord
                  </SophisticatedButton>
                  <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--emerald-deep)] hover:opacity-70 transition-opacity">
                    <Download className="w-4 h-4" /> Checklist de départ
                  </button>
                </div>
              </div>
              <div className="aspect-video bg-[var(--text-primary)] rounded-3xl relative overflow-hidden flex items-center justify-center cursor-pointer group/video">
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200" 
                  alt="Video Thumbnail" 
                  className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover/video:scale-105 transition-transform duration-1000"
                />
                <div className="relative z-10 w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover/video:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-[var(--emerald-deep)] fill-[var(--emerald-deep)] translate-x-0.5" />
                </div>
                <div className="absolute bottom-6 left-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/60">
                  VIDÉO D'ONBOARDING // 05:24
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            {phases.map((phase, phaseIdx) => (
              <motion.div 
                key={phase.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: phaseIdx * 0.1 }}
                className="p-10 bg-white rounded-[2rem] border border-[var(--border-subtle)] hover:border-[var(--emerald-deep)]/20 transition-all duration-500 shadow-sm hover:shadow-xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-10 border-b border-[var(--border-subtle)]">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--emerald-deep)]/50 mb-2">{phase.number}</div>
                    <h3 className="text-3xl font-light uppercase tracking-tighter">{phase.title}</h3>
                  </div>
                  <div className="px-6 py-2 rounded-full bg-[var(--gold-sand)]/20 text-[10px] font-bold text-[var(--emerald-deep)] uppercase tracking-widest">
                    GOAL: {phase.objective}
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                  {phase.lessons.map((lesson) => (
                    <div 
                      key={lesson.id}
                      className="flex items-center justify-between p-6 rounded-2xl bg-[var(--bg-secondary)]/50 hover:bg-white border border-transparent hover:border-[var(--border-subtle)] transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-10 h-10 rounded-full border border-[var(--emerald-deep)]/10 flex items-center justify-center group-hover:bg-[var(--emerald-deep)] group-hover:text-white transition-all">
                          <Play className="w-3 h-3 translate-x-0.5" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black text-[var(--emerald-deep)]/40 mb-1">{lesson.id}</div>
                          <div className="text-sm font-medium">{lesson.title}</div>
                        </div>
                      </div>
                      <div className="text-[10px] font-bold opacity-30">{lesson.duration}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between p-6 rounded-2xl bg-[var(--emerald-deep)]/5 border border-dashed border-[var(--emerald-deep)]/20">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <Download className="w-4 h-4 text-[var(--emerald-deep)]" />
                    </div>
                    <div>
                      <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--emerald-deep)]/40 mb-1">RESSOURCE CLÉ</div>
                      <div className="text-xs font-bold">{phase.resource.name}</div>
                    </div>
                  </div>
                  <SophisticatedButton variant="outline" className="px-6 py-3 text-[9px]">Dupliquer</SophisticatedButton>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-8">
            <div className="p-10 glass-card rounded-[2rem] border border-[var(--gold-vivid)]/20 shadow-xl sticky top-32">
              <Badge className="mb-6 border-[var(--gold-vivid)]/30">L'ARSENAL</Badge>
              <h3 className="text-2xl font-light uppercase tracking-tighter mb-4 italic">Vos accélérateurs <br /> de résultats.</h3>
              <p className="text-xs text-[var(--text-secondary)] mb-10 leading-relaxed text-balance">
                Tous les outils techniques et stratégiques pour aller 10x plus vite.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { icon: BookOpen, title: "Bibliothèque de Prompts Master", desc: "GPT-4 & Claude 3.5 Sonnet." },
                  { icon: Settings, title: "Blueprints Make & Scénarios", desc: "Flux JSON prêts à importer." },
                  { icon: HelpCircle, title: "FAQ & Dépannage Technique", desc: "Solutions aux bugs courants." },
                  { icon: Users, title: "Mastermind Discord", desc: "Communauté privée & Support." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-white transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-xl bg-[var(--emerald-deep)]/5 flex items-center justify-center shrink-0 group-hover:bg-[var(--gold-vivid)]/10">
                      <item.icon className="w-4 h-4 text-[var(--emerald-deep)] group-hover:text-[var(--gold-vivid)] transition-colors" />
                    </div>
                    <div>
                      <div className="text-xs font-bold mb-1">{item.title}</div>
                      <div className="text-[10px] opacity-40 uppercase tracking-widest">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-10 border-t border-[var(--border-subtle)]">
                <div className="p-6 rounded-2xl bg-[var(--emerald-deep)] text-white relative overflow-hidden group/upsell cursor-pointer">
                  <div className="relative z-10">
                    <div className="text-[9px] font-black uppercase tracking-[0.2em] mb-3 opacity-60">BESOIN DE VITESSE ?</div>
                    <div className="text-sm font-light mb-4 italic leading-tight">Vous bloquez sur la technique ? Laissez-nous faire le Setup pour vous.</div>
                    <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-[var(--gold-sand)]">
                      Passer au Setup VIP <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover/upsell:bg-white/10 transition-all" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 px-6 border-t border-[var(--border-subtle)] bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[var(--emerald-deep)] rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--emerald-deep)]">L'ÉCHO IA // ACADÉMIE</span>
          </div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--text-secondary)]/40 text-center">
            Besoin d'aide ? Utilisez le canal #support sur Discord.
          </p>
        </div>
      </footer>
    </div>
  );
}
