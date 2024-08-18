import React, { useEffect } from "react";
import "../../style/components/cart/cartitemlist.css";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  getCartItems,
  loadCartDetials,
  updateItemQuantity,
  removeFromCart,
} from "../../store/slice/cartSlice";
import { getCartProducts } from "../../store/slice/productSlice";

const CartItemList = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const product = useSelector((state) => state.product);
  const isAuthenticate = useSelector(
    (state) => state.auth.signin.isAuthenticate
  );
  const cartId = cart.cartId;

  // Load cart details only once on component mount
  useEffect(() => {
    dispatch(loadCartDetials());
  }, [dispatch]);

  // Fetch cart items when cartId is available
  useEffect(() => {
    if (cartId) {
      dispatch(getCartItems({ cartId }));
    }
  }, [dispatch, cartId]);

  // Fetch product details for items in the cart
  useEffect(() => {
    if (cart.items && product.cartProducts) {
      cart.items.forEach((item) => {
        const isProductInCart = product.cartProducts.some(
          (product) => product._id === item.productId
        );
        if (!isProductInCart) {
          dispatch(getCartProducts({ productId: item.productId }));
        }
      });
    }
  }, [dispatch, cart.items, product.cartProducts]);

  // Handle updating product quantity
  const handleUpdateProductQuantity = async (productDetails, newQuantity) => {
    if (newQuantity > 0 && isAuthenticate) {
      dispatch(
        updateItemQuantity({
          cartId,
          productId: productDetails._id,
          quantity: newQuantity,
        })
      );
      // Fetch the updated cart items after quantity update
      dispatch(getCartItems({ cartId }));
    }
  };

  // Handle removing an item from the cart
  const handleRemoveFromCart = (productId) => {
    if (productId) {
      dispatch(removeFromCart({ cartId, productId }));
      // Fetch the updated cart items after removing an item
      dispatch(getCartItems({ cartId }));
    }
  };

  return (
    <div className="cart-item-list mb-5">
      <h4>Shopping Cart</h4>
      <p className="float-end">Price</p>
      <br />
      <hr />
      {cart.items?.length === 0 ? (
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
                    <tr className="d-flex justify-content-start">
                      <td>
                        <b>Quantity :</b>
                      </td>
                      <td className="mx-2">
                        <b>
                          {
                            cart.items.find(
                              (item) => item.productId === productDetails._id
                            )?.quantity
                          }
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="button-container d-flex mt-3">
                          <button
                            type="button"
                            className="btn btn-warning btn-sm custom-button me-1"
                            onClick={() => {
                              let quantity = cart.items.find(
                                (item) => item.productId === productDetails._id
                              )?.quantity;
                              handleUpdateProductQuantity(
                                productDetails,
                                quantity - 1
                              );
                            }}
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
                            onClick={() => {
                              let quantity = cart.items.find(
                                (item) => item.productId === productDetails._id
                              )?.quantity;
                              handleUpdateProductQuantity(
                                productDetails,
                                quantity + 1
                              );
                            }}
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
                  const productId = cart.items.find(
                    (item) => item.productId === productDetails._id
                  )?.productId;
                  handleRemoveFromCart(productId);
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
