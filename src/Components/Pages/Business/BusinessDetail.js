// import React, { useEffect, useState } from "react";
// import Footer from "../../commen/Footer";
// import HeaderMap from "../../commen/HeaderMap";
// import { GetData, GetDataWithToken } from "../../../ApiHelper/ApiHelper";
// import { Link, json, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Map from "../../Pages/Map/Map";
// import OwlCarousel from "react-owl-carousel";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
// import { Modal, ModalBody } from "reactstrap";
// import Loder from "../../commen/Loder";
// import { useParams } from "react-router-dom";
// import Header from "../../commen/Header";
// // import OwlCarousel from "react-owl-carousel";
// // import "owl.carousel/dist/assets/owl.carousel.css";
// // import "owl.carousel/dist/assets/owl.theme.default.css";
// export default function BusinessDetail() {
//   const [eventModal, setEventModal] = useState(true)
//   const toggleEventModal = () => setEventModal(!eventModal)
//   const [formetTime, setFormetTime] = useState({});
//   const [eventDataImage, setEventDataImage] = useState([]);
//   const [eventData, setEventData] = useState([]);
//   const [componentLoader, setComponentLoader] = useState(true);
//   const [businessDetail, setBusinessDetail] = useState([]);
//   const location1 = useSelector((state) => state?.loctionn?.action?.location);
//   const [categoryCallApi, setCategoryCallApi] = useState("");
//   const location = useLocation();
//   const [callApi, setCallApi] = useState(true);
//   const [productModal, setProductModal] = useState(false);
//   const toggleProductModal = () => setProductModal(!productModal);
//   const [product, setProduct] = useState([]);
//   const [images, setImages] = useState([]);
//   const [info, setInfo] = useState([]);
//   const { id } = useParams();

//   // const location = useSelector((state) => state.businessDetailId.action);

//   useEffect(() => {
//     if (callApi == true && location1?.latitude) {
//       setComponentLoader(true);
//       GetDataWithToken(
//         `business/business-details/${location.state.id}?lat=${location1?.latitude}&lng=${location1?.longitude}&sub_category=${categoryCallApi}`
//       ).then((res) => {
//         setCallApi(false);
//         setBusinessDetail(res.data);
//         setComponentLoader(false);
//       });
//     }
//   }, [callApi, location1]);

//   const handleProductDetail = (id) => {
//     setComponentLoader(true);
//     GetData(`product/product-details/${id}`).then((res) => {
//       let img = JSON.parse(res?.data?.images);
//       let info = JSON.parse(res?.data?.info);
//       setImages(img);
//       setInfo(info);
//       setProduct(res?.data);
//       if (res) {
//         toggleProductModal();
//         setComponentLoader(false);
//       }
//     });
//   };
//   const keys = Object.keys(info);

//   // {
//   //   console.log(info[Object.keys(keys)?.[0]]);
//   // }

//   const handleEventData = (id) => {
//     GetData(`event/get-event?id=${id}`).then((res) => {
//       console.log(res.data);
//       let img = JSON.parse(res?.data?.image);
//       setEventDataImage(img);
//       setEventData(res.data);

//       let time = JSON.parse(res?.data?.time);
//       toggleEventModal()
//       setFormetTime(time);
//     });
//   };

//   const handleWishList = async (id) => {
//     console.log(id)
//     try {
//       const response = await GetDataWithToken(`product/add-and-delete-wishlist?eventId=${id}`);
//       console.log(response)
//       if (response?.status == true) {
//         setCallApi(true);
//       }
//       // do something with the response
//     } catch (error) {
//       console.error(error); // handle the error
//     }
//   };
//   return (
//     <>
//       {componentLoader ? (
//         <Loder />
//       ) : (
//         <div className="page_wraper">
//           <Header class={"header-full-width"} />
//           {/* <!-- CONTENT START --> */}
//           <div className="page-content">
//             {/* <!-- Job Detail V.2 START --> */}
//             <div className="section-full p-t50 p-b90 bg-white">
//               <div className="container">
//                 {/* <!-- BLOG SECTION START --> */}
//                 <div className="section-content">
//                   <div className="twm-job-self-wrap twm-job-detail-v2">
//                     <div className="twm-job-self-info">
//                       {
//                         <div className="twm-job-self-top">
//                           <div className="twm-media-bg">
//                             <img
//                               src={businessDetail?.business?.images}
//                               alt="#"
//                             />
//                           </div>

//                           <div className="twm-mid-content">
//                             <div className="twm-media">
//                               <img
//                                 src={businessDetail?.business?.business_licence}
//                                 alt="#"
//                               />
//                             </div>

