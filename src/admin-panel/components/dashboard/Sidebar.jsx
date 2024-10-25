import React, { useState } from "react";
import "../../style/component/sidebar.css";

import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div>
          <h3
            className="py-4 dashboard-title"
            onClick={() => {
              navigate("/");
            }}
          >
            FashionFlick
          </h3>
        </div>
        <div className="sidebar-components">
          <ul className="list-unstyled p-3">
            <li>
              <div
                className="d-flex align-items-center mb-3 p-2"
                onClick={() => navigate("/admin-panel/dashboard")}
              >
                <div className="icon me-3">
                  <IoHomeOutline size={20} />
                </div>
                <div className="text">
                  <p className="mb-0">Dashboard</p>
                </div>
              </div>
            </li>
            <li>
              <div
                className="d-flex align-items-center mb-3 p-2"
                onClick={() => navigate("/admin-panel/customers")}
              >
                <div className="icon me-3">
                  <FaRegUser size={20} />
                </div>
                <div className="text">
                  <p className="mb-0">Customers</p>
                </div>
              </div>
            </li>
            <li>
              <div
                className="d-flex align-items-center mb-3 p-2"
                onClick={() => navigate("/admin-panel/orders")}
              >
                <div className="icon me-3">
                  <MdOutlineShoppingCart size={20} />
                </div>
                <div className="text">
                  <p className="mb-0">Orders</p>
                </div>
              </div>
            </li>
            <li>
              <div
                className="d-flex align-items-center mb-3 p-2"
                onClick={() => navigate("/admin-panel/products")}
              >
                <div className="icon me-3">
                  <AiOutlineProduct size={20} />
                </div>
                <div className="text">
                  <p className="mb-0">Products</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
