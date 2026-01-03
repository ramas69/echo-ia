'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Clock, ChevronDown, ChevronUp } from 'lucide-react';

interface Note {
  id: string;
  content: string;
  unitTitle: string;
  createdAt: Date;
}

interface NotesTimelineProps {
  notes: Note[];
}

export default function NotesTimeline({ notes }: NotesTimelineProps) {
  const [expanded, setExpanded] = useState(false);
  const displayNotes = expanded ? notes : notes.slice(0, 3);

  if (notes.length === 0) {
    return (
      <div className="glass-card p-8 rounded-[2rem] border border-[var(--border-subtle)] text-center">
        <MessageSquare className="w-12 h-12 mx-auto mb-4 text-[var(--text-secondary)]/40" />
        <p className="text-sm text-[var(--text-secondary)] mb-2">Aucune note pour le moment</p>
        <p className="text-xs text-[var(--text-secondary)]/70 italic">
          Ajoutez des notes personnelles dans vos activations pour garder une trace de vos apprentissages.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card p-8 rounded-[2rem] border border-[var(--border-subtle)]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-light uppercase tracking-tighter text-[var(--emerald-deep)]">
          Mes Notes ({notes.length})
        </h3>
        <MessageSquare className="w-5 h-5 text-[var(--emerald-deep)]/60" />
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        <AnimatePresence>
          {displayNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-6 pb-4 border-l-2 border-[var(--border-subtle)] last:border-l-0 last:pb-0"
            >
              {/* Point sur la timeline */}
              <div className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full bg-[var(--emerald-deep)] border-4 border-white" />

              {/* Contenu */}
              <div className="bg-[var(--bg-secondary)] p-4 rounded-xl hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-xs font-bold text-[var(--emerald-deep)] line-clamp-1 flex-1">
                    {note.unitTitle}
                  </h4>
                  <div className="flex items-center gap-1 text-[9px] text-[var(--text-secondary)] ml-2">
                    <Clock className="w-3 h-3" />
                    {new Date(note.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </div>
                </div>

                {/* Note content */}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
                  {note.content}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bouton "Voir plus" */}
      {notes.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-6 w-full py-3 px-4 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--emerald-deep)]/10 transition-colors flex items-center justify-center gap-2 text-xs font-bold text-[var(--emerald-deep)] uppercase tracking-wider cursor-pointer"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Voir moins
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Voir toutes les notes ({notes.length - 3} de plus)
            </>
          )}
        </button>
      )}
    </div>
  );
}

