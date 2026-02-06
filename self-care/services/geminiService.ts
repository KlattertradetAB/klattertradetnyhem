import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult, LanguageCode } from '../types';
import { getTranslatedQuestions } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    primaryWound: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        score: { type: Type.NUMBER },
        description: { type: Type.STRING },
        code: { type: Type.STRING },
      },
      required: ['name', 'score', 'description', 'code'],
    },
    secondaryWounds: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          score: { type: Type.NUMBER },
          description: { type: Type.STRING },
          code: { type: Type.STRING },
        },
        required: ['name', 'score', 'description', 'code'],
      },
    },
    allScores: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          score: { type: Type.NUMBER },
          description: { type: Type.STRING },
          code: { type: Type.STRING },
        },
        required: ['name', 'score', 'description', 'code'],
      },
    },
    summary: {
      type: Type.STRING,
    },
  },
  required: ['primaryWound', 'secondaryWounds', 'summary', 'allScores'],
};

const languageNames: Record<LanguageCode, string> = {
  sv: 'Swedish',
  en: 'English',
  ar: 'Arabic',
  fi: 'Finnish',
  es: 'Spanish',
  de: 'German',
};

export const analyzeAnswers = async (scores: number[], lang: LanguageCode): Promise<AnalysisResult> => {
  const quizQuestions = getTranslatedQuestions(lang);
  const formattedAnswers = quizQuestions.map((q, i) =>
    `Question ${q.id} (${q.category}): Score ${scores[i].toFixed(2)}`
  ).join('\n');

  const categoryMap = new Map<string, string>();
  quizQuestions.forEach(q => {
    if (!categoryMap.has(q.categoryCode)) {
      categoryMap.set(q.categoryCode, q.category);
    }
  });
  const categoryList = Array.from(categoryMap.entries())
    .map(([code, name]) => `${name} (${code})`)
    .join(', ');

  const prompt = `
    Analyze the following survey responses about core emotional wounds. The response MUST be in ${languageNames[lang]}.

    The survey consists of 18 questions, divided into 6 categories with 3 questions each.
    The categories are: ${categoryList}.
    The answer options have score values of 0, 3.33 (10/3), and 6.67 (20/3), where 6.67 indicates the strongest identification with the wound.

    The user's scores:
    ${formattedAnswers}

    Your task:
    1.  Calculate the total score for each category (the wound) by summing the scores for the three associated questions. Each category will have a score between 0 and 20. Round the score to an integer in the result.
    2.  Identify the primary wound (the one with the highest score). If there is a tie, choose one of them as primary.
    3.  Identify the secondary wounds (those with the next highest scores or other high scores).
    4.  Generate a short, supportive, and insightful description for each wound in ${languageNames[lang]}. Ensure the description for each of the 6 wounds is returned in the 'allScores' array.
    5.  Write a summary analysis in ${languageNames[lang]}. The tone should be empathetic and constructive.
    6.  Structure your entire response as a JSON object that follows the provided schema. Ensure you include ALL 6 wounds in the 'allScores' array, sorted from highest to lowest score. The 'name' property for each wound MUST be in ${languageNames[lang]}.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text?.trim() || '{}';
    const result = JSON.parse(jsonText) as AnalysisResult;
    result.allScores.forEach(s => s.score = Math.round(s.score));
    result.primaryWound.score = Math.round(result.primaryWound.score);
    result.secondaryWounds.forEach(s => s.score = Math.round(s.score));

    return result;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to get analysis from Gemini API.");
  }
};
