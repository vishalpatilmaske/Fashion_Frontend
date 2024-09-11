import React, { useEffect } from "react";
import "../../style/globle.css";
import "../../style/components/home/header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { VscHeart } from "react-icons/vsc";
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

  const { userCredential, success } = useSelector((state) => state.auth.signin);

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container py-2 header">
        <div className="container">
          <NavLink to="/" className="navbar-brand d-flex align-items-center">
            <h4 className="m-0">
              <strong className="text-white">Fashion</strong>
              <strong className="navbarbrand">Flick</strong>
            </h4>
          </NavLink>
          <ul className="navbar-nav product-category ms-2 mb-2 mb-lg-0">
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

          <div className="input-group search-input mx-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Explore products"
              aria-label="Search"
              aria-describedby="search-icon"
            />
            <span
              className="input-group-text"
              id="search-icon"
              style={{ cursor: "pointer" }}
            >
              <FaSearch />
            </span>
          </div>

          <ul className="navbar-nav icons">
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">
                <PiHandbagSimpleBold className="icon-size" />
                {cartItems?.length > 0 && (
                  <sup>
                    {cartItems.reduce(
                      (accumulator, current) => accumulator + current.quantity,
                      0
                    )}
                  </sup>
                )}
              </NavLink>
            </li>
            <li className="nav-item mx-3">
              <NavLink className="nav-link" to="/watchlist">
                <VscHeart className="icon-size" />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                <AiOutlineUser className="icon-size" />
              </NavLink>
            </li>
            {/* <li className="nav-item login">
              <p
                onClick={() => {
                  if (!success) navigate("/signin");
                }}
              >
                Hello,{" "}
                <strong>
                  {success ? userCredential.email.slice(0, 6) : "signin"}
                </strong>
              </p>
              {success && (
                <div className="dropdown-center">
                  <p
                    className="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Account
                  </p>
                  <ul className="dropdown-menu">
                    <li className="mx-auto">
                      <p
                        className="dropdown-item"
                        onClick={() => {
                          dispatch(logout());
                        }}
                      >
                        Logout
                      </p>
                    </li>
                  </ul>
                </div>
              )}
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
