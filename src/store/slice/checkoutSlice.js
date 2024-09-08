import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
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
      const orderResponse = await axios.post(
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
          await verifyAndPlaceOrder(
            paymentData,
            cartItems,
            shippingAddress,
            userId,
            orderResponse,
            orderStatus,
            payment
          );
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
    const verifyResponse = await axios.post(
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
      const order = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/order/${userId}/create-order`,
        orderData
      );
      console.log(order);
      toast.success("Payment successful, order placed!");

      return orderResponse.data;
    } else {
      toast.error("Payment verification failed!");
    }
  } catch (error) {
    console.error("Error verifying payment or placing order:", error);
  }
};

// Slice for order
const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    paymentMethod: null,
    orderDetails: null,
  },
  reducers: {},
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(createOrder.pending, (state) => {
  //       state.orderStatus = "loading";
  //       state.error = null;
  //     })
  //     .addCase(createOrder.fulfilled, (state, action) => {
  //       state.orderStatus = "succeeded";
  //       state.orderDetails = action.payload;
  //     })
  //     .addCase(createOrder.rejected, (state, action) => {
  //       state.orderStatus = "failed";
  //       state.error = action.payload;
  //     });
  // },
});

export default checkoutSlice.reducer;
