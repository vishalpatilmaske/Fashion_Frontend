import { combineSlices, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Get all products
export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/product");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Network Error");
    }
  }
);

// Get cart products by product ID
export const getCartProducts = createAsyncThunk(
  "product/getCartProducts",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/product/${productId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Network Error");
    }
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    success: false,
    cartProducts: [],
    products: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all products
      .addCase(getAllProducts.pending, (state) => {
        state.success = false;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.success = true;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload;
      })
      // Get cart products
      .addCase(getCartProducts.pending, (state) => {
        state.success = false;
      })
      .addCase(getCartProducts.fulfilled, (state, action) => {
        state.success = true;
        // Push the new product data into the cartProducts array
        const product = action.payload.data;
        state.cartProducts.push(product);
      })
      .addCase(getCartProducts.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
