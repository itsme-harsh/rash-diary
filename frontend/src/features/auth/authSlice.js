import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../app/api';
import { toast } from 'react-toastify';


const API_URL = import.meta.env.VITE_API_URL;

// Login user
export const loginUser = createAsyncThunk('auth/loginUser', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/users/login`, data);

    if (response.data.success) {
      const { user, accessToken, refreshToken } = response.data.data;
      localStorage.setItem('Token', accessToken);
      localStorage.setItem('RefreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user)); // Store user data in localStorage

      return { user, accessToken };
    } else if (response.data.message === 'Please verify your account') {
      return rejectWithValue({ message: response.data.message, isVerificationRequired: true });
    } else {
      return rejectWithValue(response.data);
    }
  } catch (error) {
    return rejectWithValue(error.response?.data || { error: 'An unexpected error occurred' });
  }
});

// Verify OTP
export const verifyOtp = createAsyncThunk('auth/verifyOtp', async ({ otp }, { rejectWithValue }) => {
  try {
    const username = sessionStorage.getItem('username');
    if (!username) {
      return rejectWithValue({ message: 'No user information found. Please log in again.' });
    }

    const response = await axios.post(`${API_URL}/api/v1/users/verify-otp`, { otp, username });

    if (response.data.success) {
      sessionStorage.removeItem('username');
      return response.data; // Return full response for further use
    } else {
      return rejectWithValue(response.data);
    }
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'An unexpected error occurred during OTP verification' });
  }
});

// Resend OTP
export const resendOtp = createAsyncThunk('auth/resendOtp', async (_, { rejectWithValue }) => {
  try {
    const username = sessionStorage.getItem('username');
    if (!username) {
      return rejectWithValue({ message: 'No user information found. Please log in again.' });
    }

    const response = await axios.post(`${API_URL}/api/v1/users/resend-otp`, { username });

    if (response.data.success) {
      return response.data;
    } else {
      return rejectWithValue(response.data);
    }
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'An unexpected error occurred while resending OTP' });
  }
});

export const logger = createAsyncThunk('auth/logger', async (id, { rejectWithValue }) => {
  try {
      const response = await api.post(`${API_URL}/api/v1/users/logger`, { "id":id });
      if (response.data.success) {
          return response.data; // Make sure this returns a consistent structure
      }
      return rejectWithValue(response.data);
  } catch (error) {
      return rejectWithValue(error.response?.data || { error: 'An unexpected error occurred' });
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { dispatch }) => {
  // Call the logout API
  await api.post(`${API_URL}/api/v1/users/logout`); // Adjust the URL if necessary
  dispatch(logout()); // Clear the Redux state
  toast.success("User logged out successfully")
});

// Auth slice
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    isVerified: false,
    user: null,
    status: 'idle',
    error: null,
    logs: []
  },
  reducers: {
    logout(state) {
      localStorage.removeItem('Token');
      localStorage.removeItem('RefreshToken');
      localStorage.removeItem('user'); // Remove user data
      state.isLoggedIn = false;
      state.isVerified = false;
      state.user = null;
    },
    checkToken(state) {
      const token = localStorage.getItem('Token');
      const user = JSON.parse(localStorage.getItem('user')); // Retrieve user from localStorage
      if (token && user) {
        state.isLoggedIn = true;
        state.isVerified = user.verified; // Check if user is verified
        state.user = user;
        state.status = 'succeeded';
      } else {
        state.isLoggedIn = false;
        state.isVerified = false;
        state.user = null;
        state.status = 'succeeded'; // Set status to succeeded even if not logged in
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoggedIn = true;
        state.isVerified = action.payload.user.verified;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoggedIn = false;
        state.user = null;
        state.isVerified = false;

        if (action.payload?.isVerificationRequired) {
          state.error = action.payload.message;
        } else {
          state.error = action.payload?.message || 'Login failed';
        }
      })
      .addCase(verifyOtp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isVerified = true;
        state.user = action.payload.data; // Ensure data is assigned correctly
        state.error = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'OTP verification failed';
      })
      .addCase(resendOtp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to resend OTP';
      })
      .addCase(logger.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(logger.fulfilled, (state, action) => {
        state.loading = false;
        state.logs.push(action.payload?.data) // Assuming you want to store the logs
      })
      .addCase(logger.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Capture the error message
      });
      ;
  },
});

export const { logout, checkToken } = authSlice.actions;

export default authSlice.reducer;