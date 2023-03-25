import Head from 'next/head';
import { useEffect, useState } from 'react';

import CitySearchBar from '@/components/citysearchbar/CitySearchBar';
import { useDebounce } from '@/hooks/useDebounce';
import { database } from '@/firebase/database';
import { get, query, ref } from 'firebase/database';

let loaded = false;

interface city {
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
  const [allCities, setAllCities] = useState<city[]>([])
  const [filteredCities, setFilteredCities] = useState<city[]>([]);
  useEffect(() => {
    if (loaded) return;
    loaded = true;
    const que = query(ref(database))
    const allFetchedCities: city[] = []
    get(que).then((data) => {
      data.forEach((snap) => {
        allFetchedCities.push(snap.val());
      })
      setAllCities(allFetchedCities)
    })
  }, [])
  useEffect(() => {
    setFilteredCities(allCities.filter(({ name }) => name.includes(debouncedSearch)))
  }, [debouncedSearch])
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="w-full h-full flex flex-col">
        <CitySearchBar search={search} setSearch={setSearch} />
        {filteredCities?.slice(0, 6).map((city) => (<div key={city.id}>{city.name} {city.country}  {city.coord.lat} {city.coord.lon}</div>))}
      </div>
      <button onClick={() => console.log(allCities)}>
        fedf
      </button>
    </>
  )
}
