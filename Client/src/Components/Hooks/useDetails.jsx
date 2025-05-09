import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchDetails,
  fetchDetailById,
  fetchDetailsByPlace,
  addDetail,
  updateDetail,
  deleteDetail,
} from '../api/Detail';

export const useDetails = () => {
  return useQuery({
    queryKey: ['details'],
    queryFn: fetchDetails,
  });
};

export const useDetailById = (id) => {
  return useQuery({
    queryKey: ['details', id],
    queryFn: () => fetchDetailById(id),
    enabled: !!id,
  });
};

export const useDetailsByPlace = (placeId) => {
  return useQuery({
    queryKey: ['details', 'place', placeId],
    queryFn: () => fetchDetailsByPlace(placeId),
    enabled: !!placeId,
  });
};

export const useAddDetail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['details'] });
    },
  });
};

export const useUpdateDetail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateDetail(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['details'] });
    },
  });
};

export const useDeleteDetail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['details'] });
    },
  });
};
