// Sample product data
const products = [
    // Vegetables
    {
        id: 1,
        name: "Fresh Roma Tomatoes",
        category: "Vegetables",
        price: "₹89/kg",
        image: "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        farmer: "John's Farm",
        description: "Fresh, ripe Roma tomatoes perfect for sauces and salads"
    },
    {
        id: 2,
        name: "Organic Carrots",
        category: "Vegetables",
        price: "₹60/kg",
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        farmer: "Green Valley Farm",
        description: "Sweet and crunchy organic carrots"
    },
    {
        id: 3,
        name: "Fresh Spinach",
        category: "Vegetables",
        price: "₹40/bunch",
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        farmer: "Organic Valley",
        description: "Nutrient-rich green spinach leaves"
    },
    {
        id: 4,
        name: "Bell Peppers Mix",
        category: "Vegetables",
        price: "₹120/kg",
        image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        farmer: "Rainbow Farm",
        description: "Colorful mix of red, yellow, and green bell peppers"
    },
    {
        id: 5,
        name: "Fresh Cauliflower",
        category: "Vegetables",
        price: "₹45/piece",
        image: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        farmer: "Freshfield Farms",
        description: "Large, white cauliflower heads"
    },
    // Fruits
    {
        id: 6,
        name: "Organic Apples",
        category: "Fruits",
        price: "₹149/kg",
        image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        farmer: "Green Valley Farm",
        description: "Sweet and crispy organic apples"
    },
    {
        id: 7,
        name: "Fresh Mangoes",
        category: "Fruits",
        price: "₹180/kg",
        image: "https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        farmer: "Tropical Delights",
        description: "Sweet and juicy Alphonso mangoes"
    },
    {
        id: 8,
        name: "Sweet Bananas",
        category: "Fruits",
        price: "₹70/dozen",
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        farmer: "Green Earth Farm",
        description: "Ripe and sweet bananas"
    },
    {
        id: 9,
        name: "Fresh Strawberries",
        category: "Fruits",
        price: "₹200/box",
        image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        farmer: "Berry Good Farms",
        description: "Sweet and juicy strawberries"
    },
    {
        id: 10,
        name: "Pomegranate",
        category: "Fruits",
        price: "₹160/kg",
        image: "https://images.unsplash.com/photo-1541344999736-83eca272f6fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        farmer: "Ruby Farms",
        description: "Fresh and sweet pomegranates"
    },
    // Grains
    {
        id: 11,
        name: "Brown Rice",
        category: "Grains",
        price: "₹199/kg",
        image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        farmer: "Rice Fields Co.",
        description: "Organic brown rice, rich in fiber"
    },
    {
        id: 12,
        name: "Organic Quinoa",
        category: "Grains",
        price: "₹299/kg",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        farmer: "Health Harvest",
        description: "Premium quality organic quinoa"
    },
    {
        id: 13,
        name: "Whole Wheat",
        category: "Grains",
        price: "₹80/kg",
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        farmer: "Golden Fields",
        description: "Stone-ground whole wheat"
    },
    {
        id: 14,
        name: "Pearl Millet",
        category: "Grains",
        price: "₹90/kg",
        image: "https://images.unsplash.com/photo-1622621746668-59fb299bc4d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        farmer: "Millet Masters",
        description: "Nutritious pearl millet (bajra)"
    },
    {
        id: 15,
        name: "Organic Oats",
        category: "Grains",
        price: "₹150/kg",
        image: "	https://tse4.mm.bing.net/th?id=OIP.dD9sfqBRr_2Xek14rcrXXgAAAA&pid=Api&P=0&h=180",
        farmer: "Morning Glory Farms",
        description: "Premium rolled organic oats"
    }
];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const uploadBox = document.getElementById('uploadBox');
const imageInput = document.getElementById('imageInput');
const resultBox = document.getElementById('resultBox');
const contactForm = document.getElementById('contactForm');

