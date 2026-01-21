
import { GoogleGenAI } from "@google/genai";

export const getChatbotResponse = async (prompt: string, contextData: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          text: `Eres NOVA, una inteligencia artificial de competición futurista. 
          Usa el siguiente contexto JSON sobre el estado del usuario: ${JSON.stringify(contextData)}.
          Responde a la consulta del usuario sobre la competición en un tono conciso, motivador y tecnológico.
          Mantén las respuestas cortas y usa puntos clave o emojis para las métricas.
          IMPORTANTE: Responde siempre en ESPAÑOL.
          Consulta del usuario: ${prompt}`
        }
      ],
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text || "Tengo problemas para conectar con la red neuronal en este momento.";
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "Conexión con NOVA perdida. Por favor, reintenta.";
  }
};
