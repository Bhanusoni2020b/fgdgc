document.addEventListener('DOMContentLoaded', function() {
    // Video data (in real application, this would come from a database)
    const videos = {
        featured: {
            id: 'featured',
            title: 'Getting Started with Organic Farming',
            description: 'Learn the fundamental principles and practices of organic farming in this comprehensive guide.',
            videoUrl: 'https://www.youtube.com/embed/YOUTUBE_VIDEO_ID',
            views: '1.2K',
            date: '2 days ago'
        },
        video1: {
            id: 'video1',
            title: 'Soil Management Techniques',
            description: 'Essential techniques for maintaining healthy soil and improving fertility.',
            videoUrl: 'https://www.youtube.com/embed/YOUTUBE_VIDEO_ID',
            views: '856',
            date: '5 days ago'
        },
        // Add more video data as needed
    };

    // Elements
    const modal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalViews = document.getElementById('modalViews');
    const modalDate = document.getElementById('modalDate');
    const closeModal = document.querySelector('.close-modal');
    const videoCards = document.querySelectorAll('.video-card');
    const featuredVideo = document.querySelector('.featured-video');
    const categoryItems = document.querySelectorAll('.video-categories li');
    const durationFilters = document.querySelectorAll('.duration-option input');
    const searchInput = document.querySelector('.search-container input');
    const searchButton = document.querySelector('.search-container button');

    // Play video function
    function playVideo(videoId) {
        const video = videos[videoId];
        if (video) {
            videoPlayer.src = video.videoUrl;
            modalTitle.textContent = video.title;
            modalDescription.textContent = video.description;
            modalViews.innerHTML = `<i class="far fa-eye"></i> ${video.views} views`;
            modalDate.innerHTML = `<i class="far fa-calendar"></i> ${video.date}`;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Event Listeners
    featuredVideo.addEventListener('click', () => playVideo('featured'));

    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoId = this.dataset.videoId;
            playVideo(videoId);
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        videoPlayer.src = '';
        document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            videoPlayer.src = '';
            document.body.style.overflow = 'auto';
        }
    });

    // Category Selection
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            categoryItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            const category = this.dataset.category;
            // Filter videos by category
            console.log(`Filtering by category: ${category}`);
        });
    });

    // Duration Filters
    durationFilters.forEach(filter => {
        filter.addEventListener('change', function() {
            // Filter videos by duration
            console.log(`Duration filter changed: ${this.value}`);
        });
    });

    // Search Functionality
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            // Implement search functionality
            console.log(`Searching for: ${searchTerm}`);
        }
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}); 