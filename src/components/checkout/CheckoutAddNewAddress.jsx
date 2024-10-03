import React, { useState } from "react";
import { updateUserAddress, getUserData } from "../../store/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";

const CheckoutAddNewAddress = ({
  formData,
  handleInputChange,
  handleToAddAddress,
  setIsNewAddressVisible,
  isNewAddressVisible,
  setIsAddressVisible,
  isAddressVisible,
  address,
}) => {
  const dispatch = useDispatch();

  const [addressId, setAddressId] = useState();
  const [errors, setErrors] = useState({});

  const userCredential = useSelector(
    (state) => state.auth.signin.userCredential
  );
  const userId = userCredential?._id;

  const handleUseAddress = () => {
    setIsNewAddressVisible(!isNewAddressVisible);
    setIsAddressVisible(!isAddressVisible);

    if (addressId) {
      dispatch(updateUserAddress({ userId, addressId })).then(() => {
        dispatch(getUserData({ userId }));
      });
    }
  };

  // Validation logic
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullname || formData.fullname.trim() === "") {
      newErrors.fullname = "Full name is required.";
    }

    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Valid 10-digit mobile number is required.";
    }

    if (!formData.pincode || !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Valid 6-digit PIN code is required.";
    }

    if (!formData.housenumber || formData.housenumber.trim() === "") {
      newErrors.housenumber = "House number is required.";
    }

    if (!formData.area || formData.area.trim() === "") {
      newErrors.area = "Area is required.";
    }

    if (!formData.landmark || formData.landmark.trim() === "") {
      newErrors.landmark = "Landmark is required.";
    }

    if (!formData.dist || formData.dist.trim() === "") {
      newErrors.dist = "District is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleToAddAddressWithValidation = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleToAddAddress(); // Only call this if the form is valid
    }
  };

  // Get the primary address
  let selectedAddress = null;
  for (const key in address) {
    if (address[key].primaryaddress === true) {
      selectedAddress = address[key];
      break;
    }
  }

  return (
    <div className="mt-2">
      <div className="card card-body">
        <h5>Your address</h5>
        <hr />
        {address && address.length > 0 ? (
          address.map((data, index) => (
            <div className="alert alert-info" role="alert" key={index}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="address"
                  id={`address${index}`}
                  onClick={() => setAddressId(data._id)}
                  onChange={() => setAddressId(data._id)}
                  checked={addressId === data._id || selectedAddress}
                />
                <label className="form-check-label" htmlFor={`address${index}`}>
                  {data.fullname} {data.housenumber}, {data.area},{" "}
                  {data.landmark}, {data.dist}, {data.pincode}, India
                </label>
              </div>
            </div>
          ))
        ) : (
          <p>No saved addresses. Please add a new address.</p>
        )}

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
                <form
                  className="w-80"
                  onSubmit={handleToAddAddressWithValidation}
                >
                  <div className="mb-3">
                    <label htmlFor="fullNameInput" className="form-label">
                      Full Name (First and Last name)
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.fullname ? "is-invalid" : ""
                      }`}
                      id="fullNameInput"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                    {errors.fullname && (
                      <div className="invalid-feedback">{errors.fullname}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mobileNumberInput" className="form-label">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.mobile ? "is-invalid" : ""
                      }`}
                      id="mobileNumberInput"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="Enter your mobile number"
                    />
                    {errors.mobile && (
                      <div className="invalid-feedback">{errors.mobile}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="pinCodeInput" className="form-label">
                      Pin Code
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.pincode ? "is-invalid" : ""
                      }`}
                      id="pinCodeInput"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="6-digit PIN code"
                    />
                    {errors.pincode && (
                      <div className="invalid-feedback">{errors.pincode}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="addressInput" className="form-label">
                      Flat, House No., Building, Company
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.housenumber ? "is-invalid" : ""
                      }`}
                      id="addressInput"
                      name="housenumber"
                      value={formData.housenumber}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                    />
                    {errors.housenumber && (
                      <div className="invalid-feedback">
                        {errors.housenumber}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="areaInput" className="form-label">
                      Area, Street, Sector, Village
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.area ? "is-invalid" : ""
                      }`}
                      id="areaInput"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      placeholder="Enter your area"
                    />
                    {errors.area && (
                      <div className="invalid-feedback">{errors.area}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="landmarkInput" className="form-label">
                      Landmark
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.landmark ? "is-invalid" : ""
                      }`}
                      id="landmarkInput"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      placeholder="E.g., near temple"
                    />
                    {errors.landmark && (
                      <div className="invalid-feedback">{errors.landmark}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="distInput" className="form-label">
                      District
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.dist ? "is-invalid" : ""
                      }`}
                      id="distInput"
                      name="dist"
                      value={formData.dist}
                      onChange={handleInputChange}
                      placeholder="Enter your district"
                    />
                    {errors.dist && (
                      <div className="invalid-feedback">{errors.dist}</div>
                    )}
                  </div>
                </form>
              </div>
              <div className="modal-footer d-flex justify-content-start">
                <button
                  type="submit"
                  className="btn btn-warning btn-sm px-3 rounded-pill"
                  onClick={handleToAddAddressWithValidation}
                >
                  Use this address
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <p
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            className="addnewaddress"
          >
            + Add a new address
          </p>
          <button
            className="btn btn-warning btn-sm px-3 rounded-pill mt-3"
            onClick={handleUseAddress}
          >
            Use this address
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutAddNewAddress;
