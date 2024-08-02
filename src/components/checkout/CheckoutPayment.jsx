import React from "react";
import { useState } from "react";

const CheckoutPayment = () => {
  const [textColor, setTextColor] = useState("black");
  const HandleClick = () => {
    setTextColor(textColor === "black" ? "brown" : "black");
  };
  return (
    <>
      {" "}
      <div className="d-flex justify-content-between">
        <strong
          data-bs-toggle="collapse"
          id="address"
          href="#collapsePayment"
          role="button"
          aria-expanded="false"
          aria-controls="collapsePayment"
          style={{ color: textColor }}
          onClick={HandleClick}
        >
          2 Payment Method
        </strong>
        <span
          data-bs-toggle="collapse"
          id="close-button"
          data-bs-target="#collapsePayment"
          aria-expanded="false"
          aria-controls="collapsePayment"
          style={{ color: textColor }}
          onClick={HandleClick}
        >
          close
        </span>
      </div>
      <div className="collapse mt-2" id="collapsePayment">
        <div className="card card-body">
          <div>
            <div class="form-check my-4">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Cash on Delivery / Pay on Delivery
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                checked
              />
              <label class="form-check-label" for="flexRadioDefault2">
                UPI app
              </label>
            </div>
          </div>
          <div>
            <hr />
            <button
              type="button "
              className="btn btn-warning btn-sm px-3 rounded-pill"
            >
              use this payment method{" "}
            </button>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default CheckoutPayment;
