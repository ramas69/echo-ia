'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles, 
  Lock,
  Target,
  Brain,
  Zap,
  Rocket,
  ArrowRight
} from 'lucide-react';
import { Badge, SophisticatedButton, TopBar, Navbar, Footer } from '@/components/SharedUI';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const offers = [
  {
    id: "fondations",
    badge: "🥉 AUTONOMIE",
    title: "Fondations",
    subtitle: "Je construis moi-même",
    desc: "Pour ceux qui veulent comprendre et mettre en place par eux-mêmes.",
    price: "997 €",
    includes: [
      "5 phases complètes en vidéo",
      "Templates & blueprints",
      "Communauté d'entraide",
      "Mises à jour incluses"
    ],
    notes: [
      "100% asynchrone",
      "Aucun support individuel",
      "À votre rythme"
    ],
    cta: "Commencer",
    link: "/le-programme",
    color: "emerald"
  },
  {
    id: "acceleration",
    badge: "🥈 ÉQUILIBRE",
    title: "Accélération",
    subtitle: "Guidé sans être seul",
    desc: "Pour ceux qui veulent avancer vite avec un cadre clair.",
    price: "1 490 €",
    popular: true,
    includes: [
      "Tout Fondations",
      "1 live / mois (Q&A)",
      "Replays disponibles",
      "Questions prioritaires"
    ],
    notes: [
      "Temps mutualisé",
      "Pas de support 1:1",
      "Cadre structuré"
    ],
    cta: "Rejoindre",
    link: "https://tally.so/r/acceleration-echo-ia",
    color: "gold"
  },
  {
    id: "vip",
    badge: "🥇 LIBÉRATION",
    title: "VIP Architecte",
    subtitle: "Fait avec moi, pour moi",
    desc: "Pour ceux qui veulent un système opérationnel sans y passer du temps.",
    price: "À partir de 3 490 €",
    vip: true,
    includes: [
      "Tout Accélération",
      "Installation complète",
      "Outil signature créé",
      "Audit technique 1:1"
    ],
    notes: [
      "Limité à 2/mois",
      "Sur candidature",
      "Périmètre cadré"
    ],
    cta: "Candidater",
    link: "/candidature-vip",
    color: "dark"
  }
];

