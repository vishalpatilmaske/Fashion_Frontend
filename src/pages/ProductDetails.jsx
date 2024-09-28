import "../style/page/productdetails.css";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemsToCart,
  loadCartDetials,
  updateItemQuantity,
} from "../store/slice/cartSlice";
import { FaPlus, FaMinus } from "react-icons/fa";

function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // load the local storage data
  dispatch(loadCartDetials());
  const user = useSelector((state) => state.auth.signin);
  const cartId = useSelector((state) => state.cart.cartId);
  const isAuthenticate = user.isAuthenticate;

  const productDetails = location.state || {
    image: "default-image-url",
    description: "No description available",
    price: "0",
  };

  // Handle add to cart
  const handleAddToCart = () => {
    const productId = productDetails._id;
    if (isAuthenticate) {
      dispatch(addItemsToCart({ cartId, productId, quantity }));
      navigate("/cart", { state: quantity });
    }
  };

  // Handle updating product quantity
  const handleUpdateProductQuantity = (newQuantity) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      // Optionally, you can dispatch an action to update quantity in the cart
      const productId = productDetails._id;
      if (isAuthenticate) {
        dispatch(
          updateItemQuantity({ cartId, productId, quantity: newQuantity })
        );
      }
    }
  };

  return (
    <div className="dashboard-container">
      <div className="container-fluid container-md mt-3">
        <div className="row mb-5">
          <div className="col-sm-6 d-flex flex-column align-items-center pt-4">
            <div className="product-images mb-3"></div>
            {/* <div className="border main-image">
              <img
                src={productDetails.image}
                alt="product-image"
                className="img-fluid"
              />
            </div> */}
            <div className="card main-image">
              <img
                src={productDetails.image}
                className="card-img-top img-fluid"
                alt="poster image"
                onClick={() => {
                  navigate("/product-details", { state: item });
                }}
              />
            </div>
          </div>
          <div className="col-sm-6 p-5">
            <h3>{productDetails.description}</h3>
            <hr />
            <div className="price-container mb-3">
              <p className="productdetials-price">
                <sup>₹</sup>
                {productDetails.price}
                <sub style={{ fontSize: "0.7rem" }} className="text-secondary">
                  {" "}
                  M.R.P
                </sub>
              </p>
            </div>
            <hr />
            <div className="select-container mb-3">
              <label htmlFor="size">Size: </label>
              <select name="size" id="size">
                <option value="L">L</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
            <hr />
            <div className="button-container d-flex mt-3">
              <button
                type="button"
                className="btn btn-warning btn-sm custom-button me-1"
                onClick={() => handleUpdateProductQuantity(quantity - 1)}
              >
                <FaMinus className="quantity-btn" />
              </button>
              <p className="m-0 px-2">
                <b>{quantity}</b>
              </p>
              <button
                type="button"
                className="btn btn-warning btn-sm custom-button ms-1"
                onClick={() => handleUpdateProductQuantity(quantity + 1)}
              >
                <FaPlus className="quantity-btn" />
              </button>
            </div>
            <hr />
            <div className="row">
              <button
                type="button"
                className="col-6 btn btn-warning add-to-cart-button px-2 md-px-5 rounded-pill me-3"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button
                type="button"
                className="col-6 btn btn-warning buy-now-button px-2 md-px-5 rounded-pill"
                onClick={() => {
                  console.log();
                  navigate("/checkout", {
                    state: {
                      products: [
                        {
                          productId: productDetails._id,
                          quantity: quantity,
                        },
                      ],
                      subtotal: quantity * productDetails.price,
                    },
                  });
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
