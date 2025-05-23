import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./auth/authReducer"

// Combine reducers
const rootReducer = combineReducers({
	authStore: authReducer,
	[apiSlice.reducerPath]: apiSlice.reducer,
});

// Configure the store
const store = configureStore({
	reducer: rootReducer,
	devTools: import.meta.env.VITE_PUBLIC_ENV !== "production",
	middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
