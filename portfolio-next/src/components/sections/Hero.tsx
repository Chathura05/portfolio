"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import Image from "next/image";
import { FiDownload, FiCode, FiMail } from "react-icons/fi";
import { personal } from "@/data/portfolio";

/* ── Particle canvas ───────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    type P = { x: number; y: number; r: number; vx: number; vy: number; alpha: number; color: string };
    const particles: P[] = [];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["rgba(0,245,255,", "rgba(255,0,60,", "rgba(191,0,255,"];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * (canvas.width || 1000),
        y: Math.random() * (canvas.height || 800),
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.6 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        // Draw connecting lines
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(0,245,255,${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

/* ── Typewriter ────────────────────────────────────────── */
function Typewriter({ texts }: { texts: string[] }) {
  const [displayed, setDisplayed] = useState("");
  const [idx,       setIdx]       = useState(0);
  const [typing,    setTyping]     = useState(true);
  const [charIdx,   setCharIdx]   = useState(0);

  useEffect(() => {
    const current = texts[idx];
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      if (charIdx < current.length) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        }, 75);
      } else {
        timeout = setTimeout(() => setTyping(false), 2200);
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        }, 40);
      } else {
        timeout = setTimeout(() => {
          setIdx((i) => (i + 1) % texts.length);
          setTyping(true);
        }, 0);
      }
    }
    return () => clearTimeout(timeout);
  }, [typing, charIdx, idx, texts]);

  return (
    <span className="font-mono" style={{ color: "#00f5ff" }}>
      {displayed}
      <span className="typed-cursor" />
    </span>
  );
}

/* ── Cyber stat counter ───────────────────────────────── */
function CyberStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="cyber-bracket p-4 text-center" style={{ background: "rgba(0,245,255,0.03)", border: "1px solid rgba(0,245,255,0.15)" }}>
      <p className="text-2xl font-black font-mono" style={{ color: "#00f5ff", textShadow: "0 0 12px rgba(0,245,255,0.6)" }}>
        {value}
      </p>
      <p className="text-xs font-mono uppercase tracking-widest mt-1" style={{ color: "rgba(200,216,232,0.6)" }}>{label}</p>
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────── */
export default function Hero() {
  const { scrollYProgress } = useScroll();
  const opacity    = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const translateY = useTransform(scrollYProgress, [0, 0.2], [0, -40]);

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show:   { opacity: 1, y: 0 },
  };

  return (
    <header
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden scanlines cyber-hero"
    >
      <ParticleCanvas />

      {/* Orbs */}
      <div className="orb" style={{ top: "15%", left: "8%",  width: "300px", height: "300px", background: "rgba(0,245,255,0.07)",  animationDelay: "0s" }} />
      <div className="orb" style={{ bottom: "15%", right: "8%", width: "250px", height: "250px", background: "rgba(255,0,60,0.06)", animationDelay: "3s" }} />
      <div className="orb" style={{ top: "50%", left: "50%",   width: "200px", height: "200px", background: "rgba(191,0,255,0.05)", animationDelay: "6s" }} />

      {/* Horizontal scan line */}
      <div
        className="absolute w-full h-px pointer-events-none z-20"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.4), transparent)",
          animation: "scanline 8s linear infinite",
          boxShadow: "0 0 8px rgba(0,245,255,0.3)",
        }}
      />

      <motion.div
        style={{ opacity, y: translateY }}
        className="container mx-auto px-6 relative z-10 text-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-7"
        >
          {/* System label */}
          <motion.div variants={itemVariants}>
            <span className="terminal-label text-xs tracking-[0.3em]">SYSTEM ONLINE</span>
          </motion.div>

          {/* Profile image */}
          <motion.div variants={itemVariants} className="relative">
            <div className="profile-ring absolute" />
            <div
              className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 z-10"
              style={{ borderColor: "rgba(0,245,255,0.4)", boxShadow: "0 0 30px rgba(0,245,255,0.3), 0 0 60px rgba(0,245,255,0.15), inset 0 0 30px rgba(0,245,255,0.05)" }}
            >
              <Image src={personal.photo} alt={personal.name} fill sizes="(max-width: 768px) 256px, 320px" className="object-cover" priority />
              {/* Holographic overlay */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, transparent 40%, rgba(0,245,255,0.1) 100%)" }} />
            </div>
            {/* Online indicator */}
            <span
              className="absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 z-20 animate-pulse"
              style={{ background: "#39ff14", borderColor: "#04060e", boxShadow: "0 0 8px #39ff14" }}
            />
          </motion.div>

          {/* Name with glitch effect */}
          <motion.div variants={itemVariants} className="relative">
            <h1
              className="glitch text-4xl md:text-6xl lg:text-7xl font-black tracking-tight"
              data-text={personal.name}
            >
              <span className="text-slate-900 dark:text-[#e8f4f8]">{personal.name.split(" ")[0]} </span>
              <span className="heading-accent">{personal.name.split(" ")[1]}</span>
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.div variants={itemVariants} className="text-lg md:text-2xl h-10 flex items-center">
            <Typewriter texts={personal.taglines} />
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="font-mono text-sm md:text-base max-w-2xl leading-relaxed text-center mx-auto text-slate-600 dark:text-slate-300"
          >
            {personal.bio[0]}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-cyber flex items-center gap-2 relative z-10 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            >
              <FiCode size={16} />
              View Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-cyber btn-cyber-pink flex items-center gap-2 relative z-10 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            >
              <FiMail size={16} />
              Contact Me
            </a>
            <a
              href={personal.cv}
              download
              className="flex items-center gap-2 px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform"
              style={{
                color: "#00f5ff",
                border: "1px solid rgba(0,245,255,0.3)",
                background: "rgba(0,245,255,0.04)",
              }}
            >
              <FiDownload size={16} />
              Download CV
            </a>
          </motion.div>

          {/* Stat row */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-lg mt-2"
          >
            {personal.stats.map((s) => (
              <CyberStat key={s.label} value={s.value} label={s.label} />
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-14 flex flex-col items-center gap-2"
        >
          <a href="#about" className="flex flex-col items-center gap-2 group">
            <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: "rgba(0,245,255,0.5)" }}>Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-5 h-8 border rounded-full flex items-start justify-center p-1"
              style={{ borderColor: "rgba(0,245,255,0.3)" }}
            >
              <div className="w-1 h-2 rounded-full" style={{ background: "#00f5ff", boxShadow: "0 0 6px #00f5ff" }} />
            </motion.div>
          </a>
        </motion.div>
      </motion.div>
    </header>
  );
}
