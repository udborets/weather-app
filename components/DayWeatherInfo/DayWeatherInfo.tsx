import { WeatherListElement } from "@/models/weather";

interface DayWeatherInfoProps {
  weatherInfo: WeatherListElement[];
  className: string;
}
const DayWeatherInfo = ({ weatherInfo, className }: DayWeatherInfoProps) => {
  return (
    <div className={className}>
      {weatherInfo.map((timeInfo) => {
        return (<span key={timeInfo.dt_txt}>{timeInfo.dt_txt}</span>)
      })}
    </div>
  )
}

export default DayWeatherInfo