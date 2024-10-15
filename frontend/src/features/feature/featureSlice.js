import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../app/api'; // Update with your actual API service path

// Async thunk for adding a wish
export const addWish = createAsyncThunk(
    "wish/addWish", 
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post("/api/v1/feature/wish", data);
            return response.data.data; // Return the newly added wish
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to generate wish";
            return rejectWithValue(errorMessage); // Properly handle errors
        }
    }
);

// Wish slice
const wishSlice = createSlice({
    name: 'wish',
    initialState: {
        currentWish: null, // Holds the latest generated wish
        loading: false,
        error: null,       // Holds any error message
    },
    extraReducers: (builder) => {
        builder
            // Pending state
            .addCase(addWish.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Fulfilled state
            .addCase(addWish.fulfilled, (state, action) => {
                state.loading = false;
                state.currentWish = action.payload;  // Store the newly generated wish
            })
            // Rejected state
            .addCase(addWish.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;  // Store the error message
            });
    }
});

export default wishSlice.reducer;
