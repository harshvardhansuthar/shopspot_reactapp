// import React, { useState, useEffect } from "react";
// import { GetDataWithToken } from "../../../ApiHelper/ApiHelper";

// export default function Activity(props) {
//   const [activityDate, setActivityDate] = useState("");
//   const [activityData, setActivityData] = useState([]);
//   useEffect(() => {
//     GetDataWithToken("auth/get-activity").then((res) => {
//       console.log(res.data);
//       setActivityData(res.data);
//     });
//   }, []);

//   const formetdate = (date1) => {
//     const timestamp = date1;
//     const date = new Date(timestamp).toLocaleDateString("en-US");
//     return date;
//   };

//   const timeFormet = (time1) => {
//     const dateString = time1;
//     const date = new Date(dateString);
//     const time = date.toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     return time; // Output: "07:03 AM"
//   };
//   return (
//     <>
//       <form>
//         {/* <!--Basic Information--> */}

//         <div className="panel panel-default">
//           <div className="panel-heading wt-panel-heading p-a20">
//             <h4 className="panel-tittle m-a0">Activity</h4>
//           </div>
//           {activityData &&
//             activityData
//               .map((item, key) => (
//                 <div className="panel-body wt-panel-body p-a20 m-b30">
//                   <h4 className="mt-3">{formetdate(item?.createdAt)}</h4>
//                   <div className="activity card mb-2">
//                     <div className="card-body" key={key}>
//                       <div className="details d-flex align-items-center justify-content-between">
//                         <div>
//                           <a href="#">{item?.Business?.name}</a>
//                           <h5>{item?.Business?.Category?.name}</h5>
//                         </div>
//                         <h4 className="mb-0">{timeFormet(item?.createdAt)}</h4>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//         </div>
//       </form>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import { GetDataWithToken } from "../../../ApiHelper/ApiHelper";
import Loder from "../../commen/Loder";

export default function Activity(props) {
  const [activityData, setActivityData] = useState([]);
  const [componentLoader, setComponentLoader] = useState(true);

  useEffect(() => {
    setComponentLoader(true)
    GetDataWithToken("auth/get-activity").then((res) => {
      setActivityData(res.data);
      setComponentLoader(false)

    });
  }, []);

  const timeFormet = (time1) => {
    const dateString = time1;
    const date = new Date(dateString);
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return time;
  };
  const activityDataByDate = activityData?.reduce((acc, item) => {
    const date = new Date(item.createdAt)?.toLocaleDateString("en-US");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date]?.push(item);
    return acc;
  }, {});

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
                <h4 className="panel-tittle m-a0">Activity</h4>
              </div>
              {Object?.entries(activityDataByDate ? activityDataByDate : {})
                ?.sort((a, b) => new Date(b[0]) - new Date(a[0]))
                ?.map(([date, items]) => (
                  <div className="panel-body wt-panel-body p-a20 m-b30">
                    <h4 className="mt-3">{date}</h4>
                    <div className="activity card mb-2">
                      {items.map((item, key) => (
                        <div className="card-body">
                          <div className="details d-flex align-items-center justify-content-between">
                            <div>
                              <a href="#">{item?.Business?.name}</a>
                              <h5>{item?.Business?.Category?.name}</h5>
                            </div>
                            <h4 className="mb-0">{timeFormet(item?.createdAt)}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </form>
        </>
      )}
    </>
  );
}
