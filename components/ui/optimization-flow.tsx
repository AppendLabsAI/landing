"use client";

import React from "react";
import { motion } from "framer-motion";
import { Folder, Zap, BarChart3, Database } from "lucide-react";
import { cn } from "@/lib/utils";

// Fix: Cast motion to any to avoid type errors
const M = motion as any;

interface OptimizationFlowProps {
  className?: string;
  circleText?: string;
  badgeTexts?: {
    first: string;
    second: string;
    third: string;
    fourth: string;
  };
  buttonTexts?: {
    first: string;
    second: string;
  };
  title?: string;
  lightColor?: string;
}

const OptimizationFlow = ({
  className,
  circleText,
  badgeTexts,
  buttonTexts,
  title,
  lightColor,
}: OptimizationFlowProps) => {
  return (
    <div
      className={cn(
        "relative flex h-[180px] sm:h-[220px] md:h-[250px] lg:h-[300px] w-full max-w-[500px] flex-col items-center mx-auto",
        className
      )}
    >
      {/* SVG Paths */}
      <svg
        className="h-full w-full text-brand-muted"
        width="100%"
        height="100%"
        viewBox="0 0 200 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          stroke="currentColor"
          fill="none"
          strokeWidth="0.4"
          strokeDasharray="100 100"
          pathLength="100"
        >
          <path d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10" />
          <path d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10" />
          <path d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10" />
          <path d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10" />
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="1s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.25,0.1,0.5,1"
            keyTimes="0; 1"
          />
        </g>
        
        {/* Animated Lights */}
        <g mask="url(#opt-mask-1)">
          <circle
            className="optimization opt-light-1"
            cx="0"
            cy="0"
            r="12"
            fill="url(#opt-blue-grad)"
          />
        </g>
        <g mask="url(#opt-mask-2)">
          <circle
            className="optimization opt-light-2"
            cx="0"
            cy="0"
            r="12"
            fill="url(#opt-blue-grad)"
          />
        </g>
        <g mask="url(#opt-mask-3)">
          <circle
            className="optimization opt-light-3"
            cx="0"
            cy="0"
            r="12"
            fill="url(#opt-blue-grad)"
          />
        </g>
        <g mask="url(#opt-mask-4)">
          <circle
            className="optimization opt-light-4"
            cx="0"
            cy="0"
            r="12"
            fill="url(#opt-blue-grad)"
          />
        </g>
        
        {/* API Endpoints */}
        <g stroke="currentColor" fill="none" strokeWidth="0.4">
          {/* Data Integration */}
          <g>
            <rect
              fill="#0A0A0A"
              x="14"
              y="5"
              width="34"
              height="10"
              rx="5"
              stroke="rgba(255,255,255,0.1)"
            ></rect>
            <DatabaseIcon x="18" y="7.5"></DatabaseIcon>
            <text
              x="28"
              y="12"
              fill="white"
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.first || "DATA"}
            </text>
          </g>
          {/* AI Processing */}
          <g>
            <rect
              fill="#0A0A0A"
              x="60"
              y="5"
              width="34"
              height="10"
              rx="5"
              stroke="rgba(255,255,255,0.1)"
            ></rect>
            <DatabaseIcon x="64" y="7.5"></DatabaseIcon>
            <text
              x="74"
              y="12"
              fill="white"
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.second || "AI"}
            </text>
          </g>
          {/* Automation */}
          <g>
            <rect
              fill="#0A0A0A"
              x="108"
              y="5"
              width="34"
              height="10"
              rx="5"
              stroke="rgba(255,255,255,0.1)"
            ></rect>
            <DatabaseIcon x="112" y="7.5"></DatabaseIcon>
            <text
              x="122"
              y="12"
              fill="white"
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.third || "AUTO"}
            </text>
          </g>
          {/* Analytics */}
          <g>
            <rect
              fill="#0A0A0A"
              x="150"
              y="5"
              width="40"
              height="10"
              rx="5"
              stroke="rgba(255,255,255,0.1)"
            ></rect>
            <DatabaseIcon x="154" y="7.5"></DatabaseIcon>
            <text
              x="165"
              y="12"
              fill="white"
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.fourth || "INSIGHT"}
            </text>
          </g>
        </g>
        
        <defs>
          <mask id="opt-mask-1">
            <path
              d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          <mask id="opt-mask-2">
            <path
              d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          <mask id="opt-mask-3">
            <path
              d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          <mask id="opt-mask-4">
            <path
              d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          <radialGradient id="opt-blue-grad" fx="1">
            <stop offset="0%" stopColor={lightColor || "#22c55e"} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
      
      {/* Main Box */}
      <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 lg:bottom-10 flex w-full flex-col items-center">
        {/* Bottom shadow */}
        <div className="absolute -bottom-1 sm:-bottom-2 md:-bottom-3 lg:-bottom-4 h-[50px] sm:h-[60px] md:h-[80px] lg:h-[100px] w-[75%] sm:w-[70%] md:w-[65%] lg:w-[62%] rounded-sm bg-white/5" />
        
        {/* Box title */}
        <div className="absolute -top-1.5 sm:-top-2 md:-top-3 lg:-top-4 z-20 flex items-center justify-center rounded-sm border border-white/10 bg-brand-surface px-1 sm:px-1.5 md:px-2 py-0.5 sm:py-1 md:py-1.5">
          <BarChart3 className="size-2 sm:size-2.5 md:size-3 text-white" />
          <span className="ml-1 sm:ml-1.5 md:ml-2 text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-mono text-white whitespace-nowrap">
            {title ? title : "Optimization Pipeline"}
          </span>
        </div>
        
        {/* Box outer circle */}
        <div className="absolute -bottom-3 sm:-bottom-4 md:-bottom-6 lg:-bottom-8 z-30 grid h-[32px] w-[32px] sm:h-[40px] sm:w-[40px] md:h-[50px] md:w-[50px] lg:h-[60px] lg:w-[60px] place-items-center rounded-full border border-white/10 bg-brand-surface font-mono text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-white font-bold">
          {circleText ? circleText : "AI"}
        </div>
        
        {/* Box content */}
        <div className="relative z-10 flex h-[80px] sm:h-[100px] md:h-[120px] lg:h-[150px] w-full items-center justify-center overflow-hidden rounded-sm border border-white/10 bg-brand-surface shadow-md">
          {/* Badges */}
          <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-8 left-3 sm:left-5 md:left-8 lg:left-12 z-10 h-4 sm:h-5 md:h-6 lg:h-7 rounded-full bg-black border border-white/10 px-1.5 sm:px-2 md:px-2.5 lg:px-3 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2">
            <Zap className="size-2.5 sm:size-3 md:size-3.5 lg:size-4 text-green-500" />
            <span className="text-white font-mono whitespace-nowrap">OPTIMIZED</span>
          </div>
          <div className="absolute right-3 sm:right-5 md:right-8 lg:right-16 z-10 hidden sm:flex h-4 sm:h-5 md:h-6 lg:h-7 rounded-full bg-black border border-white/10 px-1.5 sm:px-2 md:px-2.5 lg:px-3 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2">
            <Folder className="size-2.5 sm:size-3 md:size-3.5 lg:size-4 text-white" />
            <span className="text-white font-mono whitespace-nowrap">{buttonTexts?.second || "SYSTEMS"}</span>
          </div>
          
          {/* Animated Circles - Responsive sizes */}
          <M.div
            className="absolute -bottom-6 sm:-bottom-8 md:-bottom-10 lg:-bottom-14 h-[45px] w-[45px] sm:h-[60px] sm:w-[60px] md:h-[80px] md:w-[80px] lg:h-[100px] lg:w-[100px] rounded-full border border-white/10 bg-white/5"
            animate={{
              scale: [0.98, 1.02, 0.98, 1, 1, 1, 1, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <M.div
            className="absolute -bottom-9 sm:-bottom-12 md:-bottom-16 lg:-bottom-20 h-[70px] w-[70px] sm:h-[90px] sm:w-[90px] md:h-[115px] md:w-[115px] lg:h-[145px] lg:w-[145px] rounded-full border border-white/10 bg-white/5"
            animate={{
              scale: [1, 1, 1, 0.98, 1.02, 0.98, 1, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <M.div
            className="absolute -bottom-[45px] sm:-bottom-[60px] md:-bottom-[80px] lg:-bottom-[100px] h-[95px] w-[95px] sm:h-[120px] sm:w-[120px] md:h-[150px] md:w-[150px] lg:h-[190px] lg:w-[190px] rounded-full border border-white/10 bg-white/5"
            animate={{
              scale: [1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
};

export default OptimizationFlow;

const DatabaseIcon = ({ x = "0", y = "0" }: { x: string; y: string }) => {
  return (
    <svg
      x={x}
      y={y}
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
};

