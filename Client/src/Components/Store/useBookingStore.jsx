import { create } from "zustand";

const useBookingStore = create((set) => ({
  bookings: JSON.parse(localStorage.getItem("bookings")) || [],

  addBooking: (booking) =>
    set((state) => {
      const updated = [...state.bookings, booking];
      localStorage.setItem("bookings", JSON.stringify(updated));
      return { bookings: updated };
    }),
}));

export default useBookingStore;
