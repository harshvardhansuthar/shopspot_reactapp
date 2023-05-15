import React, { useState } from "react";
import { useEffect } from "react";
import { GetData } from "../../../ApiHelper/ApiHelper";
import Map from "../Map/Map";
import { useSelector } from "react-redux";
import HeaderMap from "../../commen/HeaderMap";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link, useLocation } from "react-router-dom";
import Header from "../../commen/Header";
import { useForm } from "react-hook-form";
import Loder from "../../commen/Loder";


export default function Business() {
  const [loadMap, setLoadMap] = useState(false);
  const location = useSelector((state) => state?.loctionn?.action?.location);
  const [business, setBusiness] = useState([]);
  const [classActive, setClassActive] = useState(1);
  const [componentLoader, setComponentLoader] = useState(true);
  const [paginationRange, setPaginationRange] = useState([1, 4]);
  const [category, setCategory] = useState([]);
  const [suggestion, setSuggestion] = useState([]);
  const [suggestionValue, setSuggestionValue] = useState();
  const [callApi, setCallApi] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const id = useLocation();
  console.log(location);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const suggestionHandle = (data) => {
    setSuggestionValue(data.target.value);
    setShowSuggestions(true);
  };

  useEffect(() => {
    GetData(`auto-suggestions?text=${suggestionValue}`).then((response) => {
      if (response.status === true) {
        setSuggestion(response.data);
      }
    });
  }, [suggestionValue]);
  const countryNameRedux = useSelector((state) => state?.countryName?.action);

  useEffect(() => {
    setTimeout(() => {
      setLoadMap(true);
    }, 1000);

    GetData("category/get-category").then((response) => {
      if (response.status === true) {
        setCategory(response.data);
        setCallApi(false);
      }
    });

    if (location?.latitude) {
      setComponentLoader(true);
      if (countryNameRedux) {
        GetData(
          `business/get-business?lat=${location?.latitude}&lng=${location?.longitude
          }&page=${classActive}&country=${countryNameRedux}&categoryId=${id?.state?.id ? id?.state?.id : ""
          }`
        ).then((res) => {
          setBusiness(res.data);
          if (res) {
            setComponentLoader(false);
          }
        });
      }
    }
  }, [location, classActive, id?.state?.id, countryNameRedux]);
  console.log(business);

  const submitHandler = (data) => {
    console.log(data);
    GetData(
      `business/filters?name=${data?.name}&CategoryId=${data?.categoryId}&type=${data?.type}&min_distance=${data?.radius1}&max_distance=${data?.radius2}&address=${suggestionValue}&lat=${location.latitude}&lng=${location.longitude}`
    ).then((response) => {
      if (response.status === true) {
        setBusiness(response.data);
        // reset();
        // setSuggestionValue();
      }
    });
  };

  return (
    <>
      {componentLoader ? (
        <Loder />
      ) : (
        <div>
          {/* <!-- CONTENT START --> */}
          <div className="page_wraper">
            <Header class={"header-full-width"} />
            {/* <HeaderMap/> */}
            <div className="page-content">
              {/* <!-- SECTION CONTENT START --> */}
              <div className="section-full">
                <div className="half-map-list p-a20">
                  {/* <!-- Event Banners start here... --> */}
                  <div className="product-details">
                    <div id="carouselExample" className="carousel slide">
                      <div className="carousel-inner">
                        <OwlCarousel
                          className="owl-theme"
                          loop
                          items={1}
                          margin={10}
                          nav
                          navText={[
                            `<i class="fas fa-chevron-left"></i>`,
                            `<i class="fas fa-chevron-right"></i>`,
                          ]}
                          autoPlay={true}
                          autoplayTimeout={3000}
                          dots={false}
                        >
                          {business &&
                            business?.banner?.length > 0 &&
                            business?.banner?.map((item, key) => (
                              <div
                                className="carousel-item shadow-sm active"
                                key={key}
                              >
                                <img
                                  src={item?.image}
                                  className="d-block w-100"
                                  alt="..."
                                />
                              </div>
                            ))}
                          {/* Add more items as needed */}
                        </OwlCarousel>
                      </div>
                    </div>
                    {/* <!-- Event Banners end here... --> */}
                    <div className="wt-listing-full-width">
                      {/* <!--Search Bar--> */}
                      {/* <!--Basic Information--> */}
                      <div className="panel panel-default">
                        <div className="panel-heading wt-panel-heading p-a20 ps-0">
                          <h4
                            className="btn panel-tittle m-a0 border-1 rounded-3 border-secondary"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#Filters"
                            aria-expanded="false"
                            aria-controls="Filters"
                          >
                            <i className="fas fa-filter"></i>Business Filter
                          </h4>
                        </div>
                        <div className="collapse" id="Filters">
                          <div className="panel-body wt-panel-body p-a20 m-b30">
                            <form onSubmit={handleSubmit(submitHandler)}>
                              <div className="row">
                                {/* <!--Job title--> */}

                                <div className="col-xl-4 col-lg-6 col-md-12">
                                  <div className="form-group">
                                    <label>Title</label>
                                    <div className="ls-inputicon-box">
                                      <input
                                        className="form-control"
                                        name="company_name"
                                        type="text"
                                        placeholder="Type Title"
                                        {...register("name", {
                                          required: "value is required",
                                        })}
                                      />
                                      <i className="fs-input-icon fa fa-address-card"></i>
                                    </div>
                                  </div>
                                </div>

                                {/* <!--Job Category--> */}
                                <div className="col-xl-4 col-lg-6 col-md-12">
                                  <div className="form-group city-outer-bx has-feedback">
                                    <label>Category</label>
                                    <div className="ls-inputicon-box">
                                      <select
                                        className="form-select"
                                        data-live-search="true"
                                        title=""
                                        id="j-category"
                                        data-bv-field="size"
                                        {...register("categoryId", {
                                          required: "value is required",
                                        })}
                                      >
                                        <option disabled selected value="">
                                          Select Category
                                        </option>
                                        {category?.map((data) => (
                                          <option value={data?.id}>
                                            {data?.name}
                                          </option>
                                        ))}
                                      </select>
                                      <i className="fs-input-icon fa fa-border-all"></i>
                                    </div>
                                  </div>
                                </div>

                                {/* <!--Job Type--> */}
                                <div className="col-xl-4 col-lg-6 col-md-12">
                                  <div className="form-group">
                                    <label>Type</label>
                                    <div className="ls-inputicon-box">
                                      <select
                                        className="form-select"
                                        data-live-search="true"
                                        title=""
                                        id="s-category"
                                        data-bv-field="size"
                                        {...register("type", {
                                          required: "value is required",
                                        })}
                                      >
                                        <option
                                          className="bs-title-option"
                                          value=""
                                        >
                                          Select Type
                                        </option>
                                        <option value="new">New</option>
                                        <option value="popular">Popular</option>
                                        <option value="tranding">
                                          Tranding
                                        </option>
                                      </select>
                                      <i className="fs-input-icon fa fa-file-alt"></i>
                                    </div>
                                  </div>
                                </div>

                                {/* <!--Location--> */}
                                <div className="col-xl-12 col-lg-6 col-md-12">
                                  <div className="form-group">
                                    <label>Location</label>
                                    <div className="ls-inputicon-box">
                                      <input
                                        className="form-control"
                                        name="company_Email"
                                        type="text"
                                        placeholder="Type Address"
                                        value={suggestionValue}
                                        // {...register("location")}
                                        onChange={(e) => suggestionHandle(e)}
                                      />
                                      <i className="fs-input-icon fa fa-map-marker-alt"></i>
                                    </div>
                                    {showSuggestions &&
                                      suggestion &&
                                      suggestion?.length > 0 &&
                                      suggestion?.map((data) => {
                                        return (
                                          <div
                                            onClick={() => {
                                              setSuggestionValue(data);
                                              setShowSuggestions(false);
                                            }}
                                          >
                                            {data}
                                          </div>
                                        );
                                      })}
                                  </div>
                                </div>

                                {/* <!--Radius--> */}

                                <div className="col-md-12">
                                  <div className="form-group">
                                    <label>Radius min:</label>

                                    <div className="twm-radius-range">
                                      <input
                                        id="ex2"
                                        type="text"
                                        className="span2"
                                        data-slider-min="10"
                                        data-slider-max="100"
                                        data-slider-step="5"
                                        data-slider-value="[20,80]"
                                        {...register("radius1")}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <label>Radius max</label>

                                    <div className="twm-radius-range">
                                      <input
                                        id="ex2"
                                        type="text"
                                        className="span2"
                                        data-slider-min="10"
                                        data-slider-max="100"
                                        data-slider-step="5"
                                        data-slider-value="[20,80]"
                                        {...register("radius2")}
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="col-lg-12 col-md-12">
                                  <div className="text-left">
                                    <button
                                      type="submit"
                                      className="site-button"
                                    >
                                      Search Business
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="wt-searchReasult-divider"></div>

                    <div className="p-a30 side-bar-opposite">
                      <div className="wt-listing-container">
                        <div className="row">
                          {/* <!--Block one--> */}
                          {business?.business?.rows?.length == 0 ? (
                            <h1>No business in this country</h1>
                          ) : (
                            business &&
                            business?.business?.rows?.length > 0 &&
                            business?.business?.rows?.map((item, key) => (
                              <div className="col-lg-6 col-md-12 m-b30">
                                <div className="twm-jobs-grid-style1">
                                  <div className="twm-media">
                                    <img src={item?.business_licence} alt="#" />
                                  </div>
                                  <span className="twm-job-post-duration">
                                    {item?.Category?.name}
                                  </span>
                                  <div className="twm-mid-content">
                                    <Link
                                      to={
                                        item?.type?.toLowerCase() ===
                                          "freelance"
                                          ? "/freelancedetail"
                                          : `/businessdetail?id=${item?.id}`
                                      }
                                      state={{ id: item?.id }}
                                      className="twm-job-title"
                                    >
                                      <h4>{item.name}</h4>
                                    </Link>
                                    <p className="twm-job-address">
                                      {item?.address}
                                    </p>
                                  </div>
                                  <div className="twm-right-content">
                                    <a className="twm-jobs-browse site-text-primary">
                                      {item?.distance?.toFixed(2) +
                                        " " +
                                        "KM Nearby you"}
                                    </a>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>

                        <div className="pagination-outer">
                          <div className="pagination-style1">
                            <ul className="clearfi'x">
                              <li className="prev">
                                <a
                                  // className={classActive == 1 ? "d-none" : ""}
                                  onClick={() => {
                                    if (classActive > 1) {
                                      setClassActive(classActive - 1);
                                    }
                                    if (paginationRange[0] > 1) {
                                      setPaginationRange([
                                        paginationRange[0] - 1,
                                        paginationRange[1] - 1,
                                      ]);
                                    }
                                  }}
                                >
                                  <span>
                                    {" "}
                                    <i className="fa fa-angle-left"></i>{" "}
                                  </span>
                                </a>
                              </li>
                              {business &&
                                business?.totalPages?.length > 0 &&
                                business?.totalPages
                                  .slice(
                                    paginationRange[0] - 1,
                                    paginationRange[1]
                                  )
                                  .map((item, key) => (
                                    <li
                                      key={key}
                                      className={
                                        classActive === item ? "active" : ""
                                      }
                                    >
                                      <a
                                        onClick={() => {
                                          setClassActive(item);
                                        }}
                                      >
                                        {item}
                                      </a>
                                    </li>
                                  ))}
                              <li className="next">
                                <a
                                  onClick={() => {
                                    if (
                                      classActive < business?.totalPages?.length
                                    ) {
                                      setClassActive(classActive + 1);
                                      setPaginationRange([
                                        paginationRange[0] + 1,
                                        paginationRange[1] + 1,
                                      ]);
                                      console.log(
                                        "..................",
                                        paginationRange[0] - 1,
                                        paginationRange[1]
                                      );
                                    }
                                  }}
                                >
                                  <span>
                                    {" "}
                                    <i className="fa fa-angle-right"></i>{" "}
                                  </span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Right part --> */}
                    <div className="half-map-section">
                      <div
                        className="user-msg-list-btn-outer d-none"
                        style={{
                          position: "absolute",
                          top: "0px",
                          right: "260px",
                          zIndex: 99,
                        }}
                      >
                        <button className="site-button py-2 me-1">Close</button>
                        <button className="site-button py-2 ms-1">
                          View Map
                        </button>
                      </div>

                      <div id="map-container">
                        <div id="map" data-map-zoom="9">
                          {/* <!-- map goes here --> */}
                          <div className="map-height">
                            {loadMap === true && <Map business={business} />}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- Right part END --> */}
                  </div>
                  {/* <!-- SECTION CONTENT END  --> */}
                </div>
              </div>
              {/* <!-- SECTION CONTENT END  --> */}
            </div>
          </div>
        </div >
      )
      }
    </>
  );
}
