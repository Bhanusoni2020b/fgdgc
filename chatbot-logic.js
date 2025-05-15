// Agricultural Knowledge Base
const agriculturalResponses = {
    // Disease Detection
    disease: {
        general: "To help identify the disease, please:\n1. Share a clear image of the affected plant\n2. Describe the symptoms\n3. Mention when you first noticed the problem",
        symptoms: {
            "yellow leaves": "Yellow leaves could indicate:\n- Nitrogen deficiency\n- Overwatering\n- Root disease\nCan you share an image for more accurate diagnosis?",
            "spots": "Spots on leaves might be caused by:\n- Fungal infection\n- Bacterial disease\n- Pest damage\nWhat color are the spots?",
            "wilting": "Wilting could be due to:\n- Water stress\n- Root problems\n- Bacterial wilt\nHave you checked the soil moisture?"
        }
    },

    // Weather Related
    weather: {
        general: "I can provide weather-based recommendations. What specific information do you need?\n- Current conditions\n- Weekly forecast\n- Seasonal planning",
        advisory: {
            "rain": "With rain expected:\n1. Delay pesticide application\n2. Check drainage systems\n3. Consider crop protection measures",
            "drought": "During dry conditions:\n1. Implement water conservation\n2. Use mulching\n3. Adjust irrigation schedule",
            "frost": "Frost protection measures:\n1. Use crop covers\n2. Maintain soil moisture\n3. Consider wind breaks"
        }
    },

    // Crop Management
    crops: {
        planting: {
            "rice": "Best practices for rice cultivation:\n1. Optimal planting time: June-July\n2. Soil preparation: Well-leveled, puddled soil\n3. Spacing: 20x15 cm\n4. Water management crucial",
            "wheat": "Wheat cultivation guide:\n1. Sowing time: October-November\n2. Seed rate: 100-125 kg/ha\n3. Row spacing: 20-22 cm\n4. Regular irrigation needed",
            "cotton": "Cotton growing tips:\n1. Plant in spring when soil warms\n2. Spacing: 90-120 cm between rows\n3. Regular pest monitoring\n4. Balanced fertilization"
        },
        fertilizer: {
            "organic": "Organic fertilizer options:\n1. Compost\n2. Vermicompost\n3. Green manure\n4. Animal manure",
            "chemical": "Chemical fertilizer guidelines:\n1. NPK based on soil test\n2. Split application\n3. Proper timing\n4. Consider soil pH"
        }
    },

    // Pest Control
    pests: {
        general: "For pest control advice, please specify:\n1. Crop type\n2. Pest description\n3. Damage symptoms",
        solutions: {
            "aphids": "Aphid control methods:\n1. Neem oil spray\n2. Ladybugs (natural predators)\n3. Insecticidal soap\n4. Strong water spray",
            "caterpillars": "Caterpillar management:\n1. Bt spray\n2. Hand picking\n3. Pheromone traps\n4. Natural predators",
            "mites": "Mite control:\n1. Sulfur spray\n2. Predatory mites\n3. Neem oil\n4. Proper spacing"
        }
    }
};

// Message Templates
const messageTemplates = {
    welcome: "👋 Hello! I'm your AgriBot assistant. I can help you with:\n\n" +
            "🌱 Crop Management\n" +
            "🔍 Disease Detection\n" +
            "🐛 Pest Control\n" +
            "🌤️ Weather Advisory\n" +
            "💧 Irrigation Tips\n\n" +
            "How can I assist you today?",
    
    needMoreInfo: "Could you please provide more details about:",
    noUnderstand: "I'm not sure I understood that. Could you rephrase or choose from the quick actions below?",
    imageRequest: "Could you share an image for better analysis?",
    expertRedirect: "This seems complex. Would you like me to connect you with an agricultural expert?"
};

class AgriBot {
    constructor() {
        this.context = {
            lastTopic: null,
            cropType: null,
            userLocation: null,
            conversationHistory: []
        };
    }

    // Process user input
    async processMessage(message) {
        message = message.toLowerCase();
        this.context.conversationHistory.push({ role: 'user', content: message });

        // Check for greetings
        if (this.isGreeting(message)) {
            return messageTemplates.welcome;
        }

        // Process based on keywords
        if (message.includes('disease') || message.includes('sick') || message.includes('symptoms')) {
            return this.handleDiseaseQuery(message);
        }

        if (message.includes('weather') || message.includes('rain') || message.includes('forecast')) {
            return this.handleWeatherQuery(message);
        }

        if (message.includes('pest') || message.includes('insect') || message.includes('bug')) {
            return this.handlePestQuery(message);
        }

        if (this.isCropRelated(message)) {
            return this.handleCropQuery(message);
        }

        // Default response if no specific topic is identified
        return this.getDefaultResponse();
    }

    // Helper methods
    isGreeting(message) {
        const greetings = ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'];
        return greetings.some(greeting => message.includes(greeting));
    }

    isCropRelated(message) {
        const crops = ['rice', 'wheat', 'cotton', 'corn', 'maize', 'soybean', 'potato'];
        return crops.some(crop => message.includes(crop));
    }

    // Topic handlers
    handleDiseaseQuery(message) {
        this.context.lastTopic = 'disease';
        
        // Check for specific symptoms
        for (let symptom in agriculturalResponses.disease.symptoms) {
            if (message.includes(symptom)) {
                return agriculturalResponses.disease.symptoms[symptom];
            }
        }
        
        return agriculturalResponses.disease.general;
    }

    handleWeatherQuery(message) {
        this.context.lastTopic = 'weather';
        
        // Check for specific weather conditions
        for (let condition in agriculturalResponses.weather.advisory) {
            if (message.includes(condition)) {
                return agriculturalResponses.weather.advisory[condition];
            }
        }
        
        return agriculturalResponses.weather.general;
    }

    handlePestQuery(message) {
        this.context.lastTopic = 'pests';
        
        // Check for specific pests
        for (let pest in agriculturalResponses.pests.solutions) {
            if (message.includes(pest)) {
                return agriculturalResponses.pests.solutions[pest];
            }
        }
        
        return agriculturalResponses.pests.general;
    }

    handleCropQuery(message) {
        this.context.lastTopic = 'crops';
        
        // Check for specific crops
        for (let crop in agriculturalResponses.crops.planting) {
            if (message.includes(crop)) {
                this.context.cropType = crop;
                return agriculturalResponses.crops.planting[crop];
            }
        }
        
        // Check for fertilizer queries
        if (message.includes('fertilizer') || message.includes('nutrient')) {
            if (message.includes('organic')) {
                return agriculturalResponses.crops.fertilizer.organic;
            }
            return agriculturalResponses.crops.fertilizer.chemical;
        }
        
        return "Please specify which crop you're interested in, and I'll provide detailed guidance.";
    }

    getDefaultResponse() {
        return messageTemplates.noUnderstand;
    }
}

// Export the AgriBot class
window.AgriBot = AgriBot; 