//                             <h4 className="twm-job-title">
//                               {businessDetail?.business?.name}
//                               <span className="twm-job-post-duration">
//                                 {"/" + businessDetail?.business?.Category?.name}
//                               </span>
//                             </h4>
//                             <p className="twm-job-address">
//                               <i className="feather-map-pin"></i>
//                               {businessDetail?.business?.address}
//                             </p>
//                             <div className="twm-job-self-mid">
//                               <div className="twm-job-self-mid-left">
//                                 <a
//                                   href="https://www.cygalsystems.com/"
//                                   className="twm-job-websites site-text-primary"
//                                 >
//                                   {businessDetail?.business?.website_url}
//                                 </a>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       }
//                     </div>
//                   </div>
//                   <div className="twm-job-detail-2-wrap">
//                     <div className="row d-flex justify-content-center">
//                       <div className="col-lg-4 col-md-12 rightSidebar">
//                         <div className="side-bar mb-4">
//                           <div className="twm-s-info2-wrap mb-5">
//                             <div className="twm-s-info2">
//                               <h4 className="section-head-small mb-4">
//                                 Business Information
//                               </h4>
//                               <ul className="twm-job-hilites2">
//                                 <li>
//                                   <div className="twm-s-info-inner">
//                                     <i className="fas fa-calendar-alt"></i>
//                                     <span className="twm-title">
//                                       Created Date
//                                     </span>
//                                     <div className="twm-s-info-discription">
//                                       {businessDetail?.business?.createdAt.split(
//                                         "T05:54:46.000Z"
//                                       )}
//                                     </div>
//                                   </div>
//                                 </li>
//                                 <li>
//                                   <div className="twm-s-info-inner">
//                                     <i className="fas fa-user-tie"></i>
//                                     <span className="twm-title">
//                                       Business Type
//                                     </span>
//                                     <div className="twm-s-info-discription">
//                                       {businessDetail?.business?.Category?.name}
//                                     </div>
//                                   </div>
//                                 </li>
//                               </ul>
//                             </div>
//                           </div>

//                           <div className="widget tw-sidebar-tags-wrap">
//                             <h4 className="section-head-small mb-4">
//                               Product Category
//                             </h4>

//                             <div className="tagcloud">
//                               {businessDetail &&
//                                 businessDetail?.sub_category?.length > 0 &&
//                                 businessDetail?.sub_category?.map(
//                                   (item, key) => (
//                                     <a
//                                       to={""}
//                                       onClick={() => [
//                                         setCategoryCallApi(item),
//                                         setCallApi(true),
//                                       ]}
//                                     >
//                                       {item}
//                                     </a>
//                                   )
//                                 )}
//                               {/* <a href="javascript:void(0)">Customised Cakes</a>
//                           <a href="javascript:void(0)">Consultancy</a> */}
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="col-lg-8 col-md-12">
//                         {/* <!-- Candidate detail START --> */}
//                         <div className="cabdidate-de-info">
//                           <h4 className="twm-s-title m-t0">
//                             Business Description:
//                           </h4>

//                           <p>{businessDetail?.business?.description}</p>

//                           {/* <p>
//                         At vero eos et accusamus et iusto odio dignissimos
//                         ducimus qui blanditiis praesentium voluptatum deleniti
//                         atque corrupti quos dolores et quas molestias excepturi
//                         sint occaecati cupiditate non provident, similique sunt
//                         in culpa qui officia deserunt mollitia animi.
//                       </p> */}

//                           <h4 className="twm-s-title">Share Profile</h4>
//                           <div className="twm-social-tags">
//                             <a
//                               href={`tel:${businessDetail?.business?.contact?.phone}`}
//                               className="fb-clr"
//                             >
//                               <i className="fas fa-phone-alt"></i>
//                             </a>
//                             <a
//                               href="mailto:email@example.com"
//                               className="tw-clr"
//                             >
//                               <i className="fas fa-envelope"></i>
//                             </a>
//                             <a
//                               href={`https://wa.me/${businessDetail?.business?.contact?.whatapp}`}
//                               className="whats-clr"
//                             >
//                               <i className="fab fa-whatsapp"></i>
//                             </a>
//                             <a
//                               href={"https://www.google.com/maps"}
//                               className="pinte-clr"
//                             >
//                               <i className="fas fa-map-marker-alt"></i>
//                             </a>
//                           </div>

//                           <h4 className="twm-s-title">Location</h4>
//                           <div className="twm-m-map mb-5">
//                             <div className="twm-m-map-iframe">
//                               {/* <iframe

//                             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.8534521658976!2d-118.2533646842856!3d34.073270780600225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c6fd9829c6f3%3A0x6ecd11bcf4b0c23a!2s1363%20Sunset%20Blvd%2C%20Los%20Angeles%2C%20CA%2090026%2C%20USA!5e0!3m2!1sen!2sin!4v1620815366832!5m2!1sen!2sin"
//                           ></iframe> */}
//                               <Map
//                                 className="h-100"
//                                 businessDetail={{
//                                   lat: businessDetail?.business?.latitude,
//                                   lng: businessDetail?.business?.longitude,
//                                 }}
//                               />
//                             </div>
//                           </div>

//                           <h4 className="twm-s-title">Events</h4>
//                           <div className="tw-sidebar-gallery-2">
//                             <div className="row">
//                               {businessDetail &&
//                                 businessDetail?.business?.events?.length > 0 &&
//                                 businessDetail?.business?.events?.map(
//                                   (item, key) => (
//                                     <div className="col-lg-3 col-md-3 col-sm-6">
//                                       <div className="tw-service-gallery-thumb">
//                                         <a
//                                           onClick={() =>
//                                             handleEventData(item.id)
//                                           }
//                                           className=""
//                                           href="#EventModal"
//                                           data-bs-toggle="modal"
//                                         >
//                                           <img
//                                             src={JSON.parse(item?.image)[0]}
//                                             alt=""
//                                           />
//                                           <i className="fa fa-file-image"></i>
//                                         </a>
//                                       </div>
//                                     </div>
//                                   )
//                                 )}
//                             </div>
//                           </div>

