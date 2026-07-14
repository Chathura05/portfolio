"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaEnvelope, FaGithub, FaLinkedinIn, FaWhatsapp, FaFileDownload,
} from "react-icons/fa";
import { FiSend, FiUser, FiMail, FiMessageSquare, FiCheckCircle } from "react-icons/fi";
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

/* ── Cyber Input Field ─────────────────────────────────── */
function CyberInput({
  id,
  label,
  icon: Icon,
  type = "text",
  required,
  textarea,
  value,
  onChange,
}: {
  id: string;
  label: string;
  icon: React.ElementType;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const sharedStyle: React.CSSProperties = {
    background: "rgba(0,245,255,0.02)",
    border: `1px solid ${active ? "rgba(0,245,255,0.5)" : "rgba(0,245,255,0.15)"}`,
    color: "inherit",
    fontFamily: "'Fira Code', monospace",
    fontSize: "0.875rem",
    outline: "none",
    width: "100%",
    padding: "12px 14px 12px 42px",
    transition: "border-color 0.25s, box-shadow 0.25s",
    boxShadow: active ? "0 0 12px rgba(0,245,255,0.15), inset 0 0 12px rgba(0,245,255,0.03)" : "none",
    resize: textarea ? "none" : undefined,
  } as React.CSSProperties;

  return (
    <div className="relative">
      {/* Corner bracket top-left */}
      <div
        className="absolute top-0 left-0 w-3 h-3 pointer-events-none z-10"
        style={{
          borderTop: `1px solid ${active ? "#00f5ff" : "rgba(0,245,255,0.4)"}`,
          borderLeft: `1px solid ${active ? "#00f5ff" : "rgba(0,245,255,0.4)"}`,
          transition: "border-color 0.25s",
        }}
      />
      {/* Corner bracket bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-3 h-3 pointer-events-none z-10"
        style={{
          borderBottom: `1px solid ${active ? "#ff003c" : "rgba(255,0,60,0.3)"}`,
          borderRight: `1px solid ${active ? "#ff003c" : "rgba(255,0,60,0.3)"}`,
          transition: "border-color 0.25s",
        }}
      />

      {/* Icon */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: active ? "#00f5ff" : "rgba(0,245,255,0.35)", transition: "color 0.25s", ...(textarea ? { top: "18px", transform: "none" } : {}) }}>
        <Icon size={15} />
      </div>

      {/* Floating label */}
      <label
        htmlFor={id}
        className="absolute left-10 pointer-events-none font-mono text-xs uppercase tracking-widest transition-all duration-200"
        style={{
          color: active ? "#00f5ff" : "rgba(0,245,255,0.4)",
          top: active ? "-8px" : (textarea ? "14px" : "50%"),
          transform: active ? "none" : (textarea ? "none" : "translateY(-50%)"),
          fontSize: active ? "0.65rem" : "0.75rem",
          background: active ? "linear-gradient(to right, #04060e, #06090f)" : "transparent",
          padding: active ? "0 4px" : "0",
          zIndex: 5,
        }}
      >
        {label}
      </label>

      {textarea ? (
        <textarea
          id={id}
          rows={5}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={sharedStyle}
          className="text-slate-800 dark:text-[#c8d8e8] placeholder-transparent"
        />
      ) : (
        <input
          id={id}
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={sharedStyle}
          className="text-slate-800 dark:text-[#c8d8e8] placeholder-transparent"
        />
      )}
    </div>
  );
}

/* ── Contact ────────────────────────────────────────────── */
export default function Contact() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [sent,    setSent]    = useState(false);

  const [sending, setSending] = useState(false);
  const [error,   setError]   = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // ── Formspree (recommended) ──────────────────────────
    if (personal.formspreeEndpoint) {
      setSending(true);
      try {
        const res = await fetch(personal.formspreeEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name, email, message }),
        });
        if (res.ok) {
          setSent(true);
          setTimeout(() => setSent(false), 5000);
          setName(""); setEmail(""); setMessage("");
        } else {
          setError("Failed to send. Please try emailing directly.");
        }
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setSending(false);
      }
      return;
    }

    // ── Fallback: mailto ─────────────────────────────────
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.open(`mailto:${personal.email}?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setName(""); setEmail(""); setMessage("");
  };


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
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          // Looking for internship opportunities. Open to collaboration, projects, or just a tech chat.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">

          {/* ── Contact Form ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className="relative p-6 md:p-8 bg-white/70 dark:bg-[#04060e]/80"
              style={{ border: "1px solid rgba(0,245,255,0.12)" }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6" style={{ borderTop: "2px solid #00f5ff", borderLeft: "2px solid #00f5ff" }} />
              <div className="absolute bottom-0 right-0 w-6 h-6" style={{ borderBottom: "2px solid #ff003c", borderRight: "2px solid #ff003c" }} />

              <p className="terminal-label mb-6">Send Message</p>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 gap-4"
                >
                  <FiCheckCircle size={48} style={{ color: "#39ff14", filter: "drop-shadow(0 0 12px #39ff14)" }} />
                  <p className="font-mono text-sm text-center" style={{ color: "#39ff14" }}>
                    // Message composed. Opening mail client...
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <CyberInput
                    id="contact-name"
                    label="Your Name"
                    icon={FiUser}
                    required
                    value={name}
                    onChange={setName}
                  />
                  <CyberInput
                    id="contact-email"
                    label="Email Address"
                    icon={FiMail}
                    type="email"
                    required
                    value={email}
                    onChange={setEmail}
                  />
                  <CyberInput
                    id="contact-message"
                    label="Message"
                    icon={FiMessageSquare}
                    textarea
                    required
                    value={message}
                    onChange={setMessage}
                  />

                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={sending ? {} : { scale: 1.03 }}
                    whileTap={sending ? {} : { scale: 0.97 }}
                    className="btn-cyber w-full flex items-center justify-center gap-2"
                    style={sending ? { opacity: 0.7, cursor: "not-allowed" } : {}}
                  >
                    {sending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend size={15} />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  {error && (
                    <p className="font-mono text-xs text-center mt-2" style={{ color: "#ff003c" }}>
                      ⚠ {error}
                    </p>
                  )}
                </form>
              )}
            </div>
          </motion.div>

          {/* ── Contact Links ──────────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-4 justify-center"
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
                  whileHover={{ x: 6 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-4 p-4 group transition-all bg-white/70 dark:bg-[#04060e]/80"
                  style={{ border: `1px solid ${colors.border}20`, position: "relative" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = `${colors.border}50`;
                    el.style.boxShadow   = `0 0 16px ${colors.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = `${colors.border}20`;
                    el.style.boxShadow   = "none";
                  }}
                >
                  {/* Side accent */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(180deg, ${colors.border}, transparent)` }}
                  />

                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                    style={{
                      border: `1px solid ${colors.border}35`,
                      background: `${colors.border}08`,
                      color: colors.border,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono font-bold text-xs uppercase tracking-widest mb-0.5" style={{ color: colors.border }}>
                      {link.label}
                    </p>
                    <p className="font-mono text-xs truncate text-slate-500 dark:text-slate-400">
                      {link.value}
                    </p>
                  </div>
                  <div className="ml-auto flex-shrink-0 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: colors.border }}>
                    →
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
      <div className="cyber-divider mt-16" />
    </section>
  );
}
