"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button']")) {
        setIsHovering(true);
      }
    };

    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button']")) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onEnter);
    window.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onEnter);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [isVisible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null; // Don't show on touch devices
  }

  return (
    <>
      {/* Coffee bean main cursor pointer */}
      <motion.div
        animate={{ x: pos.x - 8, y: pos.y - 12, opacity: isVisible ? 1 : 0, scale: isHovering ? 1.25 : 1 }}
        transition={{ type: "spring", stiffness: 800, damping: 35, mass: 0.3 }}
        className="fixed top-0 left-0 pointer-events-none z-[999] text-[#D4A373] drop-shadow-[0_0_8px_rgba(212,163,115,0.7)]"
      >
        <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Coffee bean outer body */}
          <path
            d="M8 1C3.5 1 1 5.5 1 11C1 16.5 3.5 21 8 21C12.5 21 15 16.5 15 11C15 5.5 12.5 1 8 1Z"
            fill="#D4A373"
            stroke="#F5F5DC"
            strokeWidth="0.75"
          />
          {/* Coffee bean S-curve center line */}
          <path
            d="M8 3C9.5 7 6.5 11 8.5 15C9.5 17 8 19 8 19"
            stroke="#2C1810"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Outer coffee halo ring */}
      <motion.div
        animate={{
          x: pos.x - 22,
          y: pos.y - 22,
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.7 : 1,
          backgroundColor: isHovering ? "rgba(212,163,115,0.12)" : "rgba(212,163,115,0.02)",
          borderColor: isHovering ? "rgba(245,245,220,0.6)" : "rgba(212,163,115,0.3)",
        }}
        transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.4 }}
        className="fixed top-0 left-0 w-11 h-11 rounded-full border pointer-events-none z-[998]"
      />
    </>
  );
}
