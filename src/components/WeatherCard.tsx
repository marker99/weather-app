import React from 'react';
import { Weather } from '../types/Weather';
import { Sun, Cloud, Droplet, Wind } from 'lucide-react';

// Define the props interface for the WeatherCard component
interface WeatherCardProps {
  weather: Weather;  // Weather data to be displayed
  city: string;      // City name to be displayed
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, city }) => {
  return (
    
    // Main container for the weather card
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* City name display */}
      <h2 className="text-2xl font-bold mb-4">{city}</h2>

      {/* Grid layout for weather information */}
      <div className="grid grid-cols-2 gap-4">

        {/* Temperature display */}
        <div className="flex items-center">
          <Sun size={24} className="text-yellow-500 mr-2" />
          <span className="text-lg">Temperature: {weather.temperature}°C</span>
        </div>

        {/* Weather description */}
        <div className="flex items-center">
          <Cloud size={24} className="text-gray-500 mr-2" />
          <span className="text-lg">Weather: {weather.description}</span>
        </div>

        {/* Humidity information */}
        <div className="flex items-center">
          <Droplet size={24} className="text-blue-500 mr-2" />
          <span className="text-lg">Humidity: {weather.humidity}%</span>
        </div>

        {/* Wind speed information */}
        <div className="flex items-center">
          <Wind size={24} className="text-blue-300 mr-2" />
          <span className="text-lg">Wind Speed: {weather.windSpeed} m/s</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;