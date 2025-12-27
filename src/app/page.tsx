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
    <a 
      href="https://tally.so/r/vIP-echo-ia"
      target="_blank"
      rel="noopener noreferrer"
      className="text-[9px] font-black uppercase tracking-[0.3em] border border-[var(--gold-vivid)]/30 px-4 py-1.5 rounded-full hover:bg-[var(--gold-vivid)] hover:text-white transition-all shadow-sm"
    >
      Réserver mon slot
    </a>
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
          <a href="/" className="hover:text-[var(--gold-vivid)] transition-colors relative group">
            Accueil
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--gold-vivid)] transition-all group-hover:w-full" />
          </a>
          <Link href="/le-programme" className="hover:text-[var(--gold-vivid)] transition-colors relative group">
            Le Programme
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--gold-vivid)] transition-all group-hover:w-full" />
          </Link>
          <Link href="/offres" className="hover:text-[var(--gold-vivid)] transition-colors relative group">
            Offres
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--gold-vivid)] transition-all group-hover:w-full" />
          </Link>
        </div>

        <Link 
          href="/candidature-vip"
          className="hidden md:block text-[10px] font-black uppercase tracking-[0.3em] text-[var(--emerald-deep)] border-b-2 border-[var(--gold-vivid)] pb-1 hover:text-[var(--gold-vivid)] transition-all"
        >
          Candidature VIP
        </Link>
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
        <Badge className="mb-12 border-[var(--gold-vivid)]/30">L'Intelligence au service de l'Humain</Badge>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-[9.5rem] font-light leading-[0.85] tracking-tighter uppercase mb-12 text-[var(--text-primary)]"
        >
          Éteignez le <br />
          <span className="font-serif italic text-[var(--gold-vivid)] drop-shadow-sm">chaos.</span> <br />
          Faites <span className="font-black">résonner</span> votre voix. <br />
          Retrouvez votre <span className="font-serif italic text-[var(--gold-vivid)]">liberté.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg md:text-xl text-[var(--text-secondary)] font-light max-w-4xl mx-auto mb-8 leading-relaxed text-balance"
        >
          Vous êtes coach, consultant, mentor ou formateur. <br />
          Votre rôle est d'accompagner, pas de vous perdre dans la répétition, l'administratif et la dispersion.
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="text-base md:text-lg text-[var(--text-secondary)] font-light max-w-3xl mx-auto mb-4 leading-relaxed text-balance"
        >
          L'Écho IA conçoit pour vous une infrastructure invisible, éthique et durable, qui travaille en continu sans vous remplacer.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="flex flex-col gap-3 max-w-2xl mx-auto mb-16 text-sm md:text-base text-[var(--text-secondary)] font-medium"
        >
          <p>👉 Ce n'est pas plus de productivité.</p>
          <p>👉 C'est plus de clarté, plus d'énergie, plus de temps.</p>
        </motion.div>
        
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
          <SophisticatedButton onClick={() => document.getElementById('vision')?.scrollIntoView({behavior: 'smooth'})}>
            Voir le système en action
          </SophisticatedButton>
          <Link href="/offres">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full border border-[var(--gold-vivid)]/20 flex items-center justify-center group-hover:border-[var(--gold-vivid)] group-hover:bg-[var(--gold-vivid)]/10 transition-all shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                <ArrowRight className="w-4 h-4 text-[var(--gold-vivid)]" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--text-secondary)] group-hover:text-[var(--gold-vivid)] transition-colors">
                Découvrir les offres
              </span>
            </motion.div>
          </Link>
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

