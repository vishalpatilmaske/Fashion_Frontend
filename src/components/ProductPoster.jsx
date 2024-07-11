import React from "react";
import "../style/component/product-poster.css";
import women from "../assets/data/women.json";
import { useState, useEffect } from "react";

function ProductPoster() {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(women);
  }, []);

  return (
    <>
      {" "}
      <div className="container-fluid container-sm ">
        <ul className="row product-list">
          {data.map((item) => (
            <li key={item.id} className="col-3 col-sm-3 col-md-2">
              <img
                src={item.image}
                className="womens-product"
                alt="poster image"
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ProductPoster;
