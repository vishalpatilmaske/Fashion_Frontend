import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Get all products
export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/product`
      );
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
      // access the product and cart slice
      const { product, cart } = getState();

      const existingProduct = product.cartProducts.find(
        (prod) => prod._id === productId
      );
      // If the product is already in the cartProducts array, return null
      if (existingProduct) {
        return null;
      }
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/product/${productId}`
      );

      const quantity = cart.items.find(
        (item) => item.productId == productId
      )?.quantity;

      response.data.quantity = quantity;
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
    // contain the cart products only
    cartProducts: [],
    // contain all product
    allProducts: [],
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
        state.allProducts = action.payload;
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
          // check already product in a cart if not then push it
          const existingProduct = state.cartProducts.find(
            (product) => product._id === action.payload.data._id
          );
          // add the quantity of the products
          action.payload.data.quantity = action.payload.quantity;
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
