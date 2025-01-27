import { ElevenLabsClient } from 'elevenlabs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const apiKey = 'sk_55dfa4788fba9f36b3f4d16cf6eca97cca4773cf2ae0ff2e';
const client = new ElevenLabsClient({ apiKey });

// Get the current directory path in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const convertTextToSpeech = async (req, res) => {
  const { text, voice_id, output_format, model_id } = req.body;

  if (!text || !voice_id) {
    return res.status(400).json({ error: "Text and voice_id are required" });
  }

  try {
    // Convert text to speech
    const response = await client.textToSpeech.convert(voice_id, {
      output_format: output_format || "mp3_44100_128",
      text,
      model_id: model_id || "eleven_multilingual_v2"
    });

    // Save the audio file to a temporary path
    const filePath = path.join(__dirname, 'output_audio.mp3');
    const fileStream = fs.createWriteStream(filePath);

    // Pipe the audio data to the file
    response.pipe(fileStream);

    // Wait for the file to be saved
    fileStream.on('finish', () => {
      // console.log(`Audio file saved at ${filePath}`);

      // Return the file to the frontend
      res.sendFile(filePath, (err) => {
        if (err) {
          console.error("Error sending file:", err);
          res.status(500).json({ error: "Failed to send the audio file" });
        } else {
          // Clean up the file after sending
          fs.unlinkSync(filePath);
        }
      });
    });
  } catch (error) {
    console.error("Error converting text to speech:", error);
    res.status(500).json({ error: "Failed to convert text to speech" });
  }
};

