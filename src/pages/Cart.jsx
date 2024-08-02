import React from "react";
import CartItemList from "../components/cart/CartItemList";
import CartSummary from "../components/cart/CartSummary";

function Cart() {
  return (
    <div className="container-fluid container-sm cart row my-3 mx-auto d-flex align-items-start">
      <div className="col-12 col-sm-9">
        <CartItemList />
      </div>
      <div className="col-12 col-sm-2">
        <CartSummary />
      </div>
    </div>
  );
}

export default Cart;
