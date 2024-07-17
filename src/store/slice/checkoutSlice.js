import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "checkoutSlice",
  initialState: {
    productdetials: [],
  },
  reducers: {
    processToBuy(state, action) {},
  },
});

export default checkoutSlice.reducer;
export const { processToBuy } = checkoutSlice.actions;
