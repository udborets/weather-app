import { WeatherListElement } from "@/models/weatherRequest";

interface DayWeatherInfoProps {
  weatherInfo: WeatherListElement[];
}
const DayWeatherInfo = ({ weatherInfo }: DayWeatherInfoProps) => {
  return (
    <ul className={`dayWeatherInfo__list grid grid-cols-2 justify-items-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 lg:gap-6 w-full`}>
      {weatherInfo.map((timeInfo) => {
        return (
          <div
            key={timeInfo.dt}
            className="dayWeatherInfo__item w-fit h-fit px-4 py-2 md:px-8 md:py-4 flex flex-col bg-white rounded-[15px] outline outline-1"
          >
            <span className="font-bold">
              Time: {timeInfo.dt_txt.split(' ')[1]}
            </span>
            <span className="font-bold">
              Temperature:
            </span>
            {timeInfo.main.temp}&#8451;
            <span className="font-bold">
              Min temperature:
            </span>
            {timeInfo.main.temp_min}&#8451;
            <span className="font-bold">
              Max temperature:
            </span>
            {timeInfo.main.temp_max}&#8451;
            <span className="font-bold">
              Feels like:</span>
            {timeInfo.main.feels_like}&#8451;
          </div>
        )
      })}
    </ul>
  )
}

export default DayWeatherInfo