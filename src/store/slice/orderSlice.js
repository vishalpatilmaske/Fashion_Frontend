import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

// Async thunk to create an order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ userId, ...orderDetails }, { rejectWithValue }) => {
    try {
      console.log(orderDetails);
      const response = await axios.post(
        `http://localhost:5000/api/order/${userId}/create-order `,
        {
          orderDetails,
        }
      );
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
    paymentMethod: null,
    orderDetails: null,
  },
  reducers: {
    updatePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
  },
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

export const { updatePaymentMethod } = orderSlice.actions;
export default orderSlice.reducer;
