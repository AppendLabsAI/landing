import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionId } from '../types';

// Fix: Cast motion to any to avoid type errors with IntrinsicAttributes
const M = motion as any;

const steps = [
  {
    id: '01',
    title: 'AUDIT & DISCOVERY',
    description: 'We map your data topography. Identifying high-latency manual workflows and architecting the neural bridge to automation.',
    tech: 'System Mapping'
  },
  {
    id: '02',
    title: 'PROTOCOL DESIGN',
    description: 'Blueprint phase. Defining Model Context Protocols (MCPs) and Vector schemas. We establish the rigid logic gates for the AI.',
    tech: 'Architecture'
  },
  {
    id: '03',
    title: 'DEVELOPMENT',
    description: 'Forging the agents. Iterative sprints focused on latency reduction and accuracy. Implementation of air-gapped RAG pipelines.',
    tech: 'Engineering'
  },
  {
    id: '04',
    title: 'DEPLOYMENT',
    description: 'Zero-downtime integration. We deploy to your VPC/Cloud. Handover includes full documentation and monitoring dashboards.',
    tech: 'Launch'
  }
];

// --- Schematic Diagrams ---

const AuditDiagram = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full text-white overflow-visible">
    <defs>
        <filter id="glow-audit">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="scan-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
    </defs>

    {/* Dynamic Background Grid */}
    <pattern id="grid-audit" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
    </pattern>
    <rect width="400" height="400" fill="url(#grid-audit)" />

    <g transform="translate(200 200)">
        {/* Complex Rotating Rings */}
        <M.circle r="140" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" strokeDasharray="2 4" animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} />
        <M.circle r="120" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" strokeDasharray="10 10" animate={{ rotate: -360 }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }} />
        <M.circle r="80" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" strokeDasharray="20 20" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
        
        {/* Radar Scanner */}
        <M.g animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
            <line x1="0" y1="0" x2="0" y2="-140" stroke="white" strokeWidth="2" style={{ filter: 'url(#glow-audit)' }} />
            <path d="M 0 0 L -20 -140 A 140 140 0 0 1 0 -140 Z" fill="white" opacity="0.05" />
        </M.g>

        {/* Anomalies / Targets */}
        {[0, 120, 240].map((deg, i) => (
            <M.g key={i} transform={`rotate(${deg})`}>
                <M.g animate={{ x: [0, 20, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i }}>
                    <M.circle cx="0" cy="-100" r="3" fill="#ef4444" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }} />
                    <M.circle cx="0" cy="-100" r="15" stroke="#ef4444" strokeWidth="1" fill="none" initial={{ scale: 0, opacity: 1 }} animate={{ scale: 1.5, opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity }} />
                    <line x1="0" y1="-90" x2="0" y2="-110" stroke="#ef4444" strokeWidth="0.5" opacity="0.5" />
                    <line x1="-10" y1="-100" x2="10" y2="-100" stroke="#ef4444" strokeWidth="0.5" opacity="0.5" />
                </M.g>
            </M.g>
        ))}
    </g>

    {/* Text Interface */}
    <M.text x="20" y="380" className="text-[10px] font-mono fill-red-400 font-bold" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.5, repeat: Infinity }}>TARGET_LOCKED // ANOMALY_DETECTED</M.text>
    <text x="320" y="380" className="text-[10px] font-mono fill-white opacity-50">SCAN_RATE: 240Hz</text>
  </svg>
);

const ProtocolDiagram = () => (
   <svg viewBox="0 0 400 400" className="w-full h-full text-white">
      <defs>
          <filter id="glow-proto">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
      </defs>
      
      <g transform="translate(200 200)">
          {/* Central Neural Core */}
          <M.circle r="30" stroke="white" strokeWidth="2" fill="none" animate={{ r: [30, 35, 30] }} transition={{ duration: 2, repeat: Infinity }} style={{ filter: 'url(#glow-proto)' }} />
          <M.circle r="10" fill="white" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }} />
          
          {/* Orbiting Satellite Nodes */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <M.g key={i} animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: i * -2 }}>
                 <g transform={`rotate(${deg}) translate(0 -120)`}>
                    <circle r="6" fill="#111" stroke="white" strokeWidth="1.5" />
                    <M.path 
                       d="M 0 0 L 0 90" 
                       stroke="white" 
                       strokeWidth="1" 
                       strokeOpacity="0.2"
                       strokeDasharray="4 4"
                    />
                    {/* Traveling Data Packets */}
                    <M.circle 
                       r="3" 
                       fill="white" 
                       initial={{ cy: 0 }}
                       animate={{ cy: 90 }}
                       transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
                       style={{ filter: 'url(#glow-proto)' }}
                    />
                 </g>
              </M.g>
          ))}

          {/* Connection Mesh */}
          <M.path 
            d="M -120 -80 L 120 -80 L 120 80 L -120 80 Z" 
            fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" 
            animate={{ rotate: -360, scale: [1, 1.1, 1] }} 
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }} 
          />
      </g>
      
      <text x="20" y="380" className="text-[10px] font-mono fill-white opacity-80">HANDSHAKE_ESTABLISHED</text>
      <M.rect x="180" y="370" width="40" height="2" fill="white" animate={{ width: [40, 60, 40], x: [180, 170, 180] }} transition={{ duration: 1, repeat: Infinity }} />
   </svg>
);

