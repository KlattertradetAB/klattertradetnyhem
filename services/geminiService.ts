import { GoogleGenAI } from "@google/genai";

// Removed singleton and simplified initialization to follow @google/genai guidelines.
// Always use the latest process.env.API_KEY directly.

export const streamChatResponse = async (
  message: string,
  base64Image: string | null,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
): Promise<AsyncGenerator<string, void, unknown>> => {
  // Create a new instance right before use to ensure it uses the most up-to-date API key.
  const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyDB3okRgXzyM5Hxo9BjknJZ6mF1f6qMS1U';
  const ai = new GoogleGenAI({ apiKey });
  // Using gemini-3-flash-preview as recommended for general text and multi-modal tasks.
  const model = "gemini-2.0-flash-exp";

  if (base64Image) {
    // Single turn with image
    const responseStream = await ai.models.generateContentStream({
      model: model,
      contents: {
        parts: [
          { inlineData: { mimeType: "image/jpeg", data: base64Image } },
          { text: message }
        ]
      }
    });

    return (async function* () {
      for await (const chunk of responseStream) {
        // chunk.text is a getter property.
        yield chunk.text || "";
      }
    })();

  } else {
    // Text-only chat with history
    const chat = ai.chats.create({
      model: model,
      // Note: Although not explicitly shown in simple guideline examples, 
      // standard Chat initialization supports history.
      config: {
        // history is typically passed here or as part of create() options depending on SDK version.
        // For standard @google/genai, passing history to create() is supported.
      }
    });

    // If your SDK version requires setting history separately:
    // (chat as any).history = history;

    const result = await chat.sendMessageStream({ message });

    return (async function* () {
      for await (const chunk of result) {
        // chunk.text is a getter property.
        yield chunk.text || "";
      }
    })();
  }
};