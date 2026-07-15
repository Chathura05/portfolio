"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import { FiSun, FiMoon, FiMenu, FiX, FiDownload, FiTerminal } from "react-icons/fi";
import { personal } from "@/data/portfolio";

const links = [
  { href: "#about",      label: "About",      code: "01" },
  { href: "#skills",     label: "Skills",     code: "02" },
  { href: "#projects",   label: "Projects",   code: "03" },
  { href: "#experience", label: "Experience", code: "04" },
  { href: "#contact",    label: "Contact",    code: "05" },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [active,     setActive]     = useState("#home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted,    setMounted]    = useState(false);
  const { theme, setTheme }         = useTheme();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "experience", "contact"];
    const observer = new IntersectionObserver(
      (entries) => { for (const e of entries) { if (e.isIntersecting) setActive(`#${e.target.id}`); } },
      { threshold: 0.35 }
    );
    sections.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "cyber-nav" : "bg-transparent"
      }`}
    >
      {/* Top neon line */}
      {scrolled && (
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #00f5ff, #ff003c, transparent)" }}
        />
      )}

      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <a href="#home" className="flex items-center gap-3 group">
          <div
            className="relative w-9 h-9 rounded-full overflow-hidden border"
            style={{ borderColor: "rgba(0,245,255,0.5)", boxShadow: "0 0 10px rgba(0,245,255,0.3)" }}
          >
            <Image src={personal.photo} alt="Profile" fill sizes="36px" priority className="object-cover" />
          </div>
          <div className="hidden sm:block">
            <span className="font-mono font-bold text-sm" style={{ color: "#00f5ff" }}>
              <span style={{ color: "#ff003c" }}>&lt;</span>
              {personal.name.split(" ")[0]}
              <span style={{ color: "#ff003c" }}> /&gt;</span>
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6">
          {links.map(({ href, label, code }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  const targetId = href.replace('#', '');
                  const elem = document.getElementById(targetId);
                  if (elem) {
                    elem.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = href;
                  }
                }}
                className={`relative font-mono text-sm transition-all duration-200 group flex items-center gap-1.5 ${active === href ? "text-[#00f5ff]" : "text-slate-600 dark:text-slate-300"}`}
              >
                <span className="text-xs" style={{ color: active === href ? "#ff003c" : "rgba(255,0,60,0.3)" }}>
                  {code}
                </span>
                {label}
                {active === href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="nav-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-3">


          <motion.a
            href={personal.cv}
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-4 py-2 transition-all"
            style={{
              border: "1px solid rgba(0,245,255,0.35)",
              color: "#00f5ff",
              background: "rgba(0,245,255,0.04)",
              clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
            }}
          >
            <FiDownload size={14} />
            CV
          </motion.a>

          <button
            className="md:hidden p-2 transition-colors"
            style={{ border: "1px solid rgba(0,245,255,0.2)", background: "rgba(0,245,255,0.04)", color: "#00f5ff" }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden cyber-mobile-menu"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
              {links.map(({ href, label, code }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    const targetId = href.replace('#', '');
                    setTimeout(() => {
                      const elem = document.getElementById(targetId);
                      if (elem) {
                        elem.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        window.location.href = href;
                      }
                    }, 150);
                  }}
                  className="py-3 px-4 font-mono text-sm transition-all flex items-center gap-3"
                  style={{
                    color: active === href ? "#00f5ff" : "rgba(200,216,232,0.7)",
                    background: active === href ? "rgba(0,245,255,0.06)" : "transparent",
                    borderLeft: active === href ? "2px solid #00f5ff" : "2px solid transparent",
                  }}
                >
                  <span style={{ color: "#ff003c", fontSize: "0.7rem" }}>{code}</span>
                  {label}
                </a>
              ))}
              <a
                href={personal.cv}
                download
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center gap-2 py-3 px-4 font-mono text-sm uppercase tracking-widest"
                style={{ border: "1px solid rgba(0,245,255,0.3)", color: "#00f5ff", background: "rgba(0,245,255,0.04)" }}
              >
                <FiDownload size={14} />
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
