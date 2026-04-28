import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// API Route for results transmission
app.post("/api/transmit", async (req, res) => {
  const payload = req.body;
  const webhookUrl =
    process.env.VITE_GOOGLE_SHEETS_WEBHOOK ||
    "https://script.google.com/macros/s/AKfycbwTFw4qHOLiXd0mJq9vVeza9LHjXhytCi1Q53XhlAI0YaswkGSBRE6uq-tx5YR6MMrVGA/exec";

  if (!webhookUrl) {
    console.error(
      "VITE_GOOGLE_SHEETS_WEBHOOK is not defined in environment variables.",
    );
    return res.status(500).json({ error: "Webhook configuration missing" });
  }

  try {
    console.log("Sending data to Google Sheets Webhook:", webhookUrl);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const resultText = await response.text();
    console.log("Google Sheets response:", resultText);

    res.status(200).json({ success: true, message: "Results sent to storage" });
  } catch (error) {
    console.error("Error sending to Google Sheets:", error);
    res.status(500).json({ error: "Failed to transmit results" });
  }
});

// Serve static files from dist
const distPath = path.join(process.cwd(), "dist");
app.use(express.static(distPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

export default app;
