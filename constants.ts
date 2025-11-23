import { 
  Bot, 
  BrainCircuit, 
  Cloud, 
  Code2, 
  Database, 
  Globe, 
  Layers, 
  MessageSquareCode, 
  Rocket, 
  Sparkles 
} from 'lucide-react';
import { SectionId, ServiceItem, NavItem, Testimonial } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: `#${SectionId.HOME}` },
  { label: 'Services', href: `#${SectionId.SERVICES}` },
  { label: 'Process', href: `#${SectionId.PROCESS}` },
  { label: 'About', href: `#${SectionId.ABOUT}` },
  { label: 'Contact', href: `#${SectionId.CONTACT}` },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'mcp',
    title: 'MCP Service / Client',
    description: 'Architecting robust Model Context Protocols to bridge your data with Large Language Models securely and efficiently.',
    icon: Database,
    tags: ['Protocol Design', 'Data Bridging', 'LLM Integration'],
  },
  {
    id: 'ai-agents',
    title: 'AI Agents as a Service',
    description: 'Autonomous agents that perform complex tasks, schedule meetings, handle support, and automate workflows 24/7.',
    icon: Bot,
    tags: ['Automation', 'Task Execution', 'Self-Healing'],
  },
  {
    id: 'rag-chatbots',
    title: 'RAG Based Chatbots',
    description: 'Retrieval-Augmented Generation systems that chat with your specific business data with zero hallucinations.',
    icon: MessageSquareCode,
    tags: ['Vector DB', 'Knowledge Base', 'High Accuracy'],
  },
  {
    id: 'cloud-dev',
    title: 'Cloud Development',
    description: 'Scalable serverless architectures on AWS, GCP, and Azure designed to support high-throughput AI workloads.',
    icon: Cloud,
    tags: ['AWS/GCP', 'Serverless', 'Microservices'],
  },
  {
    id: 'full-stack',
    title: 'Full Stack Web Apps',
    description: 'Modern, reactive web applications built with Next.js, React, and Tailwind, fully integrated with your AI backend.',
    icon: Layers,
    tags: ['React', 'Next.js', 'Enterprise Scale'],
  },
  {
    id: 'integration',
    title: 'Omnichannel Integration',
    description: 'Deploy your AI workforce across WhatsApp, Slack, Teams, Telegram, and custom web widgets seamlessly.',
    icon: Globe,
    tags: ['WhatsApp API', 'Slack', 'Teams'],
  },
];

export const TECH_STACK = [
  "Gemini 2.0", "OpenAI", "Anthropic", "LangChain", "Pinecone", "React", "Node.js", "Python", "AWS", "Docker"
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Alex V.",
    role: "CTO",
    company: "FinTech Nexus",
    content: "AppendLabs didn't just build a chatbot; they architected a compliance-grade reasoning engine. Latency dropped by 400ms and hallucination rates hit zero."
  },
  {
    name: "Sarah Jenkins",
    role: "VP of Operations",
    company: "LogisticsCore",
    content: "The autonomous agents they deployed handle 85% of our dispatch logic now. The ROI was realized in 3 months. Truly military-grade software engineering."
  },
  {
    name: "Marcus Chen",
    role: "Founder",
    company: "HealthData AI",
    content: "Their understanding of Air-Gapped RAG is unmatched. We were able to deploy sensitive patient data models without ever exposing PII to external model providers."
  }
];