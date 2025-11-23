import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, AnimatePresence, useInView } from 'framer-motion';
import { SectionId } from '../types';
import { Cpu, Lock, Network, ShieldCheck } from 'lucide-react';

// Fix: Cast motion to any to avoid type errors with IntrinsicAttributes
const M = motion as any;

const RandomTicker: React.FC<{ min: number; max: number; suffix: string }> = ({ min, max, suffix }) => {
  const [val, setVal] = useState(min);

  useEffect(() => {
    const interval = setInterval(() => {
      setVal(Math.floor(Math.random() * (max - min + 1) + min));
    }, 150); // Updates every 150ms
    return () => clearInterval(interval);
  }, [min, max]);

  return <span>{val}{suffix}</span>;
};

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
       {/* 1. Rising Data Streams (Vertical Flow) */}
       {[...Array(12)].map((_, i) => (
          <M.div
             key={`stream-${i}`}
             className="absolute bg-gradient-to-t from-transparent via-white/10 to-transparent"
             initial={{
                left: `${Math.random() * 100}%`,
                top: "110%",
                opacity: 0
             }}
             animate={{
                top: "-20%",
                opacity: [0, 0.4, 0]
             }}
             transition={{
                duration: Math.random() * 8 + 5,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
             }}
             style={{
                width: "1px",
                height: `${Math.random() * 80 + 40}px`,
             }}
          />
       ))}

       {/* 2. Twinkling Network Nodes */}
       {[...Array(40)].map((_, i) => (
          <M.div
             key={`node-${i}`}
             className="absolute rounded-full bg-white"
             style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: Math.random() < 0.3 ? "2px" : "1px",
                height: Math.random() < 0.3 ? "2px" : "1px",
             }}
             animate={{
                opacity: [0.1, 0.5, 0.1],
                scale: [1, 1.5, 1]
             }}
             transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5
             }}
          />
       ))}
    </div>
  )
}

const ProbabilityCertaintyVisualizer: React.FC<{ isActive: boolean }> = ({ isActive }) => {
    // Generate static grid positions (Order)
    const gridPoints = useMemo(() => {
        const points = [];
        // Center
        points.push({ x: 0, y: 0 });
        // Inner Hex
        for (let i = 0; i < 6; i++) {
            const angle = (i * 60) * (Math.PI / 180);
            points.push({ x: Math.cos(angle) * 60, y: Math.sin(angle) * 60 });
        }
        // Outer Hex
        for (let i = 0; i < 12; i++) {
            const angle = (i * 30) * (Math.PI / 180);
            points.push({ x: Math.cos(angle) * 120, y: Math.sin(angle) * 120 });
        }
        return points;
    }, []);

    // Generate random cloud positions (Chaos)
    const chaosPoints = useMemo(() => {
        return gridPoints.map(() => ({
            x: (Math.random() - 0.5) * 280,
            y: (Math.random() - 0.5) * 280,
            scale: Math.random() * 0.5 + 0.5
        }));
    }, [gridPoints]);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Connecting Lines (Only visible when Ordered) */}
            <M.svg 
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ overflow: 'visible' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.8 }}
            >
                <g transform="translate(160, 160)"> {/* Center of 320x320 container */}
                    {/* Inner Hex Connections */}
                    <path d="M60 0 L30 51.96 L-30 51.96 L-60 0 L-30 -51.96 L30 -51.96 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                    <path d="M0 0 L60 0 M0 0 L30 51.96 M0 0 L-30 51.96 M0 0 L-60 0 M0 0 L-30 -51.96 M0 0 L30 -51.96" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                </g>
            </M.svg>

            <div className="relative w-[320px] h-[320px] flex items-center justify-center">
                {gridPoints.map((point, i) => (
                    <M.div
                        key={i}
                        className="absolute rounded-full bg-white shadow-[0_0_10px_white]"
                        initial={{ x: chaosPoints[i].x, y: chaosPoints[i].y, opacity: 0.5, scale: chaosPoints[i].scale }}
                        animate={{
                            x: isActive ? point.x : chaosPoints[i].x,
                            y: isActive ? point.y : chaosPoints[i].y,
                            opacity: isActive ? 1 : 0.4,
                            scale: isActive ? 1 : chaosPoints[i].scale,
                            backgroundColor: isActive ? "#ffffff" : "#666666" // White when ordered, grey when chaos
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 50,
                            damping: 10,
                            mass: 1,
                            delay: isActive ? i * 0.02 : 0 // Stagger snap
                        }}
                        style={{ width: i === 0 ? 12 : 6, height: i === 0 ? 12 : 6 }} // Center node larger
                    />
                ))}

                {/* Central Core Pulse */}
                <M.div
                    className="absolute inset-0 border border-white/20 rounded-full"
                    animate={{ scale: isActive ? [1, 1.2, 1] : 0.8, opacity: isActive ? 0.2 : 0 }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </div>
        </div>
    );
};

