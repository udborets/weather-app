import { useDebounce } from '@/hooks/useDebounce';
import { getIp } from '@/services/ip';
import { getWeatherLink } from '@/services/weather';
import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

export default function Home() {
  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDebounce(search, 1000);
  const { data: name } = useQuery({
    queryFn: async () => {
      const userIp = await getIp();
      if (!userIp) return;
      const req = (await axios.get(getWeatherLink(userIp))).data;
      return req?.location.tz_id;
    },
    refetchInterval: 3600000,
  })
  useEffect(() => {
    if (debouncedSearch) {
      axios.get(`${getWeatherLink(debouncedSearch)}`)
        .then((data) => console.log(data))
    }
    if (!debouncedSearch && name) {
      axios.get(`${getWeatherLink(name)}`)
        .then((data) => console.log(data))
    }
  }, [debouncedSearch, name])
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="w-full h-full">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className='border-2' />
      </main>
    </>
  )
}
