export function getWeatherLink(param: string) {
  return `https://api.openweathermap.org/data/2.5/forecast?q=${param}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;
}
