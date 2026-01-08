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
  Sparkles,
  Activity,
  Settings
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
    id: 'operational-intelligence',
    title: 'Operational Intelligence Systems',
    description: 'AI systems that surface insights, automate actions, and continuously optimize how your business runs.',
    icon: Activity,
    tags: ['Business Intelligence', 'Analytics', 'Optimization'],
    detailedDescription: 'Transform raw business data into actionable intelligence. Our Operational Intelligence Systems monitor your operations in real-time, identify bottlenecks, predict issues before they occur, and automatically execute optimizations. These systems learn from your workflows and continuously improve decision-making processes.',
    useCases: [
      'Monitor supply chain performance and automatically reroute shipments when delays are detected',
      'Analyze customer behavior patterns to optimize inventory levels and reduce waste',
      'Detect anomalies in financial transactions and flag potential fraud in real-time',
      'Automate resource allocation based on demand forecasting and capacity planning'
    ],
    keyFeatures: [
      'Real-time monitoring and alerts',
      'Predictive analytics and forecasting',
      'Automated decision-making workflows',
      'Self-learning optimization algorithms'
    ],
  },
  {
    id: 'internal-automation',
    title: 'Internal AI and Automation tools',
    description: 'Custom-built automation tools and AI solutions designed specifically for internal operations and workflows.',
    icon: Settings,
    tags: ['Internal Tools', 'Workflow Automation', 'Custom Solutions'],
    detailedDescription: 'Build custom AI tools tailored to your internal processes. From automated report generation to intelligent document processing, we create solutions that integrate seamlessly with your existing systems and eliminate repetitive manual work.',
    useCases: [
      'Automate invoice processing and expense report approvals with AI validation',
      'Build custom dashboards that aggregate data from multiple systems automatically',
      'Create intelligent routing systems for internal requests and tickets',
      'Develop automated testing and quality assurance tools for your development team'
    ],
    keyFeatures: [
      'Seamless system integration',
      'Custom workflow automation',
      'Intelligent data processing',
      'Role-based access controls'
    ],
  },
  {
    id: 'mcp',
    title: 'MCP Service / Client',
    description: 'Architecting robust Model Context Protocols to bridge your data with Large Language Models securely and efficiently.',
    icon: Database,
    tags: ['Protocol Design', 'Data Bridging', 'LLM Integration'],
    detailedDescription: 'Model Context Protocols (MCP) enable secure, structured communication between your business data and AI models. We design custom protocols that ensure data integrity, maintain context accuracy, and enable reliable AI interactions with your proprietary information.',
    useCases: [
      'Connect customer databases to AI chatbots for personalized, data-driven conversations',
      'Bridge legacy systems with modern AI tools without data migration',
      'Enable secure AI access to sensitive financial or healthcare records',
      'Create context-aware AI assistants that understand your business domain'
    ],
    keyFeatures: [
      'Secure data protocols',
      'Schema validation and enforcement',
      'Real-time context management',
      'Audit trails and compliance'
    ],
  },
  {
    id: 'ai-agents',
    title: 'AI Agents as a Service',
    description: 'Autonomous agents that perform complex tasks, schedule meetings, handle support, and automate workflows 24/7.',
    icon: Bot,
    tags: ['Automation', 'Task Execution', 'Self-Healing'],
    detailedDescription: 'Deploy intelligent autonomous agents that work around the clock handling routine tasks, making decisions, and executing workflows independently. These agents learn from experience, adapt to changes, and self-heal when issues arise, reducing your operational overhead significantly.',
    useCases: [
      'Automated customer support agents that handle 80% of inquiries and escalate complex cases',
      'Smart scheduling agents that coordinate meetings across multiple time zones and preferences',
      'Inventory management agents that automatically reorder stock based on sales predictions',
      'Monitoring agents that detect system issues and automatically initiate remediation procedures'
    ],
    keyFeatures: [
      '24/7 autonomous operation',
      'Self-learning and adaptation',
      'Multi-step task execution',
      'Automatic error recovery'
    ],
  },
  {
    id: 'rag-chatbots',
    title: 'RAG Based Chatbots',
    description: 'Retrieval-Augmented Generation systems that chat with your specific business data with zero hallucinations.',
    icon: MessageSquareCode,
    tags: ['Vector DB', 'Knowledge Base', 'High Accuracy'],
    detailedDescription: 'Build chatbots that understand your business context perfectly. Using Retrieval-Augmented Generation, these systems pull accurate information from your knowledge base, policies, and documentation to provide precise, reliable answers without making things up.',
    useCases: [
      'Customer support chatbots that answer product questions using your catalog and specifications',
      'Internal HR bots that provide accurate policy information and benefits details to employees',
      'Technical support assistants that reference your documentation and troubleshooting guides',
      'Sales assistants that provide accurate pricing and feature information from your product database'
    ],
    keyFeatures: [
      'Zero hallucination guarantee',
      'Instant knowledge base updates',
      'Multi-source information retrieval',
      'Conversation context management'
    ],
  },
  {
    id: 'cloud-dev',
    title: 'Cloud Development',
    description: 'Scalable serverless architectures on AWS, GCP, and Azure designed to support high-throughput AI workloads.',
    icon: Cloud,
    tags: ['AWS/GCP', 'Serverless', 'Microservices'],
    detailedDescription: 'Architect cloud-native solutions that scale automatically with your business needs. We build serverless, event-driven systems optimized for AI workloads, ensuring high performance, cost efficiency, and reliability across major cloud platforms.',
    useCases: [
      'Serverless AI processing pipelines that automatically scale during traffic spikes',
      'Event-driven microservices that process data streams in real-time',
      'Cost-optimized cloud architectures that reduce infrastructure spending by 40%',
      'Multi-region deployments ensuring low latency for global users'
    ],
    keyFeatures: [
      'Auto-scaling infrastructure',
      'Pay-per-use cost model',
      'Multi-cloud deployments',
      'High availability and redundancy'
    ],
  },
  {
    id: 'integration',
    title: 'Omnichannel Integration',
    description: 'Deploy your AI workforce across WhatsApp, Slack, Teams, Telegram, and custom web widgets seamlessly.',
    icon: Globe,
    tags: ['WhatsApp API', 'Slack', 'Teams'],
    detailedDescription: 'Reach your customers and team members wherever they are. Our omnichannel solutions deploy the same AI capabilities across multiple communication platforms, ensuring consistent experiences and unified conversation management.',
    useCases: [
      'Deploy customer support bots on WhatsApp for global reach and instant messaging',
      'Integrate AI assistants into Slack for internal team productivity and quick answers',
      'Enable Microsoft Teams bots for enterprise collaboration and meeting assistance',
      'Create custom web widgets that provide instant help on your website'
    ],
    keyFeatures: [
      'Unified conversation management',
      'Multi-platform deployment',
      'Consistent AI experience',
      'Real-time synchronization'
    ],
  },
];

