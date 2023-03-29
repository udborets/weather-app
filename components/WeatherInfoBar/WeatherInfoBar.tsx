import axios from "axios";
import { useQuery } from "react-query";

import { City } from "@/models/city";
import { WeatherRequest } from "@/models/weather";
import { getWeatherLink } from "@/services/weather";
import { useChosenCity } from "@/store/useChosenCity";

const WeatherInfoBar = () => {
  const chosenCity: City = useChosenCity((store: any) => store?.chosenCity);
  const weather = useQuery({
    queryFn: async () => {
      const weatherLink = getWeatherLink(chosenCity.coord);
      if (!weatherLink) return null;
      const fetchedWeather = (await axios.get<WeatherRequest>(weatherLink));
      return fetchedWeather.data;
    },
    queryKey: [chosenCity.id],
    onError: (e) => {
      console.warn(e)
    }
  })
  return (
    <div>
      <div>Temperature: {weather.data?.list[0].main.temp}</div>
      <div>Feels like: {weather.data?.list[0].main.feels_like}</div>
    </div>
  )
}

export default WeatherInfoBar