import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../style/components/cart/cartsummary.css";
import { getSelectedCartItems } from "../../store/slice/cartSlice";
import { SlEarphones } from "react-icons/sl";

const CartSummary = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartProducts = useSelector((state) => state.product.cartProducts);
  const navigate = useNavigate();

  // get user selected items to buy
  useEffect(() => {
    const cartId = cart.cartId;
    if (cartId) dispatch(getSelectedCartItems({ cartId }));
  }, [cart.cartId]);

  // Memoize total products calculation
  const totalProducts = useMemo(() => {
    return cart.selectedItems.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [cart.selectedItems]);

  // Memoize subtotal calculation
  const subtotal = useMemo(() => {
    return cart.selectedItems.reduce((acc, item) => {
      const product = cartProducts.find((p) => p._id === item.productId);
      if (product) {
        return acc + product.price * item.quantity;
      }
      return acc;
    }, 0);
  }, [cart.items, cartProducts, cart.selectedItems]);

  // products  to send to the checkout page
  const products = cart.selectedItems;
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
              <td>{totalProducts}</td>
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
            onClick={() =>
              navigate("/checkout", {
                state: { products, subtotal },
              })
            }
          >
            Proceed to Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
