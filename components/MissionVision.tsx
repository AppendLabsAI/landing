import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, ArrowRight } from 'lucide-react';

// Fix: Cast motion to any to avoid type errors with IntrinsicAttributes
const M = motion as any;

const MissionVision: React.FC = () => {
  return (
    <section className="py-20 md:py-40 bg-black border-t border-brand-border relative z-10">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 md:mb-24 border-b border-brand-border pb-12">
          <div>
            <h2 className="text-white font-mono text-xs tracking-[0.2em] uppercase mb-4">
              <span className="text-brand-muted">//</span> Mission & Vision
            </h2>
            <h3 className="font-heading font-bold text-5xl md:text-7xl text-white leading-none tracking-tighter">
              FOUNDATION<br/>PRINCIPLES
            </h3>
          </div>
          <p className="text-brand-muted max-w-sm mt-8 md:mt-0 font-mono text-xs leading-relaxed uppercase tracking-wide text-right">
            Core Values<br/>
            Guiding Philosophy<br/>
            Strategic Direction
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-1 md:bg-brand-border md:border border-brand-border">
          
          {/* Mission */}
          <M.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative flex flex-col justify-between p-8 md:p-12 bg-brand-surface border border-brand-border md:border-none overflow-hidden hover:border-white/20 transition-all duration-500"
          >
            {/* Animated Grid on Hover */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Glowing Orb */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 blur-[80px] rounded-full group-hover:bg-white/10 transition-colors duration-700"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 p-4 bg-white/5 rounded-sm border border-white/10 text-brand-muted group-hover:bg-white group-hover:text-black transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                  <Target className="w-full h-full" />
                </div>
                <span className="font-mono text-[10px] text-brand-muted uppercase tracking-widest group-hover:text-white transition-all duration-500 group-hover:tracking-[0.25em]">
                  01
                </span>
              </div>

              <h4 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6 tracking-tight leading-none group-hover:translate-x-2 transition-transform duration-500">
                Mission
              </h4>

              <p className="text-brand-muted text-base md:text-lg leading-relaxed font-sans font-medium max-w-md group-hover:text-white/80 transition-colors mb-8">
                Make production-grade AI accessible and affordable for businesses by building secure, deterministic, and cost-optimized AI infrastructure that actually reduces workload and delivers measurable operational value.
              </p>
            </div>

            <div className="relative z-10 pt-8 border-t border-white/5 flex items-center justify-between group-hover:border-white/20 transition-colors">
              <span className="text-[10px] font-mono uppercase bg-white/5 px-3 py-1.5 rounded-sm text-brand-muted group-hover:text-white transition-colors">
                Core Objective
              </span>
              <ArrowRight className="w-5 h-5 text-brand-muted group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </M.div>

          {/* Vision */}
          <M.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative flex flex-col justify-between p-8 md:p-12 bg-brand-surface border border-brand-border md:border-none overflow-hidden hover:border-white/20 transition-all duration-500"
          >
            {/* Animated Grid on Hover */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Glowing Orb */}
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/5 blur-[80px] rounded-full group-hover:bg-white/10 transition-colors duration-700"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 p-4 bg-white/5 rounded-sm border border-white/10 text-brand-muted group-hover:bg-white group-hover:text-black transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                  <Eye className="w-full h-full" />
                </div>
                <span className="font-mono text-[10px] text-brand-muted uppercase tracking-widest group-hover:text-white transition-all duration-500 group-hover:tracking-[0.25em]">
                  02
                </span>
              </div>

              <h4 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6 tracking-tight leading-none group-hover:translate-x-2 transition-transform duration-500">
                Vision
              </h4>

              <p className="text-brand-muted text-base md:text-lg leading-relaxed font-sans font-medium max-w-md group-hover:text-white/80 transition-colors mb-8">
                To be the invisible backbone of AI-enabled enterprises where every team has reliable AI driving smarter decisions, faster execution, and predictable costs.
              </p>
            </div>

            <div className="relative z-10 pt-8 border-t border-white/5 flex items-center justify-between group-hover:border-white/20 transition-colors">
              <span className="text-[10px] font-mono uppercase bg-white/5 px-3 py-1.5 rounded-sm text-brand-muted group-hover:text-white transition-colors">
                Future State
              </span>
              <ArrowRight className="w-5 h-5 text-brand-muted group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </M.div>

        </div>
      </div>
    </section>
  );
};

export default MissionVision;

