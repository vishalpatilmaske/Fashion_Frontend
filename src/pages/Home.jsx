import React from "react";
import "../style/page/home.css";
import Carousel from "../components/home/Carousel.jsx";
import Poster from "../components/home/Poster.jsx";
import WomensProductPoster from "../components/home/WomensProductPoster.jsx";
import { useDispatch, useSelector } from "react-redux";
import { loadCartDetials, createCart } from "../store/slice/cartSlice.js";
import { useEffect } from "react";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.signin.userCredential);
  const cartId = localStorage.getItem("cartId");

  useEffect(() => {
    if (user?._id) {
      cartId
        ? console.log("allready cart created")
        : dispatch(createCart(user._id));
    }
  }, [dispatch, user?._id]);

  return (
    <>
      <Carousel />
      <Poster />
      <WomensProductPoster />
    </>
  );
}

export default Home;
