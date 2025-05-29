// middleware/getVideo.js

// import dotenv from "dotenv";
import User from "../models/userModel.js";
import { createClient } from "pexels";

export const getVideo = async (req, res) => {
  try {
    const client = createClient(process.env.PEXELS_API_KEY);

     const userId = req.id;
    const query = req.query.q || "nature";

    // Validate inputs
    if (!userId || !query) {
      return res.status(400).json({ message: "Missing userId or query", success: false });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    // Check user's credit balance
    if (user.creditBalance <= 0) {
      return res.status(400).json({ message: "You have no credits left", creditBalance: user.creditBalance, success: false });
    }

    // Fetch video from Pexels API
    const result = await client.videos.search({ query, per_page: 2 });

    // Deduct 1 credit and save
    user.creditBalance -= 1;
    await user.save();

    return res.status(200).json({
      message: "Video fetched successfully",
      success: true,
      videos: result.videos,
      creditBalance: user.creditBalance,
    });

  } catch (error) {
    console.error("Video generation error:", error.message);
    res.status(500).json({ message: "Failed to fetch videos", success: false });
  }
};
