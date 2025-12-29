'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ 
      callbackUrl: '/',
      redirect: true 
    });
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

