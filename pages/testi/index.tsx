import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

const Index = () => {
  const [ip, setIp] = useState<any>();
  useEffect(() => {
    axios.get("http://ip-api.com/json/?fields=status,message,country,regionName,zip,lat,lon,timezone,isp,org,as,query")
      .then((data) => setIp(data.data?.query))
  })
  return (
    <div>{ip}</div>
  )
}

export default Index