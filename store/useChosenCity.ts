import { create } from "zustand";

import { WeatherData } from "@/models/weatherData";

export interface ChosenCityState {
  chosenCity: WeatherData;
  setChosenCity: (newCity: WeatherData) => void;
}

export const useChosenCity = create<ChosenCityState>((set) => ({
  chosenCity: {
    id: 0,
    name: "",
    coord: {
      lat: 0,
      lon: 0,
    },
  } as WeatherData,
  setChosenCity: (newCity: WeatherData) =>
    set(() => {
      return { chosenCity: newCity };
    }),
}));
