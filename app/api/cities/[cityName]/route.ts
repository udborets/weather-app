import { NextResponse } from "next/server";

import citiesData from "@/data/cities.json";

export async function GET(
  request: Request,
  { params: { cityName } }: { params: { cityName: string } }
) {
  
  return NextResponse.json(
    citiesData.filter((item: { id: number; name: string }) => {
      return item.name.toLowerCase().includes(cityName.toLowerCase());
    })
  );
}
