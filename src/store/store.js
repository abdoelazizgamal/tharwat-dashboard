import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { reportsApi } from './api/reportsApi';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [reportsApi.reducerPath]: reportsApi.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, reportsApi.middleware),
});