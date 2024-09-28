import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../store/slice/checkoutSlice";
import moment from "moment";

const OrderDetails = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.signin.userCredential);
  const orders = useSelector((state) => state.checkout.orders);

  // call the API to get user orders
  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrders(user._id));
    }
  }, [dispatch, user]);

  const ordersList = orders.filter((order) => order.orders);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container-md container-fluid col-md-8 d-flex row mx-auto mb-5">
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
            ordersList.length > 0 ? (
              ordersList.map((data) =>
                data.orders.map((order, index) => {
                  const formattedDate = moment(order.orderDate).format(
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
                            <p className="price">₹ {order.totalPrice}</p>
                          </div>
                        </div>
                        <div className="card-right">
                          <div>
                            <p className="order-id">
                              Order # {order.payment.transactionId}
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
                                        src={order.products[0].productId.image}
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
                                        {
                                          order.products[0].productId
                                            .description
                                        }
                                      </p>
                                      <p>
                                        <b>Quantity :</b>
                                        {order.products[0].quantity}
                                      </p>
                                      <p>
                                        <b>Price :</b> ₹{order.totalPrice}
                                      </p>
                                      <div className="d-flex align-items-center justify-content-between">
                                        <p>
                                          <b> Payment :</b>{" "}
                                          {order.isPaid ? "Success" : "Pending"}
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
                        <div>{moment(order.orderDate).fromNow()}</div>
                        <div>
                          <button className="btn btn-sm bg-warning rounded-pill cancel-button">
                            Cancel Order
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )
            ) : (
              <p>No orders found</p>
            )
          ) : (
            <div>
              <h2 className="card-title my-5">Empty</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
