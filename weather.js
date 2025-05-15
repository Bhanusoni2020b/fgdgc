// OpenWeatherMap API Integration for AgriConnect
const WEATHER_API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

class WeatherService {
    constructor() {
        this.cache = new Map();
        this.CACHE_DURATION = 30 * 60 * 1000; // 30 minutes cache
    }

    async getWeatherByLocation(lat, lon) {
        const cacheKey = `${lat},${lon}`;
        const cached = this.cache.get(cacheKey);
        
        // Return cached data if it's still valid
        if (cached && (Date.now() - cached.timestamp) < this.CACHE_DURATION) {
            return cached.data;
        }

        try {
            const response = await fetch(
                `${WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
            );
            
            if (!response.ok) {
                throw new Error('Weather data not available');
            }
            
            const data = await response.json();
            const weatherData = this._formatWeatherData(data);
            
            // Cache the new data
            this.cache.set(cacheKey, {
                data: weatherData,
                timestamp: Date.now()
            });
            
            return weatherData;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            return {
                error: 'Unable to fetch weather data. Please try again later.'
            };
        }
    }

    _formatWeatherData(data) {
        // Get weather condition for agricultural recommendations
        const getWeatherCondition = (weatherId) => {
            if (weatherId >= 200 && weatherId < 300) return 'thunderstorm';
            if (weatherId >= 300 && weatherId < 400) return 'drizzle';
            if (weatherId >= 500 && weatherId < 600) return 'rain';
            if (weatherId >= 600 && weatherId < 700) return 'snow';
            if (weatherId >= 700 && weatherId < 800) return 'atmosphere';
            if (weatherId === 800) return 'clear';
            if (weatherId > 800) return 'clouds';
            return 'unknown';
        };

        // Get agricultural recommendations based on weather
        const getAgriculturalAdvice = (weatherId, temp) => {
            if (weatherId >= 200 && weatherId < 300) return 'Avoid field work during thunderstorms.';
            if (weatherId >= 300 && weatherId < 600) {
                if (temp > 25) return 'Good time for planting after rain.';
                return 'Avoid working on wet soil to prevent compaction.';
            }
            if (weatherId >= 600 && weatherId < 700) return 'Protect sensitive crops from frost.';
            if (temp > 30) return 'Ensure proper irrigation to prevent heat stress.';
            if (temp < 5) return 'Protect sensitive plants from frost.';
            return 'Good weather for farming activities.';
        };

        const condition = getWeatherCondition(data.weather[0].id);
        const advice = getAgriculturalAdvice(data.weather[0].id, data.main.temp);

        return {
            temperature: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            condition: condition,
            description: data.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            location: data.name,
            timestamp: new Date().toLocaleTimeString(),
            advice: advice
        };
    }
}

// Initialize weather service
const weatherService = new WeatherService();

// Example usage:
// To get weather for a specific location (e.g., latitude: 40.7128, longitude: -74.0060):
// weatherService.getWeatherByLocation(40.7128, -74.0060)
//     .then(weather => console.log(weather));

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = weatherService;
} else {
    window.weatherService = weatherService;
}
