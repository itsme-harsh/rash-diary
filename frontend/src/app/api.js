import axios from 'axios';
import { logout } from '../features/auth/authSlice'; // Import the action
import { useDispatch } from 'react-redux';

const api = axios.create({
  baseURL: '/base/api/v1',
});

// Request interceptor to add the token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('Token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const dispatch = useDispatch()
    const { config, response: { status } } = error;
    const originalRequest = config;

    if (status === 401) { // Unauthorized
      const refreshToken = localStorage.getItem('RefreshToken');
      
      if (refreshToken) {
        try {
          // Make a request to refresh the token
          const res = await axios.post('/base/api/v1/users/refresh-token', { refreshToken });
          
          const { accessToken, refreshToken: newRefreshToken } = res.data.data;
          
          // Update tokens in localStorage
          localStorage.setItem('Token', accessToken);
          localStorage.setItem('RefreshToken', newRefreshToken);
          
          // Update the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Handle refresh token failure
          dispatch(logout()); // Dispatch logout action
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token available; log out
       dispatch(logout()); // Dispatch logout action
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
