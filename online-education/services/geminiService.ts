
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY environment variable not set.");
}
const ai = new GoogleGenAI({ apiKey });

export async function generateCourseSummary(courseText: string): Promise<string> {
  try {
    const prompt = `
    Based on the following information about the "Behandlingsassistent" course, generate a short, engaging, and professional summary in Swedish.
    The summary should be about 3-4 sentences long and highlight the key benefits for a potential student.
    Do not use markdown.

    Course Information:
    ---
    ${courseText}
    ---
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 1,
        topK: 32,
        maxOutputTokens: 200,
      },
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating summary with Gemini API:", error);
    throw new Error("Failed to communicate with the AI service.");
  }
}
