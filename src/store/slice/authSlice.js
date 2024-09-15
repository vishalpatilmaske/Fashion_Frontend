import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for signing up a user
export const userSignup = createAsyncThunk(
  "user/signupUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/signup`,
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
        `${import.meta.env.VITE_API_URL}/api/user/login`,
        { email, password },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Network Error");
    }
  }
);

// Async thunk for adding user address
export const addAddress = createAsyncThunk(
  "user/addUserAddress",
  async ({ userId, address }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/${userId}/address`,
        address
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Network Error");
    }
  }
);

// get user data
export const getUserData = createAsyncThunk(
  "user/getUserData",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/${userId}/data`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Network Error");
    }
  }
);

// update user address
export const updateUserAddress = createAsyncThunk(
  "user/updateUserAddress",
  async ({ userId, addressId }) => {
    try {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_API_URL
        }/api/user/${userId}/update-address/${addressId}`,
        { primaryaddress: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Network Error");
    }
  }
);
// User slice with initial state and reducers
const authSlice = createSlice({
  name: "auth",
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
      userCredential: null,
      isAuthenticate: false,
    },
    user: {
      userData: {},
    },
  },
  reducers: {
    // Add a logout action to clear user data and localStorage
    logout: (state) => {
      state.signin.success = false;
      state.signin.userCredential = null;
      state.signin.successMessage = null;
      state.signin.errorMessage = null;
      localStorage.removeItem("userCredential");
      localStorage.removeItem("cartId");
    },

    // get the local storage data
    loadLocalStorage: (state) => {
      const userCredential = JSON.parse(localStorage.getItem("userCredential"));
      if (userCredential) {
        state.signin.userCredential = userCredential;
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
        state.signup.successMessage = action.payload;
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
        const userCredential = action.payload.data;
        localStorage.setItem("userCredential", JSON.stringify(userCredential));
        state.signin.successMessage = action.payload.message;
        state.signin.errorMessage = null;
        state.signin.isAuthenticate = true;
      })
      .addCase(userSignin.rejected, (state, action) => {
        state.signin.success = false;
        state.signin.errorMessage = action.payload;
        state.signin.successMessage = null;
      })
      // handel add address to the
      .addCase(addAddress.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        console.log("fullfield");
      })
      .addCase(addAddress.rejected, (state, action) => {
        console.log("rejected");
      })
      // handel get user address to the
      .addCase(getUserData.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user.userData = action.payload.data;
      })
      .addCase(getUserData.rejected, (state, action) => {
        console.log("rejected");
      });
  },
});

export const userCredential = (state) => state.auth.signin.userCredential;

export const { logout, loadLocalStorage, setSelectedAddress } =
  authSlice.actions;
export default authSlice.reducer;
