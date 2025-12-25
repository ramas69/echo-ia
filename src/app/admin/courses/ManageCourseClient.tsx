'use client';

import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Video, 
  FileText, 
  Sparkles, 
  Link as LinkIcon, 
  Save, 
  ChevronDown, 
  ChevronUp,
  Settings,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { Badge, SophisticatedButton } from '@/components/SharedUI';
import { cn } from '@/lib/utils';

// --- Types pour l'Admin ---
interface AdminResource {
  id?: string;
  type: string;
  label: string;
  url?: string;
  content?: string;
}

interface AdminLesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  content: string;
  resources: AdminResource[];
  order: number;
}

interface AdminModule {
  id: string;
  title: string;
  description: string;
  outcome: string;
  lessons: AdminLesson[];
  order: number;
  finalActionTitle: string;
  finalActionDesc: string;
}

export default function ManageCourseClient({ course }: { course: any }) {
  const [modules, setModules] = useState<AdminModule[]>(course.modules || []);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const addModule = () => {
    const newModule: AdminModule = {
      id: `temp-${Date.now()}`,
      title: "Nouveau Module",
      description: "",
      outcome: "",
      order: modules.length,
      lessons: [],
      finalActionTitle: "",
      finalActionDesc: ""
    };
    setModules([...modules, newModule]);
    setActiveModuleId(newModule.id);
  };

  const addLesson = (moduleId: string) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: [...m.lessons, {
            id: `temp-lsn-${Date.now()}`,
            title: "Nouvelle Unité",
            duration: "00:00",
            videoUrl: "",
            content: "",
            resources: [],
            order: m.lessons.length
          }]
        };
      }
      return m;
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: course.title,
          description: course.description,
          modules: modules
        })
      });

      if (response.ok) {
        alert("Protocole sauvegardé avec succès !");
      } else {
        alert("Erreur lors de la sauvegarde.");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur réseau.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-8 space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <Badge className="mb-4">Edition</Badge>
          <h1 className="text-4xl font-light uppercase tracking-tighter">Architecture : <span className="font-serif italic text-[var(--emerald-deep)]">{course.title}</span></h1>
        </div>
        <div className="flex gap-4">
          <SophisticatedButton variant="outline" className="py-3 px-6">
            <Eye className="w-4 h-4 mr-2" /> Aperçu
          </SophisticatedButton>
          <SophisticatedButton 
            className="py-3 px-6" 
            onClick={handleSave}
            disabled={isSaving}
          >
            <Save className="w-4 h-4 mr-2" /> 
            {isSaving ? "Sauvegarde..." : "Publier les changements"}
          </SophisticatedButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Liste des Modules */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex justify-between items-center px-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Structure du Protocole</h3>
            <button onClick={addModule} className="p-2 rounded-full hover:bg-[var(--emerald-deep)]/5 text-[var(--emerald-deep)] transition-all">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {modules.map((mod, idx) => (
              <button
                key={mod.id}
                onClick={() => setActiveModuleId(mod.id)}
                className={cn(
                  "w-full p-6 rounded-[1.5rem] border transition-all text-left flex items-center justify-between group",
                  activeModuleId === mod.id 
                    ? "bg-[var(--emerald-deep)] text-white border-[var(--emerald-deep)] shadow-xl" 
                    : "bg-white border-[var(--border-subtle)] hover:border-[var(--gold-vivid)]/30"
                )}
              >
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black opacity-30">0{idx + 1}</span>
                  <span className="text-sm font-bold uppercase tracking-tight truncate max-w-[180px]">{mod.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black opacity-40">{mod.lessons.length} UNITÉS</span>
                  <GripVertical className="w-4 h-4 opacity-20" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Détails du Module Actif */}
        <div className="lg:col-span-2 space-y-8">
          {activeModuleId ? (
            <div className="space-y-12">
              {/* Infos Module */}
              <div className="p-10 glass-card rounded-[2.5rem] border border-[var(--border-subtle)] space-y-8">
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Titre du Module</label>
                    <input 
                      className="w-full bg-transparent border-b border-[var(--border-subtle)] py-2 text-2xl font-bold focus:outline-none focus:border-[var(--gold-vivid)] transition-all"
                      value={modules.find(m => m.id === activeModuleId)?.title}
                      onChange={(e) => {
                        setModules(modules.map(m => m.id === activeModuleId ? { ...m, title: e.target.value } : m));
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Objectif (Outcome)</label>
                    <textarea 
                      className="w-full bg-transparent border border-[var(--border-subtle)] rounded-2xl p-4 text-sm focus:outline-none focus:border-[var(--gold-vivid)] transition-all"
                      rows={2}
                      value={modules.find(m => m.id === activeModuleId)?.outcome}
                      placeholder="Ex: À la fin de ce module, votre vault Notion est actif..."
                      onChange={(e) => {
                        setModules(modules.map(m => m.id === activeModuleId ? { ...m, outcome: e.target.value } : m));
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Liste des Leçons */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold uppercase tracking-tight">Unités d'Apprentissage</h3>
                  <button 
                    onClick={() => addLesson(activeModuleId)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--emerald-deep)]/5 text-[var(--emerald-deep)] hover:bg-[var(--emerald-deep)] hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
                  >
                    <Plus className="w-3 h-3" /> Ajouter une unité
                  </button>
                </div>

                <div className="space-y-4">
                  {modules.find(m => m.id === activeModuleId)?.lessons.map((lsn, lidx) => (
                    <div key={lsn.id} className="p-8 bg-white border border-[var(--border-subtle)] rounded-[2rem] hover:shadow-xl transition-all space-y-6 group">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center font-bold text-xs">
                            {lidx + 1}
                          </div>
                          <input 
                            className="bg-transparent border-b border-transparent focus:border-[var(--gold-vivid)] font-bold text-lg focus:outline-none"
                            value={lsn.title}
                            onChange={(e) => {
                              setModules(modules.map(m => {
                                if (m.id === activeModuleId) {
                                  return {
                                    ...m,
                                    lessons: m.lessons.map(l => l.id === lsn.id ? { ...l, title: e.target.value } : l)
                                  };
                                }
                                return m;
                              }));
                            }}
                          />
                        </div>
                        <button className="p-2 text-red-500/20 hover:text-red-500 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest opacity-40 flex items-center gap-2">
                            <Video className="w-3 h-3" /> URL Vidéo (Loom/YouTube)
                          </label>
                          <input 
                            className="w-full bg-[var(--bg-secondary)] border border-transparent focus:border-[var(--gold-vivid)] rounded-xl py-2 px-4 text-xs focus:outline-none"
                            value={lsn.videoUrl}
                            placeholder="https://www.youtube.com/watch?v=..."
                            onChange={(e) => {
                              setModules(modules.map(m => {
                                if (m.id === activeModuleId) {
                                  return {
                                    ...m,
                                    lessons: m.lessons.map(l => l.id === lsn.id ? { ...l, videoUrl: e.target.value } : l)
                                  };
                                }
                                return m;
                              }));
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest opacity-40 flex items-center gap-2">
                            <Settings className="w-3 h-3" /> Durée
                          </label>
                          <input 
                            className="w-full bg-[var(--bg-secondary)] border border-transparent focus:border-[var(--gold-vivid)] rounded-xl py-2 px-4 text-xs focus:outline-none"
                            value={lsn.duration}
                            placeholder="12:45"
                            onChange={(e) => {
                              setModules(modules.map(m => {
                                if (m.id === activeModuleId) {
                                  return {
                                    ...m,
                                    lessons: m.lessons.map(l => l.id === lsn.id ? { ...l, duration: e.target.value } : l)
                                  };
                                }
                                return m;
                              }));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-20 glass-card rounded-[3rem] border border-dashed border-[var(--border-subtle)] opacity-40 text-center">
              <Settings className="w-12 h-12 mb-4" />
              <p className="text-xs uppercase tracking-[0.3em] font-black">Sélectionnez un module pour l'éditer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

