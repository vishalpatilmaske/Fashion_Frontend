import React, { useEffect } from "react";
import "../../style/components/home/womensproductposter.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/slice/productSlice";
import { useNavigate } from "react-router-dom";

function WomensProductPoster() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.allProducts.data);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <ul className="row product-list mb-3">
        {products &&
          products.slice(0, 6).map((item, index) => (
            <li
              key={item._id || index}
              className="col-6 col-sm-4 col-md-3 col-lg-2"
            >
              <div className="card womens-card">
                <img
                  src={item.image}
                  className="card-img-top womens-product img-fluid"
                  alt="poster image"
                  onClick={() => {
                    navigate("/product-details", { state: item });
                  }}
                />
                <div className="card-body"></div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default WomensProductPoster;
