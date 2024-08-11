import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userData } from "./authSlice";

// Create a cart when user was first time login
export const createCart = createAsyncThunk(
  "cart/createCart",
  async (userId, rejectWithValue) => {
    try {
      const response = await axios.post("http://localhost:5000/cart", userId);
      console.log("cart created succefully");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Network Error");
    }
  }
);
// Async thunk for adding items to the cart
// export const addItemsToCart = createAsyncThunk(
//   "cart/getCartItems",
//   async (item, { getState, rejectWithValue }) => {
//     try {
//       const state = getState();
//       const user = userData(state); // Get userData from the state

//       if (!user || !user.id) {
//         throw new Error("User is not authenticated");
//       }

//       const response = await axios.get(
//         `http://localhost:5000/cart/${user.id}/add`,
//         item
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.error || "Network Error");
//     }
//   }
// );

const cartSlice = createSlice({
  name: "cart",
  initialState: {
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
      // .addCase(addItemsToCart.pending, (state, action) => {
      //   console.log("pending");
      // })
      // .addCase(addItemsToCart.fulfilled, (state, action) => {
      //   state.items = action.payload; // Update items in the state with the response data
      //   console.log("fulfilled");
      // })
      // .addCase(addItemsToCart.rejected, (state, action) => {
      //   console.error("rejected", action.payload);
      // })
      // create new cart
      .addCase(createCart.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.items = action.payload;
        console.log("fulfilled");
      })
      .addCase(createCart.rejected, (state, action) => {
        console.error("rejected", action.payload);
      });
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, updateItemQuantity } =
  cartSlice.actions;
