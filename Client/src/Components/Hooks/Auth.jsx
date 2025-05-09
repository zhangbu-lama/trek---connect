import { useMutation } from '@tanstack/react-query';
import { registerUser, loginUser, logoutUser } from '../api/Auth';
import useAuthStore from '../Store/AuthStore';
import React from 'react';
export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => console.log('Registration successful:', data),
    onError: (error) => console.error('Error registering:', error.response?.data?.error || error.message),
  });
};

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (data) => {
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
      const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

      // Check if it's admin login
      if (data.email === adminEmail && data.password === adminPassword) {
        return { user: { email: data.email }, role: 'admin' };
      }

      // Otherwise, normal user login
      const response = await loginUser(data); // API call
      return { user: response.user, role: 'user' };
    },
    onSuccess: (result) => {
      console.log('Login successful:', result);
      setUser(result.user, result.role);
    },
    onError: (error) => {
      console.error('Error logging in:', error.response?.data?.error || error.message);
    },
  });
};

export const useLogout = () => {
  const clearUser = useAuthStore((state) => state.clearUser);
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      console.log('Logout successful:', data);
      clearUser();
    },
    onError: (error) => console.error('Error logging out:', error.response?.data?.error || error.message),
  });
};