
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle Scroll for Pill State
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    // Check initial
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock Body Scroll when Menu is Open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100dvh'; // Prevent rubber banding
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    }
    return () => { 
        document.body.style.overflow = 'unset'; 
        document.body.style.height = 'auto';
    }
  }, [isOpen]);

  // --- Variances ---
  const menuContainerVariants = {
    closed: { 
        opacity: 0,
        transition: { 
            duration: 0.5, 
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2 // Wait for links to fade out before removing bg
        } 
    },
    open: { 
        opacity: 1, 
        transition: { 
            duration: 0.6, 
            ease: [0.22, 1, 0.36, 1] 
        } 
    }
  };

  const linkVariants = {
    closed: { 
        y: 20, 
        opacity: 0,
        transition: { duration: 0.3, ease: "easeIn" }
    },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { 
          delay: 0.3 + i * 0.1, // Wait for bg, then stagger slower
          duration: 1,          // Long, smooth rise
          ease: [0.22, 1, 0.36, 1] 
      }
    })
  };

  return (
    <>
      {/* 
        NAVBAR CONTAINER 
        Z-Index 60 to sit above the full screen menu (Z-50)
      */}
      <div className="fixed top-0 left-0 right-0 z-[60] flex justify-center pt-2 md:pt-4 pointer-events-none">
        <motion.nav
          layout // Enables smooth layout transitions
          initial={false}
          animate={{
             width: isScrolled ? "80%" : "100%",
             maxWidth: isScrolled ? "1200px" : "90rem", // Limit pill width
          }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
          className={`
            relative flex items-center justify-between
            pointer-events-auto
            transition-all duration-500
            ${isScrolled 
               // Pill Style: Rounded, Bordered, Backdrop (Only if menu is CLOSED)
               ? `rounded-full px-5 py-2 ${!isOpen ? 'bg-brand-surface/80 backdrop-blur-xl border border-white/10 shadow-2xl' : 'bg-transparent border-transparent'}` 
               // Top Style: Full width, Transparent
               : 'px-6 py-4 md:py-6 bg-transparent border-transparent'
            }
          `}
        >
          {/* Logo */}
          <a href="#" className="relative z-50 group">
            <span className="font-heading font-black text-xl tracking-tighter text-white mix-blend-exclusion">
              APPEND<span className="text-white/50">LABS</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
             <div className={`flex items-center gap-8 transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-xs font-mono font-medium text-brand-muted hover:text-white transition-colors uppercase tracking-widest"
                  >
                    {item.label}
                  </a>
                ))}
             </div>
             
             {/* CTA Button (Desktop) */}
             <a 
              href="#contact"
              className={`relative inline-flex items-center justify-center px-6 py-2 overflow-hidden text-[10px] font-bold text-black bg-white rounded-full transition-all hover:scale-105 active:scale-95 uppercase tracking-widest ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              Start Project
            </a>
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 p-2 -mr-2 text-white focus:outline-none touch-manipulation pointer-events-auto"
            aria-label="Toggle Menu"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {isOpen ? (
                      <motion.div 
                        key="close" 
                        initial={{ rotate: -90, opacity: 0 }} 
                        animate={{ rotate: 0, opacity: 1 }} 
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                          <X size={24} />
                      </motion.div>
                  ) : (
                      <motion.div 
                        key="menu" 
                        initial={{ rotate: 90, opacity: 0 }} 
                        animate={{ rotate: 0, opacity: 1 }} 
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                          <Menu size={24} />
                      </motion.div>
                  )}
                </AnimatePresence>
            </div>
          </button>
        </motion.nav>
      </div>

      {/* 
        FULL SCREEN MENU OVERLAY
        Z-Index 50
      */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuContainerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-50 bg-black flex flex-col"
          >
             {/* Grid Background */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50"></div>
             
             {/* Content Container */}
             <div className="flex-1 flex flex-col justify-center px-8 pb-20 pt-32 overflow-y-auto">
                <div className="flex flex-col gap-6">
                    {NAV_ITEMS.map((item, i) => (
                    <motion.div
                        key={item.label}
                        custom={i}
                        variants={linkVariants}
                    >
                        <a
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="group flex items-baseline gap-4"
                        >
                            <span className="font-mono text-xs text-brand-muted group-hover:text-white transition-colors">0{i+1}</span>
                            <span className="font-heading font-black text-5xl sm:text-6xl text-transparent stroke-text group-hover:text-white transition-colors duration-300"
                                  style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
                                {item.label}
                            </span>
                        </a>
                    </motion.div>
                    ))}
                </div>
                
                <motion.div 
                    custom={5}
                    variants={linkVariants}
                    className="mt-12 pt-12 border-t border-white/10"
                >
                    <a 
                        href="#contact"
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center justify-center w-full py-4 bg-white text-black font-mono text-sm uppercase tracking-widest font-bold"
                    >
                        Start Project
                    </a>
                </motion.div>
             </div>

             {/* Footer Info */}
             <div className="p-8 flex justify-between items-end text-brand-muted font-mono text-[10px] uppercase tracking-widest">
                 <div>Based in<br/>Bengaluru, IN</div>
                 <div className="text-right">System<br/><span className="text-green-500">Operational</span></div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
