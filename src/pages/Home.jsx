import React, { useEffect } from "react";
import "../style/page/home.css";
import Carousel from "../components/home/Carousel.jsx";
import Poster from "../components/home/Poster.jsx";
import WomensProductPoster from "../components/home/WomensProductPoster.jsx";
import MenProductPoster from "../components/home/MenProductPoster.jsx";
import { useDispatch, useSelector } from "react-redux";
import { createCart } from "../store/slice/cartSlice.js";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.signin.userCredential);

  // Get cartId from localStorage
  const cartId = localStorage.getItem("cartId");
  const loading = useSelector((state) => state.product.loading);

  useEffect(() => {
    // Check if user is authenticated
    if (user?._id) {
      // If cartId is null or undefined, create a new cart
      if (!cartId) {
        dispatch(createCart(user._id)).then((response) => {
          // console.log(response);
        });
      } else {
      }
    }
  }, [dispatch, user?._id, cartId]);

  return (
    <div>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <div className={loading ? "blurred" : ""}>
        <Carousel />
        <Poster />
        <WomensProductPoster />
        <MenProductPoster />
      </div>
    </div>
  );
}

export default Home;