export interface TechItem {
  keyword: string;
  techName: string;
  description: string;
  useCase: string;
  benefits: string[];
}

export const TECH_STACK: TechItem[] = [
  {
    keyword: "Smart Automation",
    techName: "Gemini 2.0",
    description: "Advanced AI models that understand context and make intelligent decisions for your business processes.",
    useCase: "Use for customer support automation, document analysis, content generation, and intelligent data processing that reduces manual work by up to 80%.",
    benefits: ["Faster response times", "24/7 availability", "Consistent quality", "Scalable operations"]
  },
  {
    keyword: "AI Conversations",
    techName: "OpenAI",
    description: "Natural language AI that can chat with customers, answer questions, and assist with complex tasks using plain English.",
    useCase: "Deploy chatbots for customer service, create virtual assistants for your team, automate email responses, and provide instant answers to common questions.",
    benefits: ["Instant customer support", "Multilingual capability", "Cost-effective scaling", "Learning from interactions"]
  },
  {
    keyword: "Secure AI",
    techName: "Anthropic",
    description: "Enterprise-grade AI designed for sensitive business data with enhanced security and reliability features.",
    useCase: "Perfect for handling confidential information, financial data analysis, compliance reporting, and secure document processing in regulated industries.",
    benefits: ["Enhanced security", "Data privacy", "Compliance-ready", "Enterprise reliability"]
  },
  {
    keyword: "Workflow Builder",
    techName: "LangChain",
    description: "Tools to connect different AI systems together, automating complex multi-step business processes.",
    useCase: "Connect your CRM with AI, automate lead qualification, build approval workflows, and create intelligent data pipelines that save hours of manual work.",
    benefits: ["Process automation", "System integration", "Error reduction", "Workflow efficiency"]
  },
  {
    keyword: "Knowledge Base",
    techName: "Pinecone",
    description: "Searchable database that stores your company knowledge and instantly finds relevant information.",
    useCase: "Store product catalogs, company policies, training materials, and documentation. Employees can instantly find answers without searching through files or asking colleagues.",
    benefits: ["Instant search", "Centralized knowledge", "Always up-to-date", "Accessible anywhere"]
  },
  {
    keyword: "User Interface",
    techName: "React",
    description: "Modern web technology for building fast, responsive user interfaces for your business applications.",
    useCase: "Create dashboards, internal tools, customer portals, and admin panels that work smoothly on any device and provide excellent user experience.",
    benefits: ["Fast performance", "Mobile-friendly", "Easy updates", "Modern design"]
  },
  {
    keyword: "Backend Services",
    techName: "Node.js",
    description: "Server technology that powers your applications, handles data processing, and connects different systems together.",
    useCase: "Build APIs for mobile apps, process transactions, handle file uploads, send notifications, and manage data between different parts of your business software.",
    benefits: ["Fast processing", "Scalable architecture", "Real-time capabilities", "Efficient operations"]
  },
  {
    keyword: "Data Processing",
    techName: "Python",
    description: "Programming language used for analyzing data, automating reports, and building intelligent business tools.",
    useCase: "Generate automated reports, analyze sales data, process spreadsheets, create data visualizations, and build custom automation scripts for your business needs.",
    benefits: ["Data analysis", "Automation scripts", "Report generation", "Custom solutions"]
  },
  {
    keyword: "Cloud Hosting",
    techName: "AWS",
    description: "Reliable cloud infrastructure that hosts your applications, stores data securely, and scales automatically with your business growth.",
    useCase: "Host your website, store customer data securely, run your business applications, backup important files, and ensure your systems stay online 24/7.",
    benefits: ["High reliability", "Automatic scaling", "Secure storage", "Global reach"]
  },
  {
    keyword: "Application Packaging",
    techName: "Docker",
    description: "Technology that packages your software to run consistently across different computers and servers.",
    useCase: "Ensure your applications run the same way on every computer, simplify deployment processes, test software reliably, and make updates easier without breaking existing systems.",
    benefits: ["Consistent deployment", "Easy updates", "Simplified testing", "Isolated environments"]
  }
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