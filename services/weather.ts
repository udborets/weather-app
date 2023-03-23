export function getWeatherLink(param: string) {
  return `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY} &q=${param}`;
}
