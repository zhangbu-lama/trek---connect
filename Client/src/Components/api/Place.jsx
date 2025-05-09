import axiosInstance from './Index';

// Fetch places
export const fetchPlaces = async () => {
  const response = await axiosInstance.get('/places/all');
  return response.data.data;
};

// Add place
export const addPlace = async (data) => {
    console.log("data",data)
  const response = await axiosInstance.post('/places/add', data);
  return response.data.data;
};

// Update place
export const updatePlace = async (id, data) => {
  const response = await axiosInstance.put(`/places/update/${id}`, data);
  return response.data.data;
};

// Delete place
export const deletePlace = async (id) => {
  const response = await axiosInstance.delete(`/places/delete/${id}`);
  return response.data.data;
};
