import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import HomePage from './HomePage';
import SEO from './SEO';

// Map route paths to section IDs
const routeToSectionMap: { [key: string]: string } = {
  '/services': 'services',
  '/process': 'process',
  '/about': 'about',
  '/contact': 'contact',
};

const SectionRoutes: React.FC = () => {
  const location = useLocation();
  const hasScrolled = useRef(false);

  useEffect(() => {
    const sectionId = routeToSectionMap[location.pathname];
    
    if (sectionId && !hasScrolled.current) {
      // Wait for page to load, then scroll to section
      const scrollToSection = () => {
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
          const offset = 80; // Account for navbar
          const elementPosition = sectionElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth'
          });
          hasScrolled.current = true;
        } else {
          // If element not found, try again after a short delay (max 3 attempts)
          const attempts = parseInt(sessionStorage.getItem(`scroll_${sectionId}_attempts`) || '0');
          if (attempts < 3) {
            sessionStorage.setItem(`scroll_${sectionId}_attempts`, String(attempts + 1));
            setTimeout(scrollToSection, 300);
          }
        }
      };

      // Reset attempts for new route
      sessionStorage.removeItem(`scroll_${sectionId}_attempts`);
      hasScrolled.current = false;
      
      // Small delay to ensure page is rendered
      setTimeout(scrollToSection, 150);
    }
  }, [location.pathname]);

  // Get section-specific SEO with structured data
  const getSectionSEO = () => {
    const sectionId = routeToSectionMap[location.pathname];
    const baseUrl = 'https://appendlabs.com';
    
    const seoMap: { [key: string]: any } = {
      'services': {
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
          areaServed: 'Worldwide'
        }
      },
      'process': {
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
      'about': {
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
            description: 'Append Intelligence to Your Infrastructure - Production-grade AI infrastructure and intelligent automation'
          }
        }
      },
      'contact': {
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
            }
          }
        }
      }
    };

    return seoMap[sectionId] || {};
  };

  const sectionSEO = getSectionSEO();

  return (
    <>
      {Object.keys(sectionSEO).length > 0 && <SEO {...sectionSEO} />}
      <HomePage />
    </>
  );
};

export default SectionRoutes;

