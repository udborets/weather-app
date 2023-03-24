import axios, { AxiosError } from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import CitySearchBar from '@/components/citysearchbar/CitySearchBar';
import { useDebounce } from '@/hooks/useDebounce';
import { getIp } from '@/services/ip';
import { getWeatherLink } from '@/services/weather';

export default function Home() {
  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDebounce(search, 1000);
  const { data: city, refetch } = useQuery({
    queryFn: async () => {
      try {
        if (debouncedSearch && debouncedSearch.length >= 3) {
          const req = (await axios.get<{ location: { tz_id: string } }>(getWeatherLink(debouncedSearch)));
          if (req.data) {
            console.log
            return req.data.location.tz_id;
          }
        }
        const userIp = await getIp();
        if (!userIp) return '';
        const req = (await axios.get<{ location: { tz_id: string } }>(getWeatherLink(userIp))).data;
        return req.location.tz_id;
      }
      catch (e: unknown) {
        if (e && e instanceof AxiosError && e.status !== 200 && e.status !== 400) {
          console.log(e);
          return '';
        }
      }
    },
    refetchInterval: 3600000,
  })
  useEffect(() => {
    refetch();
  }, [debouncedSearch, refetch])
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="w-full h-full">
        <CitySearchBar search={search} setSearch={setSearch} />
        {city}
      </div>
    </>
  )
}
