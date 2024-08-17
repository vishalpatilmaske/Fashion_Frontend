import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
  async ({ productId }, { getState, rejectWithValue }) => {
    try {
      const { product } = getState();
      const existingProduct = product.cartProducts.find(
        (prod) => prod._id === productId
      );
      if (existingProduct) {
        return null; // If the product is already in the cartProducts array, return null
      }
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
        if (action.payload) {
          const existingProduct = state.cartProducts.find(
            (product) => product._id === action.payload.data._id
          );
          if (!existingProduct) {
            state.success = true;
            state.cartProducts.push(action.payload.data);
          }
        }
      })
      .addCase(getCartProducts.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
