import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
    role: 'user' | 'model';
    text: string;
    timestamp: Date;
}

interface AssistantContextType {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    messages: Message[];
    addMessage: (message: Message) => void;
    clearMessages: () => void;
}

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

export const AssistantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const addMessage = (message: Message) => {
        setMessages((prev) => [...prev, message]);
    };

    const clearMessages = () => {
        setMessages([]);
    };

    return (
        <AssistantContext.Provider value={{ isOpen, setIsOpen, messages, addMessage, clearMessages }}>
            {children}
        </AssistantContext.Provider>
    );
};

export const useAssistant = () => {
    const context = useContext(AssistantContext);
    if (context === undefined) {
        throw new Error('useAssistant must be used within an AssistantProvider');
    }
    return context;
};
