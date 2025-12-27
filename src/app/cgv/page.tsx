'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, CheckCircle2, AlertCircle, Scale } from 'lucide-react';
import { TopBar, Navbar, Footer, Badge } from '@/components/SharedUI';
import Link from 'next/link';

const articles = [
  {
    number: "Article 1",
    title: "Objet",
    content: (
      <>
        <p className="mb-3">
          Les présentes CGV ont pour objet de définir les conditions dans lesquelles <strong>L'Écho IA</strong> propose :
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>des programmes de formation en ligne</li>
          <li>des services d'accompagnement et d'installation d'infrastructures numériques</li>
        </ul>
      </>
    )
  },
  {
    number: "Article 2",
    title: "Nature des prestations",
    content: (
      <>
        <p className="mb-4">
          Les prestations proposées relèvent de la formation et de l'accompagnement technique et organisationnel.
        </p>
        <p>
          Elles ne constituent <strong>ni un conseil juridique</strong>, <strong>ni un conseil financier</strong>, <strong>ni une promesse de résultat chiffré</strong>.
        </p>
      </>
    )
  },
  {
    number: "Article 3",
    title: "Accès aux services",
    content: (
      <>
        <p className="mb-3">L'accès aux contenus est accordé :</p>
        <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
          <li>immédiatement après validation du paiement pour les offres <strong>Fondations</strong> et <strong>Accélération</strong></li>
          <li>après acceptation de la candidature pour l'offre <strong>VIP Architecte</strong></li>
        </ul>
        <p>
          L'acheteur est responsable de disposer du matériel et de la connexion nécessaires à l'accès aux services.
        </p>
      </>
    )
  },
  {
    number: "Article 4",
    title: "Prix et modalités de paiement",
    content: (
      <>
        <p className="mb-4">
          Les prix sont indiqués en euros, toutes taxes comprises (TVA non applicable, article 293B du CGI).
        </p>
        <p className="mb-3">Le paiement peut être effectué :</p>
        <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
          <li>en une fois</li>
          <li>ou en plusieurs fois selon les modalités proposées</li>
        </ul>
        <div className="p-4 bg-amber-50 border-l-4 border-amber-500 mb-4">
          <p className="text-sm font-bold text-amber-900">
            Tout paiement échelonné constitue un <strong>engagement ferme</strong>.
          </p>
        </div>
        <p>
          L'intégralité des échéances reste due, même en cas d'arrêt d'utilisation des services.
        </p>
      </>
    )
  },
  {
    number: "Article 5",
    title: "Absence de droit de rétractation",
    content: (
      <>
        <p className="mb-4">
          Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne s'applique pas aux contenus numériques accessibles immédiatement après paiement.
        </p>
        <p className="mb-4">
          En validant son achat, le client renonce expressément à son droit de rétractation.
        </p>
        <div className="p-4 bg-red-50 border-l-4 border-red-500">
          <p className="text-sm font-bold text-red-800">
            👉 Aucun remboursement ne pourra être exigé après l'accès aux contenus.
          </p>
        </div>
      </>
    )
  },
  {
    number: "Article 6",
    title: "Cadre et limites des prestations",
    content: (
      <>
        <p className="mb-3">Les services sont fournis dans un cadre strictement défini :</p>
        <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
          <li>aucun support individuel en dehors de ce qui est explicitement inclus</li>
          <li>aucune obligation de disponibilité continue</li>
          <li>aucun accompagnement personnalisé non prévu</li>
        </ul>
        <p>
          Toute demande hors périmètre ne sera pas traitée.
        </p>
      </>
    )
  },
  {
    number: "Article 7",
    title: "Responsabilité",
    content: (
      <>
        <p className="mb-3"><strong>L'Écho IA</strong> ne saurait être tenu responsable :</p>
        <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
          <li>de l'utilisation faite des contenus</li>
          <li>des résultats obtenus ou non</li>
          <li>des décisions prises par le client</li>
        </ul>
        <p>
          Le client reste seul responsable de son activité professionnelle et de ses choix.
        </p>
      </>
    )
  },
  {
    number: "Article 8",
    title: "Propriété intellectuelle",
    content: (
      <>
        <p className="mb-4">
          L'ensemble des contenus, méthodes, outils et structures fournis restent la propriété exclusive de <strong>L'Écho IA</strong>.
        </p>
        <p>
          Toute reproduction, diffusion, revente ou exploitation non autorisée est strictement interdite.
        </p>
      </>
    )
  },
  {
    number: "Article 9",
    title: "Exclusion",
    content: (
      <>
        <p className="mb-3">
          <strong>L'Écho IA</strong> se réserve le droit d'exclure sans remboursement tout client en cas :
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>de non-respect du cadre</li>
          <li>de comportement abusif</li>
          <li>de tentative de contournement des règles</li>
        </ul>
      </>
    )
  },
  {
    number: "Article 10",
    title: "Droit applicable et juridiction compétente",
    content: (
      <>
        <p className="mb-4">
          Les présentes CGV sont soumises au droit français.
        </p>
        <p className="mb-4">
          En cas de litige, une tentative de résolution amiable sera privilégiée.
        </p>
        <p>
          À défaut, les tribunaux compétents seront ceux du ressort du domicile de l'éditeur.
        </p>
      </>
    )
  }
];

