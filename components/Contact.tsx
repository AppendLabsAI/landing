import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CheckCircle2, AlertCircle } from 'lucide-react';
import { SectionId } from '../types';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const InteractiveGlobe: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const previousMouse = useRef({ x: 0, y: 0 });
    
    // Rotation state
    const rotateX = useMotionValue(20); 
    const rotateY = useMotionValue(0);

    // Add physics to rotation
    const springConfig = { damping: 30, stiffness: 100, mass: 1 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    const handleStart = (clientX: number, clientY: number) => {
        isDragging.current = true;
        previousMouse.current = { x: clientX, y: clientY };
        if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
    }

    const handleMove = (clientX: number, clientY: number) => {
        if (!isDragging.current) return;
        
        const deltaX = clientX - previousMouse.current.x;
        const deltaY = clientY - previousMouse.current.y;
        
        // Update rotation based on drag
        rotateY.set(rotateY.get() + deltaX * 0.5);
        rotateX.set(rotateX.get() - deltaY * 0.5);

        previousMouse.current = { x: clientX, y: clientY };
    }

    const handleEnd = () => {
        isDragging.current = false;
        if (containerRef.current) containerRef.current.style.cursor = 'grab';
    }

    // Mouse Events
    const handleMouseDown = (e: React.MouseEvent) => handleStart(e.clientX, e.clientY);
    const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleMouseUp = () => handleEnd();

    // Touch Events
    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        handleStart(touch.clientX, touch.clientY);
    }
    const handleTouchMove = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
    }
    const handleTouchEnd = () => handleEnd();

    return (
        <div 
            ref={containerRef}
            className="absolute inset-0 overflow-hidden cursor-grab active:cursor-grabbing z-0"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="absolute top-1/2 left-1/2 w-0 h-0 perspective-[1000px]">
                <motion.div
                    style={{ 
                        rotateX: springRotateX, 
                        rotateY: springRotateY,
                        transformStyle: "preserve-3d"
                    }}
                    className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] absolute -top-[300px] -left-[300px] md:-top-[400px] md:-left-[400px]"
                >
                     {/* Sphere Construction */}
                     <div className="absolute inset-0 rounded-full border border-white/10 opacity-20"></div>
                     
                     {/* Longitude Rings */}
                     {[0, 45, 90, 135].map((deg) => (
                         <div 
                            key={deg} 
                            className="absolute inset-0 rounded-full border border-white/20"
                            style={{ transform: `rotateY(${deg}deg)` }}
                         ></div>
                     ))}
                     
                     {/* Latitude Rings */}
                     <div className="absolute inset-[10%] rounded-full border border-white/20" style={{ transform: "rotateX(90deg)" }}></div>
                     <div className="absolute inset-[25%] rounded-full border border-white/20" style={{ transform: "rotateX(90deg)" }}></div>
                     <div className="absolute inset-[40%] rounded-full border border-white/20" style={{ transform: "rotateX(90deg)" }}></div>

                     {/* Core Glow */}
                     <div className="absolute inset-[30%] bg-white/5 blur-3xl rounded-full"></div>
                </motion.div>
            </div>
            {/* Fade Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,black_100%)] pointer-events-none"></div>
        </div>
    );
};

// --- Terminal Components ---

const TerminalInput = ({ 
  label, 
  value, 
  onChange, 
  type = "text", 
  placeholder,
  isTextarea = false,
  options = []
}: any) => (
  <div className="group font-mono text-sm">
      <div className="flex items-center gap-2 opacity-50 mb-1 group-focus-within:opacity-100 transition-opacity select-none">
          <span className="text-green-500">➜</span>
          <span className="text-blue-400">~</span>
          <span className="text-brand-muted text-xs">{label}</span>
      </div>
      <div className="relative">
          {isTextarea ? (
              <textarea
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={placeholder}
                  required
                  rows={3}
                  className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:outline-none focus:border-green-500/50 transition-colors placeholder-white/10 resize-none leading-relaxed"
              />
          ) : options.length > 0 ? (
               <div className="relative">
                 <select 
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:outline-none focus:border-green-500/50 transition-colors appearance-none [&>option]:bg-black"
                 >
                    {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
                 </select>
                 <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 text-xs">▼</div>
               </div>
          ) : (
              <input 
                  type={type}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={placeholder}
                  required
                  className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:outline-none focus:border-green-500/50 transition-colors placeholder-white/10"
              />
          )}
      </div>
  </div>
);

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'input' | 'processing' | 'success'>('input');
  const [logs, setLogs] = useState<string[]>([]);
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      type: 'AI Agent Development',
      message: ''
  });

  const generateLogs = async () => {
      const sequence = [
          `> Resolving host appendlabs.node...`,
          `> Initiating handshake with ${formData.email || 'client'}...`,
          `> Encryption: AES-256-GCM established.`,
          `> Packing payload [${formData.type.replace(/\s/g, '_').toUpperCase()}]...`,
          `> Uploading to secure_ingest... 100%`,
          `> Verifying integrity hash... OK.`,
          `> Transmission successful.`
      ];

      for (const log of sequence) {
          await new Promise(r => setTimeout(r, 600)); // Simulate processing delay
          setLogs(prev => [...prev, log]);
      }
      setTimeout(() => setFormState('success'), 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setFormState('processing');
      setLogs([]);
      generateLogs();
  };

  return (
    <section id={SectionId.CONTACT} className="py-20 md:py-32 bg-black relative border-t border-brand-border overflow-hidden min-h-screen flex items-center">
      <InteractiveGlobe />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pointer-events-none">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
            
            {/* Text Side - Minimalist Info */}
            <div className="lg:col-span-2 pointer-events-auto text-center lg:text-left">
                <div className="mb-8 md:mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 mb-6 backdrop-blur-md">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-green-400">Secure Uplink Available</span>
                    </div>
                    <h2 className="font-heading font-black text-5xl md:text-6xl text-white mb-6 tracking-tighter leading-[0.9]">
                        INITIALIZE<br/>PROTOCOL
                    </h2>
                    <p className="text-brand-muted text-base md:text-lg font-sans font-light leading-relaxed">
                        Execute your intelligence strategy. <br/>
                        Initialize a secure channel below to begin architectural assessment.
                    </p>
                </div>
            </div>

            {/* Form Side - Terminal Window */}
            <div className="lg:col-span-3 pointer-events-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-[#050505]/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden font-mono text-sm"
                >
                    {/* Window Controls */}
                    <div className="bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/5 select-none">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] hover:bg-[#FF5F56]/80 transition-colors" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 transition-colors" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] hover:bg-[#27C93F]/80 transition-colors" />
                        </div>
                        <div className="ml-4 text-white/30 text-[10px] uppercase tracking-wider flex items-center gap-2">
                             <Terminal size={10} />
                             guest@appendlabs — bash
                        </div>
                    </div>

                    <div className="p-6 md:p-8 min-h-[440px] flex flex-col">
                        <AnimatePresence mode="wait">
                            {formState === 'input' && (
                                <motion.form 
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit} 
                                    className="space-y-6 flex-1 flex flex-col"
                                >
                                    <div className="text-white/40 text-xs mb-4 select-none">
                                        # Enter project parameters to begin.<br/>
                                        # All fields marked * are required for handshake.
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <TerminalInput 
                                            label="user.id"
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={(v: string) => setFormData({...formData, name: v})}
                                        />
                                        <TerminalInput 
                                            label="user.email"
                                            placeholder="name@corp.com"
                                            type="email"
                                            value={formData.email}
                                            onChange={(v: string) => setFormData({...formData, email: v})}
                                        />
                                    </div>

                                    <TerminalInput 
                                        label="config.objective"
                                        options={['AI Agent Development', 'RAG Implementation', 'Cloud Infrastructure', 'Full Stack Engineering']}
                                        value={formData.type}
                                        onChange={(v: string) => setFormData({...formData, type: v})}
                                    />

                                    <TerminalInput 
                                        label="payload.directives"
                                        placeholder="Describe project requirements..."
                                        isTextarea
                                        value={formData.message}
                                        onChange={(v: string) => setFormData({...formData, message: v})}
                                    />

                                    <div className="pt-4 mt-auto">
                                        <button 
                                            type="submit" 
                                            className="text-green-400 hover:text-green-300 transition-colors text-xs flex items-center gap-2 group"
                                        >
                                            <span className="opacity-50 group-hover:opacity-100 transition-opacity">./transmit_signal.sh</span>
                                            <span className="w-2 h-4 bg-green-400 animate-pulse ml-1 inline-block align-middle"></span>
                                        </button>
                                    </div>
                                </motion.form>
                            )}

                            {formState === 'processing' && (
                                <motion.div 
                                    key="processing"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex-1 font-mono text-xs md:text-sm space-y-2 text-white/80"
                                >
                                    {logs.map((log, i) => (
                                        <motion.div 
                                            key={i} 
                                            initial={{ opacity: 0, x: -10 }} 
                                            animate={{ opacity: 1, x: 0 }}
                                            className={log.includes('successful') ? 'text-green-400 font-bold' : ''}
                                        >
                                            {log}
                                        </motion.div>
                                    ))}
                                    <div className="w-2 h-4 bg-white/50 animate-pulse inline-block align-middle"></div>
                                </motion.div>
                            )}

                            {formState === 'success' && (
                                <motion.div 
                                    key="success"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex-1 flex flex-col items-center justify-center text-center"
                                >
                                    <motion.div 
                                        initial={{ scale: 0 }} 
                                        animate={{ scale: 1 }} 
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6"
                                    >
                                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold text-white mb-2 font-heading">Signal Received</h3>
                                    <p className="text-white/50 text-xs mb-8 max-w-xs">
                                        Your transmission has been logged in our secure queue. Ticket #{Math.floor(Math.random() * 9000) + 1000} assigned.
                                    </p>
                                    <button 
                                        onClick={() => {
                                            setFormData({ name: '', email: '', type: 'AI Agent Development', message: '' });
                                            setLogs([]);
                                            setFormState('input');
                                        }}
                                        className="text-white/30 hover:text-white text-xs underline decoration-dashed underline-offset-4 transition-colors"
                                    >
                                        reset_terminal
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;