import React from 'react';
import prisma from "@/lib/prisma";
import { Badge, SophisticatedButton } from '@/components/SharedUI';
import { Plus, BookOpen, Users, BarChart } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  const coursesCount = await prisma.course.count();
  const studentsCount = await prisma.user.count({ where: { role: 'STUDENT' } });

  return (
    <div className="p-8 space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <Badge className="mb-4">Admin Dashboard</Badge>
          <h1 className="text-4xl font-light uppercase tracking-tighter">Gestion du <span className="font-serif italic text-[var(--emerald-deep)]">Protocole.</span></h1>
        </div>
        <Link href="/admin/courses/new">
          <SophisticatedButton className="py-3 px-6">
            <Plus className="w-4 h-4 mr-2" /> Nouveau Cours
          </SophisticatedButton>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 glass-card rounded-3xl border border-[var(--border-subtle)] space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--emerald-deep)]/5 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-[var(--emerald-deep)]" />
          </div>
          <div>
            <div className="text-3xl font-black">{coursesCount}</div>
            <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Cours Actifs</div>
          </div>
        </div>

        <div className="p-8 glass-card rounded-3xl border border-[var(--border-subtle)] space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--gold-vivid)]/5 flex items-center justify-center">
            <Users className="w-6 h-6 text-[var(--gold-vivid)]" />
          </div>
          <div>
            <div className="text-3xl font-black">{studentsCount}</div>
            <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Étudiants Inscrits</div>
          </div>
        </div>

        <div className="p-8 glass-card rounded-3xl border border-[var(--border-subtle)] space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/5 flex items-center justify-center">
            <BarChart className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <div className="text-3xl font-black">--</div>
            <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Taux de Succès</div>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-[2.5rem] border border-[var(--border-subtle)] overflow-hidden">
        <div className="p-8 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 flex justify-between items-center">
          <h2 className="text-xl font-bold uppercase tracking-tight">Formations Actives</h2>
          <Link href="/admin/courses" className="text-[10px] font-black uppercase tracking-widest text-[var(--emerald-deep)] hover:text-[var(--gold-vivid)] transition-all">
            Voir tout
          </Link>
        </div>
        <div className="p-8">
          {coursesCount === 0 ? (
            <p className="text-sm opacity-40 italic">Aucune formation créée pour le moment.</p>
          ) : (
            <div className="space-y-4">
              {/* On récupère les cours pour les afficher ici */}
              {(await prisma.course.findMany({ take: 5, orderBy: { updatedAt: 'desc' } })).map(course => (
                <div key={course.id} className="flex items-center justify-between p-4 hover:bg-[var(--bg-secondary)] rounded-2xl transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--emerald-deep)]/5 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-[var(--emerald-deep)]" />
                    </div>
                    <span className="font-bold text-sm uppercase tracking-tight">{course.title}</span>
                  </div>
                  <Link href={`/admin/courses/${course.id}`}>
                    <button className="text-[10px] font-black uppercase tracking-widest text-[var(--gold-vivid)]">Gérer</button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

