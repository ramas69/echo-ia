'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge, SophisticatedButton } from '@/components/SharedUI';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Sparkles, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-client';
import { registerSchema } from '@/lib/validation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Validation stricte des données
      const validationResult = registerSchema.safeParse({
        email: email.trim(),
        password,
        name: name.trim(),
      });

      if (!validationResult.success) {
        // Récupérer le premier message d'erreur
        const firstError = validationResult.error.issues[0];
        setError(firstError.message);
        setLoading(false);
        return;
      }

      // Données validées
      const { email: validEmail, password: validPassword, name: validName } = validationResult.data;

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: validEmail,
        password: validPassword,
        options: {
          data: {
            name: validName,
            role: 'STUDENT',
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) {
        setError(signUpError.message === 'User already registered' 
          ? 'Cet email est déjà utilisé.'
          : 'Erreur lors de l\'inscription.');
        return;
      }

      if (data.user) {
        setSuccess(true);
      }
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
          
          <Badge className="mb-6 bg-emerald-50 text-emerald-700 border-emerald-200">Inscription réussie</Badge>
          
          <h1 className="text-2xl font-light uppercase tracking-tighter mb-4">
            VÉRIFIEZ VOTRE <br /><span className="font-serif italic text-[var(--emerald-deep)]">BOÎTE EMAIL.</span>
          </h1>
          
          <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
            Un email de confirmation a été envoyé à <br />
            <span className="font-bold text-[var(--emerald-deep)]">{email}</span>
          </p>
          
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
            <p className="text-xs text-amber-800 leading-relaxed">
              📧 Cliquez sur le lien dans l'email pour activer votre compte.<br />
              💡 Pensez à vérifier vos <span className="font-bold">spams</span> !
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
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sparkles className="w-16 h-16 text-[var(--gold-vivid)]" />
        </div>

        <div className="text-center mb-10">
          <Badge className="mb-6">Candidature</Badge>
          <h1 className="text-3xl font-light uppercase tracking-tighter mb-2">
            REJOINDRE <br /><span className="font-serif italic text-[var(--emerald-deep)]">L'ACADÉMIE.</span>
          </h1>
          <p className="text-xs text-[var(--text-secondary)] uppercase tracking-[0.2em]">Créez votre profil membre.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--emerald-deep)]/60">Nom complet</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--emerald-deep)]/30 group-focus-within:text-[var(--gold-vivid)] transition-colors" />
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[var(--gold-vivid)] transition-all"
                placeholder="Jean Dupont"
              />
            </div>
          </div>

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
            {loading ? 'Création...' : 'Devenir Membre'}
          </SophisticatedButton>
        </form>

        <div className="mt-10 text-center">
          <p className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
            Déjà membre ? <Link href="/auth/login" className="text-[var(--emerald-deep)] font-black hover:text-[var(--gold-vivid)] transition-colors">Se connecter</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

