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
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
  
  if (!apiKey || apiKey.trim() === '') {
    console.warn('OpenAI API key not found. Using fallback responses.');
    console.warn('Available env keys:', Object.keys(import.meta.env));
    // Fallback response if API key is not configured
    return handleFallbackResponse(message);
  }

  try {
    // Build conversation context - include last 20 messages for comprehensive context awareness
    // This allows the AI to understand longer conversations and reference earlier topics
    const recentHistory = conversationHistory.slice(-20);
    
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
        temperature: 1, // Maximum freedom for natural, varied responses
        max_tokens: 800, // Increased significantly to allow for detailed, thoughtful, comprehensive answers
        top_p: 0.95, // Slightly lower for better coherence while maintaining creativity
        frequency_penalty: 0.7, // Higher to strongly reduce repetition and encourage fresh perspectives
        presence_penalty: 0.4, // Higher to encourage exploring diverse topics and angles
        response_format: { type: 'text' } // Ensure natural text responses
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`;
      console.error('OpenAI API error:', errorMessage, errorData);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content?.trim();
    
    if (!content) {
      console.warn('OpenAI API returned empty response');
      throw new Error('Empty response from API');
    }
    
    return content;
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    console.error('Error details:', {
      message: error?.message,
      stack: error?.stack
    });
    
    // Re-throw authentication errors so they can be handled by Chatbot component
    if (error?.message?.includes('401') || error?.message?.includes('403') || error?.message?.includes('Invalid')) {
      throw error;
    }
    
    // Use fallback for other errors
    return handleFallbackResponse(message);
  }
};

// Fallback response handler when API is not available
const handleFallbackResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();

  // Handle contact questions
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('get in touch')) {
    return 'You can reach us at hello@appendlabs.com or fill out our contact form in the contact section of our website.';
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

  // Universal fallback - never say "I don't know"
  return 'AppendLabs helps businesses integrate AI to improve efficiency, scale operations, and reduce complexity. We start by understanding your business and identifying where AI can add real value. Contact us at hello@appendlabs.com or use the #contact form to discuss how we can help with your specific needs.';
};

