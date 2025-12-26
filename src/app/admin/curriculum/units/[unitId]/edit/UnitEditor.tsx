'use client';

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Sparkles, 
  FileText, 
  Video, 
  Link as LinkIcon,
  Zap as ZapIcon,
  Clock,
  Layout,
  Eye,
  X,
  Play,
  Download,
  Target,
  ChevronRight,
  Copy,
  Check,
  RefreshCw
} from 'lucide-react';
import { Badge, SophisticatedButton } from '@/components/SharedUI';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TipTapEditor from '@/components/Editor/TipTapEditor';
import { slugify } from '@/lib/utils/slugify';

// --- Validation Schema ---
const resourceSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Le titre est requis"),
  type: z.enum(["NOTION_TEMPLATE", "MAKE_BLUEPRINT", "PDF_GUIDE", "PROMPT_TEXT", "EXTERNAL_LINK", "FILE_DOWNLOAD"]),
  url: z.string().nullable().optional(),
  textContent: z.string().nullable().optional(),
});

const unitSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  slug: z.string().min(1, "Le slug est requis"),
  videoProvider: z.string().default("YOUTUBE"),
  videoId: z.string().min(1, "L'ID vidéo est requis"),
  durationSec: z.number().min(0, "La durée doit être positive"),
  content: z.string().nullable().optional(),
  resources: z.array(resourceSchema).default([]),
});

type UnitFormValues = z.infer<typeof unitSchema>;

interface UnitEditorProps {
  initialUnit: any;
}

