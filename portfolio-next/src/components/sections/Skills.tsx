"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaHtml5, FaJs, FaReact, FaPhp, FaJava, FaGitAlt, FaFigma, FaLaravel, FaNodeJs
} from "react-icons/fa";
import {
  SiTailwindcss, SiMysql, SiPostgresql, SiTypescript, SiPostman
} from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";
import { skills, type Skill } from "@/data/portfolio";
import { staggerContainer, fadeUp } from "@/components/ui/SectionWrapper";

const iconMap: Record<string, React.ElementType> = {
  FaHtml5, FaJs, FaReact, FaPhp, FaJava, FaGitAlt, FaFigma, FaLaravel, FaNodeJs,
  SiTailwindcss, SiMysql, SiPostgresql, TbBrandVscode, SiTypescript, SiPostman,
};

const categoryColors: Record<Skill["category"], { fill: string; glow: string }> = {
  frontend: { fill: "linear-gradient(90deg, #00f5ff, #0080ff)", glow: "rgba(0,245,255,0.3)" },
  backend:  { fill: "linear-gradient(90deg, #ff003c, #bf00ff)", glow: "rgba(255,0,60,0.3)" },
  tools:    { fill: "linear-gradient(90deg, #39ff14, #00f5ff)", glow: "rgba(57,255,20,0.3)" },
};

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const Icon   = iconMap[skill.icon];
  const colors = categoryColors[skill.category];

  // Helper for rgba colors based on category
  const rgb = skill.category === "frontend" ? "0,245,255" : skill.category === "backend" ? "255,0,60" : "57,255,20";
  const hex = skill.category === "frontend" ? "#00f5ff" : skill.category === "backend" ? "#ff003c" : "#39ff14";

  return (
    <motion.div ref={ref} variants={fadeUp} className="group cursor-default">
      <div className="flex items-center gap-3 mb-2.5">
        {Icon && (
          <div 
            className="w-7 h-7 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{ 
              background: `rgba(${rgb}, 0.05)`,
              border: `1px solid rgba(${rgb}, 0.25)`,
              boxShadow: `0 0 10px rgba(${rgb}, 0)`
            }}
          >
            <Icon size={14} style={{ color: hex }} />
          </div>
        )}
        <span 
          className="font-mono text-sm font-semibold tracking-wide text-slate-800 dark:text-slate-300 transition-colors duration-300"
          style={{ textShadow: "none" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = hex;
            (e.currentTarget as HTMLElement).style.textShadow = `0 0 8px rgba(${rgb}, 0.5)`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "";
            (e.currentTarget as HTMLElement).style.textShadow = "none";
          }}
        >
          {skill.name}
        </span>
      </div>
      
      {/* Sleek Progress Bar */}
      <div 
        className="h-[3px] w-full overflow-hidden" 
        style={{ background: "rgba(128,128,128,0.15)" }}
      >
        <motion.div
          className="h-full relative"
          style={{
            background: colors.fill,
            boxShadow: `0 0 8px ${colors.glow}`,
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay: index * 0.1, ease: "circOut" }}
        >
          {/* Glowing tip */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-4 opacity-80" 
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8))" }} 
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function SkillTag({ skill }: { skill: Skill }) {
  const Icon = iconMap[skill.icon];
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.06, y: -3 }}
      className="cyber-badge flex items-center gap-2 cursor-default"
    >
      {Icon && <Icon size={13} />}
      {skill.name}
    </motion.div>
  );
}

export default function Skills() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const frontend = skills.filter((s) => s.category === "frontend");
  const backend  = skills.filter((s) => s.category === "backend");
  const tools    = skills.filter((s) => s.category === "tools");

  return (
    <section id="skills" ref={ref} className="py-24 md:py-32 cyber-darker relative">
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
      <div className="cyber-divider" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="terminal-label mb-3">Tech Stack</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-[#e8f4f8]">
            Technical <span className="heading-accent">Skills</span>
          </h2>
        </motion.div>

        {/* Skill bars */}
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto mb-16">
          {/* Frontend */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="space-y-6 p-6"
            style={{ border: "1px solid rgba(0,245,255,0.12)", background: "rgba(0,245,255,0.02)" }}
          >
            <h3 className="font-mono text-sm font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: "#00f5ff" }}>
              <span style={{ color: "#ff003c" }}>{"// "}</span>Frontend
            </h3>
            {frontend.map((s, i) => <SkillBar key={s.name} skill={s} index={i} />)}
          </motion.div>

          {/* Backend */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="space-y-6 p-6"
            style={{ border: "1px solid rgba(255,0,60,0.12)", background: "rgba(255,0,60,0.02)" }}
          >
            <h3 className="font-mono text-sm font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: "#ff003c" }}>
              <span style={{ color: "#00f5ff" }}>{"// "}</span>Backend
            </h3>
            {backend.map((s, i) => <SkillBar key={s.name} skill={s} index={i} />)}
          </motion.div>

          {/* Tools */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="space-y-6 p-6"
            style={{ border: "1px solid rgba(57,255,20,0.12)", background: "rgba(57,255,20,0.02)" }}
          >
            <h3 className="font-mono text-sm font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: "#39ff14" }}>
              <span style={{ color: "#ff003c" }}>{"// "}</span>Tools
            </h3>
            {tools.map((s, i) => <SkillBar key={s.name} skill={s} index={i} />)}
          </motion.div>
        </div>

        {/* Tech tags */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.p variants={fadeUp} className="text-center font-mono text-xs uppercase tracking-widest mb-6" style={{ color: "rgba(0,245,255,0.5)" }}>
            {"// all_technologies"}
          </motion.p>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((s) => <SkillTag key={s.name} skill={s} />)}
          </div>
        </motion.div>
      </div>
      <div className="cyber-divider mt-16" />
    </section>
  );
}
