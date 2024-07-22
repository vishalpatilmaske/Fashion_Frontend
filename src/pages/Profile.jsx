import React from "react";
import "../style/page/profile.css";
import image from "../assets/images/poster/poster1.jpg";
import { MdOutlineEdit } from "react-icons/md";

function Profile() {
  return (
    <>
      <div className="row container m-auto mt-4">
        <div className="col-md-4 d-flex justify-content-center flex-column text-center">
          <img
            src={image}
            alt=""
            className="rounded-circle profile-image m-auto"
          />
          <div>
            {" "}
            <strong>Vishal Vijay Maske</strong>
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
