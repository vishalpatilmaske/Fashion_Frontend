import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../config/axiosConfig";

// Create a cart when user was first time login
export const createCart = createAsyncThunk(
  "cart/createCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/api/cart/${userId}`
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // if user has already has cart then store old cartId
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.response?.data?.error || "Network Error");
    }
  }
);

// adding items to the cart
export const addItemsToCart = createAsyncThunk(
  "cart/addItemsToCart",
  async ({ cartId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/api/cart/${cartId}/add`,
        { productId, quantity }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Network Error");
    }
  }
);

// get cart items
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async ({ cartId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/api/cart/${cartId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Network Error");
    }
  }
);

// update cart items
export const updateItemQuantity = createAsyncThunk(
  "cart/updateQuantiy",
  async ({ cartId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `${import.meta.env.VITE_API_URL}/api/cart/${cartId}/update`,
        {
          productId,
          quantity,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Network Error");
    }
  }
);

// add items to the selected items to buy
export const addSelectedCartItems = createAsyncThunk(
  "cart/addSelectedCartItems",
  async ({ cartId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${
          import.meta.env.VITE_API_URL
        }/api/cart/${cartId}/add-selected-cart-items`,
        { productId, quantity }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Network Error");
    }
  }
);

// get items from the selected items to buy
export const getSelectedCartItems = createAsyncThunk(
  "cart/getSelectedCartItems",
  async ({ cartId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/cart/${cartId}/get-selected-cart-items`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Network Error");
    }
  }
);

// deselect items for the selected items to buy
export const deselectSelectedCartItems = createAsyncThunk(
  "cart/deselectSelectedCartItems",
  async ({ cartId, productId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${
          import.meta.env.VITE_API_URL
        }/api/cart/${cartId}/deselect-selected-cart-items`,
        {
          productId,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Network Error");
    }
  }
);

// remove items form cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ cartId, productId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `${import.meta.env.VITE_API_URL}/api/cart/${cartId}/remove`,
        {
          productId,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Network Error");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartId: null,
    // items array containe the productId and the quantity of the product
    items: [],
    // selcted items of the cart ot buy
    selectedItems: [],
    cartDetailsLoaded: false,
    loading: true,
    error: null,
  },
  reducers: {
    // load the localstorage data
    loadCartDetials: (state) => {
      const cartId = localStorage.getItem("cartId");
      cartId ? (state.cartId = cartId) : null;
      state.cartDetailsLoaded = true;
    },
    // update selected items array
    updateSelectedItems: (state, action) => {
      state.selectedItems.push(action.payload);
      console.log(JSON.parse(JSON.stringify(state.selectedItems)));
    },
  },
  extraReducers: (builder) => {
    builder
      // create new cart
      .addCase(createCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        const cartId = action.payload._id;
        localStorage.setItem("cartId", cartId);
        state.cartId = cartId;
        state.loading = false;
      })
      .addCase(createCart.rejected, (state, action) => {
        // if user has already cart then store old cart data
        const cartId = action.payload.data?._id;
        localStorage.setItem("cartId", cartId);
        state.cartId = cartId;
        state.error = action.payload;
      })
      // add item to the cart
      .addCase(addItemsToCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addItemsToCart.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addItemsToCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      // get cart items
      .addCase(getCartItems.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.loading = false;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.error = action.payload;
      })
      // update item quantity
      .addCase(updateItemQuantity.pending, (state, action) => {})
      .addCase(updateItemQuantity.fulfilled, (state, action) => {})
      .addCase(updateItemQuantity.rejected, (state, action) => {})
      // add items to the selectd item
      .addCase(addSelectedCartItems.pending, (state, action) => {})
      .addCase(addSelectedCartItems.fulfilled, (state, action) => {
        state.selectedItems = action.payload.data;
      })
      .addCase(addSelectedCartItems.rejected, (state, action) => {})
      // get the selected cart items
      .addCase(getSelectedCartItems.pending, (state, action) => {})
      .addCase(getSelectedCartItems.fulfilled, (state, action) => {
        state.selectedItems = action.payload.data;
      })
      .addCase(getSelectedCartItems.rejected, (state, action) => {})
      // deselect selcted cart items
      .addCase(deselectSelectedCartItems.pending, (state, action) => {})
      .addCase(deselectSelectedCartItems.fulfilled, (state, action) => {
        state.selectedItems = action.payload.cart.selectedItems;
      })
      .addCase(deselectSelectedCartItems.rejected, (state, action) => {});
  },
});

export default cartSlice.reducer;
export const { loadCartDetials, updateSelectedItems } = cartSlice.actions;
