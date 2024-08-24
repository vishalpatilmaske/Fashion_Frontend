import React, { useState } from "react";

const CheckoutPayment = () => {
  const [textColor, setTextColor] = useState("black");

  const handleClick = () => {
    setTextColor(textColor === "black" ? "brown" : "black");
  };

  const [selectedPayment, setSelectedPayment] = useState("UPI");

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

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
          onClick={handleClick}
        >
          2 Payment Method
        </strong>
        <span
          data-bs-toggle="collapse"
          data-bs-target="#collapsePayment"
          aria-expanded="false"
          aria-controls="collapsePayment"
          style={{ color: textColor }}
          onClick={handleClick}
        >
          Close
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
                checked={selectedPayment === "Cash on Delivery"}
                onChange={handlePaymentChange}
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
                checked={selectedPayment === "UPI"}
                onChange={handlePaymentChange}
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
