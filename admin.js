// Admin Panel JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Check if admin is authenticated
    checkAdminAuth();
    
    // Initialize the dashboard
    initDashboard();
    
    // Set up event listeners
    setupEventListeners();
});

function checkAdminAuth() {
    // In a real application, verify authentication on the server side
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    const isLoginPage = window.location.pathname.includes('admin-login.html');
    
    if (!isAuthenticated && !isLoginPage) {
        window.location.href = 'admin-login.html';
    } else if (isAuthenticated && isLoginPage) {
        window.location.href = 'admin-dashboard.html';
    }
}

function initDashboard() {
    // Show the dashboard section by default
    showSection('dashboard');
    
    // Update the active menu item
    updateActiveMenuItem('dashboard');
    
    // Load initial data
    loadDashboardData();
}

function setupEventListeners() {
    // Menu navigation
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            showSection(section);
            updateActiveMenuItem(section);
        });
    });
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logoutAdmin();
        });
    }
    
    // Login form submission
    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.dashboard-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the selected section
    const activeSection = document.getElementById(`${sectionId}Section`);
    if (activeSection) {
        activeSection.classList.add('active');
    }
    
    // Load section-specific data
    switch(sectionId) {
        case 'inquiries':
            loadInquiries();
            break;
        case 'users':
            loadUsers();
            break;
        case 'content':
            loadContent();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

function updateActiveMenuItem(sectionId) {
    // Remove active class from all menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to the selected menu item
    const activeItem = document.querySelector(`.menu-item[data-section="${sectionId}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // In a real application, verify these credentials on the server
    if (username === 'AgriConnect' && password === '9826556327') {
        // Store admin session (in a real app, use proper session management)
        localStorage.setItem('adminAuthenticated', 'true');
        window.location.href = 'admin-dashboard.html';
    } else {
        if (errorMessage) {
            errorMessage.style.display = 'block';
        }
    }
}

function logoutAdmin() {
    // Clear authentication
    localStorage.removeItem('adminAuthenticated');
    window.location.href = 'admin-login.html';
}

// Data loading functions
function loadDashboardData() {
    // In a real application, fetch this data from your backend
    console.log('Loading dashboard data...');
    // Simulate API call
    setTimeout(() => {
        updateDashboardStats({
            totalUsers: 1254,
            activeSessions: 247,
            pendingInquiries: 18,
            totalRevenue: 12450
        });
    }, 500);
}

function updateDashboardStats(stats) {
    // Update the dashboard cards with the latest stats
    if (document.querySelector('.dashboard-cards')) {
        const cards = document.querySelectorAll('.card .value');
        if (cards.length >= 4) {
            cards[0].textContent = stats.totalUsers.toLocaleString();
            cards[1].textContent = stats.activeSessions.toLocaleString();
            cards[2].textContent = stats.pendingInquiries.toLocaleString();
            cards[3].textContent = `$${stats.totalRevenue.toLocaleString()}`;
        }
    }
}

function loadInquiries() {
    // In a real application, fetch inquiries from your backend
    console.log('Loading inquiries...');
    // Simulate API call
    setTimeout(() => {
        const inquiries = [
            { id: 1, name: 'John Farmer', email: 'john@example.com', subject: 'Question about organic farming', status: 'pending', date: '2023-06-15' },
            { id: 2, name: 'Sarah Agronomist', email: 'sarah@example.com', subject: 'Partnership inquiry', status: 'in-progress', date: '2023-06-14' },
            { id: 3, name: 'Mike Grower', email: 'mike@example.com', subject: 'Technical issue with account', status: 'resolved', date: '2023-06-13' }
        ];
        
        displayInquiries(inquiries);
    }, 500);
}

function displayInquiries(inquiries) {
    const container = document.getElementById('inquiriesSection');
    if (!container) return;
    
    let html = `
        <h2>User Inquiries</h2>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    inquiries.forEach(inquiry => {
        const statusClass = getStatusClass(inquiry.status);
        html += `
            <tr>
                <td>#${inquiry.id}</td>
                <td>${inquiry.name}</td>
                <td>${inquiry.email}</td>
                <td>${inquiry.subject}</td>
                <td><span class="badge ${statusClass}">${inquiry.status}</span></td>
                <td>${inquiry.date}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="viewInquiry(${inquiry.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                </td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    container.innerHTML = html;
}

function getStatusClass(status) {
    switch(status.toLowerCase()) {
        case 'pending':
            return 'badge-warning';
        case 'in-progress':
            return 'badge-info';
        case 'resolved':
            return 'badge-success';
        default:
            return 'badge-secondary';
    }
}

function loadUsers() {
    // In a real application, fetch users from your backend
    console.log('Loading users...');
    // Simulate API call
    setTimeout(() => {
        const users = [
            { id: 1, name: 'John Farmer', email: 'john@example.com', role: 'farmer', joinDate: '2023-01-15' },
            { id: 2, name: 'Sarah Agronomist', email: 'sarah@example.com', role: 'expert', joinDate: '2023-02-20' },
            { id: 3, name: 'Mike Grower', email: 'mike@example.com', role: 'farmer', joinDate: '2023-03-10' }
        ];
        
        displayUsers(users);
    }, 500);
}

function displayUsers(users) {
    const container = document.getElementById('usersSection');
    if (!container) return;
    
    let html = `
        <h2>Manage Users</h2>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Join Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    users.forEach(user => {
        html += `
            <tr>
                <td>#${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${user.joinDate}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="viewUser(${user.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-warning" onclick="editUser(${user.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    container.innerHTML = html;
}

function loadContent() {
    // In a real application, fetch content from your backend
    console.log('Loading content...');
    document.getElementById('contentSection').innerHTML = `
        <h2>Content Management</h2>
        <p>Manage website content, articles, and resources.</p>
        <div class="alert alert-info">
            <i class="fas fa-info-circle"></i> Content management features will be implemented here.
        </div>
    `;
}

function loadSettings() {
    // In a real application, fetch settings from your backend
    console.log('Loading settings...');
    document.getElementById('settingsSection').innerHTML = `
        <h2>Settings</h2>
        <p>Configure system settings and preferences.</p>
        <div class="alert alert-info">
            <i class="fas fa-info-circle"></i> Settings management features will be implemented here.
        </div>
    `;
}

// These functions would be called from button clicks in the UI
function viewInquiry(id) {
    alert(`Viewing inquiry #${id}`);
    // In a real application, show a modal with inquiry details
}

function viewUser(id) {
    alert(`Viewing user #${id}`);
    // In a real application, show a modal with user details
}

function editUser(id) {
    alert(`Editing user #${id}`);
    // In a real application, show an edit form for the user
}

function deleteUser(id) {
    if (confirm(`Are you sure you want to delete user #${id}?`)) {
        alert(`User #${id} deleted`);
        // In a real application, make an API call to delete the user
    }
}
