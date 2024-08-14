import "../style/page/productdetails.css";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../store/slice/cartSlice";
import { FaPlus, FaMinus } from "react-icons/fa";

function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.signin);
  const cartId = useSelector((state) => state.cart.cart);

  const productDetails = location.state || {
    image: "default-image-url",
    description: "No description available",
    price: "0",
  };

  // handel add to cart
  const handelAddToCart = () => {
    const isAuthenticate = user.isAuthenticate;
    const productId = productDetails._id;
    if (isAuthenticate) {
      dispatch(addItemsToCart({ cartId, productId, quantity }));
    }
  };

  // const offPercentage = Math.floor(Math.random() * (80 - 10 + 1)) + 10;

  // const offPrice = Math.floor(Math.random() * (2001 - 400)) + 400;

  return (
    <div className="dashboard-container">
      <div className="container-fluid container-md mt-3">
        <div className="row">
          <div className="col-sm-6 d-flex flex-column align-items-center">
            <div className="product-images mb-3"></div>
            <div className="border main-image">
              <img src={productDetails.image} alt="Product" />
            </div>
          </div>
          <div className="col-sm-6 p-5">
            <h3>{productDetails.description}</h3>
            <hr />
            <div className="price-container mb-3">
              {/* <p className="off">-{offPercentage}%</p> */}
              <p className="price">
                <sup>₹</sup>
                {productDetails.price}
              </p>
            </div>
            <p className="price-off mb-3">{/* M.R.P.: <s>₹{offPrice}</s> */}</p>
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
                onClick={() => setQuantity(quantity <= 1 ? 1 : quantity - 1)}
              >
                <FaMinus className="quantity-btn" />
              </button>
              <p className="m-0 px-2">
                <b>{quantity}</b>
              </p>
              <button
                type="button"
                className="btn btn-warning btn-sm custom-button ms-1"
                onClick={() => setQuantity(quantity + 1)}
              >
                <FaPlus className="quantity-btn" />
              </button>
            </div>
            <hr />
            <div className="row">
              <button
                type="button"
                className="col-6 btn btn-warning add-to-cart-button px-5 rounded-pill me-3"
                onClick={() => {
                  dispatch(handelAddToCart);
                  navigate("/cart");
                }}
              >
                Add to Cart
              </button>
              <button
                type="button"
                className="col-6 btn btn-warning buy-now-button px-5 rounded-pill"
                onClick={() => {
                  dispatch(addItemsToCart(productDetails));
                  navigate("/checkout", { state: productDetails });
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
