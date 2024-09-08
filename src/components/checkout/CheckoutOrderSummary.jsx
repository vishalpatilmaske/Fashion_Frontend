import React from "react";
import "../../style/components/checkout/ordersummary.css";
import { useDispatch, useSelector } from "react-redux";

const CheckoutOrderSummary = ({ products, subtotal }) => {
  // get paymetn method from order slice
  const paymentMethod = useSelector((state) => state.checkout.paymentMethod);
  // handel the make order
  const handelOrder = () => {
    // dispatch(createOrder({ userId }));
  };

  return (
    <div className="col-12 m-4 col-sm-3 checkout-summary">
      <div className="border rounded p-2 pb-4 summary">
        <div className="modal-footer d-flex justify-content-center my-2">
          <button
            type="button"
            className="btn btn-warning btn-sm px-4 rounded-pill"
            onClick={paymentMethod ? handelOrder : undefined}
          >
            {paymentMethod
              ? "Place Your Order and Pay"
              : "Select payment method"}
          </button>
          <hr />
        </div>
        <strong className="p-2">Order Summary</strong>
        <table>
          <tbody>
            <tr>
              <td className="p-2">Items :</td>
              <td className="p-2">
                {products.reduce((accumulator, currentValue) => {
                  return currentValue.quantity + accumulator;
                }, 0)}
              </td>
            </tr>
            <tr>
              <td className="p-2">Total:</td>
              <td className="p-2">{subtotal}</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <strong className="p-3 order-total">Order Total:</strong>
        <span>{subtotal}</span>
      </div>
    </div>
  );
};

export default CheckoutOrderSummary;
