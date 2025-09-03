// src/store/slices/bookSlice.js
import axios from "axios";
import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";

const API = import.meta.env.VITE_API_URL;

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    loading: false,
  },
  reducers: {
    fetchAllBooksRequest(state) {
      state.loading = true;
    },
    fetchAllBooksSuccess(state, action) {
      state.loading = false;
      state.books = action.payload;
    },
    fetchAllBooksFailed(state) {
      state.loading = false;
    },

    addBookRequest(state) {
      state.loading = true;
    },
    addBookSuccess(state, action) {
      state.loading = false;
      state.books.push(action.payload);
    },
    addBookFailed(state) {
      state.loading = false;
    },

    deleteBookRequest(state) {
      state.loading = true;
    },
    deleteBookSuccess(state, action) {
      state.loading = false;
      state.books = state.books.filter((book) => book._id !== action.payload);
    },
    deleteBookFailed(state) {
      state.loading = false;
    },
  },
});

// --- Thunks --- //
export const fetchAllBooks = () => async (dispatch) => {
  dispatch(bookSlice.actions.fetchAllBooksRequest());
  await axios
    .get(`${API}/book/all`, { withCredentials: true })
    .then((res) => {
      dispatch(bookSlice.actions.fetchAllBooksSuccess(res.data.books));
    })
    .catch((err) => {
      dispatch(bookSlice.actions.fetchAllBooksFailed());
      toast.error(err.response?.data?.message || "Failed to fetch books");
    });
};

export const addBook = (data) => async (dispatch) => {
  dispatch(bookSlice.actions.addBookRequest());
  await axios
    .post(`${API}/book/admin/add`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      dispatch(bookSlice.actions.addBookSuccess(res.data.book));
      toast.success("Book added successfully!");
    })
    .catch((err) => {
      dispatch(bookSlice.actions.addBookFailed());
      toast.error(err.response?.data?.message || "Failed to add book");
    });
};

export const deleteBook = (id) => async (dispatch) => {
  dispatch(bookSlice.actions.deleteBookRequest());
  await axios
    .delete(`${API}/book/delete/${id}`, { withCredentials: true })
    .then(() => {
      dispatch(bookSlice.actions.deleteBookSuccess(id));
      toast.success("Book deleted successfully!");
    })
    .catch((err) => {
      dispatch(bookSlice.actions.deleteBookFailed());
      toast.error(err.response?.data?.message || "Failed to delete book");
    });
};

export default bookSlice.reducer;
