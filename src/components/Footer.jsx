import React from "react";
import "../style/componentStyle/footer.css";
import instagram from "../assets/images/footerImges/instagram.png";
import x from "../assets/images/footerImges/x.png";
import whatsapp from "../assets/images/footerImges/whatsapp.png";
import linkedin from "../assets/images/footerImges/linkedin.png";
import { FaRegCopyright } from "react-icons/fa";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="container p-5">
          <div className="col-sm-6 first-child">
            <div className="col-sm-4">
              <h6>Program</h6>
              <p>Corporate</p>
              <p>One to One</p>
              <p>Consulting</p>
            </div>
            <div className="col-sm-4">
              <h6>Service</h6>
              <p>Traning</p>
              <p>Coaching</p>
              <p>Consulting</p>
            </div>
            <div className="col-sm-4">
              <h6>Contact</h6>
              <p>Home</p>
              <p>About</p>
              <p>Contact</p>
            </div>
          </div>
          <div className="col-sm-6 second-child">
            <div className="col-sm-12">
              <h6>Get in touch</h6>
              <div className="row">
                <div class="input-group input-group-sm mb-3">
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
            <div className="row">
              <div className="col-sm-1">
                <a
                  href="https://www.instagram.com/vishal_patil_maske/"
                  target="_blank"
                >
                  <img src={instagram} alt="instagram" />
                </a>
              </div>
              <div className="col-sm-1">
                <a href="https://x.com/vishalS146150" target="_blank">
                  <img src={x} alt="x" />
                </a>
              </div>
              <div className="col-sm-1">
                <a href="https://wa.me/9322396236 " target="_blank">
                  {" "}
                  <img src={whatsapp} alt="whatsapp" />
                </a>
              </div>
              <div className="col-sm-1">
                <a
                  href="https://www.linkedin.com/in/vishal-maske146150/"
                  target="_blank"
                >
                  <img src={linkedin} alt="linkedin" />
                </a>
              </div>
            </div>
            <div className="mt-3">
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
          </div>
        </div>
        <div className="copyright">
          <p>
            Copyright <FaRegCopyright size={15} /> 2024 vishal maske
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
