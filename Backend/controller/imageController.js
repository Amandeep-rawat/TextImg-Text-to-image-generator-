import User from "../models/userModel.js";

export const generateImage = async (req, res) => {
    try {
        // console.log("req body is ",req.body);
        const { userId, prompt } = req.body;

        // Validate input
        if (!userId || !prompt) {
            return res.status(400).json({ message: "Missing details", success: false });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Check user credit balance
        if (user.creditBalance <= 0) {
            return res.status(400).json({ message: "You have no credits left", creditBalance: user.creditBalance, success: false });
        }

        // Fetch request to generate image
        const response = await fetch("https://clipdrop-api.co/text-to-image/v1", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "x-api-key": process.env.CLIPDROP_API_KEY,
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            const errorResponse = await response.text();
            throw new Error("Failed to generate image from API: " + errorResponse);
        }

        const arrayBuffer = await response.arrayBuffer();
        const base64Image = Buffer.from(arrayBuffer).toString("base64");
        const resultImage = "data:image/png;base64," + base64Image;

        // Deduct credit balance and save
        user.creditBalance -= 1;
        await user.save();

        return res.status(200).json({
            message: "Image generated successfully",
            success: true,
            resultImage,
            creditBalance: user.creditBalance,
        });
    } catch (error) {
        console.error("Error occurred:", error.message);
        return res.status(400).json({ message: error.message, success: false });
    }
};


// Why do we use ArrayBuffer?

// It gives us full control over the binary data.
// You can convert it into different formats, like text (Base64) or images.



// Main Difference:

     // buffer.string()    Buffer Node.js ka apna object hai, jo binary data ko efficiently handle karta hai. Jab aap req.file.buffer ko Base64 mein convert karte hain, aap Buffer ka use karte hain. means jab file ko multer ke thourgh direct req.file me acess kiya jae. to req.file me buffer object hoga.usko base 64 me convrt karne se pehle buffter me convrt karna hoga taki kisi vi format me convert kiya ja sakte use . 
//   Arraybugger.string()   ArrayBuffer generally Web APIs mein hota hai (jaise fetch se data aata hai), aur jab aapko usse Base64 ya string mein convert karna ho, toh aapko Buffer.from() ka use karna padta hai.
