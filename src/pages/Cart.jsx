import React from "react";
import CartItemList from "../components/cart/CartItemList";
import CartSummary from "../components/cart/CartSummary";
import "../style/global.css";
import { useSelector } from "react-redux";

function Cart() {
  const loading = useSelector((state) => state.cart.loading);

  return (
    <div className="container-sm container-fluid cart row my-3 mx-auto d-flex align-items-start ">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
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
