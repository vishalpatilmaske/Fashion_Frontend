import React from "react";
import "../style/page/home.css";
import WomensProductPoster from "../components/WomensProductPoster.jsx";
import image1 from "../assets/images/carousel/home1.webp";
import image2 from "../assets/images/carousel/home2.webp";
import image3 from "../assets/images/carousel/home3.webp";
import poster1 from "../assets/images/poster/poster1.jpg";
import poster2 from "../assets/images/poster/poster2.webp";

function Home() {
  return (
    <>
      <section className="container-fluid mt-2 carousel p-0">
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={image1}
                className="d-block w-100 img-fluid"
                alt="image"
              />
            </div>
            <div className="carousel-item">
              <img
                src={image2}
                className="d-block w-100 img-fluid"
                alt="image"
              />
            </div>
            <div className="carousel-item">
              <img
                src={image3}
                className="d-block w-100 img-fluid"
                alt="image"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
      <section className="row girlshop-poster container mt-3 mb-3">
        <div className="container mb-3">
          <h2 className="poster-heading">FEATURED BRAND FOR WOMEN</h2>
        </div>
        <div className="girlshop-poster-images d-flex flex-row container justify-content-evenly">
          <div>
            <img src={poster2} className="img-thumbnail " alt="poster" />
          </div>
          <div>
            <img src={poster1} className="img-thumbnail " alt="poster" />
          </div>
        </div>
      </section>

      <WomensProductPoster />
    </>
  );
}

export default Home;
