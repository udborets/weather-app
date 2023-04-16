import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import DaySelectButtonRow from "@/components/DaySelectButtonRow/DaySelectButtonRow";
import DayWeatherInfo from "@/components/DayWeatherInfo/DayWeatherInfo";
import { WeatherListElement, WeatherRequest } from "@/models/weather";
import { getWeatherLink } from "@/services/weather";
import { useChosenCity } from "@/store/useChosenCity";
import style from "./WeatherInfoBar.module.scss";

const WeatherInfoBar = () => {
  const { chosenCity } = useChosenCity();
  const [dayShowing, setDayShowing] = useState<number>(0);
  const [fiveDaysInfo] = useState(new Map<string, WeatherListElement[]>());
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
    <div className={`weatherInfoBar p-4 rounded-[20px] bg-gradient-to-br from-slate-200 to-slate-300 w-full h-fit w-fit shadow-2xl ${style.sun}`}>
      <div className="weatherInfoBar__container w-full h-full flex flex-col gap-4 items-center justify-center relative">
        {weather.isLoading
          ? <span className="weatherInfoBar__loading font-bold text-[2rem]">Loading...</span>
          : <>
            <h4
              className='weatherInfoBar__cityName font-bold text-[1.1rem]'
            >
              {weather.data?.city.name}
            </h4>
            <div className='weatherInfoBar__content flex w-full h-full flex-grow justify-center items-center'>
              <div className="weatherInfo flex flex-col w-full min-w-fit h-full">
                <DaySelectButtonRow
                  dayShowing={dayShowing}
                  setDayShowing={setDayShowing}
                  fiveDaysInfo={fiveDaysInfo}
                />
                <ul className='weatherInfo__info flex flex-col gap-1 flex-grow text-black bg-slate-600 p-4 rounded-b-xl'>
                  {[...fiveDaysInfo.keys()].map((key, index) => {
                    if (dayShowing === index) {
                      const mapDayWeather = fiveDaysInfo.get(key);
                      if (mapDayWeather)
                        return (
                          <DayWeatherInfo
                            weatherInfo={mapDayWeather}
                            key={key}
                            className={``}
                          />
                        )
                    }
                    return <></>
                  })}
                </ul>
              </div>
            </div>
          </>}
      </div>
    </div>
  )
}

export default WeatherInfoBar
