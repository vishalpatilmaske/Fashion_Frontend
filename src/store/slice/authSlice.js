import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosConfig";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// Async thunk for signing up a user
export const userSignup = createAsyncThunk(
  "user/signupUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
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
      const response = await axiosInstance.post(
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
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/api/user/${userId}/address`,
        address
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Network Error");
    }
  }
);
// update user details
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, formData }) => {
    try {
      const response = axiosInstance.patch(
        `${import.meta.env.VITE_API_URL}/api/user/${userId}/update-user`,
        formData
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
      const response = await axiosInstance.get(
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
      const response = await axiosInstance.patch(
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
//  get all users form data base
export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
  try {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API_URL}/api/user/`
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || "Network Error");
  }
});

// delete  a user
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId) => {
    try {
      const response = axiosInstance.delete(
        `${import.meta.env.VITE_API_URL}/api/user/${userId}`
      );
      return response;
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
      allUsers: null,
      loading: false,
      error: null,
    },
  },
  reducers: {
    // Add a logout action to clear user data and localStorage
    logout: (state) => {
      state.signin.success = false;
      state.signin.userCredential = null;
      state.signin.successMessage = null;
      state.signin.errorMessage = null;
      state.signin.isAuthenticate = false;
      Cookies.remove("access_key");
      localStorage.removeItem("userCredential");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userAddress");
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
        const userCredential = action.payload.data;
        const token = action.payload.accessToken;
        localStorage.setItem("userCredential", JSON.stringify(userCredential));
        localStorage.setItem("accessToken", JSON.stringify(token));
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
      .addCase(addAddress.pending, (state, action) => {})
      .addCase(addAddress.fulfilled, (state, action) => {
        toast.success("Address added successfully!");
      })
      .addCase(addAddress.rejected, (state, action) => {
        console.log("rejected to add address");
      })
      // handel get user data
      .addCase(getUserData.pending, (state, action) => {
        state.user.loading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user.userData = action.payload.data;
      })
      .addCase(getUserData.rejected, (state, action) => {
        console.log("Error while getting users data", action.payload);
      })

      // handel to get all users from the data base
      .addCase(getAllUsers.pending, (state, action) => {
        state.user.loading = true;
        state.user.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.user.loading = false;
        state.user.allUsers = action.payload.data;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.user.error = action.payload;
      })
      // update user data
      .addCase(updateUser.pending, (state, action) => {
        state.user.loading = true;
        state.user.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user.loading = false;
        toast.success("Changes successfull !");
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.user.error = action.payload;
      })
      // delete user
      .addCase(deleteUser.pending, (state, action) => {
        state.user.loading = true;
        state.user.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.user.loading = false;
        if (action.payload.data.success) {
          toast.success(action.payload.data.message);
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.user.error = action.payload;
      });
  },
});

export const userCredential = (state) => state.auth.signin.userCredential;

export const { logout, loadLocalStorage, setSelectedAddress } =
  authSlice.actions;
export default authSlice.reducer;
