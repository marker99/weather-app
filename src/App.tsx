import React, { useState } from 'react';
import { weatherService } from './services/weatherService';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import { Forecast } from './types/Forecast';
import { Weather } from './types/Weather';

const App: React.FC = () => {
    // State management for the weather app
    const [city, setCity] = useState('');  // Stores the user input for city name
    const [displayCity, setDisplayCity] = useState(''); // For displaying the city in the WeatherCard
    const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);  // Stores current weather data
    const [forecast, setForecast] = useState<Forecast[] | null>(null);  // Stores forecast data
    const [error, setError] = useState('');  // Stores any error messages
    const [loading, setLoading] = useState(false);  // Indicates if data is being fetched

    // Function to handle the search action
    const handleSearch = async () => {
        if (!city.trim()) return;  // Don't search if the city input is empty

        try {
            setError('');  // Clear any previous errors
            setLoading(true);  // Set loading state to true

            // Fetch weather and forecast data concurrently
            const [weatherData, forecastData] = await Promise.all([
                weatherService.getCurrentWeather(city),
                weatherService.getFiveDayForecast(city)
            ]);

            // Update state with fetched data
            setCurrentWeather(weatherData);
            setForecast(forecastData);
            setDisplayCity(city);
        } catch (err) {
            setError('Error fetching weather data. Please try again. ' + err); // Display error message
        } finally {
            setLoading(false); // Set loading state to false
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f77a33] to-[#f7e468] p-6">
            <div className="max-w-4xl mx-auto space-y-4">

                {/* App title */}
                <h1 className="text-4xl font-bold text-white mb-6 text-center">Weather Forecast</h1>

                {/* Search section */}
                <div className="bg-white rounded-lg shadow-lg p-4 ">
                    <div className="flex items-center space-x-2">

                        {/* City input field */}
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter a city name"
                            className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />

                        {/* Search button */}
                        <button
                            onClick={handleSearch}
                            disabled={loading}
                            className=" text-white px-6 rounded-md bg-gradient-to-r from-[#f77a33] to-[#f7e468] border border-gray-100 focus:outline-none w-40"
                        >
                            {loading ? 'Searching...' : 'Search'}
                        </button>
                    </div>

                    {/* Error message display */}
                    {error && (
                        <p className="bg-red-100 border border-red-400 text-red-700 rounded p-2 my-2" >
                            {error}
                        </p>
                    )}
                </div>

                {/* Current weather display */}
                {currentWeather && <WeatherCard weather={currentWeather} city={displayCity} />}

                {/* Forecast display */}
                {forecast && <ForecastCard forecast={forecast} />}
            </div>
        </div>
    );
};

export default App;