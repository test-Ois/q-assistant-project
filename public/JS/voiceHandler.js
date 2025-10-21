document.addEventListener('DOMContentLoaded', () => {
    const micBtn = document.getElementById('mic-btn');
    const pill = document.getElementById('pill');
    
    // Humein 'chat.js' waale editableInput tak pahunchna hai
    // Hum use yahan dobara select kar sakte hain
    const editableInput = pill.querySelector('[contenteditable="true"]');
    const placeholder = document.getElementById('placeholder');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition && editableInput) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;

        micBtn.addEventListener('click', () => {
            try {
                recognition.start();
            } catch (error) {
                console.error('Recognition already started.', error);
            }
        });

        recognition.onstart = () => {
            pill.classList.add('listening'); // Listening state ka visual feedback
        };

        recognition.onresult = (event) => {
            const spokenText = event.results[0][0].transcript;
            editableInput.textContent = spokenText; // Naye input field mein text daalein
            placeholder.style.display = 'none'; // Placeholder hide karein
        };

        recognition.onend = () => {
            pill.classList.remove('listening'); // Visual feedback hatayein
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            pill.classList.remove('listening');
        };

    } else {
        micBtn.disabled = true;
    }
});