import React, { useEffect, useState } from "react";
import "../../style/components/checkout/checkoutaddress.css";
import { addAddress, loadLocalStorage } from "../../store/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckoutAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // load the login user data
  useEffect(() => {
    dispatch(loadLocalStorage());
  }, []);
  const userData = useSelector((state) => state.auth.signin.userData);
  // Form state
  const [formData, setFormData] = useState({
    fullname: "",
    mobile: "",
    pincode: "",
    housenumber: "",
    area: "",
    landmark: "",
    dist: "",
  });

  const [textColor, setTextColor] = useState("black");

  const handleClick = () => {
    setTextColor(textColor === "black" ? "brown" : "black");
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToAddAddress = () => {
    // Dispatch the form data as the address
    dispatch(
      addAddress({
        userId: userData._id,
        address: formData,
      })
    );
    setFormData({
      fullname: "",
      mobile: "",
      pincode: "",
      housenumber: "",
      area: "",
      landmark: "",
      dist: "",
    });
  };

  return (
    <>
      {/* address */}
      <div className="d-flex justify-content-between">
        <strong
          data-bs-toggle="collapse"
          id="address"
          href="#collapseAddress"
          role="button"
          aria-expanded="false"
          aria-controls="collapseAddress"
          style={{ color: textColor }}
          onClick={handleClick}
        >
          1 Delivery Address
        </strong>

        <span
          data-bs-toggle="collapse"
          id="close-button"
          data-bs-target="#collapseAddress"
          aria-expanded="false"
          aria-controls="collapseAddress"
          style={{ color: textColor }}
          onClick={handleClick}
        >
          Close
        </span>
      </div>

      <div className="collapse mt-2" id="collapseAddress">
        <div className="card card-body">
          <div>
            <h6>Your address</h6>
            <hr />
            <p
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              className="addnewaddress"
            >
              + Add a new address
            </p>

            <div
              className="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">
                      Add New Address
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    {/* Form inputs */}
                    <form className="w-80">
                      <div className="mb-3">
                        <label htmlFor="fullNameInput" className="form-label">
                          Full Name (First and Last name)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="fullNameInput"
                          name="fullname"
                          value={formData.fullname}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="mobileNumberInput"
                          className="form-label"
                        >
                          Mobile Number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="mobileNumberInput"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          placeholder="Enter your mobile number"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="pinCodeInput" className="form-label">
                          Pin Code
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="pinCodeInput"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          placeholder="6-digit PIN code"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="addressInput" className="form-label">
                          Flat, House No., Building, Company
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="addressInput"
                          name="housenumber"
                          value={formData.housenumber}
                          onChange={handleInputChange}
                          placeholder="Enter your address"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="areaInput" className="form-label">
                          Area, Street, Sector, Village
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="areaInput"
                          name="area"
                          value={formData.area}
                          onChange={handleInputChange}
                          placeholder="Enter your area"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="landmarkInput" className="form-label">
                          Landmark
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="landmarkInput"
                          name="landmark"
                          value={formData.landmark}
                          onChange={handleInputChange}
                          placeholder="E.g., near temple"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="distInput" className="form-label">
                          Dist
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="distInput"
                          name="dist"
                          value={formData.dist}
                          onChange={handleInputChange}
                          placeholder="Enter your dist"
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer d-flex justify-content-start">
                    <button
                      type="button"
                      className="btn btn-warning btn-sm px-3 rounded-pill"
                      onClick={handleToAddAddress}
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Use this address
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <hr />
            <button
              type="button"
              className="btn btn-warning btn-sm px-3 rounded-pill"
              onClick={handleToAddAddress}
            >
              Use this address
            </button>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default CheckoutAddress;
