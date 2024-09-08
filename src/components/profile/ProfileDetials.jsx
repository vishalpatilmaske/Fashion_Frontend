import React from "react";
import orderPngImage from "../../../public/assets/images/profile/order_png_image.png";
import addressPngImage from "../../../public/assets/images/profile/address_png_image.png";

const ProfileDetials = () => {
  return (
    <>
      {" "}
      <div
        className="card mb-3 me-5"
        style={{ maxWidth: "540px", cursor: "pointer" }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={orderPngImage}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Youe Orders</h5>
              <p className="card-text">Track your order details</p>
              <p className="card-text">
                <small className="text-body-secondary">
                  Last updated 3 mins ago
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="card mb-3"
        style={{ maxWidth: "540px", cursor: "pointer" }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={addressPngImage}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Youe Address</h5>
              <p className="card-text">Edit your address. save new address</p>
              <p className="card-text">
                <small className="text-body-secondary">
                  Last updated 3 mins ago
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetials;
