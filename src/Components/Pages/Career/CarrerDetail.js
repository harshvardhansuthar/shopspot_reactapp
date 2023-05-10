import React, { useEffect, useState } from 'react'
import Header from '../../commen/Header'
import Footer from '../../commen/Footer'
import { GetDataWithToken } from '../../../ApiHelper/ApiHelper'
import { useLocation } from 'react-router-dom'
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from 'react-router-dom'

export default function CarrerDetail() {
    const [careerdetail, setCareerDetail] = useState({})
    const [otherInfo, setOtherInfo] = useState({})
    const id = useLocation()

    useEffect(() => {
        GetDataWithToken(`business/get-carrer-details/${id?.state?.id}`).then((res) => {
            console.log(res)
            if (res.status == true) {
                let info = JSON.parse(res?.data?.career?.info)
                setOtherInfo(info)
                setCareerDetail(res.data)
            }
        })
    }, [])
    console.log('....................', careerdetail)
    console.log(otherInfo)
    return (
        <>
            <Header class={"header-full-width"} />
            <div className="page-content">
                {/* <!-- Career Detail START --> */}
                <div className="section-full p-t50 p-b90 bg-white">
                    <div className="container">
                        {/* <!-- BLOG SECTION START --> */}
                        <div className="section-content">
                            {/* <!-- <div className="twm-job-self-wrap twm-job-detail-v2">
                              <div className="twm-job-self-info">
                                  <div className="twm-job-self-top">
                                      <div className="twm-media-bg">
                                          <img src="images/job-detail-bg-2.jpg" alt="#" />
                                      </div>

                                      <div className="twm-mid-content">
                                          <div className="twm-media">
                                              <img src="images/jobs-company/pic1.jpg" alt="#" />
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div> --> */}
                            <div className="twm-job-detail-2-wrap">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-md-12">
                                        <div className="twm-s-info2-wrap mb-5">
                                            <div className="twm-s-info2">
                                                <h4 className="section-head-small mb-4">Information</h4>
                                                <h3>
                                                    {careerdetail?.career?.title}
                                                </h3>

                                                <ul className="twm-job-hilites2">
                                                    <li>
                                                        <div className="twm-s-info-inner">
                                                            <i className="fas fa-map-marker-alt"></i>
                                                            <span className="twm-title">Location</span>
                                                            <div className="twm-s-info-discription">
                                                                {careerdetail?.career?.address}
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="twm-s-info-inner">
                                                            <i className="fas fa-clock"></i>
                                                            <span className="twm-title">Available</span>
                                                            <div className="twm-s-info-discription">
                                                                {careerdetail?.career?.available}
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <!-- Candidate detail START --> */}
                                    <div className="cabdidate-de-info">
                                        <h4 className="twm-s-title m-t0">Overview:</h4>
                                        <p>
                                            {otherInfo?.Overview}ƒ
                                        </p>
                                        <h4 className="twm-s-title">More Detail</h4>
                                        <p>{otherInfo?.More_Detail}</p>


                                        <h4 className="twm-s-title">Experience Duration & Schedules</h4>
                                        <p>
                                            {otherInfo?.Experience_Duration_Schedules}
                                        </p>


                                        <h4 className="twm-s-title">Get More Information</h4>
                                        <p>
                                            {otherInfo?.Get_More_Information}
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Career Detail END --> */}

                {/* <!-- Related Career START --> */}
                <div
                    className="section-full p-t120 p-b90 site-bg-light-purple twm-related-jobs-carousel-wrap"
                >
                    {/* <!-- TITLE START--> */}
                    <div className="section-head center wt-small-separator-outer">
                        <div className="wt-small-separator site-text-primary">
                            <div>Top Career</div>
                        </div>
                        <h2 className="wt-title">Related Career</h2>
                    </div>
                    {/* <!-- TITLE END--> */}

                    <div className="container">
                        <div className="section-content">
                            <div
                                className=" twm-related-jobs-carousel owl-btn-vertical-center">
                                {<div className="item">
                                    <OwlCarousel
                                        className="owl-theme"
                                        loop
                                        items={3}
                                        margin={10}
                                        nav
                                        navText={[
                                            `<i className="fas fa-chevron-left"></i>`,
                                            `<i className="fas fa-chevron-right"></i>`,
                                        ]}
                                        // autoPlay={true}
                                        // autoplayTimeout={3000}
                                        dots={false}
                                    >
                                        <div>
                                            {careerdetail?.related_career &&
                                                careerdetail?.related_career?.length > 0 &&
                                                careerdetail?.related_career?.map((item, key) => (
                                                    <div className="hpage-6-featured-block">
                                                        <div className="inner-content">
                                                            <div className="mid-content">
                                                                <div className="company-logo">
                                                                    <img src={item?.Business?.images} alt="#" />
                                                                </div>
                                                                <div className="company-info">
                                                                    <Link to={"/careerdetail"} state={{ id: item?.id }} className="company-name"
                                                                    >{item?.Business?.name}</Link >
                                                                    <p className="company-address">{item?.address}</p>
                                                                </div>
                                                            </div>
                                                            <div className="bottom-content">
                                                                <h4 className="job-name-title">{item?.post_name}</h4>
                                                            </div>
                                                            <div className="aply-btn-area">
                                                                <Link to={"/careerdetail"} state={{ id: item?.id }} className="aplybtn">
                                                                    <i className="fas fa-chevron-right"></i>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                        {/* Add more items as needed */}
                                    </OwlCarousel>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Related Career END --> */}
                <Footer />
            </div>
            {/* <!-- CONTENT END --> */}
        </>)
}
