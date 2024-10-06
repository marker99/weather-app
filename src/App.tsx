import React, { useState } from 'react';
import { weatherService } from './services/weatherService';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import { Forecast } from './types/Forecast';
import { Weather } from './types/Weather';

const App: React.FC = () => {
    const [city, setCity] = useState('');
    const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);
    const [forecast, setForecast] = useState<Forecast[] | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        try {
            setError('');
            setLoading(true);
            const [weatherData, forecastData] = await Promise.all([
                weatherService.getCurrentWeather(city),
                weatherService.getFiveDayForecast(city)
            ]);
            setCurrentWeather(weatherData);
            setForecast(forecastData);
        } catch (err) {
            setError('Error fetching weather data: ' + err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 space-y-4">
            <div>
                <h1 className="text-3xl font-bold text-center">Weather App</h1>
                <h2 className="text-lg font-semibold text-center">Enter a city to get the current weather and 5-day forecast</h2>
            </div>

            <div className="flex justify-center mb-4 max-w-sm mx-auto">
                <input
                    type="text"
                    className="border p-2 rounded-md mr-2 grow"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white p-2 rounded-md"
                    onClick={handleSearch}
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}
            {currentWeather && <WeatherCard weather={currentWeather} city={city} />}
            {forecast && <ForecastCard forecast={forecast} />}
        </div>
    );
};

export default App;