import addressPngImage from "../../../public/assets/images/profile/address_png_image.png";
import "../../style/components/profile/addressdetails.css";

const AddressDetails = () => {
  return (
    <>
      {" "}
      <div className="card address-details">
        <div className="d-flex py-2 px-1">
          <div className="col-sm-3 d-flex align-items-center justify-content-center">
            <img
              src={addressPngImage}
              className="img-fluid rounded-start address-logo"
              alt="..."
            />
          </div>
          <div className="col-sm-9">
            <div className="card-body">
              <h5 className="card-title">Your Address</h5>
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

export default AddressDetails;
