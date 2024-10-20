import React from "react";
import "../../style/components/home/poster.css";
import poster1 from "/public/assets/images/poster/poster1.jpg";
import poster2 from "/public/assets/images/poster/poster2.webp";

const Product = () => {
  return (
    <section className="row girlshop-poster container mt-3 m-auto mb-3">
      <div className="mb-3">
        <h2 className="poster-heading">FEATURED BRAND FOR WOMEN</h2>
      </div>
      <div className="girlshop-poster-images d-flex flex-row container justify-content-around">
        <div>
          <img src={poster2} className="img-thumbnail " alt="poster" />
        </div>
        <div>
          <img src={poster1} className="img-thumbnail " alt="poster" />
        </div>
      </div>
    </section>
  );
};

export default Product;