const DevelopmentDiagram = () => (
   <svg viewBox="0 0 400 400" className="w-full h-full text-white">
      <defs>
         <linearGradient id="code-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
         </linearGradient>
      </defs>

      {/* Falling Code Background */}
      {[20, 60, 100, 140, 180, 220, 260, 300, 340, 380].map((x, i) => (
         <M.rect 
            key={i}
            x={x} y="-100" width="1" height="150" 
            fill="url(#code-fade)"
            animate={{ y: 400 }}
            transition={{ duration: 2 + Math.random(), repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
         />
      ))}

      {/* Isometric Assembly Center */}
      <g transform="translate(200 200)">
         {/* Base */}
         <M.path d="M0 60 L-50 30 L0 0 L50 30 Z" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="1" />
         <M.path d="M-50 30 L-50 90 L0 120 L0 60 Z" fill="rgba(255,255,255,0.05)" stroke="white" strokeWidth="1" />
         <M.path d="M0 120 L50 90 L50 30 L0 60 Z" fill="rgba(255,255,255,0.08)" stroke="white" strokeWidth="1" />

         {/* Floating Top Layer */}
         <M.g animate={{ y: [0, -40, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
             <path d="M0 60 L-50 30 L0 0 L50 30 Z" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1" />
             <path d="M-50 30 L-50 90 L0 120 L0 60 Z" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="1" />
             <path d="M0 120 L50 90 L50 30 L0 60 Z" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1" />
         </M.g>

         {/* Energy Core */}
         <M.circle cy="60" r="5" fill="white" animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.5, 1] }} transition={{ duration: 1, repeat: Infinity }} />
      </g>
      
      <M.text x="20" y="380" className="text-[10px] font-mono fill-white" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}>COMPILING_ASSETS...</M.text>
      <text x="300" y="380" className="text-[10px] font-mono fill-green-400">BUILD: SUCCESS</text>
   </svg>
);

const DeploymentDiagram = () => (
   <svg viewBox="0 0 400 400" className="w-full h-full text-white">
      {/* Globe Grid */}
      <g transform="translate(200 200)">
          <M.circle r="120" stroke="white" strokeWidth="0.5" fill="none" opacity="0.2" />
          <M.ellipse rx="120" ry="40" stroke="white" strokeWidth="0.5" fill="none" opacity="0.2" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
          <M.ellipse rx="40" ry="120" stroke="white" strokeWidth="0.5" fill="none" opacity="0.2" animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
          
          {/* Signal Waves */}
          <M.circle r="10" stroke="white" strokeWidth="2" fill="none" initial={{ opacity: 1, scale: 0 }} animate={{ opacity: 0, scale: 12 }} transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }} />
          <M.circle r="10" stroke="white" strokeWidth="1" fill="none" initial={{ opacity: 1, scale: 0 }} animate={{ opacity: 0, scale: 12 }} transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }} />
      </g>

      {/* Connecting Beams to Perimeter */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
          <g key={i} transform={`translate(200 200) rotate(${deg})`}>
              <M.line 
                x1="0" y1="0" x2="160" y2="0" 
                stroke="white" strokeWidth="1" 
                strokeDasharray="4 2"
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.1, 1, 0.1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
              <M.circle cx="160" cy="0" r="4" fill="#4ade80" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />
          </g>
      ))}

      <text x="20" y="380" className="text-[10px] font-mono fill-green-400">STATUS: LIVE</text>
      <text x="300" y="380" className="text-[10px] font-mono fill-white opacity-50">UPTIME: 99.99%</text>
   </svg>
);


