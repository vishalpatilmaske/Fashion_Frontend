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

  // State to toggle add new address visibility
  const [isNewAddressVisible, setIsNewAddressVisible] = useState(false);

  const handleClickChange = () => {
    setIsAddressVisible(!isAddressVisible);
    setIsNewAddressVisible(!isNewAddressVisible);
    setTextColor(textColor === "black" ? "brown" : "black");
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Dispatch the form data as the address
  const handleToAddAddress = () => {
    dispatch(addAddress({ userId, address: formData })).then(() => {
      dispatch(getUserData({ userId }));
    });
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
    setIsNewAddressVisible(false); // Hide new address form after adding
  };

  // Get user's address
  const address = useSelector((state) => state.auth.user.userData.address);

  let selectedAddress = null;
  for (const key in address) {
    if (address[key].primaryaddress === true) {
      selectedAddress = address[key];
      break;
    }
  }

  return (
    <>
      {/* Address Section */}
      <div className="d-flex justify-content-between">
        <strong id="address" style={{ color: textColor }}>
          1 Delivery Address
        </strong>
        {isAddressVisible && selectedAddress ? (
          <div className="delivery-address">
            <p>{selectedAddress.fullname}</p>
            <p>
              {selectedAddress.housenumber}, {selectedAddress.area}
            </p>
            <p>{selectedAddress.landmark}</p>
            <p>
              {selectedAddress.dist}, {selectedAddress.pincode}
            </p>
          </div>
        ) : (
          false
        )}

        <div>
          <span style={{ color: "#007185" }} onClick={handleClickChange}>
            {isAddressVisible ? "change" : "cancel"}
          </span>
        </div>
      </div>
      {/* component for add new delivery address */}
      {isNewAddressVisible && (
        <CheckoutAddNewAddress
          formData={formData}
          handleInputChange={handleInputChange}
          handleToAddAddress={handleToAddAddress}
          isNewAddressVisible={isNewAddressVisible}
          setIsNewAddressVisible={setIsNewAddressVisible}
          setIsAddressVisible={setIsAddressVisible}
          isAddressVisible={isAddressVisible}
          address={address}
        />
      )}
      <hr />
    </>
  );
};

export default CheckoutAddress;
