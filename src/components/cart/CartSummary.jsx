import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../style/components/cart/cartsummary.css";
import { getCartItems } from "../../store/slice/cartSlice";
import { toast } from "react-toastify";

const CartSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartId } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getCartItems({ cartId }));
  }, [dispatch, cartId]);

  const cartProducts = useSelector((state) => state.cart.items);

  // Calculate total quantity of selected items
  const totalProducts = useMemo(() =>
    cartProducts.reduce(
      (acc, item) => (item.isSelected ? acc + item.quantity : acc),
      0
    )
  );

  // seleted items
  const selectedItems = cartProducts.filter((item) =>
    item.isSelected ? item : false
  );

  const subtotal = useMemo(() => {
    return cartProducts.reduce((acc, item) => {
      if (item.isSelected) {
        return acc + item.quantity * item.productId.price;
      }
      return acc;
    }, 0);
  }, [cartProducts]);

  const handleCheckout = () => {
    if (cartProducts.length === 0) {
      toast.warn("Please select a product!");
    } else {
      navigate("/checkout", { state: { products: selectedItems, subtotal } });
    }
  };

  return (
    <div className="sub-total d-inline-block ms-sm-4 mt-sm-0">
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
        <input type="checkbox" id="select" autoComplete="off" />
        <p className="mb-0 ms-2">Proceed to all items</p>
      </div>
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="mt-2 btn btn-warning add-to-cart-button px-4 rounded-pill btn-sm"
          onClick={handleCheckout}
        >
          Proceed to Buy
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
