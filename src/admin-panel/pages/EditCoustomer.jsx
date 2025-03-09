import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateUser } from "../../store/slice/authSlice";

const EditCustomer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = location.state || {};

  const userId = user?._id;

  const [formData, setFormData] = useState({
    email: user.email || "",
    password: user.password || "",
    role: user.role || "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId) {
      dispatch(updateUser({ userId, formData }));
    }
  };

  return (
    <div
      className="card container mx-auto col-10 p-5"
      style={{ marginTop: "5rem" }}
    >
      <form onSubmit={handleSubmit} className="row g-3 col-10 mx-auto">
        {/* Email Input */}
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        {/* Password Input with Toggle Visibility */}
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="inputPassword4"
              name="password"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "View"}
            </button>
          </div>
        </div>

        {/* Role Selection */}
        <div className="col-md-6">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            className="form-select"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="col-12">
          <button type="submit" className="btn btn-warning">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCustomer;
