
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getChatbotResponse = async (prompt: string, contextData: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          role: 'user',
          parts: [
            { text: `Actúa como NOVA, un asistente táctico futurista. Contexto del usuario: ${JSON.stringify(contextData)}. Mensaje del usuario: ${prompt}` }
          ]
        }
      ],
      config: {
        systemInstruction: "Eres NOVA, una IA de soporte técnico para una arena competitiva neón. Responde de forma concisa y futurista.",
        temperature: 0.7,
      }
    });

    return response.text || "No se pudo sincronizar con el núcleo de procesamiento.";
  } catch (error) {
    console.error("Gemini SDK Error:", error);
    return "Error de enlace neuronal. Reintenta la conexión.";
  }
};
