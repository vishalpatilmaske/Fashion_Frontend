import React, { useEffect, useMemo, useState } from "react";
import "../../style/components/cart/cartitemlist.css";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  getCartItems,
  loadCartDetials,
  updateItemQuantity,
  removeFromCart,
  addSelectedCartItems,
  deselectSelectedCartItems,
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

  // state to track selected items
  const selectedItems = useSelector((state) => state.cart.selectedItems);
  // Load cart details from the local storage only once on component mount
  useEffect(() => {
    // dispatch(getCartItem({ cartId }));
    dispatch(loadCartDetials());
  }, [dispatch]);

  // Fetch cart items when cartId is available
  useEffect(() => {
    if (cartId) {
      dispatch(getCartItems({ cartId }));
    }
  }, [dispatch, cartId]);

  // Fetch product details for items in the cart, memoize the product IDs
  useEffect(() => {
    if (cart.items && product.cartProducts) {
      const productIdsInCart = new Set(product.cartProducts.map((p) => p._id));

      cart.items.forEach((item) => {
        if (!productIdsInCart.has(item.productId)) {
          dispatch(getCartProducts({ productId: item.productId }));
        }
      });
    }
  }, [dispatch, cart.items, product.cartProducts]);

  // Memoized function to find the product details
  const getProductDetails = useMemo(() => {
    return (productId) => product.cartProducts.find((p) => p._id === productId);
  }, [product.cartProducts]);

  // Memoized function to find the item in the cart
  const getCartItem = useMemo(() => {
    return (productId) =>
      cart.items.find((item) => item.productId === productId);
  }, [cart.items]);

  // Handle updating product quantity
  const handleUpdateProductQuantity = (productDetails, newQuantity) => {
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

  // Handle select item to buy purches
  const handelSelectSingleProduct = (productId, quantity) => {
    dispatch(addSelectedCartItems({ cartId, productId, quantity }));
  };

  // Handle deselect selcted item to purches
  const handelDeselectSelectSingleProduct = (productId) => {
    dispatch(deselectSelectedCartItems({ cartId, productId }));
  };
  // Handle select all items to purches
  const handleSelectAllItems = (productId) => {
    dispatch(addSelectedCartItems({ cartId, productId }));
  };

  // Handle deselect all purches
  const handleDeselectAllItems = () => {};

  return (
    <div className="cart-item-list mb-5">
      <h4>Shopping Cart</h4>
      <div className="d-flex justify-content-between">
        <p className="align-baseline mb-0 ms-2 toggle-item-selection">
          {Object.keys(selectedItems).length === cart.items.length ? (
            <span onClick={handleDeselectAllItems}>Deselect all items</span>
          ) : (
            <>
              No items selected.
              <span
                onClick={() => {
                  const productId = cart.items;
                  handleSelectAllItems(productId);
                }}
              >
                Select all items
              </span>
            </>
          )}
        </p>
        <p className="float-end" style={{ cursor: "pointer" }}>
          Price
        </p>
      </div>
      <hr className="mt-0 mb-4" />
      {cart.items?.length === 0 ? (
        <h1 className="text-center">Empty</h1>
      ) : (
        cart.items.map((item) => {
          const productDetails = getProductDetails(item.productId);

          return (
            productDetails && (
              <div key={productDetails._id} className="row">
                <div className="col-4 col-sm-3">
                  <div className="d-flex align-items-center justify-content-between cart-item">
                    <input
                      type="checkbox"
                      className="align-baseline mx-1"
                      autoComplete="off"
                      checked={selectedItems.some(
                        (selectedItem) =>
                          selectedItem.productId === productDetails._id
                      )}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handelSelectSingleProduct(
                            productDetails._id,
                            getCartItem(productDetails._id)?.quantity
                          );
                        } else {
                          handelDeselectSelectSingleProduct(productDetails._id);
                        }
                      }}
                    />
                    <img
                      src={productDetails.image}
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
                            <p>{productDetails.description}</p>
                          </td>
                          <td>
                            <p className="align-baseline float-end">
                              <b>&#8377;{productDetails.price}</b>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Size :</b>
                          </td>
                          <td>{getCartItem(productDetails._id)?.size}</td>
                        </tr>
                        <tr>
                          <td className="py-sm-2">
                            <b>Color :</b>
                          </td>
                          <td>{getCartItem(productDetails._id)?.color}</td>
                        </tr>
                        <tr className="d-flex justify-content-start">
                          <td>
                            <b>Quantity :</b>
                          </td>
                          <td className="mx-2">
                            <b>{getCartItem(productDetails._id)?.quantity}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="button-container d-flex mt-3">
                              <button
                                type="button"
                                className="btn btn-warning btn-sm custom-button me-1"
                                onClick={() => {
                                  let quantity = getCartItem(
                                    productDetails._id
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
                                  {getCartItem(productDetails._id)?.quantity}
                                </b>
                              </p>
                              <button
                                type="button"
                                className="btn btn-warning btn-sm custom-button ms-1"
                                onClick={() => {
                                  let quantity = getCartItem(
                                    productDetails._id
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
                    onClick={() => handleRemoveFromCart(item.productId)}
                  />
                </div>
                <hr />
              </div>
            )
          );
        })
      )}
    </div>
  );
};

export default CartItemList;
