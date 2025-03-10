import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../config/axiosConfig";

// Get all products
export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
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
      const response = await axiosInstance.get(
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

// create a new product
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/api/product/create-product`,
        productData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Network Error");
    }
  }
);

// create a new product
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ productId, update }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `${import.meta.env.VITE_API_URL}/api/product/${productId}/update`,
        update
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Network Error");
    }
  }
);

// delete  product
export const deleteProduct = createAsyncThunk(
  "product/deleteProdcut",
  async ({ productId }, { rejectWithValue }) => {
    const response = await axiosInstance.delete(
      `${import.meta.env.VITE_API_URL}/api/product/${productId}/delete`
    );
    return response.data;
    try {
    } catch (error) {
      console.log(error);
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
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all products
      .addCase(getAllProducts.pending, (state) => {
        state.success = false;
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.allProducts = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload;
        state.loading = false;
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
    // create product
  },
});

export default productSlice.reducer;
