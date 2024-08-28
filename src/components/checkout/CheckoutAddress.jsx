import React, { useEffect, useState } from "react";
import "../../style/components/checkout/checkoutaddress.css";
import {
  addAddress,
  getUserData,
  loadLocalStorage,
} from "../../store/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import CheckoutAddNewAddress from "./CheckoutAddNewAddress";

const CheckoutAddress = () => {
  const dispatch = useDispatch();

  // Load the login user data
  useEffect(() => {
    dispatch(loadLocalStorage());
  }, [dispatch]);

  const userCredential = useSelector(
    (state) => state.auth.signin.userCredential
  );
  const userId = userCredential?._id;

  // Dispatch the request to get the user data
  useEffect(() => {
    if (userId) {
      dispatch(getUserData({ userId }));
    }
  }, [dispatch, userId]);

  // Form state
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

  // Handle the color of the text onclick
  const [textColor, setTextColor] = useState("black");

  // State to toggle address visibility
  const [isAddressVisible, setIsAddressVisible] = useState(true);

  const handleClickChange = () => {
    setIsAddressVisible(!isAddressVisible);
    setTextColor(textColor === "black" ? "brown" : "black");
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Dispatch the form data as the address
  const handleToAddAddress = () => {
    dispatch(
      addAddress({
        userId: userId,
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
    setIsAddressVisible(true); // Show address after adding
  };

  // Get user's address
  const address = useSelector((state) => state.auth.user.userData.address);

  // get the selected address from the auth alice
  const seletedAddress = useSelector(
    (state) => state.auth.user.selectedAddress
  );

  return (
    <>
      {/* Address Section */}
      <div className="d-flex justify-content-between">
        <strong id="address" style={{ color: textColor }}>
          1 Delivery Address
        </strong>
        {isAddressVisible && seletedAddress ? (
          <div className="delivery-address">
            <p>{seletedAddress.fullname}</p>
            <p>
              {seletedAddress.housenumber} , {seletedAddress.area}
            </p>
            <p>{seletedAddress.landmark}</p>
            <p>
              {seletedAddress.dist}, {seletedAddress.pincode}
            </p>
          </div>
        ) : (
          false
        )}

        <div>
          <span
            data-bs-toggle="collapse"
            id="close-button"
            data-bs-target="#collapseAddress"
            aria-expanded="false"
            aria-controls="collapseAddress"
            style={{ color: "#007185" }}
            onClick={handleClickChange}
          >
            {isAddressVisible ? "change" : "cancel"}
          </span>
        </div>
      </div>
      {/* component for add new delivery address of change delivery address */}
      <CheckoutAddNewAddress
        formData={formData}
        handleInputChange={handleInputChange}
        handleToAddAddress={handleToAddAddress}
        address={address}
        setIsAddressVisible={setIsAddressVisible}
        handleClickChange={handleClickChange}
      />
      <hr />
    </>
  );
};

export default CheckoutAddress;
