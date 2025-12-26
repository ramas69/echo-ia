import React from 'react';
import prisma from "@/lib/prisma";
import { Badge } from '@/components/SharedUI';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  Mail, 
  Calendar,
  Zap,
  Clock,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ClientOnlyDate } from '@/components/ClientOnlyDate';

export default async function UserDetailPage({ 
  params 
}: { 
  params: Promise<{ userId: string }> 
}) {
  const { userId } = await params;
  
  // ÉTAPE 4 : RÉCUPÉRATION DES DONNÉES UTILISATEUR ET PROGRESSION
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      progress: {
        include: { unit: true }
      }
    }
  });

  if (!user) notFound();

  // Récupération de tout le curriculum pour la timeline
  const curriculum = await prisma.phase.findMany({
    orderBy: { orderIndex: 'asc' },
    include: {
      units: {
        orderBy: { orderIndex: 'asc' }
      }
    }
  });

  const totalUnits = curriculum.reduce((acc, phase) => acc + phase.units.length, 0);
  const completedCount = user.progress.length;
  const progressPercent = totalUnits > 0 ? Math.round((completedCount / totalUnits) * 100) : 0;

  return (
    <div className="p-10 space-y-12">
      <Link 
        href="/admin/users" 
        className="flex items-center gap-2 group text-[10px] font-black uppercase tracking-[0.3em] text-[var(--emerald-deep)]/60 hover:text-[var(--emerald-deep)] transition-colors"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Retour à l'annuaire
      </Link>

      {/* Header : Infos de base */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex items-center gap-8">
          <div className="w-24 h-24 rounded-full bg-[var(--emerald-deep)] text-white flex items-center justify-center text-4xl font-black shadow-xl">
            {user.name?.charAt(0) || user.email?.charAt(0)}
          </div>
          <div className="space-y-3">
            <Badge className="border-[var(--gold-vivid)]/30">Rayons X Utilisateur</Badge>
            <h1 className="text-4xl font-light uppercase tracking-tighter leading-none">{user.name || "Élève Anonyme"}</h1>
            <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-widest opacity-40">
              <span className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> {user.email}</span>
              <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Inscrit le <ClientOnlyDate date={user.createdAt} /></span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[var(--border-subtle)] p-6 rounded-[2rem] flex items-center gap-8">
          <div className="text-center">
            <div className="text-3xl font-black text-[var(--emerald-deep)]">{progressPercent}%</div>
            <div className="text-[9px] font-black uppercase tracking-widest opacity-40">Progression</div>
          </div>
          <div className="w-px h-12 bg-[var(--border-subtle)]" />
          <div className="text-center">
            <div className="text-3xl font-black text-[var(--gold-vivid)]">{completedCount}</div>
            <div className="text-[9px] font-black uppercase tracking-widest opacity-40">Unités Faites</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Timeline de Progression Automatique */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold uppercase tracking-tight">Timeline du Protocole</h2>
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest opacity-40">
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Fait</div>
              <div className="flex items-center gap-1.5"><Circle className="w-3 h-3" /> À faire</div>
            </div>
          </div>

          <div className="space-y-6">
            {curriculum.map((phase) => (
              <div key={phase.id} className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center text-xs font-black border border-[var(--border-subtle)]">
                    0{phase.orderIndex}
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-tight text-[var(--emerald-deep)]">{phase.title}</h3>
                </div>

                <div className="ml-5 border-l-2 border-[var(--border-subtle)] pl-10 space-y-4">
                  {phase.units.map((unit) => {
                    const progressEntry = user.progress.find(p => p.unitId === unit.id);
                    const isDone = !!progressEntry;

                    return (
                      <div key={unit.id} className={cn(
                        "relative p-6 rounded-2xl border transition-all flex items-center justify-between group",
                        isDone 
                          ? "bg-white border-[var(--gold-vivid)]/20 shadow-sm" 
                          : "bg-transparent border-dashed border-[var(--border-subtle)] opacity-40"
                      )}>
                        {/* Dot on the line */}
                        <div className={cn(
                          "absolute -left-[45px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 bg-white transition-colors",
                          isDone ? "border-[var(--gold-vivid)] bg-[var(--gold-vivid)]" : "border-[var(--border-subtle)]"
                        )} />

                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center text-[10px] font-black">
                            {phase.orderIndex}.{unit.orderIndex}
                          </div>
                          <div>
                            <div className="text-xs font-bold uppercase tracking-tight">{unit.title}</div>
                            {isDone && (
                              <div className="text-[9px] font-black uppercase tracking-widest text-[var(--gold-vivid)] mt-1 flex items-center gap-1.5">
                                <Clock className="w-3 h-3" /> Complété le <ClientOnlyDate date={progressEntry.completedAt!} />
                              </div>
                            )}
                          </div>
                        </div>

                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <Circle className="w-5 h-5 opacity-20" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar : Contexte & Métriques */}
        <div className="space-y-8">
          <div className="p-8 bg-white border border-[var(--border-subtle)] rounded-[2.5rem] space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Journal de Bord</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-[9px] font-black uppercase tracking-widest opacity-30">Dernière Connexion</div>
                <div className="text-xs font-bold">Inconnue (via NextAuth)</div>
              </div>
              <div className="space-y-2">
                <div className="text-[9px] font-black uppercase tracking-widest opacity-30">Vitesse de Progression</div>
                <div className="text-xs font-bold">
                  {completedCount > 0 ? `${Math.round(completedCount / 1)} unités / jour` : "Non démarré"}
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-[var(--emerald-deep)] rounded-[2.5rem] text-white space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Zap className="w-20 h-20 text-[var(--gold-vivid)]" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight relative z-10 italic">Besoin d'intervention ?</h3>
            <p className="text-xs text-white/60 leading-relaxed relative z-10">
              Si la progression est nulle depuis plus de 15 jours, un email automatique de relance a déjà été envoyé par le système externe.
            </p>
            <div className="space-y-3 relative z-10">
              <a 
                href={`mailto:${user.email}`} 
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-[var(--gold-vivid)] text-[var(--emerald-deep)] font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all"
              >
                Envoyer un message direct <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

