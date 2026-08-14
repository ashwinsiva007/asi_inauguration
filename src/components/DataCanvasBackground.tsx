import React, { useEffect, useRef } from 'react';
import type { InaugurationStage } from '../types/inauguration';

interface Props {
  stage: InaugurationStage;
  touchRipple?: { x: number; y: number; id: number } | null;
}

interface NodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  targetX?: number;
  targetY?: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export const DataCanvasBackground: React.FC<Props> = ({ stage, touchRipple }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<NodeParticle[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const stageRef = useRef<InaugurationStage>(stage);

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  // Handle incoming touch ripple triggers
  useEffect(() => {
    if (touchRipple) {
      ripplesRef.current.push({
        x: touchRipple.x,
        y: touchRipple.y,
        radius: 10,
        maxRadius: Math.max(window.innerWidth, window.innerHeight) * 0.6,
        alpha: 0.9,
        color: stage === 'COUNTDOWN' ? '#00F0FF' : '#E2B857',
      });
    }
  }, [touchRipple, stage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / 18000);
      const particles: NodeParticle[] = [];

      const colors = ['#D4AF37', '#00F0FF', '#70A1FF', '#E2B857', '#FFFFFF'];

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 1.8 + 0.8,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.5 + 0.3,
        });
      }
      particlesRef.current = particles;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Dark background gradient
      const bgGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.max(width, height) * 0.8
      );

      if (stageRef.current === 'INAUGURATED') {
        bgGrad.addColorStop(0, '#0B1528');
        bgGrad.addColorStop(0.5, '#070D18');
        bgGrad.addColorStop(1, '#030509');
      } else if (stageRef.current === 'COUNTDOWN') {
        bgGrad.addColorStop(0, '#0E1A30');
        bgGrad.addColorStop(0.6, '#080E1A');
        bgGrad.addColorStop(1, '#04070C');
      } else {
        bgGrad.addColorStop(0, '#091120');
        bgGrad.addColorStop(0.7, '#060B14');
        bgGrad.addColorStop(1, '#030508');
      }

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render subtle tech grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const particles = particlesRef.current;

      // Draw connection lines between nearby particles
      const maxDistance = 130;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.15;
            ctx.strokeStyle = `rgba(226, 184, 87, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        if (stageRef.current === 'COUNTDOWN') {
          // Accelerate toward center during countdown
          const dx = centerX - p.x;
          const dy = centerY - p.y;
          p.x += dx * 0.03;
          p.y += dy * 0.03;
        } else if (stageRef.current === 'INAUGURATED') {
          // Orbit around central emblem
          const dx = p.x - centerX;
          const dy = p.y - centerY;
          const angle = Math.atan2(dy, dx) + 0.005;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const targetDist = 280 + (Math.sin(p.x * 0.01) * 60);

          const finalDist = dist + (targetDist - dist) * 0.02;
          p.x = centerX + Math.cos(angle) * finalDist;
          p.y = centerY + Math.sin(angle) * finalDist;
        } else {
          // Normal ambient movement
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Update and draw touch ripples
      const activeRipples: Ripple[] = [];
      ripplesRef.current.forEach((r) => {
        r.radius += 14;
        r.alpha *= 0.94;

        if (r.alpha > 0.01 && r.radius < r.maxRadius) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = r.color;
          ctx.lineWidth = 2.5;
          ctx.globalAlpha = r.alpha;
          ctx.stroke();
          ctx.globalAlpha = 1;
          activeRipples.push(r);
        }
      });
      ripplesRef.current = activeRipples;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
