import React from "react";
import { useState } from "react";
import "../../style/components/checkout/checkoutaddress.css";

const CheckoutAddress = () => {
  const [textColor, setTextColor] = useState("black");
  const HandleClick = () => {
    setTextColor(textColor === "black" ? "brown" : "black");
  };
  return (
    <>
      {" "}
      {/* address */}
      <div className="d-flex justify-content-between">
        <strong
          data-bs-toggle="collapse"
          id="address"
          href="#collapseAddress"
          role="button"
          aria-expanded="false"
          aria-controls="collapseAddress"
          style={{ color: textColor }}
          onClick={HandleClick}
        >
          1 Delivery Address
        </strong>

        <span
          data-bs-toggle="collapse"
          id="close-button"
          data-bs-target="#collapseAddress"
          aria-expanded="false"
          aria-controls="collapseAddress"
          style={{ color: textColor }}
          onClick={HandleClick}
        >
          close
        </span>
      </div>
      <div className="collapse mt-2" id="collapseAddress">
        <div className="card card-body">
          <div>
            <h6>Your address</h6>
            <hr />
            <p
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              className="addnewaddress"
            >
              + Add a new address
            </p>

            <div
              className="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">
                      Add New Address
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    {/* Add your form inputs here */}
                    <form className="w-80">
                      <div className="mb-3">
                        <label htmlFor="addressInput" className="form-label">
                          Full name (First and Last name)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="addressInput"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="cityInput" className="form-label">
                          Mobile Number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cityInput"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="cityInput" className="form-label">
                          Pin Code
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cityInput"
                          placeholder="6 digit [0-9] PIN code"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="cityInput" className="form-label">
                          Flat,House no.,Bulding,Company
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cityInput"
                          placeholder="Enter your city"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="cityInput" className="form-label">
                          Area,Steet,Sector,Village
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cityInput"
                          placeholder="Enter your city"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="cityInput" className="form-label">
                          Landmark
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cityInput"
                          placeholder="E.g near temple"
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer d-flex justify-content-start">
                    <button
                      type="button "
                      className="btn btn-warning btn-sm px-3  rounded-pill"
                    >
                      use this address
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <hr />
            <button
              type="button "
              className="btn btn-warning btn-sm px-3 rounded-pill"
            >
              use this address
            </button>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default CheckoutAddress;
