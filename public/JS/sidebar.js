document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navPanel = document.getElementById('nav-panel');
    const mainContent = document.getElementById('main-content');

    // Function to open the sidebar
    function openSidebar() {
        hamburgerBtn.classList.add('active');
        navPanel.classList.add('open');
        mainContent.classList.add('content-shifted');
    }

    // Function to close the sidebar
    function closeSidebar() {
        hamburgerBtn.classList.remove('active');
        navPanel.classList.remove('open');
        mainContent.classList.remove('content-shifted');
    }

    if (hamburgerBtn && navPanel && mainContent) {
        // Hamburger button par click hone par
        hamburgerBtn.addEventListener('click', (event) => {
            // Click ko aage badhne se roko
            event.stopPropagation();
            // Check karo ki panel khula hai ya band
            const isPanelOpen = navPanel.classList.contains('open');
            if (isPanelOpen) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });

        // Jab main content (darkened area) par click ho
        mainContent.addEventListener('click', () => {
            // Agar panel khula hai, toh use band kar do
            if (navPanel.classList.contains('open')) {
                closeSidebar();
            }
        });
    }
});