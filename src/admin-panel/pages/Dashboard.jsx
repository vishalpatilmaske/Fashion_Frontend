import React from "react";
import { getAllUsers } from "../../store/slice/authSlice";
import { getAllOrders } from "../../store/slice/checkoutSlice";
import image from "../assets/image/user-image.png";
import { useEffect } from "react";
import "../style/pages/dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../store/slice/productSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Fetch all users and orders when the component mounts
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllOrders());
    dispatch(getAllProducts());
  }, [dispatch]);

  // Get all users
  const users = useSelector((state) => state?.auth?.user?.allUsers);
  // Get all orders
  const allOrders = useSelector((state) => state?.checkout?.allOrders);

  // Get all orders
  const allProducts = useSelector((state) => state?.product?.allProducts);

  // Create a flattened array of orders for all the orders in a site
  const orders = allOrders?.flatMap((order) => order?.orders);
  const totalRevenu = orders?.reduce((acc, current) => {
    return acc + (current?.product?.productId?.price || 0);
  }, 0);

  return (
    <div className="container" style={{ marginTop: "5rem" }}>
      <div className="row w-100 ">
        {/* Customers */}
        <div
          className="col-md-6 col-lg-3 mb-4"
          onClick={() => navigate("/admin-panel/customers")}
        >
          <div className="card shadow dashboard-card  ">
            <div className="card-body d-flex justify-content-between justify-content-between">
              <div className="">
                <h5 className="card-title">Customers</h5>
                <h4>{users?.length}</h4>
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
                <h4>{orders?.length}</h4>
              </div>
              <div>
                <img src={image} alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* Total Products*/}
        <div
          className="col-md-6 col-lg-3 mb-4"
          onClick={() => navigate("/admin-panel/products")}
        >
          <div className="card shadow dashboard-card ">
            <div className="card-body d-flex justify-content-between">
              <div>
                <h5 className="card-title">Products</h5>
                <h4>{allProducts?.data?.length}</h4>
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
                <h4>{totalRevenu}</h4>
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
