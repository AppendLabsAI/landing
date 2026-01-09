import { SYSTEM_PROMPT, KNOWLEDGE_BASE } from './data';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface OpenAIError {
  error?: {
    message?: string;
    type?: string;
    code?: string;
  };
  message?: string;
}

/**
 * Sends a chat message to OpenAI and returns the assistant's response
 * @param userMessage - The current user message
 * @param conversationHistory - Array of previous messages in the conversation
 * @returns The assistant's response as a string
 */
export async function sendChatMessage(
  userMessage: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<string> {
  // Check if API key is configured
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey || !apiKey.trim()) {
    throw new Error(
      'OpenAI API key is not configured. Please set VITE_OPENAI_API_KEY in your environment variables.'
    );
  }

  // Validate API key format
  const trimmedKey = apiKey.trim();
  if (!trimmedKey.startsWith('sk-')) {
    throw new Error('Invalid OpenAI API key format. API key should start with "sk-".');
  }

  // Build messages array with system prompt and conversation history
  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: SYSTEM_PROMPT
    },
    // Add conversation history (last 20 messages to stay within token limits)
    ...conversationHistory.slice(-20).map(msg => ({
      role: msg.role,
      content: msg.content
    })),
    // Add current user message
    {
      role: 'user',
      content: userMessage
    }
  ];

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${trimmedKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using GPT-4o-mini as specified in the project
        messages: messages,
        temperature: 0.7, // Balanced creativity and consistency
        max_tokens: 1000, // Reasonable response length
        top_p: 1,
        frequency_penalty: 0.1, // Slight penalty to avoid repetition
        presence_penalty: 0.1, // Encourages talking about new topics
      })
    });

    // Handle non-OK responses
    if (!response.ok) {
      let errorMessage = 'Failed to get response from OpenAI';
      let errorDetails: OpenAIError | null = null;

      try {
        errorDetails = await response.json();
      } catch {
        // If JSON parsing fails, use status text
        errorMessage = `OpenAI API error: ${response.status} ${response.statusText}`;
      }

      if (errorDetails?.error) {
        const error = errorDetails.error;
        
        if (response.status === 401 || response.status === 403) {
          throw new Error('Invalid API key. Please check your VITE_OPENAI_API_KEY configuration.');
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment and try again.');
        } else if (response.status === 500) {
          throw new Error('OpenAI server error. Please try again later.');
        } else {
          throw new Error(error.message || errorMessage);
        }
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Extract the assistant's message
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Empty response from OpenAI API');
    }

    const assistantMessage = data.choices[0].message.content;

    if (!assistantMessage || assistantMessage.trim().length === 0) {
      throw new Error('Empty response from OpenAI API');
    }

    return assistantMessage.trim();

  } catch (error: any) {
    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      const networkError = new Error('Network error. Please check your internet connection and try again.');
      (networkError as any).isNetworkError = true;
      throw networkError;
    }

    // Handle timeout errors
    if (error.name === 'AbortError' || error.message?.includes('timeout')) {
      throw new Error('Request timed out. Please try again.');
    }

    // Re-throw known errors
    if (error.message) {
      throw error;
    }

    // Unknown error
    throw new Error('An unexpected error occurred. Please try again.');
  }
}

