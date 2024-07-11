import React from "react";
import image1 from "../assets/images/carousel/home1.webq";
import image2 from "../assets/images/carousel/home2.webq";
import image3 from "../assets/images/carousel/home3.webq";

function Carousel() {
  return (
    <section className="container-fluid mt-2 carousel p-0">
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={image1} className="d-block w-100 img-fluid" alt="image" />
          </div>
          <div className="carousel-item">
            <img src={image2} className="d-block w-100 img-fluid" alt="image" />
          </div>
          <div className="carousel-item">
            <img src={image3} className="d-block w-100 img-fluid" alt="image" />
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
  );
}

export default Carousel;
