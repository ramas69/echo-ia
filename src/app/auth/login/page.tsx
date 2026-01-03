'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Badge, SophisticatedButton } from '@/components/SharedUI';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMagicLink, setShowMagicLink] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('error') === 'confirmation_failed') {
      setError('La confirmation de votre email a échoué. Veuillez réessayer.');
    }
  }, [searchParams]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signInError) {
        setError('Erreur lors de la connexion avec Google.');
      }
    } catch (err) {
      setError('Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
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
        const { data: userData, error: userError } = await supabase
          .from('User')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (userError) {
          setError('Erreur lors de la récupération du profil.');
          return;
        }

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

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: magicLinkError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (magicLinkError) {
        setError('Erreur lors de l\'envoi du lien magique.');
        return;
      }

      setMagicLinkSent(true);
    } catch (err) {
      setError('Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  if (magicLinkSent) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-6 mesh-gradient">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass-card p-12 rounded-[2.5rem] shadow-2xl border border-emerald-500/20 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
          </motion.div>
          
          <Badge className="mb-6 bg-emerald-50 text-emerald-700 border-emerald-200">Lien envoyé</Badge>
          
          <h1 className="text-2xl font-light uppercase tracking-tighter mb-4">
            VÉRIFIEZ VOTRE <br /><span className="font-serif italic text-[var(--emerald-deep)]">BOÎTE EMAIL.</span>
          </h1>
          
          <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
            Un lien de connexion a été envoyé à <br />
            <span className="font-bold text-[var(--emerald-deep)]">{email}</span>
          </p>
          
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
            <p className="text-xs text-amber-800 leading-relaxed">
              📧 Cliquez sur le lien dans l'email pour vous connecter.<br />
              💡 Pensez à vérifier vos <span className="font-bold">spams</span> !<br />
              ⏱️ Le lien expire dans <span className="font-bold">1 heure</span>.
            </p>
          </div>

          <button
            onClick={() => {
              setMagicLinkSent(false);
              setShowMagicLink(false);
            }}
            className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--emerald-deep)] transition-colors font-bold"
          >
            ← Retour aux options de connexion
          </button>
        </motion.div>
      </div>
    );
  }

  if (showMagicLink) {
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
            <Badge className="mb-6">Magic Link</Badge>
            <h1 className="text-3xl font-light uppercase tracking-tighter mb-2">
              CONNEXION <br /><span className="font-serif italic text-[var(--emerald-deep)]">INSTANTANÉE.</span>
            </h1>
            <p className="text-xs text-[var(--text-secondary)] uppercase tracking-[0.2em]">
              Sans mot de passe.
            </p>
          </div>

          <form onSubmit={handleMagicLink} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--emerald-deep)]/60">
                Votre email
              </label>
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
              <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
                Recevez un lien de connexion par email. Aucun mot de passe requis.
              </p>
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
              <span>{loading ? 'Envoi en cours...' : 'Envoyer le lien magique'}</span>
              <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
            </SophisticatedButton>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => setShowMagicLink(false)}
              className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--emerald-deep)] transition-colors font-bold"
            >
              ← Autres options de connexion
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

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

        {/* OAuth Google */}
        <div className="mb-8">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white border-2 border-[var(--border-subtle)] hover:border-[var(--emerald-deep)] rounded-2xl py-4 px-6 flex items-center justify-center gap-3 transition-all group hover:shadow-lg disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-sm font-bold text-gray-700 group-hover:text-[var(--emerald-deep)] transition-colors">
              Continuer avec Google
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--border-subtle)]"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#FDFCFB] px-4 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">
              Ou
            </span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handlePasswordLogin} className="space-y-6">
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
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--emerald-deep)]/60">Mot de passe</label>
              <Link 
                href="/auth/forgot-password"
                className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--gold-vivid)] transition-colors font-bold"
              >
                Oublié ?
              </Link>
            </div>
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

        {/* Magic Link Button */}
        <div className="mt-6">
          <button
            onClick={() => setShowMagicLink(true)}
            className="w-full bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 hover:border-purple-300 rounded-2xl py-3 px-6 flex items-center justify-center gap-2 transition-all group hover:shadow-md"
          >
            <Sparkles className="w-4 h-4 text-purple-500 group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
              Connexion par email (Magic Link)
            </span>
          </button>
        </div>

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
