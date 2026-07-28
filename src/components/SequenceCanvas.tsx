"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export default function SequenceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const { scrollYProgress } = useScroll();
  const totalFrames = 300;

  // Preload images with smart mobile downsampling & fast caching
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    // On mobile: 75 frames (step 4), Desktop: 150 frames (step 2) for instant load & 60fps scroll
    const step = isMobile ? 4 : 2;

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

    for (let i = 1; i <= totalFrames; i += step) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `${basePath}/sequence/ezgif-frame-${paddedIndex}.jpg`;

      img.onload = () => {
        const currentFrameIndex = Math.min(
          totalFrames - 1,
          Math.max(0, Math.floor(scrollYProgress.get() * totalFrames))
        );
        if (Math.abs(i - 1 - currentFrameIndex) <= step) {
          drawFrame(currentFrameIndex);
        }
      };

      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Draw frame on canvas with mobile-optimized resolution
  const drawFrame = (index: number) => {
    if (!canvasRef.current || images.length === 0) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Find nearest loaded image if downsampled
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const step = isMobile ? 4 : 2;
    const mappedIndex = Math.min(
      images.length - 1,
      Math.max(0, Math.floor(index / step))
    );
    const img = images[mappedIndex];
    if (!img || !img.complete) return;

    const canvas = canvasRef.current;

    // Scale to fit while maintaining aspect ratio (cover)
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const width = img.width * scale;
    const height = img.height * scale;
    const x = (canvas.width - width) / 2;
    const y = (canvas.height - height) / 2;

    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, x, y, width, height);
  };

  // Handle resize and initial draw with DPR capping for high performance
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const isMobile = window.innerWidth < 768;
        // Cap max canvas resolution on mobile to prevent GPU/RAM memory overload
        const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        const currentFrameIndex = Math.min(
          totalFrames - 1,
          Math.max(0, Math.floor(scrollYProgress.get() * totalFrames))
        );
        drawFrame(currentFrameIndex);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    if (images.length > 0) {
      if (images[0].complete) {
        drawFrame(0);
      } else {
        images[0].onload = () => drawFrame(0);
      }
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [images]);

  // Listen to scroll with animation frame throttling
  const animFrameId = useRef<number | null>(null);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frameIndex = Math.min(
      totalFrames - 1,
      Math.max(0, Math.floor(latest * totalFrames))
    );
    if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    animFrameId.current = requestAnimationFrame(() => drawFrame(frameIndex));
  });

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 bg-[#050505]">
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
      
      {/* Subtle radial gradient overlay to blend edges and add depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.8)_100%)] pointer-events-none" />
    </div>
  );
}
