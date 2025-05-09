import { create } from "zustand";

const usePlaceStore = create((set) => ({
  filter: "",
  setFilter: (newFilter) => set({ filter: newFilter }),
  selectedPlace: null,
  setSelectedPlace: (place) => set({ selectedPlace: place }),
}));

export default usePlaceStore;