import React, { useState } from "react";
import "../style/page/checkout.css";
import CheckoutAddress from "../components/checkout/CheckoutAddress";
import CheckoutPayment from "../components/checkout/CheckoutPayment";
import CheckoutOrderSummary from "../components/checkout/CheckoutOrderSummary";
import CheckoutHeader from "../components/checkout/CheckoutHeader";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const [textColor, setTextColor] = useState("black");
  const handleClick = () => {
    setTextColor((prevColor) => (prevColor === "black" ? "brown" : "black"));
  };

  // Data from the cart and the productDetails page
  const location = useLocation();
  const { products, subtotal } = location.state || {};

  return (
    <>
      {/* Header */}
      <CheckoutHeader />
      <section className="mt-5">
        <div className="row container m-auto">
          <div className="col-12 col-sm-8 checkout-address">
            {/* Address */}
            <CheckoutAddress />
            {/* Payment */}
            <CheckoutPayment products={products} subtotal={subtotal} />
            {/* Offers */}
            <div className="d-flex justify-content-between">
              <strong
                id="address"
                style={{ color: textColor }}
                onClick={handleClick}
              >
                3 Offers
              </strong>
            </div>
            <hr />
            {/* Item Delivery */}
            <div className="d-flex justify-content-between">
              <strong
                id="address"
                style={{ color: textColor }}
                onClick={handleClick}
              >
                4 Items and Delivery
              </strong>
            </div>
          </div>
          {/* Order Summary */}
          <CheckoutOrderSummary products={products} subtotal={subtotal} />
        </div>
      </section>
    </>
  );
};

export default Checkout;
