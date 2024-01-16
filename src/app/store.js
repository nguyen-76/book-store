import { configureStore } from '@reduxjs/toolkit';
import bookReducer from '../components/book/BookSlice';

export const store = configureStore({
  reducer: {book: bookReducer},
})
