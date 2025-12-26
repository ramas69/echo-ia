'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Save, 
  ArrowLeft, 
  Layout, 
  Target, 
  FileText, 
  Link as LinkIcon,
  RefreshCw
} from 'lucide-react';
import { Badge, SophisticatedButton } from '@/components/SharedUI';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { slugify } from '@/lib/utils/slugify';

// --- Validation Schema ---
const phaseSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  slug: z.string().min(1, "Le slug est requis"),
  description: z.string().min(1, "La description est requise"),
  outcome: z.string().min(1, "Le résultat garanti est requis"),
  checkpointInstruction: z.string().optional(),
});

type PhaseFormValues = z.infer<typeof phaseSchema>;

interface ManagePhaseClientProps {
  phase: any;
}

export default function ManagePhaseClient({ phase }: ManagePhaseClientProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<PhaseFormValues>({
    resolver: zodResolver(phaseSchema),
    defaultValues: {
      title: phase.title,
      slug: phase.slug,
      description: phase.description,
      outcome: phase.outcome,
      checkpointInstruction: phase.checkpointInstruction || '',
    },
  });

  // Fonction pour régénérer le slug depuis le titre
  const regenerateSlug = () => {
    const currentTitle = watch("title");
    if (currentTitle) {
      const newSlug = slugify(currentTitle);
      setValue("slug", newSlug);
    }
  };

  // Auto-generate slug from title ONLY for new phases
  const title = watch("title");
  React.useEffect(() => {
    if (phase.id === 'new' && title) {
      regenerateSlug();
    }
  }, [title, phase.id]);

  const onSubmit = async (data: PhaseFormValues) => {
    setIsSaving(true);
    const isNew = phase.id === 'new';
    const url = isNew ? '/api/admin/curriculum/phases' : `/api/admin/curriculum/phases/${phase.id}`;
    const method = isNew ? 'POST' : 'PATCH';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, orderIndex: phase.orderIndex }),
      });

      if (res.ok) {
        const result = await res.json();
        alert(isNew ? "Phase créée !" : "Phase mise à jour !");
        router.push('/admin/curriculum');
        router.refresh();
      } else {
        const error = await res.json();
        console.error("Server error:", error);
        alert(`Erreur lors de la sauvegarde: ${error.error || 'Inconnue'}`);
      }
    } catch (error) {
      console.error(error);
      alert("Erreur réseau.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-12 max-w-5xl mx-auto pb-20">
      <header className="flex justify-between items-end">
        <div className="space-y-4">
          <Link 
            href="/admin/curriculum" 
            className="flex items-center gap-2 group text-[10px] font-black uppercase tracking-[0.3em] text-[var(--emerald-deep)]/60 hover:text-[var(--emerald-deep)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour au Curriculum
          </Link>
          <Badge className="border-[var(--gold-vivid)]/30">Configuration Phase {phase.orderIndex}</Badge>
          <h1 className="text-4xl font-light uppercase tracking-tighter">
            {phase.id === 'new' ? 'Nouvelle Phase' : `Édition : ${phase.title}`}
          </h1>
        </div>
        <SophisticatedButton type="submit" disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" /> {isSaving ? "Sauvegarde..." : "Publier"}
        </SophisticatedButton>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Section Identité */}
        <section className="p-8 bg-white border border-[var(--border-subtle)] rounded-[2.5rem] space-y-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] pb-4">
            <Layout className="w-4 h-4 text-[var(--emerald-deep)]" />
            <h2 className="text-sm font-bold uppercase tracking-widest">Identité</h2>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Titre de la Phase</label>
              <input 
                {...register("title")}
                className="w-full bg-[var(--bg-secondary)] border border-transparent rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:border-[var(--gold-vivid)] transition-all"
                placeholder="ex: Le Second Cerveau"
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
                placeholder="ex: second-cerveau"
              />
              {errors.slug && <p className="text-red-500 text-[9px] uppercase font-black">{errors.slug.message}</p>}
              <p className="text-[9px] uppercase tracking-widest opacity-30">⚠️ Changer le slug cassera les liens existants</p>
            </div>
          </div>
        </section>

        {/* Section Objectifs */}
        <section className="p-8 bg-white border border-[var(--border-subtle)] rounded-[2.5rem] space-y-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] pb-4">
            <Target className="w-4 h-4 text-[var(--emerald-deep)]" />
            <h2 className="text-sm font-bold uppercase tracking-widest">Promesse & Impact</h2>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Résultat Garanti (Outcome)</label>
              <textarea 
                {...register("outcome")}
                rows={4}
                className="w-full bg-[var(--bg-secondary)] border border-transparent rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:border-[var(--gold-vivid)] transition-all"
                placeholder="Ce que l'élève aura accompli à la fin..."
              />
              {errors.outcome && <p className="text-red-500 text-[9px] uppercase font-black">{errors.outcome.message}</p>}
            </div>
          </div>
        </section>

        {/* Section Description */}
        <section className="p-8 bg-white border border-[var(--border-subtle)] rounded-[2.5rem] space-y-6 shadow-sm md:col-span-2">
          <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] pb-4">
            <FileText className="w-4 h-4 text-[var(--emerald-deep)]" />
            <h2 className="text-sm font-bold uppercase tracking-widest">Description Détaillée</h2>
          </div>
          
          <div className="space-y-2">
            <textarea 
              {...register("description")}
              rows={4}
              className="w-full bg-[var(--bg-secondary)] border border-transparent rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:border-[var(--gold-vivid)] transition-all"
              placeholder="Décrivez le contenu et l'importance de cette phase..."
            />
            {errors.description && <p className="text-red-500 text-[9px] uppercase font-black">{errors.description.message}</p>}
          </div>
        </section>

        {/* Section Checkpoint */}
        <section className="p-8 bg-[var(--emerald-deep)] rounded-[2.5rem] space-y-6 shadow-xl text-white md:col-span-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Target className="w-32 h-32" />
          </div>
          <div className="relative z-10 flex items-center gap-3 border-b border-white/10 pb-4">
            <LinkIcon className="w-4 h-4 text-[var(--gold-vivid)]" />
            <h2 className="text-sm font-bold uppercase tracking-widest">Instruction de Validation (Checkpoint)</h2>
          </div>
          
          <div className="relative z-10 space-y-2">
            <p className="text-[10px] text-white/60 uppercase tracking-widest mb-2">Visible par l'élève une fois la phase terminée</p>
            <textarea 
              {...register("checkpointInstruction")}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:border-[var(--gold-vivid)] transition-all"
              placeholder="ex: Postez une capture d'écran de votre Vault sur Discord."
            />
          </div>
        </section>
      </div>
    </form>
  );
}
