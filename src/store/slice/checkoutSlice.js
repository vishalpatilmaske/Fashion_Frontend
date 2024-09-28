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
          return createdOrder || null;
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

      toast.success("Order placed successfully!");
      // Return the placed order data
      return order.data;
    } else {
      toast.error("Payment verification failed!");
      return null;
    }
  } catch (error) {
    console.error("Error verifying payment or placing order:", error);
    throw error;
  }
};

// get all orders of the users
export const getAllOrders = createAsyncThunk(
  "checkout/getAllOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/api/order/${userId}/get-orders`
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        return rejectWithValue(error.response.data);
      }
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
    orderCreated: null, // Store the created order data here
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initiatePayment.pending, (state) => {
        state.orderCreated = null; // Reset the state when the payment starts
      })
      .addCase(initiatePayment.fulfilled, (state, action) => {
        // Store the created order in state
        console.log(action);
        state.orderCreated = action.payload;
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        toast.error("Payment initiation failed!");
      })
      // Get user orders
      .addCase(getAllOrders.pending, (state) => {
        // Handle pending state for fetching orders
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload.data;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        console.error("Error while fetching user's order details");
      });
  },
});

export default checkoutSlice.reducer;
