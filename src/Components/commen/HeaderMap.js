// // import React, { useState } from "react";
// // import { Link } from "react-router-dom";
// // import Login from "../Auth/Login";
// // import SignUp from "../Auth/SignUp";
// // import Cookies from "js-cookie";
// // export default function HeaderMap() {
// //   const [modalLogin, setModalLogin] = useState(false);
// //   const toggleModalLogin = () => setModalLogin(!modalLogin);
// //   // const [modalSignup, setModalSignup] = useState(false);
// //   // const toggleModalSignup = () => setModalSignup(!modalSignup);
// //   let token = null;
// //   token = Cookies.get("token");

// //   return (
// //     <>
// //       <header className="site-header header-full-width mobile-sider-drawer-menu">
// //         <div className="sticky-header main-bar-wraper navbar-expand-lg is-fixed">
// //           <div className="main-bar">
// //             <div className="container-fluid clearfix">
// //               <div className="logo-header">
// //                 <div className="logo-header-inner logo-header-one">
// //                   <Link to={"/"}>
// //                     <img src="images/logo(1).png" alt="" />
// //                   </Link>
// //                 </div>
// //               </div>

// //               {/* <!-- NAV Toggle Button --> */}
// //               <button
// //                 id="mobile-side-drawer"
// //                 data-target=".header-nav"
// //                 data-toggle="collapse"
// //                 type="button"
// //                 className="navbar-toggler collapsed"
// //               >
// //                 <span className="sr-only">Toggle navigation</span>
// //                 <span className="icon-bar icon-bar-first"></span>
// //                 <span className="icon-bar icon-bar-two"></span>
// //                 <span className="icon-bar icon-bar-three"></span>
// //               </button>

// //               {/* <!-- MAIN Vav --> */}
// //               <div className="nav-animation header-nav navbar-collapse collapse d-flex justify-content-center">
// //                 <ul className="nav navbar-nav">
// //                   <li className="has-child">
// //                     <Link to={"/"}>Home</Link>
// //                   </li>
// //                   <li className="has-child">
// //                     <Link to={"/business"}>Categories</Link>
// //                   </li>
// //                   <li className="has-child">
// //                     <Link to={""}>Vendors</Link>
// //                   </li>
// //                   <li className="has-child">
// //                     <a href="about-1.html">About us</a>
// //                   </li>
// //                   <li className="has-child">
// //                     <a href="how-it-work.html">How it Work</a>
// //                   </li>
// //                 </ul>
// //               </div>

