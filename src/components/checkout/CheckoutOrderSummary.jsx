import React, { useCallback, useMemo, useState } from "react";
import "../../style/components/checkout/ordersummary.css";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../store/slice/orderSlice";

const CheckoutOrderSummary = ({ product }) => {
  const dispatch = useDispatch();
  // users credention user Id
  const userId = useSelector((state) => state.auth.signin.userCredential?._id);

  // product detials
  let productDetails = [];
  productDetails = product;

  // Function to calculate the total
  const handleTotal = () => {
    if (product && product.productDetails) {
      return product.quantity * product.productDetails.price;
    }
    return 0;
  };

  // get paymetn method from order slice
  const paymentMethod = useSelector((state) => state.order.paymentMethod);

  // handel the make order
  const handelOrder = () => {
    dispatch(createOrder({ userId }));
  };

  return (
    <div className="col-12 m-4 col-sm-3 checkout-summary">
      <div className="border rounded p-2 pb-4 summary">
        <div className="modal-footer d-flex justify-content-center my-2">
          <button
            type="button"
            className="btn btn-warning btn-sm px-5 rounded-pill"
            onClick={paymentMethod ? handelOrder : undefined}
          >
            {paymentMethod ? "Place Order" : "Select payment method"}
          </button>
          <hr />
        </div>
        <strong className="p-2">Order Summary</strong>
        <table>
          <tbody>
            <tr>
              <td className="p-2">Items :</td>
              <td className="p-2">
                {product.totalProducts || product.quantity}
              </td>
            </tr>
            <tr>
              <td className="p-2">Total:</td>
              <td className="p-2">{product.subtotal || handleTotal()}</td>{" "}
            </tr>
          </tbody>
        </table>
        <hr />
        <strong className="p-3 order-total">Order Total:</strong>
        <span>{product.subtotal || handleTotal()}</span>
      </div>
    </div>
  );
};

export default CheckoutOrderSummary;
