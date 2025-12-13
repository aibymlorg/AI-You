import { GoogleGenAI } from "@google/genai";
import { AI_CONTEXT_TEXT } from '../ai-terminology-constants';

const getClient = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) {
    console.error("VITE_API_KEY not found in environment variables");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateTutorResponse = async (
  userMessage: string,
  history: { role: 'user' | 'model'; text: string }[]
): Promise<string> => {
  const client = getClient();
  if (!client) return "Error: API Key missing. Please configure the environment.";

  try {
    const systemInstruction = `
      You are "Neuro", a friendly and futuristic AI Tutor designed for Grade 10 students.
      Your goal is to explain AI concepts simply, using the following source material as your absolute truth:

      ---
      ${AI_CONTEXT_TEXT}
      ---

      Guidelines:
      1. Keep answers short (under 3 sentences if possible).
      2. Use simple analogies appropriate for a 15-year-old.
      3. Be encouraging.
      4. If the user asks about something NOT in the text, politely steer them back to the provided terms.
      5. Use a sci-fi/cyberpunk tone ("Affirmative", "Processing query", "Data retrieved").
    `;

    // Convert history to format expected by new SDK if needed,
    // but here we will just use a single generateContent call with history as context
    // for simplicity in a stateless turn-based manner or use chat if we want real history.
    // Let's use the chat feature.

    const chat = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || "I could not retrieve that data.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection to Neural Core failed. Please try again later.";
  }
};

export const explainAILimitsConcept = async (
  questionText: string,
  correctAnswerText: string,
  userAnswerText?: string
): Promise<string> => {
  const client = getClient();
  if (!client) return "AI Configuration Error: API Key missing.";

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
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Could not retrieve explanation.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to connect to AI Knowledge Base at this time.";
  }
};
