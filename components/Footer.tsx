import React from 'react';
import { NAV_ITEMS } from '../constants';
import { ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black relative pt-12 md:pt-20 lg:pt-28 xl:pt-32 pb-6 md:pb-8 lg:pb-10 overflow-hidden border-t border-brand-border">
      <div className="max-w-[95rem] mx-auto px-6 md:px-8">
        
        {/* Mobile: Top Action Row */}
        <div className="md:hidden flex justify-between items-center mb-8 border-b border-white/10 pb-6">
            <div className="font-heading font-bold text-white tracking-tight text-lg">
                AppendLabs
            </div>
            <button 
                onClick={scrollToTop}
                className="group flex items-center gap-2 text-brand-muted hover:text-white transition-colors"
            >
                <span className="font-mono text-[10px] uppercase tracking-widest">Top</span>
                <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
            </button>
        </div>

        {/* Navigation & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:py-12 gap-10 md:gap-10 relative z-10">
            
            {/* Mobile: Single Column List | Desktop: Flex */}
            <div className="w-full md:w-auto flex flex-col gap-y-2 md:flex-row md:flex-wrap md:gap-x-12">
                {NAV_ITEMS.map((item, index) => (
                    <a 
                        key={item.label} 
                        href={item.href} 
                        className="group relative font-mono text-xs md:text-sm text-brand-muted hover:text-white transition-colors flex items-center py-3 border-b border-white/5 md:border-none md:py-0 justify-between md:justify-start"
                    >
                        <span className="hidden md:inline absolute -left-4 opacity-0 group-hover:opacity-100 transition-opacity text-green-500">&gt;</span>
                        <span className="uppercase tracking-[0.15em]">{item.label}</span>
                        <span className="md:hidden text-white/20 text-[10px]">0{index + 1}</span>
                    </a>
                ))}
            </div>
            
            {/* Desktop: Return Button */}
            <button 
                onClick={scrollToTop}
                className="hidden md:flex group items-center gap-3 text-brand-muted hover:text-white transition-colors self-start"
            >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Return_To_Surface</span>
                <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
            </button>
        </div>

        {/* Massive Signature */}
        <div className="relative mt-10 md:mt-16 lg:mt-20 mb-6 md:mb-8 overflow-hidden select-none">
            <h1 className="font-heading font-black text-[15vw] sm:text-[16vw] md:text-[17vw] lg:text-[18vw] leading-[0.85] md:leading-[0.8] text-white tracking-tighter opacity-90 text-left mix-blend-difference">
                APPEND<br className="md:hidden"/>LABS
            </h1>
        </div>
        
        {/* Legal Links */}
        <div className="pt-6 border-t border-white/10">
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
                <a 
                    href="/terms" 
                    className="font-mono text-[10px] uppercase tracking-widest text-brand-muted hover:text-white transition-colors"
                >
                    Terms of Service
                </a>
                <a 
                    href="/privacy" 
                    className="font-mono text-[10px] uppercase tracking-widest text-brand-muted hover:text-white transition-colors"
                >
                    Privacy Policy
                </a>
            </div>
        </div>

        {/* Meta Data */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end pt-6 border-t border-white/10 opacity-60 gap-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-brand-muted">
                Bengaluru, IN
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-brand-muted text-left md:text-right">
                © {new Date().getFullYear()} AppendLabs
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;