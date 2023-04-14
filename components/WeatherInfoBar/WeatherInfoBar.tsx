import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import style from "./WeatherInfoBar.module.scss";
import DaySelectButton from "@/components/DaySelectButton/DaySelectButton";
import { WeatherRequest } from "@/models/weather";
import { getWeatherLink } from "@/services/weather";
import { useChosenCity } from "@/store/useChosenCity";

const WeatherInfoBar = () => {
  const { chosenCity } = useChosenCity();
  const [dayShowing, setDayShowing] = useState<0 | 6 | 15>(0);
  const fiveDaysInfo = new Map<string, any[]>();
  const weather = useQuery({
    queryFn: async () => {
      const weatherLink = getWeatherLink(chosenCity.coord);
      if (!weatherLink) return null;
      const { data: fetchedWeather } = (await axios.get<WeatherRequest>(weatherLink));
      console.log(fetchedWeather)
      if (fetchedWeather.city.id !== chosenCity.id) {
        const fiveDaysInfoKeys = [...fiveDaysInfo.keys()]
        fiveDaysInfoKeys.map((key) => {
          fiveDaysInfo.set(key, []);
        })
      }
      fetchedWeather.list.forEach((listInfoItem) => {
        const listInfoItemDay = listInfoItem.dt_txt.split(' ')[0];
        const mapDayWeather = fiveDaysInfo.get(listInfoItemDay);
        if (!mapDayWeather?.length) {
          fiveDaysInfo.set(listInfoItemDay, [listInfoItem]);
        }
        if (mapDayWeather?.length) {
          mapDayWeather.push(listInfoItem);
        }
      })
      console.log(fiveDaysInfo);
      return fetchedWeather;
    },
    queryKey: [chosenCity.id],
    onError: (e) => {
      console.warn(e);
    }
  })
  useEffect(() => {
    setDayShowing(0);
  }, [chosenCity.id])
  return (
    <div className={`weatherInfoBar p-4 rounded-[20px] bg-gradient-to-br from-slate-200 to-slate-300 w-full h-[300px] shadow-2xl ${style.sun}`}>
      <div className="weatherInfoBar__container w-full h-full flex flex-col gap-4 items-center justify-center relative">
        {weather.isLoading
          ? <span className="weatherInfoBar__loading font-bold text-[2rem]">Loading...</span>
          : <>
            <h4
              className='weatherInfoBar__cityName font-bold text-[1.1rem] absolute top-[10px]'
            >
              {weather.data?.city.name}
            </h4>
            <div className='weatherInfoBar__content flex w-full h-full justify-center items-center'>
              <div className="weatherInfo flex flex-col w-fit">
                <ul className="weatherInfo__daySelectList flex w-fit h-fit">
                  <DaySelectButton
                    isSelected={dayShowing === 0}
                    onClick={() => setDayShowing(0)}
                    date={weather.data?.list[0].dt_txt.split(' ')[0].slice(5) ?? ""}
                    text={"Today"}
                  />
                  <DaySelectButton
                    isSelected={dayShowing === 6}
                    onClick={() => setDayShowing(6)}
                    date={weather.data?.list[6].dt_txt.split(' ')[0].slice(5) ?? ""}
                    text={"Tomorrow"}
                  />
                  <DaySelectButton
                    isSelected={dayShowing === 15}
                    onClick={() => setDayShowing(15)}
                    date={weather.data?.list[15].dt_txt.split(' ')[0].slice(5) ?? ""}
                    text={"DAT"}
                  />
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
