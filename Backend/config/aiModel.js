import { GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold} from "@google/generative-ai";
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
   export const chatSession = model.startChat({
      generationConfig,
      history: [
       
        
        {
          role: "user",
          parts: [
            {text: "Write a script to generate 30 second video on topic:Interesting historical strory along with AI image prompt  in Realistic format for each scene and give me result in JSON format  with imagePrompt and ContentText as field"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"video_script\": [\n    {\n      \"scene_number\": 1,\n      \"duration\": \"0-5 seconds\",\n      \"imagePrompt\": \"A bustling, ancient Egyptian marketplace at midday. Vendors display pottery, fabrics, and food. People of various classes and attire are interacting, with pyramids visible in the background under a bright sun.\",\n       \"contentText\": \"The year is 1350 BC, in Ancient Egypt. Imagine a world bustling with life...\"\n    },\n     {\n      \"scene_number\": 2,\n       \"duration\": \"5-10 seconds\",\n      \"imagePrompt\": \"A close-up of a young woman, Nefertari, dressed in simple yet elegant attire, discreetly observing a royal scribe writing on papyrus inside a stone structure. A faint glint of sunlight enters through a small window.\",\n      \"contentText\": \"...where secrets were whispered, and knowledge was power. Nefertari, a young woman of humble origins...\"\n    },\n    {\n      \"scene_number\": 3,\n      \"duration\": \"10-15 seconds\",\n      \"imagePrompt\": \"A grand hall inside a pharaoh's palace, with intricate carvings on the walls. Nefertari, now slightly older, is standing before the pharaoh, Akhenaten, engaging in a lively conversation. Golden light illuminates their faces.\",\n      \"contentText\": \"...caught the eye of the Pharaoh himself. She was no ordinary girl. She was a brilliant mind.\"\n    },\n    {\n      \"scene_number\": 4,\n      \"duration\": \"15-20 seconds\",\n       \"imagePrompt\": \"Nefertari and Akhenaten are depicted walking side by side in a serene garden. The atmosphere is tranquil and intimate, bathed in warm afternoon light. They are engaged in a quiet conversation.\",\n      \"contentText\": \"Nefertari became Akhenaten's most trusted advisor, challenging tradition and shaping history with her intellect...\"\n\n    },\n    {\n      \"scene_number\": 5,\n      \"duration\": \"20-25 seconds\",\n     \"imagePrompt\": \"A close-up shot on a papyrus scroll. Text is visible, along with some intricate drawings. The scroll is held by hands with rings. This emphasizes the historical importance of the record.\",\n     \"contentText\":\"...a story largely untold, preserved only in whispers and ancient texts.\"\n    },\n    {\n      \"scene_number\": 6,\n      \"duration\": \"25-30 seconds\",\n      \"imagePrompt\": \"A sweeping shot of the Egyptian landscape, showing the Nile River, pyramids in the distance, and the vast expanse of the desert under a sunset sky. The scene is majestic and peaceful.\",\n      \"contentText\": \"History has so many stories waiting to be rediscovered and shared. What will you find?\"\n    }\n\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
  
