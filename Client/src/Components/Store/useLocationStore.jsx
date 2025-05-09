import { create } from "zustand";

const useLocationStore = create((set) => ({
  locations: JSON.parse(localStorage.getItem("stone_locations")) || [], // Initialize with empty array if no data

  // Create: Add new location
  setNewLocation: (newLocation) => set((state) => {
    const updatedLocations = [...state.locations, newLocation];
    localStorage.setItem("stone_locations", JSON.stringify(updatedLocations));
    return { locations: updatedLocations };
  }),

  // Read: Fetch all locations
  getLocations: () => {
    return JSON.parse(localStorage.getItem("stone_locations")) || [];
  },

  // Update: Update a location by its id
  updateLocation: (id, updatedLocation) => set((state) => {
    const updatedLocations = state.locations.map(location =>
      location.id === id ? { ...location, ...updatedLocation } : location
    );
    localStorage.setItem("stone_locations", JSON.stringify(updatedLocations));
    return { locations: updatedLocations };
  }),

  // Delete: Remove a location by its id
  deleteLocation: (id) => set((state) => {
    const updatedLocations = state.locations.filter(location => location.id !== id);
    localStorage.setItem("stone_locations", JSON.stringify(updatedLocations));
    return { locations: updatedLocations };
  }),
}));

export default useLocationStore;
