import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for signing up a user
export const signupUser = createAsyncThunk(
  "user/signupUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/user/signup", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data.error
          : "Network Error"
      );
    }
  }
);

// Async thunk for signing in a user
export const signinUser = createAsyncThunk(
  "user/signinUser",
  async ({ email, password }, { rejectWithValue }) => {
    console.log("signin called");
    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data.error
          : "Network Error"
      );
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
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle signup actions
      .addCase(signupUser.pending, (state) => {
        state.signup.success = false;
        state.signup.errorMessage = null;
        state.signup.successMessage = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.signup.success = true;
        state.signup.successMessage = action.payload.message;
        state.signup.errorMessage = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.signup.success = false;
        state.signup.errorMessage = action.payload;
        state.signup.successMessage = null;
      })
      // Handle signin actions
      .addCase(signinUser.pending, (state) => {
        state.signin.success = false;
        state.signin.errorMessage = null;
        state.signin.successMessage = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.signin.success = true;
        state.signin.successMessage = action.payload.message;
        state.signin.errorMessage = null;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.signin.success = false;
        state.signin.errorMessage = action.payload;
        state.signin.successMessage = null;
      });
  },
});

export default userSlice.reducer;