//                           <h4 className="twm-s-title">Products</h4>
//                           <div className="tw-sidebar-gallery-2">
//                             <div className="row">
//                               {businessDetail?.business?.Products &&
//                                 businessDetail?.business?.Products?.length >
//                                 0 &&
//                                 businessDetail?.business?.Products?.map(
//                                   (item, key) => (
//                                     <div
//                                       className="col-lg-3 col-md-3 col-sm-6"
//                                       key={key}
//                                     >
//                                       <div className="tw-service-gallery-thumb">
//                                         <a
//                                           className=""
//                                           onClick={() =>
//                                             handleProductDetail(item.id)
//                                           }
//                                         >
//                                           <img
//                                             src={JSON.parse(item.images)[0]}
//                                             alt=""
//                                           />
//                                           <i className="fa fa-file-image"></i>
//                                         </a>
//                                       </div>
//                                     </div>
//                                   )
//                                 )}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* <!-- Job Detail V.2 END --> */}

//             {/* <!-- Related Jobs START --> */}
//             <div className="section-full p-t120 p-b90 site-bg-light-purple twm-related-jobs-carousel-wrap">
//               {/* <!-- TITLE START--> */}
//               <div className="section-head center wt-small-separator-outer">
//                 <div className="wt-small-separator site-text-primary">
//                   <div>Top Business</div>
//                 </div>
//                 <h2 className="wt-title">Related Business</h2>
//               </div>
//               {/* <!-- TITLE END--> */}

//               <div className="container">
//                 <div className="section-content">
//                   <div className=" twm-related-jobs-carousel owl-btn-vertical-center">
//                     {
//                       <div className="item">
//                         <OwlCarousel
//                           className="owl-theme"
//                           loop
//                           items={3}
//                           margin={10}
//                           nav
//                           navText={["<", ">"]}
//                         >
//                           {businessDetail?.related_Business?.length > 0 &&
//                             businessDetail?.related_Business?.map(
//                               (item, key) => (
//                                 <div
//                                   className="twm-jobs-grid-style2"
//                                   key={key}
//                                 >
//                                   <div className="twm-media">
//                                     <img src={item?.images} alt="#" />
//                                   </div>
//                                   <span className="twm-job-post-duration">
//                                     {item?.Category?.name}
//                                   </span>
//                                   <div className="twm-mid-content">
//                                     <a
//                                       href="job-detail-v2.html"
//                                       className="twm-job-title"
//                                     >
//                                       <h4>{item?.name}</h4>
//                                     </a>
//                                     <p className="twm-job-address">
//                                       {item?.address}
//                                     </p>
//                                   </div>
//                                   <div className="twm-right-content justify-content-center">
//                                     <a
//                                       href="job-detail-v2.html"
//                                       className="twm-jobs-browse site-text-primary"
//                                     >
//                                       {item?.distance.toFixed(2) +
//                                         " " +
//                                         "KM Nearby you"}
//                                     </a>
//                                   </div>
//                                 </div>
//                               )
//                             )}
//                         </OwlCarousel>
//                       </div>
//                     }
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* <!-- Related Jobs END --> */}
//           </div>
//           {/* <!-- CONTENT END --> </> */}

//           <Modal
//             className="modal-dialog-centered modal-lg product-details-modal twm-sign-up"
//             isOpen={productModal}
//             toggle={toggleProductModal}
//           >
//             <div class="modal-header mt-0 py-0 border-0">
//               <button
//                 type="button"
//                 className="btn-close"
//                 onClick={() => {
//                   toggleProductModal();
//                 }}
//               ></button>
//             </div>
//             <ModalBody>
//               {/* <!-- Slider container --> */}
//               <div className="product-details">
//                 <div id="carouselExample" className="carousel slide">
//                   <div className="carousel-inner">
//                     <OwlCarousel
//                       className="owl-theme"
//                       loop
//                       items={1}
//                       margin={10}
//                       nav
//                       navText={["<", ">"]}
//                       autoPlay={true}
//                       autoplayTimeout={3000}
//                     >
//                       {images &&
//                         images?.length > 0 &&
//                         images?.map((item, key) => (
//                           <div
//                             className="carousel-item shadow-sm active"
//                             key={key}
//                           >
//                             <img
//                               src={item}
//                               className="d-block w-100"
//                               alt="..."
//                             />
//                           </div>
//                         ))}
//                     </OwlCarousel>

//                   </div>

//                 </div>
//               </div>

//               <div className="description mt-3 position-relative">
//                 <div className="share-icons">
//                   <span className="btn share">
//                     <i className="far fa-heart"></i>
//                   </span>
//                   <span className="btn">
//                     <i className="far fa-share-square"></i>
//                   </span>
//                 </div>
//                 <h5>{product?.name}</h5>
//                 <p>{product?.description}</p>
//                 {/* <p>
//               Mi volutpat ornare euismod, arcu aliquam curabitur himenaeos
//               curabitur, faucibus nisi.
//             </p> */}

//                 {info &&
//                   info.length > 0 &&
//                   info.map((item, key) => (
//                     <div>
//                       <h5>{Object.keys(item)?.[0]}</h5>
//                       <div className="d-flex align-items-center justify-content-between">
//                         <p>{item[Object.keys(item)?.[0]]}</p>
//                       </div>{" "}
//                     </div>
//                   ))}
//                 <div className="d-flex align-items-center justify-content-between">
//                   <h5>Price </h5>
//                   <h5>{"BD" + " " + product.price}</h5>
//                 </div>
//                 <div className="text-end">
//                   <button
//                     type="submit"
//                     className="site-button"
//                     style={{ width: "auto", marginLeft: "auto" }}
//                   >
//                     Book Now
//                   </button>
//                 </div>
//               </div>
//             </ModalBody>
//           </Modal>

