import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import "../style/pages/coustomerorder.css";
import moment from "moment";

const CoustomerOrders = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { user, allOrders } = location.state || {};
  const userData = allOrders?.filter((order) => order.user._id === user._id);
  const userOrders = userData?.[0]?.orders || [];

  // Function to display the shipping address for an order
  const shippingAddress = (order) => {
    const userAddress = user?.address?.find(
      (address) => address?._id === order?.shippingAddress.toString()
    );

    // Check if the address was found
    if (userAddress) {
      return `${userAddress.fullname}, ${userAddress.housenumber}, ${userAddress.area}, ${userAddress.landmark}, ${userAddress.dist}, ${userAddress.pincode}`;
    } else {
      return "Address not found";
    }
  };

  return (
    <div className="ms-3">
      <div className="d-flex justify-content-between p-2 shadow mb-3">
        <h4>Orders</h4>
      </div>

      <div className="d-flex">
        <div className="col-12 mx-auto">
          <div className="shadow">
            <div className="card mb-3">
              <div className="card-body coustomer-order">
                <div className="p-2">
                  <div>
                    <table className="table table-hover">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col" className="col-1">
                            No
                          </th>
                          <th scope="col" className="col-1">
                            Category
                          </th>
                          <th scope="col" className="col-1">
                            Name
                          </th>
                          <th scope="col" className="col-1">
                            Quantity
                          </th>
                          <th scope="col" className="col-1">
                            Price
                          </th>
                          <th scope="col" className="col-1">
                            Payment
                          </th>
                          <th scope="col" className="col-1">
                            Order Date
                          </th>
                          <th scope="col" className="col-1">
                            Status
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
                        {userOrders.length > 0 ? (
                          userOrders.map((order, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{order.product.productId.category}</td>
                              <td>{order.product.productId.name}</td>
                              <td>{order.product.quantity}</td>
                              <td>{order.product.productId.price}</td>
                              <td>{order.payment.status}</td>
                              <td>
                                {moment(order.orderDate).format("DD MMM YYYY")}
                              </td>
                              <td>{order.orderStatus}</td>
                              <td>{shippingAddress(order)}</td>
                              <td>
                                <button className="btn btn-sm btn-warning">
                                  delete
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="10" className="text-center">
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
        </div>
      </div>
    </div>
  );
};

export default CoustomerOrders;
