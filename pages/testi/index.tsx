import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

import { getIp } from '@/services/ip';
import { getWeatherLink } from '@/services/weather';


const Index = () => {
  const { data: userIp } = useQuery({
    queryFn: async () => await getIp()
  })
  const { data: name } = useQuery({
    queryFn: async () => {
      if (!userIp) return;
      const req = (await axios.get(getWeatherLink(userIp))).data;
      return req?.location.tz_id;
    },
    refetchInterval: userIp ? 3600000 : 2000,
  })
  return (
    <div>
      {name}
    </div>
  )
}

export default Index