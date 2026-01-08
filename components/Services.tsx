import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SERVICES, ServiceItem } from '../constants';
import { SectionId } from '../types';
import { ArrowUpRight } from 'lucide-react';
import ServiceModal from './ui/ServiceModal';

// Fix: Cast motion to any to avoid type errors with IntrinsicAttributes
const M = motion as any;

// --- Custom Animated Icons ---

const ServiceIcon: React.FC<{ id: string }> = ({ id }) => {
  const strokeColor = "currentColor";
  const transition = { duration: 3, repeat: Infinity, ease: "easeInOut" };

  switch (id) {
    case 'operational-intelligence': // Analytics / Insights
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <M.path
            d="M3 20L7 16L11 20L21 10"
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
          <M.path
            d="M3 12L7 8L11 12L21 2"
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0.5 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatDelay: 1 }}
          />
          <M.circle
            cx="3"
            cy="20"
            r="1.5"
            fill={strokeColor}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <M.circle
            cx="21"
            cy="10"
            r="1.5"
            fill={strokeColor}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, delay: 1, repeat: Infinity }}
          />
        </svg>
      );
    case 'internal-automation': // Tools / Gears
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <M.circle
            cx="12"
            cy="12"
            r="3"
            stroke={strokeColor}
            strokeWidth="1.5"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "12px 12px" }}
          />
          <M.path
            d="M12 1V3M12 21V23M23 12H21M3 12H1M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93"
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "12px 12px" }}
          />
        </svg>
      );
    case 'mcp': // Protocol / Database
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <M.path
            d="M12 3V21"
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 }}
            transition={transition}
          />
          <M.rect
            x="4" y="6" width="16" height="4" rx="2"
            stroke={strokeColor}
            strokeWidth="1.5"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
          <M.rect
            x="4" y="14" width="16" height="4" rx="2"
            stroke={strokeColor}
            strokeWidth="1.5"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse" }}
          />
          <M.path
             d="M7 10V14 M17 10V14"
             stroke={strokeColor}
             strokeWidth="1.5"
             strokeDasharray="2 2"
             animate={{ strokeDashoffset: [0, 4] }}
             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      );
    case 'ai-agents': // Orbit / Bot
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
           <M.circle
             cx="12" cy="12" r="3"
             stroke={strokeColor}
             strokeWidth="1.5"
             animate={{ scale: [1, 1.2, 1] }}
             transition={{ duration: 2, repeat: Infinity }}
           />
           <M.ellipse
             cx="12" cy="12" rx="8" ry="3"
             stroke={strokeColor}
             strokeWidth="1"
             initial={{ rotate: 0 }}
             animate={{ rotate: 360 }}
             transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
           />
           <M.ellipse
             cx="12" cy="12" rx="8" ry="3"
             stroke={strokeColor}
             strokeWidth="1"
             initial={{ rotate: 90 }}
             animate={{ rotate: 450 }}
             transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
           />
        </svg>
      );
    case 'rag-chatbots': // Scan / Code
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
           <path d="M4 4H20V20H4V4Z" stroke={strokeColor} strokeWidth="1.5" strokeOpacity="0.3" />
           <M.path 
             d="M8 8H16 M8 12H16 M8 16H12" 
             stroke={strokeColor} 
             strokeWidth="1.5" 
             strokeLinecap="round"
             initial={{ pathLength: 0 }}
             animate={{ pathLength: 1 }}
             transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
           />
           <M.rect
             x="2" y="0" width="20" height="2"
             fill={strokeColor}
             initial={{ y: 4, opacity: 0 }}
             animate={{ y: 18, opacity: [0, 1, 0] }}
             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
           />
        </svg>
      );
    case 'cloud-dev': // Cloud / Particles
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
           <M.path
             d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.132 20.177 10.244 17.819 10.021C17.485 6.643 14.654 4 11.5 4C8.455 4 5.727 6.402 5.187 9.61C2.793 10.028 1 12.093 1 14.5C1 16.985 3.015 19 5.5 19H17.5Z"
             stroke={strokeColor}
             strokeWidth="1.5"
             strokeLinecap="round"
             strokeLinejoin="round"
             initial={{ strokeDasharray: "4 4", strokeDashoffset: 0 }}
             animate={{ strokeDashoffset: 8 }}
             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
           />
           <M.circle cx="8" cy="14" r="1" fill={strokeColor} animate={{ y: [0, -2, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
           <M.circle cx="12" cy="12" r="1" fill={strokeColor} animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }} />
           <M.circle cx="16" cy="14" r="1" fill={strokeColor} animate={{ y: [0, -2, 0] }} transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }} />
        </svg>
      );
    case 'integration': // Network
      return (
         <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <M.circle cx="12" cy="12" r="2" stroke={strokeColor} strokeWidth="1.5" />
            <M.circle cx="6" cy="18" r="2" stroke={strokeColor} strokeWidth="1.5" />
            <M.circle cx="18" cy="6" r="2" stroke={strokeColor} strokeWidth="1.5" />
            <M.circle cx="18" cy="18" r="2" stroke={strokeColor} strokeWidth="1.5" />
            <M.circle cx="6" cy="6" r="2" stroke={strokeColor} strokeWidth="1.5" />
            
            <M.path d="M12 12L6 6" stroke={strokeColor} strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, repeat: Infinity }} />
            <M.path d="M12 12L18 18" stroke={strokeColor} strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }} />
            <M.path d="M12 12L6 18" stroke={strokeColor} strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.2, repeat: Infinity }} />
            <M.path d="M12 12L18 6" stroke={strokeColor} strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.7, repeat: Infinity }} />
         </svg>
      );
    default:
      return null;
  }
};