const QualificationSection = () => (
  <section id="vision" className="py-32 px-6 bg-white border-y border-[var(--border-subtle)]">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <Badge className="mb-6 border-[var(--gold-vivid)]/30">POUR QUI ?</Badge>
        <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter text-balance mb-8">
          Ce système est conçu pour les experts <br /><span className="font-serif italic text-[var(--gold-vivid)]">déjà en activité</span>
        </h2>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
          qui ont des clients et une expertise réelle, donnent beaucoup (parfois trop), sentent que leur activité dépend trop d'eux, veulent durer sans s'épuiser, et refusent le marketing agressif et les solutions gadgets.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <div className="p-8 rounded-2xl bg-red-50/50 border border-red-200/50">
          <h3 className="text-sm font-black uppercase tracking-widest text-red-600 mb-6">❌ CE N'EST PAS POUR</h3>
          <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
            <li>• Les débutants</li>
            <li>• Ceux qui veulent "tester l'IA"</li>
            <li>• Les chercheurs de solutions miracles</li>
          </ul>
        </div>
        
        <div className="p-8 rounded-2xl bg-emerald-50/50 border border-[var(--emerald-deep)]/20">
          <h3 className="text-sm font-black uppercase tracking-widest text-[var(--emerald-deep)] mb-6">✔️ C'EST POUR</h3>
          <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
            <li>• Les experts qui veulent un cadre solide</li>
            <li>• Ceux qui cherchent la liberté</li>
            <li>• Les professionnels qui pensent long terme</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const ImmersionSection = () => (
  <section className="py-32 px-6 bg-[var(--bg-primary)]">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <Badge className="mb-6 border-[var(--gold-vivid)]/30">IMMERSION</Badge>
        <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter text-balance mb-12">
          À quoi ressemble votre quotidien <br /><span className="font-serif italic text-[var(--gold-vivid)]">après ?</span>
        </h2>
      </div>
      
      <div className="max-w-3xl mx-auto space-y-6 mb-16">
        {[
          "Vos clients trouvent des réponses sans vous solliciter",
          "Votre message continue de circuler quand vous êtes hors ligne",
          "Vos paiements, contrats et accès se gèrent seuls",
          "Votre agenda se remplit avec des personnes déjà alignées",
          "Votre énergie est protégée"
        ].map((benefit, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 p-6 rounded-2xl glass-card hover:border-[var(--gold-vivid)]/20 transition-all"
          >
            <CheckCircle2 className="w-6 h-6 text-[var(--emerald-deep)] flex-shrink-0" />
            <p className="text-base text-[var(--text-secondary)]">{benefit}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center">
        <p className="text-2xl md:text-4xl font-light text-[var(--text-primary)] italic">
          Pendant que vous accompagnez, <br />
          <span className="font-serif text-[var(--gold-vivid)]">le système s'occupe du reste.</span>
        </p>
      </div>
    </div>
  </section>
);

const DemoLive = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(err => {
          console.error("Erreur de lecture vidéo:", err);
          setHasError(true);
        });
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-6 border-[var(--gold-vivid)]/30">DÉMO LIVE</Badge>
          <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter text-balance">Regardez comment le système gère <br /><span className="font-serif italic text-[var(--gold-vivid)]">le travail ingrat à votre place.</span></h2>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.01, boxShadow: "0 30px 60px rgba(0,0,0,0.1)" }}
          className="relative aspect-video rounded-3xl border-4 border-[var(--emerald-deep)] overflow-hidden shadow-2xl bg-black group cursor-pointer transition-all duration-700"
          onClick={handlePlayVideo}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onError={() => setHasError(true)}
            controls={isPlaying}
            preload="metadata"
            playsInline
          >
            <source src="/video-echo.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
          
          {!isPlaying && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--emerald-deep)]/40 to-transparent z-10 opacity-60 group-hover:opacity-20 transition-opacity" />
              <div className="absolute inset-0 z-15 flex items-center justify-center">
                {hasError ? (
                  <div className="text-center px-6">
                    <div className="text-white/80 text-sm mb-4">
                      La vidéo n'a pas pu être chargée
                    </div>
                    <a 
                      href="/video-echo.mp4" 
                      download
                      className="px-6 py-3 bg-[var(--gold-vivid)] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[var(--gold-vivid)]/90 transition-colors inline-block"
                    >
                      Télécharger la vidéo
                    </a>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-[var(--gold-vivid)] flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.4)] group-hover:scale-110 group-hover:shadow-[0_0_70px_rgba(212,175,55,0.6)] transition-all duration-500">
                    <Play className="w-10 h-10 text-white fill-white" />
                  </div>
                )}
              </div>
              {!hasError && (
                <div className="absolute bottom-8 left-8 z-20">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80 text-balance">DÉMO LIVE // LIBÉRATION DU TEMPS</span>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const Infrastructure = () => {
  const cards = [
    { 
      icon: Brain, 
      title: "Le Second Cerveau", 
      subtitle: "Votre savoir, structuré et consultable 24/7", 
      desc: "Votre expertise devient une bibliothèque vivante et sécurisée. Vous ne répétez plus les bases. Vous vous concentrez sur l'essentiel.", 
      gold: true 
    },
    { 
      icon: Video, 
      title: "L'Usine à Contenu", 
      subtitle: "Votre voix et votre image, sans vous disperser", 
      desc: "Votre message est amplifié sans vous épuiser. Votre présence devient régulière, cohérente et fidèle à qui vous êtes.",
      note: "1h par semaine suffit."
    },
    { 
      icon: Zap, 
      title: "Le Flux Zéro-Friction", 
      subtitle: "L'administratif disparaît", 
      desc: "Paiements, contrats, accès, onboarding… Tout est automatisé avec fiabilité, sans dépendre d'un outil fragile. Votre charge mentale baisse. Vos clients se sentent pris en charge.", 
      gold: true 
    },
    { 
      icon: Target, 
      title: "L'Aimant à Prospects", 
      subtitle: "Des rendez-vous alignés, sans forcer", 
      desc: "Votre message attire naturellement les bonnes personnes. La relation commence avant même le premier échange." 
    },
    { 
      icon: Cpu, 
      title: "L'Outil Signature", 
      subtitle: "Votre différenciation non copiable", 
      desc: "Nous créons un micro-outil numérique qui prolonge votre accompagnement. Une expérience unique, utile, et impossible à imiter.", 
      gold: true 
    }
  ];

  return (
    <section id="méthode" className="py-40 px-6 bg-[var(--bg-secondary)] border-y border-[var(--border-subtle)] relative overflow-hidden">
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
              <div className="mb-2 text-[8px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)]/50">
                PILIER {i + 1}
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tight mb-2 group-hover:text-[var(--gold-vivid)] transition-colors">{card.title}</h3>
              <p className="text-xs text-[var(--gold-vivid)] italic font-medium mb-4">{card.subtitle}</p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{card.desc}</p>
              {card.note && <p className="text-xs text-[var(--emerald-deep)] font-bold mt-4">👉 {card.note}</p>}
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
    { 
      name: "Marc D.", 
      text: "J'ai retrouvé mes soirées et mes week-ends. Le système gère ce qui me pesait.", 
      role: "Coach Business", 
      gold: true 
    },
    { 
      name: "Sarah B.", 
      text: "Ma charge mentale a chuté. Mes clients se sentent accompagnés sans que je sois disponible en permanence.", 
      role: "Mentor Leadership" 
    },
    { 
      name: "Julien R.", 
      text: "Le Studio IA est impressionnant de réalisme. Je produis désormais un mois de contenu de haute qualité en 15 minutes par semaine.", 
      role: "Expert Marketing", 
      gold: true 
    }
  ];

  return (
    <section className="py-32 px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <Badge className="mb-6 border-[var(--gold-vivid)]/30">ILS ONT CHANGÉ LEUR QUOTIDIEN</Badge>
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
  <section className="py-40 px-6 bg-[var(--bg-primary)] relative">
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-32">
        <Badge className="mb-6 border-[var(--gold-vivid)]/30">CHOISISSEZ VOTRE CHEMIN</Badge>
        <h2 className="text-5xl md:text-7xl font-light uppercase tracking-tighter">
          Trois voies vers <br /><span className="font-serif italic text-[var(--gold-vivid)]">votre libération.</span>
        </h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* FONDATIONS */}
        <motion.div 
          whileHover={{ y: -10 }}
          className="p-12 rounded-[2rem] glass-card border-[var(--border-subtle)] hover:border-[var(--gold-vivid)]/20 relative overflow-hidden flex flex-col transition-all duration-700"
        >
          <div className="text-[8px] font-black tracking-[0.4em] text-[var(--text-secondary)]/40 mb-8 uppercase">🥉 OFFRE 01</div>
          <h3 className="text-2xl font-light uppercase tracking-tighter mb-2 text-[var(--text-primary)]">Fondations</h3>
          <p className="text-xs text-[var(--text-secondary)] italic mb-8">Construire votre infrastructure en autonomie</p>
          <div className="text-4xl font-bold text-[var(--emerald-deep)] mb-12 tracking-tighter">997 €</div>
          
          <ul className="space-y-4 mb-12 flex-grow text-xs text-[var(--text-secondary)]">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[var(--emerald-deep)] flex-shrink-0 mt-0.5" />
              <span>Accès aux 5 modules vidéo</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[var(--emerald-deep)] flex-shrink-0 mt-0.5" />
              <span>Templates & blueprints prêts à l'emploi</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[var(--emerald-deep)] flex-shrink-0 mt-0.5" />
              <span>Communauté d'entraide</span>
            </li>
          </ul>
          
          <div className="space-y-3 mb-8 text-[10px] text-[var(--text-secondary)]">
            <p>👉 100 % asynchrone</p>
            <p>👉 Aucun support individuel</p>
          </div>
          
          <Link href="/le-programme" className="block w-full">
            <SophisticatedButton variant="outline" className="w-full justify-center">Commencer</SophisticatedButton>
          </Link>
        </motion.div>

        {/* ACCÉLÉRATION */}
        <motion.div 
          whileHover={{ y: -10 }}
          className="p-12 rounded-[2rem] glass-card border-[var(--gold-vivid)]/30 relative overflow-hidden flex flex-col transition-all duration-700 shadow-lg"
        >
          <div className="absolute top-4 right-4">
            <Sparkles className="w-4 h-4 text-[var(--gold-vivid)]" />
          </div>
          
          <div className="text-[8px] font-black tracking-[0.4em] text-[var(--gold-vivid)]/60 mb-8 uppercase">🥈 OFFRE 02 • POPULAIRE</div>
          <h3 className="text-2xl font-light uppercase tracking-tighter mb-2 text-[var(--text-primary)]">Accélération</h3>
          <p className="text-xs text-[var(--text-secondary)] italic mb-8">Avancer sans se perdre</p>
          <div className="text-4xl font-bold text-[var(--gold-vivid)] mb-12 tracking-tighter">1 490 €</div>
          
          <ul className="space-y-4 mb-12 flex-grow text-xs text-[var(--text-secondary)]">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[var(--gold-vivid)] flex-shrink-0 mt-0.5" />
              <span>Tout FONDATIONS</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[var(--gold-vivid)] flex-shrink-0 mt-0.5" />
              <span>1 live collectif / mois (Q&A)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[var(--gold-vivid)] flex-shrink-0 mt-0.5" />
              <span>Cadre clair, temps mutualisé</span>
            </li>
          </ul>
          
          <div className="space-y-3 mb-8 text-[10px] text-[var(--text-secondary)]">
            <p>👉 Pour les profils non techniques</p>
            <p>👉 Sans surcharge mentale</p>
          </div>
          
          <a href="https://tally.so/r/acceleration-echo-ia" target="_blank" rel="noopener noreferrer" className="block w-full">
            <SophisticatedButton className="w-full justify-center">Rejoindre</SophisticatedButton>
          </a>
        </motion.div>

        {/* VIP ARCHITECTE */}
        <motion.div 
          whileHover={{ y: -10, boxShadow: "0 30px 60px rgba(212, 175, 55, 0.2)" }}
          className="p-12 rounded-[2rem] bg-[var(--emerald-deep)] text-white relative overflow-hidden shadow-2xl flex flex-col border-2 border-[var(--gold-vivid)]/30"
        >
          <div className="absolute top-0 right-0 p-8">
            <Lock className="w-5 h-5 text-[var(--gold-vivid)] animate-pulse" />
          </div>
          
          <div className="text-[8px] font-black tracking-[0.4em] text-[var(--gold-vivid)]/60 mb-8 uppercase">🥇 OFFRE 03 • VIP</div>
          <h3 className="text-2xl font-light uppercase tracking-tighter mb-2 italic text-[var(--gold-sand)] drop-shadow-sm">VIP Architecte</h3>
          <p className="text-xs text-white/70 italic mb-8">Libération maximale – Clé en main</p>
          <div className="text-4xl font-bold text-[var(--gold-sand)] mb-12 tracking-tighter">À partir de 3 490 €</div>
          
          <ul className="space-y-4 mb-12 flex-grow text-xs text-white/80">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[var(--gold-sand)] flex-shrink-0 mt-0.5" />
              <span>Tout ACCÉLÉRATION</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[var(--gold-sand)] flex-shrink-0 mt-0.5" />
              <span><strong>Installation complète</strong> de votre infrastructure cœur</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[var(--gold-sand)] flex-shrink-0 mt-0.5" />
              <span>Création de votre 1er outil signature</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[var(--gold-sand)] flex-shrink-0 mt-0.5" />
              <span>Audit technique 1:1 (1h)</span>
            </li>
          </ul>
          
          <div className="space-y-3 mb-8 text-[10px] text-white/70">
            <p>👉 Limité à 2 clients / mois</p>
            <p>👉 Sur candidature uniquement</p>
          </div>
          
          <Link href="/candidature-vip" className="block w-full">
            <SophisticatedButton variant="secondary" className="w-full border-none justify-center">Postuler</SophisticatedButton>
          </Link>
          
          {/* Internal Glow Effect */}
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[var(--gold-vivid)]/20 rounded-full blur-[100px] pointer-events-none" />
        </motion.div>
      </div>
    </div>
  </section>
);

const PromiseSection = () => (
  <section className="py-32 px-6 bg-[var(--bg-secondary)] border-y border-[var(--border-subtle)]">
    <div className="max-w-4xl mx-auto text-center">
      <Badge className="mb-12 border-[var(--gold-vivid)]/30">UNE PROMESSE SIMPLE</Badge>
      <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter mb-12 leading-tight">
        Le futur de l'accompagnement est <br />
        <span className="font-serif italic text-[var(--gold-vivid)]">plus humain</span> parce qu'il est <br />
        <span className="font-serif italic text-[var(--gold-vivid)]">mieux structuré.</span>
      </h2>
      <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-16 leading-relaxed">
        Votre système est prêt à être construit. <br />
        Il ne manque qu'une chose : votre décision.
      </p>
      <div className="flex justify-center">
        <Link href="/offres">
          <SophisticatedButton>
            Choisir mon chemin
          </SophisticatedButton>
        </Link>
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
          Le futur de l'accompagnement est plus humain, car mieux automatisé.<br />
          Créé en France · © 2026
        </p>
      </div>
      
      <div className="flex gap-16 text-[9px] font-black uppercase tracking-[0.5em] text-[var(--text-secondary)]/40">
        {['Privacy', 'Legal', 'Contact'].map((item) => (
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
        <QualificationSection />
        <ImmersionSection />
        <DemoLive />
        <Infrastructure />
        <RetoursExperience />
        <Pricing />
        <PromiseSection />
      </main>
      <Footer />
    </div>
  );
}
