import React from 'react';
import prisma from "@/lib/prisma";
import { Badge, SophisticatedButton } from '@/components/SharedUI';
import { Plus, Edit2, Trash2, Eye, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default async function AdminCoursesPage() {
  const courses = await prisma.course.findMany({
    include: {
      _count: {
        select: { modules: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8 space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <Badge className="mb-4">Gestion</Badge>
          <h1 className="text-4xl font-light uppercase tracking-tighter">Mes <span className="font-serif italic text-[var(--emerald-deep)]">Formations.</span></h1>
        </div>
        <Link href="/admin/courses/new">
          <SophisticatedButton className="py-3 px-6">
            <Plus className="w-4 h-4 mr-2" /> Créer une formation
          </SophisticatedButton>
        </Link>
      </div>

      <div className="grid gap-6">
        {courses.length === 0 ? (
          <div className="p-20 text-center glass-card rounded-[2.5rem] border border-dashed border-[var(--border-subtle)]">
            <BookOpen className="w-12 h-12 text-[var(--emerald-deep)]/20 mx-auto mb-4" />
            <p className="text-[var(--text-secondary)] uppercase tracking-widest text-xs">Aucune formation créée.</p>
          </div>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="p-8 glass-card rounded-[2rem] border border-[var(--border-subtle)] hover:border-[var(--gold-vivid)]/30 transition-all group flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="w-16 h-16 rounded-2xl bg-[var(--emerald-deep)]/5 flex items-center justify-center group-hover:bg-[var(--emerald-deep)] transition-all">
                  <BookOpen className="w-8 h-8 text-[var(--emerald-deep)] group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight mb-2">{course.title}</h3>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-40">
                      {course._count.modules} Modules
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--gold-vivid)]">
                      {course.published ? "Publié" : "Brouillon"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Link href={`/academie`}>
                  <button className="p-4 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-secondary)] transition-all" title="Voir l'aperçu">
                    <Eye className="w-4 h-4 text-[var(--text-secondary)]" />
                  </button>
                </Link>
                <Link href={`/admin/courses/${course.id}`}>
                  <button className="p-4 rounded-xl bg-[var(--emerald-deep)] text-white hover:bg-[var(--emerald-light)] shadow-lg transition-all flex items-center gap-2">
                    <Edit2 className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Gérer</span>
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

