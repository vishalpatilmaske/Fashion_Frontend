import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/page/productdetails.css";

function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  // Default product details if location.state is empty
  const productDetails = location.state || {
    image: "default-image-url",
    description: "No description available",
    price: "0",
  };

  // Generate a random discount percentage between 10 and 80
  const offPercentage = Math.floor(Math.random() * (80 - 10 + 1)) + 10;

  // Generate a random off price between 400 and 2000
  const offPrice = Math.floor(Math.random() * (2001 - 400)) + 400;

  return (
    <div className="dashboard-container">
      {/* Container fluid on small screens, fixed-width on medium and up */}
      <div className="container-fluid container-md mt-3">
        <div className="row">
          {/* Product Image Section */}
          <div className="col-sm-6 d-flex flex-column align-items-center">
            <div className="product-images mb-3">
              {/* Add product thumbnails or additional images here if needed */}
            </div>
            <div className="border main-image">
              <img src={productDetails.image} alt="Product" />
            </div>
          </div>
          {/* Product Details Section */}
          <div className="col-sm-6 p-5">
            <h3>{productDetails.description}</h3>
            <hr />
            <div className="price-container mb-3">
              <p className="off">-{offPercentage}%</p>
              <p className="price">
                <sup>₹</sup>
                {productDetails.price}
              </p>
            </div>
            <p className="price-off mb-3">
              M.R.P.: <s>₹{offPrice}</s>
            </p>
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
            <div className="row">
              <button
                type="button"
                className="col-6 btn btn-warning add-to-cart-button px-5 rounded-pill me-3"
                onClick={() => {
                  navigate("/cart", { state: productDetails });
                }}
              >
                Add to Cart
              </button>
              <button
                type="button"
                className="col-6 btn btn-warning buy-now-button px-5 rounded-pill"
                onClick={() => {
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
