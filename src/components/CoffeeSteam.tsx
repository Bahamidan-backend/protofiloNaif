"use client";

import { useEffect, useRef } from "react";

interface Wisp {
  startX: number;
  startY: number;
  height: number;
  speed: number;
  width: number;
  amplitude: number;
  frequency: number;
  phase: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export default function CoffeeSteam() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const wisps: Wisp[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnWisp = () => {
      wisps.push({
        startX: Math.random() * canvas.width,
        startY: canvas.height + 10,
        height: 0,
        speed: Math.random() * 0.55 + 0.25,
        width: Math.random() * 1.1 + 0.3,
        amplitude: Math.random() * 22 + 10,
        frequency: Math.random() * 1.2 + 0.6,
        phase: Math.random() * Math.PI * 2,
        alpha: 0,
        life: 0,
        maxLife: Math.random() * 260 + 160,
      });
    };

    // Pre-seed some wisps so the screen isn't empty at start
    for (let i = 0; i < 10; i++) {
      spawnWisp();
      const w = wisps[i];
      const jumpFrames = Math.floor(Math.random() * 180);
      w.life = jumpFrames;
      w.height = jumpFrames * w.speed;
      w.phase += jumpFrames * 0.012;
    }

    let frameCount = 0;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;

      if (frameCount % 14 === 0 && wisps.length < 22) spawnWisp();

      for (let i = wisps.length - 1; i >= 0; i--) {
        const w = wisps[i];
        w.life++;
        w.height += w.speed;
        w.phase += 0.012;

        const progress = w.life / w.maxLife;
        w.alpha =
          progress < 0.18
            ? (progress / 0.18) * 0.2
            : progress < 0.72
            ? 0.2
            : ((1 - progress) / 0.28) * 0.2;

        if (w.height < 4 || w.alpha < 0.005) {
          if (w.life >= w.maxLife) wisps.splice(i, 1);
          continue;
        }

        // Smooth quadratic bezier chain
        const steps = Math.min(35, Math.ceil(w.height / 4));
        const stepH = w.height / steps;

        ctx.beginPath();
        let prevX = w.startX;
        let prevY = w.startY;
        ctx.moveTo(prevX, prevY);

        for (let s = 1; s <= steps; s++) {
          const t = s / steps;
          const y = w.startY - s * stepH;
          const x =
            w.startX +
            Math.sin(w.phase + t * w.frequency * Math.PI * 2) *
              w.amplitude *
              Math.sqrt(t);
          const midX = (prevX + x) / 2;
          const midY = (prevY + y) / 2;
          ctx.quadraticCurveTo(prevX, prevY, midX, midY);
          prevX = x;
          prevY = y;
        }
        ctx.lineTo(prevX, prevY);

        const grad = ctx.createLinearGradient(0, w.startY, 0, w.startY - w.height);
        grad.addColorStop(0,    `rgba(245,232,212,0)`);
        grad.addColorStop(0.18, `rgba(245,232,212,${w.alpha})`);
        grad.addColorStop(0.75, `rgba(245,232,212,${w.alpha * 0.55})`);
        grad.addColorStop(1,    `rgba(245,232,212,0)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = w.width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();

        if (w.life >= w.maxLife) wisps.splice(i, 1);
      }

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
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.85 }}
    />
  );
}
