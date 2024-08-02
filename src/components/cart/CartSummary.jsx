import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../style/components/cart/cartsummary.css";

const CartSummary = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="sub-total d-inline-block ms-sm-4 mt-sm-0">
      <div>
        <p>
          Subtotal of the cart product part of your order qualifies for Free
          delivery
        </p>
        <table>
          <tbody>
            <tr>
              <td>Items :</td>
              <td>{cart.length}</td>
            </tr>
            <tr>
              <td>Subtotal :</td>
              <td>&#8377;{subtotal}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <div className="d-flex align-items-center">
          <input
            type="checkbox"
            className="align-baseline"
            id="select"
            autoComplete="off"
          />
          <p className="align-baseline mb-0 ms-2">Proceed to all items</p>
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="mt-2 btn btn-warning add-to-cart-button px-4 rounded-pill me-3 btn-sm"
            onClick={() => {
              navigate("/checkout");
            }}
          >
            Proceed to Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
