import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Safe guard if no API key is present in environment (for mockup purposes)
const isConfigured = !!apiKey;

export const getAIRecommendations = async (userQuery: string, context: string): Promise<string> => {
  if (!isConfigured) {
    return "AI Service Unavailable: Please configure API_KEY.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a smart TV assistant.
      User Profile Context: ${context}
      User Query: "${userQuery}"

      Suggest 3 items to watch based on general knowledge of movies and TV shows.
      Format the output as a simple list. Keep descriptions brief (under 20 words).`,
    });
    
    return response.text || "I couldn't find any recommendations right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the recommendation engine.";
  }
};