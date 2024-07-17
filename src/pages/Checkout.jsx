import React, { useState } from "react";
import "../style/page/checkout.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CheckoutAddress from "../components/CheckoutAddress";
import CheckoutPayment from "../components/CheckoutPayment";

function Checkout() {
  const [textColor, setTextColor] = useState("black");
  const HandleClick = () => {
    setTextColor(textColor === "black" ? "brown" : "black");
  };

  const cart = useSelector((state) => state.cart);
  const location = useLocation();
  const { id } = location.state || {};

  const checkoutitem = cart.filter((product) => cart.id === id);

  // product total
  const total = checkoutitem.reduce((total, item) => {
    return total + item.price * 1;
  }, 0);
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
          <div className="col-12 m-4 col-sm-3 checkout-summary">
            <div className="border rounded p-2 pb-4 summary">
              <strong className="p-2">Order Summary</strong>
              <table>
                <tbody>
                  <tr>
                    <td className="p-2">Items :</td>
                    <td className="p-2">{checkoutitem.length}</td>
                  </tr>
                  <tr>
                    <td className="p-2">Delivery:</td>
                    <td className="p-2"></td>
                  </tr>
                  <tr>
                    <td className="p-2">Total:</td>
                    <td className="p-2">{total}</td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <strong className="p-3 order-total">Order Total:</strong>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Checkout;
