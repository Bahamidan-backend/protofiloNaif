"use client";

import { useEffect, useRef } from "react";

export default function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let frameCount = 0;

    const generateNoise = () => {
      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i]     = value;  // R
        data[i + 1] = value;  // G
        data[i + 2] = value;  // B
        data[i + 3] = Math.random() * 18 + 4; // very low alpha = subtle grain
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const resize = () => {
      // Use lower resolution for performance
      canvas.width  = Math.floor(window.innerWidth / 2);
      canvas.height = Math.floor(window.innerHeight / 2);
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      frameCount++;
      // Refresh grain every 3 frames for a subtle animated film-grain effect
      if (frameCount % 3 === 0) generateNoise();
      animId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      style={{
        width: "100vw",
        height: "100vh",
        mixBlendMode: "overlay",
        opacity: 0.45,
      }}
    />
  );
}
