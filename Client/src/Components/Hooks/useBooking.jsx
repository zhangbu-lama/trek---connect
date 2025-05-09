import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createBooking,
  getAllBookings,
  getBookingById,
  getBookingByUserId,
} from '../api/Booking';

export const useCreateBooking = () =>
  useMutation({ mutationFn: createBooking });

export const useGetAllBookings = () =>
  useQuery({ queryKey: ['bookings'], queryFn: getAllBookings });

export const useGetBookingById = (id) =>
  useQuery({ queryKey: ['booking', id], queryFn: () => getBookingById(id), enabled: !!id });

export const useGetBookingByUserId = (userId) =>
  useQuery({ queryKey: ['bookings', 'user', userId], queryFn: () => getBookingByUserId(userId), enabled: !!userId });
