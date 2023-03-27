import { City } from "@/models/city"
import { useChosenCity } from "@/store/useChosenCity";

interface ICitySearchBarItemProps {
  city: City;
  hideSearchResultsFn: () => void;
}

const CitySearchBarItem = ({ city, hideSearchResultsFn }: ICitySearchBarItemProps) => {
  const setChosenCity = useChosenCity((store: any) => store.setChosenCity)
  return (
    <div className="searchBarResult px-3 py-2 border-b-2 
     transition-colors duration-200 last-of-type:border-b-0 text-black bg-white hover:text-white hover:bg-sky w-[300px]"
      onClick={() => { setChosenCity(city); hideSearchResultsFn() }}
    >
      <div className="searchBarResult__container gap-3 flex justify-start relative">
        <span>
          {city.name.length <= 30
            ? city.name
            : <span>{city.name.slice(0, 30)}...</span>}
        </span>
        <span className='absolute top-[0px] right-0'>
          {city.country}
        </span>
      </div>
    </div>
  )
}

export default CitySearchBarItem