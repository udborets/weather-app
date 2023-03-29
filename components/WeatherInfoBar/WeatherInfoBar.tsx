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
      console.log(fetchedWeather.data)
      return fetchedWeather.data;
    },
    queryKey: [chosenCity.id],
    onError: (e) => {
      console.warn(e)
    }
  })
  return (
    <div className="weatherInfoBar p-4 rounded-[20px] bg-slate-400 w-fit h-fit">
      <div className="weatherInfoBar__container flex flex-col gap-4">
        <h4>{weather.data?.city.name}</h4>
        <ul className='flex flex-col gap-1'>
          <li>Temperature: {weather.data?.list[0].main.temp}</li>
          <li>Feels like: {weather.data?.list[0].main.feels_like}</li>
          <li>{weather.data?.list[4].weather[0].description}</li>
        </ul>
      </div>
    </div>
  )
}

export default WeatherInfoBar