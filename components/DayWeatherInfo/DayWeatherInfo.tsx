import { WeatherListElement } from "@/models/weather";

interface DayWeatherInfoProps {
  weatherInfo: WeatherListElement[];
  className?: string;
}
const DayWeatherInfo = ({ weatherInfo, className }: DayWeatherInfoProps) => {
  return (
    <ul className={"dayWeatherInfo__list flex flex-col gap-8 " + className}>
      {weatherInfo.map((timeInfo) => {
        return (
          <div
            key={timeInfo.dt}
            className="dayWeatherInfo__item w-fit h-fit p-8 flex flex-col bg-white rounded-[15px] outline outline-1"
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