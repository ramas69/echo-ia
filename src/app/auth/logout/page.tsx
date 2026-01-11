'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase-client';

export default function LogoutPage() {
    useEffect(() => {
        const handleLogout = async () => {
            const supabase = createClient();
            await supabase.auth.signOut();
            window.location.href = '/';
        };
        handleLogout();
    }, []);

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-[var(--gold-vivid)] border-t-transparent rounded-full animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--emerald-deep)]">
                    Déconnexion en cours...
                </p>
            </div>
        </div>
    );
}
