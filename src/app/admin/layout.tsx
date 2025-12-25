import React from 'react';
import { Badge } from '@/components/SharedUI';
import { LayoutDashboard, BookOpen, Users, Settings, LogOut, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FDFCFB] flex">
      {/* Admin Sidebar */}
      <aside className="w-80 border-r border-[var(--border-subtle)] bg-white flex flex-col p-8 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-8 h-8 bg-[var(--emerald-deep)] rounded-full" />
          <span className="font-black tracking-[0.4em] text-[10px] uppercase text-[var(--emerald-deep)]">L'ÉCHO IA // ADMIN</span>
        </div>

        <nav className="flex-grow space-y-2">
          <Link href="/admin" className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--emerald-deep)] text-white font-bold text-xs uppercase tracking-widest transition-all">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/admin/courses" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] font-bold text-xs uppercase tracking-widest transition-all group">
            <BookOpen className="w-4 h-4 group-hover:text-[var(--emerald-deep)]" /> Cours
          </Link>
          <Link href="/admin/students" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] font-bold text-xs uppercase tracking-widest transition-all group">
            <Users className="w-4 h-4 group-hover:text-[var(--emerald-deep)]" /> Étudiants
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] font-bold text-xs uppercase tracking-widest transition-all group">
            <Settings className="w-4 h-4 group-hover:text-[var(--emerald-deep)]" /> Paramètres
          </Link>
        </nav>

        <div className="pt-8 border-t border-[var(--border-subtle)] space-y-2">
          <Link href="/" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] font-bold text-xs uppercase tracking-widest transition-all group">
            <ArrowLeft className="w-4 h-4 group-hover:text-[var(--emerald-deep)]" /> Retour Site
          </Link>
          <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-red-50 text-red-500 font-bold text-xs uppercase tracking-widest transition-all group">
            <LogOut className="w-4 h-4" /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow bg-[var(--bg-secondary)]/30 overflow-auto">
        {children}
      </main>
    </div>
  );
}

