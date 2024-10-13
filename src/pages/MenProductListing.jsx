import { useEffect } from "react";
import { getAllProducts } from "../store/slice/productSlice";
import { useDispatch, useSelector } from "react-redux";
import "../style/page/menproductlisting.css";
import { useNavigate } from "react-router-dom";
import { addItemsToCart } from "../store/slice/cartSlice";

const MenProductListing = () => {
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
    <>
      {" "}
      <div className="row container-fluid  p-0 m-0 d-flex justify-content-center">
        <div className="col-md-2 ">
          <h4 style={{ fontSize: "1rem" }} className="mt-3 ms-3">
            Result for you
          </h4>
        </div>
        <div className="col-12 col-md-10 container row ">
          <div className="mt-4">
            <ul className="row men-product-list">
              {products &&
                products.map((item, index) => (
                  <li
                    key={item._id || index}
                    className="col-6 col-sm-4 col-md-3 col-lg-3 "
                  >
                    {item.category == "men" ? (
                      <div
                        className="card men-product-listing-card mt-3 "
                        style={{ height: "80vh", width: "70vw" }}
                      >
                        <img
                          src={item.image}
                          className="card-img-top men-product-image img-fluid"
                          alt="poster image"
                          style={{ height: "40vh" }}
                          onClick={() => {
                            navigate("/product-details", { state: item });
                          }}
                        />
                        <div className="card-body text-center">
                          <strong>{item.name}</strong>
                          <p style={{ fontSize: "0.9rem" }}>
                            {item.description.slice(0, 50).toString() + "..."}
                          </p>
                          <p>
                            <sup>₹</sup>
                            <span style={{ fontSize: "1.4rem" }}>
                              {item.price}
                            </span>
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
    </>
  );
};

export default MenProductListing;
