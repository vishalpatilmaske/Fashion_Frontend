import React, { useState } from "react";
import "../style/page/checkout.css";

function Checkout() {
  const [textColor, setTextColor] = useState("black");
  const HandleClick = () => {
    setTextColor(textColor === "black" ? "brown" : "black");
  };

  return (
    <>
      <div className="container row checkout-main-container">
        <section className="row py-2">
          <div className="col-5">
            <h4>
              <strong>Fashion</strong>
              <strong className="navbarbrand">Flick</strong>
            </h4>
          </div>
          <div className="col-7">
            <h4>Checkout</h4>
          </div>
        </section>
      </div>
      <hr className="header-hr" />
      <section className="mt-5">
        <div className="row container m-auto">
          <div className="col-8 address">
            {/* address */}
            <div className="d-flex justify-content-between">
              <strong
                data-bs-toggle="collapse"
                id="address"
                href="#collapseAddress"
                role="button"
                aria-expanded="false"
                aria-controls="collapseAddress"
                style={{ color: textColor }}
                onClick={HandleClick}
              >
                1 Delivery Address
              </strong>
              <span
                data-bs-toggle="collapse"
                id="close-button"
                data-bs-target="#collapseAddress"
                aria-expanded="false"
                aria-controls="collapseAddress"
                style={{ color: textColor }}
                onClick={HandleClick}
              >
                close
              </span>
            </div>
            <div className="collapse mt-2" id="collapseAddress">
              <div className="card card-body">
                <div>
                  <h6>Your address</h6>
                  <hr />
                  <p id="add-address">+ Add new address</p>
                </div>
                <div>
                  <hr />
                  <button
                    type="button "
                    className="btn btn-warning btn-sm px-5 rounded-pill"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
            <hr />
            {/* payment */}
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
                  <div class="form-check">
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
          <div className="col-3 checkout-summary">
            <div className="border p-2 pb-4">
              <strong className="p-2">Order Summary</strong>
              <table>
                <tbody>
                  <tr>
                    <td className="p-2">Items :</td>
                    <td className="p-2"></td>
                  </tr>
                  <tr>
                    <td className="p-2">Delivery:</td>
                    <td className="p-2"></td>
                  </tr>
                  <tr>
                    <td className="p-2">Total:</td>
                    <td className="p-2"></td>
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
