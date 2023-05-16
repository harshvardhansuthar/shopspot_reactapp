import { useEffect } from "react";
import Footer from "../../commen/Footer";
import Header from "../../commen/Header";
import { GetData } from "../../../ApiHelper/ApiHelper";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useSelector } from "react-redux";
import Loder from "../../commen/Loder";
import { Link } from "react-router-dom";

export default function LatestExperienceDetail() {
  const [reletedBusiness, setReletedBusiness] = "";
  const [experienceData, setExperienceData] = useState([]);
  const reduxCountryName = useSelector((state) => state?.countryName?.action);
  const [componentLoader, setComponentLoader] = useState(true);
  const [reletedExperience, setReletedExperience] = useState([]);

  const id = useLocation();

  console.log(id);
  useEffect(() => {
    GetData(`auth/get-experience-detalis/${id?.state?.id}`).then((res) => {
      console.log(res);
      if (res?.status == true) {
        setExperienceData(res.data);
      }
    });
  }, []);

  console.log("jhgfghjk", experienceData.related_experience);

  useEffect(() => {
    setComponentLoader(true);
    GetData(`auth/get-experience-detalis/${id?.state?.id}`).then((res) => {
      console.log(res);
      if (res?.status == true) {
        setExperienceData(res.data);
        setComponentLoader(false);
      }

      let arr = [];
      for (let i = 0; i < res?.data?.related_experience?.length; i++) {
        if (res?.data?.related_experience[i]?.id != res?.data?.experience?.id) {
          arr.push(res?.data?.related_experience[i]);
        }
      }
      console.log(
        "fghjklkjhgfghjklkjhgfghjklkjhgfghjkjhgchjkjhgfghjkjhgfd",
        arr
      );
      setReletedExperience(arr);
    });
  }, []);

  const handleReletedBusiness = (id) => {
    setComponentLoader(true);
    GetData(`auth/get-experience-detalis/${id}`).then((res) => {
      console.log(res);
      if (res?.status == true) {
        setExperienceData(res.data);
        setComponentLoader(false);
      }
    });
  };

  // reactcoural variables
  return (
    <>
      {componentLoader ? (
        <Loder />
      ) : (
        <>
          {/* {/ <!-- CONTENT START --> /} */}
          {reduxCountryName && <Header class={"header-full-width"} />}
          <div className="page-content">
            {/* {/ <!-- Career Detail START --> /} */}
            <div className="section-full p-t50 p-b90 bg-white">
              <div className="container">
                {/* {/ <!-- BLOG SECTION START --> /} */}
                <div className="section-content">
                  <div className="twm-job-self-wrap twm-job-detail-v2">
                    <div className="twm-job-self-info">
                      <div className="twm-job-self-top">
                        <div className="twm-media-bg">
                          <img
                            src={experienceData?.experience?.image}
                            alt="#"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="twm-job-detail-2-wrap">
                    <div className="row d-flex justify-content-center">
                      <div className="col-md-12">
                        <div className="twm-s-info2-wrap mb-5">
                          <div className="twm-s-info2">
                            <h4 className="section-head-small mb-4">
                              Information
                            </h4>
                            <h3>{experienceData?.experience?.name}</h3>

                            <ul className="twm-job-hilites2">
                              <li>
                                <div className="twm-s-info-inner">
                                  <i className="fas fa-map-marker-alt"></i>
                                  <span className="twm-title">Location</span>
                                  <div className="twm-s-info-discription">
                                    {experienceData?.experience?.place}
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="twm-s-info-inner">
                                  <i className="fas fa-clock"></i>
                                  <span className="twm-title">Time</span>
                                  <div className="twm-s-info-discription">
                                    {experienceData?.experience?.time}
                                  </div>
                                </div>
                              </li>
                            </ul>
                            <h4 className="twm-s-title">Share Profile</h4>
                            <div className="twm-social-tags">
                              <a
                                target="_blank"
                                href={`tel:${
                                  experienceData?.experience?.contect &&
                                  JSON.parse(
                                    experienceData?.experience?.contect
                                  )?.phone
                                }`}
                                className="fb-clr"
                              >
                                <i className="fas fa-phone-alt"></i>
                              </a>
                              <a
                                target="_blank"
                                href={`mailto:${
                                  experienceData?.experience?.contect &&
                                  JSON.parse(
                                    experienceData?.experience?.contect
                                  )?.email
                                }`}
                                className="tw-clr"
                              >
                                <i className="fas fa-envelope"></i>
                              </a>
                              <a
                                target="_blank"
                                href={`https://web.whatsapp.com/send?phone=${
                                  experienceData?.experience?.contect &&
                                  JSON.parse(
                                    experienceData?.experience?.contect
                                  )?.whatsapp
                                }&text=Hello`}
                                className="whats-clr"
                              >
                                <i className="fab fa-whatsapp"></i>
                              </a>
                              <a
                                target="_blank"
                                href={`https://www.google.com/maps/@${experienceData?.experience?.user?.latitude},${experienceData?.experience?.user?.longitude},15z`}
                                className="pinte-clr"
                              >
                                <i className="fas fa-map-marker-alt"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* {/ <!-- Candidate detail START --> /} */}
                      <div className="cabdidate-de-info">
                        <h4 className="twm-s-title m-t0">Overview:</h4>
                        <p>{experienceData?.experience?.overview}</p>
                        <h4 className="twm-s-title">More Detail</h4>
                        <p>{experienceData?.experience?.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* {/ <!-- Career Detail END --> /}

                    {/ <!-- Related Career START --> /} */}
            <div className="section-full p-t120 p-b90 site-bg-light-purple twm-related-jobs-carousel-wrap">
              {/* {/ <!-- TITLE START--> /} */}
              <div className="section-head center wt-small-separator-outer">
                <div className="wt-small-separator site-text-primary">
                  <div>Top Experience</div>
                </div>
                <h2 className="wt-title">Related Experiences</h2>
              </div>
              {/* {/ <!-- TITLE END--> /} */}

              <div className="container">
                <div className="section-content">
                  <div className="twm-la-home-blog owl-btn-bottom-center owl-loaded owl-drag">
                    {/* {/ <!--Block two--> /} */}
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
                      <>
                        {reletedExperience?.length > 0 &&
                          reletedExperience?.map((item, key) => (
                            <div
                              className="blog-post twm-blog-post-1-outer"
                              key={key}
                            >
                              <div className="wt-post-media">
                                <Link
                                  to={"/latestexoerience"}
                                  state={{ id: item?.id }}
                                  onClick={() =>
                                    handleReletedBusiness(item?.id)
                                  }
                                >
                                  <img src={item?.image} alt="" />
                                </Link>
                              </div>
                              <div className="wt-post-info">
                                <div className="wt-post-meta">
                                  <ul>
                                    {/* <li className="post-date">April 28 2023</li> */}
                                    <li className="post-author">
                                      <Link
                                        to={"/latestexoerience"}
                                        state={{ id: item?.id }}
                                        onClick={() =>
                                          handleReletedBusiness(item?.id)
                                        }
                                      >
                                        {item?.name}
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                                <div className="wt-post-title">
                                  <h4 className="post-title">
                                    <Link
                                      to={"/latestexoerience"}
                                      state={{ id: item?.id }}
                                      onClick={() =>
                                        handleReletedBusiness(item?.id)
                                      }
                                    >
                                      {item?.overview}
                                    </Link>
                                  </h4>
                                </div>
                                <div className="wt-post-readmore">
                                  <a
                                    onClick={() =>
                                      handleReletedBusiness(item?.id)
                                    }
                                    className="site-button-link site-text-primary"
                                  >
                                    {item?.place}
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                      </>

                      {/* {/ Add more items as needed /} */}
                    </OwlCarousel>
                  </div>
                </div>
              </div>
            </div>
            {/* {/ <!-- Related Career END --> /} */}
          </div>
          {/* {/ <!-- CONTENT END --> /} */}
          <Footer />
        </>
      )}
    </>
  );
}
