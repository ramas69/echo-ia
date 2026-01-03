'use client';

import React from 'react';
import { LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-[var(--text-secondary)] hover:text-red-500 font-bold text-[10px] uppercase tracking-widest transition-all group w-full"
    >
      <LogOut className="w-4 h-4" /> 
      Se déconnecter
    </button>
  );
}
