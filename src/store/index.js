import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/cartSlice.js";
import authSlice from "./slice/authSlice.js";
import productSlice from "./slice/productSlice.js";
import checkoutSlice from "./slice/checkoutSlice.js";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    product: productSlice,
    checkout: checkoutSlice,
  },
});

export default store;
