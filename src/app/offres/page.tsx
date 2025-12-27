'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowRight,
  Brain,
  Zap,
  Rocket,
  Sparkles
} from 'lucide-react';
import { Badge, TopBar, Navbar, Footer } from '@/components/SharedUI';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Les 3 Personas
const personas = [
  {
    id: "alex",
    name: "Alex",
    role: "L'Architecte",
    avatar: "🧑‍💻",
    quote: "Je veux maîtriser le système",
    personality: [
      "Aime comprendre chaque détail",
      "Préfère implémenter soi-même",
      "Besoin de contrôle total"
    ],
    values: ["Autonomie", "Maîtrise", "Contrôle"],
    offer: "fondations",
    color: "emerald",
    icon: Brain
  },
  {
    id: "sarah",
    name: "Sarah",
    role: "La Stratège",
    avatar: "👩‍💼",
    quote: "Je veux un équilibre autonomie/soutien",
    personality: [
      "Aime être guidée sans être seule",
      "Cherche un cadre rassurant",
      "Veut poser des questions"
    ],
    values: ["Équilibre", "Guidance", "Clarté"],
    offer: "acceleration",
    color: "gold",
    icon: Zap,
    popular: true
  },
  {
    id: "thomas",
    name: "Thomas",
    role: "Le Visionnaire",
    avatar: "🧔‍♂️",
    quote: "Je veux la libération totale",
    personality: [
      "Préfère déléguer l'exécution",
      "Cherche des résultats rapides",
      "Valorise son temps au maximum"
    ],
    values: ["Délégation", "Rapidité", "Excellence"],
    offer: "vip",
    color: "dark",
    icon: Rocket
  }
];

const offers = [
  {
    id: "fondations",
    badge: "🥉 OFFRE 01",
    title: "Fondations",
    subtitle: "Construire votre infrastructure en autonomie",
    price: "997 €",
    priceMonthly: "ou 3 × 349 €",
    includes: [
      "Accès aux 5 modules vidéo",
      "Templates et blueprints prêts à l'emploi",
      "Communauté d'entraide"
    ],
    notes: [
      "100 % asynchrone",
      "Aucun support individuel"
    ],
    baseline: "Le socle indispensable sur lequel reposent toutes les autres offres, y compris le VIP.",
    cta: "Commencer",
    link: "/le-programme",
    color: "emerald"
  },
  {
    id: "acceleration",
    badge: "🥈 OFFRE 02",
    title: "Accélération",
    subtitle: "Avancer sans se perdre",
    price: "1 490 €",
    priceMonthly: "ou 3 × 530 €",
    popular: true,
    includes: [
      "Tout FONDATIONS",
      "1 live collectif par mois (Q&A)",
      "Cadre clair, temps mutualisé"
    ],
    notes: [
      "Idéal pour les profils non techniques",
      "Sans surcharge mentale"
    ],
    baseline: "Le meilleur équilibre entre autonomie et accompagnement.",
    cta: "Rejoindre",
    link: "https://tally.so/r/acceleration-echo-ia",
    color: "gold"
  },
  {
    id: "vip",
    badge: "🥇 OFFRE 03",
    title: "VIP Architecte",
    subtitle: "Libération maximale – Clé en main",
    price: "À partir de 3 490 €",
    priceMonthly: "Prix défini après audit, aucune surprise",
    vip: true,
    includes: [
      "Tout ACCÉLÉRATION",
      "Installation complète de votre infrastructure cœur",
      "Création de votre outil signature",
      "Audit technique 1:1 (1h)"
    ],
    notes: [
      "Limité à 2 clients par mois",
      "Sur candidature uniquement"
    ],
    baseline: "Pensé pour celles et ceux qui veulent déléguer sans perdre le contrôle.",
    cta: "Postuler",
    link: "/candidature-vip",
    color: "dark"
  }
];

