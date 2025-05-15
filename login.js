document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const rememberMe = document.getElementById('rememberMe');
    const socialButtons = document.querySelectorAll('.social-btn');
    const languageSelector = document.querySelector('.language-selector select');

    // Check for saved credentials
    const savedUsername = localStorage.getItem('savedUsername');
    const savedPassword = localStorage.getItem('savedPassword');
    
    if (savedUsername && savedPassword) {
        usernameInput.value = savedUsername;
        passwordInput.value = savedPassword;
        rememberMe.checked = true;
    }

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error states
        resetErrors();
        
        // Get input values
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Simple validation
        let isValid = true;
        
        if (!username) {
            showError(usernameInput, 'Username or email is required');
            isValid = false;
        }
        
        if (!password) {
            showError(passwordInput, 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            showError(passwordInput, 'Password must be at least 6 characters');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Save credentials if "Remember me" is checked
        if (rememberMe.checked) {
            localStorage.setItem('savedUsername', username);
            localStorage.setItem('savedPassword', password);
        } else {
            localStorage.removeItem('savedUsername');
            localStorage.removeItem('savedPassword');
        }
        
        // Simulate login (replace with actual API call)
        simulateLogin(username, password);
    });
    
    // Social login handlers
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
            alert(`Redirecting to ${provider} login...`);
            // In a real app, this would redirect to the OAuth provider
        });
    });
    
    // Language selector
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            const selectedLanguage = this.value;
            alert(`Language changed to: ${this.options[this.selectedIndex].text}`);
            // In a real app, this would change the language of the page
        });
    }
    
    // Show error message for a specific input
    function showError(input, message) {
        input.classList.add('input-error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }
    
    // Reset all error states
    function resetErrors() {
        document.querySelectorAll('.input-error').forEach(el => {
            el.classList.remove('input-error');
        });
        
        document.querySelectorAll('.error-message').forEach(el => {
            el.remove();
        });
    }
    
    // Simulate login (replace with actual API call)
    function simulateLogin(username, password) {
        // Show loading state
        const submitButton = loginForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
        
        // Simulate API call
        setTimeout(() => {
            // This is a simulation - in a real app, you would make an API call here
            const isAuthenticated = checkCredentials(username, password);
            
            if (isAuthenticated) {
                // Show success message
                showSuccess('Login successful! Redirecting...');
                
                // Redirect to dashboard after a delay
                setTimeout(() => {
                    window.location.href = 'index.html'; // Change to your dashboard page
                }, 1500);
            } else {
                // Show error message
                showError(usernameInput, 'Invalid username or password');
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
        }, 1500);
    }
    
    // Check credentials (replace with actual authentication logic)
    function checkCredentials(username, password) {
        // This is a simple check for demonstration
        // In a real app, you would verify credentials against your backend
        const validUsers = [
            { username: 'AgriConnect', password: '9826556327' },
            { username: 'farmer', password: 'farmer123' },
            { username: 'expert', password: 'expert123' }
        ];
        
        return validUsers.some(user => 
            (user.username === username || user.email === username) && 
            user.password === password
        );
    }
    
    // Show success message
    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        
        // Insert before the form
        loginForm.parentNode.insertBefore(successDiv, loginForm);
    }
});
