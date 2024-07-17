import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: [],
  reducers: {
    addToCart(state, action) {
      const existingItemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        state[existingItemIndex].quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
    },
    removeFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },

    updateItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, updateItemQuantity } =
  cartSlice.actions;
