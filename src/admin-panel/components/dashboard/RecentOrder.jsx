import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrders, cancelOrder } from "../../../store/slice/checkoutSlice";
import { getAllUsers } from "../../../store/slice/authSlice";
import moment from "moment";
import "../../style/component/recentorder.css";
import "../../../style/global.css";
import { jwtDecode } from "jwt-decode";
import topsellingproduct from "../../assets/image/topsellingproduct.jpg";
import topsellingmenproduct from "../../assets/image/topsellingmenproduct.jpg";

const RecenteOrder = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");

  let userId;
  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken?.id;
  }

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllOrders()).then((data) => {
      setLoading(false);
    });
  }, [dispatch]);

  const allOrders = useSelector((state) => state.checkout?.allOrders);

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
    }))
  );

  return (
    <div className="row d-flex justify-content-between">
      <div className="card mb-3 recent-orders-card">
        <div className="card-body">
          <h5 className="card-title mb-3 text-muted">Recent Orders</h5>
          {loading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
            </div>
          )}
          <table className="table table-hover table-striped table-sm small-text-table table-borderless ">
            <thead className="thead-light">
              <tr>
                <td>No</td>
                <td>Email</td>
                <td>Category</td>
                <td>Qty</td>
                <td>Price</td>
                <td>Payment</td>
                <td>Date</td>
                <td>Status</td>
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card no-activity-card">
        <div className="card-body">
          <h5 className="card-title text-muted">Total Selling Products</h5>
          <div className="row d-flex align-items-center">
            <div className="col-4 d-flex justify-content-start mt-3 ">
              <img
                src={topsellingproduct}
                alt=""
                style={{
                  width: "50%",
                  maxHeight: "50%",
                }}
              />
            </div>
            <div className="col-6">
              <h5>Miss Chase</h5>
              <p>₹454</p>
            </div>
          </div>
          <div className="row d-flex align-items-center">
            <div className="col-4 d-flex justify-content-start mt-3 ">
              <img
                src={topsellingmenproduct}
                alt=""
                style={{
                  width: "50%",
                  maxHeight: "50%",
                }}
              />
            </div>
            <div className="col-6">
              <h5>Dennis Lingo</h5>
              <p>₹734</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecenteOrder;
