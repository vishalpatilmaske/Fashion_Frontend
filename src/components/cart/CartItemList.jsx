import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../store/slice/cartSlice";
import "../../style/components/cart/cartitemlist.css";

const CartItemList = () => {
  return (
    <div className="cart-item-list mb-5">
      <h4>Shopping Cart</h4>
      <p className="float-end">Price</p>
      <br />
      <hr />
      {length === 0 ? <h1 className="text-center">Empty</h1> : null}
      {cart.map((item) => (
        <div key={item.id} className="row">
          <div className="col-4 col-sm-3">
            <div className="d-flex align-items-center justify-content-between cart-item">
              <input
                type="checkbox"
                className="align-baseline mx-1"
                id="select"
                autoComplete="off"
              />
              <img src={item.image} alt="product" className="product-image" />
            </div>
          </div>
          <div className="col-8">
            <div className="cart-item-details">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <p>{item.description}</p>
                    </td>
                    <td>
                      <p className="align-baseline float-end">
                        <b>&#8377;{item.price}</b>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Size :</b>
                    </td>
                    <td>{item.size}</td>
                  </tr>
                  <tr>
                    <td className="py-sm-2">
                      <b>Color :</b>
                    </td>
                    <td>{item.color}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Quantity :</b>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="button-container d-flex mt-3">
                        <button
                          type="button"
                          className="btn btn-warning btn-sm custom-button me-1"
                          onClick={() => decQuantity(item.id)}
                        >
                          <FaMinus className="quantity-btn" />
                        </button>
                        <p className="m-0">
                          <b>{quantities[item.id]}</b>
                        </p>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm custom-button ms-1"
                          onClick={() => incQuantity(item.id)}
                        >
                          <FaPlus className="quantity-btn" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <RiDeleteBin6Line
              className="float-end delete mb-2"
              onClick={() => {
                dispatch(removeFromCart(item.id));
              }}
            />
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default CartItemList;