// //               {/* <!-- Header Right Section--> */}
// //               <div className="extra-nav header-2-nav">
// //                 <div className="extra-cell">
// //                   <div className="header-search">
// //                     <a href="#search" className="header-search-icon">
// //                       <i className="feather-search"></i>
// //                     </a>
// //                   </div>
// //                 </div>
// //                 <div className="extra-cell">
// //                   <div className="header-nav-btn-section">
// //                     <div className="twm-nav-btn-left">
// //                       <Link
// //                         onClick={toggleModalLogin}
// //                         className="twm-nav-sign-up"
// //                       >
// //                         <i className="feather-log-in"></i> Login
// //                       </Link>
// //                       <div className="dropdown">
// //                         <button
// //                           className="btn afterloginuserbtn"
// //                           type="button"
// //                           data-bs-toggle="dropdown"
// //                         >
// //                           EM
// //                         </button>
// //                         <ul className="dropdown-menu show">
// //                           <li className="position-relative">
// //                             <p className="userintro">Hello Eveline Morgan!</p>
// //                             <div className="cardclip"></div>
// //                           </li>
// //                           <li>
// //                             <a href="#" className="dropdown-item">
// //                               <i className="fa fa-user me-2"></i>
// //                               Your Profile
// //                             </a>
// //                           </li>
// //                           <li>
// //                             <a href="#" className="dropdown-item">
// //                               <i className="fas fa-heart me-2"></i>
// //                               Favourite
// //                             </a>
// //                           </li>
// //                           <li>
// //                             <a href="#" className="dropdown-item">
// //                               <i className="fa fa-fingerprint me-2"></i>
// //                               Change Password
// //                             </a>
// //                           </li>
// //                           <li>
// //                             <a
// //                               className="dropdown-item"
// //                               href="javascript:void(0)"
// //                             >
// //                               <i className="fa fa-share-square me-2"></i>
// //                               Logout
// //                             </a>
// //                           </li>
// //                         </ul>
// //                       </div>
// //                     </div>
// //                     <div className="twm-nav-btn-right">
// //                       <a
// //                         href="dash-post-job.html"
// //                         className="twm-nav-post-a-job"
// //                       >
// //                         <i className="feather-briefcase"></i> Become Vendor
// //                       </a>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* <!-- SITE Search --> */}
// //           <div id="search">
// //             <div class="d-flex">
// //               <form
// //                 role="search"
// //                 id="searchform"
// //                 action="https://thewebmax.org/search"
// //                 method="get"
// //                 class="radius-xl"
// //               >
// //                 <input
// //                   class="form-control"
// //                   value=""
// //                   name="q"
// //                   type="search"
// //                   placeholder="Type to search"
// //                 />
// //                 <span class="input-group-append">
// //                   <button type="button" class="search-btn">
// //                     <i class="fa fa-paper-plane"></i>
// //                   </button>
// //                 </span>
// //               </form>
// //               <span class="close"></span>
// //             </div>
// //             <div class="search-history">
// //               <div class="Recent-search">
// //                 <h4 class="mb-3">Recent search</h4>
// //                 <div class="d-flex flex-wrap">
// //                   <button class="btn btn-light rounded-pill me-2 mb-2">
// //                     <span class="me-2">
// //                       <i class="fas fa-history"></i>
// //                     </span>
// //                     hannah bakes
// //                   </button>
// //                   <button class="btn btn-light rounded-pill me-2 mb-2">
// //                     <span class="me-2">
// //                       <i class="fas fa-history"></i>
// //                     </span>
// //                     Indian sweets
// //                   </button>
// //                   <button class="btn btn-light rounded-pill me-2 mb-2">
// //                     <span class="me-2">
// //                       <i class="fas fa-history"></i>
// //                     </span>
// //                     Cofee shop
// //                   </button>
// //                   <button class="btn btn-light rounded-pill me-2 mb-2">
// //                     <span class="me-2">
// //                       <i class="fas fa-history"></i>
// //                     </span>
// //                     Ramee Rose Hotel
// //                   </button>
// //                 </div>
// //               </div>
// //               <div class="popular-search mt-4">
// //                 <h4 class="mb-3">Popular search</h4>
// //                 <div class="d-flex flex-wrap">
// //                   <button class="btn btn-light rounded-pill me-2 mb-2">
// //                     Restaurents
// //                   </button>
// //                   <button class="btn btn-light rounded-pill me-2 mb-2">
// //                     Hotels
// //                   </button>
// //                   <button class="btn btn-light rounded-pill me-2 mb-2">
// //                     Retails
// //                   </button>
// //                   <button class="btn btn-light rounded-pill me-2 mb-2">
// //                     Pharmacy
// //                   </button>
// //                   <button class="btn btn-light rounded-pill me-2 mb-2">
// //                     Travels
// //                   </button>
// //                   <button class="btn btn-light rounded-pill me-2 mb-2">
// //                     Service providers
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       {modalLogin && <Login toggleLogin={() => toggleModalLogin()} />}
// //       {/* {modalSignup && <SignUp toggleModalSignupHeaderMap={()=>toggleModalSignup()} />} */}
// //       {/* <!-- HEADER END --> */}
// //     </>
// //   );
// // }






// //////////////////////////////////////////////////////////////////////////////////////






































































// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Login from "../Auth/Login";
// import SignUp from "../Auth/SignUp";
// import Cookies from "js-cookie";
// export default function HeaderMap() {
//   const [modalLoginMap, setModalLoginMap] = useState(false);
//   const toggleModalLoginMap = () => setModalLoginMap(!modalLoginMap);
//   let token = null;
//   token = Cookies.get("token");

//   return (
//     <>
//       <header className="site-header header-full-width mobile-sider-drawer-menu">
//         <div className="sticky-header main-bar-wraper navbar-expand-lg is-fixed">
//           <div className="main-bar">
//             <div className="container-fluid clearfix">
//               <div className="logo-header">
//                 <div className="logo-header-inner logo-header-one">
//                   <Link to={"/"}>
//                     <img src="images/logo(1).png" alt="" />
//                   </Link>
//                 </div>
//               </div>

//               {/* <!-- NAV Toggle Button --> */}
//               <button
//                 id="mobile-side-drawer"
//                 data-target=".header-nav"
//                 data-toggle="collapse"
//                 type="button"
//                 className="navbar-toggler collapsed"
//               >
//                 <span className="sr-only">Toggle navigation</span>
//                 <span className="icon-bar icon-bar-first"></span>
//                 <span className="icon-bar icon-bar-two"></span>
//                 <span className="icon-bar icon-bar-three"></span>
//               </button>

//               {/* <!-- MAIN Vav --> */}
//               <div className="nav-animation header-nav navbar-collapse collapse d-flex justify-content-center">
//                 <ul className="nav navbar-nav">
//                   <li className="has-child">
//                     <Link to={"/"}>Home</Link>
//                   </li>
//                   <li className="has-child">
//                     <Link to={"/business"}>Categories</Link>
//                   </li>
//                   <li className="has-child">
//                     <Link to={""}>Vendors</Link>
//                   </li>
//                   <li className="has-child">
//                     <a href="about-1.html">About us</a>
//                   </li>
//                   <li className="has-child">
//                     <a href="how-it-work.html">How it Work</a>
//                   </li>
//                 </ul>
//               </div>

