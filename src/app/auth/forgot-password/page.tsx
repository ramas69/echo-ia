'use client';

import React, { useState } from 'react';
import { Badge, SophisticatedButton } from '@/components/SharedUI';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (resetError) {
        setError('Erreur lors de l\'envoi de l\'email.');
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError('Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-6 mesh-gradient">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass-card p-12 rounded-[2.5rem] shadow-2xl border border-emerald-500/20 relative overflow-hidden text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
          </motion.div>
          
          <Badge className="mb-6 bg-emerald-50 text-emerald-700 border-emerald-200">Email envoyé</Badge>
          
          <h1 className="text-2xl font-light uppercase tracking-tighter mb-4">
            VÉRIFIEZ VOTRE <br /><span className="font-serif italic text-[var(--emerald-deep)]">BOÎTE EMAIL.</span>
          </h1>
          
          <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
            Un email de réinitialisation a été envoyé à <br />
            <span className="font-bold text-[var(--emerald-deep)]">{email}</span>
          </p>
          
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
            <p className="text-xs text-amber-800 leading-relaxed">
              📧 Cliquez sur le lien dans l'email pour réinitialiser votre mot de passe.<br />
              💡 Pensez à vérifier vos <span className="font-bold">spams</span> !<br />
              ⏱️ Le lien expire dans <span className="font-bold">1 heure</span>.
            </p>
          </div>

          <Link href="/auth/login">
            <SophisticatedButton className="w-full justify-center">
              Retour à la connexion
            </SophisticatedButton>
          </Link>
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
          <Badge className="mb-6">Récupération</Badge>
          <h1 className="text-3xl font-light uppercase tracking-tighter mb-2">
            MOT DE PASSE <br /><span className="font-serif italic text-[var(--emerald-deep)]">OUBLIÉ ?</span>
          </h1>
          <p className="text-xs text-[var(--text-secondary)] uppercase tracking-[0.2em]">
            Nous allons vous aider.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              Entrez l'email associé à votre compte. Nous vous enverrons un lien pour réinitialiser votre mot de passe.
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
            className="w-full justify-center py-5"
          >
            {loading ? 'Envoi en cours...' : 'Envoyer le lien'}
          </SophisticatedButton>
        </form>

        <div className="mt-10 text-center space-y-4">
          <Link 
            href="/auth/login"
            className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--emerald-deep)] transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            Retour à la connexion
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

