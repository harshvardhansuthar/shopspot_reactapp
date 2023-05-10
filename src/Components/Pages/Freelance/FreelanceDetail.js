import React, { useEffect, useState } from "react";
import Header from "../../commen/Header";
import Footer from "../../commen/Footer";
import { GetData, GetDataWithToken } from "../../../ApiHelper/ApiHelper";
import { Link, useLocation } from "react-router-dom";
import Map from "../Map/Map";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";


export default function FreelanceDetail() {
  const [freeLanceData, setFreeLanceData] = useState({})
  const [otherinfo, setOtherInfo] = useState({})
  const [images, setImages] = useState([])
  const id = useLocation()

  useEffect(() => {
    GetDataWithToken(`freelance/frelance-details/${id?.state?.id}`).then((res) => {
      console.log(res)
      if (res?.status == true) {
        let info = JSON.parse(res?.data?.freelance?.info)
        let img = JSON.parse(res?.data?.freelance?.images)
        setImages(img)
        setOtherInfo(info)
        setFreeLanceData(res?.data)
      }
    })
  }, [])
  console.log(freeLanceData
  )

  return (
    <>
      {/* <!-- CONTENT START --> */}
      <Header class={"header-full-width"} />
      <div className="page-content">
        {/* <!-- Freelance Detail START --> */}
        <div className="section-full p-t50 p-b90 bg-white">
          <div className="container">
            {/* <!-- BLOG SECTION START --> */}
            <div className="section-content">
              <div className="twm-job-detail-2-wrap">
                <div className="row d-flex justify-content-center">
                  <div className="col-lg-4 col-md-12 rightSidebar">
                    <div className="side-bar mb-4">
                      <div className="twm-s-info2-wrap mb-5">
                        <div className="twm-job-self-wrap twm-job-detail-v2 freelance">
                          <div className="twm-job-self-info">
                            <div className="twm-job-self-top">
                              <div className="twm-media-bg">
                                <img src="images/banner/logo(1).png" alt="#" />
                              </div>

                              <div className="twm-mid-content pt-3">
                                <h4 className="twm-job-title">
                                  {freeLanceData?.freelance?.name}
                                  <br />
                                  <span className="twm-job-post-duration">
                                    {freeLanceData?.freelance?.Category?.name}
                                  </span>
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="twm-s-info2">
                          <h4 className="section-head-small mb-4">
                            Information
                          </h4>
                          <ul className="twm-job-hilites2">
                            <li>
                              <div className="twm-s-info-inner">
                                <i className="fas fa-calendar-alt"></i>
                                <span className="twm-title">Date Posted</span>
                                <div className="twm-s-info-discription">
                                  {otherinfo?.Date}
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="twm-s-info-inner">
                                <i className="fas fa-map-marker-alt"></i>
                                <span className="twm-title">Location</span>
                                <div className="twm-s-info-discription">
                                  {freeLanceData?.freelance?.address}
                                </div>
                              </div>
                            </li>
                            <li className="d-none">
                              <div className="twm-s-info-inner">
                                <i className="fas fa-user-tie"></i>
                                <span className="twm-title">Title</span>
                                <div className="twm-s-info-discription">
                                  Web Developer
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="twm-s-info-inner">
                                <i className="fas fa-suitcase"></i>
                                <span className="twm-title">Experience</span>
                                <div className="twm-s-info-discription">
                                  {otherinfo?.Experience}
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="twm-s-info-inner">
                                <i className="fas fa-clock"></i>
                                <span className="twm-title">Available</span>
                                <div className="twm-s-info-discription">
                                  {otherinfo?.Available}
                                </div>
                              </div>
                            </li>
                            <li className="d-none">
                              <div className="twm-s-info-inner">
                                <i className="fas fa-money-bill-wave"></i>
                                <span className="twm-title">
                                  Offered Salary
                                </span>
                                <div className="twm-s-info-discription">
                                  $2000-$2500 / Month
                                </div>
                              </div>
                            </li>
                          </ul>
                          <h4 className="twm-s-title">Share Profile</h4>
                          <div className="twm-social-tags">
                            <a href="tel:6350088970" className="fb-clr">
                              <i className="fas fa-phone-alt"></i>
                            </a>
                            <a
                              href="mailto:email@example.com"
                              className="tw-clr"
                            >
                              <i className="fas fa-envelope"></i>
                            </a>
                            <a href="#" className="whats-clr">
                              <i className="fab fa-whatsapp"></i>
                            </a>
                            <a href="#" className="pinte-clr">
                              <i className="fas fa-map-marker-alt"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="widget tw-sidebar-tags-wrap">
                        <h4 className="twm-s-title">Skills</h4>

                        <div className="tagcloud">
                          <a href="javascript:void(0)">Html</a>
                          <a href="javascript:void(0)">Python</a>
                          <a href="javascript:void(0)">WordPress</a>
                          <a href="javascript:void(0)">JavaScript</a>
                          <a href="javascript:void(0)">Figma</a>
                          <a href="javascript:void(0)">Angular</a>
                          <a href="javascript:void(0)">Reactjs</a>
                          <a href="javascript:void(0)">Drupal</a>
                          <a href="javascript:void(0)">Joomla</a>
                        </div>
                      </div>
                      <h4 className="twm-s-title">Location</h4>
                      <div className="twm-m-map mb-5">
                        <div className="twm-m-map-iframe">
                          {/* <iframe
                            height="310"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.8534521658976!2d-118.2533646842856!3d34.073270780600225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c6fd9829c6f3%3A0x6ecd11bcf4b0c23a!2s1363%20Sunset%20Blvd%2C%20Los%20Angeles%2C%20CA%2090026%2C%20USA!5e0!3m2!1sen!2sin!4v1620815366832!5m2!1sen!2sin"
                          ></iframe> */}

                          <Map />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-8 col-md-12">
                    {/* <!-- Candidate detail START --> */}
                    <div className="cabdidate-de-info">
                      <h4 className="twm-s-title m-t0">Services</h4>
                      <div className="tw-sidebar-gallery-2">
                        <div className="row">
                          {images && images?.length > 0 && images.map((item, key) => (<div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="tw-service-gallery-thumb">
                              <a className="" key={key}>
                                <img src={item} alt="" />
                                <i className="fa fa-file-image"></i>
                              </a>
                            </div>
                          </div>))}

                          {/* <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="tw-service-gallery-thumb">
                              <a className="" href="#">
                                <img src="images/Rectangle 204.png" alt="" />
                                <i className="fa fa-file-image"></i>
                              </a>
                            </div>
                          </div> */}

                          {/* <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="tw-service-gallery-thumb">
                              <a className="" href="#">
                                <img src="images/Rectangle 205.png" alt="" />
                                <i className="fa fa-file-image"></i>
                              </a>
                            </div>
                          </div> */}

                          {/* <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="tw-service-gallery-thumb">
                              <a className="" href="#">
                                <img
                                  src="images/gallery/thumb/pic4.jpg"
                                  alt=""
                                />
                                <i className="fa fa-file-image"></i>
                              </a>
                            </div>
                          </div> */}
                        </div>
                      </div>

                      <h4 className="twm-s-title m-t0">Description:</h4>

                      <p>
                        {freeLanceData?.freelance?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Freelance Detail END --> */}

        {/* <!-- Related Freelance START --> */}
        <div className="section-full p-t120 p-b90 site-bg-light-purple twm-related-jobs-carousel-wrap">
          {/* <!-- TITLE START--> */}
          <div className="section-head center wt-small-separator-outer">
            <div className="wt-small-separator site-text-primary">
              <div>Top Freelance</div>
            </div>
            <h2 className="wt-title">Related Freelance</h2>
          </div>
          {/* <!-- TITLE END--> */}

          <div className="container">
            <div className="section-content">
              <div className="  twm-related-jobs-carousel owl-btn-vertical-center">
                <div className="item">

                  <OwlCarousel
                    className="owl-theme"
                    loop
                    items={3}
                    margin={10}
                    nav
                    navText={[
                      `<i class="fas fa-chevron-left"></i>`,
                      `<i class="fas fa-chevron-right"></i>`,
                    ]}
                    // autoPlay={true}
                    // autoplayTimeout={3000}
                    dots={false}
                  >

                    {freeLanceData?.related_frelance && freeLanceData?.related_frelance.map((item, key) => (
                      <div className="hpage-6-featured-block">
                        <div className="inner-content">
                          <div className="mid-content">
                            <div className="company-logo">
                              <img src="images/banner/logo(1).png" alt="#" />
                            </div>
                            <div className="company-info">
                              <Link to={"/freelancedetail"} state={{ id: item?.id }} className="company-name">
                                {item?.name}
                              </Link>
                              <p className="company-address">{item?.address}</p>
                            </div>
                          </div>
                          <div className="bottom-content">
                            <h4 className="job-name-title">{item?.Category?.name}</h4>
                          </div>
                          <div className="aply-btn-area">
                            <a href="Freelance.html" className="aplybtn">
                              <i className="fas fa-chevron-right"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* Add more items as needed */}
                  </OwlCarousel>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Related Freelance END --> */}
        <Footer />
      </div>
      {/* <!-- CONTENT END --></>   */}

    </>
  );
}
