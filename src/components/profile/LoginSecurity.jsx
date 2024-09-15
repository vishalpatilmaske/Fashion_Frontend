import securityPngImage from "../../../public/assets/images/profile/security_png_image.png";

const LoginSecurity = () => {
  return (
    <div
      className="card mb-3 me-5"
      style={{ maxWidth: "540px", cursor: "pointer" }}
    >
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={securityPngImage}
            className="img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div className="col-md-8">
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
