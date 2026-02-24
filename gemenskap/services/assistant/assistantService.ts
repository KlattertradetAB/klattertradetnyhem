import { getAIResponse } from '../gemini';
import { SYSTEM_PROMPTS } from './prompts';

export interface MessageContext {
    role: 'user' | 'model';
    text: string;
}

export const getAssistantResponse = async (history: MessageContext[], userMessage: string) => {
    try {
        const responseText = await getAIResponse(
            history,
            userMessage,
            SYSTEM_PROMPTS.ASSISTANT_MAIN
        );
        return responseText;
    } catch (error) {
        console.error('Error in assistantService:', error);
        return null;
    }
};
