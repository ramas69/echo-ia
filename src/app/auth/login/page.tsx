'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Badge, SophisticatedButton } from '@/components/SharedUI';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Afficher un message si la confirmation a échoué
    if (searchParams.get('error') === 'confirmation_failed') {
      setError('La confirmation de votre email a échoué. Veuillez réessayer.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        if (signInError.message === 'Email not confirmed') {
          setError('Veuillez confirmer votre email avant de vous connecter.');
        } else if (signInError.message === 'Invalid login credentials') {
          setError('Email ou mot de passe incorrect.');
        } else {
          setError('Erreur de connexion.');
        }
        return;
      }

      if (data.user) {
        // Récupérer le rôle depuis la table User
        const { data: userData, error: userError } = await supabase
          .from('User')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (userError) {
          setError('Erreur lors de la récupération du profil.');
          return;
        }

        // Redirection selon le rôle
        if (userData.role === 'ADMIN') {
          router.push('/admin');
        } else {
          router.push('/academie');
        }
      }
    } catch (err) {
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

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-700 leading-relaxed">{error}</p>
            </div>
          )}

          <SophisticatedButton 
            type="submit" 
            disabled={loading}
            className="w-full justify-center py-5 group"
          >
            <span>{loading ? 'Connexion...' : 'Entrer dans l\'Académie'}</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </SophisticatedButton>
        </form>

        <div className="mt-10 text-center space-y-4">
          <p className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
            Pas encore membre ? <Link href="/auth/register" className="text-[var(--emerald-deep)] font-black hover:text-[var(--gold-vivid)] transition-colors">Rejoindre</Link>
          </p>
          
          <div className="pt-4 border-t border-[var(--border-subtle)]">
            <Link href="/" className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--emerald-deep)] transition-colors">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
