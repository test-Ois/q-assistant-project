document.addEventListener('DOMContentLoaded', () => {

    const topicCards = document.querySelectorAll('.topic-card');

    topicCards.forEach(card => {
        card.addEventListener('click', () => {
            // User ko /chat page par bhej do
            window.location.href = '/chat';
        });
    });

});