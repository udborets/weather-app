export interface WeatherData {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  }
}