export default function OffresPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#FDFCFB] selection:bg-[var(--gold-sand)] selection:text-[var(--emerald-deep)]">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="pt-48 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-8">Choisissez votre chemin</Badge>
            <h1 className="text-5xl md:text-7xl font-light uppercase tracking-tighter mb-6 leading-tight">
              Même système. <br />
              <span className="font-serif italic text-[var(--gold-vivid)]">Niveau d'implication différent.</span>
            </h1>
            <p className="text-xl text-black/60 max-w-3xl mx-auto">
              Ce qui change : <strong>votre temps</strong> et <strong>votre énergie</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grille des offres */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {offers.map((offer, i) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group"
              >
                <div className={cn(
                  "h-full p-8 rounded-3xl border-2 relative transition-all duration-300",
                  offer.color === "emerald" && "border-black/10 bg-white hover:border-[var(--emerald-deep)]/20 hover:shadow-xl",
                  offer.color === "gold" && "border-[var(--gold-vivid)]/30 bg-gradient-to-br from-amber-50 to-white hover:border-[var(--gold-vivid)]/50 hover:shadow-xl",
                  offer.color === "dark" && "border-[var(--gold-vivid)]/40 bg-[var(--emerald-deep)] text-white hover:border-[var(--gold-vivid)]/60 hover:shadow-2xl"
                )}>
                  
                  {/* Badge */}
                  {offer.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="px-4 py-1 rounded-full bg-[var(--gold-vivid)] text-white text-[8px] font-black uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Populaire
                      </div>
                    </div>
                  )}

                  {offer.vip && (
                    <div className="absolute top-6 right-6">
                      <Lock className="w-5 h-5 text-[var(--gold-vivid)]" />
                    </div>
                  )}

                  {/* Icône */}
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-6",
                    offer.color === "emerald" && "bg-[var(--emerald-deep)]/10",
                    offer.color === "gold" && "bg-[var(--gold-vivid)]/10",
                    offer.color === "dark" && "bg-white/10"
                  )}>
                    {offer.color === "emerald" && <Brain className="w-7 h-7 text-[var(--emerald-deep)]" />}
                    {offer.color === "gold" && <Zap className="w-7 h-7 text-[var(--gold-vivid)]" />}
                    {offer.color === "dark" && <Rocket className="w-7 h-7 text-[var(--gold-vivid)]" />}
                  </div>

                  {/* Contenu */}
                  <div className="mb-6">
                    <div className={cn(
                      "text-[8px] font-black uppercase tracking-[0.3em] mb-3",
                      offer.color === "dark" ? "text-[var(--gold-vivid)]/60" : "text-black/40"
                    )}>
                      {offer.badge}
                    </div>
                    <h3 className="text-3xl font-light tracking-tight mb-2">{offer.title}</h3>
                    <p className={cn(
                      "text-sm italic",
                      offer.color === "dark" ? "text-white/70" : "text-black/60"
                    )}>
                      {offer.subtitle}
                    </p>
                  </div>

                  <p className={cn(
                    "text-sm leading-relaxed mb-6",
                    offer.color === "dark" ? "text-white/80" : "text-black/60"
                  )}>
                    {offer.desc}
                  </p>

                  {/* Prix */}
                  <div className="mb-8">
                    <div className={cn(
                      "text-4xl font-bold tracking-tight",
                      offer.color === "emerald" && "text-[var(--emerald-deep)]",
                      offer.color === "gold" && "text-[var(--gold-vivid)]",
                      offer.color === "dark" && "text-[var(--gold-sand)]"
                    )}>
                      {offer.price}
                    </div>
                  </div>

                  {/* Inclus */}
                  <div className="mb-6">
                    <div className={cn(
                      "text-[10px] font-black uppercase tracking-widest mb-4",
                      offer.color === "dark" ? "text-white/60" : "text-black/40"
                    )}>
                      Inclus
                    </div>
                    <ul className="space-y-3">
                      {offer.includes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className={cn(
                            "w-4 h-4 shrink-0 mt-0.5",
                            offer.color === "emerald" && "text-[var(--emerald-deep)]",
                            offer.color === "gold" && "text-[var(--gold-vivid)]",
                            offer.color === "dark" && "text-[var(--gold-sand)]"
                          )} />
                          <span className={offer.color === "dark" ? "text-white/80" : "text-black/70"}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* À savoir */}
                  <div className="mb-8">
                    <div className={cn(
                      "text-[10px] font-black uppercase tracking-widest mb-3",
                      offer.color === "dark" ? "text-white/40" : "text-black/30"
                    )}>
                      À savoir
                    </div>
                    <ul className="space-y-2">
                      {offer.notes.map((note, idx) => (
                        <li key={idx} className={cn(
                          "text-xs flex items-start gap-2",
                          offer.color === "dark" ? "text-white/60" : "text-black/50"
                        )}>
                          <span>•</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  {offer.link.startsWith('http') ? (
                    <a href={offer.link} target="_blank" rel="noopener noreferrer" className="block">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "w-full py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-colors",
                          offer.color === "emerald" && "bg-[var(--emerald-deep)] text-white hover:bg-[var(--emerald-deep)]/90",
                          offer.color === "gold" && "bg-[var(--gold-vivid)] text-white hover:bg-[var(--gold-vivid)]/90",
                          offer.color === "dark" && "bg-[var(--gold-sand)] text-[var(--emerald-deep)] hover:bg-[var(--gold-vivid)]"
                        )}
                      >
                        {offer.cta}
                      </motion.button>
                    </a>
                  ) : (
                    <Link href={offer.link} className="block">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 rounded-full bg-[var(--emerald-deep)] text-white font-bold text-sm uppercase tracking-wider hover:bg-[var(--emerald-deep)]/90 transition-colors"
                      >
                        {offer.cta}
                      </motion.button>
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Aide au choix */}
      <section className="py-20 px-6 bg-white border-y border-black/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-8">
            Comment choisir ?
          </h2>
          <p className="text-xl text-black/60 mb-12">
            Quelle énergie voulez-vous investir ?
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: "Tout faire moi-même", offer: "Fondations", icon: Brain },
              { label: "Être guidé", offer: "Accélération", icon: Zap },
              { label: "Tout déléguer", offer: "VIP", icon: Rocket }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl border-2 border-black/10 bg-white hover:border-[var(--emerald-deep)]/20 hover:shadow-lg transition-all cursor-pointer"
              >
                <item.icon className="w-8 h-8 text-[var(--emerald-deep)] mx-auto mb-4" />
                <p className="text-sm text-black/60 mb-2">{item.label}</p>
                <p className="font-bold text-[var(--emerald-deep)]">→ {item.offer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Le Cadre */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">Le Cadre (Important)</Badge>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight">
              Une <span className="font-serif italic text-[var(--gold-vivid)]">protection</span>, pas une contrainte
            </h2>
          </div>

          <div className="p-10 rounded-3xl border-2 border-black/10 bg-white">
            <div className="space-y-8">
              <div>
                <p className="font-medium text-black/80 mb-4">Ce programme est structuré pour :</p>
                <ul className="space-y-3">
                  {["Préserver votre énergie", "Préserver la qualité", "Éviter toute dépendance"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-black/70">
                      <CheckCircle2 className="w-5 h-5 text-[var(--emerald-deep)] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-black/10">
                <p className="font-medium text-black/80 mb-4">Tout ce qui n'est pas explicitement inclus :</p>
                <ul className="space-y-3">
                  {["N'est pas pris en charge", "Ne fait pas l'objet de support individuel"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-black/70">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-center text-[var(--emerald-deep)] font-medium italic pt-6">
                Ce cadre est une protection, pas une contrainte.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="p-12 rounded-3xl border-2 border-black/10 bg-white">
            <div className="w-16 h-16 rounded-full bg-[var(--emerald-deep)] flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
              Le système est prêt.
            </h2>
            <p className="text-xl text-black/60 mb-8">
              Il ne manque que <span className="text-[var(--gold-vivid)] font-medium">votre décision.</span>
            </p>
            
            <Link href="/le-programme">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-[var(--emerald-deep)] text-white font-bold text-sm uppercase tracking-wider hover:bg-[var(--emerald-deep)]/90 transition-colors"
              >
                Voir le programme
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
