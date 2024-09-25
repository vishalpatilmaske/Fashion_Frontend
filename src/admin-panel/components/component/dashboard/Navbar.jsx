import React from "react";

import "../../style/admin/navbar.css";
import image from "../../assets/admin/DSC_2377.JPG";
const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark container mt-3 rounded p-2 shadow-lg">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarText">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
            <li className="nav-item">
              <div className="d-flex justify-content-end align-items-center">
                <div className="text-end me-3">
                  <strong>user name</strong>
                  <p className="mb-0">Admin</p>
                </div>
                <div>
                  <img
                    src={image}
                    alt="Profile"
                    className="rounded-circle"
                    width="40"
                    height="40"
                  />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
