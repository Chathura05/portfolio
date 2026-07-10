"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaEnvelope, FaGithub, FaLinkedinIn, FaWhatsapp, FaFileDownload,
} from "react-icons/fa";
import { contactLinks, personal } from "@/data/portfolio";
import { staggerContainer, fadeUp } from "@/components/ui/SectionWrapper";

const iconMap: Record<string, React.ElementType> = {
  FaEnvelope, FaGithub, FaLinkedinIn, FaWhatsapp, FaFileDownload,
};

const contactColors: Record<string, { glow: string; border: string }> = {
  FaEnvelope:      { glow: "rgba(0,245,255,0.35)",  border: "#00f5ff" },
  FaGithub:        { glow: "rgba(200,216,232,0.25)", border: "#c8d8e8" },
  FaLinkedinIn:    { glow: "rgba(0,119,255,0.35)",   border: "#0077ff" },
  FaWhatsapp:      { glow: "rgba(57,255,20,0.35)",   border: "#39ff14" },
  FaFileDownload:  { glow: "rgba(191,0,255,0.35)",   border: "#bf00ff" },
};

export default function Contact() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" ref={ref} className="relative py-24 md:py-32 cyber-dark overflow-hidden">
      {/* Background orbs */}
      <div className="orb" style={{ top: "20%", left: "5%",  width: "250px", height: "250px", background: "rgba(0,245,255,0.06)", animationDelay: "0s" }} />
      <div className="orb" style={{ bottom: "20%", right: "5%", width: "200px", height: "200px", background: "rgba(255,0,60,0.05)", animationDelay: "3s" }} />
      <div className="absolute inset-0 dot-pattern opacity-25 pointer-events-none" />
      <div className="cyber-divider" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <p className="terminal-label mb-3">Comms</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-[#e8f4f8]">
            Get In <span className="heading-accent">Touch</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-center max-w-xl mx-auto mb-14 leading-relaxed text-sm md:text-base text-slate-600 dark:text-slate-300"
          style={{
            fontFamily: "'Fira Code', monospace",
          }}
        >
          // Looking for internship opportunities. Open to collaboration, projects, or just a tech chat.
        </motion.p>

        {/* Contact cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="flex flex-wrap justify-center gap-5 max-w-4xl mx-auto"
        >
          {contactLinks.map((link) => {
            const Icon   = iconMap[link.icon] || FaEnvelope;
            const colors = contactColors[link.icon] ?? { glow: "rgba(0,245,255,0.3)", border: "#00f5ff" };
            const isDownload = link.href.startsWith("/");

            return (
              <motion.a
                key={link.label}
                variants={fadeUp}
                href={link.href}
                download={isDownload}
                target={!isDownload ? "_blank" : undefined}
                rel={!isDownload ? "noopener noreferrer" : undefined}
                whileHover={{ y: -8, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex flex-col items-center text-center p-4 sm:p-5 w-48 sm:w-52 group transition-all bg-white/70 dark:bg-[#04060e]/80"
                style={{
                  border: `1px solid ${colors.border}25`,
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = `${colors.border}60`;
                  el.style.boxShadow   = `0 0 20px ${colors.glow}, 0 0 40px ${colors.glow}60`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = `${colors.border}25`;
                  el.style.boxShadow   = "none";
                }}
              >
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-4 h-4" style={{ borderTop: `2px solid ${colors.border}`, borderLeft: `2px solid ${colors.border}` }} />
                <div className="absolute bottom-0 right-0 w-4 h-4" style={{ borderBottom: `2px solid ${colors.border}`, borderRight: `2px solid ${colors.border}` }} />

                <div
                  className="w-12 h-12 rounded-none flex items-center justify-center mb-3"
                  style={{
                    border: `1px solid ${colors.border}40`,
                    background: `${colors.border}08`,
                    color: colors.border,
                    boxShadow: `0 0 12px ${colors.glow}`,
                  }}
                >
                  <Icon size={20} />
                </div>
                <p className="font-mono font-bold text-xs uppercase tracking-widest mb-1" style={{ color: colors.border }}>
                  {link.label}
                </p>
                <p className="font-mono text-xs break-words leading-tight text-slate-500 dark:text-slate-400">
                  {link.value}
                </p>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-14 text-center"
        >
          <p className="font-mono text-xs mb-5 text-slate-500 dark:text-slate-400">
            // preferred_contact: email
          </p>
          <motion.a
            href={`mailto:${personal.email}`}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            className="btn-cyber inline-flex items-center gap-2"
          >
            <FaEnvelope size={15} />
            Send Message
          </motion.a>
        </motion.div>
      </div>
      <div className="cyber-divider mt-16" />
    </section>
  );
}
