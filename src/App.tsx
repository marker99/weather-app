import { useState } from 'react'
import { fetchForecast, fetchWeather } from './services/weatherService';
import WeatherCard from './components/WeatherCard';
import { WeatherData } from './types/WeatherData';
import { DailyForecast } from './types/ForecastData';
import ForecastCard from './components/ForecastCard';

function App() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<DailyForecast[] | null>(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            setError('');
            const data = await fetchWeather(city);
            const forecastData = await fetchForecast(city);
            setWeather(data);
            setForecast(forecastData);
        }
        catch (err) {
            setError('Error fetching weather data: ' + err);
        }
    };

    return (
        <div className="p-4 space-y-4">
            <div>
                <h1 className="text-3xl font-bold text-center">Weather App</h1>
                <h2 className="text-lg font-semibold text-center">Enter a city to get the current weather and 5-day forecast</h2>
            </div>

            {/* Search input */}
            <div className="flex justify-center mb-4 max-w-sm mx-auto">
                <input
                    type="text"
                    className="border p-2 rounded-md mr-2 grow"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button className="bg-blue-500 text-white" onClick={handleSearch}>
                    Search
                </button>
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}
            {weather && <WeatherCard {...weather} />} {/* Pass props directly */}
            {forecast && <ForecastCard forecast={forecast} />}
        </div>
    );
};

export default App;
