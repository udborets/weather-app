'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import CitySearchBarItem from '@/components/CitySearchBarItem/CitySearchBarItem';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { useDebounce } from '@/hooks/useDebounce';
import { WeatherData } from '@/models/weatherData';

const CitySearchBar = () => {
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 500);
  const [isShowingSearchResults, setIsShowingSearchResults] = useState<boolean>(false);
  const cities = useQuery({
    queryFn: async () => {
      if (!debouncedSearch) {
        setIsShowingSearchResults(false);
        return [];
      }
      try {
        const fetchedCities = await axios.get<WeatherData[]>(`/api/cities/${debouncedSearch}`);
        if (fetchedCities.status !== 200) {
          console.error(fetchedCities);
          return [];
        }
        setIsShowingSearchResults(true);
        return fetchedCities.data;
      }
      catch (e: unknown) {
        console.error(e);
      }
    },
    queryKey: [debouncedSearch.toLowerCase()],
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })
  useEffect(() => {
    cities.refetch()
  }, [debouncedSearch])
  return (
    <div className="searchBar">
      <div className='searchBar__bar flex justify-between w-full max-w-[300px] border-2 relative'>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={cities.isLoading ? "Cities loading..." : "Search city..."}
          className='searchBar__input w-full h-[48px] text-[1rem] px-3 py-2'
        />
        <div className="searchBar__loadingSpinner absolute right-0 top-0 w-[48px] h-[48px] grid content-center">
          {(cities.isLoading || cities.isRefetching)
            ? <LoadingSpinner width='w-[38px]' height='h-[38px]' />
            : <></>}
        </div>
      </div>
      {isShowingSearchResults
        ? <div className="searchBar__results absolute z-[2] flex flex-col gap-2 border-2 border-gray-500 my-1 rounded-[10px] p-2 w-[300px] bg-white">
          {(cities.data && cities.data.length !== 0)
            ? cities.data.slice(0, 6).map((city) => (
              <CitySearchBarItem city={city} key={city.id} onClick={() => {
                setIsShowingSearchResults(false);
                setSearch('');
              }} />
            ))
            : <CitySearchBarItem noResultText='No results' onClick={() => {
              setIsShowingSearchResults(false);
              setSearch('');
            }} />}
        </div>
        : <></>}
    </div>
  )
}

export default CitySearchBar