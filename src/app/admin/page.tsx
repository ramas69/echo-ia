import React from 'react';
import prisma from "@/lib/prisma";
import { Badge } from '@/components/SharedUI';
import { 
  Users, 
  Activity, 
  AlertTriangle, 
  TrendingUp, 
  Clock,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default async function AdminCockpit() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // ÉTAPE 2 : REQUÊTES D'AGRÉGATION
  
  // Tous les étudiants
  const students = await prisma.user.findMany({
    where: { role: 'STUDENT' },
    include: {
      progress: {
        orderBy: { completedAt: 'desc' },
        take: 1,
        include: { unit: { include: { phase: true } } }
      }
    }
  });

  const totalStudents = students.length;

  // Filtrage Actifs vs Inactifs (basé sur la dernière unité terminée)
  const activeUsers = students.filter(s => 
    s.progress.length > 0 && 
    s.progress[0].completedAt && 
    s.progress[0].completedAt >= sevenDaysAgo
  );

  const inactiveUsers = students.filter(s => 
    s.progress.length === 0 || 
    (s.progress[0].completedAt && s.progress[0].completedAt < sevenDaysAgo)
  );

  // Radar de décrochage : Inactifs depuis > 7 jours, triés par les plus anciens
  const atRiskUsers = [...inactiveUsers].sort((a, b) => {
    const dateA = a.progress[0]?.completedAt?.getTime() || 0;
    const dateB = b.progress[0]?.completedAt?.getTime() || 0;
    return dateA - dateB;
  }).slice(0, 10);

  return (
    <div className="p-10 space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <Badge className="mb-4">Dashboard de Surveillance</Badge>
          <h1 className="text-4xl font-light uppercase tracking-tighter">Cockpit // <span className="font-serif italic text-[var(--emerald-deep)]">Santé du Système.</span></h1>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-3 bg-white border border-[var(--border-subtle)] rounded-2xl flex flex-col">
            <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Statut Serveur</span>
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> OPÉRATIONNEL
            </span>
          </div>
        </div>
      </header>

      {/* KPIs de Flux */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-8 bg-white border border-[var(--border-subtle)] rounded-[2rem] space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[var(--emerald-deep)]/5 flex items-center justify-center">
            <Users className="w-5 h-5 text-[var(--emerald-deep)]" />
          </div>
          <div>
            <div className="text-3xl font-black tracking-tighter">{totalStudents}</div>
            <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Élèves Totaux</div>
          </div>
        </div>

        <div className="p-8 bg-white border border-[var(--border-subtle)] rounded-[2rem] space-y-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/5 flex items-center justify-center">
            <Activity className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <div className="text-3xl font-black tracking-tighter text-emerald-600">{activeUsers.length}</div>
            <div className="text-[10px] font-black uppercase tracking-widest opacity-40 text-emerald-600/60">Actifs (7j)</div>
          </div>
        </div>

        <div className="p-8 bg-white border border-[var(--border-subtle)] rounded-[2rem] space-y-4">
          <div className="w-10 h-10 rounded-xl bg-orange-500/5 flex items-center justify-center">
            <Clock className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <div className="text-3xl font-black tracking-tighter text-orange-600">{inactiveUsers.length}</div>
            <div className="text-[10px] font-black uppercase tracking-widest opacity-40 text-orange-600/60">Inactifs (+7j)</div>
          </div>
        </div>

        <div className="p-8 bg-white border border-[var(--border-subtle)] rounded-[2rem] space-y-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/5 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <div className="text-3xl font-black tracking-tighter text-blue-600">
              {totalStudents > 0 ? Math.round((activeUsers.length / totalStudents) * 100) : 0}%
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest opacity-40 text-blue-600/60">Taux d'Engagement</div>
          </div>
        </div>
      </div>

      {/* Widget : RADAR DE DÉCROCHAGE */}
      <div className="bg-white border border-[var(--border-subtle)] rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-bold uppercase tracking-tight">Radar de Décrochage <span className="text-[10px] ml-2 opacity-40 font-normal tracking-widest">(Priorité Relance)</span></h2>
          </div>
          <Link href="/admin/users?filter=inactive" className="text-[10px] font-black uppercase tracking-widest text-[var(--emerald-deep)] hover:text-[var(--gold-vivid)] transition-colors">
            Voir tous les inactifs
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg-secondary)]/10">
                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest opacity-40">Utilisateur</th>
                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest opacity-40">Dernière Activité</th>
                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest opacity-40">Position Actuelle</th>
                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest opacity-40 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {atRiskUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-sm opacity-40 italic">
                    Aucun utilisateur en décrochage détecté. Le flux est optimal.
                  </td>
                </tr>
              ) : (
                atRiskUsers.map((user) => {
                  const lastProgress = user.progress[0];
                  const daysInactive = lastProgress?.completedAt 
                    ? Math.floor((new Date().getTime() - lastProgress.completedAt.getTime()) / (1000 * 3600 * 24))
                    : '∞';

                  return (
                    <tr key={user.id} className="hover:bg-[var(--bg-secondary)]/20 transition-colors">
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
                      <td className="px-8 py-6">
                        <div className={cn(
                          "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                          daysInactive === '∞' ? "bg-red-500/10 text-red-600" : "bg-orange-500/10 text-orange-600"
                        )}>
                          {daysInactive === '∞' ? "Jamais commencé" : `Inactif depuis ${daysInactive} jours`}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        {lastProgress ? (
                          <div>
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-40">{lastProgress.unit.phase.title}</div>
                            <div className="text-xs font-bold">{lastProgress.unit.title}</div>
                          </div>
                        ) : (
                          <span className="text-xs opacity-40 italic">N/A</span>
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
