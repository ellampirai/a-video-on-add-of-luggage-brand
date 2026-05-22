import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini SDK with custom User-Agent for AI Studio telemetry
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Primary backend API endpoint for generating a custom, high-engagement Reel script
  app.post("/api/generate", async (req, res) => {
    try {
      const { vibe, targetAudience, soundtrackName, customAngle } = req.body;

      const systemPrompt = `You are an elite luxury commercial brand director and viral fashion marketing strategist.
Your task is to programmatically generate a cinematic, high-impact 30-second vertical social media Reel concept featuring the premium "Rare Rabbit Gallardo Suitcase".
The Rare Rabbit Gallardo Suitcase is a masterclass in modern luxury travel—crafted from high-grade aluminum/polycarbonate, featuring rugged yet ultra-sleek metallic ribbed lines, precision dual-latch tsa locks, noiseless silent glider spinner wheels, and minimal prestige branding.

Your generated storyboard MUST consist of EXACTLY 4 sequential scenes mapping the standard 30-second user retention curve:
1. Scene 1 (0s - 5s): The Scroll-Stopping hook. High visual intensity, intriguing action, supreme typography trigger.
2. Scene 2 (5s - 15s): The Product Detail close-up. Highlighting premium features (the dual industrial latches, the ribbed premium texture, the whisper-silent wheels).
3. Scene 3 (15s - 25s): The Lifestyle & Prestige statement. Elevating it from a container to an arrival statement. Modern architectural metropolises, high fashion transitions.
4. Scene 4 (25s - 30s): The Power Call-to-Action. Driving immense desire, urgency, and premium exclusivity.

Tailor the style, captions, and narrative to the selected creative vibe ("${vibe}"), target audience ("${targetAudience}"), and chosen background tempo ("${soundtrackName}"). 
Additional brand angle/notes: "${customAngle || "None provided"}".`;

      const instructions = "Generate the screenplay in the specified high-fidelity JSON format, optimize for micro-editing and maximum user retention. Do not add markdown backticks outside of the pure JSON content.";

      const schema = {
        type: Type.OBJECT,
        properties: {
          viralityScore: {
            type: Type.NUMBER,
            description: "Predicted engagement score (1 to 100) based on hook index and emotional pacing"
          },
          viralityReason: {
            type: Type.STRING,
            description: "A short professional analysis of why this specific script will perform exceptionally well on Instagram/TikTok"
          },
          editingHacks: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3 highly actionable pro-editing hacks to maximize watch time (e.g., speed ramping, sound design sync)"
          },
          scenes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                timeRange: { type: Type.STRING, description: "Range in seconds (e.g. '0s - 5s')" },
                title: { type: Type.STRING, description: "Action/Shot identifier" },
                visualAction: { type: Type.STRING, description: "Cinematic camera movement and direction" },
                caption: { type: Type.STRING, description: "On-screen high-impact bold minimalist uppercase copy" },
                voiceover: { type: Type.STRING, description: "Punchy, charismatic narration with tonal marks" },
                soundEffect: { type: Type.STRING, description: "Auditory beats, sound design cues, or bass drops" }
              },
              required: ["timeRange", "title", "visualAction", "caption", "voiceover", "soundEffect"]
            },
            description: "Exactly 4 consecutive scenes detailing the 30-second Reel"
          }
        },
        required: ["viralityScore", "viralityReason", "editingHacks", "scenes"]
      };

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `${systemPrompt}\n\n${instructions}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
          temperature: 1.0,
        }
      });

      const parsedData = JSON.parse(response.text || "{}");
      res.json(parsedData);
    } catch (error: any) {
      console.error("Gemini script generation failed:", error);
      res.status(500).json({
        error: "Failed to generate cinematic script",
        details: error?.message || error
      });
    }
  });

  // Configure Vite as development middleware or serve build output
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Start full-stack Node server on Port 3000
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully started running on port http://localhost:${PORT}`);
  });
}

// Handle asynchronous execution to bypass CommonJS top-level await esbuild transpilation limits
startServer().catch((err) => {
  console.error("Critical error starting Express fullstack server:", err);
});
