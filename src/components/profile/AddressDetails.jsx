import { useEffect, useState, useRef } from "react";
import { MdOutlineAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, getUserData } from "../../store/slice/authSlice";
import "../../style/components/profile/addressdetails.css";
import "../../style/global.css";

const AddressDetails = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
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
  const userId = useSelector((state) => state.auth.signin.userCredential?._id);
  const userData = useSelector((state) => state.auth.user.userData);
  const userAddress = userData?.address || [];

  const modalRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    const validationRules = {
      fullname: "Full name is required.",
      mobile: "Valid 10-digit mobile number is required.",
      pincode: "Valid 6-digit PIN code is required.",
      housenumber: "House number is required.",
      area: "Area is required.",
      landmark: "Landmark is required.",
      dist: "District is required.",
    };

    for (const field in validationRules) {
      const value = formData[field];
      if (
        !value ||
        (field === "mobile" && !/^\d{10}$/.test(value)) ||
        (field === "pincode" && !/^\d{6}$/.test(value))
      ) {
        newErrors[field] = validationRules[field];
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        const result = await dispatch(getUserData({ userId }));
        setLoading(!result.payload.success);
      };
      fetchData();
    }
  }, [dispatch, userId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToAddAddressWithValidation = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const result = await dispatch(addAddress({ userId, address: formData }));
      if (result.payload.success) {
        setLoading(false);
        dispatch(getUserData({ userId }));
        setFormData({
          fullname: "",
          mobile: "",
          pincode: "",
          housenumber: "",
          area: "",
          landmark: "",
          dist: "",
          primaryaddress: true,
        });
        setErrors({});

        if (modalRef.current) {
          const modalInstance = new window.bootstrap.Modal(modalRef.current);
          modalInstance.hide(); // Close modal after successful submission
        }
      }
    }
  };

  return (
    <div className="container d-flex row mx-auto col-md-9 mb-5 address-main-container">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <h2 className="text-start mt-4 w-100">Your Address</h2>

      <div className="d-flex row">
        <div className="card add-new-address mt-3 me-2 ms-sm-2">
          <div className="card-body p-5 mt-4">
            <div
              className="d-flex justify-content-center addnewaddress"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <MdOutlineAdd className="fs-1 text-secondary" />
            </div>
            <h5 className="text-center">Add Address</h5>
          </div>
        </div>

        {/* Modal for adding new address */}
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
          ref={modalRef}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Add New Address
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form
                  className="w-80"
                  onSubmit={handleToAddAddressWithValidation}
                >
                  {Object.keys(formData).map(
                    (field) =>
                      field !== "primaryaddress" && (
                        <div className="mb-3" key={field}>
                          <label
                            htmlFor={`${field}Input`}
                            className="form-label"
                          >
                            {field
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^\w/, (c) => c.toUpperCase())
                              .replace("fullname", "Full Name")
                              .replace("housenumber", "House Number")
                              .replace("mobile", "Mobile Number")
                              .replace("dist", "District")}
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              errors[field] ? "is-invalid" : ""
                            }`}
                            id={`${field}Input`}
                            name={field}
                            value={formData[field]}
                            onChange={handleInputChange}
                            placeholder={`Enter your ${field
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^\w/, (c) => c.toUpperCase())
                              .replace("fullname", "Full Name")
                              .replace("housenumber", "House Number")
                              .replace("mobile", "Mobile Number")
                              .replace("dist", "District")}`}
                          />
                          {errors[field] && (
                            <div className="invalid-feedback">
                              {errors[field]}
                            </div>
                          )}
                        </div>
                      )
                  )}
                </form>
              </div>
              <div className="modal-footer d-flex justify-content-start">
                <button
                  type="submit"
                  className="btn btn-warning btn-sm px-3 rounded-pill"
                  onClick={handleToAddAddressWithValidation}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Use This Address
                </button>
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
                  {address.area}, {address.dist}, {address.pincode}
                </p>
                <p className="card-text">Phone number: {address.mobile}</p>
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
