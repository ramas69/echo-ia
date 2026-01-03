'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Badge, SophisticatedButton } from '@/components/SharedUI';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [validToken, setValidToken] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Vérifier qu'on a bien un token de récupération
    const checkToken = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setValidToken(true);
      } else {
        setError('Lien de réinitialisation invalide ou expiré.');
      }
    };
    checkToken();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      setLoading(false);
      return;
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        setError('Erreur lors de la mise à jour du mot de passe.');
        return;
      }

      setSuccess(true);
      
      // Rediriger vers la connexion après 3 secondes
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    } catch (err) {
      setError('Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  if (!validToken && error) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-6 mesh-gradient">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass-card p-12 rounded-[2.5rem] shadow-2xl border border-red-500/20 text-center"
        >
          <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <Badge className="mb-6 bg-red-50 text-red-700 border-red-200">Lien invalide</Badge>
          <h1 className="text-2xl font-light uppercase tracking-tighter mb-4">
            LIEN <br /><span className="font-serif italic text-red-600">EXPIRÉ.</span>
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
            Ce lien de réinitialisation n'est plus valide ou a déjà été utilisé.
          </p>
          <SophisticatedButton 
            onClick={() => router.push('/auth/forgot-password')}
            className="w-full justify-center"
          >
            Demander un nouveau lien
          </SophisticatedButton>
        </motion.div>
      </div>
    );
  }

  if (success) {
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
          
          <Badge className="mb-6 bg-emerald-50 text-emerald-700 border-emerald-200">Succès</Badge>
          
          <h1 className="text-2xl font-light uppercase tracking-tighter mb-4">
            MOT DE PASSE <br /><span className="font-serif italic text-[var(--emerald-deep)]">MODIFIÉ !</span>
          </h1>
          
          <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
            Votre mot de passe a été modifié avec succès.<br />
            <span className="text-xs">Redirection vers la connexion...</span>
          </p>

          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-[var(--emerald-deep)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-[var(--emerald-deep)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-[var(--emerald-deep)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
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
        <div className="text-center mb-10">
          <Badge className="mb-6">Nouveau mot de passe</Badge>
          <h1 className="text-3xl font-light uppercase tracking-tighter mb-2">
            RÉINITIALISATION <br /><span className="font-serif italic text-[var(--emerald-deep)]">SÉCURISÉE.</span>
          </h1>
          <p className="text-xs text-[var(--text-secondary)] uppercase tracking-[0.2em]">
            Choisissez un nouveau mot de passe.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--emerald-deep)]/60">
              Nouveau mot de passe
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--emerald-deep)]/30 group-focus-within:text-[var(--gold-vivid)] transition-colors" />
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[var(--gold-vivid)] transition-all"
                placeholder="••••••••"
                minLength={6}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--emerald-deep)]/60">
              Confirmer le mot de passe
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--emerald-deep)]/30 group-focus-within:text-[var(--gold-vivid)] transition-colors" />
              <input 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[var(--gold-vivid)] transition-all"
                placeholder="••••••••"
                minLength={6}
              />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <p className="text-xs text-blue-800 leading-relaxed">
              🔒 Votre mot de passe doit contenir au moins <span className="font-bold">6 caractères</span>.
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
            disabled={loading || !validToken}
            className="w-full justify-center py-5"
          >
            {loading ? 'Mise à jour...' : 'Réinitialiser le mot de passe'}
          </SophisticatedButton>
        </form>
      </motion.div>
    </div>
  );
}

