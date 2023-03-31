'use client'

import WeatherInfoBar from "@/components/WeatherInfoBar/WeatherInfoBar";

export default function Home() {
  return (
    <div className="homePage__content w-full h-full flex flex-col">
      <WeatherInfoBar />
    </div>
  )
}
