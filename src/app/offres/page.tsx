'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles, 
  Lock,
  Target,
  Brain,
  Zap,
  Rocket,
  ArrowRight,
  Clock,
  Users,
  Gauge,
  TrendingUp,
  Shield
} from 'lucide-react';
import { Badge, SophisticatedButton, TopBar, Navbar, Footer } from '@/components/SharedUI';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Questions du quiz
const quiz = {
  questions: [
    {
      id: 1,
      question: "Comment préférez-vous apprendre ?",
      icon: Brain,
      options: [
        { 
          id: "autonome", 
          label: "En totale autonomie",
          subtitle: "Je préfère découvrir par moi-même",
          score: { fondations: 3, acceleration: 1, vip: 0 }
        },
        { 
          id: "guide", 
          label: "Avec un cadre et des réponses",
          subtitle: "J'aime être guidé sans être seul",
          score: { fondations: 1, acceleration: 3, vip: 1 }
        },
        { 
          id: "delegue", 
          label: "Clé en main",
          subtitle: "Je veux que ce soit fait pour moi",
          score: { fondations: 0, acceleration: 1, vip: 3 }
        }
      ]
    },
    {
      id: 2,
      question: "Quel est votre niveau technique ?",
      icon: Gauge,
      options: [
        { 
          id: "debutant", 
          label: "Débutant",
          subtitle: "Les outils techniques me font peur",
          score: { fondations: 0, acceleration: 2, vip: 3 }
        },
        { 
          id: "intermediaire", 
          label: "Intermédiaire",
          subtitle: "Je me débrouille avec un peu d'aide",
          score: { fondations: 2, acceleration: 3, vip: 1 }
        },
        { 
          id: "expert", 
          label: "À l'aise",
          subtitle: "J'aime comprendre et implémenter",
          score: { fondations: 3, acceleration: 2, vip: 0 }
        }
      ]
    },
    {
      id: 3,
      question: "Combien de temps pouvez-vous y consacrer ?",
      icon: Clock,
      options: [
        { 
          id: "beaucoup", 
          label: "Plusieurs heures par semaine",
          subtitle: "Je veux vraiment m'y investir",
          score: { fondations: 3, acceleration: 2, vip: 0 }
        },
        { 
          id: "moyen", 
          label: "1-2 heures par semaine",
          subtitle: "Je veux avancer à mon rythme",
          score: { fondations: 2, acceleration: 3, vip: 1 }
        },
        { 
          id: "peu", 
          label: "Le strict minimum",
          subtitle: "Mon temps est très limité",
          score: { fondations: 0, acceleration: 1, vip: 3 }
        }
      ]
    },
    {
      id: 4,
      question: "Quelle est votre priorité absolue ?",
      icon: Target,
      options: [
        { 
          id: "apprendre", 
          label: "Comprendre chaque détail",
          subtitle: "Je veux maîtriser le système",
          score: { fondations: 3, acceleration: 2, vip: 0 }
        },
        { 
          id: "equilibre", 
          label: "Avancer sans me perdre",
          subtitle: "Un bon compromis autonomie/soutien",
          score: { fondations: 1, acceleration: 3, vip: 1 }
        },
        { 
          id: "resultats", 
          label: "Obtenir des résultats rapides",
          subtitle: "Je veux un système opérationnel maintenant",
          score: { fondations: 0, acceleration: 1, vip: 3 }
        }
      ]
    }
  ]
};

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
    color: "emerald",
    icon: Brain,
    perfectFor: "Vous êtes autonome, à l'aise avec les outils, et vous voulez comprendre chaque détail."
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
    color: "gold",
    icon: Zap,
    perfectFor: "Vous voulez être guidé sans être seul, avec un cadre rassurant et des réponses à vos questions."
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
    color: "dark",
    icon: Rocket,
    perfectFor: "Votre temps est précieux et vous voulez un système opérationnel sans y passer vos soirées."
  }
];

