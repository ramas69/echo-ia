'use client';

import React, { useState } from 'react';
import { Badge, SophisticatedButton } from '@/components/SharedUI';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Save, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';
import { validateName, validatePassword } from '@/lib/validation';
import DynamicAvatar from '@/components/DynamicAvatar';
import ProgressChart from '@/components/ProgressChart';
import TimeAnalysis from '@/components/TimeAnalysis';
import MilestonesGrid from '@/components/MilestonesGrid';
import NotesTimeline from '@/components/NotesTimeline';
import AIRecommendations from '@/components/AIRecommendations';

interface ParametresClientProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatarSeed: string;
  };
  stats: {
    totalUnits: number;
    completedUnits: number;
    progressPercent: number;
    totalMinutes: number;
  };
  analytics: {
    progressChartData: any[];
    timeInsights: any;
    aiRecommendations: any[];
    milestones: any[];
    notes: any[];
  };
}

export default function ParametresClient({ user, stats, analytics }: ParametresClientProps) {
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
      
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

      if (signInError) {
        setError('Mot de passe actuel incorrect.');
        return;
      }

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
        <div className="max-w-[1800px] mx-auto px-6 py-4 flex items-center justify-between">
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

      <div className="max-w-[1800px] mx-auto px-6 py-12">
        {/* Messages globaux */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3"
          >
            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-emerald-700 leading-relaxed">{success}</p>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-700 leading-relaxed">{error}</p>
          </motion.div>
        )}

        {/* Avatar & Stats Hero */}
        <div className="mb-12">
          <div className="glass-card p-12 rounded-[2.5rem] border border-[var(--border-subtle)] text-center">
            <div className="flex flex-col items-center gap-6">
              <DynamicAvatar
                name={user.name}
                progressPercent={stats.progressPercent}
                seed={user.avatarSeed}
                size={120}
              />
              <div>
                <h2 className="text-3xl font-light uppercase tracking-tight mb-2">{user.name}</h2>
                <p className="text-sm text-[var(--text-secondary)]">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Col 1: Analytics (Col 8) */}
          <div className="xl:col-span-8 space-y-8">
            {/* AI Recommendations */}
            {analytics.aiRecommendations.length > 0 && (
              <AIRecommendations recommendations={analytics.aiRecommendations} />
            )}

            {/* Progress Chart */}
            <ProgressChart 
              data={analytics.progressChartData}
              title="Progression des 7 derniers jours"
            />

            {/* Time Analysis */}
            <TimeAnalysis insights={analytics.timeInsights} />

            {/* Milestones */}
            <MilestonesGrid milestones={analytics.milestones} />

            {/* Notes Timeline */}
            {analytics.notes.length > 0 && (
              <NotesTimeline notes={analytics.notes} />
            )}
          </div>

          {/* Col 2: Forms (Col 4) */}
          <div className="xl:col-span-4 space-y-8">
            {/* Formulaire Profil */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 rounded-[2.5rem] border border-[var(--border-subtle)]"
            >
              <Badge className="mb-4">Informations</Badge>
              <h3 className="text-lg font-light uppercase tracking-tighter mb-6 text-[var(--emerald-deep)]">
                Modifier mon identité
              </h3>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
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
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[var(--gold-vivid)] transition-all"
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
                      className="w-full bg-gray-100 border border-[var(--border-subtle)] rounded-2xl py-3 pl-12 pr-4 text-sm text-gray-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                <SophisticatedButton
                  type="submit"
                  disabled={loading}
                  className="w-full justify-center py-3"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Enregistrement...' : 'Enregistrer'}
                </SophisticatedButton>
              </form>
            </motion.div>

            {/* Formulaire Mot de Passe */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8 rounded-[2.5rem] border border-[var(--border-subtle)]"
            >
              <Badge className="mb-4 bg-amber-50 text-amber-700 border-amber-200">Sécurité</Badge>
              <h3 className="text-lg font-light uppercase tracking-tighter mb-6 text-[var(--emerald-deep)]">
                Changer mot de passe
              </h3>

              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--emerald-deep)]/60">
                    Actuel
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--emerald-deep)]/30 group-focus-within:text-[var(--gold-vivid)] transition-colors" />
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl py-3 pl-12 pr-12 text-sm focus:outline-none focus:border-[var(--gold-vivid)] transition-all"
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
                    Nouveau
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--emerald-deep)]/30 group-focus-within:text-[var(--gold-vivid)] transition-colors" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl py-3 pl-12 pr-12 text-sm focus:outline-none focus:border-[var(--gold-vivid)] transition-all"
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
                    Confirmer
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--emerald-deep)]/30 group-focus-within:text-[var(--gold-vivid)] transition-colors" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl py-3 pl-12 pr-12 text-sm focus:outline-none focus:border-[var(--gold-vivid)] transition-all"
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

                <SophisticatedButton
                  type="submit"
                  disabled={loading}
                  className="w-full justify-center py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  {loading ? 'Modification...' : 'Changer'}
                </SophisticatedButton>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

