import { Weather } from "./Weather";

export interface Forecast {
  dateTime: string;
  highTemp: number;
  lowTemp: number;
  hourlyForecast: Weather[];
}