// import React from "react";
// import { useEffect } from "react";
// import {
//   GetDataWithToken,
//   PostDataWithToken,
// } from "../../../ApiHelper/ApiHelper";
// import { useState } from "react";
// import Loder from "../../commen/Loder";

// export default function Favourite(props) {
//   const [favouriteData, setFavouriteData] = useState([]);
//   const [callApi, setCallApi] = useState(false);
//   const [componentLoader, setComponentLoader] = useState(true);

//   useEffect(() => {
//     setComponentLoader(true);
//     GetDataWithToken("product/get-my-wishlist").then((res) => {
//       if (res?.status == true) {
//         setFavouriteData(res.data);
//         setComponentLoader(false);
//       }
//     });
//   }, [callApi]);

//   const handleWishList = async (id) => {
//     try {
//       setComponentLoader(true);
//       const response = await GetDataWithToken(
//         `product/add-and-delete-wishlist?productId=${id}`
//       );
//       console.log(response);
//       if (response?.status == true) {
//         setCallApi(true);
//         setComponentLoader(false);
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
//         <>
//           <form>
//             {/* <!--Basic Information--> */}
//             <div className="panel panel-default">
//               <div className="panel-heading wt-panel-heading p-a20">
//                 <h4 className="panel-tittle m-a0">Favourite</h4>
//               </div>
//               <div className="panel-body wt-panel-body p-a20 m-b30">
//                 <div className="row">
//                   <div className="col-md-6 col-12">
//                     {favouriteData &&
//                       favouriteData?.length > 0 &&
//                       favouriteData?.map((item, key) => (
//                         <div className="activity card">
//                           <div className="favourite-badges" key={key}>
//                             <div className="share-icons">
//                               <span className="btn">
//                                 <i
//                                   className="fas fa-heart"
//                                   onClick={() => handleWishList(item?.id)}
//                                 ></i>
//                               </span>
//                             </div>
//                           </div>
//                           <div className="event-img">
//                             <img
//                               src={
//                                 item?.images ||
//                                 (item?.image &&
//                                   (item?.images
//                                     ? JSON.parse(item?.images)[0]
//                                     : JSON.parse(item?.image)[0]))
//                               }
//                               alt="#"
//                             />
//                           </div>
//                           <div className="card-body position-relative">
//                             <div className="event-logo">
//                               <img
//                                 src={item?.Business?.business_licence}
//                                 alt=""
//                               />
//                             </div>
//                             <div className="d-flex align-items-start justify-content-between">
//                               <h5 className="">{item?.name}</h5>
//                               <p>{item?.date ? item?.date : ""}</p>
//                             </div>
//                             <div className="details">
//                               <h5>
//                                 {" "}
//                                 {item?.artists
//                                   ? "Artist :" + item?.artists
//                                   : ""}
//                               </h5>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                   {/* <div className="col-md-6 col-12">
//                 <div className="activity card">
//                   <div className="event-img">
//                     <img src="./images/detail-pic/company-bnr1.jpg" alt="" />
//                   </div>
//                   <div className="favourite-badges">
//                     <div className="share-icons">
//                       <span className="btn">
//                         <i className="far fa-heart"></i>
//                       </span>
//                     </div>
//                   </div>
//                   <div className="card-body position-relative">
//                     <div className="event-logo">
//                       <img src="./images/jobs-company/pic1.jpg" alt="" />
//                     </div>
//                     <div className="d-flex flex-column align-items-start justify-content-between">
//                       <h5 className="">By Cygal Systems WLL</h5>
//                       <p>Cygal Systems WLL</p>
//                     </div>
//                   </div>
//                 </div>
//               </div> */}
//                 </div>
//               </div>
//             </div>
//           </form>
//         </>
//       )}
//     </>
//   );
// }








































import React from "react";
import { useEffect } from "react";
import {
  GetDataWithToken,
  PostDataWithToken,
} from "../../../ApiHelper/ApiHelper";
import { useState } from "react";
import Loder from "../../commen/Loder";
import { json } from "react-router-dom";

