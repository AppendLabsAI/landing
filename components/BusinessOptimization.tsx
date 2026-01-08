"use client"

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CardContent } from "@/components/ui/card";
import { Sparkles, Folder, TrendingUp, Zap, BarChart3, Database, BrainCircuit, BarChart } from "lucide-react";
import OptimizationFlow from "./ui/optimization-flow";

// Fix: Cast motion to any to avoid type errors
const M = motion as any;

// Workflow Step Icon Component
const WorkflowStepIcon: React.FC<{ id: string; Icon: any }> = ({ id, Icon }) => {
  const strokeColor = "currentColor";
  
  if (id === 'data-integration') {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <M.path
          d="M12 3V21"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />
        <M.rect
          x="4"
          y="6"
          width="16"
          height="4"
          rx="2"
          stroke={strokeColor}
          strokeWidth="1.5"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <M.rect
          x="4"
          y="14"
          width="16"
          height="4"
          rx="2"
          stroke={strokeColor}
          strokeWidth="1.5"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse" }}
        />
      </svg>
    );
  }
  
  if (id === 'ai-processing') {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <M.circle
          cx="12"
          cy="12"
          r="3"
          stroke={strokeColor}
          strokeWidth="1.5"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <M.path
          d="M12 1V3M12 21V23M23 12H21M3 12H1M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "12px 12px" }}
        />
      </svg>
    );
  }
  
  if (id === 'automation') {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <M.path
          d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ 
            filter: [
              "drop-shadow(0 0 2px currentColor)",
              "drop-shadow(0 0 8px currentColor)",
              "drop-shadow(0 0 2px currentColor)"
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </svg>
    );
  }
  
  if (id === 'analytics') {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <M.path
          d="M3 20L10 13L14 17L21 10"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
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
  }
  
  return <Icon className="w-full h-full" />;
};

const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-white/10 text-white px-1 py-0.5 border border-white/20",
        className
      )}
    >
      {children}
    </span>
  );
};

const BENEFITS = [
  {
    id: 0,
    name: "Operational Load Reduction",
    metric: "85%",
    content: (
      <p>
        Reduce manual workloads by <Highlight>85%</Highlight> through intelligent automation that handles routine tasks, leaving your team to focus on strategic decisions.
      </p>
    ),
  },
  {
    id: 1,
    name: "Decision Speed",
    metric: "3x faster",
    content: (
      <p>
        Surface actionable insights <Highlight>3x faster</Highlight> with real-time analytics and AI-powered recommendations that accelerate your decision-making process.
      </p>
    ),
  },
  {
    id: 2,
    name: "Cost Optimization",
    metric: "40% savings",
    content: (
      <p>
        Optimize operational costs by up to <Highlight>40%</Highlight> through intelligent resource allocation and automated workflow optimization.
      </p>
    ),
  },
];

const WORKFLOW_STEPS = [
  {
    name: "Data Integration",
    desc: "Seamlessly connect with your existing systems and data sources",
    icon: Database,
    id: 'data-integration',
  },
  {
    name: "AI Processing",
    desc: "Advanced models analyze and optimize your workflows in real-time",
    icon: BrainCircuit,
    id: 'ai-processing',
  },
  {
    name: "Automation",
    desc: "Automated actions execute based on intelligent decision-making",
    icon: Zap,
    id: 'automation',
  },
  {
    name: "Analytics",
    desc: "Continuous monitoring and insights for ongoing optimization",
    icon: BarChart,
    id: 'analytics',
  }
];

let interval: any;

type BenefitCard = {
  id: number;
  name: string;
  metric: string;
  content: React.ReactNode;
};

const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: BenefitCard[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<BenefitCard[]>(items);

  useEffect(() => {
    startFlipping();
    return () => clearInterval(interval);
  }, []);

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: BenefitCard[]) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="relative mx-auto h-40 sm:h-44 md:h-48 w-full md:w-96 my-4">
      {cards.map((card, index) => {
        return (
          <M.div
            key={card.id}
            className="absolute bg-brand-surface h-40 sm:h-44 md:h-48 w-full md:w-96 rounded-sm p-3 sm:p-4 shadow-xl border border-white/10 flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
          >
            <div className="font-sans text-xs sm:text-sm text-white leading-relaxed">
              {card.content}
            </div>
            <div>
              <p className="text-white font-heading font-bold text-base sm:text-lg">
                {card.metric}
              </p>
              <p className="text-brand-muted font-mono text-[10px] sm:text-xs uppercase tracking-wider">
                {card.name}
              </p>
            </div>
          </M.div>
        );
      })}
    </div>
  );
};

