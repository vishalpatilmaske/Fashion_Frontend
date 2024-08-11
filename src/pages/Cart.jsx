import React, { useEffect } from "react";
import CartItemList from "../components/cart/CartItemList";
import CartSummary from "../components/cart/CartSummary";
import { useDispatch, useSelector } from "react-redux";
import { createCart } from "../store/slice/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth.signin.userData);

  useEffect(() => {
    if (data && data.id) {
      console.log("User ID:", data.id);
      dispatch(createCart(data.id));
    } else {
      console.log("User data not available yet.");
    }
  }, [data, dispatch]);

  return (
    <div className="container-fluid container-sm cart row my-3 mx-auto d-flex align-items-start">
      <div className="col-12 col-sm-9">{/* <CartItemList /> */}</div>
      <div className="col-12 col-sm-2">{/* <CartSummary /> */}</div>
      <h1>cart</h1>
    </div>
  );
}

export default Cart;
