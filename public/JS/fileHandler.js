document.addEventListener('DOMContentLoaded', () => {
    // HTML se plus button aur hidden file input ko select karo
    const addBtn = document.getElementById('addBtn');
    const fileInput = document.getElementById('file-input');

    // Agar dono elements page par maujood hain
    if (addBtn && fileInput) {
        
        // Jab plus (+) button par click ho
        addBtn.addEventListener('click', () => {
            // Hidden file input par click trigger kar do
            fileInput.click();
        });

        // Jab user koi file select kar le
        fileInput.addEventListener('change', (event) => {
            const selectedFile = event.target.files[0];

            if (selectedFile) {
                // Abhi ke liye, bas file ka naam console par dikhao
                console.log('File selected:', selectedFile.name);
                // Future mein yahan file upload ka code aayega
            }
        });
    }
});