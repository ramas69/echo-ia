'use client';

import React, { useState, useEffect } from 'react';
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
  ShieldCheck,
  Heart,
  Lock,
  Users,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { Badge, SophisticatedButton, TopBar, Navbar, Footer } from '@/components/SharedUI';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const modules = [
  {
    phase: "PHASE 1",
    title: "LE SECOND CERVEAU",
    icon: Brain,
    desc: "Votre expertise est précieuse. Nous la transformons en une bibliothèque vivante, claire et sécurisée, consultable sans vous solliciter. Vous ne répétez plus les bases. Vous vous concentrez sur la transformation réelle de vos clients.",
    outcome: "Votre sagesse est organisée, protégée et disponible 24/7.",
    units: [
      "Structurer votre méthode unique pour la rendre transmissible",
      "Rendre vos connaissances consultables et intelligibles",
      "Centraliser votre savoir dans un espace simple et sécurisé",
      "Mettre à jour votre expertise sans tout reconstruire"
    ],
    note: "Fin de la répétition. Début de la transmission intelligente."
  },
  {
    phase: "PHASE 2",
    title: "L'USINE À CONTENU",
    icon: Video,
    desc: "Vous restez vous-même, mais vous êtes présent de façon régulière. Votre message circule sans vous disperser. L'IA devient un relais, jamais un masque.",
    outcome: "Amplifiez votre message sans y laisser votre énergie vitale.",
    units: [
      "Captation fidèle de votre voix et de votre posture",
      "Création d'une présence cohérente et durable",
      "Une plume alignée avec votre ton et vos valeurs",
      "Diffusion fluide de vos messages"
    ],
    note: "1 heure par semaine suffit."
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
    note: "Moins de gestion. Plus d'espace mental."
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
    note: "Fin de la prospection agressive. Place à l'attraction juste."
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
    note: "Vos clients pratiquent entre les séances. Votre valeur devient tangible."
  }
];

