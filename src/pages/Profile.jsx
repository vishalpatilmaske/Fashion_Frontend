import React, { useEffect } from "react";
import "../style/page/profile.css";
import image from "/public/assets/images/poster/poster1.jpg";
import { MdOutlineEdit } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { loadLocalStorage } from "../store/slice/authSlice";

function Profile() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadLocalStorage());
  }, [dispatch]);

  const userData = useSelector((state) => state.user.signin.userData);

  return (
    <>
      <div className="row container m-auto mt-4 profile">
        <div className="col-md-4 d-flex justify-content-start flex-column text-center ">
          <img
            src={image}
            alt=""
            className="rounded-circle profile-image mx-auto"
          />
          <div>
            {" "}
            <strong>Vishal Vijay Maske</strong>
            <p>{}</p>
            <MdOutlineEdit />
          </div>
          <div class="modal-dialog modal-dialog-centered">...</div>
        </div>
        <div className="col-md-8">
          <h1>Your Profile</h1>
          <p>
            Your profile preferences help us personalise recommendations for
            you.
          </p>
        </div>
      </div>
    </>
  );
}

export default Profile;
