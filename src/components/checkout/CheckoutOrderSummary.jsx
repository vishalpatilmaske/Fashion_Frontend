import React from "react";
import "../../style/components/checkout/ordersummary.css";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckoutOrderSummary = () => {
  const cart = useSelector((state) => state.cart);
  const location = useLocation();
  const { id } = location.state || {};

  const checkoutitem = cart.filter((product) => cart.id === id);
  // product total
  const total = checkoutitem.reduce((total, item) => {
    return total + item.price * 1;
  }, 0);

  return (
    <div className="col-12 m-4 col-sm-3 checkout-summary">
      <div className="border rounded p-2 pb-4 summary">
        <strong className="p-2">Order Summary</strong>
        <table>
          <tbody>
            <tr>
              <td className="p-2">Items :</td>
              <td className="p-2">{checkoutitem.length}</td>
            </tr>
            <tr>
              <td className="p-2">Delivery:</td>
              <td className="p-2"></td>
            </tr>
            <tr>
              <td className="p-2">Total:</td>
              <td className="p-2">{total}</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <strong className="p-3 order-total">Order Total:</strong>
      </div>
    </div>
  );
};

export default CheckoutOrderSummary;
