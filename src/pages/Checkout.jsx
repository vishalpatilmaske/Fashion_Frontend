import React, { useState } from "react";
import "../style/page/checkout.css";
import CheckoutAddress from "../components/checkout/CheckoutAddress";
import CheckoutPayment from "../components/checkout/CheckoutPayment";
import CheckoutOrderSummary from "../components/checkout/CheckoutOrderSummary";
import CheckoutHeader from "../components/checkout/CheckoutHeader";
import { useLocation } from "react-router-dom";
import { createOrder } from "../store/slice/orderSlice";

const Checkout = () => {
  const [textColor, setTextColor] = useState("black");
  const HandleClick = () => {
    setTextColor(textColor === "black" ? "brown" : "black");
  };

  const location = useLocation();
  const data = location.state || {};

  return (
    <>
      {/* Header */}
      <CheckoutHeader />
      <section className="mt-5">
        <div className="row container m-auto">
          <div className="col-12 col-sm-8 address">
            {/* Address */}
            <CheckoutAddress />
            {/* payment */}
            <CheckoutPayment />
            {/* offer */}
            <div className="d-flex justify-content-between">
              <strong
                id="address"
                style={{ color: textColor }}
                onClick={HandleClick}
              >
                3 Offers
              </strong>
            </div>
            <hr />
            {/*item delivery  */}
            <div className="d-flex justify-content-between">
              <strong
                id="address"
                style={{ color: textColor }}
                onClick={HandleClick}
              >
                4 Items and delivery{" "}
              </strong>
            </div>
          </div>
          {/* order summary */}
          <CheckoutOrderSummary product={data} />
        </div>
      </section>
    </>
  );
};

export default Checkout;
