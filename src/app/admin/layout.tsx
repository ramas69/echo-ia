import React from 'react';
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  ArrowLeft, 
  LogOut, 
  Activity,
  Zap,
  ShieldAlert
} from 'lucide-react';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // ÉTAPE 1 : SÉCURITÉ - Vérification du rôle ADMIN
  // @ts-ignore
  if (!session || session.user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex selection:bg-[var(--gold-sand)] selection:text-[var(--emerald-deep)]">
      {/* Sidebar Admin */}
      <aside className="w-72 border-r border-[var(--border-subtle)] bg-white flex flex-col p-6 sticky top-0 h-screen z-50">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-8 h-8 bg-[var(--emerald-deep)] rounded-lg flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-[var(--gold-vivid)]" />
          </div>
          <div className="flex flex-col">
            <span className="font-black tracking-[0.2em] text-[10px] uppercase text-[var(--emerald-deep)]">L'ÉCHO IA</span>
            <span className="text-[8px] font-bold opacity-40 uppercase tracking-widest">Poste de Pilotage</span>
          </div>
        </div>

        <nav className="flex-grow space-y-1">
          <Link href="/admin" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] font-bold text-[11px] uppercase tracking-widest transition-all group">
            <LayoutDashboard className="w-4 h-4 group-hover:text-[var(--emerald-deep)]" /> 
            Cockpit
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] font-bold text-[11px] uppercase tracking-widest transition-all group">
            <Users className="w-4 h-4 group-hover:text-[var(--emerald-deep)]" /> 
            Utilisateurs
          </Link>
          <Link href="/admin/curriculum" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] font-bold text-[11px] uppercase tracking-widest transition-all group">
            <Zap className="w-4 h-4 group-hover:text-[var(--emerald-deep)]" /> 
            Curriculum
          </Link>
        </nav>

        <div className="pt-6 border-t border-[var(--border-subtle)] space-y-1">
          <Link href="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] font-bold text-[10px] uppercase tracking-widest transition-all group">
            <ArrowLeft className="w-4 h-4" /> 
            Quitter l'Admin
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow overflow-auto bg-[#F7F5F2]/30">
        {children}
      </main>
    </div>
  );
}
