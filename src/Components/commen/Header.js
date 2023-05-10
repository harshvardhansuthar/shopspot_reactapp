import React, { useEffect, useState } from "react";
import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GetData, GetDataWithToken } from "../../ApiHelper/ApiHelper";
import Cookies from "js-cookie";
import { actionCountryName, actionLoginStatus } from "../../store/Action";
import { Modal, ModalBody } from "reactstrap";
import { set } from "react-hook-form";

export default function Header(props) {
  // const [countryName, setCountryName] = useState("");
  // const [category, setCategory] = useState([]);
  // const [country, setCountry] = useState([]);
  const reduxCountryName = useSelector((state) => state?.countryName?.action);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const [countryModal, setCountryModal] = useState(
    reduxCountryName ? false : true
  );
  const toggleCountryModal = () => {
    if (reduxCountryName) {
      setCountryModal(!countryModal);
    }
  };

  const handleQueryChange = (event) => {
    setShowSuggestions(true);
    setQuery(event.target.value);
  };

  const [resentSearch, setResentSearch] = useState([])
  const [countryFlag, setCountryFlag] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [countryName, setCountryName] = useState("");
  const [category, setCategory] = useState([]);
  const [country, setCountry] = useState([]);
  const dispatch = useDispatch();
  const [isFixed, setIsFixed] = useState(false);
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [islogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(null);
  const [userLogo, setUserLogo] = useState();
  const navigate = useNavigate();
  const location = useSelector((state) => state?.loctionn?.action?.location);
  const user = useSelector(
    (state) => state?.userDetail?.action?.userData?.name
  );
  // const setUser = (data) => {
  //   setUserLogo(data);
  // };

  // setUserLogo(
  //   `${user?.split(" ")[0]?.charAt(0)}${user?.split(" ")[1]?.charAt(0)}`
  // );

  // console.log(userLogo);
  let isLogin = useSelector((state) => {
    return state?.loginStatus.action;
  });

  const handleLogout = () => {
    GetDataWithToken("auth/logout").then((res) => {
      if ((res.status = true)) {
        Cookies.remove("token");
        dispatch(actionLoginStatus.loginStatus(false));
        navigate("/");
      }
    });
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("resentSearch")) || []

    setResentSearch(data)

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsFixed(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    setToken(token);
  }, [isLogin]);

  useEffect(() => {
    GetData(`auth/get-my-country`).then((res) => {
      if (res?.status == true) {
        setCountry(res.data);
      }
    });

    GetData(`category/get-category`).then((res) => {
      if (res?.status == true) {
        setCategory(res.data);
      }
    });
  }, []);

  const handleCategoryDetail = (id) => {
    GetData(
      `business/get-business?lat=${location?.latitude}&lng=${location?.longitude
      }&page=${""}&categoryId=${id}&country=${countryName}`
    );
  };
  const handleToggle = () => {
    document.getElementById("search").classList.toggle("open");
    // document.getElementById("close").classList.remove("open");
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
  }, [query]);

  console.log(resentSearch)

  // const handleCategoryDetail = (id) => {
  //   GetData(`business/get-business?lat=${location?.latitude}&lng=${location?.longitude}&page=${""}&categoryId=${id}&country=${countryName}`
  //   ).then((res) => {
  //     console.log(res)
  //   })
  // }

  // header-style-3

  const handleSetResentSearch = (item, id) => {
    const resentSearch = JSON.parse(localStorage.getItem("resentSearch")) || []

    const resentObject = { name: item, id: id }

    if (resentSearch?.length > 10) {
      resentSearch.shift()
    }
    resentSearch.push(resentObject)

    localStorage.setItem("resentSearch", JSON.stringify(resentSearch))
  }


  return (
    <>
      {/* <!-- HEADER START --> */}
      <header
        className={`site-header ${props?.class ? props?.class : "header-style-3"
          } mobile-sider-drawer-menu`}
      >
        {/* is-fixed */}
        <div
          className={`sticky-header main-bar-wraper navbar-expand-lg ${isFixed ? " is-fixed" : ""
            }`}
        >
          <div className="main-bar">
            <div className="container-fluid clearfix">
              <div className="logo-header">
                <div className="logo-header-inner logo-header-one">
                  <Link to={"/"}>
                    <img src="images/logo(1).png" alt="" />
                  </Link>
                </div>
              </div>

              {/* <!-- NAV Toggle Button --> */}
              <button
                id="mobile-side-drawer"
                data-target=".header-nav"
                data-toggle="collapse"
                type="button"
                className="navbar-toggler collapsed"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar icon-bar-first"></span>
                <span className="icon-bar icon-bar-two"></span>
                <span className="icon-bar icon-bar-three"></span>
              </button>

              {/* <!-- MAIN Nav --> */}
              <div className="nav-animation header-nav navbar-collapse collapse d-flex justify-content-center">
                <ul className="nav navbar-nav">
                  <li className="has-child">
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li className="has-child">
                    <a
                      className="dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Categories
                    </a>
                    <div
                      className="category-megamenu dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <div className="cardclip"></div>
                      <ul className="list-unstyled d-flex flex-wrap">
                        {category &&
                          category?.length > 0 &&
                          category?.map((item, key) => (
                            <li>
                              <Link
                                key={key}
                                className="dropdown-item"
                                to={"/business"}
                                state={{ id: item?.id }}
                              >
                                <span>
                                  <img src={item?.image} alt="" />
                                </span>
                                {item?.name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </li>
                  <li className="has-child">
                    <a>Vendors</a>
                  </li>
                  <li className="has-child">
                    <a>About us</a>
                  </li>
                  <li className="has-child">
                    <a>How it Works</a>
                  </li>
                  <li className="has-child">
                    <a
                      className="d-flex align-items-center"
                      onClick={toggleCountryModal}
                    >
                      <span className="country-select-img">{countryFlag} </span>
                      {reduxCountryName}
                      <span className="country-select-img">
                        <i className="fas fa-chevron-down"></i>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* <!-- Header Right Section--> */}
              <div className="extra-nav header-2-nav">
                <div className="extra-cell">
                  <div className="header-search">
                    <a
                      className="header-search-icon"
                      onClick={() => handleToggle()}
                    >
                      <i className="feather-search"></i>
                    </a>
                  </div>
                </div>
                <div className="extra-cell">
                  <div className="header-nav-btn-section">
                    <div className="twm-nav-btn-left">
                      {!token && (
                        <Link
                          className="twm-nav-sign-up"
                          onClick={() => {
                            toggleModal();
                          }}
                        >
                          <i className="feather-log-in"></i> Login
                        </Link>
                      )}
                      {token && (
                        <div className="dropdown">
                          <button
                            className="btn afterloginuserbtn"
                            type="button"
                            data-bs-toggle="dropdown"
                          >
                            {/* {`${user?.split(" ")[0]?.charAt(0)}${user
                              ?.split(" ")[1] 
                              ?.charAt(0)}`} */}Em
                          </button>
                          <ul className="dropdown-menu hide">
                            <li className="position-relative">
                              <p className="userintro">Hello Eveline Morgan!</p>
                              <div className="cardclip"></div>
                            </li>
                            <li>
                              <Link
                                to={{
                                  pathname: "/profile",
                                  state: {
                                    setUser: userLogo,
                                  },
                                }}
                                // to={"/profile"}
                                className="dropdown-item"
                              >
                                <i className="fa fa-user me-2"></i>
                                Your Profile
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={"/profile"}
                                state={{ id: "6" }}
                                className="dropdown-item"
                              >
                                <i className="fas fa-heart me-2"></i>
                                Favourite
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={"/profile"}
                                state={{ id: "8" }}
                                className="dropdown-item"
                              >
                                <i className="fa fa-fingerprint me-2"></i>
                                Change Password
                              </Link>
                            </li>
                            <li>
                              <a
                                onClick={handleLogout}
                                className="dropdown-item"
                              >
                                <i className="fa fa-share-square me-2"></i>
                                Logout
                              </a>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="twm-nav-btn-right">
                      <a
                        className="twm-nav-post-a-job"
                      >
                        <i className="feather-briefcase"></i> Become a Vendor
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- SITE Search --> */}
          <div id="search">
            <div class="d-flex">
              <form
                role="search"
                id="searchform"
                action="https://thewebmax.org/search"
                method="get"
                class="radius-xl"
              >
                <input
                  class="form-control"
                  name="q"
                  type="search"
                  placeholder="Type to search"
                  value={query}
                  onChange={handleQueryChange}
                />

                {/* <div>
                  {query?.length > 0 &&
                    suggestions &&
                    suggestions?.business?.length > 0 &&
                    suggestions?.business?.map((item, key) => (
                      <ul key={key}>
                        <li
                          onClick={async (e) => {
                            await setQuery(e.target.innerHTML);
                            setShowSuggestions(false);
                          }}
                        >
                          {item.name}
                        </li>
                      </ul>
                    ))}
                </div> */}

                <span className="input-group-append">
                  <button type="button" className="search-btn">
                    <i className="fa fa-paper-plane"></i>
                  </button>
                </span>
              </form>
              <span className="close" onClick={() => handleToggle()}></span>
            </div>
            <div className="search-history">
              {query?.length == 0 && <div className="Recent-search">
                <h4 className="mb-3">Recent search</h4>
                <div className="d-flex flex-wrap">
                  {
                    resentSearch?.length > 0 &&
                    resentSearch?.map((item, key) => (
                      <Link to={'/businessdetail'} state={{ id: item?.id }} className="btn btn-light rounded-pill me-2 mb-2">
                        <span className="me-2">
                          <i className="fas fa-history"></i>
                        </span>
                        {item?.name}
                      </Link>))}
                  {/* {
                    query?.length > 0 &&
                    suggestions?.carrer?.length > 0 &&
                    suggestions?.carrer?.map((item, key) => (
                      <Link to={'/careerdetail'} state={{ id: item?.id }} className="btn btn-light rounded-pill me-2 mb-2">
                        {item?.post_name}
                      </Link>))}
                  {
                    query?.length > 0 &&
                    suggestions?.category?.length > 0 &&
                    suggestions?.category?.map((item, key) => (
                      <button className="btn btn-light rounded-pill me-2 mb-2">
                        {item?.name}
                      </button>))}
                  {
                    query?.length > 0 &&
                    suggestions?.experience?.length > 0 &&
                    suggestions?.experience?.map((item, key) => (
                      <button className="btn btn-light rounded-pill me-2 mb-2">
                        {item?.name}
                      </button>))}
                  {
                    query?.length > 0 &&
                    suggestions?.product?.length > 0 &&
                    suggestions?.product?.map((item, key) => (
                      <button className="btn btn-light rounded-pill me-2 mb-2">
                        {item?.name}
                      </button>))}  */}
                </div>
              </div>}
              {query?.length == 0 && <div className="popular-search mt-4">
                <h4 className="mb-3">Popular search</h4>
                <div className="d-flex flex-wrap">
                  {/* {
                    query?.length > 0 &&
                    suggestions?.product?.length > 0 &&
                    suggestions?.product?.map((item, key) => (
                      <button className="btn btn-light rounded-pill me-2 mb-2">
                        {item?.name}
                      </button>))} */}

                </div>
              </div>}
              {query?.length > 0 &&
                <div className="search-every mt-4">
                  {suggestions?.business?.length > 0 && <h4 className="my-3">Business</h4>}
                  <div className="d-flex flex-wrap">
                    {
                      suggestions?.business?.length > 0 &&
                      suggestions?.business?.map((item, key) => (
                        <Link onClick={() => handleSetResentSearch(item?.name, item?.id)}
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

                  {suggestions?.carrer?.length > 0 && <h4 className="my-3">Carrer</h4>}
                  <div className="d-flex flex-wrap">
                    {
                      suggestions?.carrer?.length > 0 &&
                      suggestions?.carrer?.map((item, key) => (
                        <Link onClick={() => handleSetResentSearch(item?.post_name, item?.id)}
                          to={"/careerdetail"}
                          state={{ id: item?.id }}
                          className="btn btn-light rounded-pill me-2 mb-2 d-flex align-items-center justify-content-center"
                        >
                          <span className="search-img me-2">
                            <img
                              className=""
                              src={'images/banner/logo(1).png'}
                              alt="#"
                            />
                          </span>
                          {item?.post_name}
                        </Link>
                      ))}
                  </div>

                  {suggestions?.category?.length > 0 && <h4 className="my-3">Categories</h4>}
                  <div className="d-flex flex-wrap">
                    {
                      suggestions?.category?.length > 0 &&
                      suggestions?.category?.map((item, key) => (
                        <Link onClick={() => handleSetResentSearch(item?.name, item?.id)}
                          to={"/business"}
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

                  {suggestions?.product?.length > 0 && <h4 className="my-3">Products</h4>}
                  <div className="d-flex flex-wrap">

                    {
                      suggestions?.product?.length > 0 &&
                      suggestions?.product?.map((item, key) => (
                        <Link to={"/businessdetail"} state={{ id: item?.BusinessId }} onClick={() => handleSetResentSearch(item?.name, item?.id)} className="btn btn-light rounded-pill me-2 mb-2 d-flex align-items-center justify-content-center">
                          <span className="search-img me-2">
                            <img
                              className=""
                              src={item?.images && JSON?.parse(item?.images)[0]}
                              alt=""
                            />
                          </span>
                          {item?.name}
                        </Link>))}
                  </div>

                  {suggestions?.experience?.length > 0 && <h4 className="my-3">Experience</h4>}
                  <div className="d-flex flex-wrap">
                    {
                      suggestions?.experience?.length > 0 &&
                      suggestions?.experience?.map((item, key) => (
                        <Link to={"/latestexoerience"} state={{ id: item?.id }} onClick={() => handleSetResentSearch(item?.name, item?.id)} className="btn btn-light rounded-pill me-2 mb-2 d-flex align-items-center justify-content-center">
                          <span className="search-img me-2">
                            <img
                              className=""
                              src={item?.image}
                              alt=""
                            />
                          </span>
                          {item?.name}
                        </Link>))}
                  </div>

                </div>
              }
            </div>

          </div>
        </div>
      </header>

      {modal && <Login toggle={() => toggleModal()} />}
      {
        <Modal
          Modal
          className="modal-dialog-centered twm-sign-up modal-xl"
          isOpen={countryModal}
        // toggle={toggleCountryModal}
        >
          <ModalBody>
            <form>
              <div className="twm-tabs-style-2">
                <h3 className="mb-4">
                  Select Your Country for Nearby Shopspot
                </h3>
                <div className="mb-3 position-relative">
                  <input
                    type="text"
                    className="form-control ps-5"
                    id="Country"
                    placeholder="Select for your Country"
                    aria-describedby="Country"
                  />

                  <label for="Country" className="form-label Country-label">
                    <i className="feather-search"></i>
                  </label>
                </div>
                <div className="popular-country">
                  <h5 className="text-center mb-4">Popular Country</h5>
                  <div className="row text-center">
                    {country &&
                      country?.length > 0 &&
                      country?.map((item, key) => (
                        <div className="col-lg-2 col-md-4 col-6" key={key}>
                          <div className="position-relative">
                            <div className="country-img">
                              <span>
                                {JSON.parse(item?.shopspot_country)?.flag}
                              </span>
                            </div>
                            <a
                              className="btn stretched-link"
                              role="button"
                              onClick={() => {
                                setCountryName(
                                  JSON.parse(item?.shopspot_country)?.name
                                );
                                setCountryFlag(
                                  JSON.parse(item?.shopspot_country)?.flag
                                );
                                {
                                  dispatch(
                                    actionCountryName?.countryName(
                                      JSON?.parse(item?.shopspot_country)?.name
                                    )
                                  );
                                }
                                toggleCountryModal();
                              }}
                            >
                              {JSON.parse(item?.shopspot_country)?.name}
                            </a>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </form>
          </ModalBody>
        </Modal>
      }
      {/* <!-- Country popup start here... --> */}

      {/* <!-- Country popup end here... --> */}
      {/* {<SignUp/>} */}
      {/* <!-- HEADER END --> */}
    </>
  );
}
