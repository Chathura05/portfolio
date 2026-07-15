"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { staggerContainer, fadeUp, fadeIn } from "@/components/ui/SectionWrapper";
import { personal } from "@/data/portfolio";

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className="cyber-bracket text-center p-4"
      style={{
        background: "rgba(0,245,255,0.03)",
        border: "1px solid rgba(0,245,255,0.15)",
      }}
    >
      <p className="text-2xl font-black font-mono" style={{ color: "#00f5ff", textShadow: "0 0 10px rgba(0,245,255,0.5)" }}>
        {value}
      </p>
      <p className="font-mono text-xs uppercase tracking-widest mt-1 text-slate-500 dark:text-slate-400">{label}</p>
    </motion.div>
  );
}

export default function About() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 cyber-dark relative">
      {/* Subtle grid */}
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
      <div className="cyber-divider" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="flex flex-col gap-12"
        >

          {/* ── GitHub Banner ─────────────────────────────── */}
          <motion.div variants={fadeIn} className="relative w-full max-w-3xl mx-auto">
            {/* Outer glow layer */}
            <div
              className="absolute -inset-px rounded-sm pointer-events-none"
              style={{
                background: "linear-gradient(90deg, #00f5ff, #ff003c, #bf00ff, #00f5ff)",
                opacity: 0.5,
                filter: "blur(4px)",
              }}
            />
            {/* Card */}
            <div
              className="relative overflow-hidden rounded-sm"
              style={{
                border: "1px solid rgba(0,245,255,0.4)",
                boxShadow: "0 0 30px rgba(0,245,255,0.15), 0 0 60px rgba(0,245,255,0.07)",
              }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 z-10 pointer-events-none" style={{ borderTop: "2px solid #00f5ff", borderLeft: "2px solid #00f5ff" }} />
              <div className="absolute top-0 right-0 w-8 h-8 z-10 pointer-events-none" style={{ borderTop: "2px solid #ff003c", borderRight: "2px solid #ff003c" }} />
              <div className="absolute bottom-0 left-0 w-8 h-8 z-10 pointer-events-none" style={{ borderBottom: "2px solid #ff003c", borderLeft: "2px solid #ff003c" }} />
              <div className="absolute bottom-0 right-0 w-8 h-8 z-10 pointer-events-none" style={{ borderBottom: "2px solid #00f5ff", borderRight: "2px solid #00f5ff" }} />

              {/* Banner image */}
              <div className="relative w-full" style={{ aspectRatio: "3/1" }}>
                <Image
                  src="/banner.png"
                  alt="Chathura Weerasinghe – GitHub Profile Banner"
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                  priority
                />
                {/* Scanline overlay */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.012) 2px, rgba(0,245,255,0.012) 4px)",
                  }}
                />
                {/* Bottom gradient fade */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none z-10"
                  style={{ background: "linear-gradient(to top, rgba(6,9,15,0.6), transparent)" }}
                />
              </div>
            </div>

            {/* Label badge (moved outside overflow-hidden) */}
            <div className="absolute -top-3 right-8 z-30">
              <span
                className="font-mono text-xs uppercase tracking-widest px-3 py-1 inline-block"
                style={{
                  background: "rgba(4,6,14,0.95)",
                  border: "1px solid rgba(0,245,255,0.4)",
                  color: "#00f5ff",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                  clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                }}
              >
                {"// profile.banner"}
              </span>
            </div>
          </motion.div>

          {/* ── Two-column: Photo + Text ───────────────────── */}
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            {/* Image */}
            <motion.div variants={fadeIn} className="flex justify-center">
              <div className="relative">
                {/* Neon frame */}
                <div
                  className="absolute -inset-4"
                  style={{
                    border: "1px solid rgba(0,245,255,0.15)",
                    background: "rgba(0,245,255,0.02)",
                  }}
                />
                {/* Corner accents */}
                <div className="absolute -top-1 -left-1 w-6 h-6" style={{ borderTop: "2px solid #00f5ff", borderLeft: "2px solid #00f5ff" }} />
                <div className="absolute -top-1 -right-1 w-6 h-6" style={{ borderTop: "2px solid #ff003c", borderRight: "2px solid #ff003c" }} />
                <div className="absolute -bottom-1 -left-1 w-6 h-6" style={{ borderBottom: "2px solid #ff003c", borderLeft: "2px solid #ff003c" }} />
                <div className="absolute -bottom-1 -right-1 w-6 h-6" style={{ borderBottom: "2px solid #00f5ff", borderRight: "2px solid #00f5ff" }} />

                {/* Profile image */}
                <div
                  className="relative w-64 h-64 md:w-72 md:h-72 overflow-hidden"
                  style={{
                    border: "1px solid rgba(0,245,255,0.3)",
                    boxShadow: "0 0 30px rgba(0,245,255,0.12), 0 0 60px rgba(0,245,255,0.06)",
                  }}
                >
                  <Image src={personal.photo} alt={personal.name} fill sizes="(max-width: 768px) 256px, 320px" className="object-cover" />
                  {/* Scanline overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.015) 2px, rgba(0,245,255,0.015) 4px)",
                    }}
                  />
                  {/* Holographic tint */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(135deg, transparent 50%, rgba(0,245,255,0.08) 100%)" }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div variants={staggerContainer} className="space-y-6">
              <motion.div variants={fadeUp}>
                <p className="terminal-label mb-3">About Me</p>
                <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-slate-900 dark:text-[#e8f4f8]">
                  Crafting Digital{" "}
                  <span className="heading-accent">Experiences</span>
                </h2>
              </motion.div>

              {personal.bio.map((para, i) => (
                <motion.p
                  key={i}
                  variants={fadeUp}
                  className="leading-relaxed text-base md:text-lg text-slate-600 dark:text-slate-300"
                  style={{
                    borderLeft: "2px solid rgba(0,245,255,0.3)",
                    paddingLeft: "14px",
                  }}
                >
                  {para}
                </motion.p>
              ))}

              {/* Stats */}
              <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                {personal.stats.map((s) => (
                  <StatCard key={s.label} value={s.value} label={s.label} />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <div className="cyber-divider mt-16" />
    </section>
  );
}
