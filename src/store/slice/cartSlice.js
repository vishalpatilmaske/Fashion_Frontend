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

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    items: [],
  },
  reducers: {
    addToCart(state, action) {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // create new cart
      .addCase(createCart.pending, (state, action) => {
        // console.log(action.payload);
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.cart = action.payload._id;
      })
      .addCase(createCart.rejected, (state, action) => {
        // console.error("rejected", action.error);
      })
      // add item to the cart
      .addCase(addItemsToCart.pending, (state, action) => {
        // console.log("pending");
      })
      .addCase(addItemsToCart.fulfilled, (state, action) => {
        // console.log("fulfilled");
      })
      .addCase(addItemsToCart.rejected, (state, action) => {
        // console.error("rejected", action.payload);
      });
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, updateItemQuantity } =
  cartSlice.actions;