//           {/* <!-- Business Event Modal start here... --> */}
//           {/* <!-- Modal --> */}
//           <div
//             className="modal product-details-modal fade"
//             id="EventModal"
//             tabindex="-1"
//             aria-labelledby="exampleModalLabel"
//             aria-hidden="true"
//           >
//             <div className="modal-dialog modal-dialog-centered product-details-modal twm-sign-up">
//               <div className="modal-content">
//                 <div className="modal-header mt-0 py-0 border-0">
//                   <button
//                     type="button"
//                     className="btn-close"
//                     data-bs-dismiss="modal"
//                     aria-label="Close"
//                   ></button>
//                 </div>
//                 <div className="modal-body">
//                   {/* <!-- Slider container --> */}
//                   <div className="product-details">
//                     <div id="EventCarousel" className="carousel slide">
//                       <div className="carousel-inner">
//                         <OwlCarousel
//                           className="owl-theme"
//                           loop
//                           items={1}
//                           margin={10}
//                           nav
//                           navText={[
//                             `<i class="fas fa-chevron-left"></i>`,
//                             `<i class="fas fa-chevron-right"></i>`,
//                           ]}
//                           autoPlay={true}
//                           autoplayTimeout={3000}
//                           dots={false}
//                         >
//                           {eventDataImage &&
//                             eventDataImage?.length > 0 &&
//                             eventDataImage?.map((item, key) => (
//                               <div className="carousel-item shadow-sm active">
//                                 <img
//                                   src={item}
//                                   className="d-block w-100"
//                                   alt="..."
//                                 />
//                               </div>
//                             ))}
//                           {/* Add more items as needed */}
//                         </OwlCarousel>
//                       </div>

//                     </div>
//                   </div>

//                   {/* <Modal
//                     Modal
//                     className="modal-dialog-centered twm-sign-up"
//                     isOpen={eventModal}
//                     toggle={toggleEventModal}
//                   >
//                     <ModalBody>

//                       <div className="product-details">
//                         <div id="EventCarousel" className="carousel slide">
//                           <div className="carousel-inner">
//                             <OwlCarousel
//                               className="owl-theme"
//                               loop
//                               items={1}
//                               margin={10}
//                               nav
//                               navText={[
//                                 `<i class="fas fa-chevron-left"></i>`,
//                                 `<i class="fas fa-chevron-right"></i>`,
//                               ]}
//                               autoPlay={true}
//                               autoplayTimeout={3000}
//                               dots={false}
//                             >
//                               {eventDataImage &&
//                                 eventDataImage?.length > 0 &&
//                                 eventDataImage?.map((item, key) => (
//                                   <div className="carousel-item shadow-sm active">
//                                     <img
//                                       src={item}
//                                       className="d-block w-100"
//                                       alt="..."
//                                     />
//                                   </div>
//                                 ))}
//                             </OwlCarousel>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="description mt-3 position-relative">
//                         <div className="share-icons">
//                           <span className="btn share">
//                             <i className="far fa-heart" onClick={() => handleWishList(eventData?.id)} ></i>
//                           </span>
//                           <span className="btn">
//                             <i className="far fa-share-square"></i>
//                           </span>
//                         </div>
//                         <h5>{eventData?.name}</h5>
//                         <p>{"Artist:" + "  " + eventData?.artists}</p>
//                         <p>Business: Cygal Systems WLL</p>
//                         <div className="row event-time">
//                           <div className="col-6">
//                             <div className="event-time-card">
//                               <span>
//                                 <i className="fas fa-calendar-week"></i>
//                               </span>
//                             </div>
//                             <p className="mb-0 text-center">{eventData?.date}</p>
//                             <p className="text-center">{`${formetTime?.to} AM -   ${formetTime?.from} PM`}</p>
//                           </div>
//                           <div className="col-6">
//                             <div className="event-location-card">
//                               <span>
//                                 <i className="fas fa-map-marker-alt"></i>
//                               </span>
//                             </div>
//                             <p className="mb-0 text-center">
//                               {eventData?.full_address}
//                             </p>
//                           </div>
//                         </div>
//                         <p>{eventData?.description}</p>
//                         <div className="d-flex align-items-center justify-content-end">
//                           <button type="submit" className="site-button w-auto">
//                             Book Now
//                           </button>
//                         </div>
//                       </div>
//                     </ModalBody>
//                   </Modal> */}

//                   <div className="description mt-3 position-relative">
//                     <div className="share-icons">
//                       <span className="btn share">
//                         <i className="far fa-heart" onClick={() => handleWishList(eventData?.id)} ></i>
//                       </span>
//                       <span className="btn">
//                         <i className="far fa-share-square"></i>
//                       </span>
//                     </div>
//                     <h5>{eventData?.name}</h5>
//                     <p>{"Artist:" + "  " + eventData?.artists}</p>
//                     <p>Business: Cygal Systems WLL</p>
//                     <div className="row event-time">
//                       <div className="col-6">
//                         <div className="event-time-card">
//                           <span>
//                             <i className="fas fa-calendar-week"></i>
//                           </span>
//                         </div>
//                         <p className="mb-0 text-center">{eventData?.date}</p>
//                         <p className="text-center">{`${formetTime?.to} AM -   ${formetTime?.from} PM`}</p>
//                       </div>
//                       <div className="col-6">
//                         <div className="event-location-card">
//                           <span>
//                             <i className="fas fa-map-marker-alt"></i>
//                           </span>
//                         </div>
//                         <p className="mb-0 text-center">
//                           {eventData?.full_address}
//                         </p>
//                         {/* <p className="text-center">Manama, Bahrain</p> */}
//                       </div>
//                     </div>
//                     <p>{eventData?.description}</p>
//                     <div className="d-flex align-items-center justify-content-end">
//                       <button type="submit" className="site-button w-auto">
//                         Book Now
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* <!-- Business Event Modal end here... --> */}

