import { get, query, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import SearchBarResult from '@/components/searchbarresult/SearchBarResult';
import { database } from '@/firebase/database';
import { useDebounce } from '@/hooks/useDebounce';
import { City } from '@/models/city';

let loaded = false;

const SearchBar = () => {
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
  return (
    <div className="searchBar">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={allCities.isLoading ? "Cities loading..." : "Search..."}
        className='searchBar__input w-[300px] border-2 text-[1rem] px-2 py-1'
        disabled={allCities.isLoading}
      />
      <div className="searchBar__results absolute">
        {filteredCities?.slice(0, 6).map((city) => (
          <SearchBarResult city={city} key={city.id} />
        ))}
      </div>
    </div>
  )
}

export default SearchBar