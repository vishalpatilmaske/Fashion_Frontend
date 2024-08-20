import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../style/components/cart/cartsummary.css";

const CartSummary = () => {
  const cart = useSelector((state) => state.cart);
  const cartProducts = useSelector((state) => state.product.cartProducts);
  const navigate = useNavigate();

  // State for subtotal
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    // Calculate subtotal
    const calculatedSubtotal = cartProducts.reduce((accumulator, current) => {
      return accumulator + current.price * current.quantity;
    }, 0);

    // Update the state
    setSubtotal(calculatedSubtotal);
  }, [cartProducts]);
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
              <td>{cart.items.length}</td>
            </tr>
            <tr>
              <td>Subtotal :</td>
              <td>&#8377;{subtotal.toFixed(2)}</td>
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
