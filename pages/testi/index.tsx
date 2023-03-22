import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

const Index = () => {
  const ip = useQuery({
    queryFn: async () => {
      const ip = await axios.get("http://ip-api.com/json/?fields=status,message,country,regionName,zip,lat,lon,timezone,isp,org,as,query")
      return ip.data?.query
    }
  })
  return (
    <div>{ip.data}</div>
  )
}

export default Index