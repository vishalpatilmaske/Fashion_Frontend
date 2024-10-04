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
  const cart = useSelector((state) => state.cart);
  // Load cart details
  useEffect(() => {
    dispatch(loadCartDetials());
  }, [dispatch]);

  // When cart details are loaded, check if cart exists or not
  useEffect(() => {
    if (cart.cartDetailsLoaded && user?._id) {
      if (!cart.cartId && cart.cartId == undefined) {
        dispatch(createCart(user._id));
      }
    }
  }, [dispatch, cart.cartDetailsLoaded, user?._id, cart.cartId]);

  return (
    <>
      <Carousel />
      <Poster />
      <WomensProductPoster />
    </>
  );
}

export default Home;
