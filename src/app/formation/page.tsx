'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles, 
  Brain, 
  Video, 
  Zap, 
  Target, 
  Cpu, 
  ChevronRight,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { Badge, SophisticatedButton } from '@/components/SharedUI';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const modules = [
  {
    phase: "PHASE 1",
    title: "Le Second Cerveau",
    icon: Brain,
    desc: "Vectorisation de votre expertise. Votre savoir devient un actif numérique consultable 24h/24 par vos clients via une interface privée.",
    outcome: "Votre base de connaissances Notion est active et prête à recevoir votre savoir.",
    units: ["La structure du Vault", "Vectoriser votre expertise", "L'ingestion de données massive", "Automatiser la mise à jour"]
  },
  {
    phase: "PHASE 2",
    title: "L'Usine à Contenu",
    icon: Video,
    desc: "Clonage identitaire. Création de votre avatar vidéo et de votre plume IA pour une omniprésence totale.",
    outcome: "1h de travail hebdomadaire pour une présence 24/7 sur tous les réseaux.",
    units: ["Clonage de voix (ElevenLabs)", "Avatar Vidéo (HeyGen)", "La Plume IA (Master Prompts)", "Flux de distribution auto"]
  },
  {
    phase: "PHASE 3",
    title: "Le Flux Zéro-Friction",
    icon: Zap,
    desc: "L'ingénierie Make + Airtable. Une architecture robuste qui gère tout l'administratif sans intervention humaine.",
    outcome: "Paiements, contrats et accès gérés à 100% en automatique.",
    units: ["Architecture Airtable", "Scénarios Make.com", "Stripe & Facturation auto", "Onboarding client magique"]
  },
  {
    phase: "PHASE 4",
    title: "L'Aimant à Clients",
    icon: Target,
    desc: "Outbound systémique. Sourcing intelligent et séquences personnalisées pour un agenda rempli.",
    outcome: "Un flux constant de prospects qualifiés dans votre calendrier.",
    units: ["Sourcing Apollo.io", "Séquences Instantly", "Scripts de vente IA", "Le CRM auto-apprenant"]
  },
  {
    phase: "PHASE 5",
    title: "L'Outil Signature",
    icon: Cpu,
    desc: "Nous créons votre propre logiciel SaaS sur-mesure pour bluffé vos clients et dominer le marché.",
    outcome: "Un avantage concurrentiel technologique unique et propriétaire.",
    units: ["Design de l'expérience", "Développement No-Code/Low-Code", "Déploiement privé", "Maintenance systémique"]
  }
];

export default function FormationPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] mesh-gradient selection:bg-[var(--gold-sand)] selection:text-[var(--emerald-deep)] pb-20">
      {/* Navbar Simple */}
      <nav className="fixed top-0 w-full z-50 glass-card border-b border-[var(--border-subtle)] px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <ArrowLeft className="w-4 h-4 text-[var(--emerald-deep)] group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--emerald-deep)]">Retour Accueil</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/auth/login" className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)] hover:text-[var(--emerald-deep)] transition-colors">Connexion</Link>
            <Link href="/auth/register">
              <SophisticatedButton className="py-2.5 px-6 text-[9px]">Rejoindre</SophisticatedButton>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-8 border-[var(--gold-vivid)]/30">Curriculum Complet 2025</Badge>
          <h1 className="text-5xl md:text-7xl font-light uppercase tracking-tighter mb-8 leading-tight">
            L'ARCHITECTURE DE <br />
            <span className="font-serif italic text-[var(--gold-vivid)]">VOTRE LIBERTÉ.</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] font-light leading-relaxed max-w-2xl mx-auto">
            Découvrez le protocole exact que nous installons pour transformer votre expertise en une infrastructure IA autonome.
          </p>
        </div>
      </section>

      {/* Curriculum Grid */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto space-y-32">
          {modules.map((mod, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cn(
                "flex flex-col md:flex-row gap-16 md:gap-32 items-start",
                i % 2 !== 0 && "md:flex-row-reverse"
              )}
            >
              {/* Image/Icon Side */}
              <div className="w-full md:w-1/2 relative group">
                <div className="aspect-[4/3] rounded-[3rem] bg-[var(--emerald-deep)] overflow-hidden shadow-2xl relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <mod.icon className="w-32 h-32 text-white/10 group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute top-10 right-10">
                    <Sparkles className="w-8 h-8 text-[var(--gold-vivid)] animate-pulse" />
                  </div>
                </div>
                {/* Floating Outcome Card */}
                <div className="absolute -bottom-10 -right-6 md:right-10 glass-card p-8 rounded-3xl border border-[var(--gold-vivid)]/20 shadow-2xl max-w-xs z-20">
                  <div className="text-[9px] font-black uppercase tracking-widest text-[var(--emerald-deep)] mb-2">Résultat</div>
                  <p className="text-sm font-medium italic">"{mod.outcome}"</p>
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full md:w-1/2 space-y-8 pt-4">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--gold-vivid)] mb-4">{mod.phase}</div>
                  <h2 className="text-4xl md:text-5xl font-light uppercase tracking-tighter mb-6">{mod.title}</h2>
                  <p className="text-[var(--text-secondary)] text-lg font-light leading-relaxed">{mod.desc}</p>
                </div>

                <div className="space-y-4">
                  <div className="text-[9px] font-black uppercase tracking-widest text-[var(--emerald-deep)]/40">Unités d'apprentissage</div>
                  <div className="grid grid-cols-1 gap-3">
                    {mod.units.map((unit, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[var(--border-subtle)] group hover:border-[var(--gold-vivid)]/30 transition-all cursor-default">
                        <div className="w-8 h-8 rounded-xl bg-[var(--emerald-deep)]/5 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-[var(--emerald-deep)] group-hover:text-[var(--gold-vivid)] transition-colors" />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-tight">{unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-40 px-6">
        <div className="max-w-4xl mx-auto glass-card rounded-[4rem] p-16 md:p-24 text-center border-2 border-[var(--gold-vivid)]/20 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[var(--emerald-deep)]/5 -z-10" />
          <div className="relative z-10 space-y-12">
            <ShieldCheck className="w-16 h-16 text-[var(--emerald-deep)] mx-auto" />
            <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter">PRÊT À CONSTRUIRE <br /><span className="font-serif italic text-[var(--gold-vivid)]">VOTRE SYSTÈME ?</span></h2>
            <p className="text-lg text-[var(--text-secondary)] font-light max-w-xl mx-auto">
              Rejoignez les coachs qui ont déjà éteint le chaos pour faire résonner leur voix partout.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/auth/register">
                <SophisticatedButton className="py-6 px-12">Démarrer maintenant</SophisticatedButton>
              </Link>
              <Link href="/auth/login">
                <SophisticatedButton variant="outline" className="py-6 px-12">Déjà membre ? Se connecter</SophisticatedButton>
              </Link>
            </div>
          </div>
          {/* Decorative Sparkles */}
          <div className="absolute top-10 right-10 opacity-20"><Sparkles className="w-20 h-20 text-[var(--gold-vivid)]" /></div>
          <div className="absolute bottom-10 left-10 opacity-20"><Sparkles className="w-20 h-20 text-[var(--gold-vivid)]" /></div>
        </div>
      </section>
    </div>
  );
}

