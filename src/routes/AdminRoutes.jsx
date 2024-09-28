import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Custom hook for checking admin role
const useAdminRole = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const checkAdminRole = () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          console.log(decodedToken);
          // Check if the user has the admin role
          setIsAdmin(decodedToken.role === "admin");
        } catch (error) {
          console.error("Invalid token", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    };

    checkAdminRole();
  }, []);

  return { isAdmin, loading };
};

const AdminRoutes = ({ children }) => {
  const location = useLocation();
  const { isAdmin, loading } = useAdminRole();

  // While loading, you might want to show a loader or nothing
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner
  }

  // Protect admin routes
  return isAdmin ? children : <Navigate to="/" state={{ from: location }} />;
};

export default AdminRoutes;
