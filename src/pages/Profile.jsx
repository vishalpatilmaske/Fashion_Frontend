import React, { useEffect } from "react";
import "../style/page/profile.css";
import { useSelector, useDispatch } from "react-redux";
import { loadLocalStorage } from "../store/slice/authSlice.js";
import ProfileComponent from "../components/profile/ProfileComponent.jsx";
import AddressDetails from "../components/profile/AddressDetails.jsx";
import LoginSecurity from "../components/profile/LoginSecurity.jsx";
import OrderDetails from "../components/profile/OrderDetails.jsx";

function Profile() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadLocalStorage());
  }, [dispatch]);

  const userCredential = useSelector(
    (state) => state.auth.signin.userCredential
  );

  return (
    <>
      <div className="mb-5 ">
        {/* <div>
          <h4 className="my-3 ps-2 ps-sm-5 your-account">Your Account</h4>
        </div> */}
        <h2 className="ps-4 pt-3 your-account">Your Account</h2>
        <div className="container-lg row mx-auto profile-page-main-container">
          <div className="col-sm-3 col-md-4">
            <ProfileComponent />
          </div>
          <div className="con-sm-9 col-md-8 d-flex justify-content-between flex-wrap ">
            <div className="col-sm-6 col-md-6 mt-3 mt-sm-0">
              <AddressDetails />
            </div>
            <div className="col-sm-6 col-md-6 mt-3 mb-3 mt-sm-0">
              <LoginSecurity />{" "}
            </div>
            <div className="col-sm-6 col-md-6 mt-3-sm">
              {" "}
              <OrderDetails />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
