'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import CitySearchBarItem from '@/components/CitySearchBarItem/CitySearchBarItem';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { useDebounce } from '@/hooks/useDebounce';
import { City } from '@/models/city';

const CitySearchBar = () => {
  const [search, setSearch] = useState<string>('');
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
          disabled={cities.isLoading || cities.isRefetching}
        />
        {(cities.isLoading || cities.isRefetching)
          ? <LoadingSpinner />
          : <></>}
      </div>
      <div className="searchBar__results absolute">
        {Array.isArray(cities.data)
          ? cities.data.slice(0, 6).map((city) => (
            <CitySearchBarItem city={city} key={city.id} />
          ))
          : <></>}
      </div>
    </div>
  )
}

export default CitySearchBar