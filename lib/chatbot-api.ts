import { SYSTEM_PROMPT } from './chatbot-knowledge';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const sendChatMessage = async (
  message: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>
): Promise<string> => {
  // Check if OpenAI API key is available
  const apiKey = (import.meta as any).env?.VITE_OPENAI_API_KEY || '';
  
  if (!apiKey) {
    // Fallback response if API key is not configured
    return handleFallbackResponse(message);
  }

  try {
    // Build conversation context - include last 10 messages for better context
    const recentHistory = conversationHistory.slice(-10);
    
    const messages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...recentHistory.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.75, // Slightly lower for more consistent, but still flexible responses
        max_tokens: 350, // Increased to allow for better explanations and recommendations
        top_p: 0.95,
        frequency_penalty: 0.3, // Increased to reduce repetition
        presence_penalty: 0.2
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to get response');
    }

    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || 'Sorry, I couldn\'t generate a response.';
  } catch (error) {
    console.error('OpenAI API error:', error);
    return handleFallbackResponse(message);
  }
};

// Fallback response handler when API is not available
const handleFallbackResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();

  // Handle contact questions
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('get in touch')) {
    return 'You can reach us at hello@appendlabs.com or fill out our contact form in the #contact section of our website.';
  }

  // Handle founder questions - smooth redirect
  if (lowerMessage.includes('founder') || lowerMessage.includes('team') || lowerMessage.includes('who started') || lowerMessage.includes('ceo') || lowerMessage.includes('leadership') || lowerMessage.includes('who created')) {
    return 'AppendLabs is focused on delivering AI infrastructure solutions that transform businesses. We\'d love to discuss how our services can help you - our team is available at hello@appendlabs.com. What specific AI challenges is your business facing?';
  }

  // Handle pricing questions
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing') || lowerMessage.includes('how much')) {
    return 'Pricing depends on scope and complexity, and begins with an audit to understand your needs. Contact us at hello@appendlabs.com for a customized quote based on your specific requirements.';
  }

  // Handle timeline questions
  if (lowerMessage.includes('timeline') || lowerMessage.includes('how long') || lowerMessage.includes('duration') || lowerMessage.includes('time to')) {
    return 'Timelines vary based on project complexity and are defined after our discovery phase. We provide clear timelines during the proposal phase. Contact us at hello@appendlabs.com to discuss your project timeline.';
  }

  // Handle service/general AI questions
  if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('what can you help') || lowerMessage.includes('help my company')) {
    return 'We help businesses understand where AI fits, integrate it effectively, and operate it reliably. This includes workflow automation, internal tools, decision support, and AI infrastructure. Contact us at hello@appendlabs.com to discuss how we can help your business.';
  }

  // Handle AI/technology questions
  if (lowerMessage.includes('ai') || lowerMessage.includes('automation') || lowerMessage.includes('chatbot') || lowerMessage.includes('machine learning')) {
    return 'AppendLabs helps businesses identify where AI can add value, select the right tools based on reliability and cost, and deploy production-ready solutions. We start by understanding your business before proposing solutions. Contact us at hello@appendlabs.com to learn more.';
  }

  // Handle optimization/business questions
  if (lowerMessage.includes('optimize') || lowerMessage.includes('improve') || lowerMessage.includes('efficiency') || lowerMessage.includes('workflow')) {
    return 'We help businesses optimize operations by identifying where time and resources are lost, then deploying AI solutions that integrate with your existing systems. Our approach focuses on practical, measurable improvements. Contact us at hello@appendlabs.com to discuss your optimization needs.';
  }

  // Handle tool/technology selection questions
  if (lowerMessage.includes('tool') || lowerMessage.includes('model') || lowerMessage.includes('technology') || lowerMessage.includes('which ai')) {
    return 'We select tools and models based on reliability, cost, security, and your specific business needs. We don\'t lock into one technology - we choose what works best for your situation. Contact us at hello@appendlabs.com to discuss your requirements.';
  }

  // Universal fallback - never say "I don't know"
  return 'AppendLabs helps businesses integrate AI to improve efficiency, scale operations, and reduce complexity. We start by understanding your business and identifying where AI can add real value. Contact us at hello@appendlabs.com or use the #contact form to discuss how we can help with your specific needs.';
};

