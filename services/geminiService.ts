
import { GoogleGenAI } from "@google/genai";

// Fix: Always use process.env.API_KEY directly as required by guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAECAdvice = async (prompt: string) => {
  try {
    // Fix: Using 'gemini-3-pro-preview' as AEC and BIM consulting qualifies as a complex reasoning/STEM task
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are an expert AEC (Architecture, Engineering, Construction) and BIM (Building Information Modeling) consultant for MODBIM SOLUTION. 
        Provide highly professional, technical, yet accessible advice. 
        Focus on structural integrity, sustainable design, LOD (Level of Development), 4D/5D scheduling, and digital twins. 
        Represent the brand as a leader in modular construction technology and BIM automation.
        Keep responses concise and formatted in Markdown.`,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    // Note: response.text is a property getter, accessing it directly is correct.
    return response.text || "I'm sorry, I couldn't process that request at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The architectural knowledge base is currently offline. Please try again in a few minutes.";
  }
};
