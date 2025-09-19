import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './bookSlice.jsx';

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});