// server.js (Updated Paths)

require('dotenv').config(); 
const fetch = require('node-fetch');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const openRouterApiKey = process.env.OPENROUTER_API_KEY;
const PORT = process.env.PORT || 3000; 
const MONGO_URI = process.env.MONGO_URI; 

// --- MongoDB Connection ---
if (!MONGO_URI) { /* ... error handling ... */ }
mongoose.connect(MONGO_URI) /* ... .then() .catch() ... */

// --- Schema and Model ---
const messageSchema = new mongoose.Schema({ /* ... */ });
const Message = mongoose.model('Message', messageSchema);

app.use(express.json()); 

// === Serve Static Files (Using __dirname) ===
// Yeh line Render ko batayegi ki CSS/JS/Images kahan hain
app.use(express.static(path.join(__dirname, 'public'))); 
// ===============================================

// === Routes for HTML Pages (Using __dirname) ===
app.get('/', (req, res) => {
    // __dirname project ke root ko point karna chahiye Render par
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html')); 
});
app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'chat.html'));
});
// ==================================================

// --- API Endpoint ---
app.post('/api/chat', async (req, res) => { /* ... API code ... */ });

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Q-Assistant server is running on port ${PORT}`);
});