
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BusinessOptimization from './components/BusinessOptimization';
import Services from './components/Services';
import About from './components/About';
import Process from './components/Process';
import Signals from './components/Signals';
import Contact from './components/Contact';
import { Features } from './components/ui/Features';
import Footer from './components/Footer';
import TechModal from './components/ui/TechModal';
import Chatbot from './components/Chatbot';
import { TECH_STACK, TechItem } from './constants';

const App: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Duplicate for infinite scroll
  const MARQUEE_ITEMS = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK, ...TECH_STACK];

  const handleTechClick = (tech: TechItem) => {
    setSelectedTech(tech);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white relative font-sans selection:bg-white selection:text-black overflow-x-hidden">
      
      <Navbar />
      
      <main className="relative z-0">
        <Hero />
        
        {/* Active System Modules Marquee */}
        <div className="py-4 sm:py-6 md:py-8 lg:py-10 bg-black border-y border-brand-border relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,black_0%,transparent_15%,transparent_85%,black_100%)] z-10 pointer-events-none"></div>
          
          <div className="flex animate-marquee whitespace-nowrap">
            {MARQUEE_ITEMS.map((tech, index) => (
              <div key={`${tech.keyword}-${index}`} className="mx-2 sm:mx-3 md:mx-4 flex-shrink-0">
                <button
                  onClick={() => handleTechClick(tech)}
                  className="w-[140px] xs:w-[160px] sm:w-[180px] md:w-[200px] border border-white/10 bg-white/5 p-2.5 sm:p-3 md:p-3.5 lg:p-4 flex flex-col justify-between h-[65px] xs:h-[70px] sm:h-[75px] md:h-[80px] hover:bg-white/10 transition-all group rounded-sm cursor-pointer active:scale-95 text-left"
                >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-mono text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-widest text-brand-muted">MOD_{index.toString().padStart(3, '0')}</span>
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_3px_rgba(74,222,128,0.5)]"></div>
                    </div>
                    
                    <div>
                      <div className="font-heading font-bold text-sm sm:text-base md:text-lg text-white group-hover:text-brand-surfaceHighlight transition-colors leading-tight">{tech.keyword}</div>
                      <div className="w-full h-px bg-white/10 mt-1.5 relative overflow-hidden">
                          <div className="absolute inset-0 bg-white/50 w-full -translate-x-full group-hover:animate-[marquee_2s_linear_infinite]" style={{ animationDirection: 'reverse' }}></div>
                      </div>
                    </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Modal */}
        <TechModal item={selectedTech} isOpen={isModalOpen} onClose={handleCloseModal} />

        <BusinessOptimization />
        <Services />
        <Process />
        <About />
        <Signals />
        <Contact />
        <Features />
      </main>

      <Footer />
      
      <Chatbot />
    </div>
  );
};

export default App;
