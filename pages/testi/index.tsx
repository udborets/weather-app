import { getIp } from '@/services/ip'
import { getWeatherLink } from '@/services/weather'
import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'


const Index = () => {
  const { data: name } = useQuery({
    queryFn: async () => {
      const userIp = await getIp();
      if (!userIp) return;
      const req = (await axios.get(getWeatherLink(userIp))).data
      return req?.location.tz_id
    }
  })
  return (
    <div>
      {name}
    </div>
  )
}

export default Index