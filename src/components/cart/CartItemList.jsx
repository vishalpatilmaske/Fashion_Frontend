import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getCartItems, loadCartDetials } from "../../store/slice/cartSlice";
import { getCartProducts } from "../../store/slice/productSlice";
import "../../style/components/cart/cartitemlist.css";

const CartItemList = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const product = useSelector((state) => state.product);

  // Load cart details and fetch cart items
  useEffect(() => {
    dispatch(loadCartDetials());
    const cartId = cart.cartId;
    if (cartId) {
      dispatch(getCartItems({ cartId }));
    }
  }, [dispatch, cart?.cartId]);

  // Fetch product details for each item in the cart
  useEffect(() => {
    cart.items.forEach((item) => {
      dispatch(getCartProducts({ productId: item.productId }));
    });
  }, [dispatch, cart.items]);

  return (
    <div className="cart-item-list mb-5">
      <h4>Shopping Cart</h4>
      <p className="float-end">Price</p>
      <br />
      <hr />
      {cart.items.length === 0 ? (
        <h1 className="text-center">Empty</h1>
      ) : (
        product.cartProducts.map((productDetails) => (
          <div key={productDetails._id} className="row">
            <div className="col-4 col-sm-3">
              <div className="d-flex align-items-center justify-content-between cart-item">
                <input
                  type="checkbox"
                  className="align-baseline mx-1"
                  id="select"
                  autoComplete="off"
                />
                <img
                  src={productDetails?.image}
                  alt="product"
                  className="product-image"
                />
              </div>
            </div>
            <div className="col-8">
              <div className="cart-item-details">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <p>{productDetails?.description}</p>
                      </td>
                      <td>
                        <p className="align-baseline float-end">
                          <b>&#8377;{productDetails?.price}</b>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Size :</b>
                      </td>
                      <td>
                        {
                          cart.items.find(
                            (item) => item.productId === productDetails._id
                          )?.size
                        }
                      </td>
                    </tr>
                    <tr>
                      <td className="py-sm-2">
                        <b>Color :</b>
                      </td>
                      <td>
                        {
                          cart.items.find(
                            (item) => item.productId === productDetails._id
                          )?.color
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Quantity :</b>
                      </td>
                      <td>
                        {
                          cart.items.find(
                            (item) => item.productId === productDetails._id
                          )?.quantity
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="button-container d-flex mt-3">
                          <button
                            type="button"
                            className="btn btn-warning btn-sm custom-button me-1"
                            onClick={() => console.log("Decrease quantity")}
                          >
                            <FaMinus className="quantity-btn" />
                          </button>
                          <p className="m-0">
                            <b>
                              {
                                cart.items.find(
                                  (item) =>
                                    item.productId === productDetails._id
                                )?.quantity
                              }
                            </b>
                          </p>
                          <button
                            type="button"
                            className="btn btn-warning btn-sm custom-button ms-1"
                            onClick={() => console.log("Increase quantity")}
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
                  const itemId = cart.items.find(
                    (item) => item.productId === productDetails._id
                  )?.id;
                  dispatch(removeFromCart(itemId));
                }}
              />
            </div>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default CartItemList;
