'use client';

import React, { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Badge, SophisticatedButton } from '@/components/SharedUI';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('🔐 Tentative de connexion pour:', email);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      console.log('📥 Résultat signIn:', result);

      if (result?.error) {
        console.log('❌ Erreur de connexion:', result.error);
        setError('Identifiants invalides.');
      } else {
        console.log('✅ Connexion réussie, récupération de la session...');
        // Récupérer la session pour obtenir le rôle de l'utilisateur
        const session = await getSession();
        console.log('👤 Session récupérée:', session);
        const userRole = session?.user?.role;
        
        // Redirection selon le rôle
        const redirectUrl = userRole === 'ADMIN' ? "/admin" : "/academie";
        console.log('🔄 Redirection vers:', redirectUrl);
        
        if (userRole === 'ADMIN') {
          window.location.href = "/admin";
        } else {
          window.location.href = "/academie";
        }
      }
    } catch (err) {
      console.error('💥 Exception lors de la connexion:', err);
      setError('Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-6 mesh-gradient">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-card p-12 rounded-[2.5rem] shadow-2xl border border-[var(--gold-vivid)]/20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sparkles className="w-16 h-16 text-[var(--gold-vivid)]" />
        </div>

        <div className="text-center mb-10">
          <Badge className="mb-6">Connexion Membre</Badge>
          <h1 className="text-3xl font-light uppercase tracking-tighter mb-2">
            RETOUR DANS <br /><span className="font-serif italic text-[var(--emerald-deep)]">L'ÉCHO.</span>
          </h1>
          <p className="text-xs text-[var(--text-secondary)] uppercase tracking-[0.2em]">Reprenez votre protocole.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--emerald-deep)]/60">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--emerald-deep)]/30 group-focus-within:text-[var(--gold-vivid)] transition-colors" />
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[var(--gold-vivid)] transition-all"
                placeholder="votre@email.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--emerald-deep)]/60">Mot de passe</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--emerald-deep)]/30 group-focus-within:text-[var(--gold-vivid)] transition-colors" />
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[var(--gold-vivid)] transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">{error}</p>}

          <SophisticatedButton 
            type="submit" 
            disabled={loading}
            className="w-full justify-center py-5"
          >
            {loading ? 'Connexion...' : 'Entrer dans l\'Espace'}
          </SophisticatedButton>
        </form>

        <div className="mt-10 text-center space-y-4">
          <p className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
            Pas encore membre ? <Link href="/auth/register" className="text-[var(--emerald-deep)] font-black hover:text-[var(--gold-vivid)] transition-colors">Postuler ici</Link>
          </p>
          <p className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
            Déjà connecté ? <Link href="/auth/logout" className="text-red-500 font-black hover:text-red-600 transition-colors">Se déconnecter d'abord</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

