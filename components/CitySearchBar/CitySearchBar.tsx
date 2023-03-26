<<<<<<< HEAD
'use client'

=======
import { get, query, ref } from 'firebase/database';
>>>>>>> e447c6cbc073bbd9c4471de428231d75170d4756
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import CitySearchBarItem from '@/components/CitySearchBarItem/CitySearchBarItem';
<<<<<<< HEAD
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
      console.log(fetchedCities)
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
=======
import { database } from '@/firebase/database';
import { useDebounce } from '@/hooks/useDebounce';
import { City } from '@/models/city';

let loaded = false;

const CitySearchBar = () => {
  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDebounce(search, 10);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const allCities = useQuery({
    queryFn: async () => {
      if (loaded) return;
      loaded = true;
      const que = query(ref(database));
      const allFetchedCities: City[] = [];
      const rootSnap = await get(que);
      rootSnap.forEach((childSnap) => {
        allFetchedCities.push(childSnap.val());
      })
      return allFetchedCities;
    },
    refetchInterval: 9999999999999,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
  useEffect(() => {
    if (!allCities.data) return;
    if (!debouncedSearch) {
      setFilteredCities([]);
      return;
    }
    setFilteredCities(allCities.data.filter(({ name }) => name.toLowerCase().includes(debouncedSearch.toLowerCase())))
  }, [debouncedSearch, allCities.data])
>>>>>>> e447c6cbc073bbd9c4471de428231d75170d4756
  return (
    <div className="searchBar">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
<<<<<<< HEAD
        placeholder={cities.isLoading ? "Cities loading..." : "Search..."}
        className='searchBar__input w-[300px] border-2 text-[1rem] px-2 py-1'
        disabled={cities.isLoading}
      />
      <div className="searchBar__results absolute">
        {cities.data?.slice(0, 6).map((city) => (
=======
        placeholder={allCities.isLoading ? "Cities loading..." : "Search..."}
        className='searchBar__input w-[300px] border-2 text-[1rem] px-2 py-1'
        disabled={allCities.isLoading}
      />
      <div className="searchBar__results absolute">
        {filteredCities?.slice(0, 6).map((city) => (
>>>>>>> e447c6cbc073bbd9c4471de428231d75170d4756
          <CitySearchBarItem city={city} key={city.id} />
        ))}
      </div>
    </div>
  )
}

export default CitySearchBar