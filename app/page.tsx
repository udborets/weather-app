'use client'

import WeatherInfoBar from "@/components/WeatherInfoBar/WeatherInfoBar";

export default function Home() {
  return (
    <main className="homePage w-full h-full flex flex-col flex-grow p-4 lg:p-20">
      <WeatherInfoBar />
    </main>
  )
}
