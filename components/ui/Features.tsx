'use client'
import React, { useMemo } from 'react';
import { Activity, Map as MapIcon, MessageCircle, Globe } from 'lucide-react'
import DottedMap from 'dotted-map'
import { Area, AreaChart, CartesianGrid } from 'recharts'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { motion } from 'framer-motion';

// Fix: Cast motion to any to avoid type errors with IntrinsicAttributes
const M = motion as any;

export function Features() {
    // Memoize map to prevent recreation on re-render
    const mapInstance = useMemo(() => {
        return new DottedMap({ height: 55, grid: 'diagonal' })
    }, []);
    
    const mapPoints = useMemo(() => mapInstance.getPoints(), [mapInstance]);

    return (
        <section className="py-16 md:py-24 lg:py-32 xl:py-40 bg-black border-t border-brand-border relative z-10 overflow-hidden">
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid border border-white/10 md:grid-cols-2 bg-brand-surface">
                    
                    {/* Global Infrastructure Tracking */}
                    <M.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="p-6 sm:p-12">
                            <span className="text-brand-muted flex items-center gap-2 font-mono text-xs uppercase tracking-widest mb-4">
                                <Globe className="size-4" />
                                Global Infrastructure
                            </span>

                            <p className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white leading-tight">
                                Distributed AI systems deployed worldwide. Monitor all your agents in real-time.
                            </p>
                        </div>

                        <div aria-hidden="true" className="relative h-[300px] md:h-[400px] overflow-hidden bg-black">
                            {/* Map Badge Overlay */}
                            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                                <M.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="rounded-sm bg-black relative z-[1] flex items-center gap-2 border border-white/10 px-4 py-2 text-xs font-mono text-white shadow-lg"
                                >
                                    <span className="text-lg">🇮🇳</span>
                                    <span>Active node in Bengaluru, India</span>
                                </M.div>
                            </div>

                            {/* Map Background with Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-[1]"></div>
                            <MapComponent points={mapPoints} />
                        </div>
                    </M.div>

                    {/* Support & Communication */}
                    <M.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="overflow-hidden border-t border-white/10 bg-brand-surface p-6 sm:p-12 md:border-0 md:border-l md:border-white/10"
                    >
                        <div className="relative z-10">
                            <span className="text-brand-muted flex items-center gap-2 font-mono text-xs uppercase tracking-widest mb-4">
                                <MessageCircle className="size-4" />
                                Support Channel
                            </span>

                            <p className="mb-6 md:mb-8 text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white leading-tight">
                                24/7 support via email or secure web portal for all your AI infrastructure needs.
                            </p>
                        </div>
                        
                        <div aria-hidden="true" className="flex flex-col gap-4">
                            <M.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="flex justify-center items-center size-5 rounded-full border border-white/10">
                                        <span className="size-3 rounded-full bg-green-500 animate-pulse"/>
                                    </span>
                                    <span className="text-brand-muted text-xs font-mono uppercase tracking-wider">Wed 15 Jan, 09:32</span>
                                </div>
                                <div className="rounded-sm bg-black w-3/5 border border-white/10 p-3 text-xs text-white font-mono">
                                    Agent deployment inquiry - need to scale RAG system for production workload
                                </div>
                            </M.div>

                            <M.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                                className="flex flex-col items-end"
                            >
                                <div className="rounded-sm mb-1 w-3/5 bg-white p-3 text-xs text-black font-mono font-medium">
                                    Assessing your current infrastructure. Preliminary analysis shows 3 integration points. Ready to proceed with deployment plan?
                                </div>
                                <span className="text-brand-muted text-xs font-mono uppercase tracking-wider">Wed 15 Jan, 09:45</span>
                            </M.div>

                            <M.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="flex justify-center items-center size-5 rounded-full border border-white/10">
                                        <span className="size-3 rounded-full bg-green-500 animate-pulse"/>
                                    </span>
                                    <span className="text-brand-muted text-xs font-mono uppercase tracking-wider">Wed 15 Jan, 10:12</span>
                                </div>
                                <div className="rounded-sm bg-black w-3/5 border border-white/10 p-3 text-xs text-white font-mono">
                                    Yes, proceed. Also need help optimizing cost per API call
                                </div>
                            </M.div>

                            <M.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
                                className="flex flex-col items-end"
                            >
                                <div className="rounded-sm mb-1 w-3/5 bg-white p-3 text-xs text-black font-mono font-medium">
                                    Deployment initiated. Implementing cost optimization layer. Systems operational. All agents reporting healthy status. Monitoring dashboard ready.
                                </div>
                                <span className="text-brand-muted text-xs font-mono uppercase tracking-wider">Wed 15 Jan, 11:03</span>
                            </M.div>

                            <M.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="flex justify-center items-center size-5 rounded-full border border-white/10">
                                        <span className="size-3 rounded-full bg-green-500 animate-pulse"/>
                                    </span>
                                    <span className="text-brand-muted text-xs font-mono uppercase tracking-wider">Wed 15 Jan, 11:15</span>
                                </div>
                                <div className="rounded-sm bg-black w-3/5 border border-white/10 p-3 text-xs text-white font-mono">
                                    Perfect. Latency reduced by 40%. Cost savings look promising. Thanks!
                                </div>
                            </M.div>
                        </div>
                    </M.div>

                    {/* Uptime Display */}
                    <M.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="col-span-full border-y border-white/10 p-12 bg-black"
                    >
                        <p className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-black text-white tracking-tighter">
                            99.99% Uptime
                        </p>
                        <p className="text-center text-brand-muted mt-4 font-mono text-xs uppercase tracking-widest">
                            Enterprise-Grade Reliability
                        </p>
                    </M.div>

                    {/* Activity Monitoring Chart */}
                    <M.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative col-span-full"
                    >
                        <div className="absolute z-10 max-w-lg px-6 pr-12 pt-6 md:px-12 md:pt-12">
                            <span className="text-brand-muted flex items-center gap-2 font-mono text-xs uppercase tracking-widest mb-4">
                                <Activity className="size-4" />
                                Activity Feed
                            </span>

                            <p className="my-6 md:my-8 text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white leading-tight">
                                Monitor your application's activity in real-time.{' '}
                                <span className="text-brand-muted"> Instantly identify and resolve issues.</span>
                            </p>
                        </div>
                        <MonitoringChart />
                    </M.div>
                </div>
            </div>
        </section>
    )
}

