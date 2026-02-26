import { getAIResponse } from '../gemini';
import { SYSTEM_PROMPTS } from './prompts';
import { AssistantType } from '../../contexts/AssistantContext';

export interface MessageContext {
    role: 'user' | 'model';
    text: string;
}

export const getAssistantResponse = async (history: MessageContext[], userMessage: string, type: AssistantType = 'main') => {
    try {
        let systemPrompt = SYSTEM_PROMPTS.ASSISTANT_MAIN;
        if (type === 'lina') systemPrompt = SYSTEM_PROMPTS.ASSISTANT_LINA;
        if (type === 'erik') systemPrompt = SYSTEM_PROMPTS.ASSISTANT_ERIK;
        if (type === 'amanda') systemPrompt = SYSTEM_PROMPTS.ASSISTANT_AMANDA;
        if (type === 'axel') systemPrompt = SYSTEM_PROMPTS.ASSISTANT_AXEL;

        const responseText = await getAIResponse(
            history,
            userMessage,
            systemPrompt
        );
        return responseText;
    } catch (error) {
        console.error('Error in assistantService:', error);
        return null;
    }
};
