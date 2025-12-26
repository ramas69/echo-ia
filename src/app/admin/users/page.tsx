import React from 'react';
import prisma from "@/lib/prisma";
import { Badge } from '@/components/SharedUI';
import { 
  Users, 
  Search, 
  Filter, 
  ChevronRight, 
  ArrowUpRight,
  Circle
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ClientOnlyDate } from '@/components/ClientOnlyDate';

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; search?: string }>;
}) {
  const { filter, search } = await searchParams;
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Récupération de tous les étudiants avec leur dernière activité
  const students = await prisma.user.findMany({
    where: { 
      role: 'STUDENT',
      OR: search ? [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ] : undefined,
    },
    include: {
      progress: {
        orderBy: { completedAt: 'desc' },
        take: 1,
        include: { unit: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  // Filtrage manuel côté serveur pour la logique "Active/Inactive" complexe
  const filteredStudents = students.filter(s => {
    if (filter === 'active') {
      return s.progress.length > 0 && s.progress[0].completedAt && s.progress[0].completedAt >= sevenDaysAgo;
    }
    if (filter === 'inactive') {
      return s.progress.length === 0 || (s.progress[0].completedAt && s.progress[0].completedAt < sevenDaysAgo);
    }
    return true;
  });

  return (
    <div className="p-10 space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <Badge className="mb-4">Annuaire Membres</Badge>
          <h1 className="text-4xl font-light uppercase tracking-tighter">Liste des <span className="font-serif italic text-[var(--emerald-deep)]">Élèves.</span></h1>
        </div>
      </header>

      {/* Barre d'actions & Filtres */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex gap-4">
          <Link 
            href="/admin/users" 
            className={cn(
              "px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
              !filter ? "bg-[var(--emerald-deep)] text-white" : "bg-white border border-[var(--border-subtle)]"
            )}
          >
            Tous ({students.length})
          </Link>
          <Link 
            href="/admin/users?filter=active" 
            className={cn(
              "px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
              filter === 'active' ? "bg-emerald-500 text-white" : "bg-white border border-[var(--border-subtle)] text-emerald-600"
            )}
          >
            Actifs ({students.filter(s => s.progress.length > 0 && s.progress[0].completedAt && s.progress[0].completedAt >= sevenDaysAgo).length})
          </Link>
          <Link 
            href="/admin/users?filter=inactive" 
            className={cn(
              "px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
              filter === 'inactive' ? "bg-orange-500 text-white" : "bg-white border border-[var(--border-subtle)] text-orange-600"
            )}
          >
            Inactifs ({students.filter(s => s.progress.length === 0 || (s.progress[0].completedAt && s.progress[0].completedAt < sevenDaysAgo)).length})
          </Link>
        </div>

        <form className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20 group-focus-within:opacity-100 transition-opacity" />
          <input 
            name="search"
            defaultValue={search}
            placeholder="Rechercher un élève..."
            className="w-full bg-white border border-[var(--border-subtle)] rounded-full py-2.5 pl-12 pr-4 text-[11px] font-bold focus:outline-none focus:border-[var(--emerald-deep)] transition-all"
          />
        </form>
      </div>

      {/* Table de données */}
      <div className="bg-white border border-[var(--border-subtle)] rounded-[2.5rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg-secondary)]/10">
                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest opacity-40">Identité</th>
                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest opacity-40">Inscription</th>
                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest opacity-40">Statut Activité</th>
                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest opacity-40">Dernière Action</th>
                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest opacity-40 text-right">Profil</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-sm opacity-40 italic">
                    Aucun élève ne correspond à ces critères.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((user) => {
                  const lastProgress = user.progress[0];
                  const isActive = lastProgress?.completedAt && lastProgress.completedAt >= sevenDaysAgo;

                  return (
                    <tr key={user.id} className="hover:bg-[var(--bg-secondary)]/20 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-[var(--emerald-deep)]/5 flex items-center justify-center font-bold text-xs text-[var(--emerald-deep)]">
                            {user.name?.charAt(0) || user.email?.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-bold uppercase tracking-tight">{user.name || "Anonyme"}</div>
                            <div className="text-[10px] opacity-40">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-xs font-medium opacity-60">
                        <ClientOnlyDate date={user.createdAt} />
                      </td>
                      <td className="px-8 py-6">
                        <div className={cn(
                          "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                          isActive ? "bg-emerald-500/10 text-emerald-600" : "bg-orange-500/10 text-orange-600"
                        )}>
                          <Circle className={cn("w-1.5 h-1.5 fill-current", isActive ? "text-emerald-500" : "text-orange-500")} />
                          {isActive ? "Actif" : "Inactif"}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        {lastProgress ? (
                          <div className="max-w-[200px]">
                            <div className="text-[9px] font-black uppercase tracking-widest opacity-40">
                              <ClientOnlyDate date={lastProgress.completedAt!} />
                            </div>
                            <div className="text-[11px] font-bold truncate">{lastProgress.unit.title}</div>
                          </div>
                        ) : (
                          <span className="text-xs opacity-40 italic">Aucune activité</span>
                        )}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <Link href={`/admin/users/${user.id}`}>
                          <button className="p-3 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--emerald-deep)] hover:text-white transition-all">
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

