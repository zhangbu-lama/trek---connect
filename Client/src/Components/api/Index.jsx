import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
    withCredentials: true,
});
axiosInstance.interceptors.request.use(config => {
  return config;
});
export default axiosInstance;