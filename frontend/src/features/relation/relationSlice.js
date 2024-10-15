import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../app/api'; // Ensure this path is correct

// Define a cache expiration time (e.g., 5 minutes)
const CACHE_EXPIRATION = 10 * 60 * 1000; // 10 minutes in milliseconds

// Thunk to fetch relations
export const getRelations = createAsyncThunk('relations/getRelations', async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const currentTime = Date.now();

    // Check if data is in cache and still valid
    if (state.relations.lastFetched && (currentTime - state.relations.lastFetched < CACHE_EXPIRATION)) {
        // Return cached data
        return state.relations.relations;
    }

    const response = await api.get('/api/v1/relation');
    if (response.data.success) {
        return response.data.data;
    } else {
        return rejectWithValue(response.data.message);
    }
}
);

// Thunk to delete a relation by ID
export const deleteRelation = createAsyncThunk('relations/deleteRelation', async (id, { rejectWithValue }) => {
    try {
        const response = await api.delete(`/api/v1/relation/${id}`);
        if (response.data.success) {
            return id; // Return the deleted relation's id to remove from the state
        } else {
            return rejectWithValue(response.data.message); // Return error message
        }
    } catch (error) {
        return rejectWithValue(error.response?.data.message || 'Failed to delete relation');
    }
}
);

// Thunk to create a new relation
export const createRelation = createAsyncThunk('relations/createRelation', async (newRelation, { rejectWithValue }) => {
    try {
        const response = await api.post('/api/v1/relation', newRelation);
        if (response.data.success) {
            return response.data.data; // Assuming the created relation is returned in 'data'
        } else {
            return rejectWithValue(response.data.message);
        }
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Failed to create relation');
    }
}
);

// Thunk to update a relation
export const updateRelation = createAsyncThunk(
    'relations/updateRelation',
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/api/v1/relation/${id}`, updatedData);
            console.log(response)
            if (response.data.success) {
                return response.data.data; // Return the updated relation
            } else {
                return rejectWithValue(response.data.message); // Return error message
            }
        } catch (error) {
            return rejectWithValue(error.response?.data.message || 'Failed to update relation');
        }
    }
);

// Create a slice for relations
const relationsSlice = createSlice({
    name: 'relations',
    initialState: {
        relations: [], // Initialize with an empty array
        lastFetched: null, // Timestamp of last data fetch
        status: 'idle', // or 'loading', 'succeeded', 'failed'
        error: null,
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
            })
            // Handle createRelation
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
                state.lastFetched = Date.now();
            })
            // Handle deleteRelation
            .addCase(deleteRelation.fulfilled, (state, action) => {
                state.relations = state.relations.filter(relation => relation._id !== action.payload);
            })
            .addCase(deleteRelation.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Handle updateRelation
            .addCase(updateRelation.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateRelation.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Find the index of the updated relation and replace it
                const index = state.relations.findIndex(relation => relation._id === action.payload._id);
                if (index !== -1) {
                    state.relations[index] = action.payload; // Update the relation in the state
                }
            })
            .addCase(updateRelation.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase('global/reset', (state) => {
                return {
                    relations: [], // Reset to initial state
                    lastFetched: null,
                    status: 'idle',
                    error: null,
                };
            });
    },
});

export default relationsSlice.reducer;
