import React, { useState, useEffect } from "react";
import ProfileSideBar from "./ProfileSideBar";
import { GetDataWithToken } from "../../../ApiHelper/ApiHelper";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import OfferDetail from "./OfferDetail";
import Loder from "../../commen/Loder";

export default function ReferEarnPoint(props) {
  const [offerProduct, setOfferProduct] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [showOfferDetail, setShowOfferDetali] = useState(false);
  const [OfferDetailData, setOfferDetailData] = useState([]);
  const [componentLoader, setComponentLoader] = useState(false);

  useEffect(() => {
    setComponentLoader(false);
    GetDataWithToken("offer/offer-product").then((res) => {
      if (res?.status == true) {
        setOfferProduct(res.data);
        setComponentLoader(false);
      }
    });
  }, []);

  const handleOfferDetail = (id) => {
    // setComponentLoader(true)
    GetDataWithToken(`offer/offer-product?id=${id}`).then((res) => {
      if (res?.status == true) {
        setOfferDetailData(res.data);
        // setComponentLoader(false)
      }
    });
  };

  const toggleTab = (id) => {
    setActiveTab(id);
  };
  return (
    <>
      {componentLoader ? (
        <Loder />
      ) : (
        <>
          {!showOfferDetail && (
            <div className="twm-right-section-panel candidate-save-job site-bg-light">
              <div className="twm-candidates-grid-wrap">
                <h5>Your shopspot referral point balance</h5>

                <div className="twm-candidates-grid-wrap">
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="twm-candidates-grid-style1 mb-5 mt-4 pt-0">
                        <div
                          className="twm-fot-content"
                          style={{ borderRadius: "10px" }}
                        >
                          <div className="twm-left-info align-items-center">
                            <div className="referEarn">
                              <img src="images/Solid.svg" alt="" />
                            </div>
                            <div className="twm-jobs-vacancies">
                              <a
                                href="Refer&Earn-Point.html"
                                className="twm-job-title"
                              >
                                <div className="twm-jobs-vacancies">
                                  Total Points:
                                  <span> {props?.userData?.points}</span>
                                </div>
                              </a>
                              <a
                                href="Refer&Earn-Point.html"
                                className="twm-job-title"
                              >
                                <div className="twm-jobs-vacancies">
                                  <span>Reddem now</span>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="twm-candidates-grid-style1 mb-5 mt-4 pt-0">
                        <div
                          className="twm-fot-content"
                          style={{ borderRadius: "10px" }}
                        >
                          <div className="twm-left-info align-items-center">
                            <div className="referEarn">
                              <img src="images/start.svg" alt="" />
                            </div>
                            <div className="twm-jobs-vacancies">
                              <a
                                href="Refer&Earn-Point.html"
                                className="twm-job-title"
                              >
                                <div className="twm-jobs-vacancies">
                                  Redeemed gifts
                                </div>
                              </a>
                              <a
                                href="Refer&Earn-Point.html"
                                className="twm-job-title"
                              >
                                <div className="twm-jobs-vacancies">
                                  <small className="text-secondary">
                                    Purchased gifts
                                  </small>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between">
                  <h5>Available gift items for you</h5>
                  <a href="Refer&Earn-Point.html" className="twm-job-title">
                    <div className="twm-jobs-vacancies">
                      <span>Show all</span>
                    </div>
                  </a>
                </div>

                <div className="twm-candidates-grid-wrap">
                  <div className="row">
                    {offerProduct &&
                      offerProduct?.length > 0 &&
                      offerProduct?.map((item, key) => (
                        <div className="col-lg-6 col-md-6">
                          <div className="twm-candidates-grid-style1 my-5">
                            <div className="twm-media">
                              <div className="twm-media-pic">
                                <img
                                  src={JSON.parse(item?.Product?.images)[0]}
                                  alt="#"
                                />
                              </div>
                            </div>
                            <div className="twm-mid-content">
                              <a
                                href="candidate-detail.html"
                                className="twm-job-title"
                              >
                                <h4>{item?.Product?.name}</h4>
                              </a>
                              <p>{item?.name}</p>

                              <div className="twm-fot-content">
                                <div className="twm-left-info justify-content-center">
                                  <a
                                    onClick={() => handleOfferDetail(item.id)}
                                    className="twm-job-title"
                                  >
                                    <div className="twm-jobs-vacancies">
                                      {/* <span>{item?.points} points</span> */}

                                      <Nav tabs className="d-block border-0">
                                        <NavItem
                                          className={
                                            activeTab === "1" ? "active" : ""
                                          }
                                        >
                                          <NavLink
                                            onClick={() => {
                                              toggleTab("3");
                                              setShowOfferDetali(true);
                                            }}
                                          >
                                            {item?.points} points
                                          </NavLink>
                                        </NavItem>
                                      </Nav>
                                    </div>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="twm-candidates-grid-style1 mb-5 mt-4 pt-0">
                      <div
                        className="twm-fot-content"
                        style={{ borderRadius: "10px" }}
                      >
                        <div className="twm-left-info">
                          <p className="twm-candidate-address me-0">
                            <span className="referEarn mb-2">
                              <i className="fas fa-envelope-open-text"></i>{" "}
                            </span>
                            referrer & earn points
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="twm-candidates-grid-style1 mb-5 mt-4 pt-0">
                      <div
                        className="twm-fot-content"
                        style={{ borderRadius: "10px" }}
                      >
                        <div className="twm-left-info">
                          <p className="twm-candidate-address me-0">
                            <span className="referEarn mb-2">
                              <i className="fas fa-house-user"></i>{" "}
                            </span>
                            Visit store or shop spot
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="twm-candidates-grid-style1 mb-5 mt-4 pt-0">
                      <div
                        className="twm-fot-content"
                        style={{ borderRadius: "10px" }}
                      >
                        <div className="twm-left-info">
                          <p className="twm-candidate-address me-0">
                            <span className="referEarn mb-2">
                              <i className="fas fa-gifts"></i>{" "}
                            </span>
                            Redeem your gift anytime
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="twm-candidates-grid-style1 mb-5 mt-4 pt-0">
                      <div
                        className="twm-fot-content"
                        style={{ borderRadius: "10px" }}
                      >
                        <div className="twm-left-info align-items-center">
                          <div className="twm-jobs-vacancies">
                            <a href="#" className="twm-job-title">
                              <div className="twm-jobs-vacancies">
                                <span className="referEarn">
                                  <i className="fas fa-file-image"></i>
                                </span>
                              </div>
                            </a>
                          </div>
                          <div className="text-start">
                            <h4 className="twm-candidate-address">
                              Terms & Conditions
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="twm-candidates-grid-style1 mb-5 mt-4 pt-0">
                      <div
                        className="twm-fot-content"
                        style={{ borderRadius: "10px" }}
                      >
                        <div className="twm-left-info align-items-center">
                          <div className="twm-jobs-vacancies">
                            <a href="#" className="twm-job-title">
                              <div className="twm-jobs-vacancies">
                                <span className="referEarn">
                                  <i className="fas fa-question"></i>
                                </span>
                              </div>
                            </a>
                          </div>
                          <div className="text-start">
                            <h4 className="twm-candidate-address">
                              How to use
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <TabContent activeTab={activeTab}>
            <TabPane tabId="3">
              <OfferDetail OfferDetailData={OfferDetailData} />
            </TabPane>
          </TabContent>
        </>
      )}
    </>
  );
}
