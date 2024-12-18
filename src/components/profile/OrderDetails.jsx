import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, getUserOrders } from "../../store/slice/checkoutSlice";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import "../../style/global.css";

const OrderDetails = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");

  let userId;
  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken?.id;
  }

  // call the cancel order
  const cancelOrd = (order) => {
    const orderId = order?._id;
    dispatch(cancelOrder({ userId, orderId })).then((data) => {
      if (data.payload.success) {
        setLoading(false);
      }
    });
  };

  // call the API to get user orders
  useEffect(() => {
    if (userId) {
      dispatch(getUserOrders(userId)).then((data) => {
        if (data.meta.rejectedWithValue) {
          setLoading(false);
        } else if (data.payload.success) {
          setLoading(false);
        }
      });
    }
  }, [dispatch, cancelOrd]);

  const orders = useSelector((state) => state?.checkout?.orders);
  const ordersList = orders.filter((order) => order?.orders);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container-md container-fluid col-md-8 d-flex row mx-auto mb-5">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <div className="w-100">
        <h2 className="text-start mt-4">Your Orders</h2>
      </div>
      <div className="card-none text-center">
        <div className="orders-navbar">
          <ul className="nav">
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === "orders" ? "active" : ""}`}
                onClick={() => handleTabClick("orders")}
                href="#"
              >
                Orders
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "cancelled" ? "active" : ""
                }`}
                onClick={() => handleTabClick("cancelled")}
                href="#"
              >
                Cancelled Orders
              </a>
            </li>
          </ul>
        </div>
        <hr style={{ margin: 0, padding: 0 }} />

        <div className="card-body">
          {activeTab === "orders" ? (
            ordersList?.length > 0 ? (
              ordersList?.map((data) =>
                data?.orders?.map((order, index) => {
                  // console.log(order);
                  const formattedDate = moment(order?.orderDate).format(
                    "DD MMM YYYY"
                  );
                  return (
                    <div className="card text-center mt-4" key={index}>
                      <div className="card-header d-flex justify-content-between py-1">
                        <div className="card-left d-flex col-6 order-card-nav">
                          <div className="pt-2">
                            <p>Order Placed</p>
                            <p className="date">{formattedDate}</p>
                          </div>
                          <div className="ms-5 pt-2">
                            <p className="ps-sm-3">Total</p>
                            <p className="price">₹ {order?.totalPrice}</p>
                          </div>
                        </div>
                        <div className="card-right">
                          <div>
                            <p className="order-id">
                              Order # {order?.payment?.transactionId}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div>
                          <div className="cart-item-details">
                            <table>
                              <tbody>
                                <tr>
                                  <th rowSpan={2}>
                                    <div className="image-card">
                                      <img
                                        src={order?.product?.productId?.image}
                                        alt="product-image"
                                        className="order-product-image"
                                      />
                                    </div>
                                  </th>
                                  <td
                                    rowSpan={2}
                                    className="order-product-description text-start ms-4"
                                    style={{ width: "100%" }}
                                  >
                                    <div>
                                      <p>
                                        {order?.product?.productId?.description}
                                      </p>
                                      <p>
                                        <b>Quantity :</b>
                                        {order?.product?.quantity}
                                      </p>
                                      <p>
                                        <b>Price :</b> ₹{order?.totalPrice}
                                      </p>
                                      <div className="d-flex align-items-center justify-content-between">
                                        <p>
                                          <b> Payment :</b>{" "}
                                          {order?.isPaid
                                            ? "Success"
                                            : "Pending"}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer text-body-secondary d-flex justify-content-between">
                        <div>{moment(order?.orderDate).fromNow()}</div>
                        <div>
                          <button
                            className="btn btn-sm bg-warning rounded-pill cancel-button"
                            onClick={() => {
                              cancelOrd(order);
                            }}
                          >
                            Cancel Order
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )
            ) : (
              <h3 className="text-center mt-5">No orders found</h3>
            )
          ) : (
            <div>
              <h3 className="text-center my-5">No order cancelled</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
