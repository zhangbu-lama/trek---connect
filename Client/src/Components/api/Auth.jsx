import axiosInstance from './Index';

export const registerUser = async (data) => {
    const response = await axiosInstance.post('/v1/auth/signup', data);
    return response.data;
};

export const loginUser = async (data) => {
    const response = await axiosInstance.post('/v1/auth/login', data);
    return response.data;
};

export const logoutUser = async () => {
    const response = await axiosInstance.post('/v1/auth/logout', {});
    return response.data;
};
