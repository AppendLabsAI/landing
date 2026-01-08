import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';

// Fix: Cast motion to any to avoid type errors with IntrinsicAttributes
const M = motion as any;

const Signals: React.FC = () => {
  return (
    <section className="py-16 md:py-24 lg:py-32 xl:py-40 bg-black border-t border-brand-border">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 md:mb-14 lg:mb-16 xl:mb-20">
            <div className="text-left w-full md:w-auto">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <h2 className="text-white font-mono text-xs tracking-[0.2em] uppercase">
                    <span className="text-brand-muted">//</span> Transmissions
                  </h2>
                  {/* Frequency Visualizer */}
                  <div className="flex gap-0.5 items-end h-3">
                      {[1,2,3,4,5].map(i => (
                          <M.div 
                             key={i} 
                             className="w-0.5 bg-green-500"
                             animate={{ height: ["20%", "100%", "20%"] }}
                             transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity, ease: "linear" }}
                          />
                      ))}
                  </div>
              </div>
              <h3 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tighter">
                INTERCEPTED<br/>SIGNALS
              </h3>
            </div>
            <div className="hidden md:block text-brand-muted font-mono text-xs uppercase tracking-widest text-right">
                Encrypted Feed<br/>verified_users_only
            </div>
        </div>

        {/* Desktop: Grid | Mobile: Horizontal Scroll Snap */}
        <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-4 md:gap-px md:bg-brand-border md:border border-brand-border pb-8 md:pb-0 no-scrollbar">
          {TESTIMONIALS.map((t, index) => (
            <M.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="min-w-[85vw] md:min-w-0 snap-center bg-black p-6 md:p-10 flex flex-col justify-between group hover:bg-brand-surfaceHighlight transition-colors duration-500 border border-brand-border md:border-none"
            >
              <div className="mb-8">
                <Quote className="w-8 h-8 text-brand-border mb-6 group-hover:text-white transition-colors" />
                <p className="text-brand-muted font-sans font-medium text-base md:text-lg leading-relaxed group-hover:text-white/90 transition-colors">
                  "{t.content}"
                </p>
              </div>

              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-brand-surface border border-white/10 rounded-full flex items-center justify-center font-heading font-bold text-white">
                    {t.name.charAt(0)}
                 </div>
                 <div>
                    <div className="text-white font-heading font-bold text-sm">{t.name}</div>
                    <div className="text-brand-muted font-mono text-[10px] uppercase tracking-wider">
                       {t.role} / {t.company}
                    </div>
                 </div>
              </div>
            </M.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Signals;