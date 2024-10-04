import { useState } from 'react'
import './App.css'
import { fetchWeather } from './services/weatherService';
import WeatherCard from './components/WeatherCard';
import { WeatherData } from './types/WeatherData';

function App() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            setError('');
            const data = await fetchWeather(city);
            console.log(data);
            setWeather(data);
        }
        catch (err) {
            setError('Error fetching weather data: ' + err);
        }
    };

    return (
        <div className="">
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
        </div>
    );
};

export default App;
