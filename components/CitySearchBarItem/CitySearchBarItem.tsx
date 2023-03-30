import { City } from "@/models/city";
import { useChosenCity } from "@/store/useChosenCity";

interface ICitySearchBarItemProps {
  city?: City;
  noResultText?: string;
  onClick: () => void;
}

const CitySearchBarItem = ({ city, onClick, noResultText }: ICitySearchBarItemProps) => {
  const setChosenCity = useChosenCity((store: any) => store.setChosenCity);
  return (
    <div className="searchBarResult px-3 py-2 border-b-2 rounded-[10px] transition-colors duration-200 text-black 
    bg-white hover:text-white hover:bg-sky w-full"
      onClick={() => {
        if (city) {
          setChosenCity(city);
        }
        onClick();
      }}
    >
      <div className="searchBarResult__container gap-3 flex justify-start relative">
        {noResultText
          ? <span className="searchBarResult__noResultText">{noResultText}</span>
          : ''}
        {city ? city.name.length <= 28
          ? city.name
          : <span className="searchBarResult__cityName">{city.name.slice(0, 28)}...</span>
          : ''}
        <span className='searchBarResult__country absolute top-[0px] right-0 opacity-40 font-bold'>
          {city ? city.country : ''}
        </span>
      </div>
    </div>
  )
}

export default CitySearchBarItem