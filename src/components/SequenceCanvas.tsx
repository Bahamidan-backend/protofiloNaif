"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export default function SequenceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const { scrollYProgress } = useScroll();
  const totalFrames = 300;

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `/sequence/ezgif-frame-${paddedIndex}.jpg`;
      
      // Redraw if this is the current frame being requested
      img.onload = () => {
        const currentFrameIndex = Math.min(
          totalFrames - 1,
          Math.max(0, Math.floor(scrollYProgress.get() * totalFrames))
        );
        if (i - 1 === currentFrameIndex) {
          drawFrame(currentFrameIndex);
        }
      };
      
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Draw frame on canvas
  const drawFrame = (index: number) => {
    if (!canvasRef.current || images.length === 0) return;
    
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    
    const img = images[index];
    if (!img || !img.complete) return;

    const canvas = canvasRef.current;
    
    // Scale to fit while maintaining aspect ratio (cover)
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const width = img.width * scale;
    const height = img.height * scale;
    const x = (canvas.width - width) / 2;
    const y = (canvas.height - height) / 2;

    // The dark background matching the image void
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(img, x, y, width, height);
  };

  // Handle resize and initial draw
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        const currentFrameIndex = Math.min(
          totalFrames - 1,
          Math.max(0, Math.floor(scrollYProgress.get() * totalFrames))
        );
        drawFrame(currentFrameIndex);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    // Draw frame 0 once the first image is loaded
    if (images.length > 0) {
      if (images[0].complete) {
        drawFrame(0);
      } else {
        images[0].onload = () => drawFrame(0);
      }
    }
    
    return () => window.removeEventListener("resize", handleResize);
  }, [images]);

  // Listen to scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frameIndex = Math.min(
      totalFrames - 1,
      Math.max(0, Math.floor(latest * totalFrames))
    );
    requestAnimationFrame(() => drawFrame(frameIndex));
  });

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 bg-[#050505]">
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
      
      {/* Subtle radial gradient overlay to blend edges and add depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.8)_100%)] pointer-events-none" />
    </div>
  );
}
