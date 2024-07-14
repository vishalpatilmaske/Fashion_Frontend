import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Watchlist from "./components/Watchlist.jsx";
import Cart from "./pages/Cart.jsx";
import Home from "./pages/Home.jsx";
import Women from "./pages/Women.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Profile from "./components/Profile.jsx";
import Checkout from "./pages/Checkout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const isCheckoutPage = location.pathname === "/checkout";

  return (
    <>
      {!isCheckoutPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/women" element={<Women />} />
        <Route path="/productdetails" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {!isCheckoutPage && <Footer />}
    </>
  );
}

export default App;
