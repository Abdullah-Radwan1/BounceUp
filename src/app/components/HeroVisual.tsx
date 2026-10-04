"use client";

import { motion } from "framer-motion";
import { Settings, Database, Code, BarChart, Server } from "lucide-react";

export default function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative hidden lg:block h-125"
    >
      {/* Animated System Nodes */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-md">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40 z-20">
            <Settings className="w-12 h-12 text-white animate-[spin_10s_linear_infinite]" />
          </div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-card border border-border rounded-xl flex items-center justify-center shadow-lg">
              <Database className="w-8 h-8 text-primary" />
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-card border border-border rounded-xl flex items-center justify-center shadow-lg">
              <Code className="w-8 h-8 text-emerald-500" />
            </div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-16 h-16 bg-card border border-border rounded-xl flex items-center justify-center shadow-lg">
              <BarChart className="w-8 h-8 text-purple-500" />
            </div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-16 h-16 bg-card border border-border rounded-xl flex items-center justify-center shadow-lg">
              <Server className="w-8 h-8 text-orange-500" />
            </div>
          </motion.div>

          {/* Connecting lines */}
          <svg
            className="absolute inset-0 w-full h-full -z-10"
            viewBox="0 0 400 400"
          >
            <circle
              cx="200"
              cy="200"
              r="140"
              fill="none"
              stroke="currentColor"
              className="text-border"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
