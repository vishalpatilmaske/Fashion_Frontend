import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosConfig";
import { toast } from "react-toastify";

// Async thunk to create an order
export const initiatePayment = createAsyncThunk(
  "order/createRazorpayOrder",
  async ({
    amount,
    cartItems,
    shippingAddress,
    userId,
    payment,
    orderStatus,
  }) => {
    try {
      // Step 1: Create Razorpay order on the backend
      const orderResponse = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/api/order/create-razorpay-order`,
        { amount }
      );

      if (!orderResponse.data.success) {
        console.error("Error creating Razorpay order");
        return;
      }
      const order = orderResponse.data.order;

      // Step 2: Dynamically load Razorpay script if not already loaded
      const loadRazorpayScript = () => {
        return new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      };

      if (!window.Razorpay) {
        await loadRazorpayScript();
      }

      // Step 3: Configure Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Fashion Flick Shop",
        description: "Order Payment",
        order_id: order.id,
        handler: async function (response) {
          // Step 5: Handle payment success
          const paymentData = {
            orderCreationId: order.id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          // Verify payment and place order
          const createdOrder = await verifyAndPlaceOrder(
            paymentData,
            cartItems,
            shippingAddress,
            userId,
            orderResponse,
            orderStatus,
            payment
          );

          // Return the created order
          return createdOrder.data || null;
        },
        prefill: {
          name: "vishal vijay maske",
          email: "vishalpatilmaske@example.com",
          contact: "9322396236",
        },
      };

      // Step 4: Open the Razorpay payment interface
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      throw error;
    }
  }
);

const verifyAndPlaceOrder = async (
  paymentData,
  cartItems,
  shippingAddress,
  userId,
  orderResponse,
  orderStatus,
  payment
) => {
  try {
    // Step 6: Verify payment on backend
    const verifyResponse = await axiosInstance.post(
      `${import.meta.env.VITE_API_URL}/api/order/verify-payment`,
      paymentData
    );

    if (verifyResponse) {
      const orderData = {
        orders: [
          {
            products: cartItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
            shippingAddress,
            orderStatus,
            payment: {
              method: payment.method,
              status: verifyResponse.data.success ? "successful" : "failed",
              transactionId: verifyResponse.data.order.razorpayPaymentId,
            },
            isPaid: verifyResponse.data.success,
            totalPrice: orderResponse.data.order.amount / 100,
          },
        ],
      };

      // Step 7: Place order
      const order = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/api/order/${userId}/create-order`,
        orderData
      );
      // Return the placed order data
      toast.success("Order Placed Successfully!");

      return order;
    } else {
      toast.error("Payment verification failed!");
      return null;
    }
  } catch (error) {
    console.error("Error verifying payment or placing order:", error);
    throw error;
  }
};
// create cash order

export const CreateOrderCashOnDelivery = createAsyncThunk(
  "order/CreateOrderCashOnDelivery",
  async ({ userId, orderData }, { rejectWithValue }) => {
    try {
      const order = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/api/order/${userId}/create-order`,
        orderData
      );
      return order;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Network Error");
    }
  }
);

// get single user orders
export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/api/order/get-all-orders`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Network Error");
    }
  }
);

// get single user orders
export const getUserOrders = createAsyncThunk(
  "orders/getUserOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/api/order/${userId}/get-orders`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Network Error");
    }
  }
);

// cancel order

export const cancelOrder = createAsyncThunk(
  "checkout/cancelOrder",
  async ({ userId, orderId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `${
          import.meta.env.VITE_API_URL
        }/api/order/${userId}/cancel-order/${orderId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Network Error");
    }
  }
);

// Slice for order
const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    paymentMethod: null,
    orderDetails: null,
    orders: [],
    allOrders: null,
    orderCreated: null,
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initiatePayment.pending, (state) => {
        state.orderCreated = null;
        state.loading = true;
      })
      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.orderCreated = action.payload;
        state.loading = false;
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.loading = false;
        toast.error("Payment initiation failed!");
      })
      // Create cash on delivery order
      .addCase(CreateOrderCashOnDelivery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateOrderCashOnDelivery.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(CreateOrderCashOnDelivery.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log(action.payload);
      })
      // Get user single user orders
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      // Get all users  orders
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrders = action.payload.data;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      // cancel order
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        if (!state.loading) {
          toast.success(action.payload.message);
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export default checkoutSlice.reducer;
