'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Download, 
  ChevronRight, 
  CheckCircle2, 
  FileText, 
  Link as LinkIcon, 
  Copy, 
  Check, 
  ArrowLeft,
  Sparkles,
  ExternalLink,
  ArrowRight,
  Zap,
  FileDown,
  X
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- Types ---
interface Resource {
  id: string;
  type: string;
  title: string;
  url?: string;
  textContent?: string;
}

interface Unit {
  id: string;
  title: string;
  content?: string;
  videoProvider: string;
  videoId: string;
  isCompleted: boolean;
  resources: Resource[];
  slug: string;
}

interface Phase {
  id: string;
  title: string;
  slug: string;
  outcome: string;
  units: { id: string, title: string, slug: string, isCompleted: boolean }[];
}

interface NavigationItem {
  title: string;
  slug: string;
  url: string;
}

interface NavigationContext {
  previous: NavigationItem | null;
  next: NavigationItem | null;
}

// --- Components ---

const VideoPlayer = ({ provider, id }: { provider: string, id: string }) => {
  let embedUrl = "";
  let isValidId = true;

  if (!id || id.trim() === '') {
    isValidId = false;
  } else if (provider === "YOUTUBE") {
    // ID YouTube valide = 11 caractères
    if (id.length !== 11) {
      console.warn('⚠️ ID YouTube invalide:', id, '(doit faire 11 caractères)');
      isValidId = false;
    }
    embedUrl = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`;
  } else if (provider === "VIMEO") {
    embedUrl = `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0`;
  } else if (provider === "LOOM") {
    embedUrl = `https://www.loom.com/embed/${id}?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true`;
  }

  if (!embedUrl || !isValidId) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-[var(--emerald-deep)] to-black">
        <div className="w-24 h-24 rounded-full bg-[var(--gold-vivid)] flex items-center justify-center shadow-[0_0_50px_rgba(234,179,8,0.4)]">
          <Play className="w-10 h-10 text-black fill-black translate-x-1" />
        </div>
        <div className="text-center px-8">
          <p className="text-white font-black uppercase tracking-[0.2em] text-sm mb-2">
            Configuration Vidéo Requise
          </p>
          <p className="text-white/60 text-xs max-w-md">
            {!isValidId 
              ? "L'identifiant vidéo est invalide ou manquant. Contactez l'administrateur."
              : "Aucune source vidéo configurée pour cette activation."
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <iframe
      src={embedUrl}
      frameBorder="0"
      allowFullScreen
      className="absolute inset-0 w-full h-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      title="Vidéo de formation"
    />
  );
};

