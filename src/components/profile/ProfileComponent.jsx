import React, { useEffect } from "react";
import image from "../../../public/assets/images/poster/poster1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../store/slice/authSlice";

const ProfileComponent = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.signin.userCredential._id);
  // get the user data form the backend
  console.log(userId);
  useEffect(() => {
    dispatch(getUserData({ userId }));
  }, [userId]);

  const userData = useSelector((state) => state.auth.user.userData);

  return (
    <div className="card mb-5 p-3 me-3" style={{ width: "18rem" }}>
      <img
        src={image}
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
      </div>
    </div>
  );
};

export default ProfileComponent;