// Fetch products from API
async function fetchProducts() {
    try {
        const response = await fetch('https://api.agriconnect.com/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        // Return dummy data as fallback
        return [
            {
                id: 1,
                name: "Fresh Roma Tomatoes",
                category: "Vegetables",
                price: "₹89/kg",
                image: "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                farmer: "John's Farm",
                description: "Fresh, ripe Roma tomatoes perfect for sauces and salads"
            },
            // ... other products
        ];
    }
}

// Load products with loading state
async function loadProducts(category = 'All') {
    const productGrid = document.querySelector('.product-grid');
    
    // Show loading state
    productGrid.innerHTML = '<div class="loading">Loading products...</div>';
    
    try {
        // Use the sample product data directly
        const filteredProducts = category === 'All' 
            ? products 
            : products.filter(product => product.category.toLowerCase() === category.toLowerCase());

        // Clear loading state and show products
        productGrid.innerHTML = '';
        
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    ${product.description ? `<p class="description">${product.description}</p>` : ''}
                    <p class="farmer">Farmer: ${product.farmer}</p>
                    <p class="price">${product.price}</p>
                    <button class="buy-btn" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                        Add to Cart
                    </button>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
    } catch (error) {
        productGrid.innerHTML = '<div class="error">Failed to load products. Please try again later.</div>';
    }
}

// Filter products
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        loadProducts(button.textContent);
    });
});

// Disease Detection API Configuration
const API_ENDPOINT = 'http://localhost:5000/api/disease';
const API_KEY = 'test_key';

// Sample crop diseases data
const cropDiseases = {
    rice: [
        {
            name: 'Bacterial Blight',
            symptoms: 'Water-soaked lesions on leaves, yellowing, wilting',
            probability: 0.85,
            recommendations: 'Use copper-based fungicides, remove infected plants',
            preventive: 'Plant resistant varieties, maintain proper spacing'
        },
        {
            name: 'Blast',
            symptoms: 'Diamond-shaped lesions, white to gray centers',
            probability: 0.75,
            recommendations: 'Apply fungicides, remove infected plants',
            preventive: 'Avoid excessive nitrogen, maintain proper water levels'
        },
        {
            name: 'Rotten Grains',
            symptoms: 'Discolored, soft, and foul-smelling grains',
            probability: 0.95,
            recommendations: 'Remove and destroy infected grains, improve storage conditions',
            preventive: 'Proper drying before storage, use clean storage containers'
        }
    ],
    wheat: [
        {
            name: 'Powdery Mildew',
            symptoms: 'White powdery spots on leaves and stems',
            probability: 0.80,
            recommendations: 'Apply sulfur-based fungicides, improve air circulation',
            preventive: 'Plant resistant varieties, maintain proper spacing'
        },
        {
            name: 'Rust',
            symptoms: 'Orange-brown pustules on leaves and stems',
            probability: 0.70,
            recommendations: 'Apply fungicides, remove infected plants',
            preventive: 'Plant resistant varieties, avoid overhead irrigation'
        },
        {
            name: 'Rotten Grains',
            symptoms: 'Discolored, soft, and foul-smelling grains',
            probability: 0.90,
            recommendations: 'Remove and destroy infected grains, improve storage conditions',
            preventive: 'Proper drying before storage, use clean storage containers'
        }
    ]
};

// Initialize disease detection
function initializeDiseaseDetection() {
    const uploadBox = document.getElementById('uploadBox');
    const imageInput = document.getElementById('imageInput');

    // Handle drag and drop
    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.style.backgroundColor = '#f0f9f0';
    });

    uploadBox.addEventListener('dragleave', () => {
        uploadBox.style.backgroundColor = 'transparent';
    });

    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.style.backgroundColor = 'transparent';
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            imageInput.files = e.dataTransfer.files;
            handleImageUpload(file);
        }
    });

    // Handle click to upload
    uploadBox.addEventListener('click', () => {
        imageInput.click();
    });

    // Handle file selection
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    });
}

