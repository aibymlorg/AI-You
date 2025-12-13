import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is missing from environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const explainConcept = async (questionText: string, correctAnswerText: string, userAnswerText?: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "AI Configuration Error: API Key missing.";

  const prompt = `
    You are a friendly and cool AI Tutor for high school students.
    
    The student is playing a game about "The Limits of AI".
    
    Question: "${questionText}"
    Correct Answer: "${correctAnswerText}"
    ${userAnswerText ? `The student wrongly picked: "${userAnswerText}"` : 'The student got it right!'}

    Task: Explain the concept simply and clearly in 2-3 sentences.
    If they were wrong, gently explain why the correct answer is better.
    If they were right, give a fun fact related to it.
    Avoid jargon. Keep it conversational.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Could not retrieve explanation.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to connect to AI Knowledge Base at this time.";
  }
};
