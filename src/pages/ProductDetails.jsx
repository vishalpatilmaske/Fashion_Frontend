import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/component/productdetails.css";
function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const productDetails = location.state || {};
  const offPersentage = Math.floor(Math.random() * (80 - 10 + 1)) + 10;
  const offPrice = Math.floor(Math.random() * (2001 - 400)) + 400;
  return (
    <div className="dashboard-container">
      <div className="dashboard row container mt-3 ">
        <div className="col-sm-6 row">
          {/* <div className="col-sm-2 product-images">
            <ul>
              {images.map((product) => (
                <li>
                  <img src={product} alt="" />
                </li>
              ))}
            </ul>
          </div> */}
          <div className="col-sm-12 border  main-image">
            <img src={productDetails.image} alt="" />
          </div>
        </div>
        <div className="col-sm-6  p-5">
          <h3>{productDetails.description}</h3>
          <hr />
          <div className="price-container">
            <p className="off ">-{offPersentage}%</p>
            <p className="price">
              <sup>₹</sup>
              {productDetails.price}
            </p>
          </div>
          <p className="price-off">
            M.R.P.:
            <s> ₹{offPrice}</s>
          </p>
          <hr />
          <div className="select-container">
            <label htmlFor="size">Size : </label>
            <select name="size" id="size">
              <option value="L">L </option>
              <option value="S">S </option>
              <option value="M">M </option>
              <option value="XL">XL </option>
              <option value="XXL">XXL </option>
            </select>
          </div>
          <hr />
          <div className="d-flex">
            <div>
              <button
                type="button"
                class="btn btn-warning add-to-cart-button px-5 rounded-pill"
              >
                Add to Cart
              </button>
            </div>
            <div className="ms-5">
              <button
                type="button"
                class="btn btn-warning buy-now-button px-5 rounded-pill"
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
