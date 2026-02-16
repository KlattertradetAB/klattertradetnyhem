
import { GoogleGenAI } from "@google/genai";

const getAI = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  return new GoogleGenAI({ apiKey });
};

export const getPhilosophicalInsight = async (prompt: string): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Du är en expert på gestaltterapi, fenomenologi och existentialism. Svara på svenska. Ge korta, insiktsfulla och reflekterande svar som hjälper användaren att fördjupa sin förståelse av arbetsbladet. Undvik att ge 'rätta svar', fokusera istället på att stimulera vidare tänkande.",
        temperature: 0.7,
      },
    });
    return response.text || "Kunde inte generera ett svar just nu.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ett fel uppstod vid kontakt med AI-guiden.";
  }
};

export const analyzeReflections = async (answers: Record<string, string>): Promise<string> => {
  const summary = Object.entries(answers)
    .map(([key, value]) => `Fråga ID: ${key}, Svar: ${value}`)
    .join("\n");

  const prompt = `Här är en användares reflektioner från ett arbetsblad om Existentialism och Fenomenologi inom Gestaltterapi:\n\n${summary}\n\nKan du ge en sammanfattande reflektion över deras insikter? Lyft fram teman som frihet, ansvar eller fenomenologisk närvaro om de förekommer. Ge dem en uppmuntrande avslutning.`;

  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-1.5-pro",
      contents: prompt,
      config: {
        systemInstruction: "Du är en varm och professionell gestaltterapeutisk mentor.",
      },
    });
    return response.text || "Ingen analys tillgänglig.";
  } catch (error) {
    return "Kunde inte analysera reflektionerna just nu.";
  }
};