const Services: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceClick = (service: ServiceItem) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  const getGridClass = (index: number) => {
    switch (index) {
      case 0: return "md:col-span-2 md:row-span-2"; // Operational Intelligence - Large
      case 1: return "md:col-span-1 md:row-span-2"; // Internal Automation - Tall
      case 2: return "md:col-span-1 md:row-span-1"; // MCP - Regular
      default: return "md:col-span-1 md:row-span-1";
    }
  };

  return (
    <section id={SectionId.SERVICES} className="py-16 md:py-24 lg:py-32 xl:py-40 bg-black border-t border-brand-border relative z-10">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-16 lg:mb-20 xl:mb-24 border-b border-brand-border pb-8 md:pb-10 lg:pb-12">
          <div className="text-left w-full md:w-auto">
            <h2 className="text-white font-mono text-xs tracking-[0.2em] uppercase mb-3 md:mb-4">
              <span className="text-brand-muted">//</span> Capabilities
            </h2>
            <h3 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-none tracking-tighter">
              COGNITIVE<br/>ARCHITECTURE
            </h3>
          </div>
          <p className="text-brand-muted max-w-sm mt-6 md:mt-0 font-mono text-xs leading-relaxed uppercase tracking-wide text-left md:text-right">
            Deployed Systems<br/>
            Running at 99.9% Uptime<br/>
            Global Infrastructure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {SERVICES.map((service, index) => (
            <M.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleServiceClick(service)}
              className={`
                group relative flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10 
                bg-brand-surface border border-white/5 overflow-hidden 
                transition-all duration-500 ease-in-out cursor-pointer
                ${getGridClass(index)}
                ${hoveredIndex !== null && hoveredIndex !== index ? 'opacity-30 scale-95 blur-[1px]' : 'opacity-100 scale-100 hover:border-white/20'}
              `}
            >
              {/* Animated Grid on Hover */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Glowing Orb */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 blur-[80px] rounded-full group-hover:bg-white/10 transition-colors duration-700"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4 sm:mb-6 md:mb-8">
                   <div className="w-10 h-10 sm:w-12 sm:h-12 p-2 bg-white/5 rounded-sm border border-white/10 text-brand-muted group-hover:bg-white group-hover:text-black transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                      {/* Use Custom SVG Icon */}
                      <ServiceIcon id={service.id} />
                   </div>
                   <span className="font-mono text-[9px] sm:text-[10px] text-brand-muted uppercase tracking-widest group-hover:text-white transition-all duration-500 group-hover:tracking-[0.25em]">
                      0{index + 1}
                   </span>
                </div>

                <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-heading font-bold text-white mb-3 sm:mb-4 tracking-tight leading-none group-hover:translate-x-2 transition-transform duration-500">
                    {service.title}
                </h4>

                <p className="text-brand-muted text-xs sm:text-sm leading-relaxed font-sans font-medium max-w-[90%] group-hover:text-white/80 transition-colors">
                    {service.description}
                </p>
              </div>

              <div className="relative z-10 mt-6 sm:mt-8 md:mt-12 pt-6 sm:pt-8 border-t border-white/5 flex items-center justify-between group-hover:border-white/20 transition-colors">
                  <div className="flex gap-2">
                    {service.tags.slice(0, 1).map(tag => (
                        <span key={tag} className="text-[10px] font-mono uppercase bg-white/5 px-2 py-1 rounded-sm text-brand-muted">
                            {tag}
                        </span>
                    ))}
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-brand-muted group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </M.div>
          ))}
        </div>
      </div>

      {/* Service Modal */}
      <ServiceModal 
        item={selectedService} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </section>
  );
};

export default Services;