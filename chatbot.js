document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.querySelector('.send-btn');
    const clearButton = document.querySelector('.clear-chat');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');
    const actionButtons = document.querySelectorAll('.action-btn');

    // Sample responses for demo
    const botResponses = {
        'identify disease': 'To identify crop diseases, please upload a clear image of the affected plant part. I can analyze it and provide potential diagnoses and treatment recommendations.',
        'crop schedule': 'I can help you create an optimal crop schedule. Please specify your location and the crops you\'re planning to grow.',
        'pest control': 'For pest control advice, I\'ll need to know:\n1. Type of crop\n2. Pest symptoms\n3. Current growth stage\nPlease provide these details.',
        'weather tips': 'I can provide weather-based farming recommendations. Would you like to know about:\n• Current weather impact\n• 7-day forecast\n• Season planning',
        'default': 'I\'m here to help! Please specify your farming query, and I\'ll provide relevant assistance.'
    };

    // Send message function
    function sendMessage(message, isUser = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

        const avatar = document.createElement('img');
        avatar.className = 'message-avatar';
        avatar.src = isUser ? 'assets/user-avatar.png' : 'assets/bot-avatar.png';
        avatar.alt = isUser ? 'User' : 'Bot';

        const content = document.createElement('div');
        content.className = 'message-content';
        content.textContent = message;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        chatMessages.appendChild(messageDiv);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // If user message, get bot response
        if (isUser) {
            setTimeout(() => {
                const response = getBotResponse(message);
                sendMessage(response, false);
            }, 500);
        }
    }

    // Get bot response
    function getBotResponse(message) {
        message = message.toLowerCase();
        
        if (message.includes('disease')) {
            return botResponses['identify disease'];
        } else if (message.includes('schedule')) {
            return botResponses['crop schedule'];
        } else if (message.includes('pest')) {
            return botResponses['pest control'];
        } else if (message.includes('weather')) {
            return botResponses['weather tips'];
        }
        
        return botResponses['default'];
    }

    // Event Listeners
    sendButton.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            sendMessage(message);
            userInput.value = '';
        }
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = userInput.value.trim();
            if (message) {
                sendMessage(message);
                userInput.value = '';
            }
        }
    });

    clearButton.addEventListener('click', () => {
        while (chatMessages.firstChild) {
            chatMessages.removeChild(chatMessages.firstChild);
        }
        // Add welcome message back
        const welcomeMessage = `Hello! I'm your agricultural assistant. I can help you with:
        • Crop disease identification
        • Farming best practices
        • Weather-based recommendations
        • Soil health guidance
        • Pest control solutions
        How can I assist you today?`;
        sendMessage(welcomeMessage, false);
    });

    // Handle suggestion chips
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const message = chip.textContent;
            sendMessage(message);
        });
    });

    // Handle quick action buttons
    actionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const message = button.textContent;
            sendMessage(message);
        });
    });
}); 