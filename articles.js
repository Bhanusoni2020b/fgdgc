document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const categoryFilters = document.querySelectorAll('.category-filters .filter-option');
    const yearFilters = document.querySelectorAll('.year-filters .filter-option');
    const articles = document.querySelectorAll('.article-card');
    const searchInput = document.querySelector('.search-container input');
    const searchButton = document.querySelector('.search-container button');

    // Category filter
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            categoryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            const category = this.querySelector('input').value;
            filterArticles();
        });
    });

    // Year filter
    yearFilters.forEach(filter => {
        filter.addEventListener('change', function() {
            filterArticles();
        });
    });

    // Search functionality
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        articles.forEach(article => {
            const title = article.querySelector('h3').textContent.toLowerCase();
            const excerpt = article.querySelector('.article-excerpt').textContent.toLowerCase();
            const matches = title.includes(searchTerm) || excerpt.includes(searchTerm);
            article.style.display = matches ? 'block' : 'none';
        });
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Filter articles based on selected filters
    function filterArticles() {
        const selectedCategory = document.querySelector('.category-filters input:checked').value;
        const selectedYears = Array.from(document.querySelectorAll('.year-filters input:checked'))
            .map(input => input.value);

        articles.forEach(article => {
            const articleCategory = article.querySelector('.article-category').textContent;
            const articleYear = article.querySelector('.article-stats span').textContent.split(',')[1].trim();
            
            const categoryMatch = selectedCategory === 'all' || articleCategory.toLowerCase() === selectedCategory;
            const yearMatch = selectedYears.length === 0 || selectedYears.includes(articleYear);
            
            article.style.display = categoryMatch && yearMatch ? 'block' : 'none';
        });
    }

    // Read More functionality
    const readMoreButtons = document.querySelectorAll('.read-more');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const articleId = this.closest('article').dataset.articleId;
            // Implement article viewing logic here
            console.log(`Opening article: ${articleId}`);
        });
    });
});

.form-select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    color: #333;
    background-color: white;
    cursor: pointer;
}

.form-select optgroup {
    font-weight: bold;
    color: #2c3e50;
    background-color: #f8f9fa;
}

.form-select option {
    padding: 8px;
    color: #444;
}

.form-select option:hover {
    background-color: #e8f5e9;
}

/* Style for the dropdown arrow */
.form-select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1em;
    padding-right: 2.5rem;
}

/* Hover and focus states */
.form-select:hover {
    border-color: #2ecc71;
}

.form-select:focus {
    outline: none;
    border-color: #2ecc71;
    box-shadow: 0 0 0 2px rgba(46, 204, 113, 0.2);
} 