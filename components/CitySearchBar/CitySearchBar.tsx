'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import CitySearchBarItem from '@/components/CitySearchBarItem/CitySearchBarItem';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { useDebounce } from '@/hooks/useDebounce';
import { City } from '@/models/city';
import { useChosenCity } from '@/store/useChosenCity';
import { getWeatherLink } from '@/services/weather';
import { WeatherRequest } from '@/models/weather';

const CitySearchBar = () => {
  const [search, setSearch] = useState<string>('');
  const chosenCity: City = useChosenCity((state: any) => state.chosenCity);
  const debouncedSearch = useDebounce(search, 500);
  const [isShowingSearchResults, setIsShowingSearchResults] = useState<boolean>(false);
  const cities = useQuery({
    queryFn: async () => {
      if (!debouncedSearch) {
        setIsShowingSearchResults(false);
        return [];
      }
      try {
        const fetchedCities = await axios.get<City[]>(`/api/cities/${debouncedSearch}`);
        if (fetchedCities.status !== 200) {
          console.error(fetchedCities);
          return [];
        }
        setIsShowingSearchResults(true);
        const cityNames: string[] = [];
        return fetchedCities.data.filter((city) => {
          if (cityNames.includes(city.name)) return false;
          cityNames.push(city.name);
          return true;
        })
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
      <div className='searchBar__bar flex justify-between w-[300px] border-2 relative'>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={cities.isLoading ? "Cities loading..." : "Search city..."}
          className='searchBar__input w-full h-full text-[1rem] px-3 py-2'
        />
        {(cities.isLoading || cities.isRefetching)
          ? <LoadingSpinner />
          : <></>}
      </div>
      {isShowingSearchResults
        ? <div className="searchBar__results absolute flex flex-col gap-2 border-2 border-gray-500 my-1 rounded-[10px] p-2 w-[300px] bg-white">
          {(cities.data && cities.data.length !== 0)
            ? cities.data.slice(0, 6).map((city) => (
              <CitySearchBarItem city={city} key={city.id} onClick={async () => {
                setIsShowingSearchResults(false);
                setSearch('');
                const weatherLink = getWeatherLink({ lat: city.coord.lat, lon: city.coord.lon });
                if (!weatherLink) return;
                console.log((await axios.get<WeatherRequest>(weatherLink)).data);
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