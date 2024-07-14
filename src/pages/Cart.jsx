import React, { useState } from "react";
import "../style/page/cart.css";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function Cart() {
  const location = useLocation();
  const productDetails = location.state || {};
  const [quantity, setQuantity] = useState(1);

  function incQuantity() {
    setQuantity(quantity + 1);
  }
  function decQuantity() {
    quantity === 0 ? setQuantity(0) : setQuantity(quantity - 1);
  }

  return (
    <div className="container-fluid container-sm cart row my-3 mx-auto d-flex align-item-center">
      {/* cart items list */}
      <div className="col-12 col-sm-9 cart-item-list">
        <h4>Shoping Cart</h4>
        <p className="float-end">price</p>
        <br />
        <hr />
        <div className="row">
          <div className="col-4 col-sm-3">
            {" "}
            <div className="d-flex align-items-center justify-content-between cart-item  ">
              <input
                type="checkbox"
                className="align-baseline mx-1"
                id="select"
                autoComplete="off"
              />
              <img
                src={productDetails.image}
                alt="product image"
                className="product-image"
              />
            </div>
          </div>
          <div className="col-8">
            {" "}
            <div className="cart-item-details ">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <p>{productDetails.description}</p>
                    </td>
                    <td>
                      <p className="align-baseline float-end">
                        <b>&#8377;{productDetails.price}</b>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Size :</b>
                    </td>
                    <td>{productDetails.size}</td>
                  </tr>
                  <tr>
                    <td className="py-sm-2">
                      <b>Color :</b>
                    </td>
                    <td>{productDetails.color}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Quantity :</b>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="button-container d-flex mt-3">
                        <button
                          type="button"
                          className="btn btn-warning btn-sm custom-button me-1 "
                          onClick={decQuantity}
                        >
                          <FaMinus className="quantity-btn" />
                        </button>
                        <p className="m-0">
                          <b>{quantity}</b>
                        </p>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm custom-button ms-1"
                          onClick={incQuantity}
                        >
                          <FaPlus className="quantity-btn" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <p className="float-end">Subtotal:</p>
        </div>
      </div>
      {/* subtotal */}
      <div className="col-12 col-sm-2 sub-total d-inline-block ms-sm-4 mt-3 mt-sm-0 ">
        <div>
          <p>
            subtotal of the cart product part of your order qualifies for Free
            delivery
          </p>
          <table>
            <tr>
              <td>Item :</td>
              <td></td>
            </tr>
            <tr>
              <td>Subtotal :</td>
              <td></td>
            </tr>
          </table>
          <br />
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              className="align-baseline"
              id="select"
              autocomplete="off"
            />
            <p className="align-baseline mb-0 ms-2">process to all item</p>
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="mt-2 btn btn-warning add-to-cart-button px-4 rounded-pill me-3 btn-sm "
            >
              Proceed to Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
