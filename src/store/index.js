import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/cartSlice.js";
import checkoutSlice from "./slice/checkoutSlice.js";
import authSlice from "./slice/authSlice.js";
import productSlice from "./slice/productSlice.js";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    checkout: checkoutSlice,
    product: productSlice,
  },
});

export default store;
