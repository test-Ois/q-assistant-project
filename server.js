// ====================== Q-ASSISTANT SERVER ======================
require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ====================== DATABASE CONNECTION ======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ====================== MESSAGE MODEL ======================
const messageSchema = new mongoose.Schema({
  text: String,
  sender: String, // 'user' or 'ai'
  timestamp: { type: Date, default: Date.now },
});
const Message = mongoose.model("Message", messageSchema);

// ====================== ROUTES ======================

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// Main pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "index.html"));
});

app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "chat.html"));
});

// ====================== CHAT API ======================
app.post("/api/chat", async (req, res) => {
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;
  const userMessageText = req.body.message;

  if (!openRouterApiKey) {
    console.error("❌ OpenRouter API Key missing. Check your .env file.");
    return res.status(500).json({ reply: "API key not configured properly." });
  }

  try {
    // 1️⃣ Save User Message
    const userMessage = new Message({ text: userMessageText, sender: "user" });
    await userMessage.save();

    // 2️⃣ Call OpenRouter API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openRouterApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessageText }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter API Error:", errorData);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponseText =
      data?.choices?.[0]?.message?.content || "Sorry, I couldn't get a response.";

    // 3️⃣ Save AI Response
    const aiMessage = new Message({ text: aiResponseText, sender: "ai" });
    await aiMessage.save();

    // 4️⃣ Send back to frontend
    res.json({ reply: aiResponseText });
  } catch (error) {
    console.error("❌ Error in /api/chat:", error);
    res.status(500).json({ reply: `Error: ${error.message}` });
  }
});

// ====================== CATCH-ALL (for static routing) ======================
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "index.html"));
});

// ====================== SERVER START ======================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Q-Assistant running on port ${PORT}`));
