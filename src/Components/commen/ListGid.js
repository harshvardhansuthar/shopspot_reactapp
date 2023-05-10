import React from "react";
import Map from "./Map";
import Layout from "./Layout";
export default function ListGid() {
  return (
    <>
      {/* <!-- CONTENT START --> */}
      <div class="page-content">
        {/* <!-- SECTION CONTENT START --> */}
        <div class="section-full">
          <div class="half-map-list p-a20">
            {/* <!-- Event Banners start here... --> */}
            <div class="product-details">
              <div id="carouselExample" class="carousel slide">
                <div class="carousel-inner">
                  <div class="carousel-item shadow-sm active">
                    <img
                      src="./images/job-detail-bg.jpg"
                      class="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div class="carousel-item shadow-sm">
                    <img
                      src="./images/Group 2007.png"
                      class="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div class="carousel-item shadow-sm">
                    <img
                      src="./images/job-detail-bg-2.jpg"
                      class="d-block w-100"
                      alt="..."
                    />
                  </div>
                </div>
                <button
                  class="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button
                  class="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            {/* <!-- Event Banners end here... --> */}
            <div class="wt-listing-full-width">
              <form>
                {/* <!--Search Bar--> */}
                {/* <!--Basic Information--> */}
                <div class="panel panel-default">
                  <div class="panel-heading wt-panel-heading p-a20 ps-0">
                    <h4
                      class="btn panel-tittle m-a0 border-1 rounded-3 border-secondary"
                      data-bs-toggle="collapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="Filters"
                    >
                      <i class="fas fa-filter"></i>Business Filter
                    </h4>
                  </div>
                  <div class="collapse" id="Filters">
                    <div class="panel-body wt-panel-body p-a20 m-b30">
                      <div class="row">
                        {/* <!--Job title--> */}
                        <div class="col-xl-4 col-lg-6 col-md-12">
                          <div class="form-group">
                            <label>Title</label>
                            <div class="ls-inputicon-box">
                              <input
                                class="form-control"
                                name="company_name"
                                type="text"
                                placeholder="Type Title"
                              />
                              <i class="fs-input-icon fa fa-address-card"></i>
                            </div>
                          </div>
                        </div>

                        {/* <!--Job Category--> */}
                        <div class="col-xl-4 col-lg-6 col-md-12">
                          <div class="form-group city-outer-bx has-feedback">
                            <label>Category</label>
                            <div class="ls-inputicon-box">
                              <select
                                class="wt-select-box selectpicker"
                                data-live-search="true"
                                title=""
                                id="j-category"
                                data-bv-field="size"
                              >
                                <option disabled selected value="">
                                  Select Category
                                </option>
                                <option>IT & ICT</option>
                                <option>Real Estate</option>
                                <option>Finance</option>
                                <option>HR</option>
                                <option>Social Media</option>
                                <option>Online Classes</option>
                                <option>Travel & Tours</option>
                                <option>Auto Parts</option>
                                <option>New Cars</option>
                                <option>Used Cars</option>
                                <option>Car Rental</option>
                              </select>
                              <i class="fs-input-icon fa fa-border-all"></i>
                            </div>
                          </div>
                        </div>

                        {/* <!--Job Type--> */}
                        <div class="col-xl-4 col-lg-6 col-md-12">
                          <div class="form-group">
                            <label>Job Type</label>
                            <div class="ls-inputicon-box">
                              <select
                                class="wt-select-box selectpicker"
                                data-live-search="true"
                                title=""
                                id="s-category"
                                data-bv-field="size"
                              >
                                <option class="bs-title-option" value="">
                                  Select Category
                                </option>
                                <option>New</option>
                                <option>Popular</option>
                                <option>Tranding</option>
                                <option>Good</option>
                                <option>Fantastic</option>
                              </select>
                              <i class="fs-input-icon fa fa-file-alt"></i>
                            </div>
                          </div>
                        </div>

                        {/* <!--Location--> */}
                        <div class="col-xl-12 col-lg-6 col-md-12">
                          <div class="form-group">
                            <label>Location</label>
                            <div class="ls-inputicon-box">
                              <input
                                class="form-control"
                                name="company_Email"
                                type="text"
                                placeholder="Type Address"
                              />
                              <i class="fs-input-icon fa fa-map-marker-alt"></i>
                            </div>
                          </div>
                        </div>

                        {/* <!--Radius--> */}
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Radius</label>

                            <div class="twm-radius-range">
                              <b>10 Km</b>
                              <input
                                id="ex2"
                                type="text"
                                class="span2"
                                value=""
                                data-slider-min="10"
                                data-slider-max="100"
                                data-slider-step="5"
                                data-slider-value="[20,80]"
                              />
                              <b>100 Km</b>
                            </div>
                          </div>
                        </div>

                        <div class="col-lg-12 col-md-12">
                          <div class="text-left">
                            <button type="button" class="site-button">
                              Search Business
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div class="wt-searchReasult-divider"></div>

            <div class="p-a30 side-bar-opposite">
              <div class="wt-listing-container">
                <div class="row">
                  {/* <!--Block one--> */}
                  <div class="col-lg-6 col-md-12 m-b30">
                    <div class="twm-jobs-grid-style1">
                      <div class="twm-media">
                        <img src="images/jobs-company/pic1.jpg" alt="#" />
                      </div>
                      <span class="twm-job-post-duration">Hotel</span>
                      <div class="twm-mid-content">
                        <a href="job-detail-v2.html" class="twm-job-title">
                          <h4>Cygal Systems WLL</h4>
                        </a>
                        <p class="twm-job-address">
                          1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
                        </p>
                      </div>
                      <div class="twm-right-content">
                        <a
                          href="job-detail-v2.html"
                          class="twm-jobs-browse site-text-primary"
                        >
                          12 KM Nearby you
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* <!--Block two--> */}
                  <div class="col-lg-6 col-md-12 m-b30">
                    <div class="twm-jobs-grid-style1">
                      <div class="twm-media">
                        <img src="images/jobs-company/pic2.jpg" alt="#" />
                      </div>
                      <span class="twm-job-post-duration">Restaurant</span>
                      <div class="twm-mid-content">
                        <a href="job-detail-v2.html" class="twm-job-title">
                          <h4>Cygal Systems WLL</h4>
                        </a>
                        <p class="twm-job-address">
                          1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
                        </p>
                      </div>
                      <div class="twm-right-content">
                        <a
                          href="job-detail-v2.html"
                          class="twm-jobs-browse site-text-primary"
                        >
                          3 KM Nearby you
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* <!--Block three--> */}
                  <div class="col-lg-6 col-md-12 m-b30">
                    <div class="twm-jobs-grid-style1">
                      <div class="twm-media">
                        <img src="images/jobs-company/pic3.jpg" alt="#" />
                      </div>
                      <span class="twm-job-post-duration">Coffee Store</span>
                      <div class="twm-mid-content">
                        <a href="job-detail-v2.html" class="twm-job-title">
                          <h4 class="twm-job-title">Cygal Systems WLL</h4>
                        </a>
                        <p class="twm-job-address">
                          1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
                        </p>
                      </div>
                      <div class="twm-right-content">
                        <a
                          href="job-detail-v2.html"
                          class="twm-jobs-browse site-text-primary"
                        >
                          5 KM Nearby you
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* <!--Block Four--> */}
                  <div class="col-lg-6 col-md-12 m-b30">
                    <div class="twm-jobs-grid-style1">
                      <div class="twm-media">
                        <img src="images/jobs-company/pic4.jpg" alt="#" />
                      </div>
                      <span class="twm-job-post-duration">Real Estate</span>
                      <div class="twm-mid-content">
                        <a href="job-detail-v2.html" class="twm-job-title">
                          <h4 class="twm-job-title">Cygal Systems WLL</h4>
                        </a>
                        <p class="twm-job-address">
                          1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
                        </p>
                      </div>
                      <div class="twm-right-content">
                        <a
                          href="job-detail-v2.html"
                          class="twm-jobs-browse site-text-primary"
                        >
                          7 KM Nearby you
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* <!--Block Five--> */}
                  <div class="col-lg-6 col-md-12 m-b30">
                    <div class="twm-jobs-grid-style1">
                      <div class="twm-media">
                        <img src="images/jobs-company/pic1.jpg" alt="#" />
                      </div>
                      <span class="twm-job-post-duration">Hotel</span>
                      <div class="twm-mid-content">
                        <a href="job-detail-v2.html" class="twm-job-title">
                          <h4>Cygal Systems WLL</h4>
                        </a>
                        <p class="twm-job-address">
                          1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
                        </p>
                      </div>
                      <div class="twm-right-content">
                        <a
                          href="job-detail-v2.html"
                          class="twm-jobs-browse site-text-primary"
                        >
                          12 KM Nearby you
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* <!--Block Six--> */}
                  <div class="col-lg-6 col-md-12 m-b30">
                    <div class="twm-jobs-grid-style1">
                      <div class="twm-media">
                        <img src="images/jobs-company/pic2.jpg" alt="#" />
                      </div>
                      <span class="twm-job-post-duration">Restaurant</span>
                      <div class="twm-mid-content">
                        <a href="job-detail-v2.html" class="twm-job-title">
                          <h4>Cygal Systems WLL</h4>
                        </a>
                        <p class="twm-job-address">
                          1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
                        </p>
                      </div>
                      <div class="twm-right-content">
                        <a
                          href="job-detail-v2.html"
                          class="twm-jobs-browse site-text-primary"
                        >
                          3 KM Nearby you
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* <!--Block Seven--> */}
                  <div class="col-lg-6 col-md-12 m-b30">
                    <div class="twm-jobs-grid-style1">
                      <div class="twm-media">
                        <img src="images/jobs-company/pic3.jpg" alt="#" />
                      </div>
                      <span class="twm-job-post-duration">Coffee Store</span>
                      <div class="twm-mid-content">
                        <a href="job-detail-v2.html" class="twm-job-title">
                          <h4 class="twm-job-title">Cygal Systems WLL</h4>
                        </a>
                        <p class="twm-job-address">
                          1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
                        </p>
                      </div>
                      <div class="twm-right-content">
                        <a
                          href="job-detail-v2.html"
                          class="twm-jobs-browse site-text-primary"
                        >
                          5 KM Nearby you
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* <!--Block Eight--> */}
                  <div class="col-lg-6 col-md-12 m-b30">
                    <div class="twm-jobs-grid-style1">
                      <div class="twm-media">
                        <img src="images/jobs-company/pic4.jpg" alt="#" />
                      </div>
                      <span class="twm-job-post-duration">Real Estate</span>
                      <div class="twm-mid-content">
                        <a href="job-detail-v2.html" class="twm-job-title">
                          <h4 class="twm-job-title">Cygal Systems WLL</h4>
                        </a>
                        <p class="twm-job-address">
                          1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
                        </p>
                      </div>
                      <div class="twm-right-content">
                        <a
                          href="job-detail-v2.html"
                          class="twm-jobs-browse site-text-primary"
                        >
                          7 KM Nearby you
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* <!--Block Nine--> */}
                  <div class="col-lg-6 col-md-12 m-b30">
                    <div class="twm-jobs-grid-style1">
                      <div class="twm-media">
                        <img src="images/jobs-company/pic1.jpg" alt="#" />
                      </div>
                      <span class="twm-job-post-duration">Hotel</span>
                      <div class="twm-mid-content">
                        <a href="job-detail-v2.html" class="twm-job-title">
                          <h4>Cygal Systems WLL</h4>
                        </a>
                        <p class="twm-job-address">
                          1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
                        </p>
                      </div>
                      <div class="twm-right-content">
                        <a
                          href="job-detail-v2.html"
                          class="twm-jobs-browse site-text-primary"
                        >
                          12 KM Nearby you
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* <!--Block Ten--> */}
                  <div class="col-lg-6 col-md-12 m-b30">
                    <div class="twm-jobs-grid-style1">
                      <div class="twm-media">
                        <img src="images/jobs-company/pic2.jpg" alt="#" />
                      </div>
                      <span class="twm-job-post-duration">Restaurant</span>
                      <div class="twm-mid-content">
                        <a href="job-detail-v2.html" class="twm-job-title">
                          <h4>Cygal Systems WLL</h4>
                        </a>
                        <p class="twm-job-address">
                          1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
                        </p>
                      </div>
                      <div class="twm-right-content">
                        <a
                          href="job-detail-v2.html"
                          class="twm-jobs-browse site-text-primary"
                        >
                          3 KM Nearby you
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="pagination-outer">
                <div class="pagination-style1">
                  <ul class="clearfix">
                    <li class="prev">
                      <a href="javascript:;">
                        <span>
                          {" "}
                          <i class="fa fa-angle-left"></i>{" "}
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="javascript:;">1</a>
                    </li>
                    <li class="active">
                      <a href="javascript:;">2</a>
                    </li>
                    <li>
                      <a href="javascript:;">3</a>
                    </li>
                    <li>
                      <a class="javascript:;" href="javascript:;">
                        <i class="fa fa-ellipsis-h"></i>
                      </a>
                    </li>
                    <li>
                      <a href="javascript:;">5</a>
                    </li>
                    <li class="next">
                      <a href="javascript:;">
                        <span>
                          {" "}
                          <i class="fa fa-angle-right"></i>{" "}
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Right part --> */}
          <div class="half-map-section">
            <div
              class="user-msg-list-btn-outer"
              style={{
                position: 'absolute',
                top: '10px',
                right: '133px',
                zIndex: 99,
              }}
            >
              <button class="site-button">Close</button>
              <button class="site-button">View Map</button>
            </div>

            <div id="map-container">
              <div id="map" data-map-zoom="9">
                {/* <!-- map goes here --> */}
              </div>
            </div>
          </div>
          {/* <!-- Right part END --> */}
        </div>
        {/* <!-- SECTION CONTENT END  --> */}
      </div>
      {/* <!-- CONTENT END --> */}

      {/* <!-- BUTTON TOP START --> */}
      <button class="scroltop">
        <span class="fa fa-angle-up relative" id="btn-vibrate"></span>
      </button>
    </>
  );
}
