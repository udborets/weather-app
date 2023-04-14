import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import DaySelectButton from "@/components/DaySelectButton/DaySelectButton";
import { City } from "@/models/city";
import { WeatherRequest } from "@/models/weather";
import { getWeatherLink } from "@/services/weather";
import { useChosenCity } from "@/store/useChosenCity";

const WeatherInfoBar = () => {
  const chosenCity: City = useChosenCity((store: any) => store?.chosenCity);
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
    <div className="weatherInfoBar p-4 rounded-[20px] bg-slate-300 w-[700px] h-[300px] shadow-2xl">
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
                <ul className="weatherInfo__daySelectList flex w-fit">
                  <DaySelectButton
                    isSelected={dayShowing === 0}
                    onClick={() => setDayShowing(0)}
                    date={weather.data?.list[0].dt_txt.split(' ')[0] ?? ""}
                    text={"Today"}
                  />
                  <DaySelectButton
                    isSelected={dayShowing === 6}
                    onClick={() => setDayShowing(6)}
                    date={weather.data?.list[6].dt_txt.split(' ')[0] ?? ""}
                    text={"Tomorrow"}
                  />
                  <DaySelectButton
                    isSelected={dayShowing === 15}
                    onClick={() => setDayShowing(15)}
                    date={weather.data?.list[15].dt_txt.split(' ')[0] ?? ""}
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