
import { GoogleGenAI, Type } from "@google/genai";
import { Vehicle } from "../types";

const API_KEY = process.env.API_KEY;

export const getSmartRecommendation = async (userNeeds: string, vehicles: Vehicle[]): Promise<string> => {
  if (!API_KEY) return "AI assistance is currently unavailable. Please browse our fleet manually.";

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const vehicleList = vehicles.map(v => `${v.make} ${v.model} (${v.type}, ${v.pricePerDay} Birr/day)`).join(", ");
  
  const prompt = `A customer needs a car. Their request is: "${userNeeds}". 
  Our available fleet: [${vehicleList}]. 
  Recommend the best vehicle from our fleet and explain why in a concise, friendly manner. 
  Refer to GashaDrift Car Rental in your tone. Use Birr as the currency in your response.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "I recommend checking our SUV selection for your needs.";
  } catch (error) {
    console.error("AI Error:", error);
    return "Our top pick for you would be the Toyota Land Cruiser for its reliability.";
  }
};