// Handle image upload
async function handleImageUpload(file) {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
        showError('Please upload an image file');
        return;
    }

    // Check if crop type is selected
    const cropType = document.getElementById('cropType').value;
    if (!cropType) {
        showError('Please select a crop type');
        return;
    }

    // Show loading state
    const resultBox = document.getElementById('resultBox');
    resultBox.innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Analyzing image...</p>
        </div>
    `;

    try {
        // Convert image to base64
        const base64Image = await convertToBase64(file);
        
        // Call AI detection API
        const result = await detectDisease(base64Image, cropType);
        
        // Update UI with results
        updateDetectionResult(result);
        
    } catch (error) {
        console.error('Error processing image:', error);
        showError('Error processing image. Please try again.');
    }
}

// Convert image to base64
function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Detect disease using mock API
async function detectDisease(imageData, cropType) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Get diseases for the selected crop
    const diseases = cropDiseases[cropType] || [];
    
    if (diseases.length === 0) {
        return {
            status: 'healthy',
            confidence: 0.95,
            recommendations: ['Maintain proper crop care', 'Regular monitoring'],
            preventive: ['Use quality seeds', 'Follow recommended practices']
        };
    }

    // Simulate disease detection
    const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
    
    return {
        status: 'infected',
        disease: randomDisease.name,
        symptoms: randomDisease.symptoms,
        confidence: randomDisease.probability,
        recommendations: randomDisease.recommendations.split(', '),
        preventive: randomDisease.preventive.split(', ')
    };
}

// Update detection result in UI
function updateDetectionResult(result) {
    const resultBox = document.getElementById('resultBox');
    
    if (result.status === 'healthy') {
        resultBox.innerHTML = `
            <div class="result-content">
                <div class="status healthy">
                    <i class="fas fa-check-circle"></i>
                    <h3>Healthy Crop</h3>
                    <p>Confidence: ${(result.confidence * 100).toFixed(1)}%</p>
                </div>
                <div class="recommendations">
                    <h4>Recommendations:</h4>
                    <ul>
                        ${result.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
                <div class="preventive">
                    <h4>Preventive Measures:</h4>
                    <ul>
                        ${result.preventive.map(prev => `<li>${prev}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    } else {
        resultBox.innerHTML = `
            <div class="result-content">
                <div class="status infected">
                    <i class="fas fa-exclamation-circle"></i>
                    <h3>Disease Detected: ${result.disease}</h3>
                    <p>Confidence: ${(result.confidence * 100).toFixed(1)}%</p>
                </div>
                <div class="symptoms">
                    <h4>Symptoms:</h4>
                    <p>${result.symptoms}</p>
                </div>
                <div class="recommendations">
                    <h4>Recommendations:</h4>
                    <ul>
                        ${result.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
                <div class="preventive">
                    <h4>Preventive Measures:</h4>
                    <ul>
                        ${result.preventive.map(prev => `<li>${prev}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }
}

// Show error message
function showError(message) {
    const resultBox = document.getElementById('resultBox');
    resultBox.innerHTML = `
        <div class="error">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
        </div>
    `;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeDiseaseDetection();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // If it's the home link, scroll to top
        if (this.getAttribute('href') === '#home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // For other links, scroll to the section
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Initialize products on page load
loadProducts();

// Add scroll event listener for navbar
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
const scrollThreshold = 50;

window.addEventListener('scroll', () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove shadow and background based on scroll position
    if (currentScrollTop > scrollThreshold) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }

    // Hide/show navbar based on scroll direction
    if (currentScrollTop > lastScrollTop && currentScrollTop > scrollThreshold) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }

    lastScrollTop = currentScrollTop;
});

// Login Modal Functionality
const loginBtn = document.querySelector('.login-btn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.querySelector('.close-modal');
const loginForm = document.getElementById('loginForm');

// Show modal
loginBtn.addEventListener('click', () => {
    loginModal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
});

// Close modal
closeModal.addEventListener('click', () => {
    loginModal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
});

// Close modal when clicking outside
loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// Handle form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.querySelector('.remember-me input').checked;

    // Simulate login process
    const submitBtn = loginForm.querySelector('.login-submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    submitBtn.disabled = true;

    setTimeout(() => {
        // Simulate successful login
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
        submitBtn.style.backgroundColor = '#27ae60';
        
        setTimeout(() => {
            loginModal.classList.remove('show');
            document.body.style.overflow = '';
            loginForm.reset();
            submitBtn.innerHTML = 'Login';
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '#2ecc71';
        }, 1000);
    }, 1500);
});

// Social login buttons
document.querySelector('.google-btn').addEventListener('click', () => {
    alert('Google login integration coming soon!');
});

document.querySelector('.facebook-btn').addEventListener('click', () => {
    alert('Facebook login integration coming soon!');
});

// Register link
document.querySelector('.register-btn').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Registration page coming soon!');
});

// Forgot password link
document.querySelector('.forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Password recovery page coming soon!');
});

// Cart functionality
let cart = [];
const cartBtn = document.querySelector('.cart-btn');
const cartModal = document.querySelector('.cart-modal');
const closeCart = document.querySelector('.close-cart');
const cartItems = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const totalAmount = document.querySelector('.total-amount');

// Show/Hide cart modal
cartBtn.addEventListener('click', () => {
    cartModal.classList.add('show');
    updateCart();
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('show');
});

// Close cart when clicking outside
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('show');
    }
});

// Add to cart functionality
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
        showNotification(`Added another ${product.name} to cart`);
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
        showNotification(`${product.name} added to cart`);
    }
    
    updateCartCount();
    updateCart();
    
    // Show cart modal after adding item
    cartModal.classList.add('show');
    
    // Highlight the added item
    setTimeout(() => {
        const addedItem = document.querySelector(`[data-product-id="${product.id}"]`);
        if (addedItem) {
            addedItem.classList.add('highlight');
            setTimeout(() => addedItem.classList.remove('highlight'), 1000);
        }
    }, 100);
}

// Show notification function
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after animation
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Update cart display
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const price = parseInt(item.price.replace('₹', '').replace('/kg', '').replace('/dozen', '').replace('/box', '').replace('/piece', ''));
        const itemTotal = price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item" data-product-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${price}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });

    totalAmount.textContent = `₹${total}`;
    
    // Show empty cart message if no items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-basket"></i>
                <p>Your cart is empty</p>
            </div>
        `;
    }
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            updateCart();
        }
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCart();
}

// Initialize the cart count
updateCartCount();

// Smooth scroll to section function
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        // Get the navbar height for offset
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar.offsetHeight;
        
        // Calculate the target scroll position
        const targetPosition = section.offsetTop - navbarHeight;
        
        // Scroll to the section with smooth behavior
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Add visual feedback
        section.style.animation = 'highlight 1s ease-in-out';
        setTimeout(() => {
            section.style.animation = '';
        }, 1000);
    }
}

// Enhanced Search Functionality
async function searchProducts() {
    const searchInput = document.getElementById('product-search');
    const query = searchInput.value.trim().toLowerCase();
    const productsGrid = document.querySelector('.product-grid');
    const searchResults = document.querySelector('.search-results');

    if (!query) {
        searchResults.style.display = 'none';
        productsGrid.style.display = 'grid';
        return;
    }

    try {
        // Show loading state
        searchResults.innerHTML = '<div class="loading">Searching products...</div>';
        searchResults.style.display = 'block';
        productsGrid.style.display = 'none';

        // Fetch products from API
        const response = await fetch(`https://api.agriconnect.com/products/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No products found</h3>
                    <p>Try searching with different keywords</p>
                </div>
            `;
        } else {
            displaySearchResults(data);
        }
    } catch (error) {
        console.error('Error searching products:', error);
        searchResults.innerHTML = `
            <div class="error">
                <i class="fas fa-exclamation-circle"></i>
                <p>Failed to search products. Please try again.</p>
            </div>
        `;
    }
}

function displaySearchResults(products) {
    const searchResults = document.querySelector('.search-results');
    let resultsHTML = '';

    products.forEach(product => {
        resultsHTML += `
            <div class="search-result-item">
                <img src="${product.image}" alt="${product.name}" class="search-result-image">
                <div class="search-result-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="search-result-meta">
                        <span><i class="fas fa-tag"></i> ${product.category}</span>
                        <span><i class="fas fa-calendar"></i> ${product.seasonality}</span>
                    </div>
                    <div class="search-result-price">
                        <i class="fas fa-rupee-sign"></i> ${product.price}
                    </div>
                    <div class="search-result-benefits">
                        <h4>Health Benefits:</h4>
                        <ul>
                            ${product.healthBenefits.map(benefit => `<li>${benefit}</li>`).join('')}
                        </ul>
                    </div>
                    <button class="buy-btn" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
    });

    searchResults.innerHTML = resultsHTML;
}

// Add event listeners for search
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('product-search');
    const searchButton = document.querySelector('.search-container button');

    // Search on button click
    searchButton.addEventListener('click', searchProducts);

    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });

    // Clear search when clicking outside
    document.addEventListener('click', (e) => {
        const searchContainer = document.querySelector('.search-container');
        if (!searchContainer.contains(e.target)) {
            const searchResults = document.querySelector('.search-results');
            const productsGrid = document.querySelector('.product-grid');
            searchResults.style.display = 'none';
            productsGrid.style.display = 'grid';
        }
    });
});

// Soil Analysis Functions
async function analyzeSoilHealth() {
    try {
        const response = await fetch('https://api.agriconnect.com/soil/health', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        displaySoilResults(data, 'health');
    } catch (error) {
        console.error('Error analyzing soil health:', error);
        showError('Failed to analyze soil health. Please try again.');
    }
}

async function analyzeNutrientLevels() {
    try {
        const response = await fetch('https://api.agriconnect.com/soil/nutrients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        displaySoilResults(data, 'nutrients');
    } catch (error) {
        console.error('Error analyzing nutrient levels:', error);
        showError('Failed to analyze nutrient levels. Please try again.');
    }
}

async function analyzeWaterRetention() {
    try {
        const response = await fetch('https://api.agriconnect.com/soil/water', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        displaySoilResults(data, 'water');
    } catch (error) {
        console.error('Error analyzing water retention:', error);
        showError('Failed to analyze water retention. Please try again.');
    }
}

function displaySoilResults(data, type) {
    const resultsContainer = document.querySelector('.soil-results');
    let resultsHTML = '';

    switch (type) {
        case 'health':
            resultsHTML = `
                <h3>Soil Health Analysis Results</h3>
                <p>Overall Health Score: ${data.healthScore}/100</p>
                <p>Organic Matter: ${data.organicMatter}%</p>
                <p>Microbial Activity: ${data.microbialActivity}</p>
                <p>Recommendations: ${data.recommendations}</p>
            `;
            break;
        case 'nutrients':
            resultsHTML = `
                <h3>Nutrient Levels Analysis</h3>
                <p>Nitrogen (N): ${data.nitrogen} ppm</p>
                <p>Phosphorus (P): ${data.phosphorus} ppm</p>
                <p>Potassium (K): ${data.potassium} ppm</p>
                <p>pH Level: ${data.pH}</p>
                <p>Fertilization Recommendations: ${data.recommendations}</p>
            `;
            break;
        case 'water':
            resultsHTML = `
                <h3>Water Retention Analysis</h3>
                <p>Water Holding Capacity: ${data.waterHoldingCapacity}%</p>
                <p>Drainage Rate: ${data.drainageRate}</p>
                <p>Moisture Level: ${data.moistureLevel}</p>
                <p>Irrigation Recommendations: ${data.recommendations}</p>
            `;
            break;
    }

    resultsContainer.innerHTML = resultsHTML;
    resultsContainer.style.display = 'block';
}

// Weather & Temperature Functions
async function fetchWeatherData() {
    try {
        const response = await fetch('https://api.agriconnect.com/weather/current');
        const data = await response.json();
        updateWeatherDisplay(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError('Failed to fetch weather data. Please try again.');
    }
}

function updateWeatherDisplay(data) {
    const currentWeather = document.querySelector('.weather-info');
    const temperature = document.querySelector('.temperature-info');
    const forecast = document.querySelector('.forecast-info');

    currentWeather.innerHTML = `
        <p>Current Conditions: ${data.conditions}</p>
        <p>Humidity: ${data.humidity}%</p>
        <p>Wind Speed: ${data.windSpeed} km/h</p>
    `;

    temperature.innerHTML = `
        <p>Current Temperature: ${data.temperature}°C</p>
        <p>Feels Like: ${data.feelsLike}°C</p>
        <p>Min/Max: ${data.minTemp}°C / ${data.maxTemp}°C</p>
    `;

    forecast.innerHTML = `
        <p>Next 24 Hours: ${data.forecast24h}</p>
        <p>Next 7 Days: ${data.forecast7d}</p>
    `;
}

function setupWeatherAlerts() {
    const alertsModal = document.createElement('div');
    alertsModal.className = 'alerts-modal';
    alertsModal.innerHTML = `
        <div class="modal-content">
            <h3>Set Weather Alerts</h3>
            <form id="alerts-form">
                <div class="form-group">
                    <label>Temperature Threshold (°C)</label>
                    <input type="number" id="temp-threshold" placeholder="Enter temperature">
                </div>
                <div class="form-group">
                    <label>Rainfall Alert (mm)</label>
                    <input type="number" id="rain-threshold" placeholder="Enter rainfall amount">
                </div>
                <div class="form-group">
                    <label>Wind Speed Alert (km/h)</label>
                    <input type="number" id="wind-threshold" placeholder="Enter wind speed">
                </div>
                <button type="submit" class="btn primary-btn">Save Alerts</button>
            </form>
        </div>
    `;
    document.body.appendChild(alertsModal);

    document.getElementById('alerts-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const alerts = {
            temperature: document.getElementById('temp-threshold').value,
            rainfall: document.getElementById('rain-threshold').value,
            windSpeed: document.getElementById('wind-threshold').value
        };

        try {
            await fetch('https://api.agriconnect.com/weather/alerts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(alerts)
            });
            showSuccess('Weather alerts set successfully!');
            alertsModal.remove();
        } catch (error) {
            console.error('Error setting weather alerts:', error);
            showError('Failed to set weather alerts. Please try again.');
        }
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Soil Analysis Buttons
    document.querySelector('.health-btn').addEventListener('click', analyzeSoilHealth);
    document.querySelector('.nutrients-btn').addEventListener('click', analyzeNutrientLevels);
    document.querySelector('.water-btn').addEventListener('click', analyzeWaterRetention);

    // Weather Controls
    document.querySelector('.refresh-btn').addEventListener('click', fetchWeatherData);
    document.querySelector('.alerts-btn').addEventListener('click', setupWeatherAlerts);

    // Initial weather data fetch
    fetchWeatherData();
});

// Notification Functions
function showSuccess(message) {
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function showError(message) {
    const notification = document.createElement('div');
    notification.className = 'notification error';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotBox = document.querySelector('.chatbot-box');
    const closeChat = document.querySelector('.close-chat');
    const chatInput = document.querySelector('.chat-input input');
    const sendMessage = document.querySelector('.send-message');
    const chatMessages = document.querySelector('.chat-messages');

    // Toggle chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotBox.classList.toggle('active');
    });

    // Close chatbot
    closeChat.addEventListener('click', () => {
        chatbotBox.classList.remove('active');
    });

    // Send message function
    function sendChatMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addMessage('user', message);
            chatInput.value = '';

            // Simulate bot response (replace with actual chatbot logic)
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                addMessage('bot', botResponse);
            }, 1000);
        }
    }

    // Add message to chat
    function addMessage(type, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        const icon = document.createElement('i');
        icon.className = type === 'bot' ? 'fas fa-robot' : 'fas fa-user';
        
        const messageText = document.createElement('p');
        messageText.textContent = text;

        messageDiv.appendChild(icon);
        messageDiv.appendChild(messageText);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Simple bot response logic (replace with more sophisticated chatbot)
    function getBotResponse(message) {
        message = message.toLowerCase();
        if (message.includes('hello') || message.includes('hi')) {
            return "Hello! How can I help you today?";
        } else if (message.includes('marketplace')) {
            return "Our marketplace features fresh produce directly from farmers. Would you like to browse our current offerings?";
        } else if (message.includes('disease') || message.includes('detection')) {
            return "Our AI-powered disease detection can help identify crop diseases. Would you like to try it out?";
        } else if (message.includes('price')) {
            return "Prices vary by product and season. You can check current prices in our marketplace section.";
        } else {
            return "I'm here to help with any questions about farming, our marketplace, or crop disease detection. Could you please be more specific?";
        }
    }

    // Send message on button click
    sendMessage.addEventListener('click', sendChatMessage);

    // Send message on Enter key
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
});

// Video access handling
function handleVideoAccess() {
    // Check if user is logged in
    const isLoggedIn = checkUserLoginStatus(); // You'll need to implement this based on your authentication system
    
    if (isLoggedIn) {
        // If logged in, redirect to videos page
        window.location.href = 'videos.html';
    } else {
        // If not logged in, show login/register modal
        showVideoAccessModal();
    }
}

function checkUserLoginStatus() {
    // Implement your login check logic here
    // For demo purposes, returning false to always show the modal
    return false;
}

function showVideoAccessModal() {
    // Create modal if it doesn't exist
    if (!document.querySelector('.video-access-modal')) {
        const modalHTML = `
            <div class="video-access-modal">
                <div class="access-modal-content">
                    <button class="close-access-modal">&times;</button>
                    <h2>Access Video Tutorials</h2>
                    <p>Please log in or register to access our farming tutorial videos.</p>
                    <div class="access-form">
                        <input type="email" placeholder="Email" required>
                        <input type="password" placeholder="Password" required>
                        <button onclick="processVideoAccess()">Login & Access Videos</button>
                    </div>
                    <p style="margin-top: 1rem; font-size: 0.9rem;">
                        Don't have an account? <a href="#" onclick="showRegistration()">Register here</a>
                    </p>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Add event listeners
        const modal = document.querySelector('.video-access-modal');
        const closeBtn = modal.querySelector('.close-access-modal');

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Show modal
    document.querySelector('.video-access-modal').classList.add('active');
}

function processVideoAccess() {
    // Implement your login logic here
    // For demo purposes, we'll just redirect to the videos page
    window.location.href = 'videos.html';
}

function showRegistration() {
    // Implement your registration logic here
    alert('Registration functionality to be implemented');
}

// Guide content data
const guideContent = {
    'crop-rotation': {
        title: 'Crop Rotation Basics',
        difficulty: 'beginner',
        readTime: '15 min',
        views: '1.2k',
        sections: [
            {
                id: 'introduction',
                title: 'Introduction',
                content: `
                    <img src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                         alt="Crop Rotation Field" class="guide-image">
                    <p>Crop rotation is a systematic approach to deciding which crops to plant 
                    where in your fields during a given year, and how to change the crops in 
                    those fields in subsequent years. This practice has been used for thousands 
                    of years and remains one of the most effective methods for maintaining 
                    soil health and preventing pest problems.</p>
                `
            },
            {
                id: 'benefits',
                title: 'Benefits of Crop Rotation',
                content: `
                    <div class="benefits-grid">
                        <div class="benefit-card">
                            <i class="fas fa-heart"></i>
                            <h3>Improved Soil Health</h3>
                            <p>Different crops add different nutrients to the soil</p>
                        </div>
                        <div class="benefit-card">
                            <i class="fas fa-bug-slash"></i>
                            <h3>Pest Control</h3>
                            <p>Reduces pest populations by breaking their lifecycles</p>
                        </div>
                        <div class="benefit-card">
                            <i class="fas fa-seedling"></i>
                            <h3>Better Yields</h3>
                            <p>Increases crop productivity through improved soil conditions</p>
                        </div>
                    </div>
                `
            }
            // Add more sections as needed
        ]
    },
    'organic-farming': {
        title: 'Organic Farming Methods',
        difficulty: 'intermediate',
        readTime: '20 min',
        views: '2.5k',
        sections: [
            {
                id: 'introduction',
                title: 'Introduction to Organic Farming',
                content: `
                    <img src="https://images.unsplash.com/photo-1592982537447-6f2a1a4c9acf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                         alt="Organic Farming" class="guide-image">
                    <p>Organic farming is a method of crop and livestock production that involves 
                    much more than choosing not to use pesticides, fertilizers, genetically 
                    modified organisms, antibiotics, and growth hormones.</p>
                `
            }
            // Add more sections as needed
        ]
    }
};

// Function to show guide content
function showGuideContent(guideId) {
    const guide = guideContent[guideId];
    if (!guide) return;

    // Update guide info
    document.querySelector('.difficulty-level').textContent = 
        guide.difficulty.charAt(0).toUpperCase() + guide.difficulty.slice(1) + ' Level';
    document.querySelector('.read-time').textContent = guide.readTime + ' read';
    document.querySelector('.view-count').textContent = guide.views + ' views';

    // Generate table of contents
    const tocList = document.querySelector('.toc-list');
    tocList.innerHTML = guide.sections.map(section => `
        <li><a href="#${section.id}">${section.title}</a></li>
    `).join('');

    // Generate main content
    const mainContent = document.querySelector('.guide-main-content');
    mainContent.innerHTML = `
        <h1>${guide.title}</h1>
        ${guide.sections.map(section => `
            <section id="${section.id}" class="guide-section">
                <h2>${section.title}</h2>
                ${section.content}
            </section>
        `).join('')}
    `;

    // Show modal
    document.querySelector('.guide-modal').classList.add('active');
}

// Function to show all guides
function showAllGuides() {
    // Implement this function to show all available guides
    alert('View all guides functionality to be implemented');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Close guide modal
    const closeGuide = document.querySelector('.close-guide');
    const guideModal = document.querySelector('.guide-modal');

    closeGuide.addEventListener('click', () => {
        guideModal.classList.remove('active');
    });

    guideModal.addEventListener('click', (e) => {
        if (e.target === guideModal) {
            guideModal.classList.remove('active');
        }
    });

    // Download PDF functionality
    document.querySelector('.download-pdf').addEventListener('click', () => {
        alert('PDF download functionality to be implemented');
    });

    // Share functionality
    document.querySelector('.share-guide').addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: document.title,
                text: 'Check out this farming guide!',
                url: window.location.href
            });
        } else {
            alert('Share functionality to be implemented');
        }
    });

    // Table of contents highlighting
    document.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.guide-section');
        const tocLinks = document.querySelectorAll('.toc-list a');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}); 