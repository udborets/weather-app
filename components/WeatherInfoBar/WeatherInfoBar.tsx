import axios from "axios";
import { useQuery } from "react-query";

import { City } from "@/models/city";
import { WeatherRequest } from "@/models/weather";
import { getWeatherLink } from "@/services/weather";
import { useChosenCity } from "@/store/useChosenCity";
import { useState } from "react";
import DaySelectButton from "@/components/DaySelectButton/DaySelectButton";

const WeatherInfoBar = () => {
  const chosenCity: City = useChosenCity((store: any) => store?.chosenCity);
  const [dayShowing, setDayShowing] = useState<0 | 6 | 15>(0);
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
    <div className="weatherInfoBar p-4 rounded-[20px] bg-slate-300 w-[700px] h-[300px] shadow-2xl">
      <div className="weatherInfoBar__container w-full h-full flex flex-col gap-4 items-center justify-center relative">
        {weather.isLoading
          ? <span>Loading...</span>
          : <>
            <h4
              className='weatherInfoBar__cityName font-bold text-[1.1rem] absolute top-[10px]'
            >
              {weather.data?.city.name}
            </h4>
            <div className='weatherInfoBar__content flex w-full h-full justify-center items-center'>
              <div className="weatherInfo flex flex-col w-fit">
                <ul className="weatherInfo__daySelectList flex w-fit">
                  <DaySelectButton
                    isSelected={dayShowing === 0}
                    onClick={() => setDayShowing(0)}
                  >
                    <div className="flex flex-col">
                      <span>Today,</span>
                      <span>{weather.data?.list[0].dt_txt.split(" ")[0] ?? ""}</span>
                    </div>
                  </DaySelectButton>
                  <DaySelectButton
                    isSelected={dayShowing === 6}
                    onClick={() => setDayShowing(6)}
                  >
                    <div className="flex flex-col">
                      <span>Tomorrow,</span>
                      <span>{weather.data?.list[7].dt_txt.split(" ")[0] ?? ""}</span>
                    </div>
                  </DaySelectButton>
                  <DaySelectButton
                    isSelected={dayShowing === 15}
                    onClick={() => setDayShowing(15)}
                  >
                    <div className="flex flex-col">
                      <span>DAT,</span>
                      <span>{weather.data?.list[15].dt_txt.split(" ")[0] ?? ""}</span>
                    </div>
                  </DaySelectButton>
                </ul>
                <ul className='weatherInfo__info flex flex-col gap-1 bg-slate-600 p-4 rounded-b-xl text-white'>
                  <li>Temperature: {weather.data?.list[dayShowing].main.temp}&#8451;</li>
                  <li>Feels like: {weather.data?.list[dayShowing].main.feels_like}&#8451;</li>
                  <li>{weather.data?.list[dayShowing].weather[0].description}</li>
                </ul>
              </div>
            </div>
          </>}
      </div>
    </div>
  )
}

export default WeatherInfoBar