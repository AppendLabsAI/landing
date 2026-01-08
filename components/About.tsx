import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionId } from '../types';
import { FaqAccordion } from './ui/faq-chat-accordion';

// Fix: Cast motion to any to avoid type errors with IntrinsicAttributes
const M = motion as any;

// Scroll-Based Word Reveal Component - Optimized for All Devices
const ScrollWordReveal: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Detect mobile and reduced motion preference
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const checkReducedMotion = () => {
      setPrefersReducedMotion(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    };
    
    checkMobile();
    checkReducedMotion();
    
    window.addEventListener('resize', checkMobile);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', checkReducedMotion);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', checkReducedMotion);
    };
  }, []);
  
  // Adaptive scroll offsets for mobile vs desktop
  const scrollOffset = isMobile 
    ? ["start 0.9", "start 0.1"]  // Larger trigger range for mobile
    : ["start 0.85", "start 0.15"]; // Tighter range for desktop
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: scrollOffset,
    layoutEffect: false // Better performance
  });
  
  const words = useMemo(() => text.split(" "), [text]);
  
  // Reduced blur on mobile for better performance
  const blurAmount = isMobile ? 4 : 8;
  const yOffset = isMobile ? 15 : 20;
  
  // If reduced motion, show all words immediately
  if (prefersReducedMotion) {
    return (
      <p ref={ref} className="text-white font-sans text-lg md:text-xl leading-relaxed flex flex-wrap max-w-4xl">
        {words.map((word, index) => (
          <span key={index} className="inline-block mr-1.5 text-white">
            {word}
          </span>
        ))}
      </p>
    );
  }
  
  return (
    <p 
      ref={ref} 
      className="text-white font-sans text-lg md:text-xl leading-relaxed flex flex-wrap max-w-4xl"
      style={{ willChange: 'transform' }} // Hint for GPU acceleration
    >
      {words.map((word, index) => {
        // Calculate word reveal progress based on scroll
        const wordStart = index / words.length;
        const wordEnd = (index + 1) / words.length;
        const revealRange = 0.1; // Percentage of scroll for each word reveal
        
        // Smooth word reveal with overlap for natural feel
        const revealStart = Math.max(0, wordStart - revealRange / 2);
        const revealEnd = Math.min(1, wordStart + revealRange * 1.5);
        
        const wordOpacity = useTransform(
          scrollYProgress,
          [revealStart, wordStart + revealRange / 2, revealEnd],
          [0, 1, 1],
          { clamp: true }
        );
        
        const wordY = useTransform(
          scrollYProgress,
          [revealStart, wordStart + revealRange / 2, revealEnd],
          [yOffset, 0, 0],
          { clamp: true }
        );
        
        const wordBlur = useTransform(
          scrollYProgress,
          [revealStart, wordStart + revealRange / 2, revealEnd],
          [blurAmount, 0, 0],
          { clamp: true }
        );
        
        return (
          <M.span
            key={index}
            style={{
              opacity: wordOpacity,
              y: wordY,
              filter: `blur(${wordBlur}px)`,
              willChange: 'transform, opacity, filter', // GPU acceleration
              transform: 'translateZ(0)', // Force hardware acceleration
            }}
            className="inline-block mr-1.5 text-white"
          >
            {word}
          </M.span>
        );
      })}
    </p>
  );
};

const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const descriptionText = "We don't start with AI, we start with how your business actually runs. By observing day-to-day processes and decision flows, we uncover where time, effort, and resources are being lost. Instead of forcing new tools, we extend and strengthen your existing systems with intelligence where it matters. Each build is structured for stability, data safety, and future growth. We avoid experimental setups and focus on systems that perform consistently. The result is AI that delivers real operational gains, not theoretical improvements.";

  return (
    <section ref={containerRef} id={SectionId.ABOUT} className="py-16 md:py-24 lg:py-32 xl:py-40 bg-black border-t border-brand-border overflow-hidden relative">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Company Description - Full Width with Scroll-Based Word-by-Word Animation */}
        <div className="mb-12 md:mb-16 lg:mb-20 xl:mb-24">
          <M.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.5 }}
            className="text-white font-mono text-xs tracking-[0.2em] uppercase mb-6 md:mb-8 lg:mb-12"
          >
            <span className="text-brand-muted">//</span> About
          </M.h2>
          
          <ScrollWordReveal text={descriptionText} />
        </div>

        {/* Mission & Vision Section */}
        <M.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 md:mt-16 lg:mt-20 xl:mt-24"
        >
          <M.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-white font-mono text-xs tracking-[0.2em] uppercase mb-8 md:mb-12"
          >
            <span className="text-brand-muted">//</span> Mission & Vision
          </M.h2>
          
          <div className="max-w-5xl">
            <FaqAccordion
              data={[
                {
                  id: 1,
                  question: "Mission",
                  answer: "Make production-grade AI accessible and affordable for businesses by building secure, deterministic, and cost-optimized AI infrastructure that actually reduces workload and delivers measurable operational value."
                },
                {
                  id: 2,
                  question: "Vision",
                  answer: "To be the invisible backbone of AI-enabled enterprises, where every team has reliable AI driving smarter decisions, faster execution, and predictable costs."
                },
                {
                  id: 3,
                  question: "Our Approach",
                  answer: "We begin by understanding your business, workflows, and challenges. We identify where AI can genuinely improve efficiency and reduce manual effort. Every system we build integrates smoothly with your existing setup and is designed to be reliable, secure, and cost-optimized."
                },
                {
                  id: 4,
                  question: "Core Values",
                  answer: "We value simplicity over hype and focus on building AI that is practical and dependable. Reliability, security, and cost efficiency guide every decision we make. Our work is always driven by the goal of reducing complexity and workload."
                },
                {
                  id: 5,
                  question: "Our Commitments",
                  answer: "We commit to delivering production-ready AI systems that work consistently. We are transparent in how our systems operate and how data is handled. Above all, we focus on creating long-term value by reducing effort, improving efficiency, and keeping AI sustainable for your business."
                }
              ]}
              timestamp={undefined}
              className="p-0"
            />
          </div>
        </M.div>
      </div>
    </section>
  );
};

export default About;