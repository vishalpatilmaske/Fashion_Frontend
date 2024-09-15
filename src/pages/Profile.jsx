import React, { useEffect } from "react";
import "../style/page/profile.css";
import { MdOutlineEdit } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { loadLocalStorage } from "../store/slice/authSlice.js";
import ProfileComponent from "../components/profile/ProfileComponent.jsx";
import ProfileDetails from "../components/profile/ProfileDetails.jsx";
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
      <div className="d-flex justify-content-center">
        {" "}
        <div>
          <div className="container d-flex justify-content-start">
            <h4 className="my-3">Your Account</h4>
          </div>
          <div className="container d-flex justify-content-between">
            <div className="col-md-4">
              <ProfileComponent />
            </div>
            <div className="col-md-8">
              <ProfileDetails />
              <LoginSecurity />
              <OrderDetails />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
