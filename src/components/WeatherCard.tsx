import React from 'react';
import { Weather } from '../types/Weather';

interface WeatherCardProps {
  weather: Weather;
  city: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, city }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-sm mx-auto border">
      <h2 className="text-xl font-bold mb-2">{city}</h2>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Weather: {weather.description}</p>
      <p>Humidity: {weather.humidity}%</p>
      <p>Wind Speed: {weather.windSpeed} m/s</p>
    </div>
  );
};

export default WeatherCard;