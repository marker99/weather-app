import { DailyForecast, ForecastData, OpenWeatherForecastResponse } from "../types/ForecastData";
import { WeatherData } from "../types/WeatherData";

const baseUrl = 'https://api.openweathermap.org/data/2.5';
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeather = async (city: string): Promise<WeatherData> => {
    const response = await fetch(
        `${baseUrl}/weather?q=${city}&units=metric&appid=${apiKey}`);

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



export const fetchForecast = async (city: string): Promise<DailyForecast[]> => {
    const response = await fetch(`${baseUrl}/forecast?q=${city}&units=metric&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }
    const data: OpenWeatherForecastResponse = await response.json();
  
    // Group forecast entries by day
    const forecastByDay: { [date: string]: ForecastData[] } = {};
  
    data.list.forEach((forecast) => {
      const date = forecast.dt_txt.split(' ')[0]; // Extract the day (YYYY-MM-DD)
      if (!forecastByDay[date]) {
        forecastByDay[date] = [];
      }
      forecastByDay[date].push({
        timestamp: forecast.dt_txt,
        temperature: forecast.main.temp,
        weatherDescription: forecast.weather[0].description,
      });
    });
  
    // Convert to array of daily forecasts with min/max temperatures
    const dailyForecasts: DailyForecast[] = Object.entries(forecastByDay).map(([date, forecasts]) => {
      const highTemp = Math.max(...forecasts.map((f) => f.temperature));
      const lowTemp = Math.min(...forecasts.map((f) => f.temperature));
      const day = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
  
      return {
        day,
        date,
        highTemp,
        lowTemp,
        entries: forecasts, // Full forecast entries for that day
      };
    });
  
    return dailyForecasts;
  };