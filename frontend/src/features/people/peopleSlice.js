import api from "../../app/api";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

// Async thunk to fetch all people
export const getAllPeople = createAsyncThunk("people/getAllPeople", async () => {
  try {
    const response = await api.get("/api/v1/people");
    return response.data.data; // Returning the array of relations with their people
  } catch (error) {
    throw Error(error.response?.data?.message || "Failed to fetch people");
  }
});

// Async thunk to add a person
export const addPerson = createAsyncThunk("people/addPerson", async (personData) => {
  try {
    console.log(personData)
    const response = await api.post("/api/v1/people", personData);
    return response.data.data; // Return the newly added person
  } catch (error) {
    throw Error(error.response?.data?.message || "Failed to add person");
  }
});


// Async thunk to delete a person
export const deletePerson = createAsyncThunk("people/deletePerson", async ({ relationId, peopleId }) => {
  try {
    const response = await api.delete('/api/v1/people', {
      data: { relationId, peopleId }, 
    });
    console.log(response)
    return { relationId, peopleId }; 
  } catch (error) {
    throw Error(error.response?.data?.message || "Failed to delete person");
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
      })

      .addCase(deletePerson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePerson.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted person from the state
        const { relationId, peopleId } = action.payload;
        state.people = state.people.map(relation => {
          if (relation.relationId === relationId) {
            return {
              ...relation,
              people: relation.people.filter(person => person._id !== peopleId),
            };
          }
          return relation;
        });
      })
      .addCase(deletePerson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase('global/reset', (state) => {
        return {
          people: [],
          loading: false,
          error: null,
        };
      });
  },
});

// Selector to get all people
export const selectAllPeople = (state) => state.people.people;

// Memoized selector for derived data
export const selectPeopleCount = createSelector(
  [selectAllPeople],
  (people) => people.length
);

// Export the reducer to be used in the store
export default peopleSlice.reducer;

// You can also export the async thunks if needed
// export { getAllPeople, deletePerson };
