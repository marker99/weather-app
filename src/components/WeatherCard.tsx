import React from 'react';
import { WeatherData } from '../types/WeatherData';

const WeatherCard: React.FC<WeatherData> = ({ location, temperature, weatherDescription, humidity, windSpeed }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md max-w-sm mx-auto border">
            <h2 className="text-xl font-bold mb-2">{location}</h2>
            <p>Temperature: {temperature}°C</p>
            <p>Weather: {weatherDescription}</p>
            <p>Humidity: {humidity}%</p>
            <p>Wind Speed: {windSpeed} m/s</p>
        </div>
    );
};

export default WeatherCard;
