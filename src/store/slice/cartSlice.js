import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Create a cart when user was first time login
export const createCart = createAsyncThunk(
  "cart/createCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/cart", {
        userId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Network Error");
    }
  }
);
// adding items to the cart
export const addItemsToCart = createAsyncThunk(
  "cart/addItemsToCart",
  async ({ cartId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/cart/${cartId}/add`,
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
      const response = await axios.get(`http://localhost:5000/cart/${cartId}`);
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
      const response = await axios.patch(
        `http://localhost:5000/cart/${cartId}/update`,
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

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartId: null,
    items: [],
    loading: true,
    error: null,
  },
  reducers: {
    // load the localstorage data
    loadCartDetials: (state) => {
      const cartId = localStorage.getItem("cartId");
      cartId ? (state.cartId = cartId) : null;
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
      .addCase(updateItemQuantity.pending, (state, action) => {
        console.log("pending vishal");
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        console.log(action.payload.data);
      })
      .addCase(updateItemQuantity.rejected, (state, action) => {
        console.log("rejected");
      });
  },
});

export default cartSlice.reducer;
export const {
  loadCartDetials,
  increaseProductQuantity,
  decreaseProductQuantity,
} = cartSlice.actions;
