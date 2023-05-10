import React, { useState, useEffect } from "react";
import Layout from "../../commen/Layout";
import { MultiSelect } from "react-multi-select-component";
import {
  GetData,
  GetDataWithToken,
  PostDataWithToken,
} from "../../../ApiHelper/ApiHelper";
import Loder from "../../commen/Loder";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { ModalBody, Modal } from "reactstrap";
import {
  actionBusinessDetailId,
  businessDetailIdd,
  countryName,
} from "../../../store/Action";
import { StreetViewPanorama } from "react-google-maps";

export default function Deshboard() {
  // const [resentData, setResentData] = useState([]);
  // const [findShopId, setFindShopId] = useState("");
  // const [showSuggestions, setShowSuggestions] = useState(false);
  // const [colorRed, setColorRed] = useState(true);
  const [wishListColor, setWishListColor] = useState({});
  const [resentData, setResentData] = useState([]);
  const [findShopId, setFindShopId] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [product, setProduct] = useState([]);
  const [images, setImages] = useState([]);
  const [info, setInfo] = useState([]);
  const [productModal, setProductModal] = useState(false);
  const toggleProductModal = () => setProductModal(!productModal);
  const [selected, setSelected] = useState([]);
  // const [selectedOptions, setSelectedOptions] = useState([]);
  const [option, setOption] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentLocationName, setCurrentLocationName] = useState("");
  const [deshboardData, setDeshboardData] = useState([]);
  const [componentLoader, setComponentLoader] = useState(true);

  const location = useSelector((state) => state?.loctionn?.action?.location);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const id = useLocation();

  const countryNameRedux = useSelector((state) => state?.countryName?.action);

  console.log(countryNameRedux);

  useEffect(() => {
    GetData("category/get-category")
      .then((data) => {
        if (data.status == true) {
          setComponentLoader(false);
          return data.data;
        }
      })
      .then((data) => {
        setOption(data);
      });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (countryNameRedux) {
          GetData(
            `business/customer-dashboard?lat=${latitude}&lng=${longitude}&country=${countryNameRedux}`
          ).then((data) => {
            console.log(data.data);
            setDeshboardData(data.data);
          });
        }

        setCurrentLocation({ latitude: latitude, longitude: longitude });
      },
      (error) => console.error(error)
    );
  }, [countryNameRedux]);
  // const handleFindShop = async () => {
  //   await GetData(
  //     `business/customer-dashboard?=address${query}`
  //   ).then((data) => {
  //     console.log(data.data);
  //     setDeshboardData(data.data);
  //   });
  // }

  useEffect(() => {
    if (currentLocation) {
      GetData(
        `my-location?lat=${currentLocation.latitude}&lng=${currentLocation.longitude}`
      ).then((response) => {
        setCurrentLocationName(response.data);
      });
    }
  }, [currentLocation]);

  const optionLabels =
    option &&
    option?.length > 0 &&
    option?.map((item) => {
      return { label: item.name, value: item.id };
    });

  const handleSelectedChanged = (selected) => {
    setSelected(selected);
  };

  useEffect(() => {
    if (query?.length > 0) {
      GetData(`auth/search-business?name=${query}`).then((data) => {
        console.log(data);
        setSuggestions(data.data);
      });

      if (query.length > 0) {
        GetData();
      } else {
        setSuggestions([]);
      }
    }
    if (countryNameRedux != undefined) {
      GetData(
        `auth/search-business?name=${query}&country=${countryNameRedux}`
      ).then((res) => {
        setResentData(res.data);
      });
    }

    GetData(
      `auth/search-business?name=${query}&country=${countryNameRedux}`
    ).then((res) => {
      setResentData(res.data);
    });
  }, [query, countryNameRedux]);

  const handleQueryChange = (event) => {
    setShowSuggestions(true);
    setQuery(event.target.value);
  };

  const handleSetId = (id) => {
    // console.log(id);
    //  localStorage.setItem("businessId", JSON.stringify(id));

    // const businessId = JSON.parse(localStorage.getItem("businessId"));
    // dispatch(actionBusinessDetailId.businessDetailId(businessId));

    // const businessId = JSON.parse(localStorage.getItem("businessId"))
    // dispatch(actionBusinessDetailId.businessDetailId(businessId))
    navigate("/businessdetail", {
      state: {
        id: id,
      },
    });
  };

  const handleproductDetail = (id) => {
    setComponentLoader(true);
    GetDataWithToken(`product/product-details/${id}`).then((res) => {
      let img = JSON.parse(res?.data?.data?.images);
      let info = JSON.parse(res?.data?.data?.info);
      setImages(img);
      setInfo(info);
      setProduct(res?.data?.data);
      setWishListColor(res?.data?.wishlist);
      if (res) {
        toggleProductModal();
        setComponentLoader(false);
      }
    });
  };
  const keys = Object?.keys(info);

  const FormetDate = (data) => {
    const date1 = JSON.parse(data);
    const date = new Date(date1.Date);
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    const formattedDate = date
      .toLocaleDateString("en-US", options)
      .replace(/(\d+)\/(\w+)\/(\d+)/, "$1/$2/$3".toLowerCase());

    return formattedDate; // Output: "3/may/2023"
  };

  // const handleWishList = (id) => {
  //   GetDataWithToken(`product/add-and-delete-whislist?productId=${id}`)
  // }
  const handleWishList = async (id) => {
    try {
      const response = await GetDataWithToken(
        `product/add-and-delete-wishlist?productId=${id}`
      );
      console.log(response);
      if (response.data) {
        setWishListColor(true); // do something with the response
      } else {
        setWishListColor(false); // do something with the response
      }
    } catch (error) {
      console.error(error); // handle the error
    }
  };

  return (
    <>
      {componentLoader ? (
        <Loder />
      ) : (
        <Layout>
          <div className="page-content">
            {/* <!--Banner Start--> */}
            <div
              className="twm-home2-banner-section site-bg-gray bg-cover"
              style={{
                backgroundImage: "url(images/main-slider/slider2/bg1.jpg)",
              }}
            >
              <div className="row">
                {/* <!--Left Section--> */}
                <div className="col-xl-6 col-lg-6 col-md-12">
                  <div className="twm-bnr-left-section">
                    <div className="twm-bnr-title-large">
                      Find <span className="site-text-primary"> Shopspot</span>
                      <br />
                      Nearby Services
                      {/* <!-- <br />
                      <small> Porducts and Services</small> --> */}
                    </div>
                    <div className="twm-bnr-discription">
                      Find Shops that match your interests with us. Shopspot
                      provides you to your Place.
                    </div>
                    <Link to={"/business"} className="site-button">
                      Get Started
                    </Link>
                  </div>
                </div>

                {/* <!--right Section--> */}
                <div className="col-xl-6 col-lg-6 col-md-12 twm-bnr-right-section">
                  <div className="twm-bnr2-right-content">
                    <div className="twm-img-bg-circle-area2">
                      <div className="twm-outline-ring-wrap">
                        <div className="twm-outline-ring-dott-wrap">
                          <span className="outline-dot-1"></span>
                          <span className="outline-dot-2"></span>
                          <span className="outline-dot-3"></span>
                          {/* <!--Samll Ring Left--> */}
                          <div className="twm-small-ring-l scale-up-center"></div>
                        </div>
                      </div>
                    </div>

                    <div className="twm-home-2-bnr-images">
                      <div className="bnr-image-1">
                        <img
                          src="images/main-slider/slider2/dashboard.jpg"
                          alt=""
                        />
                      </div>
                      <div className="bnr-image-2">
                        <img
                          src="images/main-slider/slider2/right-pic-2.jpg"
                          alt=""
                        />
                      </div>
                      <div className="twm-small-ring-2 scale-up-center"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!--Search Bar--> */}
            <div className="twm-search-bar-2-wrap">
              <div className="container">
                <div className="twm-search-bar-2-inner">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="twm-bnr-search-bar position-relative">
                        <form>
                          <div class="row">
                            {/* <!--Location--> */}
                            <div class="form-group col-xl-9 col-lg-9 col-md-9">
                              <div class="form-group">
                                <label>Search</label>
                                <div class="twm-inputicon-box">
                                  <input
                                    name="Search"
                                    type="text"
                                    required
                                    class="form-control"
                                    placeholder="Search Restaurant, Hotels, Food, Business..."
                                    value={query}
                                    onChange={handleQueryChange}
                                  />
                                  {/* <!-- <i class="twm-input-icon fas fa-search"></i> --> */}
                                </div>
                              </div>
                            </div>

                            {/* <!--Find job btn--> */}
                            <div class="form-group col-xl-3 col-lg-6 col-md-6">
                              <Link
                                type="button"
                                class="site-button text-center"
                                to={query ? "/businessdetail" : "#"}
                                state={{ id: findShopId }}
                              >
                                Find Shop
                              </Link>
                            </div>
                          </div>
                        </form>
                        {/* Search everything start here... */}

                        {query?.length == 0 && (
                          <div className="search-history show">
                            <div className="Recent-search">
                              <h4 className="mb-3">Recent search</h4>
                              <div className="d-flex flex-wrap">
                                {/* {resentData &&
                                  resentData?.business?.length > 0 &&
                                  resentData?.business?.map((item, key) => (
                                    <Link
                                      to={"/businessdetail"}
                                      state={{ id: item?.id }}
                                      className="btn btn-light rounded-pill me-2 mb-2 d-flex align-items-center justify-content-center"
                                    >
                                      <span className="search-img me-2">
                                        <img
                                          className=""
                                          src={item?.business_licence}
                                          alt=""
                                        />
                                      </span>
                                      {item?.name}
                                    </Link>
                                  ))} */}
                              </div>
                            </div>
                            <div className="popular-search mt-4">
                              <h4 className="mb-3">Popular search</h4>
                              <div className="d-flex flex-wrap">
                                {/* {resentData &&
                                  resentData?.product?.length > 0 &&
                                  resentData?.product?.map((item, key) => (
                                    <Link className="btn btn-light rounded-pill me-2 mb-2 d-flex align-items-center justify-content-center">
                                      <span className="search-img me-2">
                                        <img
                                          className=""
                                          src={item?.images && JSON?.parse(item?.images)[0]}
                                          alt=""
                                        />
                                      </span>
                                      {item?.name}
                                    </Link>))}
                                {resentData &&
                                  resentData?.category?.length > 0 &&
                                  resentData?.category?.map((item, key) => (
                                    <button className="btn btn-light rounded-pill me-2 mb-2 d-flex align-items-center justify-content-center">
                                      <span className="search-img me-2">
                                        <img
                                          className=""
                                          src={item?.image}
                                          alt=""
                                        />
                                      </span>
                                      {item?.name}
                                    </button>))}
                                {resentData &&
                                  resentData?.carrer?.length > 0 &&
                                  resentData?.carrer?.map((item, key) => (
                                    <button className="btn btn-light rounded-pill me-2 mb-2 d-flex align-items-center justify-content-center">
                                      <span className="search-img me-2">
                                        <img
                                          className=""
                                          // src="images/category/Group 1900.png"
                                          alt=""
                                        />
                                      </span>
                                      {item?.post_name}
                                    </button>))}
                                {resentData &&
                                  resentData?.experience?.length > 0 &&
                                  resentData?.experience?.map((item, key) => (
                                    <button className="btn btn-light rounded-pill me-2 mb-2 d-flex align-items-center justify-content-center">
                                      <span className="search-img me-2">
                                        <img
                                          className=""
                                          src={item?.image}
                                          alt=""
                                        />
                                      </span>
                                      {item?.name}
                                    </button>))} */}
                              </div>
                            </div>
                            <div className="search-every mt-4">
                              <h4 className="my-3">Business</h4>
                              <div className="d-flex flex-wrap">
                                {suggestions?.business?.length > 0 &&
                                  suggestions?.business?.map((item, key) => (
                                    <Link
                                      to={"/businessdetail"}
                                      state={{ id: item?.id }}
                                      className="btn btn-light rounded-pill me-2 mb-2 d-flex align-items-center justify-content-center"
                                    >
                                      <span className="search-img me-2">
                                        <img
                                          className=""
                                          src={item?.business_licence}
                                          alt="#"
                                        />
                                      </span>
                                      {item?.name}
                                    </Link>
                                  ))}
                              </div>

                              <h4 className="my-3">Carrer</h4>
                              <div className="d-flex flex-wrap">
                                {suggestions?.carrer?.length > 0 &&
                                  suggestions?.carrer?.map((item, key) => (
                                    <Link
                                      to={"/careerdetail"}
                                      state={{ id: item?.id }}
                                      className="btn btn-light rounded-pill me-2 mb-2 d-flex align-items-center justify-content-center"
                                    >
                                      <span className="search-img me-2">
                                        <img
                                          className=""
                                          // src={'images/banner/logo(1).png'}
                                          alt="#"
                                        />
                                      </span>
                                      {item?.post_name}
                                    </Link>
                                  ))}
                              </div>

                              <h4 className="my-3">Categories</h4>
                              <div className="d-flex flex-wrap">
                                {suggestions?.category?.length > 0 &&
                                  suggestions?.category?.map((item, key) => (
                                    <Link
                                      to={"/businessdetail"}
                                      state={{ id: item?.id }}
                                      className="btn btn-light rounded-pill me-2 mb-2 d-flex align-items-center justify-content-center"
                                    >
                                      <span className="search-img me-2">
                                        <img
                                          className=""
                                          src={item?.image}
                                          alt="#"
                                        />
                                      </span>
                                      {item?.name}
                                    </Link>
                                  ))}
                              </div>

                              <h4 className="my-3">Products</h4>
                              <div className="d-flex flex-wrap">
                                {suggestions?.product?.length > 0 &&
                                  suggestions?.product?.map((item, key) => (
                                    <Link className="btn btn-light rounded-pill me-2 mb-2 d-flex align-items-center justify-content-center">
                                      <span className="search-img me-2">
                                        <img
                                          className=""
                                          src={
                                            item?.images &&
                                            JSON?.parse(item?.images)[0]
                                          }
                                          alt=""
                                        />
                                      </span>
                                      {item?.name}
                                    </Link>
                                  ))}
                              </div>

                              <h4 className="my-3">Experience</h4>
                              <div className="d-flex flex-wrap">
                                {suggestions?.experience?.length > 0 &&
                                  suggestions?.experience?.map((item, key) => (
                                    <Link className="btn btn-light rounded-pill me-2 mb-2 d-flex align-items-center justify-content-center">
                                      <span className="search-img me-2">
                                        <img
                                          className=""
                                          src={item?.image}
                                          alt=""
                                        />
                                      </span>
                                      {item?.name}
                                    </Link>
                                  ))}
                              </div>
                            </div>
                          </div>
                        )}
                        {/* Search everything end here...  */}
                      </div>
                    </div>
                  </div>
                  <div>
                    {showSuggestions &&
                      suggestions &&
                      suggestions?.length > 0 &&
                      suggestions?.map((item, key) => (
                        <ul key={key}>
                          <li
                            onClick={async (e) => {
                              await setQuery(e.target.innerHTML);
                              setFindShopId(item?.id);
                              setShowSuggestions(false);
                            }}
                          >
                            {item.name}
                          </li>
                        </ul>
                      ))}
                  </div>
                  {/* <!-- Current Location start here... --> */}
                  <div className="row">
                    <div className="col-12">
                      <form>
                        <div className="form-floating Current-Location mb-3">
                          <span
                            className="form-select pb-0 bg-white border-bottom"
                            id="CurrentLocation"
                            aria-label="Floating label select example"
                          >
                            <option selected className="ms-4">
                              {/* near nagnechi mandir, Pawan Puri, Bikaner */}
                              {currentLocationName}
                            </option>
                          </span>
                          <label for="CurrentLocation">Your Location</label>
                          <div className="current-location-img">
                            <img
                              className="w-100"
                              src="./images/location-current-svgrepo-com.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* <!-- Current Location end here... --> */}
                  <div className="twm-bnr-popular-search">
                    <span className="twm-title">Popular Searches:</span>
                    <a>Bakery</a> ,<a>Hotel</a> ,<a>Music and DJ</a> ,
                    <a>Architects</a> ...
                  </div>
                </div>
              </div>
            </div>
            {/* <!--Banner End--> */}

            {/* <!-- HOW IT WORK SECTION START --> */}
            <div className="section-full p-t120 site-bg-white twm-how-it-work-area2">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4 col-md-12">
                    {/* <!-- TITLE START--> */}
                    <div className="section-head left wt-small-separator-outer">
                      <div className="wt-small-separator site-text-primary">
                        <div>How It Works</div>
                      </div>
                      <h2 className="wt-title">
                        Follow our steps we will help you.
                      </h2>
                    </div>
                    <ul className="description-list">
                      <li>
                        <i className="feather-check"></i>
                        list your product
                      </li>
                      <li>
                        <i className="feather-check"></i>
                        target customers
                      </li>
                      <li>
                        <i className="feather-check"></i>
                        user-friendly platform
                      </li>
                      <li>
                        <i className="feather-check"></i>
                        find what you’ re looking for
                      </li>
                    </ul>
                    {/* <!-- TITLE END--> */}
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <div className="twm-w-process-steps-2-wrap">
                      <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6">
                          <div className="twm-w-process-steps-2">
                            <div className="twm-w-pro-top bg-clr-sky-light">
                              <span className="twm-large-number text-clr-sky">
                                01
                              </span>
                              <h4 className="twm-title mt-0 ms-0">
                                Register
                                <br />
                                Your Account
                              </h4>
                              <p>
                                You need to create an account to find the best
                                and preferred Place.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6">
                          <div className="twm-w-process-steps-2">
                            <div className="twm-w-pro-top bg-clr-yellow-light">
                              <span className="twm-large-number text-clr-yellow">
                                02
                              </span>
                              <h4 className="twm-title mt-0 ms-0">
                                Search <br />
                                Your Place
                              </h4>
                              <p>
                                You need to create an account to find the best
                                and preferred Place.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6">
                          <div className="twm-w-process-steps-2">
                            <div className="twm-w-pro-top bg-clr-pink-light">
                              <span className="twm-large-number text-clr-pink">
                                03
                              </span>

                              <h4 className="twm-title mt-0 ms-0">
                                Apply <br />
                                For Dream Place
                              </h4>
                              <p>
                                You need to create an account to find the best
                                and preferred Place.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6">
                          <div className="twm-w-process-steps-2">
                            <div className="twm-w-pro-top bg-clr-green-light">
                              <span className="twm-large-number text-clr-green">
                                04
                              </span>
                              <h4 className="twm-title mt-0 ms-0">
                                Upload <br />
                                Your Resume
                              </h4>
                              <p>
                                You need to create an account to find the best
                                and preferred Place.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="twm-how-it-work-section"></div>
              </div>
            </div>
            {/* <!-- HOW IT WORK SECTION END --> */}

            {/* <!-- Popular category SECTION START --> */}
            <div className="section-full p-t70 p-b70 site-bg-white twm-jobatglance-wrap8">
              <div className="container">
                <div className="wt-separator-two-part">
                  <div className="row wt-separator-two-part-row">
                    <div className="col-xl-6 col-lg-6 col-md-12 wt-separator-two-part-left">
                      {/* <!-- TITLE START--> */}
                      <div className="section-head left wt-small-separator-outer">
                        <div className="wt-small-separator site-text-primary">
                          <div>Browse By Category</div>
                        </div>
                        <h2 className="wt-title">
                          Find the Category that’s perfect for you.
                        </h2>
                      </div>
                      {/* <!-- TITLE END--> */}
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12 wt-separator-two-part-right text-right">
                      <Link to={"/allcategory"} className="site-button">
                        View All Category
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="twm-jobatglance-h8">
                  <div className="row justify-content-start">
                    {/* <!--1--> */}
                    {deshboardData?.category?.length == 0 ? (
                      <h1>
                        There is no Business in this country please salect
                        another country
                      </h1>
                    ) : (
                      deshboardData &&
                      deshboardData.category?.map((item, i) => (
                        <div className="col-lg-3 col-md-4 col-12">
                          <div className="job-categories-home-8 mb-3">
                            <div className="twm-media cat-bg-clr-3">
                              <img src={item.image} alt="" />
                            </div>
                            <Link to={"/business"} state={{ id: item.id }}>
                              {item.name}
                            </Link>
                            <div className="twm-content">
                              <div className="twm-jobs-available">
                                {item?.Businesses?.length + " Vendor"}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Popular category SECTION END --> */}

            {/* <!-- BUSINESS START --> */}

            <div className="section-full p-t120 p-b90 site-bg-gray twm-bg-ring-wrap2">
              <div className="twm-bg-ring-right"></div>
              <div className="twm-bg-ring-left"></div>

              <div className="container">
                <div className="wt-separator-two-part">
                  <div className="row wt-separator-two-part-row">
                    <div className="col-xl-6 col-lg-6 col-md-12 wt-separator-two-part-left">
                      {/* <!-- TITLE START--> */}
                      <div className="section-head left wt-small-separator-outer">
                        <div className="wt-small-separator site-text-primary">
                          <div>All Business</div>
                        </div>
                        <h2 className="wt-title">
                          Get Your 100+ Trusted Vendors in One Place
                        </h2>
                      </div>
                      {/* <!-- TITLE END--> */}
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12 wt-separator-two-part-right text-right">
                      <Link to={"/business"} className="site-button">
                        Browse All Business
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="section-content">
                  <div className="twm-jobs-grid-wrap">
                    <div className="row">
                      {deshboardData?.business?.length == 0 ? (
                        <h1>
                          There is no business in this country please salect
                          another country
                        </h1>
                      ) : (
                        deshboardData &&
                        deshboardData?.business?.length > 0 &&
                        deshboardData?.business?.map((item, i) => (
                          <div className="col-lg-4 col-md-6">
                            <div className="twm-jobs-grid-style1 m-b30">
                              <div className="twm-media">
                                <img src={item?.images} alt="#" />
                              </div>
                              <span className="twm-job-post-duration">
                                {item?.Category?.name}
                              </span>
                              <div className="twm-mid-content">
                                <a
                                  onClick={() => handleSetId(item.id)}
                                  className="twm-job-title cursor-pointer"
                                >
                                  <h4>{item?.name}</h4>
                                </a>
                                <p className="twm-job-address">
                                  {item?.address}
                                </p>
                                {/* <!-- <a
                    href="https://themeforest.net/user/thewebmax/portfolio"
                    className="twm-job-websites site-text-primary"
                    >https://thewebmax.com</a
                  > --> */}
                              </div>
                              <div className="twm-right-content">
                                <a className="twm-jobs-browse site-text-primary cursor-pointer">
                                  {item?.distance?.toFixed(2) + " " + "KM"}
                                </a>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- BUSINESS END --> */}

            {/* <!-- Related Products START --> */}
            <div className="section-full p-t90 p-b90">
              <div className="container">
                {/* <!-- TITLE START--> */}
                <div className="section-head center wt-small-separator-outer">
                  <div className="wt-small-separator site-text-primary">
                    <div>Our Products</div>
                  </div>
                  <h2 className="wt-title">Trending Products</h2>
                </div>
                {/* <!-- TITLE END--> */}

                <div className="section-content">
                  <div className="twm-blog-post-3-outer-wrap">
                    <div className="row d-flex justify-content-center">
                      {deshboardData?.product?.length == 0 ? (
                        <h1>
                          There is no product in this country please salect
                          another country
                        </h1>
                      ) : (
                        deshboardData &&
                        deshboardData?.product?.length > 0 &&
                        deshboardData?.product?.map((item, i) => (
                          <div className="col-lg-4 col-md-6 col-sm-12">
                            {/* <!--Block one--> */}
                            <div className="blog-post twm-blog-post-3-outer">
                              <div className="wt-post-media">
                                <a onClick={() => handleproductDetail(item.id)}>
                                  <img
                                    className="product-img"
                                    src={JSON.parse(item.images)?.[0]}
                                    alt=""
                                  />
                                </a>
                              </div>
                              <div className="wt-post-info">
                                <div className="wt-post-meta product-detail">
                                  <ul>
                                    <li className="post-author">
                                      <span className="twm-media">
                                        <img
                                          src={JSON.parse(item.images)?.[0]}
                                          alt="#"
                                        />
                                      </span>
                                      {"By" + "  "}
                                      <a className="ms-1">
                                        {"   " + item?.Business?.name}
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                                <div className="wt-post-title">
                                  <h4 className="post-title">
                                    <a>{item?.name}</a>
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Related Products END --> */}

            {/* <!-- Business Event Start --> */}
            <div className="section-full p-t120 p-b90 site-bg-gray twm-bg-ring-wrap2">
              <div className="twm-bg-ring-right"></div>
              <div className="twm-bg-ring-left"></div>
              <div className="container">
                <div className="wt-separator-two-part">
                  <div className="row wt-separator-two-part-row">
                    <div className="col-xl-8 col-lg-8 col-md-12 wt-separator-two-part-left">
                      {/* <!-- TITLE START--> */}
                      <div className="section-head left wt-small-separator-outer">
                        <div className="wt-small-separator site-text-primary">
                          <div>New Events</div>
                        </div>
                        <h2 className="wt-title">
                          Get Your Vendors Trusted Events in One Place
                        </h2>
                      </div>
                      {/* <!-- TITLE END--> */}
                    </div>
                  </div>
                </div>

                <div className="section-content">
                  <div className="twm-jobs-grid-wrap">
                    <div className="row">
                      {deshboardData?.event?.length == 0 ? (
                        <h1>
                          {" "}
                          There is no event in this country please salect
                          another country
                        </h1>
                      ) : (
                        deshboardData &&
                        deshboardData?.event?.length > 0 &&
                        deshboardData?.event?.map((item, key) => (
                          <div className="col-lg-4 col-md-6" key={key}>
                            <div className="twm-jobs-grid-style1 m-b30 p-0 event-card">
                              <div className="event-img">
                                <img src={JSON.parse(item?.image)[0]} alt="" />
                              </div>
                              <div className="card-body position-relative">
                                <div className="twm-media">
                                  <img
                                    src={item?.Business?.business_licence}
                                    alt="#"
                                  />
                                </div>
                                <h5>{item?.name}</h5>
                                <p>{"Artist :" + " " + item?.artists}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Business Event END --> */}

            {/* <!-- Featured Freelance SECTION START --> */}
            <div className="section-full p-t120 p-b90 site-bg-white twm-hpage-6-featured-outer">
              {/* <!-- TITLE START--> */}
              <div className="section-head center wt-small-separator-outer">
                <div className="wt-small-separator site-text-primary">
                  <div>Top Careers</div>
                </div>
                <h2 className="wt-title">Featured Career's</h2>
              </div>
              {/* <!-- TITLE END--> */}

              <div className="twm-hpage-6-featured-area">
                <div className="twm-hpage-6-featured-bg-warp">
                  <div className="twm-media">
                    <img src="images/home-6/banner-pic.png" alt="#" />
                  </div>
                </div>

                <div className="container">
                  <div className="twm-hpage-6-featured-content-warp m-b30">
                    <div className="row">
                      <div className="col-lg-8 col-md-12">
                        <div className="row">
                          {deshboardData?.career?.length == 0 ? (
                            <h1>
                              {" "}
                              There is no career in this country please salect
                              another country
                            </h1>
                          ) : (
                            deshboardData &&
                            deshboardData?.career?.length > 0 &&
                            deshboardData?.career?.map((item, key) => (
                              <div className="col-lg-6 col-md-6 m-b30">
                                <div className="hpage-6-featured-block">
                                  <div className="inner-content" key={key}>
                                    <div className="mid-content">
                                      <div className="company-logo">
                                        <img
                                          src={item?.Business?.business_licence}
                                          alt="#"
                                        />
                                      </div>
                                      <div className="company-info">
                                        <a className="company-name">
                                          {item?.Business?.name}
                                        </a>
                                        <p className="company-address">
                                          {item?.address}.
                                        </p>
                                      </div>
                                    </div>
                                    <div className="bottom-content">
                                      <h4 className="job-name-title">
                                        {item?.post_name}
                                      </h4>
                                    </div>
                                    <div className="aply-btn-area">
                                      <Link
                                        to={"/careerdetail"}
                                        state={{ id: item.id }}
                                        className="aplybtn"
                                      >
                                        <i className="fas fa-chevron-right"></i>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-center job-categories-btn">
                      <Link to={"/careerlist"} className="site-button">
                        Show All Freelance
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Featured Freelance SECTION END --> */}

            {/* <!-- OUR EXPERIENCE START --> */}
            <div className="section-full p-t120 p-b90 site-bg-gray">
              <div className="container">
                {/* <!-- TITLE START--> */}
                <div className="section-head center wt-small-separator-outer">
                  <div className="wt-small-separator site-text-primary">
                    <div>Our Experience</div>
                  </div>
                  <h2 className="wt-title">Latest Experience</h2>
                </div>
                {/* <!-- TITLE END--> */}

                <div className="section-content">
                  <div className="twm-blog-post-1-outer-wrap">
                    <div className="owl-carousel d-block twm-la-home-blog owl-btn-bottom-center">
                      {
                        <div className="item">
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
                            {deshboardData &&
                              deshboardData?.experience?.length > 0 &&
                              deshboardData?.experience?.map((item, key) => (
                                <div
                                  className="blog-post twm-blog-post-1-outer"
                                  key={key}
                                >
                                  <div className="wt-post-media">
                                    <Link
                                      to={"/latestexoerience"}
                                      state={{ id: item?.id }}
                                    >
                                      <img src={item?.image} alt="" />
                                    </Link>
                                  </div>
                                  <div className="wt-post-info">
                                    <div className="wt-post-meta">
                                      <ul>
                                        {/* <!-- <li className="post-date">April 28 2023</li> --> */}
                                        <li className="post-author">
                                          <Link
                                            to={"/latestexoerience"}
                                            state={{ id: item?.id }}
                                          >
                                            {item?.name}
                                          </Link>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="wt-post-title">
                                      <h4 className="post-title">
                                        <a>{item?.description}</a>
                                      </h4>
                                    </div>
                                    <div className="wt-post-readmore">
                                      <a className="site-button-a site-text-primary">
                                        {item?.place}
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            {/* Add more items as needed */}
                          </OwlCarousel>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- OUR EXPERIENCE END --> */}

            {/* <!-- CAREER SECTION START --> */}
            <div className="section-full p-t120 p-b90 site-bg-white twm-hpage-6-featured-outer">
              {/* <!-- TITLE START--> */}
              <div className="section-head center wt-small-separator-outer">
                <div className="wt-small-separator site-text-primary">
                  <div>Top Freelance</div>
                </div>
                <h2 className="wt-title">Our Freelance</h2>
              </div>
              {/* <!-- BLOG SECTION START --> */}
              <div className="section-content">
                <div className="container">
                  <div className="row">
                    {deshboardData?.freelance?.length == 0 ? (
                      <h1>
                        {" "}
                        There is no career in this freelance please salect
                        another country
                      </h1>
                    ) : (
                      deshboardData &&
                      deshboardData?.freelance?.length > 0 &&
                      deshboardData?.freelance?.map((item, key) => (
                        <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                          <div className="activity card bg-light">
                            <div className="event-img">
                              <img src={JSON.parse(item?.images)[0]} alt="" />
                            </div>
                            <div className="card-body position-relative">
                              <div className="event-logo">
                                <img src={item?.business_licence} alt="" />
                              </div>
                              <span className="badge bg-primary rounded-pill mb-2">
                                {JSON.parse(item?.info).type}
                              </span>
                              <h5 className="text-truncate">{item?.name}</h5>
                              <div className="d-flex align-items-start justify-content-between">
                                <p>{FormetDate(item?.info)}</p>
                                <span className="ms-auto text-bold">
                                  {JSON.parse(item?.info).Available}
                                </span>
                              </div>
                              <div className="details">
                                <Link
                                  to={"/freelancedetail"}
                                  state={{ id: item?.id }}
                                  className="btn stretched-link p-0"
                                >
                                  {item?.address}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- CAREER SECTION END --> */}

            {/* <!-- REFER & EARN START --> */}
            <div className="section-full site-bg-white h-page6-getjobs-wrap">
              <div className="container">
                <div className="h-page-6-getjobs-wrap">
                  <div className="row">
                    <div className="col-lg-7 col-md-12">
                      <div className="h-page-6-getjobs-left">
                        <div className="twm-media">
                          <img src="./images/rewards.png" alt="#" />
                          <div className="twm-media-bg-circle"></div>
                          <div className="twm-media-bg-circle2"></div>
                          <div className="twm-media-bg-circle3">
                            <div className="rotate-center">
                              <span className="ring1"></span>
                              <span className="ring2"></span>
                              <span className="ring3"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-5 col-md-12">
                      <div className="h-page-6-getjobs-right">
                        {/* <!-- TITLE START--> */}
                        <div className="section-head left wt-small-separator-outer">
                          <div className="wt-small-separator site-text-primary">
                            <div>Get Rewards</div>
                          </div>
                          <h2 className="wt-title">
                            Invite friends & earn
                            <span className="site-text-primary">
                              Shopspot
                            </span>{" "}
                            Loyalty Rewards
                          </h2>
                          <p>
                            You need to create an account to find the best and
                            preferred Shop. lorem Ipsum is simply dummy text of
                            the printing and typesetting industry the standard
                            dummy text ever took.
                          </p>
                          <p>
                            Find the best and preferred Shop. lorem Ipsum is
                            simply dummy text of the printing and typesetting
                            industry the standard dummy text ever since the when
                            an printer took.
                          </p>
                        </div>
                        {/* <!-- TITLE END--> */}
                        <div className="twm-read-more">
                          <a className="site-button">Refer your Friend</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- REFER & EARN END --> */}

            {/* <!-- Download START --> */}
            <div className="section-full p-t120 p-b120 twm-for-employee-area site-bg-white">
              <div className="container">
                <div className="section-content">
                  <div className="row">
                    <div className="col-lg-5 col-md-12">
                      <div className="twm-explore-media-wrap">
                        <div className="twm-media">
                          <img src="images/download (1).png" alt="" />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-7 col-md-12">
                      <div className="twm-explore-content-outer-3">
                        <div className="twm-explore-content-3">
                          <div className="twm-title-large">
                            <h2>Downlaod our mobile App</h2>
                            <p>
                              There are many variations of passages of Lorem
                              Ipsum available, since the when an printer took.
                              lorem Ipsum is simply dummy text of the printing
                              and typesetting industry.
                            </p>
                          </div>
                          <div className="twm-upload-file d-flex">
                            <button type="button" className="btn w-40">
                              <img
                                src="./images/apple-storepicon-768x221.png"
                                alt=""
                              />
                            </button>
                            <button type="button" className="btn w-40">
                              <img src="./images/Google-1-768x221.png" alt="" />
                            </button>
                          </div>
                        </div>

                        <div className="twm-l-line-1"></div>
                        <div className="twm-l-line-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Modal
              className="modal-dialog-centered modal-lg product-details-modal twm-sign-up"
              isOpen={productModal}
              toggle={toggleProductModal}
            >
              <div className="modal-header mt-0 py-0 border-0">
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    toggleProductModal();
                  }}
                ></button>
              </div>
              <ModalBody>
                {/* <!-- Slider container --> */}
                <div className="product-details">
                  <div id="carouselExample" className="carousel slide">
                    <div className="carousel-inner">
                      <OwlCarousel
                        className="owl-theme"
                        loop
                        items={1}
                        margin={10}
                        nav
                        navText={["<", ">"]}
                        autoPlay={true}
                        autoplayTimeout={3000}
                      >
                        {images &&
                          images?.length > 0 &&
                          images?.map((item, key) => (
                            <div
                              className="carousel-item shadow-sm active"
                              key={key}
                            >
                              <img
                                src={item}
                                className="d-block w-100"
                                alt="..."
                              />
                            </div>
                          ))}
                        {/* Add more items as needed */}
                      </OwlCarousel>
                    </div>
                  </div>
                </div>

                <div className="description mt-3 position-relative">
                  <div className="share-icons">
                    <span className="btn share">
                      {wishListColor == null && (
                        <i
                          className={`${"far fa-heart"}`}
                          onClick={() => handleWishList(product?.id)}
                        ></i>
                      )}
                      {wishListColor && (
                        <i
                          className={`fas fa-heart`}
                          onClick={() => handleWishList(product?.id)}
                        ></i>
                      )}
                    </span>
                    <span className="btn">
                      <i className="far fa-share-square"></i>
                    </span>
                  </div>
                  <h5>{product?.name}</h5>
                  <p>{product?.description}</p>
                  {info &&
                    info.length > 0 &&
                    info.map((item, key) => (
                      <div>
                        <h5>{Object.keys(item)?.[0]}</h5>
                        <div className="d-flex align-items-center justify-content-between">
                          <p>{item[Object.keys(item)?.[0]]}</p>
                          <p>4 windows</p>
                        </div>{" "}
                      </div>
                    ))}
                  <div className="d-flex align-items-center justify-content-between">
                    <h5>Price </h5>
                    <h5>{"BD" + " " + product.price}</h5>
                  </div>
                  <div className="text-end">
                    <button
                      type="submit"
                      className="site-button"
                      style={{ width: "auto", marginLeft: "auto" }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </ModalBody>
            </Modal>

            {/* <!-- Download END --> */}
          </div>
          {/* <!-- CONTENT END --> */}
        </Layout>
      )}
    </>
  );
}
