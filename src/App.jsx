import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/home/Footer.jsx";
import Header from "./components/home/Header.jsx";
import WatchList from "./pages/WatchList.jsx";
import Cart from "./pages/Cart.jsx";
import Home from "./pages/Home.jsx";
import Women from "./pages/Women.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Profile from "./pages/Profile.jsx";
import Checkout from "./pages/Checkout.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import NotFound from "./pages/NotFound.jsx";

const MyRoutes = () => {
  const location = useLocation();
  const isCheckoutPage = location.pathname === "/checkout";
  const isSigninPage = location.pathname === "/signin";
  const isSignupPage = location.pathname === "/signup";
  const isErrorPage = location.pathname === "*";

  const shouldShowHeaderFooter =
    !isCheckoutPage && !isSignupPage && !isErrorPage && !isSigninPage;

  return (
    <>
      {shouldShowHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />{" "}
        {/* Removed restricted prop */}
        <Route path="/women" element={<Women />} />
        <Route path="/productdetails" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
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
