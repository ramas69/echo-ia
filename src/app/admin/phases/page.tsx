import React from 'react';
import prisma from "@/lib/prisma";
import { Badge, SophisticatedButton } from '@/components/SharedUI';
import { Plus, BookOpen } from 'lucide-react';
import Link from 'next/link';
import PhaseActions from './PhaseActions';

export default async function AdminPhasesPage() {
  const phases = await prisma.phase.findMany({
    include: {
      _count: {
        select: { units: true }
      }
    },
    orderBy: { orderIndex: 'asc' }
  });

  return (
    <div className="p-8 space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <Badge className="mb-4">Gestion</Badge>
          <h1 className="text-4xl font-light uppercase tracking-tighter">Le <span className="font-serif italic text-[var(--emerald-deep)]">Curriculum.</span></h1>
        </div>
        <Link href="/admin/phases/new">
          <SophisticatedButton className="py-3 px-6">
            <Plus className="w-4 h-4 mr-2" /> Créer une Phase
          </SophisticatedButton>
        </Link>
      </div>

      <div className="grid gap-6">
        {phases.length === 0 ? (
          <div className="p-20 text-center glass-card rounded-[2.5rem] border border-dashed border-[var(--border-subtle)]">
            <BookOpen className="w-12 h-12 text-[var(--emerald-deep)]/20 mx-auto mb-4" />
            <p className="text-[var(--text-secondary)] uppercase tracking-widest text-xs">Aucune phase créée.</p>
          </div>
        ) : (
          phases.map((phase) => (
            <div key={phase.id} className="p-8 glass-card rounded-[2rem] border border-[var(--border-subtle)] hover:border-[var(--gold-vivid)]/30 transition-all group flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="w-16 h-16 rounded-2xl bg-[var(--emerald-deep)]/5 flex items-center justify-center group-hover:bg-[var(--emerald-deep)] transition-all">
                  <div className="text-xl font-black text-[var(--emerald-deep)] group-hover:text-white">0{phase.orderIndex}</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight mb-2">{phase.title}</h3>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-40">
                      {phase._count.units} Unités
                    </div>
                  </div>
                </div>
              </div>

              <PhaseActions phaseId={phase.id} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
