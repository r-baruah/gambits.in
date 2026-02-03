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
    
    // Configuration
    const particleCount = Math.min(Math.floor((width * height) / 12000), 120);
    const connectionDistance = 180;
    const mouseDistance = 250;
    const particles: Particle[] = [];
    const ripples: Ripple[] = [];

    // Mouse state
    const mouse = { x: -1000, y: -1000 };

    // Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    
    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    // Click handler for ripples
    const handleClick = (e: MouseEvent) => {
      ripples.push(new Ripple(e.clientX, e.clientY));
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleClick);

    class Ripple {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.alpha = 0.8;
      }

      update() {
        this.radius += 4;
        this.alpha -= 0.015;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(34, 197, 94, ${this.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#22c55e';
        ctx.stroke();
        ctx.restore();
      }
    }

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseSpeed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Ensure non-zero base velocity for constant movement
        this.baseSpeed = Math.random() * 0.5 + 0.2;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * this.baseSpeed;
        this.vy = Math.sin(angle) * this.baseSpeed;
        this.size = Math.random() * 2.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen for continuous flow (instead of bounce)
        if (this.x < -50) this.x = width + 50;
        if (this.x > width + 50) this.x = -50;
        if (this.y < -50) this.y = height + 50;
        if (this.y > height + 50) this.y = -50;

        // Mouse interaction (repulsion)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseDistance - distance) / mouseDistance;
          const repulsionStrength = 0.15; // Stronger repulsion

          this.vx -= forceDirectionX * force * repulsionStrength;
          this.vy -= forceDirectionY * force * repulsionStrength;
        }

        // Ripple interaction (push)
        ripples.forEach(ripple => {
          const rdx = ripple.x - this.x;
          const rdy = ripple.y - this.y;
          const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
          // Check if particle is near the ripple ring
          if (Math.abs(rDist - ripple.radius) < 30) {
             const angle = Math.atan2(rdy, rdx);
             // Push outwards
             this.vx -= Math.cos(angle) * 0.8;
             this.vy -= Math.sin(angle) * 0.8;
          }
        });
        
        // Normalize speed gradually to keep them moving but not too fast
        const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const targetSpeed = this.baseSpeed;
        
        // If too fast, slow down. If too slow, speed up.
        if (currentSpeed > targetSpeed * 4) {
             this.vx *= 0.95;
             this.vy *= 0.95;
        } else if (currentSpeed < targetSpeed * 0.5) {
             this.vx *= 1.05;
             this.vy *= 1.05;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 197, 94, ${0.4 + (this.size / 3) * 0.4})`; // Larger particles are brighter
        ctx.fill();
        
        // Subtle glow for larger particles
        if (this.size > 2) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#22c55e';
        } else {
            ctx.shadowBlur = 0;
        }
      }
    }

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].update();
        ripples[i].draw();
        if (ripples[i].alpha <= 0) {
          ripples.splice(i, 1);
        }
      }

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      ctx.lineWidth = 0.5;
      ctx.shadowBlur = 0; // Reset shadow for lines to save perf

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            // Opacity based on distance
            const opacity = 1 - (distance / connectionDistance);
            ctx.strokeStyle = `rgba(34, 197, 94, ${opacity * 0.25})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initial setup
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleClick);
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
