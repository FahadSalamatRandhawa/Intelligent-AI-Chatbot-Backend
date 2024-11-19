export const CONSTANTS={
    API_URL:"http://localhost:8000"
}

// conversation.model.ts

export interface Message {
    role: 'user' | 'ai';
    content: string;
  }
  
export interface Conversation {
    _id: string;
    user_id: string;
    conversation_on: string;
    messages: Message[];
  }
  