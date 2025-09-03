// src/store/slices/borrowSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;
const BASE_URL = `${API}/borrow`;

// 🔹 My Borrowed Books
export const fetchMyBorrowedBooks = createAsyncThunk(
  "borrow/fetchMyBorrowedBooks",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/my-borrowed-books`, {
        withCredentials: true,
      });
      return data.borrowedBooks || [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch borrowed books"
      );
    }
  }
);

// 🔹 Record Borrow (Admin only)
export const recordBorrowBook = createAsyncThunk(
  "borrow/recordBorrowBook",
  async ({ bookId, email }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/record-borrow-book/${bookId}`,
        { email },
        { withCredentials: true }
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to record borrow"
      );
    }
  }
);

// 🔹 Return Book (Admin only)
export const returnBorrowBook = createAsyncThunk(
  "borrow/returnBorrowBook",
  async ({ bookId, email }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/return-borrowed-books/${bookId}`,
        { email },
        { withCredentials: true }
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to return book"
      );
    }
  }
);

// 🔹 Get All Borrowed Books (Admin view)
export const fetchAllBorrowedBooks = createAsyncThunk(
  "borrow/fetchAllBorrowedBooks",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/borrowed-books-by-users`,
        { withCredentials: true }
      );
      return data.borrowedBooks;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch all borrowed books"
      );
    }
  }
);

const borrowSlice = createSlice({
  name: "borrow",
  initialState: {
    myBorrowedBooks: [],
    allBorrowedBooks: [],
    loading: false,
    error: null,
    message: null,
    fine: 0,
  },
  reducers: {
    resetBorrowState: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ My Borrowed Books
      .addCase(fetchMyBorrowedBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyBorrowedBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.myBorrowedBooks = action.payload;
      })
      .addCase(fetchMyBorrowedBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ All Borrowed Books
      .addCase(fetchAllBorrowedBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBorrowedBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.allBorrowedBooks = action.payload;
      })
      .addCase(fetchAllBorrowedBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Record Borrow
      .addCase(recordBorrowBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(recordBorrowBook.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(recordBorrowBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Return Borrow
      .addCase(returnBorrowBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(returnBorrowBook.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(returnBorrowBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBorrowState } = borrowSlice.actions;
export default borrowSlice.reducer;