const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const visualRef = useRef<HTMLDivElement>(null);
  const isVisualInView = useInView(visualRef, { margin: "-100px" });
  
  const [isHovered, setIsHovered] = useState(false);

  // Auto-activate on mobile when in view, or hover on desktop
  const isActive = isHovered || (isVisualInView && window.innerWidth < 768);

  const headingText = "Bridging the gap between Probability and Certainty.";
  const words = headingText.split(" ");

  return (
    <section ref={containerRef} id={SectionId.ABOUT} className="py-20 md:py-40 bg-black border-t border-brand-border overflow-hidden relative">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-20">
          
          {/* Content Side */}
          <div className="flex flex-col justify-center">
             <M.div 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={{
                  visible: { transition: { staggerChildren: 0.05 } }
               }}
             >
                <M.h2 
                   variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                   className="text-white font-mono text-xs tracking-[0.2em] uppercase mb-8"
                >
                  <span className="text-brand-muted">//</span> The Engine
                </M.h2>

                <h3 className="font-heading font-bold text-4xl md:text-6xl text-white mb-12 leading-[1.1] tracking-tighter flex flex-wrap gap-x-3 gap-y-1">
                   {words.map((word, i) => (
                      <M.span 
                        key={i}
                        variants={{
                           hidden: { y: 20, opacity: 0 },
                           visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
                        }}
                      >
                         {word}
                      </M.span>
                   ))}
                </h3>
                
                <M.div 
                   variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.5 } } }}
                   className="space-y-12"
                >
                   <div className="flex gap-6 group">
                      <div className="w-12 h-12 flex-shrink-0 border border-white/10 flex items-center justify-center bg-brand-surface group-hover:bg-white group-hover:text-black transition-colors duration-500">
                        <Cpu className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-heading font-bold text-white mb-2">Deterministic Control</h4>
                        <p className="text-brand-muted font-sans text-sm leading-relaxed max-w-md">
                          Replacing stochastic guesswork with rigid logical frameworks. We force LLMs to adhere to strict schema outputs.
                        </p>
                      </div>
                   </div>

                   <div className="flex gap-6 group">
                      <div className="w-12 h-12 flex-shrink-0 border border-white/10 flex items-center justify-center bg-brand-surface group-hover:bg-white group-hover:text-black transition-colors duration-500">
                        <Lock className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-heading font-bold text-white mb-2">Air-Gapped Security</h4>
                        <p className="text-brand-muted font-sans text-sm leading-relaxed max-w-md">
                          Deployment strategies that keep your proprietary data within your VPC. No training on your data. Ever.
                        </p>
                      </div>
                   </div>
                </M.div>
             </M.div>
          </div>

          {/* Visual Side */}
          <div 
            ref={visualRef}
            className="relative h-[400px] md:h-[600px] bg-brand-surface border border-brand-border p-4 md:p-8 overflow-hidden group select-none cursor-crosshair rounded-sm"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
             {/* Backgrounds */}
             <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-[size:16px_16px]"></div>
             <ParticleBackground />
             
             {/* Scanning Laser Beam */}
             <M.div 
                className="absolute left-0 right-0 h-[2px] bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.3)] z-0"
                initial={{ top: "-5%" }}
                animate={{ top: "105%" }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
             />

             <div className="relative z-10 h-full flex flex-col justify-between font-mono text-xs text-brand-muted/50">
                {/* Header - Dynamic Status */}
                <div className="flex justify-between border-b border-white/5 pb-4">
                   <div className="flex items-center gap-3">
                       <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isActive ? 'bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse' : 'bg-red-500'}`}></div>
                       <span className="text-white/70">SYS_ROOT_ACCESS</span>
                   </div>
                   <M.div 
                        key={isActive ? "lock" : "drift"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`transition-colors duration-300 font-bold ${isActive ? 'text-green-400' : 'text-red-400'}`}
                   >
                      {isActive ? "DETERMINISTIC_LOCK" : "PROBABILISTIC_DRIFT"}
                   </M.div>
                </div>
                
                {/* Central Probability/Certainty Diagram */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none">
                    <ProbabilityCertaintyVisualizer isActive={isActive} />
                </div>

                {/* Footer Metrics */}
                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                   <div>
                      <div className="mb-1 uppercase tracking-widest text-[10px]">Latency</div>
                      <div className="text-white text-lg font-mono">
                         <RandomTicker min={8} max={24} suffix="ms" />
                      </div>
                   </div>
                   <div>
                      <div className="mb-1 uppercase tracking-widest text-[10px]">Throughput</div>
                      <div className="text-white text-lg font-mono">
                         <RandomTicker min={35} max={42} suffix="k t/s" />
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;