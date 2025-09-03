// src/store/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL; // ✅ use env variable

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    message: null,
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    // REGISTER
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    registerFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // OTP VERIFICATION
    otpVerificationRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    otpVerificationSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    otpVerificationFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // LOGIN
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    loginFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // LOGOUT
    logoutRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.user = null;
      state.isAuthenticated = false;
    },
    logoutFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // RESET SLICE
    resetAuthSlice: (state) => {
      state.error = null;
      state.loading = false;
      state.message = null;
    },

    // GET USER
    getUserRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    getUserFailed: (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    // FORGET PASSWORD
    forgetPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    forgetPasswordFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // RESET PASSWORD
    resetPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    resetPasswordFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // UPDATE PASSWORD
    updatePasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    updatePasswordFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // UPDATE CREDENTIALS
    updateCredentialsRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateCredentialsSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.user = action.payload.user;
    },
    updateCredentialsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const resetAuthSlice = () => (dispatch) => {
  dispatch(authSlice.actions.resetAuthSlice());
};

// ===================== ACTIONS =====================

const axiosConfig = {
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
};

// REGISTER
export const register = (data) => async (dispatch) => {
  dispatch(authSlice.actions.registerRequest());
  try {
    const res = await axios.post(`${API}/auth/register`, data, axiosConfig);
    dispatch(authSlice.actions.registerSuccess(res.data));
  } catch (error) {
    dispatch(authSlice.actions.registerFailed(error.response?.data?.message || error.message));
  }
};

// OTP VERIFICATION
export const otpVerification = ({ email, otp }) => async (dispatch) => {
  dispatch(authSlice.actions.otpVerificationRequest());
  try {
    const res = await axios.post(`${API}/auth/verify-otp`, { email, otp }, axiosConfig);
    dispatch(authSlice.actions.otpVerificationSuccess(res.data));
  } catch (error) {
    dispatch(authSlice.actions.otpVerificationFailed(error.response?.data?.message || error.message));
  }
};

// LOGIN
export const login = (data) => async (dispatch) => {
  dispatch(authSlice.actions.loginRequest());
  try {
    const res = await axios.post(`${API}/auth/login`, data, axiosConfig);
    dispatch(authSlice.actions.loginSuccess(res.data));
  } catch (error) {
    dispatch(authSlice.actions.loginFailed(error.response?.data?.message || error.message));
  }
};

// LOGOUT
export const logout = () => async (dispatch) => {
  dispatch(authSlice.actions.logoutRequest());
  try {
    const res = await axios.get(`${API}/auth/logout`, axiosConfig);
    dispatch(authSlice.actions.logoutSuccess(res.data.message));
  } catch (error) {
    dispatch(authSlice.actions.logoutFailed(error.response?.data?.message || error.message));
  }
};

// GET USER
export const getUser = () => async (dispatch) => {
  dispatch(authSlice.actions.getUserRequest());
  try {
    const res = await axios.get(`${API}/auth/me`, axiosConfig);
    dispatch(authSlice.actions.getUserSuccess(res.data));
  } catch (error) {
    dispatch(authSlice.actions.getUserFailed(error.response?.data?.message || error.message));
  }
};

// FORGET PASSWORD
export const forgetPassword = (email) => async (dispatch) => {
  dispatch(authSlice.actions.forgetPasswordRequest());
  try {
    const res = await axios.post(`${API}/auth/forgot-password`, { email }, axiosConfig);
    dispatch(authSlice.actions.forgetPasswordSuccess(res.data.message));
  } catch (error) {
    dispatch(authSlice.actions.forgetPasswordFailed(error.response?.data?.message || error.message));
  }
};

// RESET PASSWORD
export const resetPassword = (data, token) => async (dispatch) => {
  dispatch(authSlice.actions.resetPasswordRequest());
  try {
    const res = await axios.post(`${API}/auth/reset-password/${token}`, data, axiosConfig);
    dispatch(authSlice.actions.resetPasswordSuccess(res.data));
  } catch (error) {
    dispatch(authSlice.actions.resetPasswordFailed(error.response?.data?.message || error.message));
  }
};

// UPDATE PASSWORD
export const updatePassword = (data) => async (dispatch) => {
  dispatch(authSlice.actions.updatePasswordRequest());
  try {
    const res = await axios.put(`${API}/auth/update-password`, data, axiosConfig);
    dispatch(authSlice.actions.updatePasswordSuccess(res.data));
  } catch (error) {
    dispatch(authSlice.actions.updatePasswordFailed(error.response?.data?.message || error.message));
  }
};

// UPDATE CREDENTIALS
export const updateUserCredentials = (data) => async (dispatch) => {
  dispatch(authSlice.actions.updateCredentialsRequest());
  try {
    const res = await axios.put(`${API}/auth/update-credentials`, data, axiosConfig);
    dispatch(authSlice.actions.updateCredentialsSuccess(res.data));
  } catch (error) {
    dispatch(authSlice.actions.updateCredentialsFailed(error.response?.data?.message || error.message));
  }
};

export default authSlice.reducer;
