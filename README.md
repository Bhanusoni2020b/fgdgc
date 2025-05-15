# AI-Driven Crop Disease Prediction and Management System

Our project, an AI-Driven Crop Disease Prediction and Management System, aims to help farmers detect crop diseases early and manage risks efficiently. By leveraging AI and ML, our system analyzes crop images, environmental conditions, and soil data to predict disease outbreaks. It provides actionable insights, disease identification, and treatment recommendations through a mobile and web-based platform.

## Features

- **Crop Disease Detection**: AI-powered image analysis to identify plant diseases
- **Weather Integration**: Real-time weather data and agricultural recommendations
- **Dynamic Pricing**: AI-powered pricing and demand forecasting
- **Weather & Soil Analysis**: Optimize farming decisions based on environmental factors
- **AI Chatbot**: Get instant help and access critical information

## Weather Integration

We've integrated the OpenWeatherMap API to provide real-time weather information specifically tailored for agricultural needs. The weather widget includes:

- Current temperature and "feels like" temperature
- Humidity and wind speed
- Weather conditions and descriptions
- Agricultural advice based on current weather
- Automatic location detection
- 30-minute data caching to reduce API calls

To use the weather widget, simply include the `weather.js` file in your HTML and use the `weatherService` object to fetch weather data.

### Getting Started with Weather API

1. Get your API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Replace `YOUR_API_KEY_HERE` in `weather.js` with your actual API key
3. Include the script in your HTML:
   ```html
   <script src="weather.js"></script>
   ```
4. Use the weather service:
   ```javascript
   // Get weather for specific coordinates
   weatherService.getWeatherByLocation(latitude, longitude)
       .then(weather => console.log(weather));
   ```

## Setup

1. Clone the repository
2. Open `index.html` in your browser to view the application
3. For weather functionality, make sure to add your OpenWeatherMap API key

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
