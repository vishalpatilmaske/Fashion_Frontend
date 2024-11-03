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

const CartItemList = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // Load cart details from the local storage only once on component mount
  useEffect(() => {
    dispatch(loadCartDetials());
  }, [dispatch]);

  const cartId = cart.cartId;

  // Fetch cart items when cartId is available
  useEffect(() => {
    if (cartId) {
      dispatch(getCartItems({ cartId }));
    }
  }, [dispatch, cartId]);

  const cartProducts = useSelector((state) => state.cart.items);

  // Handle updating product quantity
  const handleUpdateProductQuantity = (productId, quantity) => {
    dispatch(
      updateItemQuantity({
        cartId,
        productId,
        quantity,
      })
    ).then((response) => {
      dispatch(getCartItems({ cartId }));
    });
  };

  // Handle removing an item from the cart
  const handleRemoveFromCart = (productId) => {
    if (productId) {
      dispatch(removeFromCart({ cartId, productId })).then(() => {
        dispatch(getCartItems({ cartId }));
      });
    }
  };

  // Handle select single product for purches
  const handelSelectSingleProduct = (productId) => {
    dispatch(addSelectedCartItems({ cartId, productId })).then(() => {
      dispatch(getCartItems({ cartId }));
    });
  };

  // Handle deselect selcted item to purches
  const handelDeselectSelectSingleProduct = (productId) => {
    dispatch(deselectSelectedCartItems({ cartId, productId })).then(() => {
      dispatch(getCartItems({ cartId }));
    });
  };
  // Handle select all items to purches
  const handleSelectAllItems = (productId) => {
    dispatch(addSelectedCartItems({ cartId, productId })).then(() => {
      dispatch(getCartItems({ cartId }));
    });
  };

  // Handle deselect all purches
  const handleDeselectAllItems = () => {
    dispatch(deselectSelectedCartItems({ cartId })).then(() => {
      dispatch(getCartItems({ cartId }));
    });
  };

  return (
    <div className="cart-item-list mb-5">
      <h4>Shopping Cart</h4>
      <div className="d-flex justify-content-between">
        <p className="align-baseline mb-0 ms-2 toggle-item-selection">
          {cartProducts.reduce(
            (acc, item) => (item.isSelected ? acc + 1 : acc),
            0
          ) === cartProducts.length ? (
            <span onClick={handleDeselectAllItems}>Deselect all items</span>
          ) : (
            <>
              {cartProducts.reduce(
                (acc, item) => (item.isSelected ? acc + 1 : acc),
                0
              ) === 0
                ? "No items selected."
                : false}

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
      {cartProducts?.length === 0 ? (
        <h1 className="text-center">Empty</h1>
      ) : (
        cartProducts?.map((item, key) => {
          return (
            <div key={key} className="row ">
              <div className="col-4 col-sm-3">
                <div className="d-flex align-items-center justify-content-between cart-item">
                  <input
                    type="checkbox"
                    className="align-baseline mx-1"
                    autoComplete="off"
                    checked={item?.isSelected}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handelSelectSingleProduct(item?.productId?._id);
                      } else {
                        handelDeselectSelectSingleProduct(item?.productId?._id);
                      }
                    }}
                  />
                  <div className="card cart-card">
                    <img
                      src={item?.productId?.image}
                      className="card-img-top product-image img-fluid"
                      alt="image"
                    />
                  </div>
                </div>
              </div>
              <div className="col-8">
                <div className="cart-item-details">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <p>{item?.productId?.description}</p>
                        </td>
                        <td>
                          <p className="align-baseline float-end">
                            <b>&#8377;{item?.productId?.price}</b>
                          </p>
                        </td>
                      </tr>
                      {/* <tr>
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
                        </tr> */}
                      <tr className="d-flex justify-content-start">
                        <td>
                          <b>Quantity :</b>
                        </td>
                        <td className="mx-2">
                          <b>{item?.quantity}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="button-container d-flex mt-3">
                            <button
                              type="button"
                              className="btn btn-warning btn-sm custom-button me-1"
                              onClick={() => {
                                const quantity = item?.quantity;
                                handleUpdateProductQuantity(
                                  item?.productId?._id,
                                  quantity - 1
                                );
                              }}
                            >
                              <FaMinus className="quantity-btn" />
                            </button>
                            <p className="m-0">
                              <b>{item?.quantity}</b>
                            </p>
                            <button
                              type="button"
                              className="btn btn-warning btn-sm custom-button ms-1"
                              onClick={() => {
                                const quantity = item?.quantity;
                                handleUpdateProductQuantity(
                                  item?.productId?._id,
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
                  onClick={() => handleRemoveFromCart(item?.productId?._id)}
                />
              </div>
              <hr />
            </div>
          );
        })
      )}
    </div>
  );
};

export default CartItemList;
