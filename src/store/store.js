// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import readingListReducer from './readingListSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    readingList: readingListReducer,     
  },
});

export default store;
