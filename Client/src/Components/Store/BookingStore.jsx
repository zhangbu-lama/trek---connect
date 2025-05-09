// import { create } from 'zustand';

// export const useBookingStore = create((set) => ({
//   selectedBooking: null,
//   setSelectedBooking: (booking) => set({ selectedBooking: booking }),
//   clearSelectedBooking: () => set({ selectedBooking: null }),

//   formState: {},
//   setFormState: (formData) => set({ formState: formData }),
//   updateFormField: (field, value) =>
//     set((state) => ({
//       formState: {
//         ...state.formState,
//         [field]: value,
//       },
//     })),
// }));

import { create } from 'zustand';
import { getBookingByUserId } from '../api/Booking'; // adjust path as needed

const useBookingStore = create((set) => ({
  userBookings: [],
  
  fetchUserBookings: async (userId) => {
    try {
      const bookings = await getBookingByUserId(userId);
      set({ userBookings: bookings });
    } catch (error) {
      console.error('Error fetching user bookings:', error);
    }
  }
}));

export default useBookingStore;
