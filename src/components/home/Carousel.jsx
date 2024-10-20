import React from "react";
import image1 from "/public/assets/images/carousel/home1.webp";
import image2 from "/public/assets/images/carousel/home2.webp";
import image3 from "/public/assets/images/carousel/home3.webp";
import "../../style/components/home/carousel.css";
function Carousel() {
  return (
    <section className="container-fluid carousel p-0">
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={image1}
              className="d-block w-100 img-fluid carousel-img"
              alt="image"
            />
          </div>
          <div className="carousel-item">
            <img
              src={image2}
              className="d-block w-100 img-fluid carousel-img"
              alt="image"
            />
          </div>
          <div className="carousel-item">
            <img
              src={image3}
              className="d-block w-100 img-fluid carousel-img"
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
  );
}

export default Carousel;