export default function BusinessOptimization() {
  return (
    <section className="py-16 md:py-24 lg:py-32 xl:py-40 bg-black border-t border-brand-border relative z-10 overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-16 lg:mb-20 xl:mb-24 border-b border-brand-border pb-8 md:pb-10 lg:pb-12">
          <div className="text-left w-full md:w-auto">
            <h2 className="text-white font-mono text-xs tracking-[0.2em] uppercase mb-3 md:mb-4">
              <span className="text-brand-muted">//</span> Custom Systems
            </h2>
            <h3 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-none tracking-tighter">
              BUSINESS<br/>OPTIMIZATION
            </h3>
          </div>
          <p className="text-brand-muted max-w-sm mt-6 md:mt-0 font-mono text-[10px] sm:text-xs leading-relaxed uppercase tracking-wide text-left md:text-right">
            Tailored Solutions<br/>
            Workflow Automation<br/>
            Cost Reduction
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 relative gap-6 md:gap-1">
          
          {/* Left Block - Benefits Stack */}
          <M.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start justify-center border border-white/10 bg-brand-surface p-4 sm:p-6 lg:p-8"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-x-0 -bottom-2 h-16 sm:h-20 lg:h-24 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>
            
            {/* Card Stack */}
            <div className="relative w-full mb-4 sm:mb-6 z-0">
              <CardStack items={BENEFITS} />
            </div>

            {/* Content */}
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-heading font-bold text-white leading-tight mt-3 sm:mt-4">
              Custom Business Optimization Systems
            </h3>
            <p className="text-brand-muted text-[11px] sm:text-xs md:text-sm lg:text-base leading-relaxed mt-3 sm:mt-4 max-w-lg">
              We design and build custom AI-driven systems tailored to your workflows, from internal tools to full automation pipelines, focused on reducing operational load, improving decision speed, and optimizing costs.
            </p>
          </M.div>

          {/* Right Block - How It Works */}
          <M.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center justify-start border border-white/10 bg-brand-surface p-4 sm:p-6 lg:p-8"
          >
            <div className="relative z-10 w-full">
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-heading font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
                How It Works
              </h3>
              <p className="text-brand-muted text-[11px] sm:text-xs md:text-sm lg:text-base mb-4 sm:mb-6 md:mb-8 leading-relaxed">
                Our systems integrate seamlessly with your existing infrastructure, using intelligent automation to optimize operations across your entire organization.
              </p>
              
              {/* Workflow Visualization - Optimized for all devices */}
              <div className="w-full mb-6 lg:mb-8">
                <OptimizationFlow />
              </div>

              {/* Integration List - Optimized for mobile */}
              <CardContent className="p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3 md:space-y-4 bg-black border border-white/10 rounded-sm z-10 w-full">
                {WORKFLOW_STEPS.map((item, i) => (
                  <M.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center justify-between p-2 sm:p-3 border border-white/10 rounded-sm hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 p-1.5 sm:p-2 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-brand-muted group-hover:bg-white group-hover:text-black transition-all duration-500 flex-shrink-0">
                        <WorkflowStepIcon id={item.id} Icon={item.icon} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm md:text-base font-heading font-bold text-white">{item.name}</p>
                        <p className="text-[10px] sm:text-xs text-brand-muted mt-0.5 sm:mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </M.div>
                ))}
              </CardContent>
            </div>
          </M.div>

        </div>
        
        {/* Stats Section */}
        <M.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 md:mt-16 lg:mt-20 xl:mt-24 grid gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16 border-t border-brand-border pt-8 md:pt-10 lg:pt-12"
        >
          <div className="flex justify-center items-center p-4 sm:p-6">
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full text-center">
              <div className="space-y-1 sm:space-y-2 md:space-y-3">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-black text-white">85%</div>
                <p className="text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-wider text-brand-muted">Load Reduction</p>
              </div>
              <div className="space-y-1 sm:space-y-2 md:space-y-3">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-black text-white">3x</div>
                <p className="text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-wider text-brand-muted">Faster Decisions</p>
              </div>
              <div className="space-y-1 sm:space-y-2 md:space-y-3">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-black text-white">40%</div>
                <p className="text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-wider text-brand-muted">Cost Savings</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <blockquote className="border-l-2 border-white/20 pl-4 sm:pl-6 md:pl-8 text-brand-muted">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                "AppendLabs built a custom optimization system that reduced our operational overhead by 85%. The intelligent automation handles complex workflows we didn't think could be automated."
              </p>
              <div className="mt-4 sm:mt-6 space-y-1 sm:space-y-2">
                <cite className="block font-heading font-bold text-white text-sm sm:text-base">Sarah Chen</cite>
                <p className="text-[10px] sm:text-xs text-brand-muted font-mono uppercase tracking-wider">VP of Operations, TechCorp</p>
              </div>
            </blockquote>
          </div>
        </M.div>

      </div>
    </section>
  )
}

