import React, { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const ShortVidGen = () => {
  const [videoScript, setVideoScript] = useState([]);
  const [script, setScript] = useState("");
  const [audioData, setAudioData] = useState(null);

  const formdata = {
    content: "Historical Facts",
    duration: '30 second',
    style: 'cartoon'
  };

  const GetVideoScript = async () => {
    try {
      const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/aivideo/get-video-script`, {
        prompt: `Write a script to generate ${formdata.duration} video on topic:${formdata.content} along with AI image prompt in ${formdata.style} format for each scene and give me result in JSON format with imagePrompt and ContentText as field`
      });

      // Set the videoScript state
      const videoScriptData = result.data.result.video_script;
      setVideoScript(videoScriptData);

      // Generate the script from videoScript
      let combinedScript = "";
      if (Array.isArray(videoScriptData)) {
        videoScriptData.forEach(element => {
          combinedScript += element.contentText; // Concatenate ContentText
        });
      }

      // Set the generated script
      setScript(combinedScript);
    } catch (error) {
      console.error("Error fetching video script:", error);
    }
  };

  const handleConvert = async () => {
    const response = await fetch('http://localhost:3000/api/aivideo/text-to-speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: script,  // Send the generated script as text
        voice_id: 'JBFqnCBsd6RMkjVDRZzb',  // Example voice ID
        output_format: 'mp3_44100_128',
        model_id: 'eleven_multilingual_v2',
      }),
    });

    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    setAudioData(audioUrl);  // Save the audio URL in state
    
    // Optionally, you can auto-play the audio if needed
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <div>
      <div className="flex flex-col items-center mx-auto w-full mt-3"><Loader2 className="animate-spin"/><h1 className="text-2xl font-bold">ShortPage is under Construction...🥹</h1></div>
      <button onClick={GetVideoScript} className="bg-blue-500 text-white p-2 mt-2 rounded">
        Generate Video Script
      </button>

      <div>
        <h3>Generated Script:</h3> 
        <p>{script}</p>
      </div>

      {script && (
        <button
          onClick={handleConvert}
          className="bg-green-500 text-white p-2 mt-2 rounded"
        >
          Convert to Speech
        </button>
      )}

      {audioData && (
        <div className="audio-player mt-4">
          <audio controls src={audioData}></audio>
        </div>
      )}
    </div>
  );
};

export default ShortVidGen;
