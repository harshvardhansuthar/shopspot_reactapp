import React, { useEffect, useState } from "react";
import ProfileForm from "./ProfileForm";
import BusinessProfile from "./BusinessProfile";
import Activity from "./Activity";
import EmployerTransaction from "./EmployerTransaction";
import Favourite from "./Favourite";
import MyEvent from "./MyEvent";
import EmployerChangePassword from "./EmployerChangePassword";
import Layout from "../../commen/Layout";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import Cookies from "js-cookie";
import $ from "jquery";
import { userDetail } from "../../../store/Action";
import { actionLoginStatus } from "../../../store/Action";
import { useDispatch, useSelector } from "react-redux";
import { GetDataWithToken } from "../../../ApiHelper/ApiHelper";
import RefferralPoints from "./RefferralPoints";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Loder from "../../commen/Loder";

export default function ProfileSideBar(props) {
  const id = useLocation();
  const [callApi, setCallApi] = useState(true);
  const [componentLoader, setComponentLoader] = useState(true);

  const callApiUpdateData = () => setCallApi(!callApi);
  const [userData, setUserData] = useState([]);
  const token = Cookies.get("token");
  const [activeTab, setActiveTab] = useState("1");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const toggleTab = (id) => {
    setActiveTab(id);
  };
  console.log(id?.state?.id);
  let isLogin = useSelector((state) => {
    return state?.loginStatus.action;
  });
  useEffect(() => {
    setComponentLoader(true)
    GetDataWithToken("auth/my-profile").then((res) => {
      if (res?.status == true) {
        setUserData(res.data);
        setComponentLoader(false)
      }
    });
  }, [isLogin]);

  //   const nameParts = userData?.name?.split(" ")
  //   const firstLetter = nameParts[0]?.charAt(0);
  // const lastLetter = nameParts[1]?.charAt(0);

  const handleLogoutHandler = () => {
    GetDataWithToken("auth/logout").then((res) => {
      console.log(res);
      if (res.status === true) {
        dispatch(actionLoginStatus.loginStatus(false));
        Cookies.remove("token");
        Cookies.remove("userid")
        navigate("/");
      }
    });
  };

  // dispatch(userDetail.userDetails({ userData }));

  // setUserLogo(
  //   `${userData?.name?.split(" ")[0]?.charAt(0)}${userData?.name
  //     ?.split(" ")[1]
  //     ?.charAt(0)}`
  // );
  // const { setUser } = location.state;
  useEffect(() => {
    if (id?.state?.id) {
      setActiveTab(id?.state?.id);
    }
  }, []);

  return (
    <>
      {componentLoader ? (
        <Loder />
      ) : (
        <>
          <Layout>
            {/* <!-- OUR BLOG START --> */}
            <div className="page-content">
              <div className="section-full p-t120 p-b90 site-bg-white">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-3 col-lg-4 col-md-12 rightSidebar m-b30">
                      <div className="side-bar-st-1">
                        <div class="twm-candidate-profile-pic">
                          <h5>{`${userData?.name
                            ?.split(" ")[0]
                            ?.charAt(0)}${userData?.name
                              ?.split(" ")[1]
                              ?.charAt(0)}`}</h5>
                        </div>
                        <div className="twm-mid-content text-center">
                          <a href="javascript:void(0)" className="twm-job-title">
                            <h4>{userData?.name}</h4>
                          </a>
                        </div>

                        <div className="twm-nav-list-1">
                          <Nav tabs className="d-block border-0">
                            <NavItem className={activeTab === "1" ? "active" : ""}>
                              <NavLink
                                onClick={() => {
                                  toggleTab("1");
                                }}
                              >
                                <i className="fa fa-user"></i>
                                Profile
                              </NavLink>
                            </NavItem>
                            <NavItem className={activeTab === "2" ? "active" : ""}>
                              <NavLink
                                onClick={() => {
                                  toggleTab("2");
                                }}
                              >
                                <i className="fa fa-receipt"></i>
                                Referral points
                              </NavLink>
                            </NavItem>
                            <NavItem className={activeTab === "3" ? "active" : ""}>
                              <NavLink
                                onClick={() => {
                                  toggleTab("3");
                                }}
                              >
                                <i className="fa fa-suitcase"></i>
                                Business account
                              </NavLink>
                            </NavItem>
                            <NavItem className={activeTab === "4" ? "active" : ""}>
                              <NavLink
                                onClick={() => {
                                  toggleTab("4");
                                }}
                              >
                                <i class="fa fa-book-reader"></i> Activity
                              </NavLink>
                            </NavItem>
                            <NavItem className={activeTab === "5" ? "active" : ""}>
                              <NavLink
                                onClick={() => {
                                  toggleTab("5");
                                  setTimeout(() => {
                                    $(document).ready(function () {
                                      $("#Trantable").DataTable();
                                    });
                                  }, 3000);
                                  callApiUpdateData();
                                }}
                              >
                                <i class="fa fa-credit-card"></i>
                                Transaction
                              </NavLink>
                            </NavItem>
                            <NavItem className={activeTab === "6" ? "active" : ""}>
                              <NavLink
                                onClick={() => {
                                  toggleTab("6");
                                }}
                              >
                                <i class="fas fa-heart"></i> Favourite
                              </NavLink>
                            </NavItem>
                            {/* <NavItem className={activeTab === "7" ? "active" : ""}>
                          <NavLink
                            onClick={() => {
                              toggleTab("7");
                            }}
                          >
                            <i class="fa fa-tv"></i>
                            My events
                          </NavLink>
                        </NavItem> */}
                            <NavItem className={activeTab === "8" ? "active" : ""}>
                              <NavLink
                                onClick={() => {
                                  toggleTab("8");
                                }}
                              >
                                <i class="fa fa-fingerprint"></i>
                                Change Passeord
                              </NavLink>
                            </NavItem>
                            <NavItem className={activeTab === "9" ? "active" : ""}>
                              <NavLink onClick={handleLogoutHandler}>
                                <i class="fa fa-share-square"></i>
                                Logout
                              </NavLink>
                            </NavItem>
                          </Nav>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-9 col-lg-8 col-md-12 m-b30">
                      {/* <!--Filter Short By--> */}
                      <div className="twm-right-section-panel site-bg-light">
                        <TabContent activeTab={activeTab}>
                          <TabPane tabId="1">
                            <ProfileForm userData={userData} />
                          </TabPane>
                        </TabContent>

                        <TabContent activeTab={activeTab}>
                          <TabPane tabId="2">
                            <RefferralPoints userData={userData} />
                          </TabPane>
                        </TabContent>

                        <TabContent activeTab={activeTab}>
                          <TabPane tabId="3">
                            <BusinessProfile />
                          </TabPane>
                        </TabContent>

                        <TabContent activeTab={activeTab}>
                          <TabPane tabId="4">
                            <Activity />
                          </TabPane>
                        </TabContent>

                        <TabContent activeTab={activeTab}>
                          <TabPane tabId="5">
                            <EmployerTransaction callApi={callApi} />
                          </TabPane>
                        </TabContent>

                        <TabContent activeTab={activeTab}>
                          <TabPane tabId="6">
                            <Favourite />
                          </TabPane>
                        </TabContent>

                        {/* <TabContent activeTab={activeTab}>
                      <TabPane tabId="7">
                        <MyEvent />
                      </TabPane>
                    </TabContent> */}

                        <TabContent activeTab={activeTab}>
                          <TabPane tabId="8">
                            <EmployerChangePassword />
                          </TabPane>
                        </TabContent>

                        <TabContent activeTab={activeTab}>
                          <TabPane tabId="9">
                            <h1> not found</h1>
                          </TabPane>
                        </TabContent>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Layout>

          {/* 
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab === "1" ? "active" : ""}
            onClick={() => {
              toggleTab("1");
            }}
          >
            Profile
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "2" ? "active" : ""}
            onClick={() => {
              toggleTab("2");
            }}
          >
            Tab 2
          </NavLink>
        </NavItem>
      </Nav> */}
          {/* <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <p>Tab 1 content</p>
        </TabPane>
        <TabPane tabId="2">
          <p>Tab 2 content</p>
        </TabPane>
      </TabContent> */}
        </>
      )}
    </>
  );
}
