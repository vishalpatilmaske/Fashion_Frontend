import { useEffect } from "react";
import { getAllProducts } from "../store/slice/productSlice";
import { useDispatch, useSelector } from "react-redux";
import "../style/page/womenproductlisting.css";
import { useNavigate } from "react-router-dom";
import { addItemsToCart } from "../store/slice/cartSlice";

const WomenProductListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  // user state
  const user = useSelector((state) => state.auth.signin);
  // user cart id
  const cartId = useSelector((state) => state.cart.cartId);
  // check user is authenticatted or not
  const isAuthenticate = user.isAuthenticate;

  // handel add item to the cart
  const handleAddToCart = (productId, quantity = 1) => {
    if (isAuthenticate) {
      dispatch(addItemsToCart({ cartId, productId, quantity }));
      navigate("/cart");
    }
  };
  const products = useSelector((state) => state.product.allProducts.data);

  return (
    <div>
      <h4 style={{ fontSize: "1rem" }} className="mt-3 ms-3">
        Result for you
      </h4>
      <div className="offset-sm-3  col-sm-9 offset-lg-2 col-lg-10">
        <div className="container mt-3 ">
          <ul className="row womens-product-list mb-3">
            {products &&
              products.map((item, index) => (
                <li key={item._id || index} className="col-6 col-sm-4 col-lg-3">
                  {item.category === "women" ? (
                    <div className="card womens-product-listing-card ">
                      <img
                        src={item.image}
                        className="card-img-top womens-product-image img-fluid"
                        alt="poster image"
                        onClick={() => {
                          navigate("/product-details", { state: item });
                        }}
                      />
                      <div className="card-body text-center">
                        <strong>{item.name}</strong>
                        <p
                          className="product-description"
                          onClick={() => {
                            navigate("/product-details", { state: item });
                          }}
                        >
                          {item.description.slice(0, 30).toString() + "..."}
                        </p>
                        <p
                          onClick={() => {
                            navigate("/product-details", { state: item });
                          }}
                        >
                          <sup>₹</sup>
                          <span className="product-price">{item.price}</span>
                          <sub className="text-secondary"> M.R.P</sub>
                        </p>
                        <button
                          type="button"
                          className="btn btn-warning rounded-pill"
                          style={{ fontSize: "0.6rem" }}
                          onClick={() => {
                            handleAddToCart(item._id);
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ) : (
                    false
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WomenProductListing;
