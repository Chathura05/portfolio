"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { personal } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer
      className="py-8 relative bg-white dark:bg-[#02030a]"
      style={{
        borderTop: "1px solid rgba(0,245,255,0.1)",
      }}
    >
      {/* Top neon line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.3), rgba(255,0,60,0.3), transparent)" }}
      />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <p className="font-mono font-bold text-sm" style={{ color: "#00f5ff" }}>
              <span style={{ color: "#ff003c" }}>&lt;</span>
              {personal.name}
              <span style={{ color: "#ff003c" }}> /&gt;</span>
            </p>
            <p className="font-mono text-xs mt-1 text-slate-500 dark:text-slate-400">
              Software Engineering Portfolio
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-5">
            {[
              { href: personal.github,   Icon: FaGithub,   color: "#c8d8e8" },
              { href: personal.linkedin, Icon: FaLinkedin, color: "#0077ff" },
              { href: `mailto:${personal.email}`, Icon: FaEnvelope, color: "#00f5ff" },
            ].map(({ href, Icon, color }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="transition-all"
                style={{ color: "rgba(200,216,232,0.4)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = color;
                  (e.currentTarget as HTMLElement).style.filter = `drop-shadow(0 0 6px ${color})`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(200,216,232,0.4)";
                  (e.currentTarget as HTMLElement).style.filter = "none";
                }}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-right">
            <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} Chathura Weerasinghe
            </p>
            <p className="font-mono text-xs mt-0.5" style={{ color: "rgba(0,245,255,0.3)" }}>
              {"// All rights reserved"}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
