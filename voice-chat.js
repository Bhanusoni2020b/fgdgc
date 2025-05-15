class VoiceChat {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.finalTranscript = '';
        this.interimTranscript = '';
        this.audioContext = null;
        this.analyser = null;
        this.audioSource = null;
        this.audioDataArray = null;
        this.initialize();
    }

    initialize() {
        // Check for browser support
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.error('Speech recognition not supported in this browser');
            this.showMessage('Your browser does not support speech recognition. Please use Chrome, Edge, or Safari.', 'error');
            return;
        }

        try {
            // Initialize speech recognition
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.recognition.lang = 'en-US';
            
            // For better mobile support
            this.recognition.maxAlternatives = 1;
            
            // Set a timeout for recognition
            this.recognitionTimeout = null;

            // Event handlers
            this.recognition.onstart = () => {
                this.isListening = true;
                this.updateUI(true);
            };

            this.recognition.onend = () => {
                this.isListening = false;
                this.updateUI(false);
            };

            this.recognition.onresult = (event) => {
                this.interimTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        this.finalTranscript = transcript;
                        this.processCommand(transcript);
                    } else {
                        this.interimTranscript += transcript;
                    }
                }
                this.updateTranscript();
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error', event.error);
                this.isListening = false;
                this.updateUI(false);
                this.showMessage('Error: ' + event.error, 'error');
            };
        } catch (error) {
            console.error('Error initializing speech recognition:', error);
            this.showMessage('Error initializing voice recognition', 'error');
        }
    }

    toggleListening() {
        if (this.isListening) {
            this.stopListening();
        } else {
            this.startListening();
        }
    }

    startListening() {
        try {
            // Clear any previous timeouts
            if (this.recognitionTimeout) {
                clearTimeout(this.recognitionTimeout);
            }
            
            this.finalTranscript = '';
            this.interimTranscript = '';
            this.updateTranscript();
            
            // Request microphone permission
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(() => {
                    // Microphone access granted, start recognition
                    this.recognition.start();
                    
                    // Set a timeout in case the recognition doesn't start properly
                    this.recognitionTimeout = setTimeout(() => {
                        if (!this.isListening) {
                            this.showMessage('Could not access microphone. Please check your browser permissions.', 'error');
                            this.updateUI(false);
                        }
                    }, 1000);
                })
                .catch(error => {
                    console.error('Microphone access denied:', error);
                    this.showMessage('Microphone access is required for voice commands. Please allow microphone access in your browser settings.', 'error');
                    this.updateUI(false);
                });
                
        } catch (error) {
            console.error('Error starting speech recognition:', error);
            this.showMessage('Error: ' + (error.message || 'Could not start voice recognition'), 'error');
            this.updateUI(false);
        }
    }

    stopListening() {
        try {
            if (this.recognition) {
                this.recognition.stop();
            }
            this.isListening = false;
            this.updateUI(false);
            
            // Clear any pending timeouts
            if (this.recognitionTimeout) {
                clearTimeout(this.recognitionTimeout);
                this.recognitionTimeout = null;
            }
        } catch (error) {
            console.error('Error stopping recognition:', error);
        }
    }

    processCommand(command) {
        // Convert command to lowercase for easier processing
        const cmd = command.toLowerCase().trim();
        console.log('Processing command:', cmd);
        
        // Simple command processing - you can expand this based on your needs
        let response = "I'm not sure how to respond to that. You can ask me about login, password reset, or other account-related questions.";
        
        if (cmd.includes('hello') || cmd.includes('hi') || cmd.includes('hey')) {
            response = 'Hello! How can I help you today?';
        } else if (cmd.includes('how are you')) {
            response = 'I\'m just a bot, but I\'m here to help you with AgriConnect!';
        } else if (cmd.includes('login') || cmd.includes('sign in') || cmd.includes('log in')) {
            response = 'You can log in using the form on this page. Please enter your username and password.';
        } else if (cmd.includes('forgot password') || cmd.includes('reset password')) {
            response = 'You can reset your password by clicking on the "Forgot Password" link below the login form.';
        } else if (cmd.includes('username') || cmd.includes('user name')) {
            response = 'Your username is usually the email address you used to sign up. If you can\'t remember it, please contact support.';
        } else if (cmd.includes('help')) {
            response = 'I can help you with:\n• Login issues\n• Password reset\n• Account questions\n• Navigation help\n\nWhat do you need help with?';
        } else if (cmd.includes('thank')) {
            response = 'You\'re welcome! Is there anything else I can help you with?';
        } else if (cmd.includes('bye') || cmd.includes('goodbye')) {
            response = 'Goodbye! Have a great day!';
        }
        
        this.speak(response);
        this.showMessage(response, 'bot');
    }

    speak(text) {
        if ('speechSynthesis' in window) {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();
            
            // Create a new utterance
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            
            // Handle speech synthesis errors
            utterance.onerror = (event) => {
                console.error('Speech synthesis error:', event);
                this.showMessage('Error: Could not speak the response', 'error');
            };
            
            // Speak the text
            window.speechSynthesis.speak(utterance);
        } else {
            console.warn('Text-to-speech not supported in this browser');
        }
    }

    updateUI(isListening) {
        const micBtn = document.getElementById('voiceChatBtn');
        const micVisualization = document.getElementById('micVisualization');
        const statusIndicator = document.getElementById('voiceStatus');
        
        if (micBtn && micVisualization && statusIndicator) {
            if (isListening) {
                micBtn.classList.add('listening');
                micBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                micVisualization.style.display = 'flex';
                statusIndicator.textContent = 'Listening...';
                this.startAudioVisualization();
            } else {
                micBtn.classList.remove('listening');
                micBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                micVisualization.style.display = 'none';
                statusIndicator.textContent = 'Click to speak';
                this.stopAudioVisualization();
            }
        }
    }

    startAudioVisualization() {
        if (this.audioContext) return;
        
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 64;
            this.audioDataArray = new Uint8Array(this.analyser.frequencyBinCount);
            
            navigator.mediaDevices.getUserMedia({ audio: true, video: false })
                .then(stream => {
                    this.audioSource = this.audioContext.createMediaStreamSource(stream);
                    this.audioSource.connect(this.analyser);
                    this.updateVisualization();
                })
                .catch(err => {
                    console.error('Error accessing microphone:', err);
                    this.showMessage('Error accessing microphone. Please check permissions.', 'error');
                });
        } catch (e) {
            console.error('AudioContext not supported', e);
        }
    }
    
    stopAudioVisualization() {
        if (this.audioContext) {
            if (this.audioSource) {
                this.audioSource.disconnect();
                this.audioSource = null;
            }
            if (this.analyser) {
                this.analyser.disconnect();
                this.analyser = null;
            }
            this.audioContext.close();
            this.audioContext = null;
            this.audioDataArray = null;
        }
    }
    
    updateVisualization() {
        if (!this.analyser || !this.audioDataArray) return;
        
        this.analyser.getByteFrequencyData(this.audioDataArray);
        
        const bars = document.querySelectorAll('.mic-bar');
        const step = Math.floor(this.audioDataArray.length / bars.length);
        
        bars.forEach((bar, i) => {
            const value = this.audioDataArray[i * step] || 0;
            const height = `${Math.min(100, value / 2.55)}%`;
            bar.style.height = height;
            bar.style.opacity = value > 10 ? '1' : '0.4';
        });
        
        if (this.isListening) {
            requestAnimationFrame(() => this.updateVisualization());
        }
    }

    updateTranscript() {
        const transcriptElement = document.getElementById('voiceTranscript');
        if (transcriptElement) {
            transcriptElement.textContent = this.finalTranscript || this.interimTranscript;
        }
    }

    showMessage(text, sender) {
        const chatContainer = document.getElementById('voiceChatMessages');
        if (!chatContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `voice-message ${sender}`;
        messageDiv.textContent = text;
        
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

// Initialize voice chat when the page loads
let voiceChat;
document.addEventListener('DOMContentLoaded', () => {
    voiceChat = new VoiceChat();
    
    const voiceButton = document.getElementById('voiceChatButton');
    const voicePanel = document.getElementById('voiceChatPanel');
    const closeButton = document.getElementById('voiceChatClose');
    
    // Toggle voice listening
    if (voiceButton) {
        voiceButton.addEventListener('click', (e) => {
            e.stopPropagation();
            voiceChat.toggleListening();
            voicePanel.classList.add('active');
        });
    }
    
    // Toggle panel visibility
    if (voiceButton && voicePanel) {
        voiceButton.addEventListener('click', (e) => {
            e.stopPropagation();
            voicePanel.classList.toggle('active');
        });
    }
    
    // Close panel when clicking the close button
    if (closeButton) {
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            voicePanel.classList.remove('active');
            if (voiceChat.isListening) {
                voiceChat.stopListening();
            }
        });
    }
    
    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!voicePanel.contains(e.target) && e.target !== voiceButton) {
            voicePanel.classList.remove('active');
            if (voiceChat.isListening) {
                voiceChat.stopListening();
            }
        }
    });
    
    // Prevent panel from closing when clicking inside it
    voicePanel.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Add keyboard shortcut (Ctrl+Space) to toggle voice
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.code === 'Space') {
            e.preventDefault();
            voiceChat.toggleListening();
            if (voicePanel) {
                voicePanel.classList.add('active');
            }
        }
    });
    
    // Add welcome message
    setTimeout(() => {
        voiceChat.showMessage("You can ask me questions like:\n\n• 'How do I reset my password?'\n• 'What is AgriConnect?'\n• 'I need help with login'", 'bot');
    }, 1000);
});