const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Helper to get diagram for mobile
  const getDiagram = (index: number) => {
    switch(index) {
        case 0: return <AuditDiagram />;
        case 1: return <ProtocolDiagram />;
        case 2: return <DevelopmentDiagram />;
        case 3: return <DeploymentDiagram />;
        default: return null;
    }
  }

  return (
    <section id={SectionId.PROCESS} className="bg-black relative py-16 md:py-24 lg:py-32 xl:py-40 border-t border-brand-border">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-left md:text-center mb-12 md:mb-16 lg:mb-20 xl:mb-24">
          <h2 className="text-white font-mono text-xs tracking-[0.2em] uppercase mb-3 md:mb-4">
            <span className="text-brand-muted">//</span> Execution
          </h2>
          <h3 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white tracking-tighter">
            THE PROTOCOL
          </h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 xl:gap-20">
           {/* Left Column - Steps */}
           <div className="space-y-12 md:space-y-20 lg:space-y-[30vh] xl:space-y-[40vh]">
              {steps.map((step, index) => (
                 <M.div 
                    key={index}
                    initial={{ opacity: 0.2 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ margin: "-10% 0px -60% 0px" }}
                    onViewportEnter={() => setActiveStep(index)}
                    className="flex flex-col justify-start min-h-[60vh] sm:min-h-[65vh] md:min-h-[50vh] scroll-mt-24"
                    id={`step-${index}`}
                 >
                    <div className="flex items-baseline gap-3 md:gap-4 mb-3 md:mb-4">
                       <span className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-surfaceHighlight">
                          {step.id}
                       </span>
                       <h4 className="font-heading font-bold text-xl sm:text-2xl md:text-2xl lg:text-3xl text-white">{step.title}</h4>
                    </div>
                    <div className="pl-0 md:pl-12 lg:pl-20 md:border-l border-brand-surfaceHighlight">
                       <p className="text-brand-muted text-sm sm:text-base md:text-lg font-sans font-light leading-relaxed max-w-md mb-4 md:mb-0">
                          {step.description}
                       </p>
                       <div className="mt-4 md:mt-6 flex items-center gap-2 mb-4 md:mb-0">
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white">{step.tech}</span>
                       </div>
                       
                       {/* Mobile Diagram Display (Inline) */}
                       <div className="block lg:hidden w-full h-[280px] sm:h-[320px] bg-brand-surface border border-brand-border rounded-sm mt-6 overflow-hidden relative">
                           <div className="absolute top-2 left-2 font-mono text-[8px] text-brand-muted uppercase tracking-widest z-10">
                              SYS_VISUALIZER_V1.0
                           </div>
                           <div className="absolute top-2 right-2 flex gap-1 z-10">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                           </div>
                           <div className="absolute inset-0 p-3 sm:p-4">
                                {getDiagram(index)}
                           </div>
                           <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 pointer-events-none bg-[size:100%_4px,6px_100%] opacity-30"></div>
                       </div>
                    </div>
                 </M.div>
              ))}
           </div>

           {/* Right Column - Sticky Diagram (Desktop Only) */}
           <div className="hidden lg:block relative">
              <div className="sticky top-24 h-[500px] w-full bg-brand-surface border border-brand-border rounded-sm overflow-hidden">
                 <div className="absolute top-4 left-4 font-mono text-[10px] text-brand-muted uppercase tracking-widest z-10">
                    SYS_VISUALIZER_V1.0
                 </div>
                 <div className="absolute top-4 right-4 flex gap-1 z-10">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                 </div>
                 
                 <div className="w-full h-full p-12">
                    <AnimatePresence mode="wait">
                       {activeStep === 0 && (
                          <M.div key="audit" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
                             <AuditDiagram />
                          </M.div>
                       )}
                       {activeStep === 1 && (
                          <M.div key="protocol" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
                             <ProtocolDiagram />
                          </M.div>
                       )}
                       {activeStep === 2 && (
                          <M.div key="development" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
                             <DevelopmentDiagram />
                          </M.div>
                       )}
                       {activeStep === 3 && (
                          <M.div key="deployment" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
                             <DeploymentDiagram />
                          </M.div>
                       )}
                    </AnimatePresence>
                 </div>

                 {/* Scan Lines Overlay */}
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 pointer-events-none bg-[size:100%_4px,6px_100%] opacity-50"></div>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default Process;