import React, { useEffect } from "react";
import CartItemList from "../components/cart/CartItemList";
import CartSummary from "../components/cart/CartSummary";
import { useDispatch, useSelector } from "react-redux";
import { createCart } from "../store/slice/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const isAuthenticate = useSelector(
    (state) => state.auth.signin.isAuthenticate
  );
  const user = useSelector((state) => state.auth.signin.userData);

  // when user was first time login create emplty cart for this user
  useEffect(() => {
    if (isAuthenticate) {
      dispatch(createCart(user._id));
    }
  }, []);

  return (
    <div className="container-fluid container-sm cart row my-3 mx-auto d-flex align-items-start">
      <div className="col-12 col-sm-9">
        <CartItemList />
      </div>
      <div className="col-12 col-sm-2">{/* <CartSummary /> */}</div>
      <h1>cart</h1>
    </div>
  );
}

export default Cart;
