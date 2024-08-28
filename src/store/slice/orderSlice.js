import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to create an order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ userId, products, quantity }, { rejectWithValue }) => {
    try {
      console.log("Hello");
      const response = await axios.post(`http://localhost:5000/order `, {
        userId,
        products,
        quantity,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Network Error");
    }
  }
);

// Slice for order
const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderStatus: "idle",
    orderDetails: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderStatus = "loading";
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderStatus = "succeeded";
        state.orderDetails = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { setSelectedAddress } = orderSlice.actions;
export default orderSlice.reducer;
