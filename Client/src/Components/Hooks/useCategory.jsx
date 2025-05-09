import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCategories, addCategory, updateCategory, deleteCategory } from '../api/Category';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    onSuccess: (data) => {
      console.log('Fetched categories:', data);
    },
    onError: (error) => {
      console.error('Error fetching categories:', error);
    },
    retry: 2,
    staleTime: 1000 * 60,
  });
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCategory,
    onMutate: async (formData) => {
      console.log('Adding category with FormData:', formData);
      await queryClient.cancelQueries(['categories']);
      const previousCategories = queryClient.getQueryData(['categories']);
      return { previousCategories };
    },
    onSuccess: (response) => {
      console.log('Add category response in hook:', response);
      const newCategory = response.data || response;
      if (newCategory && newCategory._id) {
        queryClient.setQueryData(['categories'], (oldCategories) => {
          const categories = Array.isArray(oldCategories) ? oldCategories : [];
          return [...categories, newCategory];
        });
      } else {
        console.warn('No valid category data in response:', response);
      }
      queryClient.invalidateQueries(['categories']);
    },
    onError: (error, variables, context) => {
      console.error('Error adding category:', error);
      queryClient.setQueryData(['categories'], context.previousCategories);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['categories']);
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ _id, data }) => updateCategory({ _id, data }),
    onSuccess: (updatedCategory) => {
      queryClient.setQueryData(['categories'], (oldCategories) =>
        oldCategories
          ? oldCategories.map((category) =>
              category._id === updatedCategory._id ? updatedCategory : category
            )
          : [updatedCategory]
      );
    onMutate: async ({ _id, data }) => {
      console.log('Updating category:', _id, data);
      await queryClient.cancelQueries(['categories']);
      const previousCategories = queryClient.getQueryData(['categories']);
      return { previousCategories };
    }},

    onError: (error, variables, context) => {
      console.error('Error updating category:', error);
      queryClient.setQueryData(['categories'], context.previousCategories);
    },

    onSettled: () => {
      queryClient.invalidateQueries(['categories']);
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onMutate: async (id) => {
      console.log('Deleting category:', id);
      await queryClient.cancelQueries(['categories']);
      const previousCategories = queryClient.getQueryData(['categories']);
      queryClient.setQueryData(['categories'], (oldCategories) =>
        oldCategories ? oldCategories.filter((category) => category._id !== id) : []
      );
      return { previousCategories };
    },
    onError: (error, id, context) => {
      console.error('Error deleting category:', error);
      queryClient.setQueryData(['categories'], context.previousCategories);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['categories']);
    },
  });
};
