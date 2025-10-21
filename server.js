// server.js

require('dotenv').config(); // Loads variables from .env file
const fetch = require('node-fetch'); // Import node-fetch
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// API Key ko ek variable mein store karein
const openRouterApiKey = process.env.OPENROUTER_API_KEY;

const app = express();
const PORT = 3000;

// === MONGODB CONNECTION ===
const MONGO_URI = 'mongodb://localhost:27017/q-assistant';
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB successfully connected!'))
    .catch(err => console.error('MongoDB connection error:', err));
// ==========================

// === MESSAGE SCHEMA and MODEL ===
const messageSchema = new mongoose.Schema({
    text: String,
    sender: String, // 'user' ya 'ai'
    timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);
// ==============================

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// === Routes for HTML Pages ===
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});
app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'chat.html'));
});
// =============================

// === API ENDPOINT WITH OPENROUTER INTEGRATION ===
app.post('/api/chat', async (req, res) => {
    const userMessageText = req.body.message;

    // Check if API key is loaded
    if (!openRouterApiKey) {
        console.error('OpenRouter API Key not found. Make sure it is set in the .env file.');
        return res.status(500).json({ reply: 'API key configuration error.' });
    }

    try {
        // 1. Save User Message to DB
        const userMessage = new Message({ text: userMessageText, sender: 'user' });
        await userMessage.save();
        console.log('User message saved to DB.');

        // 2. Call OpenRouter API
        console.log('Calling OpenRouter API...');
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${openRouterApiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "openai/gpt-3.5-turbo",// Or any model you prefer
                "messages": [
                    { "role": "user", "content": userMessageText }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('OpenRouter API Error:', errorData);
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Extract the response text
        let aiResponseText = "Sorry, I couldn't get a response."; // Default reply
        if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
            aiResponseText = data.choices[0].message.content;
        } else {
            console.error('Unexpected API response structure:', data);
        }
        console.log('OpenRouter Response:', aiResponseText);

        // 3. Save AI Response to DB
        const aiMessage = new Message({ text: aiResponseText, sender: 'ai' });
        await aiMessage.save();
        console.log('AI response saved to DB.');
        
        // 4. Send AI Reply to Frontend
        res.json({ reply: aiResponseText });

    } catch (error) {
        console.error('Error in /api/chat:', error);
        res.status(500).json({ reply: `An error occurred: ${error.message}` });
    }
});
// ===============================================

app.listen(PORT, () => {
    console.log(`Q-Assistant server is running on http://localhost:${PORT}`);
});