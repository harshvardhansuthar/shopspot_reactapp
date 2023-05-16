import React, { useState } from "react";
import { GetDataWithToken } from "../../../ApiHelper/ApiHelper";
import Loder from "../../commen/Loder";
import Swal from "sweetalert2";

export default function OfferDetail(props) {
  const [coupenCode, setCoupenCode] = useState(null)
  const [componentLoader, setComponentLoader] = useState(false);

  const handleGenerateCoupen = () => {
    // setComponentLoader(true);
    GetDataWithToken(`offer/generate-offer/${props?.OfferDetailData?.id}`).then((res) => {
      console.log(res)
      setCoupenCode(res)

    })
  }

  console.log(coupenCode)
  return (
    <>
      {componentLoader ? (
        <Loder />
      ) : (
        <>
          <div className="twm-right-section-panel candidate-save-job site-bg-light">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12">
                <div className="twm-s-map mb-5">
                  <div className="twm-s-map-iframe">
                    <img
                      style={{
                        width: "100%",
                        height: "270px",
                        objectFit: "cover",
                        borderRadius: "14px",
                      }}
                      src={props?.OfferDetailData?.image}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="twm-candidates-grid-wrap">
              <h4>
                {props?.OfferDetailData?.description}
              </h4>
              {/* <p className="text-muted">
            Click here to snag an extra 20% SITE WIDE with this Kohl's promo
            code! Shop holiday deals .
          </p> */}
              <p className="text-dark">
                Valid till: <span className="text-muted">{props?.OfferDetailData?.validity}</span>
              </p>
              <p className="text-dark">
                Ends: <span className="text-muted">{props?.OfferDetailData?.offer_end}</span>
              </p>
              <p className="text-dark">
                Redeemable at:
                <span className="text-muted"> {props?.OfferDetailData?.Product?.name}</span>
              </p>

              <ul className="list-unstyled">
                <h5>About this deal</h5>
                <li>General Public Offer</li>
                <li>No minimum booking amount is required.</li>
                <li>Use Ramee Rose Hote coupon code to avail the offer.</li>
              </ul>

              <ul className="list-unstyled">
                <h5>How to Redeem</h5>
                <li>Visit the store to redeem coupons</li>
                <li>
                  Open the coupon from my coupons section of the shopspot customer
                  app profile section
                </li>
                <li>Scan the coupons with the cashier at time of the payment</li>
              </ul>

              <ul className="list-unstyled">
                <h5>Things to Note:</h5>
                <li>
                  On buying this coupon you will get a code through which you can
                  purchase item
                </li>
                <li>Valid at listed store</li>
                <li>Valid for 6 months</li>
                <li>Partial redeemption is not allowed</li>
              </ul>
              <div className="text-end">
                {coupenCode && <button type="submit" className="site-button outline-primary me-2">
                  {coupenCode?.data?.coupon_code ? coupenCode?.data?.coupon_code : coupenCode?.message}
                </button>}
                <button type="submit" className="site-button" onClick={handleGenerateCoupen}>
                  Avail for {props?.OfferDetailData?.points} points
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