const PromptBlock = ({ content }: { content: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative bg-[#1A1F1E] rounded-2xl p-6 border border-white/5 overflow-hidden">
      <div className="absolute top-0 right-0 p-4">
        <button 
          onClick={copyToClipboard}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-[var(--gold-vivid)] transition-all"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <pre className="text-xs text-white/70 font-mono leading-relaxed whitespace-pre-wrap pr-10 italic">
        {content}
      </pre>
      <div className="mt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--gold-vivid)]/40">
        <Sparkles className="w-3 h-3" /> PROMPT EXPERT L'ÉCHO IA
      </div>
    </div>
  );
};

const NavigationFooter = ({ navigation }: { navigation: NavigationContext }) => {
  // Afficher la navigation si au moins un lien existe
  if (!navigation || (!navigation.previous && !navigation.next)) {
    return null;
  }

  return (
    <nav className="flex items-center justify-between py-8 border-t border-[var(--border-subtle)]">
      {/* Previous Link */}
      <div className="flex-1">
        {navigation.previous ? (
          <Link 
            href={navigation.previous.url}
            className="group inline-flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--text-secondary)]/60 hover:text-[var(--emerald-deep)] hover:bg-[var(--emerald-deep)]/5 transition-all"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <div className="text-[8px] uppercase font-black tracking-[0.3em] opacity-40 mb-1">
                Précédent
              </div>
              <div className="text-sm font-medium">
                {navigation.previous.title}
              </div>
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Next Link */}
      <div className="flex-1 flex justify-end">
        {navigation.next ? (
          <Link 
            href={navigation.next.url}
            className="group inline-flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--text-secondary)]/60 hover:text-[var(--emerald-deep)] hover:bg-[var(--emerald-deep)]/5 transition-all"
          >
            <div className="text-right">
              <div className="text-[8px] uppercase font-black tracking-[0.3em] opacity-40 mb-1">
                Suivant
              </div>
              <div className="text-sm font-medium">
                {navigation.next.title}
              </div>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
};

const EquipmentButton = ({ resource }: { resource: Resource }) => {
  const getIcon = (type: string) => {
  const icons: any = {
      NOTION_TEMPLATE: { icon: <LinkIcon className="w-5 h-5" />, label: 'NOTION', emoji: '📄' },
      PDF_GUIDE: { icon: <FileDown className="w-5 h-5" />, label: 'PDF', emoji: '📋' },
      PROMPT_TEXT: { icon: <Sparkles className="w-5 h-5" />, label: 'PROMPT', emoji: '🤖' },
      EXTERNAL_LINK: { icon: <ExternalLink className="w-5 h-5" />, label: 'LIEN', emoji: '🔗' },
      FILE_DOWNLOAD: { icon: <Download className="w-5 h-5" />, label: 'FICHIER', emoji: '📦' },
      MAKE_BLUEPRINT: { icon: <Zap className="w-5 h-5" />, label: 'MAKE', emoji: '⚡' }
    };
    return icons[type] || { icon: <FileText className="w-5 h-5" />, label: 'RESSOURCE', emoji: '📄' };
  };

  const resourceInfo = getIcon(resource.type);

  if (resource.type === 'PROMPT_TEXT' && resource.textContent) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--emerald-deep)]">
          <span className="text-xl">{resourceInfo.emoji}</span> {resource.title}
        </div>
        <PromptBlock content={resource.textContent} />
      </div>
    );
  }

  return (
    <a 
      href={resource.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group relative flex items-center justify-between p-6 rounded-2xl bg-gradient-to-br from-[#F8F7F4] to-white border-2 border-[var(--border-subtle)] hover:border-[var(--emerald-deep)] hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--emerald-deep)]/5 to-[var(--gold-vivid)]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative flex items-center gap-4 flex-1">
        <div className="w-12 h-12 rounded-xl bg-[var(--emerald-deep)] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
          {resourceInfo.icon}
        </div>
        <div className="flex-1">
          <div className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--emerald-deep)]/50 mb-1">
            {resourceInfo.emoji} {resourceInfo.label}
          </div>
          <div className="text-sm font-bold text-[var(--emerald-deep)]">{resource.title}</div>
        </div>
      </div>
      
      <ChevronRight className="relative w-5 h-5 text-[var(--emerald-deep)]/30 group-hover:text-[var(--gold-vivid)] group-hover:translate-x-1 transition-all" />
    </a>
  );
};

export default function UnitViewerClient({ 
  currentUnit, 
  currentPhase,
  allPhases,
  navigation
}: { 
  currentUnit: Unit, 
  currentPhase: Phase,
  allPhases: Phase[],
  navigation: NavigationContext
}) {
  const [isCompleting, setIsCompleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessWave, setShowSuccessWave] = useState(false);
  const router = useRouter();

  // Déterminer si c'est la dernière activation du pilier
  const isLastActivation = !navigation.next;

  const handleComplete = async () => {
    setIsCompleting(true);
    setErrorMessage(null);
    
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unitId: currentUnit.id }),
      });

      if (response.ok) {
        // Déclencher l'animation de succès
        setShowSuccessWave(true);
        
        // Attendre que l'animation soit visible (500ms)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Redirection intelligente basée sur le contexte de navigation
        if (navigation.next) {
          // Il y a une activation suivante dans ce pilier
          router.push(navigation.next.url);
        } else {
          // C'était la dernière activation du pilier, retour à l'académie
          router.push('/academie');
        }
      } else {
        setErrorMessage("Impossible de valider l'activation. Veuillez réessayer.");
        setIsCompleting(false);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Une erreur s'est produite. Vérifiez votre connexion.");
      setIsCompleting(false);
    }
  };

  const phaseIndex = allPhases.findIndex(p => p.id === currentPhase.id) + 1;
  const unitIndex = currentPhase.units.findIndex(u => u.id === currentUnit.id) + 1;

  return (
    <div className="min-h-screen bg-[#FDFCFB] mesh-gradient pb-48">
      {/* Header Minimaliste - Fil d'Ariane */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <Link 
            href="/academie" 
            className="flex items-center gap-3 group"
          >
                <ArrowLeft className="w-4 h-4 text-[var(--emerald-deep)] group-hover:-translate-x-1 transition-transform" />
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em]">
              <span className="text-[var(--emerald-deep)]/40">Retour au Protocole</span>
            </div>
              </Link>
          
          <div className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--emerald-deep)]/30">
            {currentPhase.title}
          </div>
        </div>
      </header>

      {/* Lecteur Vidéo Cinématique - Plus Large */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full px-4 md:px-8 py-12"
      >
        <div className="max-w-[1600px] mx-auto">
          <div className="relative aspect-video rounded-3xl bg-black shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden ring-1 ring-black/5">
            <VideoPlayer provider={currentUnit.videoProvider} id={currentUnit.videoId} />
          </div>
        </div>
      </motion.section>

      {/* Main Content - Reste du contenu */}
      <main className="max-w-5xl mx-auto px-8 space-y-16">
        
        {/* Titre & Description */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            {/* Badge stylisé */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--emerald-deep)]/10 border border-[var(--emerald-deep)]/20">
              <div className="w-2 h-2 rounded-full bg-[var(--emerald-deep)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--emerald-deep)]">
                Activation {phaseIndex}.{unitIndex}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-tight leading-[0.95] text-[var(--emerald-deep)] max-w-4xl">
              {currentUnit.title}
            </h1>
                  </div>
          
          {currentUnit.content && (
            <div 
              className="text-base md:text-lg text-[var(--text-secondary)] font-light leading-relaxed max-w-3xl prose prose-emerald"
              dangerouslySetInnerHTML={{ __html: currentUnit.content }}
            />
          )}
        </motion.section>

        {/* L'ARSENAL - Zone d'Action Premium */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent" />
            <h2 className="text-xl font-black uppercase tracking-[0.3em] text-[var(--emerald-deep)] flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[var(--gold-vivid)]" />
              L'Arsenal
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent" />
                        </div>

          {currentUnit.resources.length > 0 ? (
            <div className="grid gap-4">
              {currentUnit.resources.map((resource) => (
                <EquipmentButton key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-6 rounded-2xl bg-gradient-to-br from-[var(--emerald-deep)]/5 to-transparent border border-[var(--border-subtle)]">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-[var(--emerald-deep)]/40" />
              <p className="text-base italic font-light text-[var(--text-secondary)] max-w-md mx-auto">
                Cette activation ne nécessite aucun outil supplémentaire.<br/>
                Concentrez-vous sur l'exécution.
              </p>
              </div>
          )}
        </motion.section>

        {/* Objectif de Phase (contexte discret) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-8 rounded-3xl bg-gradient-to-br from-[var(--emerald-deep)]/5 to-transparent border border-[var(--emerald-deep)]/10"
        >
          <div className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--emerald-deep)]/50 mb-3">
            Objectif du Pilier
          </div>
          <p className="text-base italic font-light text-[var(--emerald-deep)]">
            "{currentPhase.outcome}"
          </p>
        </motion.section>

        {/* Navigation Footer - Discret */}
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <NavigationFooter navigation={navigation} />
        </motion.section>

      </main>

      {/* Animation de Succès Centrée */}
      {showSuccessWave && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ 
            duration: 1.5,
            times: [0, 0.2, 0.8, 1]
          }}
          className="fixed inset-0 z-50 pointer-events-none overflow-hidden flex items-center justify-center"
        >
          {/* Fond overlay qui apparaît en douceur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-gradient-radial from-[var(--emerald-deep)]/20 via-[var(--emerald-deep)]/5 to-transparent"
          />
          
          {/* Particules dorées qui explosent depuis le centre */}
          {[...Array(16)].map((_, i) => {
            const angle = (i * 360) / 16;
            const distance = 150 + Math.random() * 100;
            return (
              <motion.div
                key={i}
                initial={{ 
                  x: 0,
                  y: 0,
                  opacity: 0,
                  scale: 0
                }}
                animate={{ 
                  x: Math.cos(angle * Math.PI / 180) * distance,
                  y: Math.sin(angle * Math.PI / 180) * distance,
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.5, 1, 0]
                }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.03,
                  ease: 'easeOut'
                }}
                className="absolute w-2 h-2 rounded-full bg-[var(--gold-vivid)]"
                style={{
                  boxShadow: '0 0 15px rgba(234, 179, 8, 0.8)',
                }}
              />
            );
          })}
          
          {/* Message de succès avec cercle pulsant - CENTRÉ */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: [0.5, 1.1, 1],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 1.5,
              times: [0, 0.3, 0.7, 1],
              ease: [0.34, 1.56, 0.64, 1]
            }}
            className="relative z-10"
          >
            <div className="flex flex-col items-center gap-6">
              {/* Cercle pulsant avec icône */}
              <div className="relative">
                {/* Cercle externe qui pulse (grand) */}
                <motion.div
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ 
                    scale: [1, 2.5, 3],
                    opacity: [0, 0.6, 0]
                  }}
                  transition={{
                    duration: 1,
                    ease: 'easeOut'
                  }}
                  className="absolute inset-0 -m-8 rounded-full bg-[var(--emerald-deep)]"
                />
                
                {/* Cercle moyen qui pulse */}
                <motion.div
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ 
                    scale: [1, 2, 2.5],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: 0.9,
                    ease: 'easeOut',
                    delay: 0.1
                  }}
                  className="absolute inset-0 -m-6 rounded-full bg-[var(--gold-vivid)]"
                />
                
                {/* Cercle interne (fond de l'icône) */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    delay: 0.2,
                    type: 'spring',
                    stiffness: 200,
                    damping: 15
                  }}
                  className="relative w-32 h-32 rounded-full bg-[var(--emerald-deep)] flex items-center justify-center shadow-2xl ring-4 ring-white/50"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: 0.3,
                      type: 'spring',
                      stiffness: 200,
                      damping: 15
                    }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={3} />
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Texte sous le cercle avec fond semi-transparent */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center bg-white/90 backdrop-blur-xl rounded-2xl px-8 py-4 shadow-2xl"
              >
                <h3 className="text-2xl font-black uppercase tracking-tight text-[var(--emerald-deep)] mb-1">
                  Activation Validée !
                </h3>
                <p className="text-sm text-[var(--text-secondary)] font-light">
                  {isLastActivation 
                    ? "🏆 Pilier complété avec succès"
                    : "Passage à l'activation suivante..."
                  }
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Footer Sticky - Bouton de Complétion */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-white via-white to-transparent pt-6 pb-4 border-t border-[var(--border-subtle)]">
        <div className="max-w-5xl mx-auto px-8 space-y-3">
          
          {/* Toast d'erreur élégant */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <X className="w-3 h-3 text-red-600" />
              </div>
              <p className="text-xs text-red-800 flex-1">{errorMessage}</p>
              <button 
                onClick={() => setErrorMessage(null)}
                className="text-red-400 hover:text-red-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}

          <motion.button
                  onClick={handleComplete}
                  disabled={isCompleting || currentUnit.isCompleted}
            whileHover={{ scale: currentUnit.isCompleted ? 1 : 1.01 }}
            whileTap={{ scale: currentUnit.isCompleted ? 1 : 0.99 }}
            className={`
              w-full py-4 px-6 rounded-xl font-black uppercase tracking-[0.2em] text-xs
              flex items-center justify-center gap-3 transition-all duration-300
              shadow-xl
              ${currentUnit.isCompleted 
                ? 'bg-[var(--gold-vivid)] text-black cursor-default' 
                : isLastActivation
                  ? 'bg-gradient-to-r from-[var(--gold-vivid)] to-[var(--emerald-deep)] text-white hover:shadow-[0_15px_40px_rgba(234,179,8,0.3)]'
                  : 'bg-[var(--emerald-deep)] text-white hover:bg-[var(--emerald-deep)]/90 hover:shadow-[0_15px_40px_rgba(6,78,59,0.3)]'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isCompleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Validation en cours...
              </>
            ) : currentUnit.isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Activation Validée
              </>
            ) : isLastActivation ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Terminer ce Pilier & Retour au Protocole
                <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                <CheckCircle2 className="w-4 h-4" />
                Marquer comme Terminé & Continuer
                <ArrowRight className="w-4 h-4" />
                    </>
                  )}
          </motion.button>
          
          {!currentUnit.isCompleted && (
            <div className="text-center">
              {navigation.next ? (
                <div className="space-y-0.5">
                  <p className="text-[10px] text-[var(--text-secondary)]/50 font-light uppercase tracking-wider">
                    Prochaine activation
                  </p>
                  <p className="text-xs font-medium text-[var(--emerald-deep)]">
                    {navigation.next.title}
                </p>
              </div>
              ) : (
                <p className="text-[10px] text-[var(--text-secondary)]/50 font-light italic">
                  Vous retournerez à l'Académie après validation
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
