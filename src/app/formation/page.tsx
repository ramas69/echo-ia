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
  ShieldCheck,
  Heart
} from 'lucide-react';
import { Badge, SophisticatedButton } from '@/components/SharedUI';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const modules = [
  {
    phase: "PHASE 1",
    title: "LE SECOND CERVEAU",
    icon: Brain,
    desc: "Votre expertise est précieuse. Nous la transformons en une bibliothèque vivante, consultable intuitivement par vos clients. Vous ne répétez plus jamais les bases, vous vous concentrez sur la transformation profonde.",
    outcome: "Votre sagesse est organisée, protégée et disponible 24/7 pour ceux que vous aidez.",
    units: [
      "Structurer votre méthode unique pour qu'elle soit transmissible.",
      "Rendre vos connaissances \"intelligentes\" et faciles à interroger.",
      "Créer un espace sécurisé où votre savoir réside.",
      "Mise à jour fluide de vos connaissances sans effort."
    ]
  },
  {
    phase: "PHASE 2",
    title: "L'USINE À CONTENU",
    icon: Video,
    desc: "Restez vous-même, mais soyez partout. Nous utilisons l'IA pour cloner éthiquement votre voix et votre image, vous permettant de diffuser votre message inspirant massivement avec seulement 1h d'implication par semaine.",
    outcome: "Amplifiez votre message authentique sans y laisser votre énergie vitale.",
    units: [
      "Captation haute fidélité de votre voix et de votre énergie.",
      "Création de votre double vidéo pour les contenus éducatifs.",
      "Votre \"Plume IA\" : Calibrée pour écrire avec votre tonalité et votre bienveillance.",
      "Diffusion automatique de vos messages sur tous les canaux."
    ]
  },
  {
    phase: "PHASE 3",
    title: "LE FLUX ZÉRO-FRICTION",
    icon: Zap,
    desc: "L'administratif ne devrait pas polluer votre esprit. Nous construisons une fondation invisible qui gère les contrats, les paiements et les accès avec fluidité et bienveillance pour vos nouveaux arrivants.",
    outcome: "La charge mentale administrative disparaît. Vous respirez.",
    units: [
      "Centralisation de vos données clients (sans tableurs compliqués).",
      "Automatisation des tâches répétitives (les robots gèrent le chaos).",
      "Paiements et facturation fluides et automatiques.",
      "L'accueil \"Magique\" : Vos clients se sentent pris en charge dès la première seconde."
    ]
  },
  {
    phase: "PHASE 4",
    title: "L'AIMANT À CLIENTS",
    icon: Target,
    desc: "Oubliez la prospection agressive. Nous mettons en place un système qui connecte votre message à ceux qui en ont vraiment besoin, créant un flux naturel de rendez-vous avec des personnes déjà alignées avec votre approche.",
    outcome: "Attirez les bonnes personnes à vous, sans forcer ni manipuler.",
    units: [
      "Identifier avec bienveillance ceux qui ont besoin de vous.",
      "Système d'approche respectueux et personnalisé.",
      "Rédiger des messages qui résonnent, pas qui vendent.",
      "Le système apprend qui sont vos clients de cœur pour en attirer d'autres."
    ]
  },
  {
    phase: "PHASE 5",
    title: "VOTRE OUTIL SIGNATURE",
    icon: Cpu,
    desc: "Votre petit \"plus\" magique. Nous ne faisons pas que connecter des outils ; nous créons une petite application sur-mesure qui aide vos clients à pratiquer entre les séances.",
    outcome: "Offrez une expérience unique qui prolonge votre accompagnement.",
    units: [
      "Imaginer l'expérience parfaite pour vos clients.",
      "Création de votre outil numérique simple et beau.",
      "Sécurisation de votre méthode propriétaire.",
      "Évolution de votre outil selon vos retours."
    ]
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
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--emerald-deep)]">Retour à l'accueil</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/auth/login" className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)] hover:text-[var(--emerald-deep)] transition-colors font-serif italic">Connexion Membre</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <Badge className="mb-12 border-[var(--gold-vivid)]/30">VOTRE SYSTÈME AU SERVICE DE L'HUMAIN.</Badge>
          <h1 className="text-6xl md:text-9xl font-light uppercase tracking-tighter mb-12 leading-[0.85]">
            LA CARTE DE <br />
            <span className="font-serif italic text-[var(--gold-vivid)] drop-shadow-sm">VOTRE LIBERTÉ.</span> <br />
            <span className="text-[0.3em] tracking-[0.5em] font-black opacity-20 block mt-4">V.2025</span>
          </h1>
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-light leading-relaxed max-w-3xl mx-auto text-balance">
            Voici le chemin exact pour ne plus choisir entre votre impact et votre épuisement. 
            <span className="block mt-6 font-medium text-[var(--emerald-deep)]">Ce n'est pas une formation technique, c'est un parcours pour libérer votre énergie des tâches qui ne nécessitent pas votre cœur.</span>
          </p>
        </div>
      </section>

      {/* Curriculum Grid */}
      <section className="px-6 py-32">
        <div className="max-w-6xl mx-auto space-y-48">
          {modules.map((mod, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "flex flex-col md:flex-row gap-20 md:gap-32 items-center",
                i % 2 !== 0 && "md:flex-row-reverse"
              )}
            >
              {/* Decorative Side */}
              <div className="w-full md:w-1/2 relative group">
                <div className="aspect-square rounded-[4rem] bg-[var(--emerald-deep)] overflow-hidden shadow-2xl relative interactive-card border-4 border-[var(--gold-vivid)]/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 z-10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <mod.icon className="w-40 h-40 text-white/5 group-hover:scale-110 transition-transform duration-[2s] ease-out" />
                  </div>
                  {/* Phase Marker */}
                  <div className="absolute top-12 left-12 z-20">
                    <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--gold-sand)] opacity-60">{mod.phase}</div>
                  </div>
                  {/* Sparkles */}
                  <div className="absolute top-12 right-12 z-20">
                    <Sparkles className="w-8 h-8 text-[var(--gold-vivid)] animate-pulse" />
                  </div>
                </div>
                
                {/* Floating Outcome Card */}
                <motion.div 
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="absolute -bottom-12 -right-6 md:-right-12 glass-card p-10 rounded-[2.5rem] border-2 border-[var(--gold-vivid)]/30 shadow-[0_30px_60px_rgba(212,175,55,0.15)] max-w-sm z-30 bg-white/90"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 bg-[var(--gold-vivid)] rounded-full animate-ping" />
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--emerald-deep)]">RÉSULTAT GARANTI</div>
                  </div>
                  <p className="text-base font-serif italic text-[var(--text-primary)] leading-relaxed">
                    "{mod.outcome}"
                  </p>
                </motion.div>
              </div>

              {/* Text Side */}
              <div className="w-full md:w-1/2 space-y-10 pt-8">
                <div className="space-y-6">
                  <h2 className="text-5xl md:text-7xl font-light uppercase tracking-tighter leading-none">{mod.title}</h2>
                  <div className="h-px w-20 bg-[var(--gold-vivid)]" />
                  <p className="text-[var(--text-secondary)] text-xl font-light leading-relaxed">{mod.desc}</p>
                </div>

                <div className="space-y-6">
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--emerald-deep)] opacity-40">LES ÉTAPES CLÉS</div>
                  <div className="grid grid-cols-1 gap-4">
                    {mod.units.map((unit, idx) => (
                      <div key={idx} className="flex items-start gap-5 p-6 rounded-3xl bg-white border border-[var(--border-subtle)] group hover:border-[var(--gold-vivid)]/40 hover:bg-[var(--gold-sand)]/5 transition-all duration-500 cursor-default">
                        <div className="w-6 h-6 rounded-full bg-[var(--emerald-deep)]/5 flex items-center justify-center mt-0.5 group-hover:bg-[var(--gold-vivid)]/10 transition-colors">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--emerald-deep)] group-hover:text-[var(--gold-vivid)] transition-colors" />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-tight text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{unit}</span>
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
      <section className="py-48 px-6">
        <div className="max-w-5xl mx-auto glass-card rounded-[5rem] p-20 md:p-32 text-center border-4 border-[var(--gold-vivid)]/20 relative overflow-hidden shadow-2xl group">
          <div className="absolute inset-0 bg-[var(--emerald-deep)]/5 -z-10 group-hover:bg-[var(--emerald-deep)]/10 transition-colors duration-1000" />
          <div className="relative z-10 space-y-16">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-[var(--emerald-deep)] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-700">
                <Heart className="w-10 h-10 text-[var(--gold-sand)]" />
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-5xl md:text-8xl font-light uppercase tracking-tighter leading-none">PRÊT À LIBÉRER <br /><span className="font-serif italic text-[var(--gold-vivid)]">VOTRE TEMPS ?</span></h2>
              <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-light max-w-2xl mx-auto text-balance">
                Votre système est prêt à être construit. Il ne manque que votre décision.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link href="/#offres">
                <SophisticatedButton className="py-8 px-16 text-xs tracking-[0.3em]">
                  VOIR LES OPTIONS D'ACCOMPAGNEMENT
                </SophisticatedButton>
              </Link>
            </div>
          </div>
          
          {/* Decorative Sparkles */}
          <div className="absolute top-20 right-20 opacity-10 group-hover:rotate-90 transition-transform duration-[10s]"><Sparkles className="w-40 h-40 text-[var(--gold-vivid)]" /></div>
          <div className="absolute bottom-20 left-20 opacity-10 group-hover:-rotate-90 transition-transform duration-[10s]"><Sparkles className="w-40 h-40 text-[var(--gold-vivid)]" /></div>
        </div>
      </section>
    </div>
  );
}
