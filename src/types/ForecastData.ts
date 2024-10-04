export interface ForecastData {
  timestamp: string;
  temperature: number;
  weatherDescription: string;
}

export interface DailyForecast {
  day: string;
  date: string;
  highTemp: number;
  lowTemp: number;
  entries: ForecastData[];  // Full forecast for that day
}

// For typing OpenWeatherMap API response
export interface OpenWeatherForecastResponse {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    };
    weather: {
      description: string;
    }[];
  }[];
}