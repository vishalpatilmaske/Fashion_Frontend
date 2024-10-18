import React from "react";
import "../../style/components/home/footer.css";
import instagram from "/public/assets/images/footer/instagram.png";
import x from "/public/assets/images/footer/x.png";
import whatsapp from "/public/assets/images/footer/whatsapp.png";
import linkedin from "/public/assets/images/footer/linkedin.png";
import { FaRegCopyright } from "react-icons/fa";
import { useSelector } from "react-redux";

function Footer() {
  const loading = useSelector((state) => state.product.loading);

  return (
    // <div className={loading ? "blurred" : ""}>
    <div className="footer">
      <div className="row container p-sm-5">
        <div className="col-md-6 first-child">
          <div className=" col-sm-4">
            <strong>Program</strong>
            <p>Corporate</p>
            <p>One to One</p>
            <p>Consulting</p>
          </div>
          <div className=" col-sm-4">
            <strong>Service</strong>
            <p>Traning</p>
            <p>Coaching</p>
            <p>Consulting</p>
          </div>
          <div className=" col-sm-4">
            <strong>Contact</strong>
            <p>Home</p>
            <p>About</p>
            <p>Contact</p>
          </div>
        </div>

        <div className="col-sm-12  col-md-6 second-child">
          <div className="col-sm-12 mb-2 ">
            <strong className="d-none d-md-block">Get in touch</strong>
          </div>
          <div className="row pt-2 dont-show-mobile">
            <div className="col-2">
              <a
                href="https://www.instagram.com/vishal_patil_maske/"
                target="_blank"
              >
                <img src={instagram} alt="instagram" />
              </a>
            </div>
            <div className="col-2">
              <a href="https://x.com/vishalS146150" target="_blank">
                <img src={x} alt="x" />
              </a>
            </div>
            <div className="col-2">
              <a href="https://wa.me/9322396236 " target="_blank">
                {" "}
                <img src={whatsapp} alt="whatsapp" />
              </a>
            </div>
            <div className="col-2">
              <a
                href="https://www.linkedin.com/in/vishal-maske146150/"
                target="_blank"
              >
                <img src={linkedin} alt="linkedin" />
              </a>
            </div>
          </div>
          <div className="mt-3 dont-show-mobile">
            <p>
              Mobile:<a href="tel:9322396236"></a> +919322396236
            </p>
            <p>
              Email:
              <a href="mailto:vishalpatilmaske@gmail.com">
                {" "}
                vishalpatilmaske@gmail.com
              </a>
            </p>
          </div>
          <div className="row mt-2 dont-show-mobile">
            <div className="input-group input-group-sm mb-3">
              <input
                type="text"
                className="form-control rounded"
                placeholder="Email Address"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <button className="btn ms-2 rounded" type="button">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        {/* second  */}
      </div>
      <div className="copyright">
        <p>
          Copyright <FaRegCopyright size={15} /> 2024 vishal maske
        </p>
      </div>
    </div>
    // </div>
  );
}

export default Footer;
