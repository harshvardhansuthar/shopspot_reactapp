import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
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
                    <a href="index.html">
                      <img src="images/logo.png" alt="" />
                    </a>
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
                          <Link to={"/profile"}>Profile</Link>
                        </li>

                        <li>
                          <a href="contact.html">Contact</a>
                        </li>

                        <li>
                          <a href="faq.html">FAQs</a>
                        </li>

                        <li>
                          <a href="about-1.html">About us</a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="widget widget_services ftr-list-center">
                      <ul>
                        <li>
                          <a href="index.html">Home</a>
                        </li>

                        <li>
                          <a href="employer-detail-v2.html">Products</a>
                        </li>

                        <li>
                          <a href="job-detail-v2.html">Business details</a>
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
                  <a href="javascript:void(0);" className="fab fa-facebook-f"></a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="fab fa-twitter"></a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="fab fa-instagram"></a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="fab fa-youtube"></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      {/* <!-- FOOTER END --> */}

      {/* <!-- BUTTON TOP START --> */}
      <button className="scroltop">
        <span class="fa fa-angle-up relative" id="btn-vibrate"></span>
      </button>
    </>
  );
}
