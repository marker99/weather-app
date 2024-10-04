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
        <div className="p-4">
            <h1 className="text-3xl font-bold text-center mb-5">Weather App</h1>
            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    className="border p-2 rounded-md mr-2"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSearch}>
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
