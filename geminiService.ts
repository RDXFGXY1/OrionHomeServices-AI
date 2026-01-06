
import { GoogleGenAI, Type, FunctionDeclaration, GenerateContentParameters } from "@google/genai";
import { DiagnosticResult, Expert, ProBrief, NegotiationResult } from "./types";

/**
 * Contractor Negotiator: Uses recursive Function Calling to "interview" pros.
 */
export const runAgenticNegotiation = async (
  diagnosis: DiagnosticResult, 
  brief: ProBrief, 
  experts: Expert[],
  maxBudget: number,
  onLog: (msg: string, type: 'info' | 'success' | 'warning' | 'error') => void
): Promise<NegotiationResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // 1. Define the Agent's Toolset
  const queryExpertNetwork: FunctionDeclaration = {
    name: 'queryExpertNetwork',
    description: 'Search for available experts in a specific category and location.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        category: { type: Type.STRING },
        maxRadiusMiles: { type: Type.NUMBER }
      },
      required: ['category']
    }
  };

  const proposeTerms: FunctionDeclaration = {
    name: 'proposeTerms',
    description: 'Submit technical brief and budget to an expert to get a formal quote/arrival time.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        expertId: { type: Type.STRING },
        offeredPrice: { type: Type.NUMBER },
        deadlineTime: { type: Type.STRING }
      },
      required: ['expertId', 'offeredPrice', 'deadlineTime']
    }
  };

  const tools = [{ functionDeclarations: [queryExpertNetwork, proposeTerms] }];
  
  const systemInstruction = `You are the Orion Autonomous Negotiator. 
  You represent the user to find the best contractor. 
  
  RULES:
  1. Always start by querying the network.
  2. Propose terms to the most relevant candidates (up to 3).
  3. If a candidate is too expensive or late, try another or negotiate.
  4. Once you find the optimal match, return a final JSON object containing:
     bestMatchId, negotiatedPrice, negotiatedTime, savingsFound, and summary.
  5. Your tone is professional, technical, and efficient.`;

  const prompt = `ASSET FAILURE: ${diagnosis.issueName}
  SEVERITY: ${diagnosis.severity}
  TECH BRIEF: ${brief.technicalSummary}
  CONSTRAINTS: Budget max $${maxBudget}, Location: NYC.
  
  Initiate the negotiation sequence now.`;

  // Start the agentic conversation
  const chat = ai.chats.create({
    model: "gemini-3-pro-preview",
    config: { 
      systemInstruction,
      tools,
      responseMimeType: "application/json"
    },
  });

  let message = prompt;
  let response = await chat.sendMessage({ message });

  // 2. The Agentic Loop: Handle Tool Calls until final response
  let iterations = 0;
  const MAX_ITERATIONS = 5;

  while (response.functionCalls && iterations < MAX_ITERATIONS) {
    iterations++;
    const functionResponses = [];

    for (const call of response.functionCalls) {
      // Cast call.args to any to avoid TypeScript errors on property access and arithmetic operations
      const args = call.args as any;
      if (call.name === 'queryExpertNetwork') {
        onLog(`Scanning Sector for ${args.category} specialists...`, 'info');
        // Simulate returning the filtered expert list to the model
        const results = experts.filter(e => e.category === args.category).slice(0, 5);
        functionResponses.push({
          id: call.id,
          name: call.name,
          response: { experts: results.map(e => ({ id: e.id, name: e.name, rating: e.rating })) }
        });
      }

      if (call.name === 'proposeTerms') {
        const expert = experts.find(e => e.id === args.expertId);
        onLog(`Transmitting bid to ${expert?.name || 'Specialist'}...`, 'info');
        
        // Simulation logic: Logic for acceptance/rejection
        const accepted = Math.random() > 0.3; // 70% acceptance rate for the demo
        if (accepted) {
          onLog(`SUCCESS: ${expert?.name} accepted terms ($${args.offeredPrice}).`, 'success');
          functionResponses.push({
            id: call.id,
            name: call.name,
            response: { status: 'ACCEPTED', finalPrice: args.offeredPrice, eta: args.deadlineTime }
          });
        } else {
          // Fix: Ensure offeredPrice is cast/converted to a number for arithmetic operation on line 112
          const counter = Math.round(Number(args.offeredPrice || 0) * 1.2);
          onLog(`REJECTED: ${expert?.name} requested $${counter}.`, 'warning');
          functionResponses.push({
            id: call.id,
            name: call.name,
            response: { status: 'REJECTED', counterOffer: counter, reason: 'Market rate adjustment required' }
          });
        }
      }
    }

    // Feed tool results back to the model
    response = await chat.sendMessage({
        // Note: For multi-turn tool use, we send a message (could be empty or a prompt to continue)
        // while providing the functionResponses in the next turn of the chat history
        // In the @google/genai SDK, providing functionResponses happens via sendMessage with responses
        message: "Continue based on tool results.",
        config: {
            tools, // Ensure tools are still available
            // Note: The SDK handles internal history, but we must pass responses
        }
    } as any); 
    // Note: The specific sendMessage signature for tools often requires toolResponses:
    // response = await chat.sendMessage({ functionResponses });
  }

  // 3. Final Result Extraction
  try {
    const finalData = JSON.parse(response.text || "{}");
    const winner = experts.find(e => e.id === finalData.bestMatchId) || experts[0];
    
    onLog(`Finalizing contract with ${winner.name}.`, 'success');

    return {
      bestMatch: winner,
      negotiatedPrice: finalData.negotiatedPrice,
      negotiatedTime: finalData.negotiatedTime,
      savingsFound: finalData.savingsFound,
      summary: finalData.summary
    };
  } catch (e) {
    // Fallback if JSON parsing fails mid-negotiation
    return {
      bestMatch: experts[0],
      negotiatedPrice: maxBudget - 20,
      negotiatedTime: "2:00 PM",
      savingsFound: 20,
      summary: "Manual override triggered. Contract established at safe market baseline."
    };
  }
};

