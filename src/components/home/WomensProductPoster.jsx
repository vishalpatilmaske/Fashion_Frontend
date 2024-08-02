import React from "react";
import "../../style/components/home/womensproductposter.css";
import women from "/public/assets/data/women.json";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function WomensProductPoster() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setData(women);
  }, []);

  return (
    <>
      {" "}
      <div className="container-fluid  ">
        <ul className="row product-list mb-3">
          {data.map((item) => (
            <li key={item.id} className="col-3 col-sm-3 col-md-2">
              <img
                src={item.image}
                className="womens-product"
                alt="poster image"
                onClick={() => {
                  navigate("/productdetails", { state: item });
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default WomensProductPoster;
