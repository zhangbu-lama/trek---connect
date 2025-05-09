import axiosInstance from './Index';

export const createBooking = async (bookingData) => {
    const response = await axiosInstance.post('/bookings/create', bookingData);
    return response.data.data;
  };
  

export const getAllBookings = async () => {
    const response = await axiosInstance.get('/bookings/all');
    return response.data.data;
  };

export const getBookingById = async (id) => {
  const response = await axiosInstance.get(`/bookings/${id}`);
  return response.data.data;
};

export const getBookingByUserId = async (userId) => {
  const response = await axiosInstance.get(`/bookings/user/${userId}`);
  return response.data.data;
};

