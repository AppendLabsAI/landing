import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

// Fix: Cast motion to any to avoid type errors with IntrinsicAttributes
const M = motion as any;

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Grid Configuration
    const isMobile = window.innerWidth < 768;
    const gap = isMobile ? 50 : 40; 
    let cols = Math.ceil(width / gap);
    let rows = Math.ceil(height / gap);
    
    // Physics Configuration
    const mouseRadius = isMobile ? 120 : 200;
    const connectionDistance = isMobile ? 80 : 90; 
    const stiffness = 0.05; 
    const damping = 0.9;   

    interface Point {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
      phase: number;
    }

    let points: Point[] = [];

    const initGrid = () => {
        cols = Math.ceil(width / gap);
        rows = Math.ceil(height / gap);
        points = [];
        for (let i = 0; i <= cols; i++) {
            for (let j = 0; j <= rows; j++) {
                const x = i * gap;
                const y = j * gap;
                points.push({
                    x: x + (Math.random() - 0.5) * 10, 
                    y: y + (Math.random() - 0.5) * 10,
                    originX: x,
                    originY: y,
                    vx: 0,
                    vy: 0,
                    phase: Math.random() * Math.PI * 2
                });
            }
        }
    };

    initGrid();

    let mouse = { x: -1000, y: -1000 };
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.015;
      
      points.forEach(p => {
        const idleAmp = isMobile ? 1.2 : 0.5;
        const idleX = Math.sin(time + p.originY * 0.01 + p.phase) * idleAmp;
        const idleY = Math.cos(time + p.originX * 0.01 + p.phase) * idleAmp;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius) {
          const force = (mouseRadius - dist) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          const push = isMobile ? force * 4 : force * 2; 

          p.vx -= Math.cos(angle) * push;
          p.vy -= Math.sin(angle) * push;
        }

        const targetX = p.originX + idleX;
        const targetY = p.originY + idleY;
        const dxOrigin = targetX - p.x;
        const dyOrigin = targetY - p.y;
        
        p.vx += dxOrigin * stiffness;
        p.vy += dyOrigin * stiffness;
        p.vx *= damping;
        p.vy *= damping;
        p.x += p.vx;
        p.y += p.vy;
      });

      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < points.length; i++) {
          const p1 = points[i];
          const dxMouse = mouse.x - p1.x;
          const dyMouse = mouse.y - p1.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          
          const baseSize = isMobile ? 1.2 : 1;
          const size = Math.max(baseSize, (isMobile ? 2.5 : 3) - (distMouse / mouseRadius) * 2);
          const alpha = Math.min(0.8, 0.15 + Math.max(0, 0.5 - (distMouse / mouseRadius) * 0.5));

          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, size, 0, Math.PI * 2);
          ctx.fill();

          for (let j = i + 1; j < points.length; j++) {
              const p2 = points[j];
              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              const distSq = dx * dx + dy * dy;
              
              const connDistSq = connectionDistance * connectionDistance;

              if (distSq < connDistSq) {
                  const dist = Math.sqrt(distSq);
                  const lineAlpha = (1 - dist / connectionDistance) * 0.15;
                  ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
                  ctx.beginPath();
                  ctx.moveTo(p1.x, p1.y);
                  ctx.lineTo(p2.x, p2.y);
                  ctx.stroke();
              }
          }
      }

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initGrid();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
    };

    const handleMouseLeave = () => {
       mouse.x = -1000;
       mouse.y = -1000;
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center bg-black overflow-hidden px-4"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center pointer-events-none h-full pt-24 sm:pt-28 md:pt-0">
          
          {/* Badge */}
          <M.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 md:mb-12"
          >
             <div className="px-4 py-2 border border-white/10 rounded-full backdrop-blur-sm bg-white/5 flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="font-mono text-[10px] md:text-xs text-white/80 uppercase tracking-widest">
                   System Operational
                </span>
             </div>
          </M.div>

          {/* Typography - Explicitly set to 9vw for mobile to prevent overflow */}
          <div className="text-center w-full mix-blend-difference">
              <h1 className="font-heading font-black leading-[0.9] tracking-tighter text-white">
                <span className="block text-[9vw] sm:text-[10vw] md:text-[9vw] lg:text-[10rem]">INTELLIGENCE</span>
                <span className="block text-[9vw] sm:text-[10vw] md:text-[9vw] lg:text-[10rem] text-white/50">INFRASTRUCTURE</span>
              </h1>
          </div>
          
          {/* Tagline */}
          <M.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 0.5 }}
             className="mt-8 md:mt-12 max-w-[85%] sm:max-w-xl mx-auto text-white/80 text-base sm:text-lg md:text-xl font-mono leading-relaxed text-center font-medium"
          >
             Append Intelligence to Your Infrastructure
          </M.p>
          
          {/* Subtext */}
          <M.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 0.7 }}
             className="hidden md:block mt-4 md:mt-6 max-w-[85%] sm:max-w-xl mx-auto text-white/60 text-sm sm:text-base font-sans leading-relaxed text-center"
          >
             Reliable, secure, and cost-optimized AI infrastructure built to reduce workload and scale with your business.
          </M.p>
      </div>

      {/* Scroll Indicator */}
      <M.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
         <div className="flex flex-col items-center justify-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-widest">Scroll</span>
            <ArrowDown size={14} className="mx-auto" />
         </div>
      </M.div>
    </section>
  );
};

export default Hero;