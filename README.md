# Q-Assistant 🤖

An AI-powered chatbot designed to help users practice English conversation, similar to conversational AI apps. This project is currently under active development with plans to add more features. Built using Node.js, Express, MongoDB, and the OpenRouter API.

## ✨ Features

### Current Features:
* Real-time chat with an AI assistant via OpenRouter (currently using GPT-3.5 Turbo).
* Voice input using the Web Speech API.
* Basic user message history stored in MongoDB Atlas.
* Responsive design for desktop and mobile.
* Sidebar navigation.

### Planned Features (Work in Progress):
* **User Authentication:** Sign up and Login functionality.
* **Profile Management:** User profiles and settings.
* **Enhanced Chat History:** Viewing and managing past conversations.
* **Voice Call Feature:** Real-time voice interaction (User-to-AI or User-to-User).
* **AI Model Selection:** Allow users to choose different AI models via OpenRouter.
* **Voice Selection:** Option to choose between male and female AI voices (TTS).
* **AI Tools:** Features like AI-assisted email writing and image generation.

---
## 🚀 Tech Stack

* **Frontend:** HTML, CSS5, JavaScript
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (with Mongoose) hosted on MongoDB Atlas
* **AI:** OpenRouter API and Vertex API
* **Real-time Communication (Voice Input):** Web Speech API
* **Deployment:** Render

---
## 🔧 Setup & Installation (Local Development)

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/test-Ois/q-assistant-project.git](https://github.com/test-Ois/q-assistant-project.git)
    cd q-assistant-project
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file** in the root directory and add your keys:
    ```env
    OPENROUTER_API_KEY=your_openrouter_api_key
    MONGO_URI=your_local_or_atlas_mongodb_uri 
    # Example Local: mongodb://localhost:27017/q-assistant
    # Example Atlas: mongodb+srv://user:pass@cluster.mongodb.net/q-assistant?retryWrites=true&w=majority
    ```
4.  **Start the server:**
    ```bash
    node server.js
    ```
5.  Open your browser and navigate to `http://localhost:3000` (or the port specified).

---
## 🌐 Live Demo

You can try the live version (work in progress) here:
[https://q-assistant-project.onrender.com](https://q-assistant-project.onrender.com)

---
## 🚧 Project Status

This project is under active development. More features are being added.

---

Built by Qayoom Akhtar.