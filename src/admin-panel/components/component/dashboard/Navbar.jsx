import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdNotifications } from "react-icons/io";
import "../../../style/component/navbar.css";
import userImage from "../../../assets/image/user-image.png";

const Navbar = () => {
  return (
    <nav className="header navbar navbar-expand-lg bg-body-tertiary bg-dark p-4 p-sm-2 shadow fixed-top admin-header">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="headerNav">
          <ul className="header-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <CiSearch size={25} />
              </a>
            </li>
          </ul>
          <ul className="header-nav ms-auto d-flex align-items-center">
            <li className="nav-item me-3">
              <a className="nav-link" href="#">
                <IoMdNotifications size={25} />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <img
                  src={userImage}
                  alt="User Avatar"
                  className="user-avatar"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
