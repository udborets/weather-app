'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import CitySearchBarItem from '@/components/CitySearchBarItem/CitySearchBarItem';
import { useDebounce } from '@/hooks/useDebounce';
import { City } from '@/models/city';
import { Store, useChosenCity } from '@/store/useChosenCity';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const CitySearchBar = () => {
  const [search, setSearch] = useState<string>('');
  const chosenCity = useChosenCity((state: any) => state.chosenCity);
  const chooseCity = useChosenCity((state: any) => state.setChosenCity);
  const debouncedSearch = useDebounce(search, 500);
  const cities = useQuery({
    queryFn: async () => {
      if (!debouncedSearch) return [];
      try {
        const fetchedCities = await axios.get<City[]>(`/api/cities/${debouncedSearch}`);
        if (fetchedCities.status !== 200) {
          console.error(fetchedCities);
          return [];
        }
        return fetchedCities.data;
        // return []
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
  }, [debouncedSearch, cities])
  return (
    <div className="searchBar">
      <div className='searchBar__bar flex justify-between w-[300px] border-2 relative'>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={cities.isLoading ? "Cities loading..." : "Search..."}
          className='searchBar__input w-full h-full text-[1rem] px-2 py-1'
          disabled={cities.isLoading || cities.isRefetching}
        />
        {(cities.isLoading || cities.isRefetching)
          ? <LoadingSpinner />
          : <></>}
      </div>
      <div className="searchBar__results absolute">
        {cities.data?.slice(0, 6).map((city) => (
          <CitySearchBarItem city={city} key={city.id} />
        ))}
      </div>
      <button onClick={() => { if (cities.data?.length) chooseCity(cities.data[2]) }}>
        haha
      </button>
      {
        chosenCity?.coord?.lon
      }
    </div>
  )
}

export default CitySearchBar