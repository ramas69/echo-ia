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
  Target
} from 'lucide-react';
import { Badge, SophisticatedButton } from '@/components/SharedUI';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// --- Types ---
interface Resource {
  id: string;
  type: 'notion' | 'pdf' | 'prompt' | 'link' | string;
  label: string;
  url?: string;
  content?: string;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  content?: string;
  resources: Resource[];
  completed: boolean;
}

interface Module {
  id: string;
  title: string;
  slug?: string;
  description?: string;
  outcome?: string;
  lessons: Lesson[];
  finalActionTitle?: string;
  finalActionDesc?: string;
}

// --- Helper ---
const getEmbedUrl = (url?: string) => {
  if (!url) return null;

  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const id = url.includes('v=') 
      ? url.split('v=')[1]?.split('&')[0] 
      : url.split('/').pop();
    return `https://www.youtube.com/embed/${id}`;
  }

  // Loom
  if (url.includes('loom.com')) {
    const id = url.split('/').pop()?.split('?')[0];
    return `https://www.loom.com/embed/${id}`;
  }

  return url;
};

// --- Components ---

const VideoPlayer = ({ url }: { url?: string }) => {
  const embedUrl = getEmbedUrl(url);

  if (!embedUrl) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        <div className="w-24 h-24 rounded-full bg-[var(--emerald-deep)] flex items-center justify-center shadow-[0_0_50px_rgba(6,78,59,0.4)]">
          <Play className="w-10 h-10 text-white fill-white translate-x-1" />
        </div>
        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 animate-pulse">
          AUCUNE VIDÉO DISPONIBLE
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
    notion: <LinkIcon className="w-4 h-4" />,
    pdf: <Download className="w-4 h-4" />,
    prompt: <Sparkles className="w-4 h-4" />,
    link: <ExternalLink className="w-4 h-4" />
  };

  if (resource.type === 'prompt' && resource.content) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">
          <Sparkles className="w-3 h-3 text-[var(--gold-vivid)]" /> {resource.label}
        </div>
        <PromptBlock content={resource.content} />
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
          <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]/40 mb-1">{resource.type}</div>
          <div className="text-xs font-bold">{resource.label}</div>
        </div>
      </div>
      <ArrowUpRight className="w-4 h-4 text-[var(--text-secondary)]/20 group-hover:text-[var(--gold-vivid)] transition-all" />
    </a>
  );
};

export default function LessonViewerClient({ 
  currentModule, 
  currentLesson,
  allModules 
}: { 
  currentModule: Module, 
  currentLesson: Lesson,
  allModules: Module[]
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex">
      {/* Sidebar Navigation */}
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
              {allModules.map((mod) => (
                <div key={mod.id} className="space-y-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--emerald-deep)] flex items-center gap-2">
                    <div className="w-1 h-1 bg-[var(--emerald-deep)] rounded-full" />
                    {mod.title}
                  </div>
                  <div className="space-y-2">
                    {mod.lessons.map((lsn) => (
                      <Link 
                        key={lsn.id}
                        href={`/academie/cours/${mod.id}/${lsn.id}`}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-xl text-xs transition-all group",
                          lsn.id === currentLesson.id 
                            ? "bg-[var(--emerald-deep)] text-white shadow-lg" 
                            : "hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Play className={cn("w-3 h-3", lsn.id === currentLesson.id ? "fill-white" : "opacity-30")} />
                          <span className="font-medium truncate max-w-[160px]">{lsn.title}</span>
                        </div>
                        {lsn.completed && <CheckCircle2 className="w-3 h-3 text-[var(--gold-vivid)]" />}
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
              {currentModule.title} // {currentLesson.title}
            </div>
            <SophisticatedButton variant="outline" className="py-2 px-6 text-[9px]">
              Module Suivant <ChevronRight className="w-3 h-3 ml-2" />
            </SophisticatedButton>
          </div>
        </div>

        {/* Video & Resources */}
        <div className="p-8 md:p-16 max-w-5xl mx-auto space-y-16">
          {/* Video Player */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative aspect-video rounded-[2.5rem] bg-[var(--text-primary)] shadow-2xl overflow-hidden border-4 border-[var(--emerald-deep)]/10"
          >
            <VideoPlayer url={currentLesson.videoUrl} />
            {/* Overlay Gradient (only if no video or on top of it for styling) */}
            {!currentLesson.videoUrl && (
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--emerald-deep)]/20 to-transparent pointer-events-none" />
            )}
          </motion.div>

          {/* Lesson Header */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                <Badge className="border-[var(--gold-vivid)]/30">MODULE OPÉRATIONNEL</Badge>
                <h1 className="text-4xl md:text-6xl font-light uppercase tracking-tighter leading-tight">
                  {currentLesson.title.split(' ').map((word, i) => (
                    <span key={i} className={cn(i === 0 && "font-serif italic text-[var(--gold-vivid)]")}>{word}{' '}</span>
                  ))}
                </h1>
                <p className="text-[var(--text-secondary)] text-lg max-w-2xl font-light leading-relaxed">
                  {currentModule.description || "Organiser votre expertise pour ne plus jamais vous répéter."}
                </p>
              </div>
              <div className="shrink-0 pb-2">
                <SophisticatedButton className="py-5 px-12 group">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-[var(--gold-vivid)] group-hover:scale-110 transition-transform" /> 
                  Valider l'unité
                </SophisticatedButton>
              </div>
            </div>

            {/* Outcome Box */}
            <div className="p-8 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--gold-vivid)]/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <Target className="w-20 h-20 text-[var(--emerald-deep)]" />
              </div>
              <div className="relative z-10">
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--emerald-deep)] mb-4">RÉSULTAT ATTENDU</div>
                <p className="text-sm italic font-medium text-[var(--text-primary)]">
                  "{currentModule.outcome || "À la fin de ce module, votre base de connaissances Notion est active et prête à recevoir votre savoir."}"
                </p>
              </div>
            </div>
          </div>

          {/* Resources & Action */}
          <div className="grid md:grid-cols-2 gap-16">
            {/* Resources List */}
            <div className="space-y-8">
              <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-3">
                <Download className="w-5 h-5 text-[var(--emerald-deep)]" /> Ressources & Assets
              </h3>
              <div className="grid gap-4">
                {currentLesson.resources.map((res) => (
                  <ResourceCard key={res.id} resource={res} />
                ))}
              </div>
            </div>

            {/* Final Action / Next Steps */}
            <div className="space-y-8">
              <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[var(--gold-vivid)]" /> Action de Validation
              </h3>
              <div className="p-10 rounded-[2rem] bg-[var(--emerald-deep)] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <ShieldCheck className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <div className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--gold-sand)]/60 mb-6">PROTOCOLE DE FIN DE MODULE</div>
                  <h4 className="text-2xl font-light uppercase tracking-tighter mb-4 italic text-[var(--gold-sand)]">
                    {currentModule.finalActionTitle || "Validation de la Phase 1"}
                  </h4>
                  <p className="text-sm text-white/80 leading-relaxed mb-8">
                    {currentModule.finalActionDesc || "Partagez une capture d'écran de votre Vault configuré sur le Discord dans le canal #victoires."}
                  </p>
                  <SophisticatedButton variant="secondary" className="w-full justify-center">
                    Confirmer l'Action
                  </SophisticatedButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ShieldCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ArrowUpRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

