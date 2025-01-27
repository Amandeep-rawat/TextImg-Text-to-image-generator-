import React, { useState } from "react";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [audioData, setAudioData] = useState(null);

  const handleConvert = async () => {
    const response = await fetch('http://localhost:3000/api/aivideo/text-to-speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,  // Use the text input from the user
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
    <div className="text-to-speech">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type text to convert"
        rows={5}
        className="border p-2 w-full"
      />
      <button
        onClick={handleConvert}
        className="bg-blue-500 text-white p-2 mt-2 rounded"
      >
        Convert
      </button>

      {audioData && (
        <div className="audio-player mt-4">
          <audio controls src={audioData}></audio>
        </div>
      )}
    </div>
  );
};

export default TextToSpeech;
