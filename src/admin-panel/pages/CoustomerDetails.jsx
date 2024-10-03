import profileImage from "../assets/image/user-image.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../store/slice/authSlice";
import { useLocation } from "react-router-dom";

const CustomerDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { user } = location.state || {};

  const userId = user?._id;

  useEffect(() => {
    if (userId) {
      dispatch(getUserData({ userId }));
    }
  }, []);

  const userData = useSelector((state) => state.auth.user.userData);

  return (
    <div>
      <div className="d-flex justify-content-between p-2 shadow mb-3">
        <h4>User Details</h4>
      </div>

      <div className="d-flex">
        {/* User Info Section */}
        <div className="col-10 mx-auto">
          <div className="shadow">
            <div className="card mb-3">
              <div className="card-body ">
                <div className="d-flex">
                  <div>
                    {" "}
                    <h5 className="card-title">User Profile</h5>
                    <p className="card-text">
                      <strong>Name:</strong>{" "}
                      {userData.address?.[0]?.fullname || "N/A"}
                    </p>
                    <p className="card-text">
                      <strong>Email:</strong> {userData?.email || "N/A"}
                    </p>
                    <p className="card-text">
                      <strong>Role:</strong> {userData?.role || "N/A"}
                    </p>
                  </div>

                  <div className="ms-auto">
                    <img
                      src={profileImage}
                      className="card-img-top"
                      style={{
                        borderRadius: "50%",
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        margin: "0 auto",
                      }}
                      alt="User profile"
                    />
                  </div>
                </div>
                <hr />
                <h6 className="card-title">Addresses:</h6>

                {userData?.address?.length > 0 ? (
                  userData.address.map((addr, index) => (
                    <div key={index} className="card mb-2">
                      <div className="card-body">
                        <h5 className="card-title">{addr.fullname}</h5>
                        <p className="card-text">
                          <strong>Mobile:</strong> {addr.mobile}
                        </p>
                        <p className="card-text">
                          <strong>Address:</strong> {addr.housenumber},{" "}
                          {addr.area}, {addr.landmark}, {addr.dist},{" "}
                          {addr.pincode}
                        </p>
                        {addr.primaryaddress && (
                          <p className="card-text">
                            <small className="text-warning">
                              Primary Address
                            </small>
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="card-text">No addresses available.</p>
                )}

                <p className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
