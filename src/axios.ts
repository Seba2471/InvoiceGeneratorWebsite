import axios from 'axios';
import jwtServices from './helpers/jwtService';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = jwtServices.getAccessToken();
  if (token) {
    config.headers!.authorization = 'Bearer ' + jwtServices.getAccessToken();
  }
  return config;
});

export default axiosInstance;
