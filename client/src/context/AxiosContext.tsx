import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwttoken');
  if (token) config.headers.authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;