"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaGithub, FaStar, FaCodeBranch, FaUsers, FaBook,
} from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { VscRepo } from "react-icons/vsc";
import { personal } from "@/data/portfolio";
import { SectionWrapper, staggerContainer, fadeUp } from "@/components/ui/SectionWrapper";

const username = personal.github.replace("https://github.com/", "");

/* ── Types ──────────────────────────────────────────────── */
interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  name: string;
}
interface Repo {
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
  size: number;
}

/* ── Language colours ───────────────────────────────────── */
const LANG_COLORS: Record<string, string> = {
  TypeScript:  "#3178c6", JavaScript: "#f7df1e", Python:     "#3572a5",
  Java:        "#b07219", "C++":      "#f34b7d", CSS:        "#563d7c",
  HTML:        "#e34c26", PHP:        "#4f5d95", Go:         "#00add8",
  Rust:        "#dea584", Ruby:       "#701516", Swift:      "#ffac45",
  Kotlin:      "#a97bff", Dart:       "#00b4ab", Shell:      "#89e051",
};

/* ── Stat Card ──────────────────────────────────────────── */
function StatCard({
  icon: Icon, label, value, color, delay = 0,
}: {
  icon: React.ElementType; label: string; value: string | number; color: string; delay?: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      whileHover={{ y: -4, boxShadow: `0 0 20px ${color}40` }}
      className="cyber-bracket flex flex-col items-center justify-center p-5 gap-2 text-center"
      style={{
        background: "rgba(4,6,14,0.8)",
        border: `1px solid ${color}30`,
        backdropFilter: "blur(12px)",
        transition: "all 0.3s",
      }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
        style={{ background: `${color}18`, border: `1px solid ${color}40` }}
      >
        <Icon size={18} style={{ color }} />
      </div>
      <p className="text-2xl font-black font-mono" style={{ color, textShadow: `0 0 10px ${color}60` }}>
        {value}
      </p>
      <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "rgba(200,216,232,0.5)" }}>
        {label}
      </p>
    </motion.div>
  );
}

/* ── Language bar ───────────────────────────────────────── */
function LangBar({ name, pct, color }: { name: string; pct: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
      <span className="font-mono text-xs flex-1" style={{ color: "rgba(200,216,232,0.8)" }}>{name}</span>
      <div className="flex-1 h-1.5 overflow-hidden" style={{ background: "rgba(255,255,255,0.06)", borderRadius: "2px" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{ height: "100%", background: color, boxShadow: `0 0 4px ${color}80`, borderRadius: "2px" }}
        />
      </div>
      <span className="font-mono text-xs w-9 text-right" style={{ color: "rgba(200,216,232,0.5)" }}>
        {pct.toFixed(1)}%
      </span>
    </div>
  );
}

/* ── Streak card image ──────────────────────────────────── */
const streakUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=transparent&ring=00f5ff&fire=ff003c&currStreakLabel=00f5ff&sideLabels=c8d8e8&dates=c8d8e890&stroke=00f5ff30&border=00f5ff30&background=04060e`;

/* ── Main ───────────────────────────────────────────────── */
export default function GitHubStats() {
  const [user, setUser]   = useState<GitHubUser | null>(null);
  const [langs, setLangs] = useState<{ name: string; pct: number; color: string }[]>([]);
  const [stars, setStars] = useState(0);
  const [forks, setForks] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
        ]);
        if (!userRes.ok || !reposRes.ok) return;
        const userData: GitHubUser = await userRes.json();
        const repos: Repo[]        = await reposRes.json();

        // Stars & forks
        const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
        const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);

        // Top languages by repo count (excluding forks)
        const langCount: Record<string, number> = {};
        repos.filter((r) => !r.fork && r.language).forEach((r) => {
          langCount[r.language!] = (langCount[r.language!] || 0) + 1;
        });
        const total = Object.values(langCount).reduce((a, b) => a + b, 0) || 1;
        const topLangs = Object.entries(langCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, count]) => ({
            name,
            pct: (count / total) * 100,
            color: LANG_COLORS[name] ?? "#00f5ff",
          }));

        setUser(userData);
        setStars(totalStars);
        setForks(totalForks);
        setLangs(topLangs);
      } catch {
        // silently fail — no API token needed for basic public data
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const statCards = [
    { icon: FaBook,       label: "Public Repos",  value: user?.public_repos ?? "—",  color: "#00f5ff" },
    { icon: FaStar,       label: "Total Stars",   value: stars || "—",               color: "#ffd700" },
    { icon: FaCodeBranch, label: "Total Forks",   value: forks || "—",               color: "#ff003c" },
    { icon: FaUsers,      label: "Followers",     value: user?.followers ?? "—",      color: "#bf00ff" },
  ];

  return (
    <SectionWrapper id="github" className="py-24 cyber-darker relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,245,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp}>
            <span className="terminal-label text-xs tracking-[0.3em]">ACTIVITY REPORT</span>
          </motion.div>
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 my-4">
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #00f5ff)" }} />
            <SiGithub size={28} style={{ color: "#00f5ff" }} />
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #00f5ff, transparent)" }} />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black">
            <span className="text-slate-800 dark:text-[#e8f4f8]">GitHub </span>
            <span className="heading-accent">Stats</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 font-mono text-sm max-w-md mx-auto" style={{ color: "rgba(200,216,232,0.6)" }}>
            Live data from <span style={{ color: "#00f5ff" }}>@{username}</span>
          </motion.p>
        </motion.div>

        {loading ? (
          /* Loading skeleton */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 animate-pulse" style={{ background: "rgba(0,245,255,0.05)", border: "1px solid rgba(0,245,255,0.1)" }} />
            ))}
          </div>
        ) : (
          <>
            {/* ── Stat Cards ── */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              {statCards.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </motion.div>

            {/* ── Language + Streak side-by-side ── */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="grid md:grid-cols-2 gap-6 mb-8"
            >
              {/* Top Languages */}
              <motion.div
                variants={fadeUp}
                className="cyber-bracket p-6 space-y-4"
                style={{ background: "rgba(4,6,14,0.85)", border: "1px solid rgba(0,245,255,0.15)", backdropFilter: "blur(12px)" }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <VscRepo size={16} style={{ color: "#00f5ff" }} />
                  <span className="font-mono text-sm uppercase tracking-widest" style={{ color: "#00f5ff" }}>Top Languages</span>
                </div>
                {langs.length > 0
                  ? langs.map((l) => <LangBar key={l.name} {...l} />)
                  : <p className="font-mono text-xs" style={{ color: "rgba(200,216,232,0.4)" }}>No public repos found.</p>
                }
              </motion.div>

              {/* Streak Image */}
              <motion.div
                variants={fadeUp}
                className="cyber-bracket overflow-hidden"
                style={{ background: "rgba(4,6,14,0.85)", border: "1px solid rgba(0,245,255,0.15)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={streakUrl}
                  alt="GitHub Contribution Streak"
                  className="w-full h-full object-contain"
                  loading="lazy"
                  style={{ minHeight: "180px" }}
                />
              </motion.div>
            </motion.div>
          </>
        )}

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mt-6"
        >
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cyber inline-flex items-center gap-2"
          >
            <FaGithub size={16} />
            View GitHub Profile
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
