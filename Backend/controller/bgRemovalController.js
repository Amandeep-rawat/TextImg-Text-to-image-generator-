import User from "../models/userModel.js";
import FormData from "form-data";
import fs from "fs";
import axios from "axios";
import path from "path";
export const removeBackground = async (req, res) => {
    try {
        const userId = req.id;
        // console.log('req.file i ',req.file);
        
        
       

        // Validate input
        if (!userId || !req.file) {
            return res.status(400).json({ message: "Missing details", success: false });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        // console.log('user found');
        
        // Check user credit balance
        if (user.creditBalance <= 0) {
            return res.status(400).json({
                message: "You have no credits left",
                creditBalance: user.creditBalance,
                success: false,
            });
        }

        const imagePath=req.file.path;
        const imageFile=fs.createReadStream(imagePath);
        // Remove background via API
        const formData = new FormData();
        formData.append("image_file", imageFile); // Attach the file

        
        const {data}=await axios.post("https://clipdrop-api.co/remove-background/v1", formData, {
            headers:{
                'x-api-key':process.env.CLIPDROP_API_KEY,
            },
            responseType:'arraybuffer'
        })  
        const base64Image = Buffer.from(data,'binary').toString("base64");
        
        

        const resultImage=`data:${req.file.mimetype};base64,${base64Image}`;
        // console.log('result image ',resultImage);
        
        // Deduct credit balance after success
        user.creditBalance -= 1;
        await user.save();

        return res.status(200).json({
            message: "Background removed successfully",
            success: true,
            resultImage,
            creditBalance: user.creditBalance,
        });
    } catch (error) {
        console.error("Error occurred:", error.message);
        return res.status(400).json({ message: error.message, success: false });
    }
};
