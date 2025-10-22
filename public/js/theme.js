// Yeh code tab chalega jab poora HTML load ho jayega
document.addEventListener('DOMContentLoaded', () => {
    // Apne HTML elements ko select karo
    const micBtn = document.getElementById('mic-btn');
    const messageInput = document.getElementById('message-input');

    // Check karo ki browser Speech Recognition support karta hai ya nahi
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        
        // Taaki jaise hi bolna band ho, result mil jaye
        recognition.continuous = false; 

        // Jab mic button par click ho
        micBtn.addEventListener('click', () => {
            try {
                recognition.start();
                micBtn.textContent = '...'; // Icon badal kar user ko feedback do
            } catch (error) {
                console.error('Recognition already started.', error);
            }
        });

        // Jab API awaaz ko text mein badal de
        recognition.onresult = (event) => {
            const spokenText = event.results[0][0].transcript;
            messageInput.value = spokenText; // Text ko input box mein daal do
        };

        // Jab recognition poora ho jaye
        recognition.onend = () => {
            micBtn.textContent = '🎙️'; // Icon wapas original kar do
        };
        
        // Agar koi error aaye
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            micBtn.textContent = '🎙️'; // Icon wapas original kar do
        };

    } else {
        console.log('Sorry, your browser does not support Speech Recognition.');
        // User ko batayein ki feature available nahi hai
        micBtn.disabled = true;
        micBtn.textContent = '❌';
    }
});