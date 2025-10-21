document.addEventListener('DOMContentLoaded', () => {
    // UI elements
    const messageContainer = document.getElementById('message-container');
    const welcomeScreen = document.getElementById('welcome-screen');
    const pill = document.getElementById('pill');
    const placeholder = document.getElementById('placeholder');
    const sendBtn = document.getElementById('send-btn');
    const micBtn = document.getElementById('mic-btn');

    const editableInput = document.createElement('div');
    editableInput.contentEditable = true;
    editableInput.style.cssText = `outline:none; flex:1; font-size:16px; color:white; min-height:22px; white-space:pre-wrap; word-break:break-word;`;
    pill.insertBefore(editableInput, micBtn);

    // --- Suggestion Chip Logic ---
    const suggestionChips = document.querySelectorAll('.chip');
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const messageText = chip.textContent;
            editableInput.textContent = messageText; // Put text in input
            sendMessage(); // Send the message
        });
    });

    // --- UI Logic ---
    pill.addEventListener('click', () => editableInput.focus());
    editableInput.addEventListener('focus', () => placeholder.style.display = 'none');
    editableInput.addEventListener('blur', () => {
        if (!editableInput.textContent.trim()) placeholder.style.display = 'block';
    });
    editableInput.addEventListener('input', () => {
        const hasText = editableInput.textContent.trim().length > 0;
        placeholder.style.display = hasText ? 'none' : 'block';
        micBtn.style.display = hasText ? 'none' : 'flex';
        sendBtn.style.display = hasText ? 'flex' : 'none';
    });
    editableInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendBtn.click();
        }
    });

    // --- Message Sending Logic ---
    sendBtn.addEventListener('click', sendMessage);

    function sendMessage() {
        const userMessage = editableInput.textContent.trim();
        if (userMessage === '') return;
        displayMessage(userMessage, 'user');
        getAiReply(userMessage);
        editableInput.textContent = '';
        micBtn.style.display = 'flex';
        sendBtn.style.display = 'none';
        placeholder.style.display = 'block';
        editableInput.focus();
    }

    function displayMessage(message, sender) {
        // *** IMPORTANT: HIDE WELCOME SCREEN ***
        if (welcomeScreen) {
            welcomeScreen.style.display = 'none';
        }
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        messageContainer.appendChild(messageElement);
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    async function getAiReply(message) {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: message }),
            });
            const data = await response.json();
            displayMessage(data.reply, 'ai');
        } catch (error) {
            console.error('Error:', error);
            displayMessage('Sorry, something went wrong.', 'ai');
        }
    }
});