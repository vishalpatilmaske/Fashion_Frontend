import React from "react";
import { VscHeart } from "react-icons/vsc";
import { PiHandbagSimpleBold } from "react-icons/pi";
import { AiOutlineUser } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

import "../style/componentStyle/header.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div className="container">
        <a className="navbar-brand" href="#">
          <h2>
            {" "}
            Fashion<strong className="navbarbrand">Flick</strong>
          </h2>
        </a>
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
              <a className="nav-link" aria-current="page" href="#">
                Women
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Men
              </a>
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
              <a className="nav-link" aria-current="page" href="#">
                <PiHandbagSimpleBold className="icon-size" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">
                <VscHeart className="icon-size" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <AiOutlineUser className="icon-size" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
