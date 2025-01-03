import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initiatePayment,
  CreateOrderCashOnDelivery,
} from "../../store/slice/checkoutSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CheckoutPayment = ({ products, subtotal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle change for the payment method
  const [payment, setPayment] = useState();

  // Handle the color of the text onClick
  const [textColor, setTextColor] = useState("black");
  const handleClick = () => {
    setTextColor(textColor === "black" ? "brown" : "black");
  };

  // User's credential: user ID
  const userId = useSelector(
    (state) => state?.auth?.signin?.userCredential?._id
  );

  // List of products to order
  const productsList = products;

  // Get the shipping address from the store
  const address = useSelector((state) => state?.auth?.user?.userData?.address);

  // Find the primary address
  let selectedAddress = null;
  for (const key in address) {
    if (address[key].primaryaddress === true) {
      selectedAddress = address[key];
      break;
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between">
        <strong
          data-bs-toggle="collapse"
          href="#collapsePayment"
          role="button"
          aria-expanded="false"
          aria-controls="collapsePayment"
          style={{ color: textColor }}
        >
          2 Payment Method
        </strong>
        <span
          data-bs-toggle="collapse"
          data-bs-target="#collapsePayment"
          aria-expanded="false"
          aria-controls="collapsePayment"
          style={{ color: "#007184", cursor: "pointer" }}
          onClick={handleClick}
        >
          close
        </span>
      </div>
      <div className="mt-2">
        <div className="card card-body">
          <div>
            <div className="form-check my-4">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="cashOnDelivery"
                value="cash_on_delivery"
                style={{ cursor: "pointer" }}
                onChange={(e) => setPayment(e.target.value)}
                checked={payment === "cash_on_delivery"}
              />
              <label className="form-check-label" htmlFor="cashOnDelivery">
                Cash on Delivery / Pay on Delivery
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="onlinePayment"
                value="online_payment"
                style={{ cursor: "pointer" }}
                onChange={(e) => setPayment(e.target.value)}
                checked={payment === "online_payment"}
              />
              <label className="form-check-label" htmlFor="onlinePayment">
                Online Payment
              </label>
            </div>
          </div>
          {/* for make the payment */}
          <div>
            <hr />
            <button
              type="button"
              className="btn btn-warning btn-sm px-3 rounded-pill"
              onClick={() => {
                if (selectedAddress !== null) {
                  if (payment === "online_payment") {
                    dispatch(
                      initiatePayment({
                        userId: userId,
                        cartItems: productsList,
                        amount: subtotal,
                        orderStatus: "shipped",
                        payment: {
                          method: payment,
                          status: null,
                          transactionId: null,
                        },
                        isPaid: null,
                        shippingAddress: selectedAddress?._id,
                      })
                    )
                      .unwrap()
                      .then((data) => {
                        console.log(data);
                        navigate("/");
                      });
                  }
                  // cashn on delivery
                  if (payment === "cash_on_delivery") {
                    const orderData = {
                      orders: [
                        {
                          products: productsList?.map((item) => ({
                            productId: item?.productId?._id,
                            quantity: item?.quantity,
                          })),
                          shippingAddress: selectedAddress?._id,
                          orderStatus: "shipped",
                          payment: {
                            method: "cash_on_delivery",
                            status: "pending",
                          },
                          isPaid: false,
                          totalPrice: 1000 / 100,
                        },
                      ],
                    };
                    if (orderData) {
                      dispatch(CreateOrderCashOnDelivery({ userId, orderData }))
                        .then((data) => {
                          if (data?.payload?.data?.message) {
                            toast.success(data?.payload?.data?.message);
                            navigate("/profile-orders");
                          }
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }
                  }
                } else {
                  toast.warn("Please select a delivery address");
                }
              }}
            >
              {payment === "online_payment"
                ? "Pay now"
                : payment === "cash_on_delivery"
                ? "Place Order"
                : "Select Payment Method"}
            </button>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default CheckoutPayment;
