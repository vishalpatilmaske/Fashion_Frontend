import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for signing up a user
export const userSignup = createAsyncThunk(
  "user/signupUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/signup",
        { email, password },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Network Error");
    }
  }
);

// Async thunk for signing in a user
export const userSignin = createAsyncThunk(
  "user/signinUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/login",
        { email, password },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Network Error");
    }
  }
);

// User slice with initial state and reducers
const userSlice = createSlice({
  name: "user",
  initialState: {
    signup: {
      success: false,
      errorMessage: null,
      successMessage: null,
    },
    signin: {
      success: false,
      errorMessage: null,
      successMessage: null,
      userData: null,
      isAuthenticate: false,
    },
  },
  reducers: {
    // Add a logout action to clear user data and localStorage
    logout: (state) => {
      state.signin.success = false;
      state.signin.userData = null;
      state.signin.successMessage = null;
      state.signin.errorMessage = null;
      localStorage.removeItem("userData");
    },

    // get the local storage data
    loadLocalStorage: (state) => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData) {
        state.signin.userData = userData;
        state.signin.success = true;
        state.signin.isAuthenticate = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle signup actions
      .addCase(userSignup.pending, (state) => {
        state.signup.success = false;
        state.signup.errorMessage = null;
        state.signup.successMessage = null;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.signup.success = true;
        state.signup.successMessage = action.payload.message;
        state.signup.errorMessage = null;
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.signup.success = false;
        state.signup.errorMessage = action.payload;
        state.signup.successMessage = null;
      })
      // Handle signin actions
      .addCase(userSignin.pending, (state) => {
        state.signin.success = false;
        state.signin.errorMessage = null;
        state.signin.successMessage = null;
      })
      .addCase(userSignin.fulfilled, (state, action) => {
        state.signin.success = true;
        // Save user data to localStorage
        const userData = action.payload.data;
        localStorage.setItem("userData", JSON.stringify(userData));
        state.signin.userData = userData;
        state.signin.successMessage = action.payload.message;
        state.signin.errorMessage = null;
        state.signin.isAuthenticate = true;
      })
      .addCase(userSignin.rejected, (state, action) => {
        state.signin.success = false;
        state.signin.errorMessage = action.payload;
        state.signin.successMessage = null;
      });
  },
});

export const { logout, loadLocalStorage } = userSlice.actions;
export default userSlice.reducer;
