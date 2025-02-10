import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config(); // Load environment variables from .env

const app = express();
app.use(cors());
app.use(express.json());

const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY;

app.post("/api/get-access-token", async (req, res) => {
  try {
    if (!HEYGEN_API_KEY) {
      return res.status(500).json({ error: "API key is missing from .env" });
    }

    const response = await fetch(
      "https://api.heygen.com/v1/streaming.create_token",
      {
        method: "POST",
        headers: {
          "x-api-key": HEYGEN_API_KEY,
        },
      }
    );

    const data = await response.json();

    if (!data.data || !data.data.token) {
      throw new Error("Invalid response from API");
    }

    res.status(200).json({ token: data.data.token });
  } catch (error) {
    console.error("Error retrieving access token:", error);
    res.status(500).json({ error: "Failed to retrieve access token" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
