import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "../Auth/Login";
export default function Footer() {

  const [showLogin, setShowLogin] = useState(false);
  const toggleshowLogin = () => setShowLogin(!showLogin);
  const token = Cookies.get("token")
  const navigate = useNavigate();

  return (
    <>
      {/* <!-- FOOTER START --> */}
      <footer
        className="footer-dark"
        style={{
          backgroundImage: "url(images/f-bg.jpg)",
        }}
      >
        <div className="container">
          {/* <!-- FOOTER BLOCKES START --> */}
          <div className="footer-top border-0 pt-0">
            <div className="row">
              <div className="col-lg-3 col-md-12">
                <div className="widget widget_about">
                  <div className="logo-footer clearfix">
                    <Link to={"/"}>
                      <img src="images/logo.png" alt="" />
                    </Link>
                  </div>
                  <p>
                    Many desktop publishing packages and web page editors now.
                  </p>
                </div>
              </div>

              <div className="col-lg-9 col-md-12">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="widget widget_services ftr-list-center">
                      <ul>
                        <li>
                          <p>
                            <span>Address :</span>65 Sunset CA 90026, USA
                          </p>
                        </li>
                        <li>
                          <p>
                            <span>Email :</span>example@max.com
                          </p>
                        </li>
                        <li>
                          <p>
                            <span>Call :</span>555-555-1234
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="widget widget_services ftr-list-center">
                      <ul>
                        <li>
                          <a onClick={() => { token ? navigate("/profile") : setShowLogin(!showLogin) }}>Profile</a>
                        </li>

                        <li>
                          <a>Contact</a>
                        </li>

                        <li>
                          <a onClick={() => { token ? navigate("/profile") : setShowLogin(!showLogin) }} >FAQs</a>
                        </li>

                        <li>
                          <a>About us</a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="widget widget_services ftr-list-center">
                      <ul>
                        <li>
                          <Link to={"/"}>Home</Link>
                        </li>

                        <li>
                          <a>Products</a>
                        </li>

                        <li>
                          <Link to={"/business"}> Business details</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- FOOTER COPYRIGHT --> */}
          <div className="footer-bottom">
            <div className="footer-bottom-info">
              <div className="footer-copy-right">
                <span className="copyrights-text">
                  Copyright © 2023 by Shopspot.
                </span>
              </div>
              <ul className="social-icons">
                <li>
                  <a className="fab fa-facebook-f"></a>
                </li>
                <li>
                  <a className="fab fa-twitter"></a>
                </li>
                <li>
                  <a className="fab fa-instagram"></a>
                </li>
                <li>
                  <a className="fab fa-youtube"></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer >
      {/* <!-- FOOTER END --> */}

      {/* <!-- BUTTON TOP START --> */}
      <button className="scroltop">
        <span class="fa fa-angle-up relative" id="btn-vibrate"></span>
      </button>
      {showLogin && <Login toggle={toggleshowLogin} />}

    </>
  );
}
