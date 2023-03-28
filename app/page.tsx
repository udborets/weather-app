'use client'

import { City } from "@/models/city";
import { useChosenCity } from "@/store/useChosenCity";

export default function Home() {
  const chosenCity: City = useChosenCity((store: any) => store?.chosenCity);
  return (
    <div className="w-full h-full flex flex-col">
      {chosenCity.name}
    </div>
  )
}
