import "../style/page/cart.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaMinus, FaRoad } from "react-icons/fa";
import { RiDeleteBin6Line, RiH1 } from "react-icons/ri";
import { removeFromCart } from "../store/slice/cartSlice";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // Initialize quantities state
  const [quantities, setQuantities] = useState(
    cart.reduce((acc, item) => {
      acc[item.id] = 1;
      return acc;
    }, {})
  );

  // increase the quantity of the product
  const incQuantity = (id) => {
    setQuantities({ ...quantities, [id]: (quantities[id] || 0) + 1 });
  };

  // decrease the quantity of the product
  const decQuantity = (id) => {
    setQuantities({
      ...quantities,
      [id]: quantities[id] > 1 ? quantities[id] - 1 : 1,
    });
  };

  // select the item form the cart

  const subtotal = cart.reduce((total, item) => {
    return total + item.price * (quantities[item.id] || 1);
  }, 0);

  return (
    <div className="container-fluid container-sm cart row my-3 mx-auto d-flex align-items-start ">
      <div className="col-12 col-sm-9 cart-item-list mb-5">
        <h4>Shopping Cart</h4>
        <p className="float-end">Price</p>
        <br />
        <hr />
        {cart.length == 0 ? <h1 className="text-center">Empty</h1> : false}
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
        <div>
          <p className="float-end">Subtotal: &#8377;{subtotal}</p>
        </div>
      </div>
      <div className="col-12 col-sm-2 sub-total d-inline-block ms-sm-4  mt-sm-0">
        <div>
          <p>
            Subtotal of the cart product part of your order qualifies for Free
            delivery
          </p>
          <table>
            <tbody>
              <tr>
                <td>Items :</td>
                <td>{cart.length}</td>
              </tr>
              <tr>
                <td>Subtotal :</td>
                <td>&#8377;{subtotal}</td>
              </tr>
            </tbody>
          </table>
          <br />
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              className="align-baseline"
              id="select"
              autoComplete="off"
            />
            <p className="align-baseline mb-0 ms-2">Proceed to all items</p>
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="mt-2 btn btn-warning add-to-cart-button px-4 rounded-pill me-3 btn-sm"
              onClick={() => {
                navigate("/checkout");
              }}
            >
              Proceed to Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
