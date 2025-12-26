'use client';

import React, { useState, useEffect, useId } from 'react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Plus, 
  GripVertical, 
  Edit2, 
  Trash2, 
  ChevronDown, 
  ChevronRight,
  Video,
  FileText,
  Save,
  X,
  Eye,
  Search,
  Maximize2,
  Minimize2,
  ExternalLink,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SophisticatedButton } from '@/components/SharedUI';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- Types ---
interface Resource {
  type: string;
}

interface Unit {
  id: string;
  title: string;
  slug: string;
  orderIndex: number;
  isPublished: boolean;
  videoProvider: string;
  videoId: string;
  content: string | null;
  durationSec: number;
  resources: Resource[];
  _count?: { resources: number };
}

interface Phase {
  id: string;
  title: string;
  slug: string;
  description: string;
  outcome: string;
  orderIndex: number;
  isPublished: boolean;
  units: Unit[];
}

// --- Helpers ---

const formatDuration = (seconds: number) => {
  if (!seconds) return "00:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  
  if (h > 0) return `${h}h ${m}m`;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

const getResourceSummary = (resources: Resource[]) => {
  if (!resources || resources.length === 0) return "Aucune ressource";
  
  const counts: Record<string, number> = {};
  resources.forEach(r => {
    counts[r.type] = (counts[r.type] || 0) + 1;
  });

  const parts = Object.entries(counts).map(([type, count]) => {
    let label = type.replace('_', ' ');
    if (type === 'PDF_GUIDE') label = 'PDF';
    if (type === 'EXTERNAL_LINK') label = 'Lien';
    if (type === 'PROMPT_TEXT') label = 'Prompt';
    if (type === 'NOTION_TEMPLATE') label = 'Notion';
    if (type === 'MAKE_BLUEPRINT') label = 'Make';
    return `${count} ${label}${count > 1 ? 's' : ''}`;
  });

  return parts.join(', ');
};

// --- Sortable Item Components ---

const SortableUnit = ({ 
  unit, 
  phaseIndex, 
  unitIndex, 
  onDelete,
  onTogglePublish 
}: { 
  unit: Unit, 
  phaseIndex: number,
  unitIndex: number,
  onDelete: (id: string) => void,
  onTogglePublish: (unit: Unit) => void
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: unit.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isVideoMissing = !unit.videoId;
  const isContentMissing = !unit.content || unit.content === '<p></p>' || unit.content === '';

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={cn(
        "group flex items-center justify-between p-4 bg-white border rounded-xl transition-all ml-12",
        unit.isPublished ? "border-[var(--border-subtle)] hover:border-[var(--emerald-deep)]/30" : "border-dashed border-gray-200 opacity-60"
      )}
    >
      <div className="flex items-center gap-4">
        <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 opacity-20 group-hover:opacity-100 transition-opacity">
          <GripVertical className="w-4 h-4" />
        </button>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-[11px] font-black text-[var(--emerald-deep)]/30 uppercase tracking-tighter tabular-nums">
              {phaseIndex + 1}.{unitIndex + 1}
            </span>
            <span className="text-sm font-bold uppercase tracking-tight">{unit.title}</span>
            
            {/* Health Indicators */}
            <div className="flex items-center gap-1 ml-2">
              {isVideoMissing && (
                <div title="Vidéo manquante" className="p-1 rounded-md bg-red-50 text-red-500">
                  <Video className="w-3 h-3" />
                </div>
              )}
              {isContentMissing && (
                <div title="Contenu texte vide" className="p-1 rounded-md bg-orange-50 text-orange-500">
                  <FileText className="w-3 h-3" />
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest opacity-40">
            <span className="flex items-center gap-1">🎥 {formatDuration(unit.durationSec)}</span>
            <span className="opacity-20">•</span>
            <span className="flex items-center gap-1">📦 {getResourceSummary(unit.resources)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Toggle Published */}
        <button 
          onClick={() => onTogglePublish(unit)}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all",
            unit.isPublished 
              ? "bg-[var(--emerald-deep)] text-white shadow-lg shadow-emerald-900/20" 
              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
          )}
        >
          {unit.isPublished ? "Publié" : "Brouillon"}
        </button>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link href={`/admin/curriculum/units/${unit.id}/edit`}>
            <button className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg text-[var(--emerald-deep)] transition-colors">
              <Edit2 className="w-4 h-4" />
            </button>
          </Link>
          <button 
            onClick={() => onDelete(unit.id)}
            className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const SortablePhase = ({ phase, index, isExpanded, onToggleExpand, onEdit, onDelete, onAddUnit, onDeleteUnit, onReorderUnits, onTogglePhasePublish, onToggleUnitPublish }: { 
  phase: Phase, 
  index: number,
  isExpanded: boolean,
  onToggleExpand: () => void,
  onEdit: (phase: Phase) => void, 
  onDelete: (id: string) => void,
  onAddUnit: (phaseId: string) => void,
  onDeleteUnit: (unitId: string) => void,
  onReorderUnits: (phaseId: string, event: DragEndEvent) => void,
  onTogglePhasePublish: (phase: Phase) => void,
  onToggleUnitPublish: (unit: Unit) => void
}) => {
  const dndId = useId();
  // Utiliser un ID unique et stable pour le contexte des unités
  const unitContextId = `units-ctx-${phase.id}`;
  
  // DÉPLACEMENT DES HOOKS : Ils doivent être au top-level, jamais dans un bloc conditionnel
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: phase.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    position: 'relative' as const
  };

  const totalDuration = (phase.units || []).reduce((acc, u) => acc + (u.durationSec || 0), 0);
  const totalUnits = (phase.units || []).length;

  return (
    <div ref={setNodeRef} style={style} className="space-y-4">
      <div className={cn(
        "group flex items-center justify-between p-6 bg-white border rounded-[2rem] shadow-sm transition-all",
        phase.isPublished ? "border-[var(--border-subtle)] hover:shadow-md" : "border-dashed border-gray-200 opacity-70 shadow-none",
        isDragging && "opacity-50 border-[var(--gold-vivid)]"
      )}>
        <div className="flex items-center gap-6">
          <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-2 opacity-20 group-hover:opacity-100 transition-opacity">
            <GripVertical className="w-5 h-5" />
          </button>
          
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleExpand();
            }}
            className="p-2 hover:bg-[var(--bg-secondary)] rounded-full transition-colors"
          >
            {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <span className="text-xl font-black text-[var(--emerald-deep)]/10 uppercase italic tabular-nums">Phase {index + 1}</span>
              <h3 className="text-lg font-bold uppercase tracking-tight">{phase.title}</h3>
              <div className="px-3 py-1 rounded-full bg-[var(--bg-secondary)] text-[9px] font-black uppercase tracking-widest text-[var(--emerald-deep)]/40 tabular-nums">
                {totalUnits} Unité{totalUnits > 1 ? 's' : ''} • {formatDuration(totalDuration)}
              </div>
            </div>
            <p className="text-xs text-[var(--text-secondary)]/60 line-clamp-1 max-w-xl">{phase.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Toggle Published */}
          <button 
            type="button"
            onClick={() => onTogglePhasePublish(phase)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all",
              phase.isPublished 
                ? "bg-[var(--emerald-deep)] text-white shadow-xl shadow-emerald-900/30" 
                : "bg-gray-100 text-gray-400 hover:bg-gray-200"
            )}
          >
            <div className={cn("w-1.5 h-1.5 rounded-full", phase.isPublished ? "bg-white animate-pulse" : "bg-gray-300")} />
            {phase.isPublished ? "En Ligne" : "Brouillon"}
          </button>

          <div className="h-8 w-px bg-[var(--border-subtle)] mx-2" />

          <button 
            type="button"
            onClick={() => onAddUnit(phase.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--emerald-deep)]/5 text-[var(--emerald-deep)] hover:bg-[var(--emerald-deep)] hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
          >
            <Plus className="w-3 h-3" /> Ajouter une unité
          </button>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              type="button"
              onClick={() => onEdit(phase)}
              className="p-3 hover:bg-[var(--bg-secondary)] rounded-xl text-[var(--emerald-deep)] transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button 
              type="button"
              onClick={() => onDelete(phase.id)}
              className="p-3 hover:bg-red-50 rounded-xl text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Utilisation de CSS transitions au lieu de framer-motion pour éviter les conflits de hooks avec React 19 */}
      <div 
        className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden",
          isExpanded ? "max-h-[10000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="space-y-2 py-2">
          <DndContext 
            id={unitContextId}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(event) => onReorderUnits(phase.id, event)}
          >
            <SortableContext 
              items={(phase.units || []).map(u => u.id)} 
              strategy={verticalListSortingStrategy}
            >
              {(phase.units || []).map((unit, unitIndex) => (
                <SortableUnit 
                  key={unit.id} 
                  unit={unit} 
                  phaseIndex={index}
                  unitIndex={unitIndex}
                  onDelete={onDeleteUnit}
                  onTogglePublish={onToggleUnitPublish}
                />
              ))}
            </SortableContext>
          </DndContext>
          {(phase.units || []).length === 0 && (
            <div className="ml-12 p-8 border border-dashed border-[var(--border-subtle)] rounded-xl text-center text-xs opacity-40 uppercase tracking-widest">
              Aucune unité dans cette phase.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main Manager Component ---

export default function CurriculumManager({ initialPhases }: { initialPhases: Phase[] }) {
  const [phases, setPhases] = useState<Phase[]>(initialPhases || []);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({});
  
  const dndId = useId();
  const router = useRouter();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setMounted(true);
    // Initialiser toutes les phases comme dépliées par défaut au montage
    if (initialPhases) {
      const initialExpanded = initialPhases.reduce((acc, p) => ({ ...acc, [p.id]: true }), {});
      setExpandedPhases(initialExpanded);
    }
  }, [initialPhases]);

  // Filtrage
  const filteredPhases = (phases || []).filter(phase => {
    if (!phase) return false;
    const searchLower = searchQuery.toLowerCase();
    const phaseMatch = (phase.title || "").toLowerCase().includes(searchLower) || 
                       (phase.description || "").toLowerCase().includes(searchLower);
    const unitMatch = (phase.units || []).some(u => (u.title || "").toLowerCase().includes(searchLower));
    return phaseMatch || unitMatch;
  });

  const toggleExpandAll = (expand: boolean) => {
    const newState = phases.reduce((acc, p) => ({ ...acc, [p.id]: expand }), {});
    setExpandedPhases(newState);
  };

  const togglePhaseExpand = (id: string) => {
    setExpandedPhases(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDragEndPhases = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setPhases((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newPhases = arrayMove(items, oldIndex, newIndex);
        
        // Update orderIndex in DB
        updatePhasesOrder(newPhases);
        
        return newPhases;
      });
    }
  };

  const handleDragEndUnits = async (phaseId: string, event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setPhases((prevPhases) => {
        return prevPhases.map(phase => {
          if (phase.id === phaseId) {
            const oldIndex = phase.units.findIndex((u) => u.id === active.id);
            const newIndex = phase.units.findIndex((u) => u.id === over.id);
            const newUnits = arrayMove(phase.units, oldIndex, newIndex);
            
            // Update orderIndex in DB
            updateUnitsOrder(phaseId, newUnits);
            
            return { ...phase, units: newUnits };
          }
          return phase;
        });
      });
    }
  };

  const updatePhasesOrder = async (newPhases: Phase[]) => {
    try {
      const res = await fetch('/api/admin/curriculum/phases/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phaseIds: newPhases.map(p => p.id) }),
      });
      
      const result = await res.json();
      if (!result.success) {
        console.error("Failed to reorder phases:", result.error);
      }
      router.refresh();
    } catch (error) {
      console.error("Failed to reorder phases", error);
    }
  };

  const updateUnitsOrder = async (phaseId: string, newUnits: Unit[]) => {
    try {
      const unitIds = newUnits.map(u => u.id);
      
      const res = await fetch('/api/admin/curriculum/units/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unitIds }),
      });
      
      const result = await res.json();
      
      if (!result.success) {
        console.error("Failed to reorder units:", result.error);
        alert(`Erreur lors de la réorganisation: ${result.error}`);
      }
      router.refresh();
    } catch (error) {
      console.error("Failed to reorder units", error);
      alert(`Erreur réseau lors de la réorganisation`);
    }
  };

  const deletePhase = async (id: string) => {
    if (!confirm("Attention : supprimer cette phase supprimera toutes ses unités et ressources associées. Confirmer ?")) return;
    try {
      const res = await fetch(`/api/admin/curriculum/phases/${id}`, { method: 'DELETE' });
      const result = await res.json();
      
      if (result.success) {
        setPhases(prev => prev.filter(p => p.id !== id));
      } else {
        console.error("Failed to delete phase:", result.error);
        alert("Erreur lors de la suppression de la phase");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la suppression de la phase");
    }
  };

  const deleteUnit = async (id: string) => {
    if (!confirm("Supprimer cette unité ?")) return;
    try {
      const res = await fetch(`/api/admin/curriculum/units/${id}`, { method: 'DELETE' });
      const result = await res.json();
      
      if (result.success) {
        setPhases(prev => prev.map(phase => ({
          ...phase,
          units: phase.units.filter(u => u.id !== id)
        })));
      } else {
        console.error("Failed to delete unit:", result.error);
        alert("Erreur lors de la suppression de l'unité");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la suppression de l'unité");
    }
  };

  const addUnit = async (phaseId: string) => {
    try {
      const res = await fetch('/api/admin/curriculum/units', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phaseId, title: "Nouvelle Unité", slug: `unite-${Date.now()}` }),
      });
      
      const result = await res.json();
      if (result.success) {
        router.push(`/admin/curriculum/units/${result.data.id}/edit`);
      } else {
        console.error("Failed to create unit:", result.error);
        alert("Erreur lors de la création de l'unité");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création de l'unité");
    }
  };

  const togglePhasePublish = async (phase: Phase) => {
    const newStatus = !phase.isPublished;
    setPhases(prev => prev.map(p => p.id === phase.id ? { ...p, isPublished: newStatus } : p));
    
    try {
      const res = await fetch(`/api/admin/curriculum/phases/${phase.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: newStatus }),
      });
      
      const result = await res.json();
      if (!result.success) {
        console.error("Failed to toggle phase publish:", result.error);
        // Revert on error
        setPhases(prev => prev.map(p => p.id === phase.id ? { ...p, isPublished: !newStatus } : p));
      }
      router.refresh();
    } catch (error) {
      console.error(error);
      setPhases(prev => prev.map(p => p.id === phase.id ? { ...p, isPublished: !newStatus } : p));
    }
  };

  const toggleUnitPublish = async (unit: Unit) => {
    const newStatus = !unit.isPublished;
    setPhases(prev => prev.map(phase => ({
      ...phase,
      units: phase.units.map(u => u.id === unit.id ? { ...u, isPublished: newStatus } : u)
    })));

    try {
      const res = await fetch(`/api/admin/curriculum/units/${unit.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: newStatus }),
      });
      
      const result = await res.json();
      if (!result.success) {
        console.error("Failed to toggle unit publish:", result.error);
        // Revert on error
        setPhases(prev => prev.map(phase => ({
          ...phase,
          units: phase.units.map(u => u.id === unit.id ? { ...u, isPublished: !newStatus } : u)
        })));
      }
      router.refresh();
    } catch (error) {
      console.error(error);
      setPhases(prev => prev.map(phase => ({
        ...phase,
        units: phase.units.map(u => u.id === unit.id ? { ...u, isPublished: !newStatus } : u)
      })));
    }
  };

  if (!mounted) return null;

  return (
    <div className="space-y-8 pb-20">
      {/* Top Actions Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-6 rounded-[2.5rem] border border-[var(--border-subtle)] shadow-sm">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--emerald-deep)]/30 group-focus-within:text-[var(--emerald-deep)] transition-colors" />
          <input 
            type="text"
            placeholder="Rechercher une phase ou une unité..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--bg-secondary)] border border-transparent rounded-2xl py-3 pl-12 pr-4 text-xs font-bold focus:outline-none focus:border-[var(--gold-vivid)] transition-all"
          />
        </div>

        <div className="flex items-center gap-4">
          <Link href="/academie" target="_blank">
            <button className="px-6 py-3 rounded-full border border-[var(--border-subtle)] hover:border-[var(--emerald-deep)] text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2">
              <Eye className="w-4 h-4" /> Voir le site membre
            </button>
          </Link>
          <Link href="/admin/phases/new">
            <SophisticatedButton>
              <Plus className="w-4 h-4 mr-2" /> Nouvelle Phase
            </SophisticatedButton>
          </Link>
        </div>
      </div>

      {/* Control Bar: Expand/Collapse */}
      <div className="flex justify-between items-center px-4">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => toggleExpandAll(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-[var(--bg-secondary)] text-[9px] font-black uppercase tracking-widest text-[var(--emerald-deep)]/60 transition-all"
          >
            <Maximize2 className="w-3 h-3" /> Tout déplier
          </button>
          <button 
            onClick={() => toggleExpandAll(false)}
            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-[var(--bg-secondary)] text-[9px] font-black uppercase tracking-widest text-[var(--emerald-deep)]/60 transition-all"
          >
            <Minimize2 className="w-3 h-3" /> Tout replier
          </button>
        </div>
        <div className="text-[9px] font-black uppercase tracking-widest opacity-30">
          {filteredPhases.length} Phase{filteredPhases.length > 1 ? 's' : ''} affichée{filteredPhases.length > 1 ? 's' : ''}
        </div>
      </div>

      <DndContext 
        id={dndId}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEndPhases}
      >
        <SortableContext 
          items={filteredPhases.map(p => p.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-8">
            {filteredPhases.map((phase, index) => (
              <SortablePhase 
                key={phase.id} 
                phase={phase} 
                index={index}
                isExpanded={!!expandedPhases[phase.id]}
                onToggleExpand={() => togglePhaseExpand(phase.id)}
                onEdit={(p) => router.push(`/admin/phases/${p.id}`)}
                onDelete={deletePhase}
                onAddUnit={addUnit}
                onDeleteUnit={deleteUnit}
                onReorderUnits={handleDragEndUnits}
                onTogglePhasePublish={togglePhasePublish}
                onToggleUnitPublish={toggleUnitPublish}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {filteredPhases.length === 0 && (
        <div className="p-20 text-center glass-card rounded-[3rem] border border-dashed border-[var(--border-subtle)]">
          <Zap className="w-12 h-12 text-[var(--emerald-deep)]/20 mx-auto mb-4" />
          <p className="text-[var(--text-secondary)] uppercase tracking-widest text-xs">Aucune phase dans le curriculum.</p>
        </div>
      )}
    </div>
  );
}

