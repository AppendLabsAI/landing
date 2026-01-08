import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from './SEO';
import Navbar from './Navbar';
import Hero from './Hero';
import BusinessOptimization from './BusinessOptimization';
import Services from './Services';
import About from './About';
import Process from './Process';
import Signals from './Signals';
import Contact from './Contact';
import { Features } from './ui/Features';
import Footer from './Footer';
import TechModal from './ui/TechModal';
import Chatbot from './Chatbot';
import { TECH_STACK, TechItem } from '../constants';

const HomePage: React.FC = () => {
  const location = useLocation();
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

  // Determine SEO based on route
  const getSEO = () => {
    const baseUrl = 'https://appendlabs.com';
    const path = location.pathname;

    const seoConfig: { [key: string]: any } = {
      '/': {
        title: 'AppendLabs | Append Intelligence to Your Infrastructure',
        description: 'Production-grade AI infrastructure and intelligent agents that reduce workload, improve efficiency, and deliver measurable operational value. Secure, deterministic, and cost-optimized AI solutions for businesses.',
        keywords: 'AI infrastructure, AI agents, RAG chatbots, business automation, operational intelligence, AI consulting, custom AI solutions, machine learning, AI development, intelligent automation, enterprise AI, AI integration, model context protocols, air-gapped RAG, deterministic AI, cost-optimized AI, production AI, AI deployment, Bengaluru AI company, India AI services',
        canonical: baseUrl,
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'AppendLabs',
          url: baseUrl,
          description: 'Append Intelligence to Your Infrastructure - Production-grade AI infrastructure and intelligent automation',
          potentialAction: {
            '@type': 'SearchAction',
            target: `${baseUrl}/?s={search_term_string}`,
            'query-input': 'required name=search_term_string'
          }
        }
      },
      '/services': {
        title: 'AI Services | Operational Intelligence, AI Agents, RAG Chatbots | AppendLabs',
        description: 'Comprehensive AI services including operational intelligence systems, AI agents as a service, RAG-based chatbots, MCP services, cloud development, and omnichannel integration. Production-ready AI solutions for your business.',
        keywords: 'AI services, operational intelligence, AI agents, RAG chatbots, MCP services, AI automation, cloud AI development, omnichannel AI integration, custom AI solutions, enterprise AI services, AI consulting services',
        canonical: `${baseUrl}/services`,
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'AI Infrastructure and Intelligent Automation Services',
          provider: {
            '@type': 'Organization',
            name: 'AppendLabs',
            url: baseUrl
          },
          areaServed: 'Worldwide',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'AI Services',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Operational Intelligence Systems',
                  description: 'AI systems that surface insights, automate actions, and continuously optimize business operations'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'AI Agents as a Service',
                  description: 'Autonomous agents that perform complex tasks and automate workflows 24/7'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'RAG Based Chatbots',
                  description: 'Retrieval-Augmented Generation systems that chat with business data with zero hallucinations'
                }
              }
            ]
          }
        }
      },
      '/process': {
        title: 'AI Implementation Process | 4-Step Protocol | AppendLabs',
        description: 'Our proven 4-step AI implementation process: Audit & Discovery, Protocol Design, Development, and Deployment. Learn how AppendLabs delivers production-ready AI infrastructure with zero-downtime integration.',
        keywords: 'AI implementation process, AI development process, AI deployment, model context protocol, RAG pipeline, AI audit, AI discovery, AI protocol design, AI development methodology',
        canonical: `${baseUrl}/process`,
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'AI Implementation Process',
          description: '4-step process for implementing production-ready AI infrastructure',
          step: [
            {
              '@type': 'HowToStep',
              name: 'Audit & Discovery',
              text: 'Map data topography and identify high-latency manual workflows'
            },
            {
              '@type': 'HowToStep',
              name: 'Protocol Design',
              text: 'Define Model Context Protocols (MCPs) and Vector schemas'
            },
            {
              '@type': 'HowToStep',
              name: 'Development',
              text: 'Build agents with iterative sprints focused on latency and accuracy'
            },
            {
              '@type': 'HowToStep',
              name: 'Deployment',
              text: 'Zero-downtime integration with full documentation and monitoring'
            }
          ]
        }
      },
      '/about': {
        title: 'About AppendLabs | AI Infrastructure Company | Mission & Vision',
        description: 'AppendLabs builds secure, deterministic, and cost-optimized AI infrastructure. We don\'t start with AI - we start with how your business runs. Learn about our mission, vision, approach, core values, and commitments.',
        keywords: 'about AppendLabs, AI infrastructure company, AI company Bengaluru, AI mission, AI vision, operational intelligence company, enterprise AI solutions, production AI systems',
        canonical: `${baseUrl}/about`,
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          mainEntity: {
            '@type': 'Organization',
            name: 'AppendLabs',
            url: baseUrl,
            logo: `${baseUrl}/logo.png`,
            description: 'Append Intelligence to Your Infrastructure - Production-grade AI infrastructure and intelligent automation',
            foundingLocation: {
              '@type': 'Place',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Bengaluru',
                addressRegion: 'Karnataka',
                addressCountry: 'IN'
              }
            }
          }
        }
      },
      '/contact': {
        title: 'Contact AppendLabs | Get AI Solutions Quote | Bengaluru, India',
        description: 'Contact AppendLabs for AI infrastructure solutions, custom AI development, and intelligent automation services. Get a quote for operational intelligence, AI agents, RAG chatbots, and more. Based in Bengaluru, India.',
        keywords: 'contact AppendLabs, AI solutions quote, AI consultation, AI services contact, AppendLabs email, AI company contact, Bengaluru AI company',
        canonical: `${baseUrl}/contact`,
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          mainEntity: {
            '@type': 'Organization',
            name: 'AppendLabs',
            email: 'hello@appendlabs.com',
            url: baseUrl,
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Sales and Support',
              email: 'hello@appendlabs.com',
              areaServed: 'Worldwide',
              availableLanguage: 'English'
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Bengaluru',
              addressRegion: 'Karnataka',
              addressCountry: 'IN'
            }
          }
        }
      }
    };

    return seoConfig[path] || seoConfig['/'];
  };

  const seo = getSEO();

  return (
    <>
      <SEO {...seo} />
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
    </>
  );
};

export default HomePage;

