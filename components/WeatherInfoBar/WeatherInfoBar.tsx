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
  if (weather.isLoading)
    return <div>Loading...</div>
  return (
    <div className={`weatherInfoBar w-full h-full gap-8 flex flex-col`}>
      <h4 className="weatherInfoBar__citySelected font-bold text-[1.5rem]">
        City selected: {weather?.data?.city.name}
      </h4>
      <DaySelectButtonRow
        dayShowing={dayShowing}
        fiveDaysInfo={fiveDaysInfo}
        setDayShowing={setDayShowing}
      />
      <div className="weatherInfoBar__infoList">
        {[...fiveDaysInfo.keys()].map((key, index) => {
          const dayInfo = fiveDaysInfo.get(key)
          if (dayInfo && index === dayShowing)
            return <DayWeatherInfo weatherInfo={dayInfo} key={dayInfo[0].dt} />
          return <></>
        })}
      </div>
    </div>
  )
}

export default WeatherInfoBar
