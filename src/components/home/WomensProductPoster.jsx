import React, { useEffect } from "react";
import "../../style/components/home/womensproductposter.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/slice/productSlice";
import { useNavigate } from "react-router-dom";

function WomensProductPoster() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products.data);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <ul className="row product-list mb-3">
        {products &&
          products.map((item) => (
            <li key={item.id} className="col-3 col-sm-3 col-md-2">
              <img
                src={item.image}
                className="womens-product"
                alt="poster image"
                onClick={() => {
                  navigate("/product-details", { state: item });
                }}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default WomensProductPoster;
