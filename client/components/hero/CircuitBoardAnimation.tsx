"use client";

import { useEffect, useRef, useState } from "react";

interface Streak {
  x: number;
  y: number;
  length: number;
  width: number;
  angle: number;
  speed: number;
  opacity: number;
  color: string;
  isHorizontal: boolean;
}

export default function PurpleStreaksAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Check if on mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    
    // Throttle resize events
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        checkMobile();
        resizeCanvas();
        initStreaks(); // Recreate streaks on resize
      }, 100);
    };
    
    window.addEventListener("resize", handleResize);

    // Set canvas to full screen with lower resolution
    const resizeCanvas = () => {
      const scaleFactor = isMobile ? 0.5 : 0.7;
      
      canvas.width = window.innerWidth * scaleFactor;
      canvas.height = window.innerHeight * scaleFactor;
      
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    resizeCanvas();

    // Purple streak colors
    const colors = [
      "#9c27b0", // Deeper purple
      "#673ab7", // Deep purple
      "#ba68c8", // Lighter purple
      "#7b1fa2", // Mid purple
      "#5e35b1"  // Indigo purple
    ];

    // Create grid spacings for circuit-like layout
    const gridSizeX = isMobile ? 60 : 70;
    const gridSizeY = isMobile ? 60 : 70;

    // Create light streaks
    const initStreaks = (): Streak[] => {
      const streaks: Streak[] = [];
      const count = isMobile ? 25 : 45;
      
      // Create a grid pattern
      const rows = Math.ceil(window.innerHeight / gridSizeY);
      const cols = Math.ceil(window.innerWidth / gridSizeX);
      
      // First add horizontal lines
      for (let y = 0; y < rows; y++) {
        if (Math.random() > 0.3) { // 70% chance to have a row
          const offsetY = y * gridSizeY + (Math.random() * 20 - 10);
          
          // How many segments in this row
          const segments = Math.floor(Math.random() * 3) + 1;
          
          for (let s = 0; s < segments; s++) {
            if (streaks.length < count) {
              const startCol = Math.floor(Math.random() * (cols - 1));
              const endCol = startCol + Math.floor(Math.random() * (cols - startCol)) + 1;
              const length = (endCol - startCol) * gridSizeX * (0.7 + Math.random() * 0.5);
              
              streaks.push({
                x: startCol * gridSizeX,
                y: offsetY,
                length: length,
                width: Math.random() * (isMobile ? 1.5 : 2.5) + 1,
                angle: 0, // Horizontal
                speed: Math.random() * 0.5 + 0.3,
                opacity: Math.random() * 0.5 + 0.3,
                color: colors[Math.floor(Math.random() * colors.length)],
                isHorizontal: true
              });
            }
          }
        }
      }
      
      // Then add vertical lines
      for (let x = 0; x < cols; x++) {
        if (Math.random() > 0.3) { // 70% chance to have a column
          const offsetX = x * gridSizeX + (Math.random() * 20 - 10);
          
          // How many segments in this column
          const segments = Math.floor(Math.random() * 3) + 1;
          
          for (let s = 0; s < segments; s++) {
            if (streaks.length < count) {
              const startRow = Math.floor(Math.random() * (rows - 1));
              const endRow = startRow + Math.floor(Math.random() * (rows - startRow)) + 1;
              const length = (endRow - startRow) * gridSizeY * (0.7 + Math.random() * 0.5);
              
              streaks.push({
                x: offsetX,
                y: startRow * gridSizeY,
                length: length,
                width: Math.random() * (isMobile ? 1.5 : 2.5) + 1,
                angle: Math.PI / 2, // Vertical
                speed: Math.random() * 0.5 + 0.3,
                opacity: Math.random() * 0.5 + 0.3,
                color: colors[Math.floor(Math.random() * colors.length)],
                isHorizontal: false
              });
            }
          }
        }
      }
      
      // Fill remaining with random streaks if needed
      while (streaks.length < count) {
        streaks.push(createStreak());
      }
      
      return streaks;
    };
    
    // Create a single streak with random properties
    const createStreak = (): Streak => {
      const isHorizontal = Math.random() > 0.5;
      const width = Math.random() * (isMobile ? 1.5 : 2.5) + 1;
      const length = Math.random() * 150 + 50;
      
      // Snap to grid with some randomness
      const x = Math.floor(Math.random() * Math.ceil(window.innerWidth / gridSizeX)) * gridSizeX + (Math.random() * 20 - 10);
      const y = Math.floor(Math.random() * Math.ceil(window.innerHeight / gridSizeY)) * gridSizeY + (Math.random() * 20 - 10);
      
      return {
        x,
        y,
        length,
        width,
        angle: isHorizontal ? 0 : Math.PI / 2, // Horizontal or vertical
        speed: Math.random() * 0.5 + 0.3,
        opacity: Math.random() * 0.5 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        isHorizontal
      };
    };
    
    const streaks = initStreaks();
    let lastFrameTime = 0;
    
    // Frame rate limiter
    const targetFPS = isMobile ? 30 : 40;
    const frameInterval = 1000 / targetFPS;
    let lastFrameTimestamp = 0;

    // Animation loop
    const animate = (currentTime: number) => {
      // Skip frames to meet target FPS
      if (currentTime - lastFrameTimestamp < frameInterval) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTimestamp = currentTime;
      
      // Time calculations
      const deltaTime = lastFrameTime ? (currentTime - lastFrameTime) / 1000 : 0.016;
      lastFrameTime = currentTime;
      
      // Clear canvas with a dark background
      ctx.fillStyle = "#0a0a20";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update streaks
      for (let i = 0; i < streaks.length; i++) {
        const streak = streaks[i];
        
        // Save context for transformations
        ctx.save();
        
        // Draw the streak
        ctx.translate(streak.x, streak.y);
        ctx.rotate(streak.angle);
        
        // Create a gradient along the streak
        const gradient = ctx.createLinearGradient(0, 0, streak.length, 0);
        gradient.addColorStop(0, `rgba(156, 39, 176, 0)`);
        gradient.addColorStop(0.1, `${streak.color}${Math.round(streak.opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.9, `${streak.color}${Math.round(streak.opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `rgba(156, 39, 176, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, -streak.width / 2, streak.length, streak.width);
        
        // Add a subtle glow effect (not on mobile)
        if (!isMobile) {
          ctx.globalAlpha = streak.opacity * 0.5;
          ctx.shadowBlur = 8;
          ctx.shadowColor = streak.color;
          ctx.fillRect(0, -streak.width / 2, streak.length, streak.width);
          ctx.globalAlpha = 1.0;
          ctx.shadowBlur = 0;
        }
        
        // Draw connection nodes at intersections
        const nodeSize = isMobile ? 2 : 3;
        ctx.beginPath();
        ctx.arc(0, 0, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = streak.color;
        ctx.fill();
        
        // Create a subtle glow for the node
        if (!isMobile) {
          ctx.shadowBlur = 5;
          ctx.shadowColor = streak.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        
        // Restore context
        ctx.restore();
        
        // Pulse effect - make opacity change over time
        streak.opacity += Math.sin(currentTime * 0.001 + i) * 0.01;
        streak.opacity = Math.max(0.2, Math.min(0.8, streak.opacity));
        
        // Move the streaks with grid-aligned movement
        if (streak.isHorizontal) {
          // Move horizontal streaks left or right, wrapping around when offscreen
          streak.x += streak.speed * deltaTime * 30;
          
          // If streak moves off screen to the right, wrap back to the left
          if (streak.x > window.innerWidth) {
            streak.x = -streak.length;
            streak.y = Math.floor(Math.random() * Math.ceil(window.innerHeight / gridSizeY)) * gridSizeY + (Math.random() * 20 - 10);
            streak.opacity = Math.random() * 0.5 + 0.3;
            streak.length = Math.random() * 150 + 50;
          }
        } else {
          // Move vertical streaks up or down, wrapping around when offscreen
          streak.y += streak.speed * deltaTime * 30;
          
          // If streak moves off screen to the bottom, wrap back to the top
          if (streak.y > window.innerHeight) {
            streak.y = -streak.length;
            streak.x = Math.floor(Math.random() * Math.ceil(window.innerWidth / gridSizeX)) * gridSizeX + (Math.random() * 20 - 10);
            streak.opacity = Math.random() * 0.5 + 0.3;
            streak.length = Math.random() * 150 + 50;
          }
        }
      }
      
      // Occasionally add moving pulses along streaks
      if (Math.random() < 0.08) { // Increased probability for more pulses
        const streakIndex = Math.floor(Math.random() * streaks.length);
        const streak = streaks[streakIndex];
        
        // Draw a pulse that moves along the streak
        const pulsePos = Math.random() * streak.length;
        const pulseSize = isMobile ? 3 : 4;
        
        ctx.save();
        ctx.translate(streak.x, streak.y);
        ctx.rotate(streak.angle);
        ctx.translate(pulsePos, 0);
        
        ctx.beginPath();
        ctx.arc(0, 0, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        
        if (!isMobile) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = streak.color;
        }
        
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full bg-[#0a0a20]" />;
} 