import React, { useEffect, useMemo } from "react";
import "../../style/globle.css";
import "../../style/components/home/header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { PiHandbagSimpleBold } from "react-icons/pi";
import { AiOutlineUser } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { loadLocalStorage, logout } from "../../store/slice/authSlice";
import { loadCartDetials, getCartItems } from "../../store/slice/cartSlice";

function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Load user data and cart details on mount
  useEffect(() => {
    dispatch(loadLocalStorage());
    dispatch(loadCartDetials());
  }, [dispatch]);

  const cartId = useSelector((state) => state.cart.cartId);
  useEffect(() => {
    if (cartId) {
      dispatch(getCartItems({ cartId }));
    }
  }, [cartId, dispatch]);

  const { isAuthenticate } = useSelector((state) => state.auth.signin);

  // Calculate total cart item count
  const totalCartItems = useMemo(() => {
    return (
      cartItems?.reduce(
        (accumulator, current) => accumulator + current.quantity,
        0
      ) || 0
    );
  }, [cartItems]);

  // Handle click on profile
  const handelClickOnProfile = () => {
    if (isAuthenticate) {
      navigate("/profile");
    } else {
      navigate("/signin");
    }
  };

  // Handle click on the cart
  const handelClickOnCart = () => {
    if (isAuthenticate) {
      navigate("/cart");
    } else {
      navigate("/signin");
    }
  };
  const loading = useSelector((state) => state.product.loading);

  return (
    // <div className={loading ? "blurred" : ""}>
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid py-1 header ">
        <div className="container d-flex justify-content-between justify-content-sm-around ">
          {/* logo */}
          <NavLink to="/" className="navbar-brand  d-flex align-items-center">
            <h4>
              <strong className="text-white">Fashion</strong>
              <strong className="navbarbrand">Flick</strong>
            </h4>
          </NavLink>
          {/* category */}
          <ul className="navbar-nav product-category ms-2 mb-2 mb-lg-0 d-flex align-items-center">
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
            <div className="input-group input-group-sm serach-bar d-flex align-items-center ">
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
          {/* icons */}
          <ul className="navbar-nav icons d-flex align-items-between">
            <li className="nav-item me-3">
              <span className="nav-link" onClick={handelClickOnCart}>
                <PiHandbagSimpleBold className="icon-size" />
                {totalCartItems > 0 && (
                  <span className="number-of-cart-items">{totalCartItems}</span>
                )}
              </span>
            </li>
            <li className="nav-item ms-3">
              <span className="nav-link" onClick={handelClickOnProfile}>
                <AiOutlineUser className="icon-size" />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    // </div>
  );
}

export default Header;
