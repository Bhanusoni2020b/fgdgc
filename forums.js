document.addEventListener('DOMContentLoaded', function() {
    // Category Selection
    const categoryItems = document.querySelectorAll('.forum-categories li');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            categoryItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            // Filter discussions based on category
            console.log(`Selected category: ${this.querySelector('span').textContent.trim()}`);
        });
    });

    // Filter Selection
    const filterOptions = document.querySelectorAll('.filter-option input');
    filterOptions.forEach(option => {
        option.addEventListener('change', function() {
            console.log(`Selected filter: ${this.value}`);
            // Implement filter logic
        });
    });

    // Search Functionality
    const searchInput = document.querySelector('.search-container input');
    const searchButton = document.querySelector('.search-container button');

    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            console.log(`Searching for: ${searchTerm}`);
            // Implement search functionality
        }
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
        // Implement new topic creation
    });

    // Discussion Card Click
    const discussionCards = document.querySelectorAll('.discussion-card');
    discussionCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            console.log(`Opening discussion: ${title}`);
            // Implement discussion view
        });
    });
}); 