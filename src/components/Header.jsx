import React from "react";
import { Link, NavLink } from "react-router-dom";
import { VscHeart } from "react-icons/vsc";
import { PiHandbagSimpleBold } from "react-icons/pi";
import { AiOutlineUser } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

import "../style/component/header.css";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div className="container">
        <NavLink to="/">
          <h4>
            {" "}
            <strong>Fashion</strong>
            <strong className="navbarbrand">Flick</strong>
          </h4>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/Women">
                Women
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/men">
                Men
              </NavLink>
            </li>
          </ul>
          <form
            className="d-flex input-group input-group-sm search"
            role="search"
          >
            <input
              className="form-control rounded-5 rounded-end-0"
              type="search"
              placeholder="Search for items and brands"
              aria-label="Search"
            />
            <button className="btn rounded-5 rounded-start-0" type="submit">
              <FaSearch />
            </button>
          </form>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link pe-sm-3"
                aria-current="page"
                to="/cart"
              >
                <PiHandbagSimpleBold className="icon-size" />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link pe-sm-3"
                aria-current="page"
                to="/watchlist"
              >
                <VscHeart className="icon-size" />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " to="/profile">
                <AiOutlineUser className="icon-size" />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;