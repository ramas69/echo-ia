'use client';

import React, { useState } from 'react';
import { Badge, SophisticatedButton } from '@/components/SharedUI';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Shield, TrendingUp, Clock, CheckCircle, AlertCircle, Save, Eye, EyeOff } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';
import { validateName, validatePassword } from '@/lib/validation';

interface ParametresClientProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
  stats: {
    totalUnits: number;
    completedUnits: number;
    progressPercent: number;
    totalMinutes: number;
  };
}

export default function ParametresClient({ user, stats }: ParametresClientProps) {
  const [name, setName] = useState(user.name);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Valider le nom
    const nameValidation = validateName(name);
    if (!nameValidation.success) {
      setError(nameValidation.error);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Erreur lors de la mise à jour');
        return;
      }

      setSuccess('Profil mis à jour avec succès !');
      setTimeout(() => {
        router.refresh();
      }, 1500);
    } catch (err: any) {
      setError('Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Valider le nouveau mot de passe
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.success) {
      setError(passwordValidation.error);
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      
      // Réauthentifier avec le mot de passe actuel
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

      if (signInError) {
        setError('Mot de passe actuel incorrect.');
        return;
      }

      // Mettre à jour le mot de passe
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setError('Erreur lors de la mise à jour du mot de passe.');
        return;
      }

      setSuccess('Mot de passe modifié avec succès !');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError('Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] mesh-gradient">
      {/* Header */}
      <div className="border-b border-[var(--border-subtle)] bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <Badge className="mb-2">Paramètres</Badge>
            <h1 className="text-2xl font-light uppercase tracking-tighter">
              MON <span className="font-serif italic text-[var(--emerald-deep)]">PROFIL.</span>
            </h1>
          </div>
          <button
            onClick={() => router.push('/academie')}
            className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--emerald-deep)] transition-colors font-bold"
          >
            ← Retour à l'académie
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Statistiques */}
          <div className="lg:col-span-1 space-y-6">
            {/* Carte Progression */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 rounded-[2rem] border border-[var(--border-subtle)]"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-[var(--emerald-deep)] to-[var(--emerald-vivid)] rounded-2xl">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">Progression</p>
                  <p className="text-2xl font-light">{stats.progressPercent}%</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Activations</span>
                  <span className="font-bold text-[var(--emerald-deep)]">{stats.completedUnits}/{stats.totalUnits}</span>
                </div>
                <div className="w-full bg-[var(--bg-secondary)] rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[var(--emerald-deep)] to-[var(--emerald-vivid)] transition-all duration-500"
                    style={{ width: `${stats.progressPercent}%` }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Carte Temps Total */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8 rounded-[2rem] border border-[var(--border-subtle)]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">Temps investi</p>
                  <p className="text-2xl font-light">{Math.floor(stats.totalMinutes / 60)}h {stats.totalMinutes % 60}m</p>
                </div>
              </div>
            </motion.div>

            {/* Carte Rôle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 rounded-[2rem] border border-[var(--border-subtle)]"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">Statut</p>
                  <p className="text-lg font-light">{user.role === 'ADMIN' ? 'Administrateur' : 'Étudiant'}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Formulaires */}
          <div className="lg:col-span-2 space-y-8">
            {/* Messages */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-700 leading-relaxed">{success}</p>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-700 leading-relaxed">{error}</p>
              </motion.div>
            )}

            {/* Formulaire Informations Personnelles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-10 rounded-[2.5rem] border border-[var(--border-subtle)]"
            >
              <div className="mb-8">
                <Badge className="mb-4">Informations personnelles</Badge>
                <h2 className="text-xl font-light uppercase tracking-tighter">
                  Modifier mon <span className="font-serif italic text-[var(--emerald-deep)]">identité.</span>
                </h2>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--emerald-deep)]/60">
                    Nom complet
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--emerald-deep)]/30 group-focus-within:text-[var(--gold-vivid)] transition-colors" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[var(--gold-vivid)] transition-all"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--emerald-deep)]/60">
                    Email
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--emerald-deep)]/30" />
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full bg-gray-100 border border-[var(--border-subtle)] rounded-2xl py-4 pl-12 pr-4 text-sm text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-[10px] text-[var(--text-secondary)] italic">
                    L'email ne peut pas être modifié.
                  </p>
                </div>

                <SophisticatedButton
                  type="submit"
                  disabled={loading}
                  className="w-full justify-center py-4 group"
                >
                  <Save className="w-4 h-4 mr-2" />
                  <span>{loading ? 'Enregistrement...' : 'Enregistrer les modifications'}</span>
                </SophisticatedButton>
              </form>
            </motion.div>

            {/* Formulaire Mot de Passe */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-10 rounded-[2.5rem] border border-[var(--border-subtle)]"
            >
              <div className="mb-8">
                <Badge className="mb-4 bg-amber-50 text-amber-700 border-amber-200">Sécurité</Badge>
                <h2 className="text-xl font-light uppercase tracking-tighter">
                  Changer mon <span className="font-serif italic text-[var(--emerald-deep)]">mot de passe.</span>
                </h2>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--emerald-deep)]/60">
                    Mot de passe actuel
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--emerald-deep)]/30 group-focus-within:text-[var(--gold-vivid)] transition-colors" />
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl py-4 pl-12 pr-12 text-sm focus:outline-none focus:border-[var(--gold-vivid)] transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--emerald-deep)] transition-colors"
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--emerald-deep)]/60">
                    Nouveau mot de passe
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--emerald-deep)]/30 group-focus-within:text-[var(--gold-vivid)] transition-colors" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl py-4 pl-12 pr-12 text-sm focus:outline-none focus:border-[var(--gold-vivid)] transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--emerald-deep)] transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--emerald-deep)]/60">
                    Confirmer le nouveau mot de passe
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--emerald-deep)]/30 group-focus-within:text-[var(--gold-vivid)] transition-colors" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl py-4 pl-12 pr-12 text-sm focus:outline-none focus:border-[var(--gold-vivid)] transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--emerald-deep)] transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <p className="text-[10px] text-amber-800 leading-relaxed">
                    <strong>Votre mot de passe doit contenir :</strong><br />
                    • Au moins 8 caractères<br />
                    • Une majuscule et une minuscule<br />
                    • Un chiffre et un caractère spécial
                  </p>
                </div>

                <SophisticatedButton
                  type="submit"
                  disabled={loading}
                  className="w-full justify-center py-4 group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  <span>{loading ? 'Modification...' : 'Changer le mot de passe'}</span>
                </SophisticatedButton>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

