import axios from "axios";
import { useQuery } from "react-query";

import { City } from "@/models/city";
import { WeatherRequest } from "@/models/weather";
import { getWeatherLink } from "@/services/weather";
import { useChosenCity } from "@/store/useChosenCity";
import { useState } from "react";

const WeatherInfoBar = () => {
  const chosenCity: City = useChosenCity((store: any) => store?.chosenCity);
  const [dayShowing, setDayShowing] = useState<0 | 1 | 2>(0);
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
    <div className="weatherInfoBar p-4 rounded-[20px] bg-slate-300 w-[200px] h-[300px] shadow-2xl">
      <div className="weatherInfoBar__container w-full h-full flex flex-col gap-4 items-center justify-center relative">
        {weather.isLoading
          ? <span>Loading...</span>
          : <>
            <h4 className='font-bold text-[1.1rem] absolute top-[10px]'>{weather.data?.city.name}</h4>
            <ul>
              <li className="flex gap-1">
                <span>today</span>
                <input type="radio" value="today" onChange={() => setDayShowing(0)} checked={dayShowing === 0} />
              </li>
              <li className="flex gap-1">
                <span>tomorrow</span>
                <input type="radio" value="today" onChange={() => setDayShowing(1)} checked={dayShowing === 1} />
              </li>
              <li className="flex gap-1">
                <span>day after tomorrow</span>
                <input type="radio" value="today" onChange={() => setDayShowing(2)} checked={dayShowing === 2} />
              </li>
            </ul>
            <ul className='flex flex-col gap-1'>
              <li>Temperature: {weather.data?.list[dayShowing].main.temp}</li>
              <li>Feels like: {weather.data?.list[dayShowing].main.feels_like}</li>
              <li>{weather.data?.list[dayShowing].weather[0].description}</li>
            </ul>
          </>}
      </div>
    </div>
  )
}

export default WeatherInfoBar