export default function FormationPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] mesh-gradient selection:bg-[var(--gold-sand)] selection:text-[var(--emerald-deep)] pb-20">
      <TopBar />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-48 pb-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <Badge className="mb-8 border-[var(--gold-vivid)]/30">VOTRE SYSTÈME AU SERVICE DE L'HUMAIN</Badge>
          <h1 className="text-5xl md:text-8xl font-light uppercase tracking-tighter mb-8 leading-[0.85]">
            LA CARTE DE <br />
            <span className="font-serif italic text-[var(--gold-vivid)] drop-shadow-sm">VOTRE LIBERTÉ</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] font-light leading-relaxed max-w-3xl mx-auto text-balance mb-8">
            Voici le chemin exact pour ne plus choisir entre votre impact et votre épuisement.
          </p>
          <div className="max-w-2xl mx-auto space-y-4 text-base text-[var(--text-secondary)] mb-8">
            <p>Ce programme n'est pas une formation technique.</p>
            <p>C'est un parcours structuré, conçu pour transformer une expertise dépendante de vous en un système fluide, durable et libérant.</p>
          </div>
          <div className="flex flex-col gap-3 max-w-xl mx-auto text-sm md:text-base text-[var(--emerald-deep)] font-medium">
            <p>👉 Vous ne venez pas apprendre des outils.</p>
            <p>👉 Vous venez construire un cadre qui travaille pour vous.</p>
          </div>
        </div>
      </section>

      {/* Comment vous avancez */}
      <section className="py-20 px-6 bg-white/50 border-y border-[var(--border-subtle)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter mb-6">
              Comment vous <span className="font-serif italic text-[var(--emerald-deep)]">avancez</span> <br />dans le programme
            </h2>
          </div>

          <div className="space-y-8 max-w-3xl mx-auto">
            <div className="glass-card rounded-3xl p-10 border border-[var(--border-subtle)]">
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                Le programme a été conçu pour pouvoir être suivi en <strong className="text-[var(--emerald-deep)]">autonomie complète</strong>.
              </p>
              
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                Vous avancez à votre rythme, en vous appuyant sur les vidéos, les templates et les blueprints fournis.
              </p>

              <div className="space-y-3 mb-6">
                <p className="text-sm font-bold text-[var(--emerald-deep)]">👉 C'est le socle du programme.</p>
                <p className="text-sm font-bold text-[var(--emerald-deep)]">👉 Celui sur lequel repose toute la méthode.</p>
              </div>

              <div className="pt-6 border-t border-[var(--border-subtle)]">
                <p className="text-sm text-[var(--text-secondary)] italic">
                  Ce mode d'avancement convient si vous êtes autonome et à l'aise avec une mise en place guidée, sans accompagnement.
                </p>
              </div>
            </div>

            {/* ET SI VOUS NE VOULIEZ PAS... */}
            <div className="text-center py-12">
              <h3 className="text-3xl md:text-4xl font-light uppercase tracking-tighter mb-4">
                Et si vous ne vouliez pas <br />
                <span className="font-serif italic text-[var(--gold-vivid)]">avancer seul(e)</span> ?
              </h3>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
                Certaines personnes préfèrent avancer avec un cadre, pour ne pas rester bloquées trop longtemps ou simplement pour se poser les bonnes questions au bon moment.
              </p>
              <p className="text-lg text-[var(--emerald-deep)] font-medium mt-6">
                C'est pour cela qu'un mode d'avancement collectif existe.
              </p>
            </div>

            {/* LE MODE ACCÉLÉRATION */}
            <div className="glass-card rounded-3xl p-10 border-2 border-[var(--gold-vivid)]/30 bg-gradient-to-br from-white to-[var(--gold-vivid)]/5 shadow-xl relative">
              <div className="absolute top-6 right-6">
                <Sparkles className="w-6 h-6 text-[var(--gold-vivid)]" />
              </div>

              <div className="text-center mb-8">
                <Badge className="mb-4 border-[var(--gold-vivid)]/30 bg-[var(--gold-vivid)]/10 text-[var(--gold-vivid)]">
                  LE MODE ACCÉLÉRATION
                </Badge>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                  Dans ce mode, le programme reste <strong>strictement le même</strong>.
                </p>
                <p className="text-base text-[var(--text-secondary)]/80 mt-2">
                  Les 5 phases, les contenus et les livrables ne changent pas.
                </p>
                <p className="text-base text-[var(--emerald-deep)] font-medium mt-4 italic">
                  La valeur ajoutée ne se situe pas dans le contenu, mais dans la manière d'avancer.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-[var(--border-subtle)]">
                  <Calendar className="w-6 h-6 text-[var(--gold-vivid)] shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-[var(--text-primary)] mb-2">1 session collective par mois (Q&A)</h4>
                    <p className="text-xs text-[var(--text-secondary)]">Un rythme régulier pour éviter de remettre à plus tard</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-[var(--border-subtle)]">
                  <Users className="w-6 h-6 text-[var(--gold-vivid)] shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-[var(--text-primary)] mb-2">Des réponses mutualisées</h4>
                    <p className="text-xs text-[var(--text-secondary)]">Issues des situations réelles du groupe</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-[var(--border-subtle)]">
                  <ShieldCheck className="w-6 h-6 text-[var(--gold-vivid)] shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-[var(--text-primary)] mb-2">Aucun suivi individuel</h4>
                    <p className="text-xs text-[var(--text-secondary)]">Pour préserver l'autonomie et la clarté du cadre</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-[var(--border-subtle)]">
                  <TrendingUp className="w-6 h-6 text-[var(--gold-vivid)] shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-[var(--text-primary)] mb-2">Sans surcharge mentale</h4>
                    <p className="text-xs text-[var(--text-secondary)]">Sans dépendance</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-[var(--border-subtle)]">
                <p className="text-sm font-bold text-[var(--emerald-deep)]">👉 Vous avancez avec un repère mensuel clair,</p>
                <p className="text-sm font-bold text-[var(--emerald-deep)]">👉 vous gagnez du temps grâce aux questions des autres,</p>
                <p className="text-sm font-bold text-[var(--emerald-deep)]">👉 sans surcharge mentale,</p>
                <p className="text-sm font-bold text-[var(--emerald-deep)]">👉 sans dépendance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Les 5 Phases */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto space-y-24">
          {modules.map((mod, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={cn(
                "flex flex-col md:flex-row gap-12 md:gap-20 items-center",
                i % 2 !== 0 && "md:flex-row-reverse"
              )}
            >
              {/* Decorative Side */}
              <div className="w-full md:w-[40%] relative group">
                <div className="aspect-[4/3] rounded-[2.5rem] bg-[var(--emerald-deep)] overflow-hidden shadow-xl relative interactive-card border-2 border-[var(--gold-vivid)]/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 z-10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <mod.icon className="w-24 h-24 text-white/10 group-hover:scale-110 transition-transform duration-1000 ease-out" />
                  </div>
                  {/* Phase Marker */}
                  <div className="absolute top-8 left-8 z-20">
                    <div className="text-[8px] font-black uppercase tracking-[0.4em] text-[var(--gold-sand)] opacity-60">{mod.phase}</div>
                  </div>
                  {/* Sparkles */}
                  <div className="absolute top-8 right-8 z-20">
                    <Sparkles className="w-5 h-5 text-[var(--gold-vivid)] animate-pulse" />
                  </div>
                </div>
                
                {/* Floating Outcome Card */}
                <motion.div 
                  whileHover={{ y: -3 }}
                  className="absolute -bottom-8 -right-4 md:-right-8 glass-card p-6 rounded-[2rem] border border-[var(--gold-vivid)]/20 shadow-xl max-w-[280px] z-30 bg-white/95"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 bg-[var(--gold-vivid)] rounded-full animate-ping" />
                    <div className="text-[8px] font-black uppercase tracking-[0.2em] text-[var(--emerald-deep)]">RÉSULTAT GARANTI</div>
                  </div>
                  <p className="text-xs font-serif italic text-[var(--text-primary)] leading-relaxed">
                    "{mod.outcome}"
                  </p>
                </motion.div>
              </div>

              {/* Text Side */}
              <div className="w-full md:w-[60%] space-y-6 pt-4">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-light uppercase tracking-tighter leading-none">{mod.title}</h2>
                  <div className="h-px w-16 bg-[var(--gold-vivid)]" />
                  <p className="text-[var(--text-secondary)] text-lg font-light leading-relaxed">{mod.desc}</p>
                </div>

                <div className="space-y-4">
                  <div className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--emerald-deep)] opacity-40">CE QUE VOUS METTEZ EN PLACE</div>
                  <div className="space-y-3">
                    {mod.units.map((unit, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[var(--border-subtle)] group hover:border-[var(--gold-vivid)]/30 transition-all duration-300">
                        <CheckCircle2 className="w-4 h-4 text-[var(--emerald-deep)] group-hover:text-[var(--gold-vivid)] shrink-0 mt-0.5" />
                        <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] leading-relaxed">{unit}</span>
                      </div>
                    ))}
                  </div>
                  
                  {mod.note && (
                    <div className="pt-4 space-y-2">
                      {mod.note.split('. ').map((line, idx) => line && (
                        <p key={idx} className="text-sm font-bold text-[var(--emerald-deep)]">👉 {line.trim()}.</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Le Cadre */}
      <section className="py-24 px-6 bg-white/50 border-y border-[var(--border-subtle)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-6 border-[var(--gold-vivid)]/30">LE CADRE (IMPORTANT)</Badge>
            <h2 className="text-3xl md:text-5xl font-light uppercase tracking-tighter mb-8">
              Une <span className="font-serif italic text-[var(--gold-vivid)]">protection</span>, pas une limite
            </h2>
          </div>

          <div className="glass-card rounded-[2rem] p-10 md:p-12 border border-[var(--border-subtle)]">
            <div className="space-y-6 text-[var(--text-secondary)]">
              <p className="text-lg font-medium">Ce programme est volontairement structuré pour :</p>
              
              <ul className="space-y-3 pl-6">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[var(--emerald-deep)] rounded-full mt-2 shrink-0" />
                  <span>préserver votre énergie</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[var(--emerald-deep)] rounded-full mt-2 shrink-0" />
                  <span>préserver la qualité</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[var(--emerald-deep)] rounded-full mt-2 shrink-0" />
                  <span>éviter toute dépendance</span>
                </li>
              </ul>

              <div className="pt-6 border-t border-[var(--border-subtle)]">
                <p className="text-lg font-medium mb-3">Tout ce qui n'est pas explicitement inclus :</p>
                <ul className="space-y-3 pl-6">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0" />
                    <span>n'est pas pris en charge</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0" />
                    <span>ne fait pas l'objet de support individuel</span>
                  </li>
                </ul>
              </div>

              <p className="text-center text-sm italic pt-6 text-[var(--emerald-deep)] font-medium">
                Ce cadre est une protection, pas une limite.
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
                <p className="font-medium text-[var(--emerald-deep)]">👉 Choisissez le mode d'avancement qui vous correspond.</p>
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
