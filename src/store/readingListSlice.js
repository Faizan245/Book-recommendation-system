// src/redux/readingListSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Helper function to load state from localStorage
const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('readingList');
        return serializedState ? JSON.parse(serializedState) : [];
    } catch (e) {
        console.warn('Failed to load from localStorage', e);
        return [];
    }
};

// Helper function to save state to localStorage
const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('readingList', serializedState);
    } catch (e) {
        console.warn('Failed to save to localStorage', e);
    }
};

const initialState = {
    readingList: loadFromLocalStorage(), // Load from localStorage initially
};

const readingListSlice = createSlice({
    name: 'readingList',
    initialState,
    reducers: {
        addToReadingList: (state, action) => {
            state.readingList.push({ ...action.payload, read: false });
            saveToLocalStorage(state.readingList); // Save updated state to localStorage
        },
        removeFromReadingList: (state, action) => {
            state.readingList = state.readingList.filter(book => book.id !== action.payload);
            saveToLocalStorage(state.readingList); // Save updated state to localStorage
        },
        toggleReadStatus: (state, action) => {
            const book = state.readingList.find(book => book.id === action.payload);
            if (book) {
                book.read = !book.read;
                saveToLocalStorage(state.readingList); // Save updated state to localStorage
            }
        },
    },
});

export const { addToReadingList, removeFromReadingList, toggleReadStatus } = readingListSlice.actions;
export default readingListSlice.reducer;
