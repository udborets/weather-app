import Head from 'next/head';
import { useEffect, useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';
import { database } from '@/firebase/database';
import { get, query, ref } from 'firebase/database';
import { useQuery } from 'react-query';

let loaded = false;

interface City {
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  id: number;
  name: string;
  state: string;
}

export default function Home() {
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
    setFilteredCities(allCities.data.filter(({ name }) => name.includes(debouncedSearch)))
  }, [debouncedSearch, allCities.data])
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="w-full h-full flex flex-col">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={allCities.isLoading ? "Cities loading..." : "Search..."}
          className='w-[300px] border-2 text-[1rem] px-2 py-1'
          disabled={allCities.isLoading}
        />
        {filteredCities?.slice(0, 6).map((city) => (<div key={city.id}>{city.name} {city.country}  {city.coord.lat} {city.coord.lon}</div>))}
      </div>
      <button onClick={() => console.log(allCities)}>
        fedf
      </button>
    </>
  )
}
