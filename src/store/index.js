import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/cartSlice.js";
import checkoutSlice from "./slice/checkoutSlice.js";
import userSlice from "./slice/userSlice.js";

const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    checkout: checkoutSlice,
  },
});

export default store;
