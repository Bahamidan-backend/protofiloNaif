"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #D4A373, #F5F5DC, #D4A373)",
        boxShadow: "0 0 8px rgba(212,163,115,0.6)",
        transformOrigin: "left",
        zIndex: 100,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
      }}
    />
  );
}
