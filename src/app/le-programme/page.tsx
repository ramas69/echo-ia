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
  Lock
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

      {/* Comment fonctionne le programme */}
      <section className="py-16 px-6 bg-white/50 border-y border-[var(--border-subtle)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-light uppercase tracking-tighter mb-12">
            Comment fonctionne <br /><span className="font-serif italic text-[var(--gold-vivid)]">le programme</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="p-6 rounded-2xl glass-card border border-[var(--border-subtle)]">
              <CheckCircle2 className="w-8 h-8 text-[var(--emerald-deep)] mb-4" />
              <h3 className="text-sm font-black uppercase tracking-widest text-[var(--emerald-deep)] mb-2">100 % EN LIGNE</h3>
              <p className="text-sm text-[var(--text-secondary)]">Progression claire, étape par étape</p>
            </div>
            <div className="p-6 rounded-2xl glass-card border border-[var(--border-subtle)]">
              <ShieldCheck className="w-8 h-8 text-[var(--emerald-deep)] mb-4" />
              <h3 className="text-sm font-black uppercase tracking-widest text-[var(--emerald-deep)] mb-2">AUCUN PRÉREQUIS TECHNIQUE</h3>
              <p className="text-sm text-[var(--text-secondary)]">Un cadre précis pour éviter la surcharge</p>
            </div>
          </div>
          <p className="text-base text-[var(--text-secondary)] mt-8 italic">
            Chaque phase correspond à un pilier fondamental de votre futur système.
          </p>
        </div>
      </section>

      {/* Curriculum Grid */}
      <section className="px-6 py-12">
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

      {/* Les 3 Offres */}
      <section className="py-24 px-6 bg-white/50 border-y border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-6 border-[var(--gold-vivid)]/30">LES 3 FAÇONS DE SUIVRE LE PROGRAMME</Badge>
            <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter">
              Choisissez <span className="font-serif italic text-[var(--gold-vivid)]">votre rythme</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* FONDATIONS */}
            <motion.div
              whileHover={{ y: -10 }}
              className="p-10 rounded-[2rem] glass-card border-[var(--border-subtle)] hover:border-[var(--gold-vivid)]/20 transition-all duration-700"
            >
              <div className="text-[8px] font-black tracking-[0.4em] text-[var(--text-secondary)]/40 mb-6 uppercase">🥉 OFFRE 01</div>
              <h3 className="text-2xl font-light uppercase tracking-tighter mb-2">Fondations</h3>
              <p className="text-xs text-[var(--text-secondary)] italic mb-8">Construire votre système en autonomie</p>
              
              <div className="mb-8">
                <div className="text-4xl font-bold text-[var(--emerald-deep)] tracking-tighter">997 €</div>
              </div>

              <ul className="space-y-3 mb-8 text-xs text-[var(--text-secondary)]">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[var(--emerald-deep)] shrink-0 mt-0.5" /> Accès aux 5 phases en vidéo</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[var(--emerald-deep)] shrink-0 mt-0.5" /> Templates & blueprints prêts à l'emploi</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[var(--emerald-deep)] shrink-0 mt-0.5" /> Communauté d'entraide entre pairs</li>
              </ul>

              <div className="space-y-2 mb-8 text-[10px] text-[var(--text-secondary)]">
                <p>👉 100 % asynchrone</p>
                <p>👉 Aucun support individuel</p>
              </div>
            </motion.div>

            {/* ACCÉLÉRATION */}
            <motion.div
              whileHover={{ y: -10 }}
              className="p-10 rounded-[2rem] glass-card border-[var(--gold-vivid)]/30 shadow-lg transition-all duration-700 relative"
            >
              <div className="absolute top-4 right-4"><Sparkles className="w-4 h-4 text-[var(--gold-vivid)]" /></div>
              <div className="text-[8px] font-black tracking-[0.4em] text-[var(--gold-vivid)]/60 mb-6 uppercase">🥈 OFFRE 02 • POPULAIRE</div>
              <h3 className="text-2xl font-light uppercase tracking-tighter mb-2">Accélération</h3>
              <p className="text-xs text-[var(--text-secondary)] italic mb-8">Avancer sans se perdre</p>
              
              <div className="mb-8">
                <div className="text-4xl font-bold text-[var(--gold-vivid)] tracking-tighter">1 490 €</div>
              </div>

              <ul className="space-y-3 mb-8 text-xs text-[var(--text-secondary)]">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[var(--gold-vivid)] shrink-0 mt-0.5" /> Tout FONDATIONS</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[var(--gold-vivid)] shrink-0 mt-0.5" /> 1 live collectif / mois (Q&A)</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[var(--gold-vivid)] shrink-0 mt-0.5" /> Cadre clair, temps mutualisé</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[var(--gold-vivid)] shrink-0 mt-0.5" /> Questions envoyées à l'avance</li>
              </ul>

              <div className="space-y-2 mb-8 text-[10px] text-[var(--text-secondary)]">
                <p>👉 Pour les profils non techniques</p>
                <p>👉 Sans surcharge mentale</p>
              </div>
            </motion.div>

            {/* VIP ARCHITECTE */}
            <motion.div
              whileHover={{ y: -10 }}
              className="p-10 rounded-[2rem] bg-[var(--emerald-deep)] text-white shadow-2xl transition-all duration-700 border-2 border-[var(--gold-vivid)]/30 relative"
            >
              <div className="absolute top-4 right-4"><Lock className="w-5 h-5 text-[var(--gold-vivid)] animate-pulse" /></div>
              <div className="text-[8px] font-black tracking-[0.4em] text-[var(--gold-vivid)]/60 mb-6 uppercase">🥇 OFFRE 03 • VIP</div>
              <h3 className="text-2xl font-light uppercase tracking-tighter mb-2 italic text-[var(--gold-sand)]">VIP Architecte</h3>
              <p className="text-xs text-white/70 italic mb-8">Libération maximale – Clé en main</p>
              
              <div className="mb-8">
                <div className="text-4xl font-bold text-[var(--gold-sand)] tracking-tighter">À partir de 3 490 €</div>
              </div>

              <ul className="space-y-3 mb-8 text-xs text-white/80">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[var(--gold-sand)] shrink-0 mt-0.5" /> Tout ACCÉLÉRATION</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[var(--gold-sand)] shrink-0 mt-0.5" /> <strong>Installation complète</strong> de votre système cœur</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[var(--gold-sand)] shrink-0 mt-0.5" /> Création de votre premier outil signature</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[var(--gold-sand)] shrink-0 mt-0.5" /> Audit technique 1:1 (1h)</li>
              </ul>

              <div className="space-y-2 mb-8 text-[10px] text-white/70">
                <p>👉 Limité à 2 clients / mois</p>
                <p>👉 Sur candidature uniquement</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Le Cadre */}
      <section className="py-24 px-6">
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
                PRÊT À LIBÉRER <br /><span className="font-serif italic text-[var(--gold-vivid)]">VOTRE TEMPS ?</span>
              </h2>
              <div className="space-y-4 text-lg md:text-xl text-[var(--text-secondary)] font-light max-w-2xl mx-auto">
                <p>Votre système est prêt à être construit.</p>
                <p>Votre expertise mérite un cadre à sa hauteur.</p>
                <p className="font-medium text-[var(--emerald-deep)]">Il ne manque qu'une chose : votre décision.</p>
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