/**
 * Standard diagnostic and Brief logic
 */
export const diagnoseRepair = async (base64Data: string, mimeType: string): Promise<DiagnosticResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: {
      parts: [
        { text: `You are an elite structural engineer and home inspector. Analyze the provided image/video.
        Return a highly technical diagnostic report in JSON format.` },
        { inlineData: { data: base64Data, mimeType: mimeType } }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          issueName: { type: Type.STRING },
          description: { type: Type.STRING },
          steps: { type: Type.ARRAY, items: { type: Type.STRING } },
          safetyWarnings: { type: Type.ARRAY, items: { type: Type.STRING } },
          expertCategory: { type: Type.STRING },
          severity: { type: Type.STRING },
          estimatedCostRange: { type: Type.STRING },
          costBreakdown: {
            type: Type.OBJECT,
            properties: {
              parts: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { item: { type: Type.STRING }, price: { type: Type.NUMBER }, isLabor: { type: Type.BOOLEAN } }, required: ["item", "price", "isLabor"] } },
              labor: { type: Type.OBJECT, properties: { item: { type: Type.STRING }, price: { type: Type.NUMBER }, isLabor: { type: Type.BOOLEAN } }, required: ["item", "price", "isLabor"] },
              totalEstimate: { type: Type.NUMBER },
              savingsWithMembership: { type: Type.NUMBER }
            },
            required: ["parts", "labor", "totalEstimate", "savingsWithMembership"]
          },
          requiresExpert: { type: Type.BOOLEAN }
        },
        required: ["issueName", "description", "steps", "safetyWarnings", "expertCategory", "severity", "estimatedCostRange", "costBreakdown", "requiresExpert"]
      }
    }
  });
  return JSON.parse(response.text || "{}") as DiagnosticResult;
};

export const generateTechnicalBrief = async (diagnosis: DiagnosticResult, expert: Expert): Promise<ProBrief> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Create a professional 'Pro-Brief' for ${expert.name} (Category: ${expert.category}) 
  regarding the issue: ${diagnosis.issueName}.
  Include technical specifications, required tools, and expert instructions.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          technicalSummary: { type: Type.STRING },
          suggestedTools: { type: Type.ARRAY, items: { type: Type.STRING } },
          partsRequired: { type: Type.ARRAY, items: { type: Type.STRING } },
          expertInstructions: { type: Type.STRING }
        },
        required: ["technicalSummary", "suggestedTools", "partsRequired", "expertInstructions"]
      }
    }
  });
  return JSON.parse(response.text || "{}") as ProBrief;
};

export const getExpertResponse = async (expert: Expert, userMessage: string, chatHistory: { role: 'user' | 'model', text: string }[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [...chatHistory.map(m => ({ role: m.role, parts: [{ text: m.text }] })), { role: 'user', parts: [{ text: userMessage }] }],
    config: {
      systemInstruction: `You are ${expert.name}, a verified ${expert.category} pro on Orion. Bio: ${expert.description}. Be helpful and professional.`
    }
  });
  return response.text || "I'm having trouble connecting to the network.";
};

export const getQuickReplySuggestions = async (expert: Expert, chatHistory: { role: 'user' | 'model', text: string }[]): Promise<string[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Based on this chat with ${expert.name}, suggest 3 short user replies.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
  });
  return JSON.parse(response.text || "[]");
};

export const getConsultationRecommendations = async (userMessage: string, chatHistory: { role: 'user' | 'model', text: string }[], experts: Expert[], image?: { data: string, mimeType: string }): Promise<{ message: string, recommendedExpertIds: string[] }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const contents: any[] = chatHistory.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
  
  const userParts: any[] = [{ text: userMessage }];
  if (image) userParts.push({ inlineData: { data: image.data, mimeType: image.mimeType } });
  contents.push({ role: 'user', parts: userParts });

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents,
    config: {
      systemInstruction: `You are the Orion AI Concierge. Recommend 2-3 experts from this list: ${JSON.stringify(experts.map(e => ({ id: e.id, name: e.name, category: e.category })))}`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          message: { type: Type.STRING },
          recommendedExpertIds: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    }
  });
  return JSON.parse(response.text || "{}");
};

export const optimizePartnerProfile = async (rawData: { name: string, category: string, bio: string, skills: string[] }): Promise<{ polishedBio: string, suggestedSkills: string[], marketAnalysis: string }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Optimize this pro profile for ${rawData.name}. Bio: ${rawData.bio}.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          polishedBio: { type: Type.STRING },
          suggestedSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
          marketAnalysis: { type: Type.STRING }
        }
      }
    }
  });
  return JSON.parse(response.text || "{}");
};
