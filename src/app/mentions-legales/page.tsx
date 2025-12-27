'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, ShoppingCart, ArrowLeft } from 'lucide-react';
import { TopBar, Navbar, Footer, Badge } from '@/components/SharedUI';
import Link from 'next/link';

const sections = [
  {
    id: 'mentions',
    icon: FileText,
    title: 'Mentions Légales',
    content: (
      <>
        <p className="mb-6">
          Conformément aux dispositions des articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l'Économie Numérique (LCEN), il est précisé aux utilisateurs du site <strong>L'Écho IA</strong> l'identité des différents intervenants.
        </p>

        <h3 className="text-xl font-bold text-[var(--emerald-deep)] mb-4 mt-8">Éditeur du site</h3>
        <ul className="space-y-2 mb-6">
          <li><strong>Nom commercial :</strong> L'Écho IA</li>
          <li><strong>Responsable de la publication :</strong> Rama SOUMARE</li>
          <li><strong>Statut juridique :</strong> Auto-entrepreneur</li>
          <li><strong>Adresse :</strong> [adresse professionnelle ou domiciliation à compléter]</li>
          <li><strong>Email de contact :</strong> <a href="mailto:contact@lechoia.com" className="text-[var(--gold-vivid)] hover:underline">contact@lechoia.com</a></li>
        </ul>

        <h3 className="text-xl font-bold text-[var(--emerald-deep)] mb-4 mt-8">Hébergement</h3>
        <p className="mb-2">Le site est hébergé par :</p>
        <ul className="space-y-1 mb-6">
          <li><strong>o2switch</strong></li>
          <li>Chemin des Pardiaux</li>
          <li>63000 Clermont-Ferrand</li>
          <li>France</li>
          <li>Site : <a href="https://www.o2switch.fr" target="_blank" rel="noopener noreferrer" className="text-[var(--gold-vivid)] hover:underline">https://www.o2switch.fr</a></li>
        </ul>

        <h3 className="text-xl font-bold text-[var(--emerald-deep)] mb-4 mt-8">Propriété intellectuelle</h3>
        <p>
          L'ensemble des contenus présents sur le site <strong>L'Écho IA</strong> (textes, vidéos, méthodes, structures, documents, outils, marques, logos, graphismes) est protégé par le droit d'auteur et le droit de la propriété intellectuelle.
        </p>
        <p className="mt-4">
          Toute reproduction, représentation, modification, publication ou adaptation, totale ou partielle, de ces éléments, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable.
        </p>
      </>
    )
  },
  {
    id: 'rgpd',
    icon: Shield,
    title: 'Politique de confidentialité',
    content: (
      <>
        <p className="mb-6">
          La présente politique de confidentialité a pour objectif d'informer les utilisateurs du site <strong>L'Écho IA</strong> de la manière dont leurs données personnelles sont collectées, utilisées et protégées, conformément au Règlement Général sur la Protection des Données (RGPD).
        </p>

        <h3 className="text-xl font-bold text-[var(--emerald-deep)] mb-4 mt-8">Responsable du traitement</h3>
        <p className="mb-6">
          Le responsable du traitement des données est :<br />
          <strong>Rama SOUMARE – Auto-entrepreneur</strong><br />
          Email : <a href="mailto:contact@lechoia.com" className="text-[var(--gold-vivid)] hover:underline">contact@lechoia.com</a>
        </p>

        <h3 className="text-xl font-bold text-[var(--emerald-deep)] mb-4 mt-8">Données collectées</h3>
        <p className="mb-3">Les données personnelles susceptibles d'être collectées sont :</p>
        <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
          <li>Nom et prénom</li>
          <li>Adresse email</li>
          <li>Informations professionnelles</li>
          <li>Réponses aux formulaires (notamment candidature VIP)</li>
          <li>Données de paiement (traitées exclusivement par Stripe)</li>
        </ul>
        <div className="p-4 bg-red-50 border-l-4 border-red-500 mb-6">
          <p className="text-sm font-bold text-red-800">⚠️ Aucune donnée bancaire n'est stockée par L'Écho IA.</p>
        </div>

        <h3 className="text-xl font-bold text-[var(--emerald-deep)] mb-4 mt-8">Finalités de la collecte</h3>
        <p className="mb-3">Les données sont collectées pour :</p>
        <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
          <li>Traiter les candidatures au programme VIP</li>
          <li>Donner accès aux programmes et contenus achetés</li>
          <li>Gérer la relation client</li>
          <li>Respecter les obligations légales, comptables et fiscales</li>
        </ul>

        <h3 className="text-xl font-bold text-[var(--emerald-deep)] mb-4 mt-8">Base légale du traitement</h3>
        <p className="mb-3">Le traitement des données repose sur :</p>
        <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
          <li>L'exécution d'un contrat (achat d'un programme)</li>
          <li>Le consentement explicite de l'utilisateur</li>
          <li>Les obligations légales de l'éditeur</li>
        </ul>

        <h3 className="text-xl font-bold text-[var(--emerald-deep)] mb-4 mt-8">Conservation des données</h3>
        <p className="mb-4">
          Les données sont conservées uniquement pendant la durée nécessaire à la fourniture des services et au respect des obligations légales.
        </p>
        <p className="mb-6">
          Les candidatures non retenues au programme VIP peuvent être supprimées sans préavis.
        </p>

        <h3 className="text-xl font-bold text-[var(--emerald-deep)] mb-4 mt-8">Partage des données</h3>
        <p className="mb-3">
          Les données peuvent être partagées uniquement avec des prestataires techniques nécessaires à la fourniture du service, notamment :
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
          <li><strong>Stripe</strong> (paiement sécurisé)</li>
          <li>Outils d'hébergement et de gestion des contenus</li>
        </ul>
        <p className="mb-6">
          Aucune donnée personnelle n'est vendue, louée ou cédée à des tiers.
        </p>

        <h3 className="text-xl font-bold text-[var(--emerald-deep)] mb-4 mt-8">Droits des utilisateurs</h3>
        <p className="mb-3">
          Conformément à la réglementation en vigueur, vous disposez des droits suivants :
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
          <li>Droit d'accès</li>
          <li>Droit de rectification</li>
          <li>Droit de suppression</li>
          <li>Droit d'opposition</li>
          <li>Droit à la limitation du traitement</li>
        </ul>
        <p>
          Toute demande peut être adressée à : <a href="mailto:contact@lechoia.com" className="text-[var(--gold-vivid)] hover:underline">contact@lechoia.com</a>
        </p>
      </>
    )
  },
  {
    id: 'cgv',
    icon: ShoppingCart,
    title: 'Conditions Générales de Vente',
    content: (
      <>
        <p className="mb-6">
          Les présentes Conditions Générales de Vente (CGV) régissent les ventes des programmes et services proposés sur le site <strong>L'Écho IA</strong>, édité par <strong>Rama SOUMARE</strong>, auto-entrepreneur.
        </p>

        <h3 className="text-xl font-bold text-[var(--emerald-deep)] mb-4 mt-8">Article 1 — Objet</h3>
        <p className="mb-3">Les présentes CGV ont pour objet de définir les conditions dans lesquelles <strong>L'Écho IA</strong> propose :</p>
        <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
          <li>des programmes de formation en ligne</li>
          <li>des services d'accompagnement et d'installation d'infrastructures numériques</li>
        </ul>

        <h3 className="text-xl font-bold text-[var(--emerald-deep)] mb-4 mt-8">Article 2 — Nature des prestations</h3>
        <p className="mb-4">Les prestations proposées relèvent de la formation et de l'accompagnement technique et organisationnel.</p>
        <p className="mb-6">
          Elles ne constituent <strong>ni un conseil juridique</strong>, <strong>ni un conseil financier</strong>, <strong>ni une promesse de résultat chiffré</strong>.
        </p>

        <h3 className="text-xl font-bold text-[var(--emerald-deep)] mb-4 mt-8">Article 3 — Accès aux services</h3>
        <p className="mb-3">L'accès aux contenus est accordé :</p>
        <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
          <li>immédiatement après validation du paiement pour les offres <strong>Fondations</strong> et <strong>Accélération</strong></li>
          <li>après acceptation de la candidature pour l'offre <strong>VIP Architecte</strong></li>
        </ul>
        <p className="mb-6">
          L'acheteur est responsable de disposer du matériel et de la connexion nécessaires à l'accès aux services.
        </p>

        <h3 className="text-xl font-bold text-[var(--emerald-deep)] mb-4 mt-8">Article 4 — Prix et modalités de paiement</h3>
        <p className="mb-4">
          Les prix sont indiqués en euros, toutes taxes comprises (TVA non applicable, article 293B du CGI).
        </p>
        <p className="mb-3">Le paiement peut être effectué :</p>
        <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
          <li>en une fois</li>
          <li>ou en plusieurs fois selon les modalités proposées</li>
        </ul>
        <p className="mb-4">
          Tout paiement échelonné constitue un <strong>engagement ferme</strong>.
        </p>
        <p className="mb-6">
          L'intégralité des échéances reste due, même en cas d'arrêt d'utilisation des services.
        </p>

        <h3 className="text-xl font-bold text-[var(--emerald-deep)] mb-4 mt-8">Article 5 — Absence de droit de rétractation</h3>
        <p className="mb-4">
          Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne s'applique pas aux contenus numériques accessibles immédiatement après paiement.
        </p>
        <p className="mb-4">
          En validant son achat, le client renonce expressément à son droit de rétractation.
        </p>
        <div className="p-4 bg-amber-50 border-l-4 border-amber-500 mb-6">
          <p className="text-sm font-bold text-amber-900">👉 Aucun remboursement ne pourra être exigé après l'accès aux contenus.</p>
        </div>

        <h3 className="text-xl font-bold text-[var(--emerald-deep)] mb-4 mt-8">Article 6 — Cadre et limites des prestations</h3>
        <p className="mb-3">Les services sont fournis dans un cadre strictement défini :</p>
        <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
          <li>aucun support individuel en dehors de ce qui est explicitement inclus</li>
          <li>aucune obligation de disponibilité continue</li>
          <li>aucun accompagnement personnalisé non prévu</li>
        </ul>
        <p className="mb-6">
          Toute demande hors périmètre ne sera pas traitée.
        </p>

        <h3 className="text-xl font-bold text-[var(--emerald-deep)] mb-4 mt-8">Article 7 — Responsabilité</h3>
        <p className="mb-3"><strong>L'Écho IA</strong> ne saurait être tenu responsable :</p>
        <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
          <li>de l'utilisation faite des contenus</li>
          <li>des résultats obtenus ou non</li>
          <li>des décisions prises par le client</li>
        </ul>
        <p className="mb-6">
          Le client reste seul responsable de son activité professionnelle et de ses choix.
        </p>

        <h3 className="text-xl font-bold text-[var(--emerald-deep)] mb-4 mt-8">Article 8 — Propriété intellectuelle</h3>
        <p className="mb-4">
          L'ensemble des contenus, méthodes, outils et structures fournis restent la propriété exclusive de <strong>L'Écho IA</strong>.
        </p>
        <p className="mb-6">
          Toute reproduction, diffusion, revente ou exploitation non autorisée est strictement interdite.
        </p>

        <h3 className="text-xl font-bold text-[var(--emerald-deep)] mb-4 mt-8">Article 9 — Exclusion</h3>
        <p className="mb-3">
          <strong>L'Écho IA</strong> se réserve le droit d'exclure sans remboursement tout client en cas :
        </p>
        <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
          <li>de non-respect du cadre</li>
          <li>de comportement abusif</li>
          <li>de tentative de contournement des règles</li>
        </ul>

        <h3 className="text-xl font-bold text-[var(--emerald-deep)] mb-4 mt-8">Article 10 — Droit applicable et juridiction compétente</h3>
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

export default function MentionsLegalesPage() {
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

          <Badge className="mb-8">Informations Légales</Badge>
          
          <h1 className="text-4xl md:text-6xl font-light uppercase tracking-tighter mb-6 text-[var(--emerald-deep)]">
            Mentions Légales <br />
            <span className="font-serif italic text-[var(--gold-vivid)]">& Confidentialité</span>
          </h1>
          
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Informations légales, politique de confidentialité et conditions générales de vente du site L'Écho IA.
          </p>
        </div>
      </section>

      {/* Navigation rapide */}
      <section className="pb-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="p-6 rounded-2xl bg-white border-2 border-[var(--border-subtle)] hover:border-[var(--gold-vivid)]/40 transition-all group"
              >
                <section.icon className="w-8 h-8 text-[var(--emerald-deep)] group-hover:text-[var(--gold-vivid)] transition-colors mb-4" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--emerald-deep)] group-hover:text-[var(--gold-vivid)] transition-colors">
                  {section.title}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contenu */}
      <section className="pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 md:p-12 rounded-3xl bg-white border border-[var(--border-subtle)] shadow-sm"
            >
              <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-[var(--gold-vivid)]/20">
                <div className="w-12 h-12 rounded-full bg-[var(--emerald-deep)]/10 flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-[var(--emerald-deep)]" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-[var(--emerald-deep)]">
                  {section.title}
                </h2>
              </div>
              
              <div className="prose prose-emerald max-w-none text-[var(--text-secondary)] leading-relaxed">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Contact */}
      <section className="pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="p-10 rounded-3xl bg-gradient-to-br from-[var(--emerald-deep)] to-[var(--emerald-deep)]/90 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-light mb-4">
              Une question sur vos données ?
            </h3>
            <p className="text-lg text-white/80 mb-8">
              Contactez-nous pour toute demande relative à vos données personnelles.
            </p>
            <a
              href="mailto:contact@lechoia.com"
              className="inline-block px-8 py-4 rounded-full bg-[var(--gold-vivid)] text-[var(--emerald-deep)] font-bold uppercase tracking-wider hover:bg-[var(--gold-sand)] transition-all"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

