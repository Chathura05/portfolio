"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  color?: string;
  className?: string;
}

export function Badge({
  children,
  color = "bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300",
  className = "",
}: BadgeProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.08, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide cursor-default ${color} ${className}`}
    >
      {children}
    </motion.span>
  );
}
