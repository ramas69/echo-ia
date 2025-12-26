'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Menu,
  X,
  Sparkles,
  ExternalLink,
  Lock,
  Target,
  ShieldCheck,
  Video,
  Zap
} from 'lucide-react';
import { Badge, SophisticatedButton } from '@/components/SharedUI';
import Link from 'next/link';
import { cn } from '@/lib/utils';
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

// --- Components ---

const VideoPlayer = ({ provider, id }: { provider: string, id: string }) => {
  let embedUrl = "";
  if (provider === "YOUTUBE") {
    embedUrl = `https://www.youtube.com/embed/${id}`;
  } else if (provider === "VIMEO") {
    embedUrl = `https://player.vimeo.com/video/${id}`;
  } else if (provider === "LOOM") {
    embedUrl = `https://www.loom.com/embed/${id}`;
  }

  if (!embedUrl) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black">
        <div className="w-24 h-24 rounded-full bg-[var(--emerald-deep)] flex items-center justify-center shadow-[0_0_50px_rgba(6,78,59,0.4)]">
          <Play className="w-10 h-10 text-white fill-white translate-x-1" />
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
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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

const ResourceCard = ({ resource }: { resource: Resource }) => {
  const icons: any = {
    NOTION_TEMPLATE: <LinkIcon className="w-4 h-4" />,
    PDF_GUIDE: <Download className="w-4 h-4" />,
    PROMPT_TEXT: <Sparkles className="w-4 h-4" />,
    EXTERNAL_LINK: <ExternalLink className="w-4 h-4" />,
    FILE_DOWNLOAD: <Download className="w-4 h-4" />,
    MAKE_BLUEPRINT: <Zap className="w-4 h-4" />
  };

  if (resource.type === 'PROMPT_TEXT' && resource.textContent) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">
          <Sparkles className="w-3 h-3 text-[var(--gold-vivid)]" /> {resource.title}
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
      className="flex items-center justify-between p-5 rounded-2xl bg-white border border-[var(--border-subtle)] hover:border-[var(--gold-vivid)]/30 hover:shadow-lg transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-[var(--emerald-deep)]/5 flex items-center justify-center group-hover:bg-[var(--gold-vivid)]/10 text-[var(--emerald-deep)] group-hover:text-[var(--gold-vivid)] transition-colors">
          {icons[resource.type] || <FileText className="w-4 h-4" />}
        </div>
        <div>
          <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]/40 mb-1">{resource.type.replace('_', ' ')}</div>
          <div className="text-xs font-bold">{resource.title}</div>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]/20 group-hover:text-[var(--gold-vivid)] transition-all" />
    </a>
  );
};