export default function OffresPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToOffer = (offerId: string) => {
    const element = document.getElementById(`offer-${offerId}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#FDFCFB] selection:bg-[var(--gold-sand)] selection:text-[var(--emerald-deep)]">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="pt-48 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-8">Trouvez votre chemin</Badge>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-light uppercase tracking-tighter mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Quelle offre vous correspond <br />
            <span className="font-serif italic text-[var(--gold-vivid)]">vraiment ?</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Identifiez-vous à l'un de ces trois profils pour découvrir <br />
            l'offre parfaitement adaptée à votre situation et vos objectifs.
          </motion.p>
        </div>
      </section>

      {/* LES 3 PERSONAS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light uppercase tracking-tighter mb-4">
              Avec qui vous <span className="font-serif italic text-[var(--emerald-deep)]">identifiez-vous</span> ?
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Trois profils, trois façons d'aborder votre transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {personas.map((persona, i) => {
              const PersonaIcon = persona.icon;
              const isSelected = selectedPersona === persona.id;
              
              return (
                <motion.div
                  key={persona.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => {
                    setSelectedPersona(persona.id);
                    setTimeout(() => scrollToOffer(persona.offer), 300);
                  }}
                  className={cn(
                    "relative p-8 rounded-3xl border-2 cursor-pointer transition-all",
                    isSelected 
                      ? "border-[var(--gold-vivid)] shadow-2xl bg-gradient-to-br from-white to-[var(--gold-vivid)]/5 scale-105" 
                      : "border-[var(--border-subtle)] bg-white hover:border-[var(--emerald-deep)]/30 hover:shadow-xl"
                  )}
                  whileHover={{ y: -5 }}
                >
                  {persona.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-[var(--gold-vivid)] text-white border-[var(--gold-vivid)]">
                        Le plus choisi
                      </Badge>
                    </div>
                  )}

                  {/* Avatar */}
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 mx-auto rounded-full bg-[var(--emerald-deep)]/10 flex items-center justify-center text-5xl mb-4">
                      {persona.avatar}
                    </div>
                    <h3 className="text-2xl font-light uppercase tracking-tight mb-1">
                      {persona.name}
                    </h3>
                    <div className="text-sm font-serif italic text-[var(--gold-vivid)]">
                      {persona.role}
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="mb-6 p-4 rounded-xl bg-[var(--emerald-deep)]/5 border border-[var(--emerald-deep)]/10">
                    <p className="text-sm font-medium text-[var(--emerald-deep)] text-center italic">
                      "{persona.quote}"
                    </p>
                  </div>

                  {/* Personality */}
                  <div className="mb-6">
                    <div className="text-[10px] font-black uppercase tracking-widest mb-3 text-[var(--text-secondary)]/40">
                      Profil
                    </div>
                    <ul className="space-y-2">
                      {persona.personality.map((trait, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                          <CheckCircle2 className="w-4 h-4 text-[var(--emerald-deep)] shrink-0 mt-0.5" />
                          <span>{trait}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Values */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {persona.values.map((value, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 rounded-full bg-[var(--emerald-deep)]/10 text-[10px] font-bold uppercase tracking-wider text-[var(--emerald-deep)]"
                      >
                        {value}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    className={cn(
                      "w-full py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2",
                      isSelected
                        ? "bg-[var(--gold-vivid)] text-white shadow-lg"
                        : "bg-[var(--emerald-deep)] text-white hover:bg-[var(--emerald-deep)]/90"
                    )}
                  >
                    {isSelected ? "Sélectionné" : "C'est moi"}
                    {isSelected && <CheckCircle2 className="w-5 h-5" />}
                    {!isSelected && <ArrowRight className="w-5 h-5" />}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Les 3 offres détaillées */}
      <section className="py-20 px-6 bg-gradient-to-br from-[var(--emerald-deep)]/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light uppercase tracking-tighter mb-4">
              Les <span className="font-serif italic text-[var(--emerald-deep)]">offres</span> en détail
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Toutes donnent accès au même système. Seul le niveau d'accompagnement change.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {offers.map((offer, i) => (
              <motion.div
                key={offer.id}
                id={`offer-${offer.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "relative p-8 rounded-3xl border-2 transition-all",
                  offer.popular
                    ? "border-[var(--gold-vivid)] shadow-xl bg-gradient-to-br from-white to-[var(--gold-vivid)]/5"
                    : "border-[var(--border-subtle)] bg-white"
                )}
              >
                {offer.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="px-6 py-2 rounded-full bg-[var(--gold-vivid)] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Le plus choisi
                    </div>
                  </div>
                )}

                <div className="text-[8px] font-black tracking-[0.4em] text-[var(--text-secondary)]/40 mb-4 uppercase">
                  {offer.badge}
                </div>

                <h3 className="text-2xl font-light uppercase tracking-tight mb-2">
                  {offer.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] italic mb-6">
                  {offer.subtitle}
                </p>

                <div className="mb-6">
                  <div className={cn(
                    "text-3xl font-bold tracking-tight",
                    offer.popular ? "text-[var(--gold-vivid)]" : "text-[var(--emerald-deep)]"
                  )}>
                    {offer.price}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)] mt-2">
                    {offer.priceMonthly}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-[10px] font-black uppercase tracking-widest mb-4 text-[var(--text-secondary)]/40">
                    Inclus
                  </div>
                  <ul className="space-y-3">
                    {offer.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className={cn(
                          "w-4 h-4 shrink-0 mt-0.5",
                          offer.popular ? "text-[var(--gold-vivid)]" : "text-[var(--emerald-deep)]"
                        )} />
                        <span className="text-[var(--text-secondary)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <div className="text-[10px] font-black uppercase tracking-widest mb-3 text-[var(--text-secondary)]/40">
                    À savoir
                  </div>
                  <ul className="space-y-2">
                    {offer.notes.map((note, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                        <span>👉</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={cn(
                  "p-4 rounded-xl mb-8",
                  offer.popular
                    ? "bg-[var(--gold-vivid)]/10 border border-[var(--gold-vivid)]/20"
                    : "bg-[var(--emerald-deep)]/5 border border-[var(--emerald-deep)]/10"
                )}>
                  <p className={cn(
                    "text-[10px] font-medium leading-relaxed",
                    offer.popular ? "text-[var(--gold-vivid)]" : "text-[var(--emerald-deep)]"
                  )}>
                    {offer.baseline}
                  </p>
                </div>

                {offer.link.startsWith('http') ? (
                  <a href={offer.link} target="_blank" rel="noopener noreferrer" className="block">
                    <button className={cn(
                      "w-full py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all",
                      offer.popular
                        ? "bg-[var(--gold-vivid)] text-white hover:bg-[var(--gold-vivid)]/90 shadow-lg"
                        : "bg-[var(--emerald-deep)] text-white hover:bg-[var(--emerald-deep)]/90"
                    )}>
                      {offer.cta}
                    </button>
                  </a>
                ) : (
                  <Link href={offer.link} className="block">
                    <button className={cn(
                      "w-full py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all",
                      offer.popular
                        ? "bg-[var(--gold-vivid)] text-white hover:bg-[var(--gold-vivid)]/90 shadow-lg"
                        : "bg-[var(--emerald-deep)] text-white hover:bg-[var(--emerald-deep)]/90"
                    )}>
                      {offer.cta}
                    </button>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
