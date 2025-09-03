import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Base API URL from frontend .env
const API = import.meta.env.VITE_API_URL;

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    fetchAllUsersRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },
    fetchAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    fetchAllUsersFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addAdminRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },
    addAdminSuccess: (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.message;
      state.users.push(action.payload.admin);
    },
    addAdminFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// ✅ Export actions
export const {
  fetchAllUsersRequest,
  fetchAllUsersSuccess,
  fetchAllUsersFailed,
  addAdminRequest,
  addAdminSuccess,
  addAdminFailed,
} = userSlice.actions;

// ✅ Thunks
export const fetchAllUsers = () => async (dispatch) => {
  dispatch(fetchAllUsersRequest());
  try {
    console.log("🚀 Calling /user/all API...");
    const { data } = await axios.get(`${API}/user/all`, {
      withCredentials: true,
    });
    console.log("✅ API Response:", data);
    dispatch(fetchAllUsersSuccess(data.users));
  } catch (err) {
    console.error("❌ API Error:", err.response?.data || err.message);
    dispatch(
      fetchAllUsersFailed(err.response?.data?.message || "Failed to load users")
    );
  }
};

export const registerNewAdmin = (formData) => async (dispatch) => {
  dispatch(addAdminRequest());
  try {
    console.log("🚀 Registering new admin...");
    const { data } = await axios.post(
      `${API}/user/add/new-admin`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    console.log("✅ Admin Created:", data);
    dispatch(addAdminSuccess(data));
  } catch (err) {
    console.error("❌ Admin Creation Error:", err.response?.data || err.message);
    dispatch(
      addAdminFailed(err.response?.data?.message || "Failed to register admin")
    );
  }
};

// ✅ Export reducer
export default userSlice.reducer;
