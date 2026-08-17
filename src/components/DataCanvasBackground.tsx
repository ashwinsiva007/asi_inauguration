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

  useEffect(() => {
    if (touchRipple) {
      ripplesRef.current.push({
        x: touchRipple.x,
        y: touchRipple.y,
        radius: 10,
        maxRadius: Math.max(window.innerWidth, window.innerHeight) * 0.6,
        alpha: 0.9,
        color: stage === 'COUNTDOWN' ? '#E5232A' : '#06B6D4',
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
      const count = Math.floor((canvas.width * canvas.height) / 20000);
      const particles: NodeParticle[] = [];

      // Refined Palette with Analytics Cyber Cyan & Tech Blue
      const colors = ['#E5232A', '#D4AF37', '#06B6D4', '#2563EB', '#FFFFFF'];

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.6 + 0.8,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.4 + 0.25,
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

      // Dark Luxury Institutional Background Gradient
      const bgGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.max(width, height) * 0.85
      );

      if (stageRef.current === 'INAUGURATED') {
        bgGrad.addColorStop(0, '#121829');
        bgGrad.addColorStop(0.5, '#0B0F1A');
        bgGrad.addColorStop(1, '#05070D');
      } else if (stageRef.current === 'COUNTDOWN') {
        bgGrad.addColorStop(0, '#1A0D12');
        bgGrad.addColorStop(0.6, '#0F0910');
        bgGrad.addColorStop(1, '#050408');
      } else {
        bgGrad.addColorStop(0, '#0E1322');
        bgGrad.addColorStop(0.7, '#080C16');
        bgGrad.addColorStop(1, '#04060B');
      }

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const particles = particlesRef.current;

      // Draw subtle connection lines between nearby particles
      const maxDistance = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.12;
            ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and render particle nodes
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
          const angle = Math.atan2(dy, dx) + 0.004;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const targetDist = 300 + (Math.sin(p.x * 0.01) * 50);

          const finalDist = dist + (targetDist - dist) * 0.02;
          p.x = centerX + Math.cos(angle) * finalDist;
          p.y = centerY + Math.sin(angle) * finalDist;
        } else {
          // Ambient movement
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Render touch ripples
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
