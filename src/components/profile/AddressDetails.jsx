import "../../style/components/profile/addressdetails.css";
import { MdOutlineAdd } from "react-icons/md";

const AddressDetails = () => {
  const userAddress = JSON.parse(localStorage.getItem("userAddress"));

  return (
    <div className="container d-flex row mx-auto col-md-9 mb-5 address-main-container">
      <div className="w-100">
        <h2 className="text-start mt-4">Your Address</h2>
      </div>
      <div className="d-felx row">
        {" "}
        <div className="card add-new-address mt-3 me-2 ms-2 ">
          <div className="card-body p-5 mt-5">
            <div className="d-flex justify-content-center">
              <MdOutlineAdd className="fs-1 text-secondary" />{" "}
            </div>
            <div>
              <h5 className="text-center">Add address</h5>
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
