import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetData, GetDataWithToken } from "../../../ApiHelper/ApiHelper";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import ReferEarnPoint from "./ReferEarnPoint";
import { WhatsappShareButton } from "react-share";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import Loder from "../../commen/Loder";

export default function RefferralPoints(props) {
  const [clickPoint, setClickPoint] = useState(false);
  const [offerProduct, setOfferProduct] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [showOffer, setShowOffer] = useState(false);
  const [componentLoader, setComponentLoader] = useState(true);

  const [faq, setFaq] = useState([]);

  const toggleTab = (id) => {
    setActiveTab(id);
  };

  const [open, setOpen] = useState("1");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  useEffect(() => {
    setComponentLoader(true)
    GetDataWithToken("offer/offer-product").then((res) => {
      if (res?.status == true) {
        setOfferProduct(res.data);
        setComponentLoader(false)
      }
    });
    setComponentLoader(true)
    GetDataWithToken("faq/get-faq").then((res) => {
      if (res.status === true) {
        setFaq(res.data);
        setComponentLoader(false)

      }
    });
  }, []);

  console.log(faq);
  let url;
  let title;
  const copyReferral = () => {
    navigator.clipboard.writeText(props?.userData?.refer_code);
  };
  const shareReferral = () => {
    url = "example.com";
    title = "hellooo";
    console.log("click");
  };

  return (
    <>
      {componentLoader ? (
        <Loder />
      ) : (
        <>
          {!showOffer && (
            <div class="twm-right-section-panel candidate-save-job site-bg-light">
              <div class="twm-candidates-grid-wrap">
                <h5>Your shopspot referral point balance</h5>

                <div class="twm-candidates-grid-style1 mb-5 mt-4 pt-0">
                  <div class="twm-fot-content" style={{ borderRadius: "10px" }}>
                    <div class="twm-left-info">
                      <p class="twm-candidate-address">
                        <i class="fa fa-user"></i>Referral points
                      </p>
                      <div class="twm-jobs-vacancies">
                        <a
                          class="twm-job-title"
                          onClick={() => setClickPoint(true)}
                        >
                          <div class="twm-jobs-vacancies">
                            {/* <span>{props?.userData?.points + "  " + "points"}</span> */}

                            <Nav tabs className="d-block border-0">
                              <NavItem
                                className={activeTab === "1" ? "active" : ""}
                              >
                                <NavLink
                                  onClick={() => {
                                    toggleTab("2");
                                    setShowOffer(true);
                                  }}
                                >
                                  {props?.userData?.points + "  " + "points"}
                                </NavLink>
                              </NavItem>
                            </Nav>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="twm-candidates-grid-style1 mb-5 mt-4 pt-0">
                  <div class="twm-fot-content" style={{ borderRadius: "10px" }}>
                    <div class="twm-left-info flex-column text-start">
                      <span class="twm-candidate-address text-secondary">
                        What you get?
                      </span>
                      <h5>Get exciting rewards on their sign up</h5>
                      <p class="twm-candidate-address text-secondary">
                        Share your refrel link with your friends and when they their
                        sign up you’ll both get shopspot 100 points
                      </p>
                    </div>
                  </div>
                </div>
                <div class="twm-candidates-grid-style1 mb-5 mt-4 pt-0">
                  <div class="twm-fot-content" style={{ borderRadius: "10px" }}>
                    <div class="twm-left-info">
                      <div class="text-start">
                        <p class="twm-candidate-address text-secondary">
                          Share your referral code
                        </p>
                        <h4 class="twm-candidate-address">
                          {props?.userData?.refer_code}
                        </h4>
                      </div>
                      <div class="twm-jobs-vacancies">
                        <a class="twm-job-title" onClick={copyReferral}>
                          <div class="twm-jobs-vacancies">
                            <span>
                              <img src="images/Vector (3).svg" alt="" />
                            </span>
                          </div>
                        </a>
                        <WhatsappShareButton
                          class="twm-job-title"
                          url={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                            `REFERRAL CODE:${props?.userData?.refer_code}`
                          )}`}
                          title="title"
                        >
                          <div class="twm-jobs-vacancies">
                            <span>
                              <i class="fas fa-share-alt"></i>
                            </span>
                          </div>
                        </WhatsappShareButton>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-12 text-end">
                    <button type="submit" class="site-button m-r5">
                      Share with contact
                    </button>
                  </div>
                </div>
                <h5>Frequently asked questions</h5>
                <Accordion open={open} toggle={toggle}>
                  {faq?.length > 0 &&
                    faq?.map((data, index) => (
                      <AccordionItem>
                        <AccordionHeader targetId={`${index + 1}`}>
                          {data?.title}
                        </AccordionHeader>
                        <AccordionBody accordionId={`${index + 1}`}>
                          {data?.description}
                          {/* <strong>
                        This is the first item&#39;s accordion body.
                      </strong>
                      You can modify any of this with custom CSS or overriding
                      our default variables. It&#39;s also worth noting that
                      just about any HTML can go within the{" "}
                      <code>.accordion-body</code>, though the transition does
                      limit overflow. */}
                        </AccordionBody>
                      </AccordionItem>
                    ))}
                </Accordion>
              </div>
            </div>
          )}

          <TabContent activeTab={activeTab}>
            <TabPane tabId="2">
              <ReferEarnPoint userData={props?.userData} />
            </TabPane>
          </TabContent>
        </>
      )}
    </>
  );
}
