import React, { useEffect, useMemo } from "react";
import "../../style/global.css";
import "../../style/components/home/header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { PiHandbagSimpleBold } from "react-icons/pi";
import { AiOutlineUser } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { loadLocalStorage } from "../../store/slice/authSlice";
import { loadCartDetials, getCartItems } from "../../store/slice/cartSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Load user data and cart details on mount
  useEffect(() => {
    dispatch(loadLocalStorage());
    dispatch(loadCartDetials());
  }, [dispatch]);

  // Selectors
  const cartId = useSelector((state) => state.cart.cartId);

  const cartItems = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector(
    (state) => state.auth.signin.isAuthenticate
  );

  // Fetch cart items if cartId is available
  useEffect(() => {
    if (cartId) dispatch(getCartItems({ cartId }));
  }, [cartId, dispatch]);

  // Calculate total cart item count using memoization
  const totalCartItems = useMemo(
    () => cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0,
    [cartItems]
  );

  // Navigate function for profile and cart
  const handleNavigate = (path) => navigate(isAuthenticated ? path : "/signin");

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid py-1 header ">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Logo */}
          <NavLink to="/" className="navbar-brand d-flex align-items-center">
            <h4>
              <strong className="text-white">Fashion</strong>
              <strong className="navbarbrand">Flick</strong>
            </h4>
          </NavLink>

          {/* Category Links */}
          <ul className="navbar-nav product-category ms-2 mb-2 mb-lg-0 d-flex align-items-center ">
            <li className="nav-item">
              <NavLink
                className="nav-link text-white"
                to="/women-product-listing"
              >
                Women
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link text-white ms-3"
                to="/men-product-listing"
              >
                Men
              </NavLink>
            </li>
          </ul>

          {/* search */}
          <div className="w-50 serach-bar-main-container">
            <div className="input-group input-group-sm serach-bar mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Explore products"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
              />
              <span className="input-group-text" id="inputGroup-sizing-sm">
                <span style={{ cursor: "pointer" }}>
                  <FaSearch />
                </span>
              </span>
            </div>
          </div>

          {/* Icons for Cart and Profile */}
          <ul className="navbar-nav icons d-flex align-items-between ">
            <li className="nav-item me-3">
              <span
                className="nav-link"
                onClick={() => handleNavigate("/cart")}
              >
                <PiHandbagSimpleBold className="icon-size" />
                {totalCartItems > 0 && (
                  <span className="number-of-cart-items">{totalCartItems}</span>
                )}
              </span>
            </li>
            <li className="nav-item ms-3">
              <span
                className="nav-link"
                onClick={() => handleNavigate("/profile")}
              >
                <AiOutlineUser className="icon-size" />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
