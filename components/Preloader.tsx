import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = [
  "INITIALIZING_CORE",
  "LOADING_ASSETS",
  "ESTABLISHING_UPLINK",
  "HANDSHAKING",
  "RESOLVING_DNS",
  "SYSTEM_READY"
];

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    // Counter Animation
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    // Text Cycle
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % WORDS.length);
    }, 450);

    // Completion Trigger
    const timeout = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="relative z-10 flex flex-col items-center">
        {/* Percentage */}
        <div className="font-heading font-black text-9xl text-white tracking-tighter mb-4 mix-blend-difference">
           {count}%
        </div>
        
        {/* System Text */}
        <div className="h-6 overflow-hidden">
            <motion.div 
               key={textIndex}
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -20, opacity: 0 }}
               className="font-mono text-xs text-brand-muted uppercase tracking-[0.2em]"
            >
               {WORDS[textIndex]}
            </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-[-40px] w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
           <motion.div 
              className="h-full bg-white" 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
           />
        </div>
      </div>

      {/* Background Noise/Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none"></div>
    </motion.div>
  );
};

export default Preloader;