import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import Cookies from 'js-cookie';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: Cookies.get('token') || null,
  isAuthenticated: !!Cookies.get('token')
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      Cookies.remove('token');
      localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.signin.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.data;
        state.token = payload.data.accessToken;
        state.isAuthenticated = true;
        Cookies.set('token', payload.data.accessToken, { expires: 7 }); // Expires in 7 days
        localStorage.setItem('user', JSON.stringify(payload.data));
      }
    );
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;