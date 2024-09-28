import React, { useEffect } from "react";
import "../style/page/profile.css";
import { useSelector, useDispatch } from "react-redux";
import { loadLocalStorage } from "../store/slice/authSlice.js";
import ProfileComponent from "../components/profile/ProfileComponent.jsx";
import addressPngImage from "../../public/assets/images/profile/address_png_image.png";
import securityPngImage from "../../public/assets/images/profile/security_png_image.png";
import orderPngImage from "../../public/assets/images/profile/order_png_image.png";
import adminPngImage from "../../public/assets/images/profile/admin_png_image.png";

import "../style/components/profile/orderdetails.css";
import { useNavigate } from "react-router-dom";
function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loadLocalStorage());
  }, [dispatch]);

  const userCredential = useSelector(
    (state) => state.auth.signin.userCredential
  );

  return (
    <>
      <div className="mb-5 ">
        <h2 className="ps-4 pt-3 your-account">Your Account</h2>
        <div className="container-lg row mx-auto profile-page-main-container">
          <div className="col-sm-3 col-md-4">
            <ProfileComponent />
          </div>
          <div className="con-sm-9 col-md-8 d-flex justify-content-between flex-wrap profile-componets">
            {/* address tab */}
            <div className="col-sm-6 col-md-6 mt-3 mt-sm-0">
              {/* <AddressDetails /> */}
              <div
                className="card address-details"
                onClick={() => {
                  navigate("/profile-address");
                }}
              >
                <div className="d-flex py-2 px-1">
                  <div className="col-sm-3 d-flex align-items-center justify-content-center">
                    <img
                      src={addressPngImage}
                      className="img-fluid rounded-start address-logo"
                      alt="..."
                    />
                  </div>
                  <div className="col-sm-9">
                    <div className="card-body">
                      <h5 className="card-title">Your Address</h5>
                      <p className="card-text">
                        Edit your address. save new address
                      </p>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          Last updated 3 mins ago
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* security tab */}
            <div className="col-sm-6 col-md-6 mt-3 mb-3 mt-sm-0">
              {/* <LoginSecurity />{" "} */}
              <div
                className="card ms-sm-3 login-details"
                onClick={() => {
                  navigate("/profile-login-security");
                }}
              >
                <div className="d-flex py-2 px-1">
                  <div className="col-sm-3 d-flex align-items-center justify-content-center p-sm-2">
                    <img
                      src={securityPngImage}
                      className="img-fluid rounded-start login-logo"
                      alt="..."
                    />
                  </div>
                  <div className="col-sm-9">
                    <div className="card-body">
                      <h5 className="card-title">Login and Security</h5>
                      <p className="card-text">
                        Edit login, name, and mobile number
                      </p>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          Last updated 3 mins ago
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* order details tab */}
            <div className="col-sm-6 col-md-6 mt-3-sm">
              {" "}
              <div
                className="card order-details"
                onClick={() => {
                  navigate("/profile-orders");
                }}
              >
                <div className="d-flex py-2 px-1">
                  <div className="col-sm-3 d-flex align-items-center justify-content-center">
                    <img
                      src={orderPngImage}
                      className="img-fluid rounded-start order-logo"
                      alt="..."
                    />
                  </div>
                  <div className="col-sm-9">
                    <div className="card-body">
                      <h5 className="card-title">Your Orders</h5>
                      <p className="card-text">
                        Track your order details & cancel
                      </p>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          Last updated 3 mins ago
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* admin panel details tab */}
            <div className="col-sm-6 col-md-6 mt-3  mt-sm-0">
              {" "}
              <div
                className="card ms-sm-3  order-details"
                onClick={() => {
                  navigate("/admin-dashboard");
                }}
              >
                <div className="d-flex py-2 px-1">
                  <div className="col-sm-3 d-flex align-items-center justify-content-center">
                    <img
                      src={adminPngImage}
                      className="img-fluid rounded-start order-logo"
                      alt="..."
                    />
                  </div>
                  <div className="col-sm-9">
                    <div className="card-body">
                      <h5 className="card-title">Admin Panel</h5>
                      <p className="card-text">
                        Track your order details & cancel
                      </p>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          Last updated 3 mins ago
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
