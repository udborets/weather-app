import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

const Index = () => {
  const [ip, setIp] = useState<any>();
  useEffect(() => {
    axios.get("https://ipwho.is/")
      .then((data) => setIp(data.data?.ip))
  })
  return (
    <div>{ip}</div>
  )
}

export default Index