import { City } from "@/models/city";
import { useChosenCity } from "@/store/useChosenCity";

interface ICitySearchBarItemProps {
  city?: City;
  noResultText?: string;
  hideSearchResultsFn: () => void;
}

const CitySearchBarItem = ({ city, hideSearchResultsFn, noResultText }: ICitySearchBarItemProps) => {
  const setChosenCity = useChosenCity((store: any) => store.setChosenCity);
  return (
    <div className="searchBarResult px-3 py-2 border-b-2 rounded-[10px] transition-colors duration-200 text-black 
    bg-white hover:text-white hover:bg-sky w-full"
      onClick={() => {
        if (city) {
          setChosenCity(city);
        }
        hideSearchResultsFn();
      }}
    >
      <div className="searchBarResult__container gap-3 flex justify-start relative">
        <span>
          {noResultText
            ? <span>{noResultText}</span>
            : ''}
          {city ? city.name.length <= 30
            ? city.name
            : <span>{city.name.slice(0, 30)}...</span>
            : ''}
        </span>
        <span className='absolute top-[0px] right-0'>
          {city ? city.country : ''}
        </span>
      </div>
    </div>
  )
}

export default CitySearchBarItem