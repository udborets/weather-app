export function getWeatherLink({ lat, lon }: { lat: number; lon: number }) {
  const weatherApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  if (!weatherApiKey) {
    console.error("Can't get weather api key");
    return null;
  }
  return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`;
}
