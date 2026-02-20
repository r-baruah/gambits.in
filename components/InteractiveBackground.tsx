'use client';

import React, { useEffect, useRef } from 'react';

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Grid configuration
    const spacing = 50; // Size of each grid square
    let cols = Math.floor(width / spacing) + 2;
    let rows = Math.floor(height / spacing) + 2;

    // Mouse state
    const mouse = { x: -1000, y: -1000, hover: false };

    class Point {
      x: number;
      y: number;
      baseX: number;
      baseY: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
      }

      update() {
        const dx = mouse.x - this.baseX;
        const dy = mouse.y - this.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 300;

        if (distance < maxDist && mouse.hover) {
          const force = Math.pow((maxDist - distance) / maxDist, 2);
          const angle = Math.atan2(dy, dx);

          // Warp grid towards or away from mouse (gravitational pull effect)
          // Let's create a gentle pull-in, simulating a black hole / gravitational well
          const pullStrength = 40;
          this.x = this.baseX + Math.cos(angle) * force * pullStrength;
          this.y = this.baseY + Math.sin(angle) * force * pullStrength;
        } else {
          // Spring back to base position smoothly
          this.x += (this.baseX - this.x) * 0.05;
          this.y += (this.baseY - this.y) * 0.05;
        }
      }
    }

    let points: Point[][] = [];

    const initGrid = () => {
      points = [];
      cols = Math.floor(width / spacing) + 2;
      rows = Math.floor(height / spacing) + 2;

      const offsetX = (width - (cols - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;

      for (let i = 0; i < cols; i++) {
        points[i] = [];
        for (let j = 0; j < rows; j++) {
          points[i][j] = new Point(
            offsetX + i * spacing,
            offsetY + j * spacing
          );
        }
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initGrid();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.hover = true;
    };

    const handleMouseLeave = () => {
      mouse.hover = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      if (!ctx) return;

      // Clear with dark transparent layer for slight motion blur
      ctx.fillStyle = 'rgba(10, 10, 10, 1)';
      ctx.fillRect(0, 0, width, height);

      // Update points
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          points[i][j].update();
        }
      }

      // Draw distorted checkerboard
      for (let i = 0; i < cols - 1; i++) {
        for (let j = 0; j < rows - 1; j++) {
          const p1 = points[i][j];
          const p2 = points[i + 1][j];
          const p3 = points[i + 1][j + 1];
          const p4 = points[i][j + 1];

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.closePath();

          // Calculate center of this quad to check distance to mouse
          const centerX = (p1.x + p2.x + p3.x + p4.x) / 4;
          const centerY = (p1.y + p2.y + p3.y + p4.y) / 4;
          const dx = centerX - mouse.x;
          const dy = centerY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Checkerboard pattern
          const isDark = (i + j) % 2 === 0;

          if (isDark) {
            ctx.fillStyle = '#0f0f0f';
          } else {
            ctx.fillStyle = '#141414';
          }

          ctx.fill();

          // Draw grid lines
          ctx.strokeStyle = '#1e1e1e';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Add a subtle red/blood accent glow near the cursor
          if (dist < 250 && mouse.hover) {
            const intensity = Math.pow((250 - dist) / 250, 2) * 0.15; // Max opacity 0.15
            ctx.fillStyle = `rgba(220, 38, 38, ${intensity})`; // Red accent overlay
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    handleResize();
    initGrid();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 bg-[#0a0a0a]"
      style={{ touchAction: 'none' }}
    />
  );
};

export default InteractiveBackground;
