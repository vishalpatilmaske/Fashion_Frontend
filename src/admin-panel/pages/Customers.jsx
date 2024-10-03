import { deleteUser, getAllUsers } from "../../store/slice/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import eyeDropImage from "../assets/image/eye-drop.png";
import editTextImage from "../assets/image/edit-text.png";
import deleteDocumentImage from "../assets/image/delete-document.png";
import { getAllOrders } from "../../store/slice/checkoutSlice";
import "../style/pages/customers.css";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch all users and orders when the component mounts
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllOrders());
  }, [dispatch]);

  // Get users, loading status, and orders from the state
  const users = useSelector((state) => state.auth.user.allUsers);
  const loading = useSelector((state) => state.auth.user.loading);
  const allOrders = useSelector((state) => state.checkout?.allOrders);
  // Filter orders for a particular user

  const userOrder = (user) => {
    const userOrders = allOrders?.filter(
      (order) => order?.user?._id === user?._id
    );
    return userOrders ? userOrders[0]?.orders.length : 0;
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="p-2">
      <div className="d-flex justify-content-between p-2 shadow mb-3">
        <div>
          <h4>User Management</h4>
        </div>
        <div>
          <button className="btn btn-sm btn-warning">Add New User</button>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="col-1">
                  No
                </th>
                <th scope="col" className="col-3">
                  Email
                </th>
                <th scope="col" className="col-2 ">
                  Role
                </th>
                <th scope="col" className="col-2 ">
                  Orders
                </th>
                <th scope="col" className="col-2 ">
                  Edit
                </th>
                <th scope="col" className="col-2 ">
                  View
                </th>
                <th scope="col" className="col-2 ">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index}>
                    <th scope="row" className="text-truncate">
                      {index + 1}
                    </th>
                    <td className="text-truncate">{user.email}</td>
                    <td className="text-truncate">{user.role}</td>
                    <td
                      className="text-truncate"
                      onClick={() =>
                        navigate("/admin-panel/user-orders", {
                          state: { allOrders, user },
                        })
                      }
                    >
                      {userOrder(user)}
                    </td>
                    {/* Display number of orders */}
                    <td className="text-truncate">
                      <img
                        src={editTextImage}
                        alt="edit"
                        className="png-image"
                        onClick={() =>
                          navigate("/admin-panel/edit-user", {
                            state: { user },
                          })
                        }
                      />
                    </td>
                    <td className="text-truncate">
                      <img
                        src={eyeDropImage}
                        alt="view"
                        className="png-image"
                        onClick={() =>
                          navigate("/admin-panel/user-details", {
                            state: { user },
                          })
                        }
                      />
                    </td>
                    <td className="text-truncate">
                      <img
                        src={deleteDocumentImage}
                        alt="delete"
                        className="png-image"
                        onClick={() => {
                          const userId = user?._id;
                          dispatch(deleteUser(userId)).then(() => {
                            dispatch(getAllUsers());
                          });
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
