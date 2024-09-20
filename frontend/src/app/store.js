import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import relationsReducer from '../features/relation/relationSlice';
import peopleReducer from "../features/people/peopleSlice"

export const store = configureStore({
    reducer: {
        auth:  authReducer,
        relations: relationsReducer,
        people: peopleReducer
    },
});

