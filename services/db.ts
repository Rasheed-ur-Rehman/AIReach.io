
export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  description: string;
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'admin';
  text: string;
  timestamp: number;
}

const STORAGE_KEYS = {
  INQUIRIES: 'nextdigipro_inquiries',
  CHAT: 'nextdigipro_chat'
};

export const db = {
  saveInquiry: (data: Omit<Inquiry, 'id' | 'timestamp'>) => {
    const inquiries = db.getInquiries();
    const newInquiry = { ...data, id: Math.random().toString(36).substr(2, 9), timestamp: Date.now() };
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify([...inquiries, newInquiry]));
    console.log(`Email notification trigger to: rasheedurrehman71@gmail.com for inquiry:`, newInquiry);
    return newInquiry;
  },
  getInquiries: (): Inquiry[] => {
    const data = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    return data ? JSON.parse(data) : [];
  },
  saveChatMessage: (text: string, sender: 'user' | 'admin' = 'user') => {
    const messages = db.getChatMessages();
    const newMessage = { id: Math.random().toString(36).substr(2, 9), sender, text, timestamp: Date.now() };
    localStorage.setItem(STORAGE_KEYS.CHAT, JSON.stringify([...messages, newMessage]));
    return newMessage;
  },
  getChatMessages: (): ChatMessage[] => {
    const data = localStorage.getItem(STORAGE_KEYS.CHAT);
    return data ? JSON.parse(data) : [];
  },
  deleteMessage: (id: string) => {
    const messages = db.getChatMessages().filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEYS.CHAT, JSON.stringify(messages));
  }
};
