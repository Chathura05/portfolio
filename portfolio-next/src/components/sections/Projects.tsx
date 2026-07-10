"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  FaBuilding, FaHospital, FaBreadSlice, FaCashRegister,
} from "react-icons/fa";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { projects, type Project } from "@/data/portfolio";
import { staggerContainer, fadeUp, scaleIn } from "@/components/ui/SectionWrapper";

const iconMap: Record<string, React.ElementType> = {
  FaBuilding, FaHospital, FaBreadSlice, FaCashRegister,
};

type FilterKey = "all" | Project["category"];

const filters: { key: FilterKey; label: string; color: string }[] = [
  { key: "all",       label: "ALL",       color: "#00f5ff" },
  { key: "fullstack", label: "FULL_STACK", color: "#00f5ff" },
  { key: "frontend",  label: "FRONTEND",  color: "#ff003c" },
  { key: "uiux",      label: "UI/UX",     color: "#bf00ff" },
];

const gradientMap: Record<string, { from: string; to: string; glow: string }> = {
  "from-brand-600 to-brand-800":      { from: "#0040ff", to: "#00f5ff", glow: "rgba(0,245,255,0.3)" },
  "from-emerald-500 to-teal-600":     { from: "#00ff88", to: "#00c8e0", glow: "rgba(0,255,136,0.3)" },
  "from-amber-500 to-orange-600":     { from: "#ff8800", to: "#ff003c", glow: "rgba(255,136,0,0.3)" },
  "from-violet-500 to-purple-700":    { from: "#bf00ff", to: "#7700cc", glow: "rgba(191,0,255,0.3)" },
};

function ProjectCard({ project }: { project: Project }) {
  const Icon = iconMap[project.icon] || FaBuilding;
  const grad = gradientMap[project.gradient] ?? { from: "#00f5ff", to: "#ff003c", glow: "rgba(0,245,255,0.3)" };

  return (
    <motion.article
      layout
      variants={scaleIn}
      whileHover={{ y: -8 }}
      className="relative overflow-hidden group cursor-default bg-white/70 dark:bg-[#04060e]/80"
      style={{
        border: "1px solid rgba(0,245,255,0.12)",
        transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
      }}
      onHoverStart={(e) => {
        const el = e.target as HTMLElement;
        const card = el.closest("article") as HTMLElement;
        if (card) {
          card.style.borderColor = "rgba(0,245,255,0.45)";
          card.style.boxShadow   = `0 0 20px ${grad.glow}, 0 0 40px ${grad.glow}50`;
        }
      }}
      onHoverEnd={(e) => {
        const el = e.target as HTMLElement;
        const card = el.closest("article") as HTMLElement;
        if (card) {
          card.style.borderColor = "rgba(0,245,255,0.12)";
          card.style.boxShadow   = "none";
        }
      }}
    >
      {/* Top scan sweep on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${grad.from}, ${grad.to}, transparent)` }}
      />

      {/* Header with gradient */}
      <div
        className="relative h-40 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${grad.from}20, ${grad.to}30)` }}
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${grad.from}15 1px, transparent 1px), linear-gradient(90deg, ${grad.from}15 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />
        <Icon
          className="relative z-10"
          style={{
            fontSize: "4rem",
            color: grad.from,
            opacity: 0.25,
            filter: `drop-shadow(0 0 12px ${grad.from})`,
          }}
        />
        {/* Category badge */}
        <div
          className="absolute top-3 right-3 font-mono text-xs px-2 py-1 uppercase tracking-widest"
          style={{
            border: `1px solid ${grad.from}60`,
            color: grad.from,
            background: `${grad.from}10`,
          }}
        >
          {filters.find((f) => f.key === project.category)?.label ?? project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3
          className="font-bold text-base transition-colors text-slate-900 dark:text-[#e8f4f8]"
        >
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2 py-0.5 uppercase"
              style={{
                background: "rgba(0,245,255,0.05)",
                border: "1px solid rgba(0,245,255,0.2)",
                color: "#00f5ff",
                clipPath: "polygon(3px 0%, 100% 0%, calc(100% - 3px) 100%, 0% 100%)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div
          className="flex items-center gap-4 pt-3"
          style={{ borderTop: "1px solid rgba(0,245,255,0.1)" }}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider transition-colors"
            style={{ color: "#00f5ff" }}
          >
            <FiGithub size={14} />
            Source
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider transition-colors"
              style={{ color: "rgba(200,216,232,0.5)" }}
            >
              <FiExternalLink size={14} />
              Live
            </a>
          )}
        </div>
      </div>

      {/* Bottom corner accent */}
      <div
        className="absolute bottom-0 right-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ borderRight: `2px solid ${grad.to}`, borderBottom: `2px solid ${grad.to}` }}
      />
    </motion.article>
  );
}

export default function Projects() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" ref={ref} className="py-24 md:py-32 cyber-darker relative">
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
      <div className="cyber-divider" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="terminal-label mb-3">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-[#e8f4f8]">
            Featured <span className="heading-accent">Projects</span>
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className="font-mono text-xs px-5 py-2 uppercase tracking-widest transition-all"
              style={
                activeFilter === key
                  ? {
                      background: "rgba(0,245,255,0.1)",
                      border: "1px solid #00f5ff",
                      color: "#00f5ff",
                      boxShadow: "0 0 12px rgba(0,245,255,0.3)",
                      clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                    }
                  : {
                      background: "transparent",
                      border: "1px solid rgba(0,245,255,0.2)",
                      color: "rgba(200,216,232,0.5)",
                      clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                    }
              }
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Cards */}
        <motion.div
          layout
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-14"
        >
          <motion.a
            href="https://github.com/Chathura05"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="btn-cyber inline-flex items-center gap-2"
          >
            <FiGithub size={16} />
            View All on GitHub
          </motion.a>
        </motion.div>
      </div>
      <div className="cyber-divider mt-16" />
    </section>
  );
}
