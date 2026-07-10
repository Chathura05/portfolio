"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiBook, FiBriefcase } from "react-icons/fi";
import { timeline } from "@/data/portfolio";
import { staggerContainer, fadeUp } from "@/components/ui/SectionWrapper";

export default function Experience() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} className="py-24 md:py-32 cyber-dark relative">
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
      <div className="cyber-divider" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="terminal-label mb-3">Career Path</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-[#e8f4f8]">
            Experience &amp; <span className="heading-accent">Education</span>
          </h2>
        </motion.div>

        <div className="relative max-w-2xl mx-auto">
          {/* Animated timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.4, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            className="cyber-timeline-line absolute left-6 md:left-1/2 top-0 w-px h-full -translate-x-1/2"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="space-y-12"
          >
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              const Icon   = item.type === "education" ? FiBook : FiBriefcase;
              const color  = item.type === "education" ? "#00f5ff" : "#ff003c";

              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className={`relative flex items-start gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Card */}
                  <div className="ml-16 md:ml-0 md:w-[calc(50%-2rem)]">
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="p-5 transition-all bg-white/60 dark:bg-black/30"
                      style={{
                        border: `1px solid ${color}25`,
                        position: "relative",
                      }}
                    >
                      {/* Corner accent */}
                      <div
                        className="absolute top-0 left-0 w-5 h-5"
                        style={{ borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}` }}
                      />
                      <div
                        className="absolute bottom-0 right-0 w-5 h-5"
                        style={{ borderBottom: `2px solid ${color}50`, borderRight: `2px solid ${color}50` }}
                      />

                      {/* Icon + period */}
                      <div className="flex items-center gap-2 mb-3">
                        <Icon size={14} style={{ color }} />
                        <span className="font-mono text-xs uppercase tracking-widest" style={{ color: `${color}CC` }}>
                          {item.period}
                        </span>
                      </div>

                      <h3 className="font-bold text-base mb-1 text-slate-900 dark:text-[#e8f4f8]">{item.title}</h3>
                      <p className="font-mono text-xs font-semibold mb-2" style={{ color }}>
                        {item.org}
                      </p>
                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.2, type: "spring", stiffness: 300 }}
                    className="cyber-timeline-dot absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10 mt-5"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
      <div className="cyber-divider mt-16" />
    </section>
  );
}
