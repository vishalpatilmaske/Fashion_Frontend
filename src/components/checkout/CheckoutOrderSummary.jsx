import React from "react";
import "../../style/components/checkout/ordersummary.css";

const CheckoutOrderSummary = ({ product }) => {
  // Function to calculate the total
  const handleTotal = () => {
    if (product && product.productDetails) {
      return product.quantity * product.productDetails.price;
    }
    return 0;
  };

  return (
    <div className="col-12 m-4 col-sm-3 checkout-summary">
      <div className="border rounded p-2 pb-4 summary">
        <div className="modal-footer d-flex justify-content-center my-2">
          <button
            type="button"
            className="btn btn-warning btn-sm px-3 rounded-pill"
          >
            Use this payment method
          </button>
          <hr />
        </div>
        <strong className="p-2">Order Summary</strong>
        <table>
          <tbody>
            <tr>
              <td className="p-2">Items :</td>
              <td className="p-2">{product.quantity}</td>
            </tr>
            <tr>
              <td className="p-2">Delivery:</td>
              <td className="p-2"></td>
            </tr>
            <tr>
              <td className="p-2">Total:</td>
              <td className="p-2">{handleTotal()}</td>{" "}
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
