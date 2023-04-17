import { NextResponse } from "next/server";

import citiesData from "@/data/cities.json";

export async function GET(
  request: Request,
  { params: { cityNamePart } }: { params: { cityNamePart: string } }
) {
  const noRepeatCitiesNames: string[] = [];
  const filteredCities = citiesData.filter((city) => {
    if (
      noRepeatCitiesNames.includes(city.name) ||
      !city.name.toLowerCase().includes(cityNamePart.toLowerCase())
    )
      return false;
    noRepeatCitiesNames.push(city.name);
    return true;
  });
  return NextResponse.json(filteredCities);
}
