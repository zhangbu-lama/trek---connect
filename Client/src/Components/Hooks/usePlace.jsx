import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPlaces, addPlace, updatePlace, deletePlace } from '../api/Place';

export const usePlaces = () => {
  return useQuery({
    queryKey: ['places'],
    queryFn: fetchPlaces,
  });
};

export const useAddPlace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addPlace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['places'] });
    },
  });
};

export const useUpdatePlace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ _id, data }) => updatePlace(_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['places'] });
    },
  });
};

export const useDeletePlace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePlace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['places'] });
    },
  });
};