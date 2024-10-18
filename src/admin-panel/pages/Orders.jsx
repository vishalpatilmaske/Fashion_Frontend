import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllOrders, cancelOrder } from "../../store/slice/checkoutSlice";
import { getAllUsers } from "../../store/slice/authSlice";
import moment from "moment";
import "../style/pages/order.css";
import deleteDocumentImage from "../assets/image/delete-document.png";
import { jwtDecode } from "jwt-decode";

const Orders = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("accessToken");

  let userId;
  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken?.id;
  }

  // call the cancel order
  const cancelOrd = (order) => {
    const orderId = order?.orderId;
    dispatch(cancelOrder({ userId, orderId }));
  };

  // Fetch all users and orders when the component mounts
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllOrders());
  }, [dispatch, cancelOrd]);

  // Get users, loading status, and orders from the state
  const allOrders = useSelector((state) => state.checkout?.allOrders);

  // Function to display the shipping address for an order
  const shippingAddress = (order, shippingAddress) => {
    const userAddress = order?.user?.address?.find(
      (address) => address?._id === shippingAddress
    );

    return userAddress ? userAddress : null;
  };

  // Create a flattened array of orders for all the orders in a site
  const orders = allOrders?.flatMap((order) =>
    order?.orders?.map((orderDetail) => ({
      userEmail: order?.user?.email,
      orderId: orderDetail?._id,
      category: orderDetail?.product?.productId?.category,
      quantity: orderDetail?.product?.quantity,
      total: orderDetail?.totalPrice,
      paymentStatus: orderDetail?.payment?.status,
      orderDate: orderDetail?.orderDate,
      orderStatus: orderDetail?.orderStatus,
      shippingAddress:
        shippingAddress(order, orderDetail?.shippingAddress) || [],
    }))
  );

  return (
    <div className="ms-4" style={{ marginTop: "5rem" }}>
      <div className="d-flex justify-content-between p-2 shadow mb-3">
        <h4>All Orders</h4>
      </div>
      <div className="d-flex">
        <div className="col-12 mx-auto">
          <div className="card all-orders">
            <div className="card-body">
              <table className="table table-hover">
                <thead className="thead-light">
                  <tr>
                    <th scope="col" className="col-1">
                      No
                    </th>
                    <th scope="col" className="col-1">
                      User Email
                    </th>

                    <th scope="col" className="col-1">
                      Category
                    </th>
                    <th scope="col" className="col-1">
                      Quantity
                    </th>
                    <th scope="col" className="col-1">
                      Total
                    </th>
                    <th scope="col" className="col-1">
                      Payment
                    </th>
                    <th scope="col" className="col-1">
                      Order Date
                    </th>
                    <th scope="col" className="col-1">
                      Order Status
                    </th>
                    <th scope="col" className="col-2">
                      Shipping Address
                    </th>
                    <th scope="col" className="col-1">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders && orders.length > 0 ? (
                    orders?.map((order, index) => (
                      <tr key={order.orderId}>
                        <td>{index + 1}</td>
                        <td>{order.userEmail}</td>
                        <td>{order.category}</td>
                        <td>{order.quantity}</td>
                        <td>{order.total}</td>
                        <td>{order.paymentStatus}</td>
                        <td>{moment(order.orderDate).format("DD MMM YYYY")}</td>
                        <td>{order.orderStatus}</td>
                        <td>
                          {order.shippingAddress?.fullname
                            ? `${order.shippingAddress.fullname}, ${
                                order.shippingAddress.housenumber || ""
                              }, ${order.shippingAddress.area || ""}, ${
                                order.shippingAddress.landmark || ""
                              }, ${order.shippingAddress.dist || ""}, ${
                                order.shippingAddress.pincode || ""
                              }`
                            : "Address not found"}
                        </td>
                        <td className="text-truncate">
                          <button
                            className="btn btn-sm btn-warning"
                            onClick={() => {
                              cancelOrd(order);
                            }}
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="11" className="text-center">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
