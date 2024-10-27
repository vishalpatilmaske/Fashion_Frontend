import { useEffect } from "react";
import { getAllProducts } from "../store/slice/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItemsToCart } from "../store/slice/cartSlice";
import "../style/page/menproductlisting.css";
import "../style/global.css";

const MenProductListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch products on component mount
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Selectors
  const user = useSelector((state) => state.auth.signin);
  const cartId = useSelector((state) => state.cart.cartId);
  const loading = useSelector((state) => state.product.loading);
  const products = useSelector((state) => state.product.allProducts.data);

  const isAuthenticated = user.isAuthenticate;

  // Filtered list of "men" category products
  const menProducts = products?.filter((item) => item.category === "men");

  // Handle Add to Cart with authentication check
  const handleAddToCart = (productId, quantity = 1) => {
    if (isAuthenticated) {
      dispatch(addItemsToCart({ cartId, productId, quantity }));
      navigate("/cart");
    } else {
      alert("Please sign in to add items to your cart.");
    }
  };

  return (
    <div className="row container-fluid p-0 m-0 d-flex justify-content-center">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <div className="col-md-2">
        <h4 className="mt-3 ms-3" style={{ fontSize: "1rem" }}>
          Results for you
        </h4>
      </div>

      <div className="col-12 col-md-10">
        <ul className="row men-product-list mb-3 mt-3">
          {menProducts?.map((item) => (
            <li key={item._id} className="col-6 col-sm-4 col-lg-3">
              <div className="card men-product-listing-card mb-3">
                <img
                  src={item.image}
                  alt={`${item.name}`}
                  className="card-img-top men-product-image img-fluid"
                  onClick={() => navigate("/product-details", { state: item })}
                />
                <div className="card-body text-center">
                  <strong>{item.name}</strong>
                  <p
                    className="product-description"
                    onClick={() =>
                      navigate("/product-details", { state: item })
                    }
                  >
                    {item.description.slice(0, 30) + "..."}
                  </p>
                  <p
                    onClick={() =>
                      navigate("/product-details", { state: item })
                    }
                  >
                    <sup>₹</sup>
                    <span className="product-price">{item.price}</span>
                    <sub className="text-secondary"> M.R.P</sub>
                  </p>
                  <button
                    type="button"
                    className="btn btn-warning rounded-pill"
                    style={{ fontSize: "0.6rem" }}
                    onClick={() => handleAddToCart(item._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenProductListing;
