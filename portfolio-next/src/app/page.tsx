"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar     from "@/components/sections/Navbar";
import Hero       from "@/components/sections/Hero";
import About      from "@/components/sections/About";
import Skills     from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects   from "@/components/sections/Projects";
import Contact    from "@/components/sections/Contact";
import Footer     from "@/components/sections/Footer";

/* ── Loading screen ───────────────────────────────────── */
function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [onDone]);

  const [dots, setDots] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setDots((d) => (d + 1) % 4), 400);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="loading-screen"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="loader-ring" />
        <div className="text-center">
          <p className="font-mono text-xs tracking-[0.4em] uppercase mb-1" style={{ color: "#00f5ff" }}>
            SYSTEM INITIALIZING
          </p>
          <p className="font-mono text-xs" style={{ color: "rgba(200,216,232,0.3)" }}>
            {`Loading portfolio${".".repeat(dots)}`}
          </p>
        </div>
        {/* Progress bar */}
        <div
          className="w-48 h-px overflow-hidden"
          style={{ background: "rgba(0,245,255,0.1)" }}
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-full"
            style={{ background: "linear-gradient(90deg, #00f5ff, #ff003c)", boxShadow: "0 0 8px #00f5ff" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Page ─────────────────────────────────────────────── */
export default function Page() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <main style={{ background: "#06090f" }}>
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
          <Footer />
        </main>
      )}
    </>
  );
}
