import React from "react";
import "../../style/components/checkout/checkoutheader.css";
import { useNavigate } from "react-router-dom";

const CheckoutHeader = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container row checkout-main-container">
        <section className="row py-2">
          <div className="col-5">
            <h3
              onClick={() => {
                navigate("/");
              }}
            >
              <strong>Fashion</strong>
              <strong className="navbarbrand">Flick</strong>
            </h3>
          </div>
          <div className="col-7">
            <h4>Checkout</h4>
          </div>
        </section>
      </div>
      <hr className="header-hr" />
    </>
  );
};

export default CheckoutHeader;
