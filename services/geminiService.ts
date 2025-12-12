import { GoogleGenAI, Type } from "@google/genai";
import { MachineClass, ClassSample } from "../teachable-machine-types";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

const MODEL_NAME = 'gemini-2.0-flash-exp';

/**
 * "Trains" the model by asking Gemini to describe the visual commonalities
 * of the provided samples for a specific class.
 */
export const trainClassDescription = async (
  className: string,
  samples: ClassSample[]
): Promise<string> => {
  if (samples.length === 0) return "";

  // We take up to 5 samples to avoid payload limits
  const selectedSamples = samples.slice(0, 5).map(s => {
    // Extract mime type from data URL (e.g. data:image/jpeg;base64,...)
    const matches = s.dataUrl.match(/^data:([^;]+);base64,(.+)$/);
    const mimeType = matches ? matches[1] : 'image/jpeg';
    const data = matches ? matches[2] : '';

    return {
      inlineData: {
        mimeType,
        data
      }
    };
  });

  const prompt = `
    You are a machine learning model trainer.
    Analyze these samples (which may include images and short video clips) which all belong to the class "${className}".
    Identify the key visual features that define this class (e.g., specific colors, shapes, objects, gestures, facial expressions, or movements).
    Provide a concise, dense, 2-sentence description of what visually constitutes the class "${className}".
    Do not mention the background if it's inconsistent. Focus on the subject and action.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          ...selectedSamples,
          { text: prompt }
        ]
      }
    });
    return response.text || "No description generated.";
  } catch (error) {
    console.error("Training error:", error);
    return `Error training class ${className}`;
  }
};

/**
 * Classifies a new image based on the "trained" descriptions.
 */
export const classifyImage = async (
  imageSrc: string,
  classes: MachineClass[]
): Promise<{ classId: string; confidence: number }> => {

  const activeClasses = classes.filter(c => c.samples.length > 0 && c.description);

  if (activeClasses.length === 0) {
    return { classId: "unknown", confidence: 0 };
  }

  const base64Data = imageSrc.split(',')[1];

  const classDescriptions = activeClasses.map(c => `- Class "${c.name}" (ID: ${c.id}): ${c.description}`).join('\n');

  const prompt = `
    You are a real-time image classifier.
    Here are the classes you know:
    ${classDescriptions}

    Analyze the provided image.
    Which of the above classes does this image best belong to?

    Return a JSON object with:
    - "classId": The ID of the matching class.
    - "confidence": A number between 0 and 1 indicating certainty.

    If it doesn't match any strongly, return the closest one but with low confidence.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          { inlineData: { mimeType: "image/jpeg", data: base64Data } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            classId: { type: Type.STRING },
            confidence: { type: Type.NUMBER }
          },
          required: ["classId", "confidence"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response");
    const result = JSON.parse(text);
    return result;

  } catch (error) {
    console.error("Inference error:", error);
    return { classId: "unknown", confidence: 0 };
  }
};
