import React, { useEffect } from "react";
import profileImage from "../../../public/assets/images/profile/profile_png_image.png";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, logout } from "../../store/slice/authSlice";
import { useNavigate } from "react-router-dom";
import "../../style/components/profile/profilecomponent.css";

const ProfileComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.signin.userCredential._id);
  // get the user data form the backend
  useEffect(() => {
    dispatch(getUserData({ userId }));
  }, [userId]);

  const userData = useSelector((state) => state.auth.user.userData);

  return (
    <div className="card mx-auto pb-5 profile-component">
      <img
        src={profileImage}
        className="card-img-top"
        style={{
          borderRadius: "50%",
          width: "150px",
          height: "150px",
          objectFit: "cover",
          margin: "0 auto",
        }}
        alt="profile image of user"
      />
      <div className="card-body">
        <p className="card-text text-center">
          {userData.address ? userData.address[0]?.fullname : "user name"}
        </p>
        <div className="d-flex">
          <button
            className="btn btn-sm btn-success mx-auto "
            onClick={() => {
              if (dispatch(logout())) {
                navigate("/signin");
              }
            }}
          >
            logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