//               {/* <!-- Header Right Section--> */}
//               <div className="extra-nav header-2-nav">
//                 <div className="extra-cell">
//                   <div className="header-search">
//                     <a href="#search" className="header-search-icon">
//                       <i className="feather-search"></i>
//                     </a>
//                   </div>
//                 </div>
//                 <div className="extra-cell">
//                   <div className="header-nav-btn-section">
//                     <div className="twm-nav-btn-left">
//                       <Link
//                         onClick={toggleModalLoginMap}
//                         className="twm-nav-sign-up"
//                       >
//                         <i className="feather-log-in"></i> Login
//                       </Link>
//                       <div className="dropdown">
//                         <button
//                           className="btn afterloginuserbtn"
//                           type="button"
//                           data-bs-toggle="dropdown"
//                         >
//                           EM
//                         </button>
//                         <ul className="dropdown-menu show">
//                           <li className="position-relative">
//                             <p className="userintro">Hello Eveline Morgan!</p>
//                             <div className="cardclip"></div>
//                           </li>
//                           <li>
//                             <a href="#" className="dropdown-item">
//                               <i className="fa fa-user me-2"></i>
//                               Your Profile
//                             </a>
//                           </li>
//                           <li>
//                             <a href="#" className="dropdown-item">
//                               <i className="fas fa-heart me-2"></i>
//                               Favourite
//                             </a>
//                           </li>
//                           <li>
//                             <a href="#" className="dropdown-item">
//                               <i className="fa fa-fingerprint me-2"></i>
//                               Change Password
//                             </a>
//                           </li>
//                           <li>
//                             <a
//                               className="dropdown-item"
//                               href="javascript:void(0)"
//                             >
//                               <i className="fa fa-share-square me-2"></i>
//                               Logout
//                             </a>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                     <div className="twm-nav-btn-right">
//                       <a
//                         href="dash-post-job.html"
//                         className="twm-nav-post-a-job"
//                       >
//                         <i className="feather-briefcase"></i> Become Vendor
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>a
//             </div>
//           </div>

//           {/* <!-- SITE Search --> */}
//           <div id="search">
//             <div class="d-flex">
//               <form
//                 role="search"
//                 id="searchform"
//                 action="https://thewebmax.org/search"
//                 method="get"
//                 class="radius-xl"
//               >
//                 <input
//                   class="form-control"
//                   value=""
//                   name="q"
//                   type="search"
//                   placeholder="Type to search"
//                 />
//                 <span class="input-group-append">
//                   <button type="button" class="search-btn">
//                     <i class="fa fa-paper-plane"></i>
//                   </button>
//                 </span>
//               </form>
//               <span class="close"></span>
//             </div>
//             <div class="search-history">
//               <div class="Recent-search">
//                 <h4 class="mb-3">Recent search</h4>
//                 <div class="d-flex flex-wrap">
//                   <button class="btn btn-light rounded-pill me-2 mb-2">
//                     <span class="me-2">
//                       <i class="fas fa-history"></i>
//                     </span>
//                     hannah bakes
//                   </button>
//                   <button class="btn btn-light rounded-pill me-2 mb-2">
//                     <span class="me-2">
//                       <i class="fas fa-history"></i>
//                     </span>
//                     Indian sweets
//                   </button>
//                   <button class="btn btn-light rounded-pill me-2 mb-2">
//                     <span class="me-2">
//                       <i class="fas fa-history"></i>
//                     </span>
//                     Cofee shop
//                   </button>
//                   <button class="btn btn-light rounded-pill me-2 mb-2">
//                     <span class="me-2">
//                       <i class="fas fa-history"></i>
//                     </span>
//                     Ramee Rose Hotel
//                   </button>
//                 </div>
//               </div>
//               <div class="popular-search mt-4">
//                 <h4 class="mb-3">Popular search</h4>
//                 <div class="d-flex flex-wrap">
//                   <button class="btn btn-light rounded-pill me-2 mb-2">
//                     Restaurents
//                   </button>
//                   <button class="btn btn-light rounded-pill me-2 mb-2">
//                     Hotels
//                   </button>
//                   <button class="btn btn-light rounded-pill me-2 mb-2">
//                     Retails
//                   </button>
//                   <button class="btn btn-light rounded-pill me-2 mb-2">
//                     Pharmacy
//                   </button>
//                   <button class="btn btn-light rounded-pill me-2 mb-2">
//                     Travels
//                   </button>
//                   <button class="btn btn-light rounded-pill me-2 mb-2">
//                     Service providers
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {modalLoginMap && <Login toggleModalLoginMap={() => toggleModalLoginMap()} />}
//       {/* {modalSignup && <SignUp toggleModalSignupHeaderMap={()=>toggleModalSignup()} />} */}
//       {/* <!-- HEADER END --> */}
//     </>
//   );
// }
