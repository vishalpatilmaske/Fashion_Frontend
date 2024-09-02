import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePaymentMethod } from "../../store/slice/orderSlice";

const CheckoutPayment = () => {
  const dispatch = useDispatch();
  // handel the color of the text onClick the text
  const [textColor, setTextColor] = useState("black");
  const handleClick = () => {
    setTextColor(textColor === "black" ? "brown" : "black");
  };

  // handel to change the payment method
  const paymentMethod = useSelector((state) => state.order.paymentMethod);
  const [payment, setPayment] = useState();
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
                value="Cash on Delivery"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  setPayment(e.target.value);
                }}
                checked={payment === "Cash on Delivery"}
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
                id="upiPayment"
                value="UPI"
                style={{ cursor: "pointer" }}
                onChange={(e) => {
                  setPayment(e.target.value);
                }}
                checked={payment === "UPI"}
              />
              <label className="form-check-label" htmlFor="upiPayment">
                UPI app
              </label>
            </div>
          </div>
          <div>
            <hr />
            <button
              type="button"
              className="btn btn-warning btn-sm px-3 rounded-pill"
              onClick={() => {
                dispatch(updatePaymentMethod(payment));
              }}
            >
              Use this payment method
            </button>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default CheckoutPayment;