//           <Footer />
//         </div>
//       )}
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import Footer from "../../commen/Footer";
import HeaderMap from "../../commen/HeaderMap";
import { GetData, GetDataWithToken } from "../../../ApiHelper/ApiHelper";
import { Link, json, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Map from "../../Pages/Map/Map";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Modal, ModalBody } from "reactstrap";
import { useParams } from "react-router-dom";
import Header from "../../commen/Header";
import moment from "moment/moment";
import { useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import Loder from "../../commen/Loder";
import { WhatsappShareButton } from "react-share";
import Login from "../../Auth/Login";
// import OwlCarousel from "react-owl-carousel";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
export default function BusinessDetail() {
  const [wishListColor, setWishListColor] = useState({});
  const [wishListData, setWishListData] = useState({});
  const [eventModal, setEventModal] = useState(false);
  const toggleEventModal = () => setEventModal(!eventModal);
  const [formetTime, setFormetTime] = useState({});
  const [eventDataImage, setEventDataImage] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [eventWishList, setEventWishList] = useState([]);
  const [copy, setCopy] = useState(false);

  const [componentLoader, setComponentLoader] = useState(true);
  const [businessDetail, setBusinessDetail] = useState([]);
  const location1 = useSelector((state) => state?.loctionn?.action?.location);
  const [categoryCallApi, setCategoryCallApi] = useState("");
  const location = useLocation();
  const [callApi, setCallApi] = useState(true);
  const [productModal, setProductModal] = useState(false);
  const toggleProductModal = () => setProductModal(!productModal);
  const [product, setProduct] = useState([]);
  const [images, setImages] = useState([]);
  const [info, setInfo] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const toggleshowLogin = () => setShowLogin(!showLogin);
  const countryNameRedux = useSelector((state) => state?.countryName?.action);

  const { id } = useParams();

  // const location = useSelector((state) => state.businessDetailId.action);
  const [searchParams, setSearchParams] = useSearchParams();
  const paramId = searchParams.get("id");

  const url = new URL(window.location.href);
  const yourParamName = url.searchParams.get("id");
  const businessId = id?.state?.id || paramId;
  const userId = Cookies.get("userid") || "";
  let token = Cookies.get("token");

  const copyReferral = () => {
    navigator.clipboard.writeText(
      `http://localhost:3000/businessdetail?id=${businessId}`
    );
    setCopy(true);
  };

  useEffect(() => {
    if (callApi == true && location1?.latitude) {
      // setComponentLoader(true);
      GetDataWithToken(
        `business/business-details/${businessId}?lat=${location1?.latitude}&lng=${location1?.longitude}&sub_category=${categoryCallApi}&userId=${userId}&country=${countryNameRedux}`
      ).then((res) => {
        setCallApi(false);
        setBusinessDetail(res.data);
        setComponentLoader(false);
      });
    }
  }, [callApi, location1]);

  const handleProductDetail = (id) => {
    setComponentLoader(true);
    GetDataWithToken(`product/product-details/${id}`).then((res) => {
      let img = JSON.parse(res?.data?.data?.images);
      let info = JSON.parse(res?.data?.data?.info);
      setImages(img);
      setInfo(info);
      setProduct(res?.data);
      if (res) {
        toggleProductModal();
        setComponentLoader(false);
      }
    });
  };
  const keys = Object.keys(info);

  // {
  //   console.log(info[Object.keys(keys)?.[0]]);
  // }

  const handleEventData = (id) => {
    GetDataWithToken(`event/get-event?id=${id}`).then((res) => {
      console.log(res.data);
      let img = JSON.parse(res?.data?.event?.image);
      setEventDataImage(img);
      setEventData(res.data?.event);
      setEventWishList(res?.data);

      toggleEventModal();

      let time = JSON.parse(res?.data?.event?.time);
      toggleEventModal();
      setFormetTime(time);
    });
  };

  const handleWishList = async (id) => {
    try {
      const response = await GetDataWithToken(
        `product/add-and-delete-wishlist?eventId=${id}`
      );
      console.log(response);
      GetDataWithToken(`event/get-event?id=${id}`).then((res) => {
        setEventData(res.data?.event);
        setEventWishList(res?.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleWishListProduct = async (id) => {
    try {
      await GetDataWithToken(`product/add-and-delete-wishlist?productId=${id}`);
      GetDataWithToken(`product/product-details/${id}`).then((res) => {
        // let img = JSON.parse(res?.data?.data?.images);
        // let info = JSON.parse(res?.data?.data?.info);
        // setImages(img);
        // setInfo(info);
        setProduct(res?.data);
        // if (res) {
        //   toggleProductModal();
        //   setComponentLoader(false);
        // }
      });

      // if (response.data) {

      //   setWishListColor(true);
      // } else {
      //   setWishListColor(false);
      // }
      // do something with the response
    } catch (error) {
      console.error(error); // handle the error
    }
  };

  const wishHandler = (id) => {
    GetDataWithToken(`product/add-and-delete-wishlist?businessId=${id}`).then(
      (response) => {
        if (response.status === true) {
          console.log(response);
          setCallApi(true);
        }
      }
    );
  };

  const dateHandle = (date) => {
    var d = (new Date(date) + "").split(" ");
    d[2] = d[2] + ",";
    console.log(d);
    //     Date date = Calendar.getInstance().getTime();
    //  DateFormat dateFormat = new SimpleDateFormat(businessDetail?.business?.createdAt);
  };

  return (
    <>
      {componentLoader ? (
        // Rendering the Loader component
        <Loder />
      ) : (
        <div className="page_wraper">
          <Header class={"header-full-width"} />
          {/* <!-- CONTENT START --> */}
          <div className="page-content">
            {/* <!-- Job Detail V.2 START --> */}
            <div className="section-full p-t50 p-b90 bg-white">
              <div className="container">
                {/* <!-- BLOG SECTION START --> */}
                <div className="section-content">
                  <div className="twm-job-self-wrap twm-job-detail-v2">
                    <div className="twm-job-self-info">
                      {
                        <div className="twm-job-self-top">
                          <div className="twm-media-bg">
                            <img
                              src={businessDetail?.business?.images}
                              alt="#"
                            />
                          </div>

                          <div className="twm-mid-content">
                            <div className="twm-media">
                              <img
                                src={businessDetail?.business?.business_licence}
                                alt="#"
                              />
                            </div>

                            <h4 className="twm-job-title">
                              {businessDetail?.business?.name}
                              <Link
                                to={"/business"}
                                state={{
                                  id: businessDetail?.business?.Category?.id,
                                }}
                                className="twm-job-post-duration"
                              >
                                {"/" + businessDetail?.business?.Category?.name}
                              </Link>
                            </h4>
                            <p className="twm-job-address">
                              <i className="feather-map-pin"></i>
                              {businessDetail?.business?.address}
                            </p>
                            <div className="twm-job-self-mid">
                              <div className="twm-job-self-mid-left">
                                <a
                                  href={`http://localhost:3000/businessdetail?id=${businessId}`}
                                  className="twm-job-websites site-text-primary"
                                  target="blank"
                                >
                                  {businessDetail?.business?.website_url}
                                </a>

                                <a class="twm-job-title" onClick={copyReferral}>
                                  <div class="twm-jobs-vacancies">
                                    <span>
                                      <img src="images/Vector (3).svg" alt="" />
                                    </span>
                                    {copy && <span>copied</span>}
                                  </div>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                  <div className="twm-job-detail-2-wrap">
                    <div className="row d-flex justify-content-center">
                      <div className="col-lg-4 col-md-12 rightSidebar">
                        <div className="side-bar mb-4">
                          <div className="twm-s-info2-wrap mb-5">
                            <div className="twm-s-info2">
                              <h4 className="section-head-small mb-4">
                                Business Information
                              </h4>
                              <ul className="twm-job-hilites2">
                                <li>
                                  <div className="twm-s-info-inner">
                                    <i className="fas fa-calendar-alt"></i>
                                    <span className="twm-title">
                                      Created Date
                                    </span>
                                    <div className="twm-s-info-discription">
                                      {
                                        moment(
                                          businessDetail?.business?.createdAt
                                        ).format("MMMM Do YYYY")
                                        // dateHandle(
                                        //   businessDetail?.business?.createdAt
                                        // )
                                        // new Date(
                                        //   businessDetail?.business?.createdAt.split(
                                        //     " "
                                        //   ).
                                        // )
                                      }
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="twm-s-info-inner">
                                    <i className="fas fa-user-tie"></i>
                                    <span className="twm-title">
                                      Business Type
                                    </span>
                                    <div className="twm-s-info-discription">
                                      {businessDetail?.business?.Category?.name}
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="widget tw-sidebar-tags-wrap">
                            <h4 className="section-head-small mb-4">
                              Product Category
                            </h4>

                            <div className="tagcloud">
                              {businessDetail &&
                                businessDetail?.sub_category?.length > 0 &&
                                businessDetail?.sub_category?.map(
                                  (item, key) => (
                                    <a
                                      to={""}
                                      onClick={() => [
                                        setCategoryCallApi(item),
                                        setCallApi(true),
                                      ]}
                                    >
                                      {item}
                                    </a>
                                  )
                                )}
                              {/* <a href="javascript:void(0)">Customised Cakes</a>
                          <a href="javascript:void(0)">Consultancy</a> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-8 col-md-12">
                        {/* <!-- Candidate detail START --> */}
                        <div className="cabdidate-de-info">
                          <h4 className="twm-s-title m-t0">
                            Business Description:
                          </h4>

                          <p>{businessDetail?.business?.description}</p>

                          {/* <p>
                        At vero eos et accusamus et iusto odio dignissimos
                        ducimus qui blanditiis praesentium voluptatum deleniti
                        atque corrupti quos dolores et quas molestias excepturi
                        sint occaecati cupiditate non provident, similique sunt
                        in culpa qui officia deserunt mollitia animi.
                      </p> */}

                          {userId && (
                            <h4 className="twm-s-title">Share Profile</h4>
                          )}
                          {userId && (
                            <div className="twm-social-tags">
                              <a
                                href={`tel:${
                                  businessDetail?.business?.contact &&
                                  JSON.parse(businessDetail?.business?.contact)
                                    ?.phone
                                }`}
                                className="fb-clr"
                              >
                                <i className="fas fa-phone-alt"></i>
                              </a>

                              <a
                                target="_blank"
                                // href="mailto:jeetsingh@gmail.com"
                                href={`mailto:${
                                  businessDetail?.business?.contact &&
                                  JSON.parse(businessDetail?.business?.contact)
                                    ?.email
                                }`}
                                className="tw-clr"
                              >
                                <i className="fas fa-envelope"></i>
                              </a>

                              <a
                                target="_blank"
                                href={`https://web.whatsapp.com/send?phone=${
                                  businessDetail?.business?.contact &&
                                  JSON.parse(businessDetail?.business?.contact)
                                    ?.whatsapp
                                }&text=Hello`}
                                // href={`https://wa.me/${
                                //   businessDetail?.business?.contact &&
                                //   JSON.parse(businessDetail?.business?.contact)
                                //     ?.whatapp
                                // }`}
                                // onClick={() =>
                                //   whatsappSendHandler(
                                //     businessDetail?.business?.contact &&
                                //       JSON.parse(
                                //         businessDetail?.business?.contact
                                //       )?.whatapp
                                //   )

                                className="whats-clr"
                              >
                                <i className="fab fa-whatsapp"></i>
                              </a>
                              <a
                                target="_blank"
                                href={`https://www.google.com/maps/@${businessDetail?.business?.latitude},${businessDetail?.business?.longitude},15z`}
                                className="pinte-clr"
                              >
                                <i className="fas fa-map-marker-alt"></i>
                              </a>
                              <a
                                onClick={() =>
                                  wishHandler(businessDetail?.business?.id)
                                }
                                className="pinte-clr"
                              >
                                {businessDetail?.wishlist === null && (
                                  <i className="far fa-heart"></i>
                                )}
                                {businessDetail?.wishlist && (
                                  <i className="fas fa-heart"></i>
                                )}
                              </a>
                              <WhatsappShareButton
                                url={`${businessDetail?.business?.website_url} image=${businessDetail?.business?.business_licence} Details=${businessDetail?.business?.description}`}
                              >
                                <a className="pinte-clr">
                                  <i className="far fa-share-square"></i>
                                </a>
                              </WhatsappShareButton>
                            </div>
                          )}

                          <h4 className="twm-s-title">Location</h4>
                          <div className="twm-m-map mb-5">
                            <div className="twm-m-map-iframe">
                              {/* <iframe

                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.8534521658976!2d-118.2533646842856!3d34.073270780600225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c6fd9829c6f3%3A0x6ecd11bcf4b0c23a!2s1363%20Sunset%20Blvd%2C%20Los%20Angeles%2C%20CA%2090026%2C%20USA!5e0!3m2!1sen!2sin!4v1620815366832!5m2!1sen!2sin"
                          ></iframe> */}
                              <Map
                                className="h-100"
                                businessDetail={{
                                  lat: businessDetail?.business?.latitude,
                                  lng: businessDetail?.business?.longitude,
                                }}
                              />
                            </div>
                          </div>

                          {businessDetail?.business?.events?.length > 0 && (
                            <h4 className="twm-s-title">Events</h4>
                          )}
                          <div className="tw-sidebar-gallery-2">
                            <div className="row">
                              {businessDetail &&
                                businessDetail?.business?.events?.length > 0 &&
                                businessDetail?.business?.events?.map(
                                  (item, key) => (
                                    <div className="col-lg-3 col-md-3 col-sm-6">
                                      <div className="tw-service-gallery-thumb">
                                        <a
                                          onClick={() => {
                                            token
                                              ? handleEventData(item.id)
                                              : setShowLogin(!showLogin);
                                          }}
                                          className=""
                                        >
                                          <img
                                            src={JSON.parse(item?.image)[0]}
                                            alt=""
                                          />
                                          <i className="fa fa-file-image"></i>
                                        </a>
                                      </div>
                                    </div>
                                  )
                                )}
                            </div>
                          </div>

                          {businessDetail?.business?.Products?.length > 0 && (
                            <h4 className="twm-s-title">Products</h4>
                          )}
                          <div className="tw-sidebar-gallery-2">
                            <div className="row">
                              {businessDetail?.business?.Products &&
                                businessDetail?.business?.Products?.length >
                                  0 &&
                                businessDetail?.business?.Products?.map(
                                  (item, key) => (
                                    <div
                                      className="col-lg-3 col-md-3 col-sm-6"
                                      key={key}
                                    >
                                      <div className="tw-service-gallery-thumb">
                                        <a
                                          className=""
                                          onClick={() => {
                                            token
                                              ? handleProductDetail(item?.id)
                                              : setShowLogin(!showLogin);
                                          }}
                                        >
                                          <img
                                            src={JSON.parse(item.images)[0]}
                                            alt=""
                                          />
                                          <i className="fa fa-file-image"></i>
                                        </a>
                                      </div>
                                    </div>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Job Detail V.2 END --> */}

            {/* <!-- Related Jobs START --> */}
            <div className="section-full p-t120 p-b90 site-bg-light-purple twm-related-jobs-carousel-wrap">
              {/* <!-- TITLE START--> */}
              <div className="section-head center wt-small-separator-outer">
                <div className="wt-small-separator site-text-primary">
                  <div>Top Business</div>
                </div>
                <h2 className="wt-title">Related Business</h2>
              </div>
              {/* <!-- TITLE END--> */}

              <div className="container">
                <div className="section-content">
                  <div className=" twm-related-jobs-carousel owl-btn-vertical-center">
                    {
                      <div className="item">
                        <OwlCarousel
                          className="owl-theme"
                          loop
                          items={3}
                          margin={10}
                          nav
                          navText={["<", ">"]}
                        >
                          {businessDetail?.related_Business?.length > 0 &&
                            businessDetail?.related_Business?.map(
                              (item, key) => (
                                <div className="twm-jobs-grid-style2" key={key}>
                                  <div className="twm-media">
                                    <img src={item?.business_licence} alt="#" />
                                  </div>
                                  <Link
                                    to={"/business"}
                                    state={{ id: item?.Category?.id }}
                                    className="twm-job-post-duration"
                                  >
                                    {item?.Category?.name}
                                  </Link>
                                  <div className="twm-mid-content">
                                    <Link
                                      to={`/businessdetail?id=${item?.id}`}
                                      state={{ id: item?.id }}
                                      className="twm-job-title"
                                    >
                                      <h4>{item?.name}</h4>
                                    </Link>
                                    <p className="twm-job-address">
                                      {item?.address}
                                    </p>
                                  </div>
                                  <div className="twm-right-content justify-content-center">
                                    <a className="twm-jobs-browse site-text-primary">
                                      {item?.distance.toFixed(2) +
                                        " " +
                                        "KM Nearby you"}
                                    </a>
                                  </div>
                                </div>
                              )
                            )}
                        </OwlCarousel>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Related Jobs END --> */}
          </div>
          {/* <!-- CONTENT END --> </> */}

          <Modal
            className="modal-dialog-centered modal-lg product-details-modal twm-sign-up"
            isOpen={productModal}
            toggle={toggleProductModal}
          >
            <div class="modal-header mt-0 py-0 border-0">
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
                    </OwlCarousel>
                  </div>
                </div>
              </div>

              <div className="description mt-3 position-relative">
                <div className="share-icons">
                  <span
                    className="btn share"
                    onClick={() => handleWishListProduct(product?.data?.id)}
                  >
                    {product?.wishlist === null && (
                      <i className="far fa-heart"></i>
                    )}
                    {product?.wishlist && <i className="fas fa-heart"> </i>}{" "}
                  </span>
                  <span className="btn">
                    <WhatsappShareButton url={product?.data?.url}>
                      <i className="far fa-share-square"></i>
                    </WhatsappShareButton>
                  </span>
                </div>
                <h5>{product?.data?.name}</h5>
                <p>{product?.data?.description}</p>
                {/* <p>
              Mi volutpat ornare euismod, arcu aliquam curabitur himenaeos
              curabitur, faucibus nisi.
            </p> */}

                {info &&
                  info.length > 0 &&
                  info.map((item, key) => (
                    <div>
                      <h5>{Object.keys(item)?.[0]}</h5>
                      <div className="d-flex align-items-center justify-content-between">
                        <p>{item[Object.keys(item)?.[0]]}</p>
                      </div>{" "}
                    </div>
                  ))}
                <div className="d-flex align-items-center justify-content-between">
                  <h5>Price </h5>
                  <h5>{"BD" + " " + product?.data?.price}</h5>
                </div>
                <div className="text-end">
                  <WhatsappShareButton
                    url={`image=${
                      product?.data?.images &&
                      JSON.parse(product?.data?.images)?.[0]
                    } name=${product?.data?.name}price=${
                      product?.price
                    }description=${product?.data?.description}`}
                  >
                    <a
                      // type="submit"
                      className="site-button"
                      style={{ width: "auto", marginLeft: "auto" }}
                    >
                      Book Now
                    </a>
                  </WhatsappShareButton>
                </div>
              </div>
            </ModalBody>
          </Modal>

          {/* <!-- Business Event Modal start here... --> */}
          {/* <!-- Modal --> */}
          <Modal
            Modal
            className="modal-dialog-centered product-details-modal twm-sign-up"
            id="EventModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            isOpen={eventModal}
            toggle={toggleEventModal}
          >
            <ModalBody>
              <div className="product-details">
                <div id="EventCarousel" className="carousel slide">
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
                      {eventDataImage &&
                        eventDataImage?.length > 0 &&
                        eventDataImage?.map((item, key) => (
                          <div className="carousel-item shadow-sm active">
                            <img
                              src={item}
                              className="d-block w-100"
                              alt="..."
                            />
                          </div>
                        ))}
                    </OwlCarousel>
                  </div>
                </div>
              </div>
              <div className="description mt-3 position-relative">
                <div className="share-icons">
                  <span
                    className="btn share"
                    onClick={() => handleWishList(eventData?.id)}
                  >
                    {eventWishList?.wishlist == null && (
                      <i className={`${"far fa-heart"}`}></i>
                    )}
                    {eventWishList?.wishlist && (
                      <i
                        className={`fas fa-heart `}
                        // onClick={() => handleWishList(product?.id)}
                      ></i>
                    )}{" "}
                  </span>
                  <span className="btn">
                    <i className="far fa-share-square"></i>
                  </span>
                </div>
                <h5>{eventData?.name}</h5>
                <p>{"Artist:" + "  " + eventData?.artists}</p>
                <p>Business: Cygal Systems WLL</p>
                <div className="row event-time">
                  <div className="col-6">
                    <div className="event-time-card">
                      <span>
                        <i className="fas fa-calendar-week"></i>
                      </span>
                    </div>
                    <p className="mb-0 text-center">{eventData?.date}</p>
                    <p className="text-center">{`${formetTime?.to} AM -   ${formetTime?.from} PM`}</p>
                  </div>
                  <div className="col-6">
                    <div className="event-location-card">
                      <span>
                        <i className="fas fa-map-marker-alt"></i>
                      </span>
                    </div>
                    <p className="mb-0 text-center">
                      {eventData?.full_address}
                    </p>
                  </div>
                </div>
                <p>{eventData?.description}</p>
                <div className="d-flex align-items-center justify-content-end">
                  <button type="submit" className="site-button w-auto">
                    Book Now
                  </button>
                </div>
              </div>
            </ModalBody>
          </Modal>
          {/* <!-- Business Event Modal end here... --> */}

          <Footer />
          {showLogin && <Login toggle={toggleshowLogin} />}
        </div>
      )}
    </>
  );
}
