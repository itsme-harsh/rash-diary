import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../app/api'; // Ensure this path is correct

// Define a cache expiration time (e.g., 5 minutes)
const CACHE_EXPIRATION = 10 * 60 * 1000; // 5 minutes in milliseconds

// Thunk to fetch relations
export const getRelations = createAsyncThunk('relations/getRelations', async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const currentTime = Date.now();
    
    // Check if data is in cache and still valid
    if (state.relations.lastFetched && (currentTime - state.relations.lastFetched < CACHE_EXPIRATION)) {
        // Return cached data
        return state.relations.relations;
    }

    // try {
        const response = await api.get('/api/v1/relation');
        if (response.data.success) {
            return response.data.data;
        } else {
            return rejectWithValue(response.data.message);
        }
    // } catch (error) {
    //     console.error('API Error:', error);
    //     return rejectWithValue(error.response?.data || { error: 'An unexpected error occurred' });
    // }
});

export const createRelation = createAsyncThunk('relations/createRelation', async (newRelation, { rejectWithValue }) => {
    // try {
        const response = await api.post('/api/v1/relation', newRelation);
        if (response.data.success) {
            return response.data.data; // Assuming the created relation is returned in 'data'
        } else {
            return rejectWithValue(response.data.message);
        }
    // } catch (error) {
    //     // Handle specific error codes
    //     if (error.response?.status === 409) {
    //         return rejectWithValue(error.response?.message);
    //     } else {
    //         console.error('API Error:', error);
    //         return rejectWithValue(error.response?.data || { error: 'An unexpected error occurred' });
    //     }
    // }
});


// Create a slice for relations
const relationsSlice = createSlice({
    name: 'relations',
    initialState: {
        relations: [], // Initialize with an empty array
        lastFetched: null, // Timestamp of last data fetch
        status: 'idle', // or 'loading', 'succeeded', 'failed'
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRelations.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getRelations.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.relations = action.payload; // Update state with fetched data
                state.lastFetched = Date.now(); // Update lastFetched timestamp
            })
            .addCase(getRelations.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to fetch relations';
            });

        // Handle createRelation
         builder
         .addCase(createRelation.pending, (state) => {
             state.status = 'loading';
         })
         .addCase(createRelation.fulfilled, (state, action) => {
             state.status = 'succeeded';
             state.relations.push(action.payload); // Add the new relation to the list
         })
         .addCase(createRelation.rejected, (state, action) => {
             state.status = 'failed';
             state.error = action.payload;
         });
    },
});

export default relationsSlice.reducer;
