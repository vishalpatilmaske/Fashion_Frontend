import React, { useEffect } from "react";
import CartItemList from "../components/cart/CartItemList";
import CartSummary from "../components/cart/CartSummary";
import { useDispatch, useSelector } from "react-redux";
import { createCart, loadCartDetials } from "../store/slice/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.signin.userCredential);
  const cart = useSelector((state) => state.cart);

  // Load cart details
  useEffect(() => {
    dispatch(loadCartDetials());
  }, [dispatch]);

  // When cart details are loaded, check if cart exists or not
  useEffect(() => {
    if (cart.cartDetailsLoaded && user?._id) {
      // Check if the cart is already loaded or not
      if (!cart.cartId && cart.cartId == undefined) {
        console.log("cart function called");
        dispatch(createCart(user._id));
      }
    }
  }, [dispatch, cart.cartDetailsLoaded, user?._id, cart.cartId]);

  return (
    <div className="container-sm container-fluid cart row my-3 mx-auto d-flex align-items-start ">
      <div className="col-12 col-sm-8 col-lg-9">
        <CartItemList />
      </div>
      <div className="col-12 col-sm-4 col-lg-3">
        <CartSummary />
      </div>
    </div>
  );
}

export default Cart;
