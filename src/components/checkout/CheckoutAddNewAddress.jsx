import React, { useState } from "react";
import { setSelectedAddress } from "../../store/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";

const CheckoutAddNewAddress = ({
  formData,
  handleInputChange,
  handleToAddAddress,
  address,
}) => {
  // Selected address state
  const [selectedAddressLocal, setSelectedAddressLocal] = useState(null);

  const dispatch = useDispatch();

  // Handle selecting an address
  const handleSelectAddress = (address) => {
    setSelectedAddressLocal(address);
  };

  // Handle using the selected address
  const handleUseAddress = () => {
    console.log("called");
    dispatch(setSelectedAddress(selectedAddressLocal));
  };

  // Access selected address from Redux
  const selectedAddress = useSelector(
    (state) => state.auth.user.selectedAddress
  );

  console.log("Selected Address from Redux:", selectedAddress);

  return (
    <div className="collapse mt-2" id="collapseAddress">
      <div className="card card-body">
        <div>
          <h6>Your address</h6>
          <hr />
          {/* List of addresses */}
          {address && address.length > 0 ? (
            address.map((data, index) => (
              <div className="alert alert-info" role="alert" key={index}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="address"
                    id={`address${index}`}
                    onClick={() => handleSelectAddress(data)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`address${index}`}
                  >
                    {data.fullname} {data.housenumber}, {data.area},
                    {data.landmark}, {data.dist}, {data.pincode}, India
                  </label>
                </div>
              </div>
            ))
          ) : (
            <p>No saved addresses. Please add a new address.</p>
          )}

          {/* Add New Address Modal */}
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
                      <label htmlFor="mobileNumberInput" className="form-label">
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
          <p
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            className="addnewaddress"
          >
            + Add a new address
          </p>
        </div>
        <div>
          <hr />
          <button
            type="button"
            className="btn btn-warning btn-sm px-3 rounded-pill"
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
