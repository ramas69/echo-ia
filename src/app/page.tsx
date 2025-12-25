'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence, useSpring } from 'framer-motion';
import { 
  Brain, 
  Video, 
  Zap, 
  Target, 
  Cpu, 
  CheckCircle2, 
  ArrowUpRight, 
  ShieldCheck, 
  Menu, 
  X,
  Sparkles,
  MousePointer2,
  Lock,
  ArrowRight,
  Play,
  Waves
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge, SophisticatedButton } from '@/components/SharedUI';

// --- Shared Transitions ---
const springTransition = { type: "spring", stiffness: 100, damping: 20 };

// --- Animations ---

const CursorFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const springX = useSpring(0, { stiffness: 50, damping: 20 });
  const springY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      springX.set(e.clientX - 10);
      springY.set(e.clientY - 10);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div 
      style={{ x: springX, y: springY }}
      className="fixed top-0 left-0 w-5 h-5 border border-[var(--gold-vivid)] rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
    />
  );
};

const TopBar = () => (
  <div className="fixed top-0 w-full z-[110] bg-[var(--emerald-deep)] text-[var(--gold-sand)] py-3 px-6 flex justify-between items-center shadow-lg">
    <div className="text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-4">
      <motion.span 
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-2 h-2 bg-[var(--gold-vivid)] rounded-full shadow-[0_0_10px_var(--gold-vivid)]" 
      />
      SESSION DE JANVIER : PLUS QU'UNE PLACE DISPONIBLE.
    </div>
    <button className="text-[9px] font-black uppercase tracking-[0.3em] border border-[var(--gold-vivid)]/30 px-4 py-1.5 rounded-full hover:bg-[var(--gold-vivid)] hover:text-white transition-all shadow-sm">
      Réserver mon slot
    </button>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed w-full z-[100] transition-all duration-700 px-6",
      isScrolled ? "top-[48px] py-4" : "top-[48px] py-8"
    )}>
      <div className={cn(
        "max-w-7xl mx-auto px-8 py-4 flex justify-between items-center transition-all duration-700 rounded-2xl",
        isScrolled ? "glass-card shadow-2xl border-[var(--gold-vivid)]/20" : "bg-transparent"
      )}>
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 border-2 border-[var(--emerald-deep)] rounded-full flex items-center justify-center p-2 group-hover:border-[var(--gold-vivid)] transition-colors">
            <div className="w-full h-full bg-[var(--emerald-deep)] rounded-full animate-pulse group-hover:bg-[var(--gold-vivid)]" />
          </div>
          <span className="font-black tracking-[0.4em] text-[12px] uppercase text-[var(--emerald-deep)] group-hover:text-[var(--gold-vivid)] transition-colors">L'ÉCHO IA</span>
        </div>
        
        <div className="hidden md:flex gap-12 text-[9px] font-bold uppercase tracking-[0.4em] text-[var(--text-secondary)]">
          {['Vision', 'Infrastructure', 'Offres'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[var(--gold-vivid)] transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--gold-vivid)] transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <button className="hidden md:block text-[10px] font-black uppercase tracking-[0.3em] text-[var(--emerald-deep)] border-b-2 border-[var(--gold-vivid)] pb-1 hover:text-[var(--gold-vivid)] transition-all">
          Postuler
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, 150]);
  const rotateParallax = useTransform(scrollY, [0, 500], [0, 10]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-48 pb-20 mesh-gradient overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <Badge className="mb-12 border-[var(--gold-vivid)]/30">L'Intelligence au service de votre Liberté.</Badge>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-[9.5rem] font-light leading-[0.85] tracking-tighter uppercase mb-12 text-[var(--text-primary)]"
        >
          Éteignez le <br />
          <span className="font-serif italic text-[var(--gold-vivid)] drop-shadow-sm">chaos.</span> <br />
          Faites <span className="font-black">résonner</span> votre voix.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg md:text-xl text-[var(--text-secondary)] font-light max-w-3xl mx-auto mb-16 leading-relaxed text-balance"
        >
          Vous êtes expert, pas assistant administratif. Nous créons le système invisible qui démultiplie votre impact pendant que vous vous reposez.
        </motion.p>
        
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
          <SophisticatedButton onClick={() => document.getElementById('offres')?.scrollIntoView({behavior: 'smooth'})}>
            Voir comment ça marche
          </SophisticatedButton>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            onClick={() => document.getElementById('demo-live')?.scrollIntoView({behavior: 'smooth'})}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full border border-[var(--gold-vivid)]/20 flex items-center justify-center group-hover:border-[var(--gold-vivid)] group-hover:bg-[var(--gold-vivid)]/10 transition-all shadow-[0_0_15px_rgba(212,175,55,0.1)]">
              <Play className="w-4 h-4 text-[var(--gold-vivid)] fill-[var(--gold-vivid)]" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--text-secondary)] group-hover:text-[var(--gold-vivid)] transition-colors">
              Voir le système en action
            </span>
          </motion.div>
        </div>
      </div>

      {/* Subtle Background Decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <motion.div 
          style={{ y: yParallax, rotate: rotateParallax }}
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[5%] w-[600px] h-[600px] border border-[var(--gold-vivid)]/5 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[5%] w-[800px] h-[800px] border border-[var(--emerald-deep)]/5 rounded-full"
        />
        <div className="absolute top-[20%] right-[15%] w-2 h-2 bg-[var(--gold-vivid)] rounded-full animate-ping opacity-20" />
      </div>
    </section>
  );
};

const DemoLive = () => (
  <section id="demo-live" className="py-32 px-6 bg-[var(--bg-primary)]">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <Badge className="mb-6 border-[var(--gold-vivid)]/30">IMMERSION : VOTRE FUTUR QUOTIDIEN.</Badge>
        <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter text-balance">Regardez comment le système gère <br /><span className="font-serif italic text-[var(--gold-vivid)]">le travail ingrat à votre place.</span></h2>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.01, borderColor: "var(--gold-vivid)" }}
        className="relative aspect-video rounded-3xl border-4 border-[var(--emerald-deep)] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.1)] bg-[var(--text-primary)] flex items-center justify-center group cursor-pointer transition-all duration-700"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--emerald-deep)]/40 to-transparent z-10 opacity-60 group-hover:opacity-20 transition-opacity" />
        <img 
          src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2000" 
          alt="Dashboard Preview" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="relative z-20 w-24 h-24 rounded-full bg-[var(--gold-vivid)] flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.4)] group-hover:scale-110 group-hover:shadow-[0_0_70px_rgba(212,175,55,0.6)] transition-all duration-500">
          <Play className="w-10 h-10 text-white fill-white" />
        </div>
        <div className="absolute bottom-8 left-8 z-20">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80 text-balance">DÉMO LIVE // LIBÉRATION DU TEMPS</span>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Infrastructure = () => {
  const cards = [
    { icon: Brain, title: "Le Second Cerveau", desc: "Tout votre savoir est organisé et consultable 24/7 par vos clients. Vous ne répétez plus jamais la même chose.", gold: true },
    { icon: Video, title: "L'Usine à Contenu", desc: "Votre image et votre voix, clonées pour le web. Soyez présent partout en y passant seulement 1h par semaine." },
    { icon: Zap, title: "Le Flux Zéro-Friction", desc: "L'administratif disparaît. Paiements, contrats, accès : tout est géré automatiquement, sans erreur humaine.", gold: true },
    { icon: Target, title: "L'Aimant à Clients", desc: "Votre agenda se remplit de prospects qualifiés pendant que vous dormez. Finie la prospection manuelle épuisante." },
    { icon: Cpu, title: "L'Outil Signature", desc: "Nous créons le petit \"logiciel magique\" sur-mesure qui bluffera vos clients et que vos concurrents n'auront jamais.", gold: true }
  ];

  return (
    <section id="infrastructure" className="py-40 px-6 bg-[var(--bg-secondary)] border-y border-[var(--border-subtle)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-end mb-32">
          <div>
            <Badge className="mb-6 border-[var(--gold-vivid)]/30">La Méthode</Badge>
            <h2 className="text-5xl md:text-7xl font-light uppercase tracking-tighter leading-tight">
              Un système qui <br /> <span className="font-serif italic text-[var(--gold-vivid)]">travaille pour vous.</span>
            </h2>
          </div>
          <p className="text-[var(--text-secondary)] text-lg max-w-md leading-relaxed pb-4 border-l-2 border-[var(--gold-vivid)]/20 pl-8">
            5 piliers pour transformer votre expertise artisanale en une entreprise qui tourne sans vous.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group p-10 glass-card rounded-3xl hover:bg-white transition-all duration-700 relative overflow-hidden",
                card.gold && "border-[var(--gold-vivid)]/20 shadow-[0_0_20px_rgba(212,175,55,0.05)]"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500",
                card.gold ? "bg-[var(--gold-vivid)]/10 text-[var(--gold-vivid)] group-hover:bg-[var(--gold-vivid)] group-hover:text-white" : "bg-[var(--emerald-deep)]/5 text-[var(--emerald-deep)] group-hover:bg-[var(--emerald-deep)] group-hover:text-white"
              )}>
                <card.icon className="w-5 h-5 transition-colors" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tight mb-4 group-hover:text-[var(--gold-vivid)] transition-colors">{card.title}</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{card.desc}</p>
              {card.gold && <div className="absolute top-4 right-4"><Sparkles className="w-3 h-3 text-[var(--gold-vivid)]/30" /></div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RetoursExperience = () => {
  const reviews = [
    { name: "Marc Aubert", text: "J'ai retrouvé mes soirées et mes week-ends. Le système gère tout le travail ingrat. Je peux enfin me concentrer uniquement sur mes clients et ma stratégie.", role: "Coach Business", gold: true },
    { name: "Sarah Benali", text: "Ma charge mentale a chuté de 80%. Mes clients ont l'impression que je suis disponible H24, alors que c'est mon 'double IA' qui répond.", role: "Mentor Leadership" },
    { name: "Julien Roche", text: "Le Studio IA est bluffant. Je produis du contenu de haute qualité en 15 minutes par semaine.", role: "Expert Marketing", gold: true }
  ];

  return (
    <section className="py-32 px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <Badge className="mb-6 border-[var(--gold-vivid)]/30">Social Proof</Badge>
          <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter">Ils ont retrouvé <br /><span className="font-serif italic text-[var(--gold-vivid)]">leur liberté.</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "p-10 bg-white border border-[var(--gold-sand)] rounded-2xl shadow-sm hover:shadow-2xl hover:border-[var(--gold-vivid)]/30 transition-all duration-700 group relative overflow-hidden",
                rev.gold && "bg-[var(--gold-sand)]/5 border-[var(--gold-vivid)]/10"
              )}
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--gold-vivid)]/5 rounded-full blur-2xl group-hover:bg-[var(--gold-vivid)]/10 transition-all" />
              <p className="font-sans text-sm italic font-light text-[var(--text-secondary)] leading-relaxed mb-8 group-hover:text-[var(--text-primary)] transition-colors relative z-10">
                "{rev.text}"
              </p>
              <div className="relative z-10">
                <p className="font-sans font-bold text-[var(--text-primary)] text-xs uppercase tracking-widest flex items-center gap-2">
                  {rev.name}
                  {rev.gold && <Sparkles className="w-3 h-3 text-[var(--gold-vivid)]" />}
                </p>
                <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--emerald-deep)] font-black mt-1">{rev.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => (
  <section id="offres" className="py-40 px-6 bg-[var(--bg-primary)] relative">
    <div className="max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-32">
        <Badge className="mb-6 border-[var(--gold-vivid)]/30">Le Choix</Badge>
        <h2 className="text-5xl md:text-8xl font-light uppercase tracking-tighter">
          Choisissez votre <br /><span className="font-serif italic text-[var(--gold-vivid)]">niveau d'impact.</span>
        </h2>
        <p className="text-[var(--text-secondary)] text-lg mt-8 font-light">Autonomie complète ou service clé-en-main.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Academy */}
        <motion.div 
          whileHover={{ y: -10 }}
          className="p-16 rounded-[2.5rem] glass-card border-[var(--border-subtle)] hover:border-[var(--gold-vivid)]/20 relative overflow-hidden flex flex-col h-full transition-all duration-700"
        >
          <div className="text-[9px] font-black tracking-[0.4em] text-[var(--text-secondary)]/40 mb-12 uppercase">OPTION 01 // ACADÉMIE</div>
          <h3 className="text-3xl font-light uppercase tracking-tighter mb-4 text-[var(--text-primary)]">La Méthode</h3>
          <div className="text-5xl font-bold text-[var(--emerald-deep)] mb-12 tracking-tighter">497€ <span className="text-[10px] uppercase font-normal tracking-widest opacity-40">/ Accès à vie</span></div>
          
          <ul className="space-y-6 mb-16 flex-grow">
            {["Formation vidéo pas-à-pas", "Tous les modèles à copier-coller", "Bibliothèque de prompts prêts à l'emploi"].map((t, i) => (
              <li key={i} className="flex items-center gap-4 text-xs text-[var(--text-secondary)] group cursor-default">
                <div className="w-5 h-5 rounded-full bg-[var(--emerald-deep)]/5 flex items-center justify-center group-hover:bg-[var(--gold-vivid)]/10 transition-colors">
                  <CheckCircle2 className="w-3 h-3 text-[var(--emerald-deep)] group-hover:text-[var(--gold-vivid)] transition-colors" />
                </div>
                {t}
              </li>
            ))}
          </ul>
          
          <Link href="/academie" className="block w-full">
            <SophisticatedButton variant="outline" className="w-full justify-center">Accéder à la formation</SophisticatedButton>
          </Link>
        </motion.div>

        {/* VIP Setup */}
        <motion.div 
          whileHover={{ y: -10, boxShadow: "0 30px 60px rgba(212, 175, 55, 0.2)" }}
          className="p-16 rounded-[2.5rem] bg-[var(--emerald-deep)] text-white relative overflow-hidden shadow-2xl flex flex-col h-full border-2 border-[var(--gold-vivid)]/30"
        >
          <div className="absolute top-0 right-0 p-8">
            <Lock className="w-5 h-5 text-[var(--gold-vivid)] animate-pulse" />
          </div>
          
          <div className="text-[9px] font-black tracking-[0.4em] text-[var(--gold-vivid)]/60 mb-12 uppercase">OPTION 02 // VIP CLÉ-EN-MAIN</div>
          <h3 className="text-3xl font-light uppercase tracking-tighter mb-4 italic text-[var(--gold-sand)] drop-shadow-sm">Installation Complète</h3>
          <div className="text-5xl font-bold text-[var(--gold-sand)] mb-12 tracking-tighter">2 490€ <span className="text-[10px] uppercase font-normal tracking-widest opacity-40 text-white">/ Paiement unique</span></div>
          
          <ul className="space-y-6 mb-16 flex-grow">
            {["Nous installons tout le système pour vous", "Création de votre double IA (Voix & Vidéo)", "Création de votre outil signature sur-mesure"].map((t, i) => (
              <li key={i} className="flex items-center gap-4 text-xs text-white/80 group cursor-default">
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[var(--gold-vivid)] transition-colors">
                  <CheckCircle2 className="w-3 h-3 text-[var(--gold-sand)] transition-colors" />
                </div>
                {t}
              </li>
            ))}
          </ul>
          
          <a href="https://tally.so/r/vIP-echo-ia" target="_blank" rel="noopener noreferrer" className="block w-full">
            <SophisticatedButton variant="secondary" className="w-full border-none justify-center">Candidater pour la dernière place</SophisticatedButton>
          </a>
          <div className="text-center mt-6 space-y-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--gold-sand)]/50">Sur candidature uniquement. Réponse sous 24h.</p>
            <p className="text-[8px] uppercase tracking-[0.5em] text-[var(--gold-vivid)] font-black">DERNIÈRE PLACE POUR JANVIER.</p>
          </div>
          
          {/* Internal Glow Effect */}
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[var(--gold-vivid)]/20 rounded-full blur-[100px] pointer-events-none" />
        </motion.div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-32 px-6 border-t border-[var(--border-subtle)] bg-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16 relative z-10">
      <div className="flex flex-col items-center md:items-start gap-6">
        <div className="flex items-center gap-2 group cursor-default">
          <div className="w-6 h-6 bg-[var(--emerald-deep)] rounded-full group-hover:bg-[var(--gold-vivid)] transition-colors" />
          <span className="font-black tracking-[0.5em] text-[12px] text-[var(--emerald-deep)] uppercase group-hover:text-[var(--gold-vivid)] transition-colors">L'ÉCHO IA</span>
        </div>
        <p className="text-[9px] uppercase tracking-[0.4em] text-[var(--text-secondary)]/40 text-center md:text-left leading-loose">
          Le futur de l'accompagnement est systémique.<br />
          Architecturé en France // © 2025
        </p>
      </div>
      
      <div className="flex gap-16 text-[9px] font-black uppercase tracking-[0.5em] text-[var(--text-secondary)]/40">
        {['Privacy', 'Legal', 'Architect'].map((item) => (
          <a key={item} href="#" className="hover:text-[var(--gold-vivid)] transition-colors">{item}</a>
        ))}
      </div>
    </div>
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[var(--gold-vivid)]/20 to-transparent" />
  </footer>
);

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative bg-[var(--bg-primary)] selection:bg-[var(--gold-sand)] selection:text-[var(--emerald-deep)]">
      <CursorFollower />
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <DemoLive />
        <Infrastructure />
        <RetoursExperience />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
