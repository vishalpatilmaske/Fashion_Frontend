import { Outlet } from "react-router-dom";
import Navbar from "./components/dashboard/Navbar.jsx";
import Sidebar from "./components/dashboard/Sidebar.jsx";

const AdminLayout = () => {
  return (
    <div className="container-fluid d-flex p-0 m-0">
      <div className="col-2 p-0">
        <Sidebar />
      </div>
      <div className="col-10 p-0">
        <Navbar />
        <div className="p-3">
          {" "}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
