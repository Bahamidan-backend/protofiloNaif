"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LETTERS = "NAIF BAHAMIDAN".split("");

export default function IntroScreen() {
  const [visible, setVisible] = useState(true);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem("intro_seen")) {
      setVisible(false);
      return;
    }
    setStarted(true);
    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("intro_seen", "1");
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#050505" }}
        >
          {/* Ambient background glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 45% at 50% 50%, rgba(212,163,115,0.09) 0%, transparent 70%)" }}
          />

          {/* Thin golden top bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute top-0 left-0 right-0 h-[2px] origin-left"
            style={{ background: "linear-gradient(90deg, transparent, #D4A373, #F5F5DC, #D4A373, transparent)" }}
          />
          {/* Corner accent left */}
          <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
            <div className="absolute top-0 left-0 w-[1px] h-8 bg-gradient-to-b from-[#D4A373]/50 to-transparent" />
            <div className="absolute top-0 left-0 h-[1px] w-8 bg-gradient-to-r from-[#D4A373]/50 to-transparent" />
          </div>

          {/* ☕ Coffee Cup with Steam */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={started ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 flex flex-col items-center gap-1"
          >
            {/* Steam wisps above cup */}
            <div className="flex items-end gap-3 h-7 mb-0.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -10, -2, -8, 0],
                    opacity: [0.2, 0.65, 0.45, 0.7, 0.2],
                    scaleX: [1, 0.7, 1.1, 0.8, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.0 + i * 0.35,
                    delay: i * 0.28,
                    ease: "easeInOut",
                  }}
                  className="w-[2px] rounded-full"
                  style={{
                    height: `${14 + i * 3}px`,
                    background: "linear-gradient(to top, #D4A373, rgba(212,163,115,0))",
                  }}
                />
              ))}
            </div>
            {/* Coffee cup SVG */}
            <svg
              width="44" height="44" viewBox="0 0 44 44"
              fill="none" xmlns="http://www.w3.org/2000/svg"
            >
              {/* Cup body */}
              <path
                d="M7 14h30l-3.5 20H10.5L7 14z"
                stroke="#D4A373" strokeWidth="1.4"
                strokeLinecap="round" strokeLinejoin="round"
                fill="rgba(212,163,115,0.06)"
              />
              {/* Handle */}
              <path
                d="M37 18h3.5a3.5 3.5 0 0 1 0 7H37"
                stroke="#D4A373" strokeWidth="1.4"
                strokeLinecap="round" fill="none"
              />
              {/* Saucer */}
              <path
                d="M4 34h36"
                stroke="#D4A373" strokeWidth="1.2"
                strokeLinecap="round" opacity="0.5"
              />
              {/* Latte art swirl inside cup */}
              <path
                d="M16 22c0-3.5 3-5 6-5s6 1.5 6 5-2 4-6 4-6-0.5-6-4z"
                stroke="#D4A373" strokeWidth="0.7"
                fill="none" opacity="0.35"
              />
              <path
                d="M22 17c0 2.5-2 4-2 6"
                stroke="#D4A373" strokeWidth="0.6"
                fill="none" opacity="0.3"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          {/* Name — letter by letter with proper shimmer (dir="ltr" prevents RTL flex reversal) */}
          <div className="relative" dir="ltr">
            {/* Letter animation layer */}
            <div className="flex items-center justify-center gap-[0.04em] sm:gap-[0.06em] overflow-hidden text-2xl sm:text-4xl md:text-6xl font-bold tracking-[0.08em] sm:tracking-[0.15em] max-w-[95vw] mx-auto px-1" dir="ltr">
              {LETTERS.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 60, opacity: 0 }}
                  animate={started ? { y: 0, opacity: 1 } : {}}
                  transition={{
                    delay: i * 0.06 + 0.2,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`inline-block text-[#D4A373] ${char === " " ? "w-2 sm:w-4" : ""}`}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Shimmer sweep overlay — sits on top, blends with the gold letters */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={started ? { opacity: 1 } : {}}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)",
                backgroundSize: "300% 100%",
                animation: "shimmer-pass 2.8s ease-in-out infinite",
                mixBlendMode: "overlay",
              }}
            />
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={started ? { opacity: 0.5, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-4 text-[11px] sm:text-sm tracking-[0.22em] sm:tracking-[0.4em] text-[#D4A373] uppercase font-light text-center px-4"
          >
            Coffee Quality Manager
          </motion.p>

          {/* Bottom line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut", delay: 0.3 }}
            className="absolute bottom-0 left-0 right-0 h-[1px] origin-right"
            style={{ background: "linear-gradient(270deg, #D4A373, transparent)" }}
          />

          {/* Loading indicator — expanding line */}
          <div className="absolute bottom-10 flex flex-col items-center gap-3">
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
              className="w-24 h-[1px] origin-left"
              style={{ background: "linear-gradient(90deg, transparent, #D4A373, transparent)" }}
            />
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2], scaleY: [0.8, 1.3, 0.8] }}
                  transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.22, ease: "easeInOut" }}
                  className="w-[2px] h-3 rounded-full bg-[#D4A373]"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
