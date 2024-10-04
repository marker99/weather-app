import { WeatherData } from "../types/WeatherData";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeather = async (city: string): Promise<WeatherData> => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    console.log(response);

    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    return {
        location: data.name,
        temperature: data.main.temp,
        weatherDescription: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      };
};