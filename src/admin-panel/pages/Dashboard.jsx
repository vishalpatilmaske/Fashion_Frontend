import React from "react";
import { getAllUsers } from "../../store/slice/authSlice";
import { getAllOrders } from "../../store/slice/checkoutSlice";
import image from "../assets/image/user-image.png";
import { useEffect } from "react";
import "../style/pages/dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Fetch all users and orders when the component mounts
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllOrders());
  }, [dispatch]);

  // Get all users
  const users = useSelector((state) => state.auth.user.allUsers);
  // Get all orders
  const allOrders = useSelector((state) => state.checkout?.allOrders);

  // Create a flattened array of orders for all the orders in a site
  const orders = allOrders?.flatMap((order) => order?.orders);

  return (
    <div className="container">
      <div className="row w-100">
        {/* Customers */}
        <div
          className="col-md-6 col-lg-3 mb-4"
          onClick={() => navigate("/admin-panel/customers")}
        >
          <div className="card shadow dashboard-card  ">
            <div className="card-body d-flex justify-content-between justify-content-between">
              <div className="">
                <h5 className="card-title">Customers</h5>
                <h6>{users?.length}</h6>
              </div>
              <div className="">
                <img src={image} alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div
          className="col-md-6 col-lg-3 mb-4"
          onClick={() => navigate("/admin-panel/orders")}
        >
          <div className="card shadow dashboard-card ">
            <div className="card-body d-flex justify-content-between">
              <div>
                <h5 className="card-title">Orders</h5>
                <h6>{orders?.length}</h6>
              </div>
              <div>
                <img src={image} alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* Total Products*/}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card shadow dashboard-card ">
            <div className="card-body d-flex justify-content-between">
              <div>
                <h5 className="card-title">Products</h5>
                <h6>10K</h6>
              </div>
              <div>
                <img src={image} alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* Total Revenu */}
        <div className="col-md-6 col-lg-3 mb-4 ">
          <div className="card shadow dashboard-card ">
            <div className="card-body d-flex justify-content-between">
              <div>
                <h5 className="card-title">Total Revenu</h5>
                <h6>10K</h6>
              </div>
              <div>
                <img src={image} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
