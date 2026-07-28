"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Mail, Phone, MapPin, ShieldCheck, Coffee, Flame, LineChart, Users, HeartHandshake, ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useCountUp } from "@/hooks/useCountUp";
import { useState } from "react";

export default function StoryOverlays() {
  const { scrollYProgress } = useScroll();
  const { t } = useLanguage();

  // Track which sections are "active" for counter animations
  const [qcActive, setQcActive] = useState(false);
  const [roastActive, setRoastActive] = useState(false);
  const [extractActive, setExtractActive] = useState(false);

  // Counters
  const qc25 = useCountUp(25, 1000, qcActive);
  const qcKg = useCountUp(500, 1000, qcActive);
  const roast98 = useCountUp(98, 1000, roastActive);
  const roastDefect = useCountUp(2, 800, roastActive);
  const ext300 = useCountUp(300, 1000, extractActive);
  const ext48 = useCountUp(48, 1000, extractActive); // represents 4.8 → will divide by 10

  // Hero Intro (0 - 11%)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.07, 0.11, 1], [1, 1, 0, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.11, 1], [0, -50, -50]);

  // QC Reveal (11 - 22%)
  const qcOpacity = useTransform(scrollYProgress, [0, 0.10, 0.11, 0.15, 0.19, 0.22, 1], [0, 0, 0, 1, 1, 0, 0]);
  const qcY = useTransform(scrollYProgress, [0, 0.10, 0.11, 0.15, 0.19, 0.22, 1], [50, 50, 50, 0, 0, -50, -50]);

  // Roasting Mastery (22 - 33%)
  const roastOpacity = useTransform(scrollYProgress, [0, 0.21, 0.22, 0.26, 0.30, 0.33, 1], [0, 0, 0, 1, 1, 0, 0]);
  const roastY = useTransform(scrollYProgress, [0, 0.21, 0.22, 0.26, 0.30, 0.33, 1], [50, 50, 50, 0, 0, -50, -50]);

  // Extraction & Leadership (33 - 44%)
  const extractOpacity = useTransform(scrollYProgress, [0, 0.32, 0.33, 0.37, 0.41, 0.44, 1], [0, 0, 0, 1, 1, 0, 0]);
  const extractY = useTransform(scrollYProgress, [0, 0.32, 0.33, 0.37, 0.41, 0.44, 1], [50, 50, 50, 0, 0, -50, -50]);

  // Certifications (44 - 55%)
  const certOpacity = useTransform(scrollYProgress, [0, 0.43, 0.44, 0.48, 0.52, 0.55, 1], [0, 0, 0, 1, 1, 0, 0]);
  const certY = useTransform(scrollYProgress, [0, 0.43, 0.44, 0.48, 0.52, 0.55, 1], [50, 50, 50, 0, 0, -50, -50]);

  // Skills (55 - 66%)
  const skillsOpacity = useTransform(scrollYProgress, [0, 0.54, 0.55, 0.59, 0.63, 0.66, 1], [0, 0, 0, 1, 1, 0, 0]);
  const skillsY = useTransform(scrollYProgress, [0, 0.54, 0.55, 0.59, 0.63, 0.66, 1], [50, 50, 50, 0, 0, -50, -50]);

  // Timeline / Experience (66 - 77%)
  const timelineOpacity = useTransform(scrollYProgress, [0, 0.65, 0.66, 0.70, 0.74, 0.77, 1], [0, 0, 0, 1, 1, 0, 0]);
  const timelineY = useTransform(scrollYProgress, [0, 0.65, 0.66, 0.70, 0.74, 0.77, 1], [50, 50, 50, 0, 0, -50, -50]);

  // Education & Languages (77 - 88%)
  const eduOpacity = useTransform(scrollYProgress, [0, 0.76, 0.77, 0.81, 0.85, 0.88, 1], [0, 0, 0, 1, 1, 0, 0]);
  const eduY = useTransform(scrollYProgress, [0, 0.76, 0.77, 0.81, 0.85, 0.88, 1], [50, 50, 50, 0, 0, -50, -50]);

  // CTA (88 - 100%)
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.87, 0.88, 0.93, 1], [0, 0, 0, 1, 1]);
  const ctaY = useTransform(scrollYProgress, [0, 0.87, 0.88, 0.93, 1], [50, 50, 50, 0, 0]);

  // Glow orb moves subtly as user scrolls
  const glowX = useTransform(scrollYProgress, [0, 0.5, 1], ["30%", "70%", "30%"]);
  const glowY = useTransform(scrollYProgress, [0, 0.5, 1], ["20%", "60%", "80%"]);

  // Activate counters when sections become visible
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setQcActive(v >= 0.11 && v <= 0.22);
    setRoastActive(v >= 0.22 && v <= 0.33);
    setExtractActive(v >= 0.33 && v <= 0.44);
  });

  return (
    <div className="relative z-10 w-full text-white/90">

      {/* Animated Glow Orb - floats behind all content */}
      <motion.div
        className="fixed w-[800px] h-[800px] rounded-full pointer-events-none z-0 orb-float"
        style={{
          left: glowX,
          top: glowY,
          background: "radial-gradient(circle, rgba(212,163,115,0.15) 0%, rgba(212,163,115,0.04) 40%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />

      {/* 1. HERO INTRO */}
      <motion.section
        style={{ opacity: heroOpacity, y: heroY }}
        className="fixed inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none z-10"
      >
        {/* Ambient hero background */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(212,163,115,0.06) 0%, transparent 70%)"
        }} />

        {/* Profile Picture with Open to Work badge */}
        <div className="relative mb-8 pointer-events-auto">
          {/* Outer glow ring — dual pulse */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-4 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(212,163,115,0.3) 0%, transparent 70%)" }}
          />
          <motion.div
            animate={{ scale: [1.05, 1, 1.05], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -inset-8 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(212,163,115,0.15) 0%, transparent 65%)" }}
          />
          {/* Latte Art Decorative Ring — static SVG to avoid SSR/client hydration mismatch */}
          <div className="absolute -inset-6 rounded-full pointer-events-none" style={{ zIndex: -1 }}>
            <svg viewBox="0 0 220 220" className="w-full h-full">
              {/* Outer slow-spinning dashed ring */}
              <g className="latte-ring" style={{ transformOrigin: "110px 110px" }}>
                <circle cx="110" cy="110" r="106"
                  stroke="#D4A373" strokeWidth="0.7" fill="none"
                  strokeDasharray="5 8" strokeOpacity="0.35"
                />
              </g>
              {/* Inner counter-spinning dashed ring */}
              <g className="latte-ring-rev" style={{ transformOrigin: "110px 110px" }}>
                <circle cx="110" cy="110" r="97"
                  stroke="#D4A373" strokeWidth="0.4" fill="none"
                  strokeDasharray="2 12" strokeOpacity="0.2"
                />
              </g>
              {/* 12 radial swirl lines — pre-computed to avoid SSR hydration mismatch */}
              {/* deg=0   */}<line x1="172" y1="110" x2="205.6" y2="137.2" stroke="#D4A373" strokeWidth="0.5" strokeOpacity="0.22" />
              {/* deg=30  */}<line x1="163.7" y1="141" x2="188.5" y2="161.4" stroke="#D4A373" strokeWidth="0.5" strokeOpacity="0.22" />
              {/* deg=60  */}<line x1="141" y1="163.7" x2="161.4" y2="188.5" stroke="#D4A373" strokeWidth="0.5" strokeOpacity="0.22" />
              {/* deg=90  */}<line x1="110" y1="172" x2="82.8" y2="205.6" stroke="#D4A373" strokeWidth="0.5" strokeOpacity="0.22" />
              {/* deg=120 */}<line x1="79" y1="163.7" x2="58.6" y2="188.5" stroke="#D4A373" strokeWidth="0.5" strokeOpacity="0.22" />
              {/* deg=150 */}<line x1="56.3" y1="141" x2="31.5" y2="161.4" stroke="#D4A373" strokeWidth="0.5" strokeOpacity="0.22" />
              {/* deg=180 */}<line x1="48" y1="110" x2="14.4" y2="82.8" stroke="#D4A373" strokeWidth="0.5" strokeOpacity="0.22" />
              {/* deg=210 */}<line x1="56.3" y1="79" x2="31.5" y2="58.6" stroke="#D4A373" strokeWidth="0.5" strokeOpacity="0.22" />
              {/* deg=240 */}<line x1="79" y1="56.3" x2="58.6" y2="31.5" stroke="#D4A373" strokeWidth="0.5" strokeOpacity="0.22" />
              {/* deg=270 */}<line x1="110" y1="48" x2="137.2" y2="14.4" stroke="#D4A373" strokeWidth="0.5" strokeOpacity="0.22" />
              {/* deg=300 */}<line x1="141" y1="56.3" x2="161.4" y2="31.5" stroke="#D4A373" strokeWidth="0.5" strokeOpacity="0.22" />
              {/* deg=330 */}<line x1="163.7" y1="79" x2="188.5" y2="58.6" stroke="#D4A373" strokeWidth="0.5" strokeOpacity="0.22" />
              {/* 4 cardinal diamond marks */}
              <circle cx="216" cy="110" r="2.5" fill="#D4A373" fillOpacity="0.5" />
              <circle cx="110" cy="216" r="2.5" fill="#D4A373" fillOpacity="0.5" />
              <circle cx="4" cy="110" r="2.5" fill="#D4A373" fillOpacity="0.5" />
              <circle cx="110" cy="4" r="2.5" fill="#D4A373" fillOpacity="0.5" />
            </svg>
          </div>

          {/* Profile ring */}

          <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full p-[2px]"
            style={{
              background: "linear-gradient(135deg, #D4A373 0%, rgba(212,163,115,0.4) 50%, transparent 100%)",
              boxShadow: "0 0 60px rgba(212,163,115,0.45), 0 0 120px rgba(212,163,115,0.15)",
            }}
          >
            <div className="w-full h-full rounded-full border-2 border-[#0A0A0C] overflow-hidden bg-[#111]">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/profile.jpg`}
                alt="Naif Bahamidan"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
          {/* Open to Work badge */}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a7c37]/90 border border-green-400/40 shadow-[0_0_16px_rgba(34,197,94,0.5)] whitespace-nowrap backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-300 text-xs font-semibold tracking-wide">Open to Work</span>
          </motion.div>
        </div>

        <h1 className="shimmer-text text-5xl md:text-8xl font-bold tracking-tight mb-4">
          {t.hero.name}
        </h1>
        <h2 className="text-xl md:text-3xl font-medium text-white/70 mb-6 max-w-2xl tracking-wide">
          {t.hero.role}
        </h2>
        <p className="text-base md:text-xl text-white/45 max-w-xl font-light leading-relaxed">
          {t.hero.subtitle}
        </p>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-white/30 tracking-[0.35em] uppercase">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#D4A373]/60 to-transparent" />
        </motion.div>
      </motion.section>

      {/* 2. QUALITY CONTROL */}
      <motion.section
        style={{ opacity: qcOpacity, y: qcY }}
        className="fixed inset-0 flex flex-col items-start justify-center px-8 md:px-24 pointer-events-none z-10"
      >
        <div className="max-w-xl">
          {/* Section label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-gradient-to-r from-[#D4A373] to-transparent" />
            <span className="text-[#D4A373] text-xs font-semibold tracking-[0.25em] uppercase">Quality Control</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-10 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#F5F5DC] drop-shadow-xl">
            {t.quality.title}
          </h2>
          <div className="space-y-5 text-lg md:text-xl text-white/80 font-light leading-relaxed drop-shadow-md">
            {/* Animated Stat highlight */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="text-3xl md:text-4xl font-bold text-[#D4A373] drop-shadow-[0_0_10px_rgba(212,163,115,0.5)] shrink-0 tabular-nums">{qc25}%</div>
              <p className="pt-1">{t.quality.p1}</p>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="text-3xl md:text-4xl font-bold text-[#D4A373] drop-shadow-[0_0_10px_rgba(212,163,115,0.5)] shrink-0 tabular-nums">{qcKg}<span className="text-xl">kg</span></div>
              <p className="pt-1">{t.quality.p2}</p>
            </div>
          </div>

          {/* ☕ SCA Cupping Evaluation Card */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#2C1810]/40 to-white/[0.02] border border-[#D4A373]/20 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-md">
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-[#D4A373]" />
                <span className="text-xs font-semibold text-[#D4A373] tracking-widest uppercase">SCA Cupping Evaluation Standard</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4A373]/20 text-[#F5F5DC] font-mono border border-[#D4A373]/30">Grade 86.5+</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                <div className="text-white/40 text-[9px] uppercase tracking-wider mb-0.5">Fragrance</div>
                <div className="font-bold text-[#F5F5DC]">8.75</div>
              </div>
              <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                <div className="text-white/40 text-[9px] uppercase tracking-wider mb-0.5">Acidity</div>
                <div className="font-bold text-[#F5F5DC]">8.50</div>
              </div>
              <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                <div className="text-white/40 text-[9px] uppercase tracking-wider mb-0.5">Uniformity</div>
                <div className="font-bold text-[#F5F5DC]">10.0</div>
              </div>
              <div className="bg-[#D4A373]/15 p-2 rounded-lg border border-[#D4A373]/40">
                <div className="text-[#D4A373] text-[9px] uppercase tracking-wider mb-0.5">SCA Score</div>
                <div className="font-bold text-[#D4A373]">88.25</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. ROASTING MASTERY */}
      <motion.section
        style={{ opacity: roastOpacity, y: roastY }}
        className="fixed inset-0 flex flex-col items-end justify-center px-8 md:px-24 text-right pointer-events-none z-10"
      >
        <div className="max-w-xl">
          <div className="flex items-center gap-3 mb-6 justify-end">
            <span className="text-[#D4A373] text-xs font-semibold tracking-[0.25em] uppercase">Roasting Mastery</span>
            <div className="w-8 h-[2px] bg-gradient-to-l from-[#D4A373] to-transparent" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-10 text-transparent bg-clip-text bg-gradient-to-l from-white to-[#D4A373] drop-shadow-xl">
            {t.roasting.title}
          </h2>
          <div className="space-y-5 text-lg md:text-xl text-white/80 font-light leading-relaxed drop-shadow-md">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 justify-end flex-row-reverse">
              <div className="text-3xl md:text-4xl font-bold text-[#D4A373] drop-shadow-[0_0_10px_rgba(212,163,115,0.5)] shrink-0 tabular-nums">{roast98}%</div>
              <p className="pt-1">{t.roasting.p1}</p>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 justify-end flex-row-reverse">
              <div className="text-3xl md:text-4xl font-bold text-[#D4A373] drop-shadow-[0_0_10px_rgba(212,163,115,0.5)] shrink-0 tabular-nums">&lt;{roastDefect}%</div>
              <p className="pt-1">{t.roasting.p3}</p>
            </div>
          </div>

          {/* ☕ Coffee Roast Level Bar */}
          {roastActive && (
            <div className="mt-8 space-y-2 text-right">
              <p className="text-[10px] text-[#D4A373]/50 tracking-[0.3em] uppercase font-semibold">Roast Mastery Level</p>
              <div className="relative h-2.5 w-full rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {/* Gradient fill */}
                <div
                  className="absolute left-0 top-0 h-full rounded-full roast-bar-fill"
                  style={{
                    background: "linear-gradient(90deg, #F5DEB3 0%, #C8803A 45%, #8B4513 78%, #3B1A0A 100%)",
                    boxShadow: "0 0 12px rgba(200,128,58,0.5)",
                  }}
                />
                {/* Indicator glow dot */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                  style={{
                    left: "calc(82% - 6px)",
                    background: "#F5DEB3",
                    boxShadow: "0 0 10px rgba(245,222,179,0.9), 0 0 20px rgba(200,128,58,0.5)",
                    border: "1.5px solid rgba(255,255,255,0.6)",
                  }}
                />
              </div>
              <div className="flex justify-between text-[9px] text-white/25 tracking-[0.2em] uppercase">
                <span>Light</span>
                <span>Medium</span>
                <span>Dark</span>
              </div>
            </div>
          )}
        </div>
      </motion.section>

      {/* 4. EXTRACTION & LEADERSHIP */}
      <motion.section
        style={{ opacity: extractOpacity, y: extractY }}
        className="fixed inset-0 flex flex-col items-start justify-center px-8 md:px-24 pointer-events-none z-10"
      >
        <div className="max-w-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-gradient-to-r from-[#D4A373] to-transparent" />
            <span className="text-[#D4A373] text-xs font-semibold tracking-[0.25em] uppercase">Extraction & Service</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-10 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#F5F5DC] drop-shadow-xl">
            {t.extraction.title}
          </h2>
          <div className="space-y-5 text-lg md:text-xl text-white/80 font-light leading-relaxed drop-shadow-md">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="text-3xl md:text-4xl font-bold text-[#D4A373] drop-shadow-[0_0_10px_rgba(212,163,115,0.5)] shrink-0 tabular-nums">{ext300}<span className="text-xl">+</span></div>
              <p className="pt-1">{t.extraction.p1}</p>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="text-3xl md:text-4xl font-bold text-[#D4A373] drop-shadow-[0_0_10px_rgba(212,163,115,0.5)] shrink-0">4.8<span className="text-xl">/5</span></div>
              <p className="pt-1">{t.extraction.p3}</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 5. CERTIFICATIONS */}
      <motion.section
        style={{ opacity: certOpacity, y: certY }}
        className="fixed inset-0 flex flex-col items-center justify-center px-4 md:px-8 text-center pointer-events-none z-10"
      >
        <div className="max-w-4xl w-full">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="w-8 h-[2px] bg-gradient-to-r from-transparent to-[#D4A373]" />
            <span className="text-[#D4A373] text-xs font-semibold tracking-[0.25em] uppercase">Certifications</span>
            <div className="w-8 h-[2px] bg-gradient-to-l from-transparent to-[#D4A373]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D4A373]">
            {t.certifications.title}
          </h2>

          {/* Certificate Card */}
          <div className="relative p-[1px] bg-gradient-to-b from-white/20 to-white/5 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md mx-auto max-w-3xl pointer-events-auto">
            <div className="absolute inset-0 bg-[#0A0A0C]/90" />
            <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">

              {/* Image */}
              <div className="w-full md:w-1/2 flex-shrink-0 relative rounded-xl overflow-hidden shadow-2xl shadow-black/80 border border-white/10 group">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/certificate.jpg`}
                  alt="SCA Certificate"
                  className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none" />
              </div>

              {/* Details */}
              <div className="text-left w-full md:w-1/2" dir="auto">
                <div className="w-12 h-12 mb-6 rounded-full bg-[#111] flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(212,163,115,0.15)] mx-auto md:mx-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4A373" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                  {t.certifications.org}
                </h3>
                <p className="text-[#D4A373] text-xl font-medium mb-4">{t.certifications.certName}</p>
                <div className="flex flex-col gap-2 text-white/50 text-sm font-light">
                  <p>{t.certifications.completed}</p>
                  <p className="text-white/70 mt-2 font-medium">{t.certifications.auth}</p>
                  <p className="text-[#D4A373]/80">{t.certifications.valid}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </motion.section>

      {/* 6. TECHNICAL & PROFESSIONAL SKILLS */}
      <motion.section
        style={{ opacity: skillsOpacity, y: skillsY }}
        className="fixed inset-0 flex flex-col items-center justify-center px-4 md:px-8 text-center pointer-events-none z-10"
      >
        <div className="max-w-6xl w-full">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="w-8 h-[2px] bg-gradient-to-r from-transparent to-[#D4A373]" />
            <span className="text-[#D4A373] text-xs font-semibold tracking-[0.25em] uppercase">Skills</span>
            <div className="w-8 h-[2px] bg-gradient-to-l from-transparent to-[#D4A373]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D4A373]">
            {t.skills?.title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pointer-events-auto">
            {[
              { icon: ShieldCheck, key: "s1" },
              { icon: Coffee, key: "s2" },
              { icon: Flame, key: "s3" },
              { icon: LineChart, key: "s4" },
              { icon: Users, key: "s5" },
              { icon: HeartHandshake, key: "s6" },
            ].map(({ icon: Icon, key }, idx) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card flex flex-col items-center p-6 md:p-8 rounded-2xl transition-all duration-400 group cursor-default"
              >
                {/* Icon container with ring pulse */}
                <div className="icon-ring w-12 h-12 rounded-full flex items-center justify-center mb-5 border border-[#D4A373]/15 bg-gradient-to-br from-[#D4A373]/10 to-transparent group-hover:border-[#D4A373]/50 group-hover:from-[#D4A373]/20 transition-all duration-300" style={{ boxShadow: "0 0 0 0 rgba(212,163,115,0)" }}>
                  <Icon className="w-5 h-5 text-[#D4A373]/60 group-hover:text-[#D4A373] transition-colors duration-300" />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-white mb-3 leading-snug">{(t.skills as any)?.[key]?.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{(t.skills as any)?.[key]?.desc}</p>
                {/* Bottom accent line */}
                <div className="mt-4 w-8 h-[1px] bg-gradient-to-r from-transparent via-[#D4A373]/40 to-transparent group-hover:w-16 group-hover:via-[#D4A373]/70 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 7. PROFESSIONAL EXPERIENCE TIMELINE */}
      <motion.section
        style={{ opacity: timelineOpacity, y: timelineY }}
        className="fixed inset-0 flex flex-col items-center justify-center px-4 md:px-16 pointer-events-none z-10"
      >
        <div className="max-w-4xl w-full">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="w-8 h-[2px] bg-gradient-to-r from-transparent to-[#D4A373]" />
            <span className="text-[#D4A373] text-xs font-semibold tracking-[0.25em] uppercase">Experience</span>
            <div className="w-8 h-[2px] bg-gradient-to-l from-transparent to-[#D4A373]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D4A373] text-center">
            {(t as any).timeline?.title}
          </h2>

          <div className="relative pointer-events-auto">
            {/* Vertical connector line — glowing gradient */}
            <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-[1px]"
              style={{
                background: "linear-gradient(to bottom, rgba(212,163,115,0.8) 0%, rgba(212,163,115,0.3) 50%, transparent 100%)",
                boxShadow: "0 0 8px rgba(212,163,115,0.2)",
              }}
            />

            <div className="space-y-8">
              {((t as any).timeline?.jobs ?? []).map((job: { role: string; company: string; location: string; period: string; desc: string }, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.18, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Content card */}
                  <div className={`flex-1 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"} pl-10 md:pl-0`}>
                    <div className="glass-card relative p-5 rounded-2xl transition-all duration-300 group">
                      {/* Corner accent */}
                      <div className="absolute top-0 left-0 w-8 h-8 rounded-tl-2xl overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-0 w-[1px] h-8 bg-gradient-to-b from-[#D4A373]/50 to-transparent" />
                        <div className="absolute top-0 left-0 h-[1px] w-8 bg-gradient-to-r from-[#D4A373]/50 to-transparent" />
                      </div>
                      <span className="inline-block text-[#D4A373] text-xs font-semibold tracking-wider px-2 py-0.5 rounded-full bg-[#D4A373]/10 border border-[#D4A373]/20 mb-3">
                        {job.period}
                      </span>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1">{job.role}</h3>
                      <p className="text-[#D4A373]/80 text-sm font-medium mb-3">{job.company}</p>
                      <p className="text-white/45 text-sm leading-relaxed">{job.desc}</p>
                    </div>
                  </div>

                  {/* Center dot — pulsing */}
                  <div className="timeline-dot absolute left-[12px] md:left-1/2 md:-translate-x-1/2 mt-5 w-3 h-3 rounded-full bg-[#D4A373] border-2 border-[#050505]"
                    style={{ boxShadow: "0 0 12px rgba(212,163,115,0.8)" }}
                  />

                  {/* Spacer for opposite side on md */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 8. EDUCATION & LANGUAGES */}
      <motion.section
        style={{ opacity: eduOpacity, y: eduY }}
        className="fixed inset-0 flex flex-col items-center justify-center px-4 md:px-8 text-center pointer-events-none z-10"
      >
        <div className="max-w-5xl w-full">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="w-8 h-[2px] bg-gradient-to-r from-transparent to-[#D4A373]" />
            <span className="text-[#D4A373] text-xs font-semibold tracking-[0.25em] uppercase">Education & Languages</span>
            <div className="w-8 h-[2px] bg-gradient-to-l from-transparent to-[#D4A373]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D4A373]">
            {t.education.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pointer-events-auto">
            {/* Education Card */}
            <div className="relative p-[1px] bg-gradient-to-br from-[#D4A373]/40 to-transparent rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
              <div className="absolute inset-0 bg-[#0A0A0C]/90" />
              <div className="relative p-8 md:p-12 flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 mb-8 rounded-full bg-[#111] flex items-center justify-center border border-[#D4A373]/30 shadow-[0_0_30px_rgba(212,163,115,0.2)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4A373" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  {t.education.degree}
                </h3>
                <p className="text-[#D4A373] text-lg font-medium">{t.education.university}</p>
              </div>
            </div>

            {/* Languages Card */}
            <div className="relative p-[1px] bg-gradient-to-bl from-[#D4A373]/40 to-transparent rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
              <div className="absolute inset-0 bg-[#0A0A0C]/90" />
              <div className="relative p-8 md:p-12 flex flex-col justify-center h-full text-left" dir="auto">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-[#111] flex items-center justify-center border border-[#D4A373]/30 shadow-[0_0_20px_rgba(212,163,115,0.15)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4A373" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><path d="M2 12h20" /></svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white">{t.education.languages}</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#D4A373]/20 transition-all">
                    <span className="text-white/90 text-lg font-medium">العربية (Arabic)</span>
                    <span className="text-[#D4A373] text-xs px-3 py-1 rounded-full bg-[#D4A373]/10 border border-[#D4A373]/20 font-semibold tracking-wide">Native</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#D4A373]/20 transition-all">
                    <span className="text-white/90 text-lg font-medium">English</span>
                    <span className="text-[#D4A373] text-xs px-3 py-1 rounded-full bg-[#D4A373]/10 border border-[#D4A373]/20 font-semibold tracking-wide">Professional</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 9. REASSEMBLY & CTA */}
      <motion.section
        style={{ opacity: ctaOpacity, y: ctaY }}
        className="fixed inset-0 flex flex-col items-center justify-end pb-24 md:pb-36 text-center px-4 pointer-events-auto z-10"
      >
        {/* CTA ambient glow backdrop */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(212,163,115,0.08) 0%, transparent 65%)"
        }} />

        {/* 3x Competitions Badge */}
        <motion.div
          animate={{ scale: [1, 1.04, 1], boxShadow: ["0 0 20px rgba(212,163,115,0.1)", "0 0 35px rgba(212,163,115,0.25)", "0 0 20px rgba(212,163,115,0.1)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D4A373]/10 border border-[#D4A373]/30 mb-8 backdrop-blur-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#D4A373" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
          <span className="text-[#D4A373] text-sm font-semibold tracking-wide">{t.cta.subtitle}</span>
        </motion.div>

        <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
          <span className="text-white">{t.cta.title1}</span><br />
          <span className="shimmer-text">{t.cta.title2}</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-4 items-center mt-10 mb-8">
          <a
            href="mailto:nayff200@gmail.com"
            className="relative overflow-hidden flex items-center gap-2 px-7 py-3.5 bg-[#D4A373] text-black font-semibold rounded-full transition-all duration-300 group"
            style={{ boxShadow: "0 0 30px rgba(212,163,115,0.5)" }}
          >
            <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-full" />
            <Mail className="w-4 h-4 relative" />
            <span className="relative">nayff200@gmail.com</span>
          </a>
          <a
            href="https://linkedin.com/in/naif-bahamidan-65b794260"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-7 py-3.5 bg-transparent border border-white/15 text-white/80 font-medium rounded-full hover:bg-white/8 hover:border-white/35 hover:text-white transition-all duration-300 text-base backdrop-blur-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
            {t.cta.linkedin}
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-8 items-center text-white/35 text-sm font-medium">
          <a href="tel:+966557856866" className="flex items-center gap-2 hover:text-[#D4A373]/80 transition-colors duration-200">
            <Phone className="w-4 h-4" />
            +966 55 7856 866
          </a>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {t.cta.location}
          </div>
        </div>
      </motion.section>

    </div>
  );
}
