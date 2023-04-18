export interface WeatherDbData {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
}
