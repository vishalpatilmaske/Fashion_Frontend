import React from "react";
import "../style/component/product-poster.css";
import men from "../assets/data/men.json";
import { useState, useEffect } from "react";

function MenProductPoster() {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(men);
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

export default MenProductPoster;