export default function UnitEditor({ initialUnit }: UnitEditorProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm<UnitFormValues>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      title: initialUnit.title,
      slug: initialUnit.slug,
      videoProvider: initialUnit.videoProvider,
      videoId: initialUnit.videoId,
      durationSec: initialUnit.durationSec,
      content: initialUnit.content || '',
      resources: initialUnit.resources || [],
    },
  });

  const formData = watch(); // Surveille tous les champs pour l'aperçu

  // Fonction pour régénérer le slug depuis le titre
  const regenerateSlug = () => {
    const currentTitle = watch("title");
    if (currentTitle) {
      const newSlug = slugify(currentTitle);
      setValue("slug", newSlug);
    }
  };

  // Effet pour logger les erreurs dès qu'elles changent
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.error("FORM VALIDATION ERRORS:", errors);
    }
  }, [errors]);

  const onInvalid = (errors: any) => {
    console.error("Submit blocked by validation:", errors);
    alert("Le formulaire contient des erreurs. Vérifiez les champs en rouge.");
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "resources",
  });

  const onSubmit = async (data: UnitFormValues) => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/curriculum/units/${initialUnit.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const result = await res.json();
        alert("✅ Unité sauvegardée avec succès !");
        
        // Retour à la gestion du curriculum admin
        router.push('/admin/curriculum');
        router.refresh();
      } else {
        const errorData = await res.json();
        console.error("Erreur serveur:", errorData);
        alert(`Erreur lors de la sauvegarde: ${errorData.error || errorData.message || 'Inconnue'}`);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Erreur réseau.");
    } finally {
      setIsSaving(false);
    }
  };

  // Log des erreurs pour le debug si le bouton "ne fait rien"
  if (Object.keys(errors).length > 0) {
    console.log("Validation Errors:", errors);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 pb-20">
      <header className="flex justify-between items-end">
        <div className="space-y-4">
          <Link 
            href="/admin/curriculum" 
            className="flex items-center gap-2 group text-[10px] font-black uppercase tracking-[0.3em] text-[var(--emerald-deep)]/60 hover:text-[var(--emerald-deep)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour au Curriculum
          </Link>
          <div className="flex items-center gap-4">
            <Badge className="border-[var(--gold-vivid)]/30">
              UNITE {initialUnit.phase.orderIndex}.{initialUnit.orderIndex}
            </Badge>
            {Object.keys(errors).length > 0 && (
              <Badge className="bg-red-500 text-white border-none animate-pulse">
                {Object.keys(errors).length} erreur(s) de validation
              </Badge>
            )}
          </div>
          <h1 className="text-4xl font-light uppercase tracking-tighter">Édition : <span className="font-serif italic text-[var(--emerald-deep)]">{initialUnit.title}</span></h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            type="button" 
            onClick={() => setShowPreview(true)}
            className="px-6 py-3 rounded-full border border-[var(--border-subtle)] hover:border-[var(--emerald-deep)] text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
          >
            <Eye className="w-4 h-4" /> Aperçu Live
          </button>
          <SophisticatedButton 
            type="button" 
            disabled={isSaving} 
            onClick={() => {
              console.log("Button clicked, triggering manual submit...");
              handleSubmit(onSubmit, onInvalid)();
            }}
          >
            <Save className="w-4 h-4 mr-2" /> {isSaving ? "Sauvegarde..." : "Publier les Changements"}
          </SophisticatedButton>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Metadata & Content */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Section 1: Métadonnées */}
          <section className="p-8 bg-white border border-[var(--border-subtle)] rounded-[2.5rem] space-y-8 shadow-sm">
            <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] pb-6">
              <div className="w-8 h-8 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--emerald-deep)]">
                <Layout className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold uppercase tracking-tight">Configuration de l'Unité</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Titre de l'Unité</label>
                <input 
                  {...register("title")}
                  className="w-full bg-[var(--bg-secondary)] border border-transparent rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:border-[var(--gold-vivid)] transition-all"
                />
                {errors.title && <p className="text-red-500 text-[9px] uppercase font-black">{errors.title.message}</p>}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Slug URL</label>
                  <button
                    type="button"
                    onClick={regenerateSlug}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-[var(--bg-secondary)] text-[9px] font-black uppercase tracking-widest text-[var(--emerald-deep)]/60 hover:text-[var(--emerald-deep)] transition-all"
                    title="Générer automatiquement depuis le titre"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Générer
                  </button>
                </div>
                <input 
                  {...register("slug")}
                  className="w-full bg-[var(--bg-secondary)] border border-transparent rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:border-[var(--gold-vivid)] transition-all"
                />
                <p className="text-[9px] uppercase tracking-widest opacity-30">⚠️ Changer le slug cassera les liens existants</p>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Source Vidéo</label>
                <select 
                  {...register("videoProvider")}
                  className="w-full bg-[var(--bg-secondary)] border border-transparent rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:border-[var(--gold-vivid)] appearance-none cursor-pointer"
                >
                  <option value="YOUTUBE">YouTube</option>
                  <option value="VIMEO">Vimeo</option>
                  <option value="LOOM">Loom</option>
                  <option value="MUX">Mux</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40">ID Vidéo / URL</label>
                <input 
                  {...register("videoId")}
                  className={cn(
                    "w-full bg-[var(--bg-secondary)] border border-transparent rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:border-[var(--gold-vivid)] transition-all",
                    errors.videoId && "border-red-500 bg-red-50"
                  )}
                  placeholder="Ex: dQw4w9WgXcQ"
                />
                {errors.videoId && <p className="text-red-500 text-[9px] uppercase font-black">{errors.videoId.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Durée (en secondes)</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20" />
                  <input 
                    type="number"
                    {...register("durationSec", { valueAsNumber: true })}
                    className="w-full bg-[var(--bg-secondary)] border border-transparent rounded-xl py-3 pl-12 pr-4 text-sm font-bold focus:outline-none focus:border-[var(--gold-vivid)] transition-all"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Contenu Riche */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--emerald-deep)]">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold uppercase tracking-tight text-[var(--emerald-deep)]">Contenu de la Leçon</h2>
            </div>
            
            <TipTapEditor 
              content={watch("content") || ""} 
              onChange={(html) => setValue("content", html)}
              placeholder="Expliquez la leçon en détail ici..."
            />
          </section>
        </div>

        {/* Right Column: L'Arsenal */}
        <div className="lg:col-span-4 space-y-8">
          <section className="p-8 bg-[var(--emerald-deep)] rounded-[2.5rem] text-white space-y-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
              <ZapIcon className="w-32 h-32 text-[var(--gold-vivid)]" />
            </div>

            <div className="relative z-10 flex justify-between items-center border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[var(--gold-vivid)]" />
                <h2 className="text-xl font-bold uppercase tracking-tight italic">L'Arsenal</h2>
              </div>
              <button 
                type="button"
                onClick={() => append({ title: "", type: "EXTERNAL_LINK", url: "" })}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="relative z-10 space-y-6">
              {fields.map((field, index) => (
                <div key={field.id} className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4 group">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Ressource #{index + 1}</span>
                    <button 
                      type="button" 
                      onClick={() => remove(index)}
                      className="p-2 text-white/20 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <input 
                        {...register(`resources.${index}.title` as const)}
                        placeholder="Titre de la ressource"
                        className={cn(
                          "w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-xs font-bold focus:outline-none focus:border-[var(--gold-vivid)] transition-all",
                          errors.resources?.[index]?.title && "border-red-500/50"
                        )}
                      />
                      {errors.resources?.[index]?.title && (
                        <p className="text-[9px] text-red-400 font-black uppercase ml-2">{errors.resources[index]?.title?.message}</p>
                      )}
                    </div>

                    <select 
                      {...register(`resources.${index}.type` as const)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-[var(--gold-vivid)] appearance-none cursor-pointer"
                    >
                      <option value="NOTION_TEMPLATE" className="text-black">Notion Template</option>
                      <option value="PDF_GUIDE" className="text-black">Guide PDF</option>
                      <option value="PROMPT_TEXT" className="text-black">Prompt IA</option>
                      <option value="MAKE_BLUEPRINT" className="text-black">Make Blueprint</option>
                      <option value="EXTERNAL_LINK" className="text-black">Lien Externe</option>
                      <option value="FILE_DOWNLOAD" className="text-black">Téléchargement</option>
                    </select>

                    {watch(`resources.${index}.type`) === 'PROMPT_TEXT' ? (
                      <textarea 
                        {...register(`resources.${index}.textContent` as const)}
                        placeholder="Collez votre prompt ici..."
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-mono focus:outline-none focus:border-[var(--gold-vivid)] transition-all"
                      />
                    ) : (
                      <input 
                        {...register(`resources.${index}.url` as const)}
                        placeholder="URL (https://...)"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-xs focus:outline-none focus:border-[var(--gold-vivid)] transition-all"
                      />
                    )}
                  </div>
                </div>
              ))}

              {fields.length === 0 && (
                <div className="text-center py-10 opacity-30 italic text-sm">
                  Aucune ressource pour le moment.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
      <AnimatePresence>
        {showPreview && (
          <PreviewModal 
            data={formData} 
            phaseOrder={initialUnit.phase.orderIndex}
            unitOrder={initialUnit.orderIndex}
            onClose={() => setShowPreview(false)} 
          />
        )}
      </AnimatePresence>
    </form>
  );
}

// --- Sous-composants pour l'aperçu ---

function PreviewModal({ data, onClose, phaseOrder, unitOrder }: { data: any, onClose: () => void, phaseOrder: number, unitOrder: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg-primary)]/95 backdrop-blur-xl p-4 md:p-12 overflow-y-auto"
    >
      <div className="w-full max-w-6xl mx-auto min-h-full">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <div className="bg-[var(--gold-vivid)] text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Aperçu Live</div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Phase {phaseOrder} // Unité {unitOrder}</div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-[var(--bg-secondary)] hover:bg-[var(--border-subtle)] rounded-full transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-12">
            <div className="aspect-video w-full bg-black rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 relative group">
              {data.videoId ? (
                <div className="w-full h-full flex items-center justify-center text-white/20">
                  <div className="text-center">
                    <Video className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-xs font-black uppercase tracking-widest italic">Simulateur Vidéo : {data.videoProvider}</p>
                    <p className="text-[10px] opacity-50 mt-2 font-mono">{data.videoId}</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/10 italic">
                  Aucune vidéo configurée
                </div>
              )}
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl font-light uppercase tracking-tighter leading-[0.9] text-[var(--emerald-deep)]">
                {data.title || "Titre de l'unité"}
              </h1>
              <div 
                className="text-[var(--text-secondary)] text-lg max-w-2xl font-light leading-relaxed prose prose-emerald prose-sm md:prose-base"
                dangerouslySetInnerHTML={{ __html: data.content || "" }}
              />
            </div>
          </div>

          <div className="lg:col-span-4 space-y-12">
            <div className="p-10 bg-[var(--emerald-deep)] rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12">
                <Sparkles className="w-48 h-48 text-[var(--gold-vivid)]" />
              </div>
              
              <div className="relative z-10 flex items-center gap-4 mb-10 pb-6 border-b border-white/10">
                <div className="w-10 h-10 rounded-2xl bg-[var(--gold-vivid)] flex items-center justify-center text-black">
                  <ZapIcon className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold uppercase tracking-tight italic">L'Arsenal</h2>
              </div>

              <div className="relative z-10 space-y-4">
                {data.resources?.map((res: any, idx: number) => (
                  <PreviewResourceCard key={idx} resource={res} />
                ))}
                {(!data.resources || data.resources.length === 0) && (
                  <p className="text-center py-10 opacity-40 italic text-sm">Aucune ressource disponible.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PreviewResourceCard({ resource }: { resource: any }) {
  const [copied, setCopied] = useState(false);

  const getIcon = () => {
    switch(resource.type) {
      case 'NOTION_TEMPLATE': return <Target className="w-5 h-5" />;
      case 'PDF_GUIDE': return <FileText className="w-5 h-5" />;
      case 'EXTERNAL_LINK': return <ExternalLink className="w-5 h-5" />;
      case 'PROMPT_TEXT': return <Sparkles className="w-5 h-5" />;
      default: return <Download className="w-5 h-5" />;
    }
  };

  if (resource.type === 'PROMPT_TEXT') {
    return (
      <div className="p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all group">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[var(--gold-vivid)]/20 flex items-center justify-center text-[var(--gold-vivid)]">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">{resource.title}</span>
        </div>
        <div className="relative bg-black/40 rounded-xl p-4 font-mono text-[10px] text-white/80 leading-relaxed border border-white/5">
          {resource.textContent}
          <button 
            onClick={() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="absolute top-2 right-2 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
          >
            {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex items-center justify-between p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all">
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[var(--gold-vivid)] group-hover:text-black transition-all duration-500">
          {getIcon()}
        </div>
        <div>
          <h4 className="text-xs font-black uppercase tracking-widest leading-none mb-1">{resource.title}</h4>
          <span className="text-[9px] uppercase tracking-[0.2em] opacity-40 font-black italic">{resource.type.replace('_', ' ')}</span>
        </div>
      </div>
      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[var(--emerald-deep)] transition-all">
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
}

