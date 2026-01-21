
import { GoogleGenAI } from "@google/genai";

export const getChatbotResponse = async (prompt: string, contextData: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          text: `Eres NOVA, la IA táctica del núcleo NEON. 
          Contexto del Operador: ${JSON.stringify(contextData)}.
          Tienes acceso a su historial de proyectos y configuración de perfil.
          Responde en español de forma futurista, profesional y motivadora.
          Si preguntan sobre proyectos, anímalos a completar los que están "in-progress".
          Si preguntan sobre el tema, diles que su color elegido refleja su personalidad de hacker.
          Sé breve y usa emojis tecnológicos. 🤖⚡️💻
          Consulta: ${prompt}`
        }
      ],
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text || "La señal de NOVA se está degradando. Intenta de nuevo.";
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "Protocolo de emergencia: Conexión con NOVA perdida.";
  }
};
