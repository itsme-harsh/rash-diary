import api from "../../app/api";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Async thunk to fetch all people
export const getAllPeople = createAsyncThunk("people/getAllPeople", async () => {
  try {
    const response = await api.get("/api/v1/people");
    return response.data.data; // Returning the array of relations with their people
  } catch (error) {
    throw Error(error.response?.data?.message || "Failed to fetch people");
  }
});

// Create a slice for people
const peopleSlice = createSlice({
  name: 'people',
  initialState: {
    people: [], // Will hold the array of relations with their people
    loading: false,
    error: null,
  },
  reducers: {
    // You can add additional synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPeople.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPeople.fulfilled, (state, action) => {
        state.loading = false;
        state.people = action.payload; // Correctly assign the fetched data
      })
      .addCase(getAllPeople.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the reducer to be used in the store
export default peopleSlice.reducer;

// You can also export the async thunk if needed
// export { getAllPeople };
