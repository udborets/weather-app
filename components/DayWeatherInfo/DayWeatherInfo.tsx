import { WeatherListElement } from "@/models/weather";

interface DayWeatherInfoProps {
  weatherInfo: WeatherListElement[];
  className: string;
}
const DayWeatherInfo = ({ weatherInfo, className }: DayWeatherInfoProps) => {
  return (
    <div className={"flex flex-col " + className}>
      {weatherInfo.map((timeInfo) => {
        return (<span key={timeInfo.dt_txt}>{timeInfo.clouds.all}</span>)
      })}
    </div>
  )
}

export default DayWeatherInfo