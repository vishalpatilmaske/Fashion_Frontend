import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initiatePayment } from "../../store/slice/checkoutSlice";
import { toast } from "react-toastify";

const CheckoutPayment = ({ products, subtotal }) => {
  const dispatch = useDispatch();
  // handel to change the payment method
  const [payment, setPayment] = useState();
  // handel the color of the text onClick the text
  const [textColor, setTextColor] = useState("black");
  const handleClick = () => {
    setTextColor(textColor === "black" ? "brown" : "black");
  };

  // users credention user Id
  const userId = useSelector((state) => state.auth.signin.userCredential?._id);

  // list of products to order
  const productsList = products;

  // get the shipping address fromt he store
  const address = useSelector((state) => state.auth.user.userData.address);

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
      <div className="collapse mt-2" id="collapsePayment">
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
                onClick={(e) => {
                  setPayment(e.target.value);
                }}
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
                onChange={(e) => {
                  setPayment(e.target.value);
                }}
                checked={payment === "online_payment"}
              />
              <label className="form-check-label" htmlFor="onlinePayment">
                Online Payment
              </label>
            </div>
          </div>
          <div>
            <hr />
            <button
              type="button"
              className="btn btn-warning btn-sm px-3 rounded-pill"
              onClick={() => {
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
                    shippingAddress: selectedAddress._id,
                  })
                );

                if (selectedAddress === null) {
                  toast.warn("Please select the delivery address");
                }
              }}
            >
              {payment == "online_payment"
                ? "pay now"
                : "Use this payment method"}
            </button>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default CheckoutPayment;
