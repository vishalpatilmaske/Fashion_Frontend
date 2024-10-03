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
import AddressDetails from "./components/profile/AddressDetails.jsx";
import LoginSecurity from "./components/profile/LoginSecurity.jsx";
import OrderDetails from "./components/profile/OrderDetails.jsx";
import NotFound from "./pages/NotFound.jsx";
import PrivateRoutes from "./routes/PrivateRoutes.jsx";
import PrivateAdminRoutes from "./routes/AdminRoutes.jsx";
import AdminRoutes from "../src/admin-panel/AdminRoutes.jsx";

const MyRoutes = () => {
  const location = useLocation();
  const hideHeaderFooterPaths = [
    "/checkout",
    "/signin",
    "/signup",
    "/admin-panel",
    "/admin-panel/*",
  ];

  const shouldShowHeaderFooter = !hideHeaderFooterPaths.some((path) =>
    location.pathname.startsWith(path)
  );

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

        {/* Private Routes */}
        <Route
          path="/profile"
          element={
            <PrivateRoutes>
              <Profile />
            </PrivateRoutes>
          }
        />
        <Route
          path="/profile-address"
          element={
            <PrivateRoutes>
              <AddressDetails />
            </PrivateRoutes>
          }
        />
        <Route
          path="/profile-login-security"
          element={
            <PrivateRoutes>
              <LoginSecurity />
            </PrivateRoutes>
          }
        />
        <Route
          path="/profile-orders"
          element={
            <PrivateRoutes>
              <OrderDetails />
            </PrivateRoutes>
          }
        />
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
          path="/checkout"
          element={
            <PrivateRoutes>
              <Checkout />
            </PrivateRoutes>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin-panel/*"
          element={
            <PrivateAdminRoutes>
              <AdminRoutes />
            </PrivateAdminRoutes>
          }
        />

        {/* Fallback Route */}
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
