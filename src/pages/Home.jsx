import React from "react";
import "../style/page/home.css";
import Carousel from "../components/home/Carousel.jsx";
import Poster from "../components/home/Poster.jsx";
import WomensProductPoster from "../components/home/WomensProductPoster.jsx";

function Home() {
  return (
    <>
      <Carousel />
      <Poster />
      <WomensProductPoster />
    </>
  );
}

export default Home;
