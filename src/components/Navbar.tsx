"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Navbar() {
  const { scrollY } = useScroll();
  const { language, toggleLanguage, t } = useLanguage();

  // Navbar fades in after scrolling 50px
  const opacity = useTransform(scrollY, [0, 50], [0, 1]);
  const pointerEvents = useTransform(scrollY, [0, 50], ["none", "auto"]);
  // Subtle blur-border intensifies on scroll
  const borderOpacity = useTransform(scrollY, [0, 200], [0.05, 0.15]);

  const scrollToPercent = (e: React.MouseEvent<HTMLAnchorElement>, percent: number) => {
    e.preventDefault();
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: maxScroll * percent, behavior: "smooth" });
  };

  return (
    <motion.nav
      style={{ opacity, pointerEvents }}
      className="fixed top-0 left-0 w-full z-50 h-16 flex items-center justify-between px-8"
    >
      {/* Glass background */}
      <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.06]" />
      {/* Golden top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4A373]/50 to-transparent border-glow-anim" />

      {/* Left: Logo */}
      <div className="relative flex items-center gap-2.5 text-white/90 font-semibold tracking-[0.15em] text-sm">
        {/* Coffee cup micro-icon */}
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
          <path d="M3 7h14l-1.8 10H4.8L3 7z" stroke="#D4A373" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 9h1.5a2 2 0 0 1 0 4H17" stroke="#D4A373" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M1.5 17h17" stroke="#D4A373" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5"/>
          <path d="M8 4c0-1.5 1.5-2 1.5-3" stroke="#D4A373" strokeWidth="0.9" strokeLinecap="round" strokeOpacity="0.5"/>
          <path d="M11 4c0-1 1-1.5 1-2.5" stroke="#D4A373" strokeWidth="0.9" strokeLinecap="round" strokeOpacity="0.5"/>
        </svg>
        <span className="shimmer-text">{language === "ar" ? "نايف باحميدان" : "NAIF BAHAMIDAN"}</span>
      </div>

      {/* Center: Links */}
      <div className="relative hidden md:flex items-center gap-8 text-[11px] font-medium tracking-[0.18em] text-white/50">
        {[
          { label: t.nav.overview,     pct: 0    },
          { label: t.nav.quality,      pct: 0.25 },
          { label: t.nav.roasting,     pct: 0.45 },
          { label: t.nav.competitions, pct: 0.95 },
          { label: t.nav.contact,      pct: 1    },
        ].map(({ label, pct }) => (
          <a
            key={label}
            href="#"
            onClick={(e) => scrollToPercent(e, pct)}
            className="nav-link uppercase transition-colors duration-200"
          >
            {label}
          </a>
        ))}
      </div>

      {/* Right: CTA & Language Toggle */}
      <div className="relative flex items-center gap-3">
        <button
          onClick={toggleLanguage}
          className="px-3 py-1.5 text-[11px] font-semibold text-white/50 hover:text-white transition-colors tracking-widest uppercase"
        >
          {language === "en" ? "العربية" : "EN"}
        </button>
        <a
          href="/cv.pdf"
          download="Naif_Bahamidan_CV.pdf"
          className="relative overflow-hidden px-5 py-2 text-[11px] font-semibold rounded-full border border-[#D4A373]/30 text-[#D4A373] hover:text-black transition-all duration-300 group"
        >
          {/* Fill on hover */}
          <span className="absolute inset-0 bg-[#D4A373] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-full" />
          <span className="relative">{t.nav.downloadCv}</span>
        </a>
      </div>
    </motion.nav>
  );
}