const highlights = [
  {
    icon: CheckCircle2,
    title: "Programmes & Services",
    desc: "Formation en ligne et accompagnement technique"
  },
  {
    icon: AlertCircle,
    title: "Pas de rétractation",
    desc: "Contenu numérique accessible immédiatement"
  },
  {
    icon: Scale,
    title: "Droit français",
    desc: "CGV soumises au droit français"
  }
];

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] selection:bg-[var(--gold-sand)] selection:text-[var(--emerald-deep)]">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="pt-48 pb-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--gold-vivid)] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>

          <Badge className="mb-8">Cadre Légal</Badge>
          
          <h1 className="text-4xl md:text-6xl font-light uppercase tracking-tighter mb-6 text-[var(--emerald-deep)]">
            Conditions Générales <br />
            <span className="font-serif italic text-[var(--gold-vivid)]">de Vente</span>
          </h1>
          
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
            Les présentes Conditions Générales de Vente régissent les ventes des programmes et services proposés sur le site <strong>L'Écho IA</strong>, édité par <strong>Rama SOUMARE</strong>, auto-entrepreneur.
          </p>

          <div className="p-6 rounded-2xl bg-[var(--emerald-deep)]/5 border border-[var(--emerald-deep)]/10">
            <p className="text-sm text-[var(--text-secondary)]">
              <strong>Dernière mise à jour :</strong> Janvier 2026
            </p>
          </div>
        </div>
      </section>

      {/* Points clés */}
      <section className="pb-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-[var(--emerald-deep)] mb-8 text-center">
            Points clés
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white border border-[var(--border-subtle)] hover:border-[var(--gold-vivid)]/40 transition-all text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--emerald-deep)]/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-[var(--emerald-deep)]" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--emerald-deep)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="p-6 md:p-8 rounded-3xl bg-white border border-[var(--border-subtle)] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--emerald-deep)] text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {index + 1}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                    {article.number}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold text-[var(--emerald-deep)]">
                    {article.title}
                  </h3>
                </div>
              </div>
              
              <div className="pl-14 text-[var(--text-secondary)] leading-relaxed">
                {article.content}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Résumé important */}
      <section className="pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[var(--emerald-deep)] to-[var(--emerald-deep)]/90 text-white">
            <div className="flex items-center gap-4 mb-6">
              <AlertCircle className="w-8 h-8 text-[var(--gold-sand)]" />
              <h3 className="text-2xl md:text-3xl font-bold">
                Points essentiels à retenir
              </h3>
            </div>
            
            <ul className="space-y-4 text-white/90 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-[var(--gold-sand)] font-bold shrink-0">•</span>
                <span>L'achat d'un programme constitue un <strong>engagement ferme</strong> sans possibilité de remboursement après l'accès aux contenus.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--gold-sand)] font-bold shrink-0">•</span>
                <span>Les prestations sont fournies dans un <strong>cadre strictement défini</strong>. Aucune demande hors périmètre ne sera traitée.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--gold-sand)] font-bold shrink-0">•</span>
                <span>L'Écho IA ne garantit <strong>aucun résultat chiffré</strong>. Le client reste seul responsable de ses résultats et décisions.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--gold-sand)] font-bold shrink-0">•</span>
                <span>Tout comportement abusif ou non-respect du cadre peut entraîner une <strong>exclusion sans remboursement</strong>.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-light mb-4 text-[var(--emerald-deep)]">
            Une question sur les CGV ?
          </h3>
          <p className="text-lg text-[var(--text-secondary)] mb-8">
            Contactez-nous pour toute clarification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@lechoia.com"
              className="inline-block px-8 py-4 rounded-full bg-[var(--emerald-deep)] text-white font-bold uppercase tracking-wider hover:bg-[var(--emerald-deep)]/90 transition-all"
            >
              Nous contacter
            </a>
            <Link
              href="/mentions-legales"
              className="inline-block px-8 py-4 rounded-full border-2 border-[var(--emerald-deep)] text-[var(--emerald-deep)] font-bold uppercase tracking-wider hover:bg-[var(--emerald-deep)] hover:text-white transition-all"
            >
              Voir mentions légales
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

