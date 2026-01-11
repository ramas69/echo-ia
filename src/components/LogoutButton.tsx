'use client';

import React from 'react';
import { LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    // Use window.location for a hard refresh to ensure all cookies and local states are cleared
    window.location.href = '/';
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-[var(--text-secondary)] hover:text-red-500 font-bold text-[10px] uppercase tracking-widest transition-all group w-full cursor-pointer"
    >
      <LogOut className="w-4 h-4" />
      Se déconnecter
    </button>
  );
}
