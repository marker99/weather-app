import axios from 'axios';
import { Forecast } from '../types/Forecast';
import { Weather } from '../types/Weather';

const API_BASE_URL = 'https://localhost:7020';

export const weatherService = {
  
  async getCurrentWeather(city: string): Promise<Weather> {
    const response = await axios.get<Weather>(`${API_BASE_URL}/current/${city}`);
    return response.data;
  },

  async getFiveDayForecast(city: string): Promise<Forecast[]> {
    const response = await axios.get<Forecast[]>(`${API_BASE_URL}/forecast/${city}`);
    return response.data;
  }
};