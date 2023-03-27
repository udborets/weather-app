import { City } from "@/models/city"

import { useChosenCity } from "@/store/useChosenCity";

interface ICitySearchBarItemProps {
  city: City;
}

const CitySearchBarItem = ({ city }: ICitySearchBarItemProps) => {
  const setChosenCity = useChosenCity((store: any) => store.setChosenCity);
  return (
    <div
      className="searchBarResult px-3 py-2 border-b-2 last-of-type:border-b-0 text-black bg-white hover:text-white hover:bg-sky w-[300px]"
      onClick={() => setChosenCity(city)}
    >
      <div className="searchBarResult__container gap-3 flex justify-start relative">
        <span>
          {city.name}
        </span>
        <div className='flex flex-col absolute top-[-8px] right-[40px]'>
          <span className="text-[0.8rem]">
            lat: {city.coord.lat.toString().slice(0, 6)}
          </span>
          <span className="text-[0.8rem]">
            lon: {city.coord.lon.toString().slice(0, 6)}
          </span>
        </div>
        <span className='absolute top-[0px] right-0'>
          {city.country}
        </span>
      </div>
    </div>
  )
}

export default CitySearchBarItem