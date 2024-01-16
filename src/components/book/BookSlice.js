import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBooks } from './bookapi';
import api from '../../apiService';
import { toast } from 'react-toastify';

const initialState = {
  books: [],
  readingList: [],
  bookDetail: null,
  status: {loading: false, error: ""}
}
export const fetchData = createAsyncThunk("book/fetchData", async (props) => {
    const response = await fetchBooks(props);
    return response.data;
  });

export const addToReadingList = createAsyncThunk(
  "book/addToReadingList",
  async (book) => {
    const response = await api.post(`/favorites`, book);
    return response.data;
});

export const getReadingList = createAsyncThunk(
  "book/getReadingList", 
  async () => {
    const response = await api.get(`/favorites`);
    return response.data;
});

export const removeFromReadingList = createAsyncThunk(
  "book/removeFromReadingList", 
  async (bookId) => {
    const response = await api.delete(`/favorites/${bookId}`);
    return response.data;
});

export const getBookDetail = createAsyncThunk(
    "book/getBookDetail",
    async (bookId) => {
      const response = await api.get(`/books/${bookId}`);
      return response.data;
    }
  );

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
        state.status = {...state.status, loading: true};
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = {loading: false, error: ""};
        state.books = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = {...state.status, error: "Failed to fetch"};
      });
    builder.addCase(addToReadingList.pending, (state) => {})
      .addCase(addToReadingList.fulfilled, (state, action) => {
        toast.success("The book has been added to the reading list!")
      })
      .addCase(addToReadingList.rejected, (state, action) => {
        state.status = {...state.status, error: "Failed to add to reading list"};
      });
    builder.addCase(getReadingList.pending, (state) => {
        state.status = {...state.status, loading: true};
      })
      .addCase(getReadingList.fulfilled, (state, action) => {
        state.status = {loading: false, error: ""};
        state.readingList = action.payload;
      })
      .addCase(getReadingList.rejected, (state, action) => {
        state.status = {...state.status, error: "Failed to get reading list"};
      });
    builder.addCase(removeFromReadingList.pending, (state) => {
        state.status = {...state.status, loading: true};
      })
      .addCase(removeFromReadingList.fulfilled, (state, action) => {
        toast.success("The book has been removed from reading list!")
      })
      .addCase(removeFromReadingList.rejected, (state, action) => {
        state.status = {...state.status, error: "Failed to remove from reading list"};
      });
      builder.addCase(getBookDetail.pending, (state) => {
        state.status = {...state.status, loading: true};
      })
      .addCase(getBookDetail.fulfilled, (state, action) => {
        state.status = {loading: false, error: ""};
        state.bookDetail = action.payload;
      })
      .addCase(getBookDetail.rejected, (state, action) => {
        state.status = {...state.status, error: "Failed to get book detail"};
      });
  },
})

export default bookSlice.reducer