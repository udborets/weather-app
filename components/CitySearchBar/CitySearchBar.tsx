'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import CitySearchBarItem from '@/components/CitySearchBarItem/CitySearchBarItem';
import { useDebounce } from '@/hooks/useDebounce';
import { City } from '@/models/city';
import { useChosenCity } from '@/store/useChosenCity';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

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
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: 100000,
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
          placeholder={cities.isLoading ? "Cities loading..." : "Search..."}
          className='searchBar__input w-full h-full text-[1rem] px-2 py-1'
        />
        {(cities.isLoading || cities.isRefetching)
          ? <LoadingSpinner />
          : <></>}
      </div>
      <div className="searchBar__results absolute">
        {isShowingSearchResults
          ? ((cities.data && cities.data.length !== 0)
            ? cities.data.slice(0, 6).map((city) => (
              <CitySearchBarItem city={city} key={city.id} hideSearchResultsFn={() => setIsShowingSearchResults(false)} />
            ))
            : <CitySearchBarItem noResultText='No results' hideSearchResultsFn={() => setIsShowingSearchResults(false)} />)
          : <></>}
      </div>
    </div>
  )
}

export default CitySearchBar