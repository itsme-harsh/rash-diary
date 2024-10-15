import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Ensure this is correct
});

// Function to get a specific cookie value by name
// const getCookie = (name) => {
//   const value = `; ${document.cookie}`; // Append '; ' to facilitate searching
//   const parts = value.split(`; ${name}=`); // Split the cookie string by the specific cookie name
//   if (parts.length === 2) return parts.pop().split(';').shift(); // Return the cookie value if found
// };

// Usage
// const token = getCookie('Token'); // Replace 'Token' with the actual cookie name


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
    console.log(error)
    if (error.status === 429) {
      toast.error(error.response.data)
      return;
    }else{
      originalRequest;
    }
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.statusText === "Unauthorized" && error.response.status === 401) {

      const refreshToken = localStorage.getItem('RefreshToken');
      if (refreshToken) {
        try {
          // Attempt to refresh the access token
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/refresh-token`, { refreshToken: refreshToken });

          console.log("pookie", response.data)

          if (response.data.success) {
            const { accessToken, refreshToken } = response.data.data;

            // Save the new access token to local storage
            localStorage.setItem('Token', accessToken);
            localStorage.setItem('RefreshToken', refreshToken);

            // Set the new access token in the original request
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;

            // Retry the original request
            return api(originalRequest);
          } else {
            localStorage.removeItem('Token');
            localStorage.removeItem('user');
            localStorage.removeItem('RefreshToken');
            window.location.href = '/';
          }
          // {
          //     "statusCode": 200,
          //     "data": {
          //         "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmVhOGJkZTQ0OGJkZjE2Yjg0ZGEyODMiLCJpYXQiOjE3Mjc5MzYzOTQsImV4cCI6MTcyODgwMDM5NH0.-KOAMY4x2Uw0zoR1Brxu4rMGCG0fHqhtxLPKpAhzZUY"
          //     },
          //     "message": "Access token refreshed",
          //     "success": true
          // }
        } catch (refreshError) {
          toast.error("session expired")
          console.log("error while changing access token")
          // If refresh fails, log out the user
          localStorage.removeItem('Token');
          localStorage.removeItem('user');
          localStorage.removeItem('RefreshToken');
          window.location.href = '/';
          // Redirect to login or show a message
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token available, log out the user
        localStorage.removeItem('Token');

        // Redirect to login or show a message
        window.location.href = '/';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
