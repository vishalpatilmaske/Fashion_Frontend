import securityPngImage from "../../../public/assets/images/profile/security_png_image.png";
import "../../style/components/profile/loginsecurity.css";

const LoginSecurity = () => {
  return (
    <div className="card ms-sm-3 login-details">
      <div className="d-flex py-2 px-1">
        <div className="col-sm-3 d-flex align-items-center justify-content-center p-sm-2">
          <img
            src={securityPngImage}
            className="img-fluid rounded-start login-logo"
            alt="..."
          />
        </div>
        <div className="col-sm-9">
          <div className="card-body">
            <h5 className="card-title">Login and Security</h5>
            <p className="card-text">Edit login, name, and mobile number</p>
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

export default LoginSecurity;
