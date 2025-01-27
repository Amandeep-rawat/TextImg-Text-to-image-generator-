import { chatSession } from "../config/aiModel.js";

export const GetVideoScript=async(req,res)=>{
    
    try {
        const {prompt}=await req.body;

        // console.log(prompt)
        const result=await chatSession.sendMessage(prompt);
        // console.log(result.response.text());
        const responseText = result.response.text();

        // Try to parse the response as JSON
    let jsonResponse;
    try {
      jsonResponse = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError.message);
      return res.status(500).json({ error: "Invalid response format from AI model." });
    }

    // console.log("AI JSON Response:", jsonResponse);

    // Return the parsed JSON response
    return res.json({ result: jsonResponse });
        
    } catch (error)
    {
        return res.json({'Error':error.message})
        
    }
}