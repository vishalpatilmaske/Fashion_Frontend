import React, { useEffect } from "react";
import "../../style/components/home/womensproductposter.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/slice/productSlice";
import { useNavigate } from "react-router-dom";

function MenProductPoster() {
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
          // Filter products where the category is 'women' and then slice the array to show only 6 products
          products
            .filter((item) => item.category === "men")
            .slice(0, 6)
            .map((item, index) => (
              <li key={item._id || index} className="col-4 col-sm-4 col-lg-2">
                <div className="card womens-card">
                  <img
                    src={item.image}
                    className="card-img-top womens-product img-fluid"
                    alt="poster image"
                    onClick={() => {
                      navigate("/men-product-listing");
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

export default MenProductPoster;
