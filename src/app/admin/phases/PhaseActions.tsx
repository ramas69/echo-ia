'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PhaseActionsProps {
  phaseId: string;
}

export default function PhaseActions({ phaseId }: PhaseActionsProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette phase ? Cette action est irréversible.")) {
      return;
    }
    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/curriculum/phases/${phaseId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message || "Phase supprimée avec succès");
        router.push('/admin/curriculum');
        router.refresh();
      } else {
        const error = await response.json();
        alert(`Erreur lors de la suppression: ${error.error || 'Inconnue'}`);
      }
    } catch (error) {
      console.error(error);
      alert("Erreur réseau.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex gap-3">
      <Link href={`/admin/phases/${phaseId}`}>
        <button className="p-4 rounded-xl bg-[var(--emerald-deep)] text-white hover:bg-[var(--emerald-light)] shadow-lg transition-all flex items-center gap-2" title="Éditer la phase">
          <Edit2 className="w-4 h-4" />
        </button>
      </Link>
      <button 
        onClick={handleDelete} 
        disabled={deleting}
        className="p-4 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all" 
        title="Supprimer la phase"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
