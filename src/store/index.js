import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/cartSlice.js";
import checkoutSlice from "./slice/checkoutSlice.js";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    checkout: checkoutSlice,
  },
});

export default store;
