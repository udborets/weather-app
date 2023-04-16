import { WeatherListElement } from "@/models/weather";

interface DayWeatherInfoProps {
  weatherInfo: WeatherListElement[];
  className?: string;
}
const DayWeatherInfo = ({ weatherInfo, className }: DayWeatherInfoProps) => {
  return (
    <div className={"flex flex-col gap-8 " + className}>
      {weatherInfo.map((timeInfo) => {
        return (
          <div key={timeInfo.dt} className=" flex flex-col">
            <span className="font-bold">{timeInfo.dt_txt.split(' ')[1]}</span>
            <span className="font-bold">Temperature: </span>{timeInfo.main.temp}&#8451;
            <span className="font-bold">Min temperature:</span> {timeInfo.main.temp_min}&#8451;
            <span className="font-bold">Max temperature:</span> {timeInfo.main.temp_max}&#8451;
            <span className="font-bold">Feels like:</span> {timeInfo.main.feels_like}&#8451;
          </div>
        )
      })}
    </div>
  )
}

export default DayWeatherInfo