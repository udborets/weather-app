'use client'

import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import CitySearchBarItem from '@/components/CitySearchBarItem/CitySearchBarItem';
import { useDebounce } from '@/hooks/useDebounce';
import { City } from '@/models/city';
import axios from 'axios';

const CitySearchBar = () => {
  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDebounce(search, 500);
  const cities = useQuery({
    queryFn: async () => {
      if (!debouncedSearch) return [];
      const fetchedCities = await axios.get<City[]>(`/api/cities/${debouncedSearch}`);
      if (fetchedCities.status !== 200) {
        console.warn(fetchedCities.data);
        return [];
      }
      return fetchedCities.data;
      // return []
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
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={cities.isLoading ? "Cities loading..." : "Search..."}
        className='searchBar__input w-[300px] border-2 text-[1rem] px-2 py-1'
        disabled={cities.isLoading}
      />
      <div className="searchBar__results absolute">
        {cities.data?.slice(0, 6).map((city) => (
          <CitySearchBarItem city={city} key={city.id} />
        ))}
      </div>
    </div>
  )
}

export default CitySearchBar