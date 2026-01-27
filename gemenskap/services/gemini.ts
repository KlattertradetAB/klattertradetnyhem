import { ChatMessage } from "../types";

// Access the API key injected by Vite via define/process.env OR from localStorage (Admin override)
const getApiKey = () => {
  return localStorage.getItem('gemini_api_key') || process.env.GEMINI_API_KEY;
};

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export const getAIResponse = async (history: { role: 'user' | 'model'; text: string }[], userPrompt: string, overrideSystemInstruction?: string) => {
  const API_KEY = getApiKey();

  if (!API_KEY) {
    console.error("Missing GEMINI_API_KEY");
    return "Jag har lite tekniska problem just nu (Saknar API-nyckel). Kontrollera inställningarna eller försök igen senare.";
  }

  // Format history for Gemini API
  // Note: Gemini API expects roles "user" and "model".
  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  // Add the current user prompt
  contents.push({
    role: "user",
    parts: [{ text: userPrompt }]
  });

  const body = {
    contents: contents,
    systemInstruction: overrideSystemInstruction ? {
      parts: [{ text: overrideSystemInstruction }]
    } : undefined,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 500,
    }
  };

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API Error:", response.status, errText);
      return null;
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (error) {
    console.error("Network Error calling Gemini:", error);
    return null;
  }
};
