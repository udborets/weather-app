import { create } from "zustand";

import { City } from "@/models/city";

export type Store = {
  chosenCity: City;
  setChosenCity: () => (newCity: City) => void;
};

export const useChosenCity = create((set) => ({
  chosenCity: {
    coord: {
      lat: 0,
      lon: 0,
    },
    country: "",
    id: 0,
    name: "",
    state: "",
  } as City,
  setChosenCity: (newCity: City) =>
    set(() => {
      return { chosenCity: newCity };
    }),
}));
