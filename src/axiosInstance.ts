// axiosInstance.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://localhost:7092/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding access token to each request
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        console.log('token added');
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// Response interceptor for refreshing token when requesting new refresh token
let isRefreshing = false;
let refreshSubscribers: ((accessToken: string) => void)[] = [];

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        try {
          const accessToken = await new Promise<string>((resolve) => {
            refreshSubscribers.push(resolve);
          });
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      originalRequest._retry = true;
      isRefreshing = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post('/account/refresh-token', { refreshToken });
          const newAccessToken = response.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          refreshSubscribers.forEach((callback) => callback(newAccessToken));
          refreshSubscribers = [];
          isRefreshing = false;
          return axios(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          return Promise.reject(refreshError);
        }
      } else {
        // Handle case where refreshToken is missing
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
