import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/home/Footer.jsx";
import Header from "./components/home/Header.jsx";
import WatchList from "./pages/WatchList.jsx";
import Cart from "./pages/Cart.jsx";
import Home from "./pages/Home.jsx";
import WomenProductListing from "./pages/WomenProductListing.jsx";
import MenProductListing from "./pages/MenProductListing.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Profile from "./pages/Profile.jsx";
import Checkout from "./pages/Checkout.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import NotFound from "./pages/NotFound.jsx";
import PrivateRoutes from "./components/auth/PrivateRoutes.jsx";

const MyRoutes = () => {
  const location = useLocation();
  const isCheckoutPage = location.pathname === "/checkout";
  const isSigninPage = location.pathname === "/signin";
  const isSignupPage = location.pathname === "/signup";

  const shouldShowHeaderFooter =
    !isCheckoutPage && !isSignupPage && !isSigninPage;

  return (
    <>
      {shouldShowHeaderFooter && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/women-product-listing"
          element={<WomenProductListing />}
        />
        <Route path="/men-product-listing" element={<MenProductListing />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
        {/* Private routes */}
        <Route
          path="/watchlist"
          element={
            <PrivateRoutes>
              <WatchList />
            </PrivateRoutes>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoutes>
              <Cart />
            </PrivateRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoutes>
              <Profile />
            </PrivateRoutes>
          }
        />
        {/* <Route
          path="/checkout"
          element={
            <PrivateRoutes>
              <Checkout />
              //{" "}
            </PrivateRoutes>
          }
        /> */}
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      {shouldShowHeaderFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  );
}

export default App;
