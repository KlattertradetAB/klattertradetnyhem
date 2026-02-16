import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult, LanguageCode } from '../types';
import { getTranslatedQuestions } from '../constants';

const getAI = () => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  if (!API_KEY) {
    console.error("API_KEY environment variable not set");
    throw new Error("API_KEY environment variable not set");
  }
  return new GoogleGenAI({ apiKey: API_KEY });
};

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
    secondaryWound: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        score: { type: Type.NUMBER },
        description: { type: Type.STRING },
        code: { type: Type.STRING },
      },
      required: ['name', 'score', 'description', 'code'],
    },
    emotionalState: {
      type: Type.OBJECT,
      properties: {
        state: { type: Type.STRING, enum: ['Regulated', 'Compensated', 'Overwhelmed'] },
        score: { type: Type.NUMBER },
        description: { type: Type.STRING },
      },
      required: ['state', 'score', 'description'],
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
  required: ['primaryWound', 'secondaryWound', 'emotionalState', 'secondaryWounds', 'summary', 'allScores'],
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
    2.  Identify the **Primary Wound** (highest score) and the **Secondary Wound** (second highest score).
    3.  Analyze the user's **Emotional State** based on the overall pattern of answers. Classify them into one of three states:
        *   **Regulated**: Generally lower scores, balanced responses, indicates stability.
        *   **Compensated**: Mixed scores, some high but manageable, indicates coping mechanisms are active.
        *   **Overwhelmed**: Consistently high scores across multiple wounds, indicates distress.
        Assign a score to this state (0-100) reflecting the intensity of this state (e.g., how overwhelmed they are).
    4.  Generate short descriptions for the wounds and the emotional state in ${languageNames[lang]}.
    5.  Write a summary analysis in ${languageNames[lang]}.
    6.  Structure response as JSON matching the schema. include ALL 6 wounds in 'allScores'.

    Return ONLY JSON.
  `;

  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
      },
    });

    console.log("Gemini Raw Response:", response);

    let jsonText = '';
    const rawResponse = response as any;
    // Check if response.text is a function (SDK v0.2.0+) or property
    if (typeof rawResponse.text === 'function') {
      jsonText = rawResponse.text();
    } else if (typeof rawResponse.text === 'string') {
      jsonText = rawResponse.text;
    } else if (response.candidates && response.candidates.length > 0) {
      // Manual fallback extraction
      const part = response.candidates[0].content?.parts?.[0];
      if (part && 'text' in part) {
        jsonText = part.text as string;
      }
    }

    console.log("Gemini JSON Text:", jsonText);

    if (!jsonText) {
      throw new Error("Empty response from AI");
    }

    const result = JSON.parse(jsonText.trim()) as AnalysisResult;

    // Validate result structure
    if (!result.allScores || !Array.isArray(result.allScores)) {
      console.error("Invalid AI response structure:", result);
      throw new Error("Invalid AI response structure: " + JSON.stringify(result));
    }

    result.allScores.forEach(s => s.score = Math.round(s.score));
    result.primaryWound.score = Math.round(result.primaryWound.score);
    if (result.secondaryWound) result.secondaryWound.score = Math.round(result.secondaryWound.score);
    if (result.emotionalState) result.emotionalState.score = Math.round(result.emotionalState.score);
    result.secondaryWounds.forEach(s => s.score = Math.round(s.score));

    return result;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    // Rethrow with more context if possible
    if (error instanceof Error) {
      throw new Error(`Failed to analyze answers: ${error.message}`);
    }
    throw new Error("Failed to get analysis from Gemini API.");
  }
};

import { supabase } from '../../gemenskap/services/supabase';

export const saveSurveyResponse = async (email: string | null, answers: number[], result: AnalysisResult) => {
  try {
    const { error } = await supabase
      .from('survey_responses')
      .insert([
        {
          email,
          answers,
          scores: result, // Saving the full result object including emotionalState and secondaryWound
          created_at: new Date().toISOString(),
        }
      ]);

    if (error) {
      console.error('Error saving survey response:', error);
      // We don't throw here to avoid disrupting the user experience if saving fails
    } else {
      console.log('Survey response saved successfully');
    }
  } catch (err) {
    console.error('Unexpected error saving survey response:', err);
  }
};

export const getSurveyStatistics = async () => {
  try {
    const { data, error } = await supabase
      .from('survey_responses')
      .select('scores');

    if (error) throw error;

    // Aggregate scores
    const woundCounts: Record<string, number> = {};
    const secondaryWoundCounts: Record<string, number> = {};
    const emotionalStateCounts: Record<string, number> = {};
    const totalResponses = data.length;

    console.log(`Fetching stats. Total rows: ${totalResponses}`);
    let legacyCount = 0;
    let newFormatCount = 0;

    data.forEach((response: any) => {
      const result = response.scores; // This is now the full AnalysisResult object (or old array)

      // Handle legacy data (array) vs new data (object)
      if (Array.isArray(result)) {
        legacyCount++;
        // Legacy format: array of wounds
        const sorted = [...result].sort((a: any, b: any) => b.score - a.score);
        if (sorted.length > 0) {
          const primaryCode = sorted[0].code || sorted[0].name;
          woundCounts[primaryCode] = (woundCounts[primaryCode] || 0) + 1;
        }
      } else if (result && typeof result === 'object') {
        newFormatCount++;
        // New format: AnalysisResult object

        // Primary Wound
        if (result.primaryWound) {
          const code = result.primaryWound.code || result.primaryWound.name;
          if (code) {
            woundCounts[code] = (woundCounts[code] || 0) + 1;
          } else {
            console.warn("Missing code/name in primaryWound:", result.primaryWound);
          }
        }

        // Secondary Wound
        if (result.secondaryWound) {
          const code = result.secondaryWound.code || result.secondaryWound.name;
          secondaryWoundCounts[code] = (secondaryWoundCounts[code] || 0) + 1;
        }

        // Emotional State
        if (result.emotionalState) {
          const state = result.emotionalState.state;
          emotionalStateCounts[state] = (emotionalStateCounts[state] || 0) + 1;
        }
      } else {
        console.warn("Unknown scores format:", result);
      }
    });

    console.log(`Stats aggregation complete. Legacy: ${legacyCount}, New: ${newFormatCount}`);
    console.log("Wound Counts:", woundCounts);
    console.log("Secondary Counts:", secondaryWoundCounts);
    console.log("Emotional State Counts:", emotionalStateCounts);

    return {
      totalResponses,
      woundCounts,
      secondaryWoundCounts,
      emotionalStateCounts,
      legacyCount,
      newFormatCount
    };

  } catch (error) {
    console.error('Error fetching survey statistics:', error);
    return { totalResponses: 0, woundCounts: {}, secondaryWoundCounts: {}, emotionalStateCounts: {} };
  }
};