export default function OffresPage() {
  const [mounted, setMounted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [scores, setScores] = useState({ fondations: 0, acceleration: 0, vip: 0 });
  const [recommendedOffer, setRecommendedOffer] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAnswer = (optionId: string) => {
    const question = quiz.questions[currentQuestion];
    const option = question.options.find(o => o.id === optionId);
    
    if (option) {
      // Enregistrer la réponse
      setAnswers(prev => ({ ...prev, [question.id]: optionId }));
      
      // Mettre à jour les scores
      setScores(prev => ({
        fondations: prev.fondations + option.score.fondations,
        acceleration: prev.acceleration + option.score.acceleration,
        vip: prev.vip + option.score.vip
      }));
      
      // Passer à la question suivante ou afficher les résultats
      if (currentQuestion < quiz.questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestion(prev => prev + 1);
        }, 300);
      } else {
        // Calculer l'offre recommandée
        setTimeout(() => {
          const newScores = {
            fondations: scores.fondations + option.score.fondations,
            acceleration: scores.acceleration + option.score.acceleration,
            vip: scores.vip + option.score.vip
          };
          
          const maxScore = Math.max(newScores.fondations, newScores.acceleration, newScores.vip);
          let recommended = 'acceleration'; // Par défaut
          
          if (newScores.fondations === maxScore) recommended = 'fondations';
          else if (newScores.vip === maxScore) recommended = 'vip';
          
          setRecommendedOffer(recommended);
          setShowResults(true);
        }, 300);
      }
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setScores({ fondations: 0, acceleration: 0, vip: 0 });
    setRecommendedOffer(null);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#FDFCFB] selection:bg-[var(--gold-sand)] selection:text-[var(--emerald-deep)]">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="pt-48 pb-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
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
            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {!quizStarted && !showResults ? 
              "Répondez à 4 questions pour découvrir l'offre parfaitement adaptée à vos besoins." :
              showResults ? 
              "Voici votre recommandation personnalisée !" :
              `Question ${currentQuestion + 1} sur ${quiz.questions.length}`
            }
          </motion.p>
        </div>
      </section>

      {/* Quiz or Results */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          
          {!quizStarted && !showResults && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="max-w-3xl mx-auto">
                <div className="p-12 rounded-3xl glass-card border border-[var(--border-subtle)]">
                  <div className="w-24 h-24 rounded-full bg-[var(--emerald-deep)]/10 flex items-center justify-center mx-auto mb-8">
                    <Target className="w-12 h-12 text-[var(--emerald-deep)]" />
                  </div>
                  
                  <h2 className="text-3xl font-light mb-6">Commençons par mieux vous connaître</h2>
                  <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
                    4 questions simples pour identifier l'offre qui matchera <br />
                    parfaitement avec votre situation et vos objectifs.
                  </p>
                  
                  <button
                    onClick={() => setQuizStarted(true)}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--emerald-deep)] text-white font-bold uppercase tracking-wider hover:bg-[var(--emerald-deep)]/90 transition-all shadow-lg"
                  >
                    Démarrer le quiz
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {quizStarted && !showResults && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                {/* Progress */}
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-[var(--text-secondary)]">
                      Question {currentQuestion + 1}/{quiz.questions.length}
                    </span>
                    <span className="text-sm text-[var(--text-secondary)]">
                      {Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200">
                    <motion.div
                      className="h-full rounded-full bg-[var(--emerald-deep)]"
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` 
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="p-12 rounded-3xl glass-card border border-[var(--border-subtle)] mb-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-full bg-[var(--emerald-deep)]/10 flex items-center justify-center shrink-0">
                      {React.createElement(quiz.questions[currentQuestion].icon, {
                        className: "w-8 h-8 text-[var(--emerald-deep)]"
                      })}
                    </div>
                    <h3 className="text-3xl font-light">
                      {quiz.questions[currentQuestion].question}
                    </h3>
                  </div>
                </div>

                {/* Options */}
                <div className="grid gap-6">
                  {quiz.questions[currentQuestion].options.map((option, idx) => (
                    <motion.button
                      key={option.id}
                      onClick={() => handleAnswer(option.id)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-8 rounded-3xl glass-card border-2 border-[var(--border-subtle)] hover:border-[var(--gold-vivid)]/40 hover:shadow-xl transition-all text-left group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-xl font-medium text-[var(--text-primary)] mb-2 group-hover:text-[var(--emerald-deep)] transition-colors">
                            {option.label}
                          </div>
                          <div className="text-sm text-[var(--text-secondary)]">
                            {option.subtitle}
                          </div>
                        </div>
                        <ArrowRight className="w-6 h-6 text-[var(--text-secondary)] group-hover:text-[var(--gold-vivid)] transition-colors shrink-0 ml-4" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {showResults && recommendedOffer && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {/* Résultat personnalisé */}
              <div className="max-w-4xl mx-auto mb-12">
                <div className="p-12 rounded-3xl bg-gradient-to-br from-[var(--emerald-deep)] to-[var(--emerald-deep)]/90 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--gold-vivid)]/10 rounded-full blur-3xl" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-[var(--gold-vivid)]/20 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-[var(--gold-sand)]" />
                      </div>
                      <div>
                        <div className="text-sm font-black uppercase tracking-wider text-[var(--gold-sand)] mb-1">
                          Votre recommandation
                        </div>
                        <h2 className="text-4xl font-light">
                          {offers.find(o => o.id === recommendedOffer)?.title}
                        </h2>
                      </div>
                    </div>
                    
                    <p className="text-xl text-white/90 mb-8 leading-relaxed">
                      {offers.find(o => o.id === recommendedOffer)?.perfectFor}
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={() => {
                          const element = document.getElementById(`offer-${recommendedOffer}`);
                          element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[var(--emerald-deep)] font-bold uppercase tracking-wider hover:bg-white/90 transition-all"
                      >
                        Voir l'offre
                        <ArrowRight className="w-5 h-5" />
                      </button>
                      <button
                        onClick={resetQuiz}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white/30 text-white font-bold uppercase tracking-wider hover:bg-white/10 transition-all"
                      >
                        Refaire le quiz
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Toutes les offres avec recommandation */}
              <div className="grid md:grid-cols-3 gap-6">
                {offers.map((offer, i) => {
                  const isRecommended = offer.id === recommendedOffer;
                  const OfferIcon = offer.icon;
                  
                  return (
                    <motion.div
                      key={offer.id}
                      id={`offer-${offer.id}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={cn(
                        "relative p-8 rounded-3xl border-2 transition-all",
                        isRecommended 
                          ? "border-[var(--gold-vivid)] shadow-2xl bg-gradient-to-br from-white to-[var(--gold-vivid)]/5" 
                          : "border-[var(--border-subtle)] bg-white hover:border-[var(--gold-vivid)]/40"
                      )}
                    >
                      {isRecommended && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                          <div className="px-6 py-2 rounded-full bg-[var(--gold-vivid)] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Recommandé pour vous
                          </div>
                        </div>
                      )}

                      <div className="text-[8px] font-black tracking-[0.4em] text-[var(--text-secondary)]/40 mb-4 uppercase">
                        {offer.badge}
                      </div>
                      
                      <div className="w-12 h-12 rounded-2xl bg-[var(--emerald-deep)]/10 flex items-center justify-center mb-6">
                        <OfferIcon className="w-6 h-6 text-[var(--emerald-deep)]" />
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
                          isRecommended ? "text-[var(--gold-vivid)]" : "text-[var(--emerald-deep)]"
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
                                isRecommended ? "text-[var(--gold-vivid)]" : "text-[var(--emerald-deep)]"
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
                        isRecommended 
                          ? "bg-[var(--gold-vivid)]/10 border border-[var(--gold-vivid)]/20"
                          : "bg-[var(--emerald-deep)]/5 border border-[var(--emerald-deep)]/10"
                      )}>
                        <p className={cn(
                          "text-[10px] font-medium leading-relaxed",
                          isRecommended ? "text-[var(--gold-vivid)]" : "text-[var(--emerald-deep)]"
                        )}>
                          {offer.baseline}
                        </p>
                      </div>

                      {offer.link.startsWith('http') ? (
                        <a href={offer.link} target="_blank" rel="noopener noreferrer" className="block">
                          <button className={cn(
                            "w-full py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all",
                            isRecommended
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
                            isRecommended
                              ? "bg-[var(--gold-vivid)] text-white hover:bg-[var(--gold-vivid)]/90 shadow-lg"
                              : "bg-[var(--emerald-deep)] text-white hover:bg-[var(--emerald-deep)]/90"
                          )}>
                            {offer.cta}
                          </button>
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
}
