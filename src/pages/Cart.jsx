import React, { useEffect } from "react";
import CartItemList from "../components/cart/CartItemList";
import CartSummary from "../components/cart/CartSummary";
import { useDispatch, useSelector } from "react-redux";
import { createCart, loadCartDetials } from "../store/slice/cartSlice";

function Cart() {
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
