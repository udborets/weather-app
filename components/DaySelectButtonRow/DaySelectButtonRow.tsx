import { WeatherListElement } from "@/models/weather";
import DaySelectButton from "@/components/DaySelectButton/DaySelectButton";

interface DaySelectButtonRowProps {
  fiveDaysInfo: Map<string, WeatherListElement[]>;
  dayShowing: number;
  setDayShowing: (day: number) => void;
}

const DaySelectButtonRow = ({ fiveDaysInfo, dayShowing, setDayShowing }: DaySelectButtonRowProps) => {
  return (
    <ul className="weatherInfo__daySelectList flex max-w-full w-fit h-fit">
      {[...fiveDaysInfo.keys()].map((key, index) => {
        const mapDayWeather = fiveDaysInfo.get(key);
        if (mapDayWeather)
          return <DaySelectButton
            key={key}
            isSelected={dayShowing === index}
            onClick={() => setDayShowing(index)}
            date={mapDayWeather[0].dt_txt.split(' ')[0].slice(5) ?? ""}
            text={""}
          />
      })}
    </ul>
  )
}

export default DaySelectButtonRow