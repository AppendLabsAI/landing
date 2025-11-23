
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Process from './components/Process';
import Signals from './components/Signals';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { TECH_STACK } from './constants';

const App: React.FC = () => {
  // Duplicate for infinite scroll
  const MARQUEE_ITEMS = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK, ...TECH_STACK];

  return (
    <div className="min-h-screen bg-black text-white relative font-sans selection:bg-white selection:text-black overflow-x-hidden md:cursor-none">
      
      <Navbar />
      
      <main className="relative z-0">
        <Hero />
        
        {/* Active System Modules Marquee */}
        <div className="py-20 bg-black border-y border-brand-border relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,black_0%,transparent_20%,transparent_80%,black_100%)] z-10 pointer-events-none"></div>
          
          <div className="flex animate-marquee whitespace-nowrap">
            {MARQUEE_ITEMS.map((tech, index) => (
              <div key={index} className="mx-4 flex-shrink-0">
                <div className="w-[240px] border border-white/10 bg-white/5 p-4 flex flex-col justify-between h-[100px] hover:bg-white/10 transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-brand-muted">MOD_{index.toString().padStart(3, '0')}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_rgba(74,222,128,0.5)]"></div>
                    </div>
                    
                    <div>
                      <div className="font-heading font-bold text-lg text-white group-hover:text-brand-surfaceHighlight group-hover:stroke-text transition-colors">{tech}</div>
                      <div className="w-full h-px bg-white/10 mt-2 relative overflow-hidden">
                          <div className="absolute inset-0 bg-white/50 w-full -translate-x-full group-hover:animate-[marquee_2s_linear_infinite]" style={{ animationDirection: 'reverse' }}></div>
                      </div>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Services />
        <Process />
        <About />
        <Signals />
        <Contact />
      </main>

      <Footer />
      
      <CustomCursor />
    </div>
  );
};

export default App;
