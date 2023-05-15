import React, { useState } from "react";
import Loder from "../../commen/Loder";
export default function BusinessProfile() {
  const [componentLoader, setComponentLoader] = useState(false);

  return (
    <>

      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12">
          <div class="twm-s-map mb-5">
            <div class="twm-s-map-iframe">
              <img
                style={{
                  width: "100%",
                  height: "270px",
                  objectFit: "cover",
                  borderRadius: "14px",
                }}
                src="images/Group 2007.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div class="twm-candidates-grid-wrap">
        <h4>Start your own business account</h4>
        <p class="text-muted">
          Ask your company shopspot for business admin for email inviatation to
          set up your account
        </p>
        <p class="text-dark">
          Perfect for busy creators, businesses and personal brands
        </p>
        <div class="text-end">
          <button type="submit" class="site-button">
            Create business account
          </button>
        </div>
      </div>
    </>

  );
}