export default function UnitViewerClient({ 
  currentUnit, 
  currentPhase,
  allPhases 
}: { 
  currentUnit: Unit, 
  currentPhase: Phase,
  allPhases: Phase[]
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);
  const router = useRouter();

  const handleComplete = async () => {
    setIsCompleting(true);
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unitId: currentUnit.id }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert("Erreur lors de la validation.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside 
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            className="fixed inset-y-0 left-0 w-80 bg-white border-r border-[var(--border-subtle)] z-50 flex flex-col"
          >
            <div className="p-8 border-b border-[var(--border-subtle)] flex justify-between items-center bg-[var(--bg-secondary)]/30">
              <Link href="/academie" className="flex items-center gap-2 group">
                <ArrowLeft className="w-4 h-4 text-[var(--emerald-deep)] group-hover:-translate-x-1 transition-transform" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--emerald-deep)]">Protocole</span>
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="md:hidden p-2 rounded-lg hover:bg-white transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-8">
              {allPhases.map((phase) => (
                <div key={phase.id} className="space-y-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--emerald-deep)] flex items-center gap-2">
                    <div className="w-1 h-1 bg-[var(--emerald-deep)] rounded-full" />
                    {phase.title}
                  </div>
                  <div className="space-y-2">
                    {phase.units.map((u) => (
                      <Link 
                        key={u.id}
                        href={`/academie/cours/${phase.slug}/${u.slug}`}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-xl text-xs transition-all group",
                          u.id === currentUnit.id 
                            ? "bg-[var(--emerald-deep)] text-white shadow-lg" 
                            : "hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Play className={cn("w-3 h-3", u.id === currentUnit.id ? "fill-white" : "opacity-30")} />
                          <span className="font-medium truncate max-w-[160px]">{u.title}</span>
                        </div>
                        {u.isCompleted && <CheckCircle2 className="w-3 h-3 text-[var(--gold-vivid)]" />}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={cn(
        "flex-grow transition-all duration-500 min-h-screen",
        sidebarOpen ? "pl-80" : "pl-0"
      )}>
        {/* Top bar control */}
        <div className="sticky top-0 w-full z-40 px-8 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-[var(--border-subtle)]">
          {!sidebarOpen && (
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-full border border-[var(--border-subtle)] hover:border-[var(--emerald-deep)] transition-all flex items-center gap-2 pr-4 group"
            >
              <div className="w-8 h-8 rounded-full bg-[var(--emerald-deep)]/5 flex items-center justify-center group-hover:bg-[var(--emerald-deep)] transition-all">
                <Menu className="w-4 h-4 text-[var(--emerald-deep)] group-hover:text-white" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Afficher le Protocole</span>
            </button>
          )}
          <div className="ml-auto flex items-center gap-6">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
              {currentPhase.title} // {currentUnit.title}
            </div>
          </div>
        </div>

        {/* Video & Content */}
        <div className="p-8 md:p-16 max-w-5xl mx-auto space-y-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative aspect-video rounded-[2.5rem] bg-black shadow-2xl overflow-hidden border-4 border-[var(--emerald-deep)]/10"
          >
            <VideoPlayer provider={currentUnit.videoProvider} id={currentUnit.videoId} />
          </motion.div>

          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                <Badge className="border-[var(--gold-vivid)]/30">UNITÉ OPÉRATIONNELLE</Badge>
                <h1 className="text-4xl md:text-6xl font-light uppercase tracking-tighter leading-tight">
                  <span className="text-[var(--emerald-deep)]/20 font-black italic mr-4 tabular-nums">
                    {allPhases.findIndex(p => p.id === currentPhase.id) + 1}.{currentPhase.units.findIndex(u => u.id === currentUnit.id) + 1}
                  </span>
                  {currentUnit.title}
                </h1>
                <div 
                  className="text-[var(--text-secondary)] text-lg max-w-2xl font-light leading-relaxed prose prose-emerald prose-sm md:prose-base"
                  dangerouslySetInnerHTML={{ __html: currentUnit.content || "" }}
                />
              </div>
              <div className="shrink-0 pb-2">
                <SophisticatedButton 
                  onClick={handleComplete}
                  disabled={isCompleting || currentUnit.isCompleted}
                  className="py-5 px-12 group"
                >
                  {currentUnit.isCompleted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2 text-[var(--gold-vivid)]" /> 
                      Unité validée
                    </>
                  ) : (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white/30 rounded-full group-hover:border-[var(--gold-vivid)] transition-colors" />
                      Valider l'unité
                    </>
                  )}
                </SophisticatedButton>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--gold-vivid)]/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <Target className="w-20 h-20 text-[var(--emerald-deep)]" />
              </div>
              <div className="relative z-10">
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--emerald-deep)] mb-4">OBJECTIF DE LA PHASE</div>
                <p className="text-sm italic font-medium text-[var(--text-primary)]">
                  "{currentPhase.outcome}"
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-3">
                <Download className="w-5 h-5 text-[var(--emerald-deep)]" /> Ressources & Assets
              </h3>
              <div className="grid gap-4">
                {currentUnit.resources.map((res) => (
                  <ResourceCard key={res.id} resource={res} />
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[var(--gold-vivid)]" /> Support IA
              </h3>
              <div className="p-8 rounded-3xl border border-[var(--border-subtle)] bg-white/50 space-y-4">
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Un doute sur l'implémentation de cette unité ? Posez votre question sur le Discord ou consultez la base de connaissances.
                </p>
                <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-[var(--emerald-deep)] hover:text-[var(--gold-vivid)] transition-colors flex items-center gap-2">
                  Consulter la doc <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