export default function Favourite(props) {
  const [favouriteData, setFavouriteData] = useState([]);
  const [callApi, setCallApi] = useState(false);
  const [componentLoader, setComponentLoader] = useState(true);

  useEffect(() => {
    setComponentLoader(true);
    GetDataWithToken("product/get-my-wishlist").then((res) => {
      if (res?.status == true) {
        setFavouriteData(res.data);
        setComponentLoader(false);
      }
    });
  }, [callApi]);

  const handleWishList = async (id, type) => {
    try {
      setComponentLoader(true);
      if (type == "product") {
        const response = await GetDataWithToken(
          `product/add-and-delete-wishlist?productId=${id}`
        );
        console.log(response);
        if (response?.status == true) {
          setCallApi(true);
          setComponentLoader(false);
        }
      }

      if (type == "event") {
        const response = await GetDataWithToken(
          `product/add-and-delete-wishlist?eventId=${id}`
        );
        console.log(response);
        if (response?.status == true) {
          setCallApi(true);
          setComponentLoader(false);
        }
      }

      if (type == "business") {
        const response = await GetDataWithToken(
          `product/add-and-delete-wishlist?businessId=${id}`
        );
        console.log(response);
        if (response?.status == true) {
          setCallApi(true);
          setComponentLoader(false);
        }
      }


      // do something with the response
    } catch (error) {
      console.error(error); // handle the error
    }
  };

  return (
    <>
      {componentLoader ? (
        <Loder />
      ) : (
        <>
          <form>
            {/* <!--Basic Information--> */}
            <div className="panel panel-default">
              <div className="panel-heading wt-panel-heading p-a20">
                <h4 className="panel-tittle m-a0">Favourite</h4>
              </div>
              <div className="panel-body wt-panel-body p-a20 m-b30">
                <div className="row">
                  <div className="col-md-6 col-12">
                    {favouriteData?.product?.length > 0 && favouriteData?.product?.map((item, key) => (<div className="col-md-6 col-12">
                      <div className="activity card">
                        <div className="event-img">
                          <img src={item?.images && JSON.parse(item?.images)[0]} alt="" />
                        </div>
                        <div className="favourite-badges">
                          <div className="share-icons">
                            <span className="btn">
                              <i className="fas fa-heart" onClick={() => handleWishList(item?.id, "product")}></i>
                            </span>
                          </div>
                        </div>
                        <div className="card-body position-relative">
                          <div className="event-logo">
                            <img src={item?.Business?.business_licence} alt="" />
                          </div>
                          <div className="d-flex align-items-start justify-content-between">
                            <h5 className="">{item?.name}</h5>
                          </div>
                          <div className="d-flex flex-column align-items-start justify-content-between">
                            <p>{item?.Business?.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>))}
                  </div>

                  {favouriteData?.event?.length > 0 && favouriteData?.event?.map((item, key) => (<div className="col-md-6 col-12">
                    <div className="activity card">
                      <div className="event-img">
                        <img src={item?.image && JSON.parse(item?.image)[0]} alt="" />
                      </div>
                      <div className="favourite-badges">
                        <div className="share-icons">
                          <span className="btn">
                            <i className="fas fa-heart" onClick={() => handleWishList(item?.id, "event")}></i>
                          </span>
                        </div>
                      </div>
                      <div className="card-body position-relative">
                        <div className="event-logo">
                          <img src={item?.Business?.business_licence} alt="" />
                        </div>
                        <div className="d-flex align-items-start justify-content-between">
                          <h5 className="">{item?.name}</h5>
                          <p>{item?.date ? item?.date : ""}</p>
                        </div>
                        <div className="d-flex flex-column align-items-start justify-content-between">
                          <p>{item?.Business?.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>))}

                  {favouriteData?.business?.length > 0 && favouriteData?.business?.map((item, key) => (<div className="col-md-6 col-12">
                    <div className="activity card">
                      <div className="event-img">
                        <img src={(item?.images)} alt="" />
                      </div>
                      <div className="favourite-badges">
                        <div className="share-icons">
                          <span className="btn">
                            <i className="fas fa-heart" onClick={() => handleWishList(item?.id, "business")}></i>
                          </span>
                        </div>
                      </div>
                      <div className="card-body position-relative">
                        <div className="event-logo">
                          <img src={item?.business_licence} alt="" />
                        </div>
                        <div className="d-flex flex-column align-items-start justify-content-between">
                          <h5 className="">{item?.name}</h5>
                          <p>{item?.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>))}
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
}