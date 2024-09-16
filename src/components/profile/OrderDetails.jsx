import orderPngImage from "../../../public/assets/images/profile/order_png_image.png";
import "../../style/components/profile/orderdetails.css";
const OrderDetails = () => {
  return (
    <div className="card order-details">
      <div className="d-flex py-2 px-1">
        <div className="col-sm-3 d-flex align-items-center justify-content-center">
          <img
            src={orderPngImage}
            className="img-fluid rounded-start order-logo"
            alt="..."
          />
        </div>
        <div className="col-sm-9">
          <div className="card-body">
            <h5 className="card-title">Your Orders</h5>
            <p className="card-text">Track your order details & cancel</p>
            <p className="card-text">
              <small className="text-body-secondary">
                Last updated 3 mins ago
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
