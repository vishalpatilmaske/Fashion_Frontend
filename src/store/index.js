import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/cartSlice.js";
import checkoutSlice from "./slice/checkoutSlice.js";
import userSlice from "./slice/userSlice.js";
import productSlice from "./slice/productSlice.js";

const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    checkout: checkoutSlice,
    product: productSlice,
  },
});

export default store;
