// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload); // Save token in localStorage
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('token'); // Remove token from localStorage on logout
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
