'use client';

import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function LogoutPage() {
  useEffect(() => {
    console.log('🚪 Déconnexion forcée...');
    signOut({ callbackUrl: '/auth/login', redirect: true });
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center">
      <div className="text-center">
        <div className="text-2xl font-light mb-4">Déconnexion en cours...</div>
        <div className="animate-spin w-8 h-8 border-4 border-[var(--emerald-deep)] border-t-transparent rounded-full mx-auto"></div>
      </div>
    </div>
  );
}