// Memoized Map Component
const MapComponent = React.memo(({ points }: { points: Array<{ x: number; y: number }> }) => {
    const viewBox = `0 0 120 60`
    return (
        <svg 
            viewBox={viewBox} 
            className="w-full h-full"
            style={{ background: '#0A0A0A' }}
            preserveAspectRatio="none"
        >
            {points.map((point, index) => (
                <circle 
                    key={index} 
                    cx={point.x} 
                    cy={point.y} 
                    r={0.15} 
                    fill="#FFFFFF" 
                    opacity={0.2}
                />
            ))}
        </svg>
    )
})
MapComponent.displayName = 'MapComponent'

const chartConfig = {
    requests: {
        label: 'API Requests',
        color: '#ffffff',
    },
    agents: {
        label: 'Active Agents',
        color: '#666666',
    },
} satisfies ChartConfig

const chartData = [
    { month: 'May', requests: 856, agents: 224 },
    { month: 'June', requests: 956, agents: 324 },
    { month: 'January', requests: 1226, agents: 452 },
    { month: 'February', requests: 1805, agents: 610 },
    { month: 'March', requests: 2200, agents: 726 },
    { month: 'April', requests: 3400, agents: 980 },
]

const MonitoringChart = () => {
    return (
        <ChartContainer className="h-[400px] md:h-[500px] aspect-auto" config={chartConfig}>
            <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 0,
                    right: 0,
                    top: 60,
                    bottom: 0,
                }}>
                <defs>
                    <linearGradient id="fillRequests" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-requests)" stopOpacity={0.8} />
                        <stop offset="55%" stopColor="var(--color-requests)" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="fillAgents" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-agents)" stopOpacity={0.8} />
                        <stop offset="55%" stopColor="var(--color-agents)" stopOpacity={0.1} />
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <ChartTooltip active cursor={false} content={<ChartTooltipContent className="dark:bg-black border-white/10" />} />
                <Area strokeWidth={2} dataKey="agents" type="monotone" fill="url(#fillAgents)" fillOpacity={0.1} stroke="var(--color-agents)" stackId="a" />
                <Area strokeWidth={2} dataKey="requests" type="monotone" fill="url(#fillRequests)" fillOpacity={0.1} stroke="var(--color-requests)" stackId="a" />
            </AreaChart>
        </ChartContainer>
    )
}
