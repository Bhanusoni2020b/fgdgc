document.addEventListener('DOMContentLoaded', function() {
    // Category Selection
    const categoryItems = document.querySelectorAll('.forum-categories li');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            categoryItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            // Filter discussions based on category
            console.log(`Selected category: ${this.textContent.trim()}`);
        });
    });

    // Search Functionality
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');

    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        console.log(`Searching for: ${searchTerm}`);
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // New Topic Button
    const newTopicBtn = document.querySelector('.new-topic-btn');
    newTopicBtn.addEventListener('click', function() {
        console.log('Opening new topic form');
        // Implement new topic creation functionality
    });
}); 