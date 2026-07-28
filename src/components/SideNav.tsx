"use client";

import { useScroll, useMotionValueEvent, motion } from "framer-motion";
import { useState } from "react";

const SECTIONS = [
  { label: "Intro",          percent: 0 },
  { label: "Quality",        percent: 0.15 },
  { label: "Roasting",       percent: 0.26 },
  { label: "Extraction",     percent: 0.37 },
  { label: "Certifications", percent: 0.48 },
  { label: "Skills",         percent: 0.59 },
  { label: "Experience",     percent: 0.70 },
  { label: "Education",      percent: 0.81 },
  { label: "Contact",        percent: 1.0 },
];

export default function SideNav() {
  const { scrollYProgress } = useScroll();
  const [activeIndex, setActiveIndex] = useState(0);

  // Determine active section from scroll position
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let idx = 0;
    for (let i = 0; i < SECTIONS.length - 1; i++) {
      const mid = (SECTIONS[i].percent + SECTIONS[i + 1].percent) / 2;
      if (v >= mid) idx = i + 1;
    }
    setActiveIndex(idx);
  });

  const scrollToPercent = (percent: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: maxScroll * percent, behavior: "smooth" });
  };

  return (
    <div dir="ltr" className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5 md:gap-3 items-end pointer-events-auto">
      {SECTIONS.map((section, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={section.label}
            onClick={() => scrollToPercent(section.percent)}
            title={section.label}
            className="group flex items-center gap-2 outline-none"
          >
            {/* Label on hover */}
            <span className="text-[10px] text-white/0 group-hover:text-white/50 transition-all duration-200 tracking-widest uppercase font-medium whitespace-nowrap">
              {section.label}
            </span>

            {/* Dot */}
            <motion.div
              animate={{
                width: isActive ? 18 : 6,
                backgroundColor: isActive
                  ? "rgba(212,163,115,1)"
                  : "rgba(255,255,255,0.2)",
                boxShadow: isActive
                  ? "0 0 8px rgba(212,163,115,0.7)"
                  : "none",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-[6px] rounded-full"
            />
          </button>
        );
      })}
    </div>
  );
}
