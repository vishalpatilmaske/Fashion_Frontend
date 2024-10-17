// src/admin-panel/AdminRoutes.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./AdminLayout.jsx";
import Dashboard from "../admin-panel/pages/Dashboard.jsx";
import Customers from "./pages/Customers.jsx";
import Orders from "./pages/Orders.jsx";
import Products from "./pages/Products.jsx";
import EditCoustomer from "./pages/EditCoustomer.jsx";
import CoustomerDetails from "./pages/CoustomerDetails.jsx";
import CoustomerOrders from "./pages/CoustomerOrders.jsx";
import EditProdcut from "./pages/EditProduct.jsx";
import AddNewProduct from "./pages/AddNewProduct.jsx";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/edit-user" element={<EditCoustomer />} />
        <Route path="/user-details" element={<CoustomerDetails />} />
        <Route path="/user-orders" element={<CoustomerOrders />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/edit-product" element={<EditProdcut />} />
        <Route path="/products/add-new-product" element={<AddNewProduct />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
