import "../../style/components/profile/addressdetails.css";
import { MdOutlineAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addAddress, getUserData } from "../../store/slice/authSlice";

const AddressDetails = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullname: "",
    mobile: "",
    pincode: "",
    housenumber: "",
    area: "",
    landmark: "",
    dist: "",
    primaryaddress: true,
  });
  const [errors, setErrors] = useState({});

  // Get user credentials
  const userCredential = useSelector(
    (state) => state.auth.signin.userCredential
  );
  const userId = userCredential?._id;

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

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle add address with validation
  const handleToAddAddressWithValidation = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(addAddress({ userId, address: formData }));
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    if (userId) {
      dispatch(getUserData({ userId }));
    }
  }, [dispatch, userId]);
  const userData = useSelector((state) => state.auth.user.userData);
  const userAddress = userData?.address || [];
  return (
    <div className="container d-flex row mx-auto col-md-9 mb-5 address-main-container">
      <div className="w-100">
        <h2 className="text-start mt-4">Your Address</h2>
      </div>
      <div className="d-felx row">
        {" "}
        <div className="card add-new-address mt-3 me-2 ms-2 ">
          <div className="card-body p-5 mt-4">
            <div
              className="d-flex justify-content-center addnewaddress"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <MdOutlineAdd className="fs-1 text-secondary" />{" "}
            </div>
            <div>
              <h5 className="text-center">Add address</h5>
            </div>
            {/* add new address  */}
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
                          <div className="invalid-feedback">
                            {errors.fullname}
                          </div>
                        )}
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
                          <div className="invalid-feedback">
                            {errors.mobile}
                          </div>
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
                          <div className="invalid-feedback">
                            {errors.pincode}
                          </div>
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
                          <div className="invalid-feedback">
                            {errors.landmark}
                          </div>
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
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={handleToAddAddressWithValidation}
                    >
                      Use this address
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {userAddress.length > 0 ? (
          userAddress.map((address, index) => (
            <div key={index} className="card address mt-3 shadow ms-sm-2">
              <h5 className="card-header text-secondary">Address</h5>
              <div className="card-body">
                <h5 className="card-title">{address.fullname}</h5>
                <p className="card-text">
                  {address.housenumber}, {address.landmark}
                </p>
                <p className="card-text">
                  {address.area}, {address.dist},{address.pincode}
                </p>
                <p className="card-text">Phone number:{address.mobile}</p>
                <p>
                  <span className="pe-1">Edit</span> |{" "}
                  <span className="ps-1">Remove</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-4">No address found</p>
        )}
      </div>
    </div>
  );
};

export default AddressDetails;
