import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Ensure this is correct
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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      // Get refresh token from local storage
      const refreshToken = localStorage.getItem('RefreshToken');

      if (refreshToken) {
        try {
          // Attempt to refresh the access token
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/refresh-token`, { token: refreshToken });
          const { accessToken } = response.data;

          // Save the new access token to local storage
          localStorage.setItem('Token', accessToken);

          // Set the new access token in the original request
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          // Retry the original request
          return api(originalRequest);
        } catch (refreshError) {
          // If refresh fails, log out the user
          localStorage.removeItem('Token');
          localStorage.removeItem('user');
          localStorage.removeItem('RefreshToken');
          // Redirect to login or show a message
          // e.g., window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token available, log out the user
        localStorage.removeItem('Token');
        // Redirect to login or show a message
        // e.g., window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
