import { create } from 'zustand';

const useDetailStore = create((set) => ({
  searchKeyword: '',
  setSearchKeyword: (val) => set({ searchKeyword: val }),
  selectedPlace: null,
  setSelectedPlace: (placeId) => set({ selectedPlace: placeId }),
}));

export default useDetailStore;
