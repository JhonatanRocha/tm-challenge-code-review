import { GeocodeResponseData } from "src/geocode/dtos/geocode.response.data";

export class WeatherResponseData extends GeocodeResponseData {
  cloud_pct: number;
  temp: number;
  feels_like: number;
  humidity: number;
  min_temp: number;
  max_temp: number;
  wind_speed: number;
  wind_degrees: number;
  sunrise: number;
  sunset: number;
}